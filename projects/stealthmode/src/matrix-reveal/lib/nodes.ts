import type { VNodeArrayChildren, VNode } from 'vue';
import { mergeProps, isVNode, ref, cloneVNode } from 'vue';

import type { CloneProps, INodeMeta } from '@/matrix-reveal/lib/types.ts';
import { STRING_WHITESPACE } from '@/matrix-reveal/lib/constants.ts';

/**
 * Shallow copies a string into a new string.
 * @param  original Original which to copy.
 * @return Copied string.
 */
function copyString(original: string): string {
    return ` ${original}`.slice(1);
}

/**
 * Generates a string with unicode whitespace `\u00A0` characters with given
 * `length` guaranteed.
 * @param  length The length of the whitespace string.
 * @return String popualted with only unicode whitespace characters.
 */
function generateWhitespaceString(length: number): string {
    return STRING_WHITESPACE.repeat(length);
}

/**
 * Generates a random string with guaranteed `length`, with the returning
 * string being populated with randomly chosen chars from `characters`.
 * @param  characters List of characters to populate string from.
 * @param  length     Length of the resulting string.
 * @return            Randomized string of length `length`.
 */
function generateRandomString(characters: string, length: number): string {
    let result = '';
    for (let i = 0; i < length; i++)
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    return result;
}

/**
 * Clones a VNode tree and constructs a animable target metadata array
 * containing all animable text nodes.
 * @param  nodes       Original nodes which to clone.
 * @param  clone_props Props which to apply to cloned nodes.
 * @return             Cloned node tree with replaced target content.
 */
export function buildVNodeClones(
    nodes: VNode | VNodeArrayChildren,
    clone_props: CloneProps,
    initial: boolean
): [VNode[], INodeMeta[]];

/**
 * Clones a VNode tree and constructs a animable target metadata array
 * containing all animable text nodes.
 * @param  nodes       Original nodes which to clone.
 * @param  clone_props Props which to apply to cloned nodes.
 * @param  initial     Wether to render initial animation frame or whitespace.
 * @param  chars       Characters which to render the initial frame from.
 * @return             Cloned node tree with replaced target content.
 */
export function buildVNodeClones(
    nodes: VNode | VNodeArrayChildren,
    clone_props: CloneProps,
    initial: boolean,
    chars: string
): [VNode[], INodeMeta[]];

// Implementing overload
export function buildVNodeClones(
    nodes: VNode | VNodeArrayChildren,
    clone_props: CloneProps,
    initial = false,
    chars = STRING_WHITESPACE
): [VNode[], INodeMeta[]] {
    const cloned_meta: INodeMeta[] = [];
    const cloned_nodes: VNode[] = [];

    const vnodes = !Array.isArray(nodes) ? [nodes] : nodes;

    for (const vnode of vnodes)
        if (isVNode(vnode)) {
            let children: VNode[] | string | null = null;
            let original: string | null = null;

            if (typeof vnode?.children === 'string') {
                original = copyString(vnode.children);
                if (initial)
                    children = generateRandomString(chars, original.length);
                else children = generateWhitespaceString(original.length);
            } else if (Array.isArray(vnode.children)) {
                children = [];
                const [child_nodes, child_meta] = initial
                    ? buildVNodeClones(
                          vnode.children,
                          clone_props,
                          initial,
                          chars
                      )
                    : buildVNodeClones(vnode.children, clone_props, initial);

                cloned_meta.push(...child_meta);
                children.push(...child_nodes);
            }

            const clone_ref = ref<Node | null>(null);
            const props = mergeProps(
                { ref: clone_ref },
                typeof clone_props === 'function'
                    ? clone_props(original !== null, vnode)
                    : clone_props
            );

            const clone = cloneVNode(vnode, props);
            clone.children = children;

            if (original !== null)
                cloned_meta.push({ ref: clone_ref, original });
            cloned_nodes.push(clone);
        }

    return [cloned_nodes, cloned_meta];
}
