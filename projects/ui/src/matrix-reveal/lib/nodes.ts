import type { VNodeArrayChildren, VNodeRef, VNode } from 'vue';
import { mergeProps, isVNode, cloneVNode, Comment, Text, ref } from 'vue';

import type {
    ClonedNodes,
    CloneProps,
    INodeMeta
} from '@/matrix-reveal/lib/types.ts';
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
 * @param  initial     Wether to render initial animation frame or whitespace.
 * @param  props       Props which to apply to cloned nodes.
 * @param  chars       Characters which to render the initial frame from.
 * @return             Cloned node tree with replaced target content.
 */
export function buildVNodeClones(
    target: VNode | VNodeArrayChildren,
    initial: boolean,
    props: CloneProps,
    chars: string = STRING_WHITESPACE
): ClonedNodes {
    const out_meta: INodeMeta[] = [];
    const out_nodes: VNode[] = [];

    const in_meta: INodeMeta[] = [];
    const in_nodes: VNode[] = [];

    for (const node of !Array.isArray(target) ? [target] : target)
        if (isVNode(node) && node.type !== Comment) {
            let children_out: VNodeArrayChildren | string | null = null;
            let children_in: VNodeArrayChildren | string | null = null;
            let original: string | null = null;
            if (
                (node.type == Text && typeof node.children == 'string') ||
                typeof node.children == 'string'
            ) {
                children_in = !initial
                    ? generateRandomString(chars, node.children.length)
                    : generateWhitespaceString(node.children.length);
                original = copyString(node.children);
                children_out = original;
            } else if (Array.isArray(node.children)) {
                children_out = [];
                children_in = [];
                const [
                    [clone_out_nodes, clone_out_meta],
                    [clone_in_nodes, clone_in_meta]
                ] = buildVNodeClones(node.children, initial, props, chars);
                children_out.push(...clone_out_nodes);
                children_in.push(...clone_in_nodes);
                out_meta.push(...clone_out_meta);
                in_meta.push(...clone_in_meta);
            }

            const ref_out = ref<VNodeRef | null>(null);
            const ref_in = ref<VNodeRef | null>(null);
            const node_out = cloneVNode(
                node,
                mergeProps({ ref: ref_out }, props(original !== null, node))
            );
            const node_in = cloneVNode(
                node,
                mergeProps({ ref: ref_in }, props(original !== null, node))
            );
            node_out.children = children_out;
            node_in.children = children_in;
            if (original !== null) {
                out_meta.push({ ref: ref_out, original });
                in_meta.push({ ref: ref_in, original });
            }

            out_nodes.push(node_out);
            in_nodes.push(node_in);
        }

    return [
        [out_nodes, out_meta],
        [in_nodes, in_meta]
    ];
}
