/**
 *   @xbanki-me/fetch-secure-blob
 *
 * This plugin runs during Rollup’s `configResolved` step, where it retrieves
 * the list of blob fragments from the specified store using either a provided
 * list or a matching glob pattern.
 *
 * Effectively providing ghetto code generation capabilities.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.2.0
 */

import type {
    MinimalPluginContextWithoutEnvironment,
    ResolvedConfig,
    Plugin,
} from 'vite';

import {
    BlobClientTokenExpiredError,
    BlobStoreSuspendedError,
    BlobServiceNotAvailable,
    BlobServiceRateLimited,
    BlobStoreNotFoundError,
    BlobNotFoundError,
    BlobAccessError,
    BlobError,
    list,
} from '@vercel/blob';
import { constants } from 'node:fs';
import { isCI } from 'ci-info';

import fs from 'node:fs/promises';
import path from 'node:path';

import type {
    IDiscriminationResult,
    ICacheStateBlob,
    CacheStateBlob,
    ICacheState,
    BlobInput,
    IOptions,
    Options,
} from '@/types.ts';
import { CACHE_FILE_NAME, PLUGIN_NAME, DEFAULT_TTL } from '@/constants.ts';

import messages from '@/messages.json';

/**
 * Formats a message, intended for logging.
 * @param message Formattable message.
 * @return        Formatted message.
 */
function msg(message: string): string {
    return `${messages.prefix} ${message}.`;
}

/**
 * Resolves all necessary configuration properties.
 * @param  config  Resolved Vite config.
 * @param  options User-defined plugin options.
 * @return Resolved plugin options.
 */
function resolveOptions(config: ResolvedConfig, options: Options): IOptions {
    return {
        token: options.token ?? (process.env.BLOB_READ_WRITE_TOKEN as string),
        cache: path.resolve(options?.cache ?? config.cacheDir),
        output: path.resolve(options?.output ?? config.root),
        ttl: options.ttl ?? DEFAULT_TTL,
        input: options.input ?? [],
    };
}

/**
 * Logs remote (Vercel) related errors.
 * @param  context Plugin context.
 * @param  error   Error which to log.
 */
function handleRemoteError(
    context: MinimalPluginContextWithoutEnvironment,
    error: BlobError,
) {
    switch (true) {
        case error instanceof BlobClientTokenExpiredError:
            context.error({
                message: msg(messages.errors.client_token_expired.code),
                code: messages.errors.client_token_expired.code,
            });
            break;

        case error instanceof BlobStoreSuspendedError:
            context.error({
                message: msg(messages.errors.store_suspended.message),
                code: messages.errors.store_suspended.code,
            });
            break;

        case error instanceof BlobServiceNotAvailable:
            context.error({
                message: msg(messages.errors.service_not_available.message),
                code: messages.errors.service_not_available.code,
            });
            break;

        case error instanceof BlobStoreNotFoundError:
            return context.error({
                message: msg(messages.errors.store_not_found.message),
                code: messages.errors.store_not_found.code,
            });

        case error instanceof BlobServiceRateLimited:
            context.error({
                message: msg(messages.errors.rate_limited.message),
                code: messages.errors.rate_limited.code,
            });
            break;

        case error instanceof BlobNotFoundError:
            context.error({
                message: msg(messages.errors.blob_not_found.message),
                code: messages.errors.blob_not_found.code,
            });
            break;

        case error instanceof BlobAccessError:
            context.error({
                message: msg(messages.errors.access.message),
                code: messages.errors.access.code,
            });
            break;

        default:
            throw error;
    }
}

/**
 * Determines wether on-disk caching is available, based on if the supplied
 * cache directory is a valid writeable directory, and or if we're *not* in a
 * CI context.
 * @param  path Path which to check writeability for.
 * @return      If we can write cache to disk or not.
 */
async function determineCacheAvailability(path: string): Promise<boolean> {
    if (isCI || !(await ensureDirectory(path))) return false;

    return true;
}

/**
 * Discriminates the available blobs based on input criteria, returning the
 * names of blobs that pass the test(s).
 * @param  names Names of available blobs.
 * @param  input Input criteria.
 * @return       List of blob names that match input criteria, and any criteria
 *               who found no matches.
 */
function discriminateTargetBlobs(
    names: string[],
    input: BlobInput,
): IDiscriminationResult {
    const matching_criteria: (RegExp | string)[] = [];
    const result: IDiscriminationResult = {
        matches: [],
        misses: [],
    };
    if (Array.isArray(input)) {
        for (const discriminator of input) {
            if (discriminator instanceof RegExp)
                for (const target of names) {
                    if (discriminator.test(target)) result.matches.push(target);
                    if (!matching_criteria.includes(discriminator))
                        matching_criteria.push(discriminator);
                }
            else
                for (const target of names) {
                    if (discriminator == target) result.matches.push(target);
                    if (!matching_criteria.includes(discriminator))
                        matching_criteria.push(discriminator);
                }
        }

        for (const discriminator of input)
            if (!matching_criteria.includes(discriminator))
                result.misses.push(discriminator);
    } else {
        if (input instanceof RegExp)
            for (const target of names) {
                if (input.test(target)) result.matches.push(target);
                if (!matching_criteria.includes(input))
                    matching_criteria.push(input);
            }
        else
            for (const target of names) {
                if (target == input) result.matches.push(target);
                if (!matching_criteria.includes(input))
                    matching_criteria.push(input);
            }

        if (!matching_criteria.includes(input)) result.misses.push(input);
    }

    return result;
}
/**
 * Ensure's a directory exists by first checking that the given `path` variable
 * points to an actual directory. If the `path` variable points to a path that
 * does not exist, the directory is then created at that path.
 * @param  path Path which to ensure directory's existence.
 * @return           Returns `true` if the directory exists or was created,
 *                   `false` if it's a file or could not be created.
 */
async function ensureDirectory(path: string): Promise<boolean> {
    try {
        return (await fs.stat(path)).isDirectory();
    } catch (err) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
            await fs.mkdir(path, { recursive: true });
            return true;
        }

        throw err;
    }
}

/**
 * Checks wether a file exists.
 * @param  path Path for file, including the name.
 * @return File's existence status.
 */
async function checkFile(path: string): Promise<boolean> {
    try {
        return (await fs.stat(path)).isFile();
    } catch (err) {
        if (err instanceof Error && 'code' in err && err.code === 'ENOENT') {
            return false;
        }

        throw err;
    }
}

/**
 * Reads cached state from disk, if caching is enabled. If it is disabled,
 * or does not exist on disk, new state is created.
 * @param  path      Path, including filename, where cache state is located.
 * @return           Cache state.
 */
async function readCacheState(path: string, ttl: number): Promise<ICacheState> {
    if (await checkFile(path)) {
        const data = JSON.parse((await fs.readFile(path)).toString());

        if (Date.now() + ttl > data.valid_until) return Promise.resolve(data);
    }

    return Promise.reject(null);
}

/**
 * Gets a list of downloadable blobs from given Vercel blob storage.
 * @param  context Plugin context, for logging purposes.
 * @param  token   Vercel blob storage access token.
 * @param  cursor  Request cursor for blob storage. Should not be manually set.
 * @return         Array of downloadable blobs (name & url)
 */
async function fetchRemoteBlobList(
    context: MinimalPluginContextWithoutEnvironment,
    token: string,
    cursor?: string,
) {
    const result: ICacheStateBlob[] = [];
    try {
        const response = await list({
            cursor,
            token,
        });

        for (const blob of response.blobs)
            result.push({
                name: blob.pathname,
                url: blob.url,
            });

        if (response.hasMore)
            result.push(
                ...(await fetchRemoteBlobList(context, token, response.cursor)),
            );
    } catch (err) {
        if (err instanceof BlobError) {
            handleRemoteError(context, err);
            return result;
        }

        throw err;
    }

    return result;
}

/**
 * Creates & fetches new remote blob state, which gets automatically populated
 * with state based on what's written in the cache (if aplicable).
 * @param  context    Plugin context, used for logging.
 * @param  writeable  Wether we can write cache to disk.
 * @param  cache_path Path where cache gets written to.
 * @param  token      Vercel blob store access token.
 * @param  ttl        Time-to-live for how long cache is valid for.
 * @return            Up-to-date blob state.
 */
async function fetchNewState(
    context: MinimalPluginContextWithoutEnvironment,
    writeable: boolean,
    cache_path: string,
    token: string,
    ttl: number,
): Promise<ICacheState> {
    context.info({
        message: msg(messages.info.fetching_remote_list.message),
        code: messages.info.fetching_remote_list.code,
    });
    const remote_blobs = await fetchRemoteBlobList(context, token);
    const blobs_data: Record<string, CacheStateBlob> = {};
    const valid_until = Date.now() + ttl;
    const blobs_names: string[] = [];

    if (writeable)
        await Promise.all(
            remote_blobs.map(async blob => {
                try {
                    const blob_path = path.join(cache_path, blob.name);
                    await fs.access(blob_path, constants.F_OK);
                    blobs_data[blob.name] = {
                        path: blob_path,
                        cached: true,
                        ...blob,
                    };
                    blobs_names.push(blob.name);
                } catch {
                    blobs_names.push(blob.name);
                    blobs_data[blob.name] = {
                        path: undefined,
                        cached: false,
                        ...blob,
                    };
                }
            }),
        );
    else
        for (const blob of remote_blobs) {
            blobs_names.push(blob.name);
            blobs_data[blob.name] = {
                path: undefined,
                cached: false,
                ...blob,
            };
        }

    return Promise.resolve({
        valid_until,
        blobs_names,
        blobs_data,
    });
}

/**
 * Fetches a remote blob from target URL, writing the contents to given path.
 * @param  url  Blob URL.
 * @param  path Path where to write the final data.
 */
async function fetchRemoteBlob(url: string, path: string): Promise<void> {
    const response = await fetch(url);
    if (!response.ok) {
        const err = new Error(`Could not fetch blob from URL: ${url}`);
        return Promise.reject(err);
    }

    await fs.writeFile(path, Buffer.from(await response.arrayBuffer()));
}

/**
 * A plugin designed to securely fetch blobs (files) from Vercel-hosted Blob Storage.
 * @param  options Parameters for how and where the blobs are fetched.
 * @return         Vite plugin.
 */
export default function fetchSecureBlobs(options?: Options): Plugin {
    return {
        async configResolved(config) {
            const opts = resolveOptions(config, options ?? {});
            if (!(opts.input instanceof RegExp) && opts.input.length <= 0)
                return;

            const cache_writeable = await determineCacheAvailability(
                opts.cache,
            );
            let cache_state: ICacheState | null = null;
            if (cache_writeable) {
                this.info({
                    message: msg(messages.info.reading_cache_file.message),
                    code: messages.info.reading_cache_file.code,
                });
                cache_state = await readCacheState(
                    path.join(opts.cache, CACHE_FILE_NAME),
                    opts.ttl,
                )
                    .then(state => state)
                    .catch(_ =>
                        fetchNewState(
                            this,
                            cache_writeable,
                            opts.cache,
                            opts.token,
                            opts.ttl,
                        ).then(data => {
                            this.info({
                                message: msg(
                                    messages.info.writing_cache_file.message,
                                ),
                                code: messages.info.writing_cache_file.code,
                            });
                            fs.writeFile(
                                path.join(opts.cache, CACHE_FILE_NAME),
                                JSON.stringify(data),
                            ).catch(_ =>
                                this.warn({
                                    message: msg(
                                        messages.warnings.failed_writing_to_disk
                                            .message,
                                    ),
                                    code: messages.warnings
                                        .failed_writing_to_disk.code,
                                }),
                            );
                            return data;
                        }),
                    );
            }
            if (!cache_state)
                cache_state = await fetchNewState(
                    this,
                    cache_writeable,
                    opts.cache,
                    opts.token,
                    opts.ttl,
                );
            const targets = discriminateTargetBlobs(
                cache_state.blobs_names,
                opts.input,
            );
            if (targets.matches.length == 0) {
                this.warn({
                    message: msg(messages.warnings.no_matches_found.message),
                    code: messages.warnings.no_matches_found.code,
                });
                return;
            } else if (targets.misses.length >= 1)
                for (const miss of targets.misses)
                    this.warn({
                        message: msg(
                            `${messages.warnings.no_matches_found.message}${miss instanceof RegExp ? miss.source : miss}`,
                        ),
                        code: messages.warnings.no_matches_found.code,
                    });

            await ensureDirectory(opts.output);
            let cache_needs_writing = false;
            for (const fragment of targets.matches) {
                if (!(fragment in cache_state.blobs_data))
                    this.error({
                        message: msg(
                            `${messages.errors.blob_data_missing.message}${fragment}`,
                        ),
                        code: messages.errors.blob_data_missing.code,
                    });

                const target = cache_state.blobs_data[fragment];
                if (cache_writeable && !target.cached) {
                    this.info({
                        message: msg(
                            `${messages.info.fetching_blob.message}${target.name}..`,
                        ),
                        code: messages.info.fetching_blob.code,
                    });
                    const target_path = path.join(opts.cache, target.name);
                    await fetchRemoteBlob(target.url, target_path);
                    await fs.copyFile(
                        target_path,
                        path.join(opts.output, target.name),
                    );
                    if (!cache_needs_writing) cache_needs_writing = true;
                    target.path = target_path;
                    target.cached = true;
                } else if (
                    !(await checkFile(path.join(opts.output, target.name)))
                )
                    await fetchRemoteBlob(
                        target.url,
                        path.join(opts.output, target.name),
                    );

                if (cache_writeable && cache_needs_writing)
                    await fs.writeFile(
                        path.join(opts.cache, CACHE_FILE_NAME),
                        JSON.stringify(cache_state),
                    );
            }
        },
        name: PLUGIN_NAME,
    };
}
