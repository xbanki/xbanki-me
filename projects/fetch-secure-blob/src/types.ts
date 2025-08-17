/**
 * Miscellaneous type declarations required by the plugin.
 *
 *    @copyright Copyright (c) 2025, xbanki <contact@xbanki.me>
 *               Licensed under MIT License.
 *               See LICENSE for more details.
 *    @author    xbanki <contact@xbanki.me>
 *    @since     1.0.0
 *    @version   1.2.0
 */

import type { ResolvedConfig } from 'vite';

/**
 * Partial un-cached blob type.
 */
export interface ICacheStateBlob {
    /**
     * Name of the blob, as it appears in the filesystem.
     */
    name: string;

    /**
     * Remote fetch URL for the blob.
     */
    url: string;
}

/**
 * Cache state.
 */
export interface ICacheState {
    /**
     * Blob data lookup table.
     */
    blobs_data: Record<string, CacheStateBlob>;

    /**
     * Available blob names.
     */
    blobs_names: string[];

    /**
     * Unix timestamp of when this cache entry becomes stale.
     */
    valid_until: number;
}

/**
 * Input & output directory options.
 */
export interface IOptionsDirectories {}

/**
 * Plugin options.
 */
export interface IOptions {
    /**
     * Blob fragment output directory.
     * @default ResolvedConfig.root
     * @see     ResolvedConfig
     */
    output: string;

    /**
     * Directory where downloaded fragments are cached, along with necessary
     * metadata.
     * @default ResolvedConfig.cacheDir
     * @see     ResolvedConfig
     */
    cache: string;

    /**
     * Vercel blob storage access token.
     * @default process.env.BLOB_READ_WRITE_TOKEN
     */
    token: string;

    /**
     * Actual blob inputs. Each input corresponds to a path in storage.
     */
    input: BlobInput;

    /**
     * Length of time that local cache is valid.
     * @default 24 * 60 * 1000 // 24 hours.
     */
    ttl: number;
}

/**
 * Result for testing available blobs to input criteria.
 */
export interface IDiscriminationResult {
    /**
     * Criteria which didn't find any matches.
     */
    misses: (string | RegExp)[];

    /**
     * Array of names which match the input criteria.
     */
    matches: string[];
}

/**
 * Complete cache blob representation.
 */
export type CacheStateBlob = ICacheStateBlob & {
    /**
     * Normalized path where blob fragment resides on disk.
     */
    path?: string;

    /**
     * Denotes wether this blob has been cached or not.
     */
    cached: boolean;
};

/**
 * Blob input type.
 */
export type BlobInput = string | RegExp | (string | RegExp)[];

/**
 * Options type declaration.
 */
export type Options = Partial<IOptions>;
