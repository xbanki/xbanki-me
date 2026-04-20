<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<script setup lang="ts">
    import type { VNodeArrayChildren, VNodeRef, VNode } from 'vue';
    import { cloneVNode, h, isVNode, mergeProps, nextTick, ref, shallowRef, triggerRef, watch } from 'vue';
    import type {
        ICloneDescriptor,
        ICloneMetadata,
        IInternalState,
        IEvents,
        IProps,
        ISlots,
        IState,
        State,
    } from './types.ts';
    import { EInternalEvent, EDrainTarget, EAnimation, EState } from './types.ts';
    import { Comment as VComment, Text as VText } from '@vue/runtime-core';
    import { useReveal } from '@/composables/reveal.ts';

    /**
     * Clones an entire tree of VNodes, used for animation. During the cloning process, refs are attached to elements
     * which can be animated, namely text nodes. Comments and non-VNode objects are automatically ignored.
     *
     * @param tree The tree itself, which to deterministically clone.
     * @param props Props, which are attached to each cloned node.
     * @returns Cloned VNodes, and newly-created metadata objects that describe animable VNodes.
     */
    function cloneVNodeTree(tree: VNode | VNode[], props: IProps) {
        let total_cycles = 0;
        const cloneFn = (target: VNode | VNodeArrayChildren): [ICloneMetadata[], VNode[]] => {
            if (!Array.isArray(target)) target = [target];

            const metadata: ICloneMetadata[] = [];
            const nodes: VNode[] = [];

            for (const leaf of target)
                if (isVNode(leaf) && leaf.type != typeof VComment) {
                    if (leaf.type == typeof VText || typeof leaf.children == 'string') {
                        const node_ref = ref<VNodeRef | null>(null);
                        const node = cloneVNode(leaf, { ref: node_ref });
                        const original = ` ${node.children}`.slice(1);
                        if (props.render_opaque_frame) node.children = props.opaque_character.repeat(original.length);
                        else {
                            let value = '';
                            for (let i = 0; i < original.length; i++)
                                value += props.characters.charAt(Math.floor(Math.random() * props.characters.length));

                            node.children = value;
                        }

                        const cycles = Array.from<number>({ length: original.length - 1 }).fill(props.cycles);
                        metadata.push({ pointers: { indecies: [...cycles.keys()], cycles }, ref: node_ref, original });
                        total_cycles += cycles.length * props.cycles;
                        nodes.push(node);
                    } else if (Array.isArray(leaf.children)) {
                        const [child_metadata, child_nodes] = cloneFn(leaf.children);
                        metadata.push(...child_metadata);
                        const node = cloneVNode(leaf);
                        node.children = child_nodes;
                        nodes.push(node);
                    }
                }

            return [metadata, nodes];
        };

        const [metadata, nodes] = cloneFn(tree);
        internal_state.value.queue.push([EInternalEvent.CLONE_COMPLETED, { cycles: total_cycles, metadata, nodes }]);
        triggerRef(internal_state);
    }

    /**
     * Resets the state of animation objects, and swaps the objects automatically.
     *
     * @param drained_metadata Metadata objects, which to re-hydrate for future animation.
     * @param drain_target The actual target animation step, which to rehydrate the metadata objects to.
     * @param cycles Number of cycles which to complete per-character for the next animation step.
     */
    function resetAnimation(drained_metadata: ICloneMetadata[], drain_target: EDrainTarget, cycles: number) {
        [internal_state.value.out, internal_state.value.in] = [internal_state.value.in, internal_state.value.out];
        for (const metadata of drained_metadata) {
            metadata.pointers.cycles = Array.from<number>({ length: metadata.original.length - 1 }).fill(cycles);
            metadata.pointers.indecies = [...metadata.pointers.cycles.keys()];
        }

        switch (drain_target) {
            case EDrainTarget.OUT:
                internal_state.value.out.metadata = drained_metadata;
                break;

            case EDrainTarget.IN:
                internal_state.value.in.metadata = drained_metadata;
                break;
        }

        internal_state.value.out.cycles_completed = 0;
        internal_state.value.in.cycles_completed = 0;
    }

    /**
     * Animates a single animation frame, using the browser DOM animation API. The animation is blind to outer state -
     * in other words, the only state that is used within the animation is internal.
     *
     * @param props Component props, which are used to reference animation specific options.
     * @param context The animation context object. This is used to read & write animation state.
     * @param onDoneFn Callback function, that is called when the animation is considered "completed".
     * @param resolve_to_opaque Internal. Whether the final character of a cycle is opaque or original character.
     * @param metadata_drain Internal. Metadata objects that have been fully animated.
     * @param inception Internal. Timestamp of when we started animating.
     */
    function animateFrame(
        props: IProps,
        context: ICloneDescriptor,
        onDoneFn: (drained_metadata: ICloneMetadata[]) => void,
        resolve_to_opaque = true,
        metadata_drain: ICloneMetadata[] = [],
        inception = performance.now(),
    ) {
        const progress =
            (Math.min(Math.max(performance.now() - inception, 1), props.duration) - 1) / (props.duration - 1);
        const steps = Math.max(context.cycles_total * progress - context.cycles_completed, 0);
        for (let i = 0; i < steps; i++) {
            if (context.metadata.length <= 0) break;
            const target_index = Math.floor(Math.random() * context.metadata.length);
            const target = context.metadata[target_index];
            if (!(target.ref.value instanceof Text)) {
                if (target.ref.value instanceof Node && target.ref.value.hasChildNodes())
                    for (const child of target.ref.value.childNodes) {
                        if (!(child instanceof Text)) continue;

                        // @ts-expect-error Ref gets automatically unwrapped somewhere along the call stack.
                        target.ref.value = child;
                        break;
                    }

                continue;
            }

            const pointer_index = Math.floor(Math.random() * target.pointers.indecies.length);
            const pointer = target.pointers.indecies[pointer_index];
            if (target.pointers.cycles[pointer] - 1 <= 0) {
                const character = !resolve_to_opaque ? target.original.charAt(pointer) : props.opaque_character;
                target.ref.value.nodeValue =
                    target.ref.value.nodeValue.slice(0, pointer) +
                    character +
                    target.ref.value.nodeValue.slice(pointer + 1);

                target.pointers.indecies.splice(pointer_index, 1);
            } else {
                const character = props.characters.charAt(Math.floor(Math.random() * props.characters.length));
                target.ref.value.nodeValue =
                    target.ref.value.nodeValue.slice(0, pointer) +
                    character +
                    target.ref.value.nodeValue.slice(pointer + 1);

                target.pointers.cycles[pointer] -= 1;
            }

            context.cycles_completed += 1;
            if (target.pointers.indecies.length != 0) continue;
            metadata_drain.push(...context.metadata.splice(target_index, 1));
        }

        if (progress >= 1 && context.cycles_completed == context.cycles_total) {
            onDoneFn(metadata_drain);
            return;
        }

        requestAnimationFrame(() =>
            animateFrame(props, context, onDoneFn, resolve_to_opaque, metadata_drain, inception),
        );
    }

    /**
     * Sets-up & fires animations, based on the desired target animation.
     *
     * @param props Component props, which are used within the animation process.
     * @param animation Target animation.
     */
    function initializeAnimation(props: IProps, animation: EAnimation) {
        switch (animation) {
            case EAnimation.BOTH:
                state.animation.value = EState.OUT;
                requestAnimationFrame(() =>
                    animateFrame(props, internal_state.value.out, _ => initializeAnimation(props, EAnimation.IN)),
                );
                break;

            case EAnimation.OUT:
                state.animation.value = EState.OUT;
                requestAnimationFrame(() =>
                    animateFrame(props, internal_state.value.out, drained => {
                        resetAnimation(drained, EDrainTarget.IN, props.cycles);
                        state.animation.value = EState.IDLE;
                    }),
                );
                break;

            case EAnimation.IN:
                state.animation.value = EState.IN;
                requestAnimationFrame(() =>
                    animateFrame(
                        props,
                        internal_state.value.in,
                        drained => {
                            state.animation.value = EState.IDLE;
                            resetAnimation(drained, EDrainTarget.OUT, props.cycles);
                        },
                        false,
                    ),
                );
                break;
        }
    }

    // Component inputs & arguments.
    const props = withDefaults(defineProps<Partial<IProps>>(), {
        component_props: {
            // @ts-ignore
            class: 'dark:text-gunmetal-100 text-gunmetal-700 font-mono block',
        },
        characters: '!@#$%^&[]*():{};|,.<>/?',
        render_opaque_frame: true,
        opaque_character: '\u00A0',
        scroll_reactive: true,
        // @ts-ignore
        clone_props: {},
        element: 'span',
        duration: 300,
        cycles: 6,
    });

    const events = defineEmits<IEvents>();
    const slots = defineSlots<ISlots>();

    // Visibility hook.
    const { el } = useReveal(
        props.scroll_reactive
            ? {
                  effect: state => {
                      if (state.value) internal_state.value.queue.push(EInternalEvent.VISIBILITY_VISIBLE);
                      else internal_state.value.queue.push(EInternalEvent.VISIBILITY_HIDDEN);
                      triggerRef(internal_state);
                  },
                  once: true,
              }
            : {
                  onLoad: () => internal_state.value.queue.push(EInternalEvent.VISIBILITY_VISIBLE),
                  once: true,
              },
    );

    // Internal state tracking object.
    const internal_state = shallowRef<IInternalState>({
        out: {
            cycles_completed: 0,
            cycles_total: 0,
            metadata: [],
            nodes: [],
        },
        in: {
            cycles_completed: 0,
            cycles_total: 0,
            metadata: [],
            nodes: [],
        },
        cloning: false,
        visible: false,
        queue: [],
    });

    // Animation specific state.
    const state: IState = {
        animation: shallowRef(EState.INITIAL),
        render_variant: shallowRef(false),
        render_clone: shallowRef(false),
    };

    // Automatic render flag watcher & emitter.
    watch(
        state.animation,
        (new_state, old_state) => {
            if (new_state == old_state) return;
            switch (new_state) {
                case EState.INITIAL:
                    internal_state.value.queue.push(EInternalEvent.CLONE_QUEUED);
                    triggerRef(internal_state);
                    break;

                case EState.IDLE:
                    state.render_variant.value = false;
                    state.render_clone.value = false;
                    break;

                case EState.OUT:
                    state.render_variant.value = false;
                    state.render_clone.value = true;
                    break;

                case EState.IN:
                    state.render_variant.value = true;
                    state.render_clone.value = true;
                    break;
            }

            events('stateChange', new_state);
        },
        { immediate: true },
    );

    // Slot content change watcher
    if (slots.default != null)
        watch(slots.default, () => {
            internal_state.value.queue.push(EInternalEvent.SLOT_UPDATE);
            triggerRef(internal_state);
        });

    // Custom render function
    defineRender(() => {
        while (internal_state.value.queue.length != 0) {
            const e = internal_state.value.queue.shift()!;
            const [event, data] = Array.isArray(e) ? e : [e, undefined];

            // NOTE: (xbanki) So, we've got a few edge cases we can hit here, that we need to test/ think about. I think
            //                all of these can be solved with a better queuing system. Future to-do?
            //
            //         1. When the visibility changes, and an animation is currently running, the visibility state
            //            *may not* end up being applied. This is problematic due to the way we handle queue jobs;
            //            specifically how they're eagerly handled whenever a render event is detected.
            //
            //         2. If the content changes, and there's already a cloning in progress, the animation targets
            //            become stale. This is to say that, when we're already cloning and a new "cloneable target"
            //            event comes in, the new content is straight up ignored, meaning we will be animating between
            //            two old states.
            switch (event) {
                case EInternalEvent.VISIBILITY_VISIBLE:
                    if (!internal_state.value.visible) {
                        const states: State[] = [EState.INITIAL, EState.IDLE];
                        if (states.includes(state.animation.value))
                            nextTick(() => initializeAnimation(props, EAnimation.IN));
                    }

                    internal_state.value.visible = true;
                    break;

                case EInternalEvent.VISIBILITY_HIDDEN:
                    if (internal_state.value.visible) {
                        if (state.animation.value == EState.IDLE)
                            nextTick(() => initializeAnimation(props, EAnimation.OUT));
                    }

                    internal_state.value.visible = false;
                    break;

                case EInternalEvent.CLONE_COMPLETED:
                    if (internal_state.value.cloning) {
                        internal_state.value.in.cycles_total = data.cycles;
                        internal_state.value.in.metadata = data.metadata;
                        internal_state.value.in.nodes = data.nodes;
                        internal_state.value.cloning = false;
                        if (internal_state.value.visible) {
                            if (state.animation.value == EState.INITIAL)
                                nextTick(() => initializeAnimation(props, EAnimation.IN));
                            else if (state.animation.value == EState.IDLE)
                                nextTick(() => initializeAnimation(props, EAnimation.BOTH));
                        }
                    }
                    break;

                case EInternalEvent.CLONE_QUEUED:
                    if (slots.default && !internal_state.value.cloning) {
                        cloneVNodeTree(slots.default(), props);
                        internal_state.value.cloning = true;
                    }
                    break;

                case EInternalEvent.SLOT_UPDATE:
                    const states: State[] = [EState.INITIAL, EState.IDLE, EState.OUT];
                    if (states.includes(state.animation.value))
                        internal_state.value.queue.push(EInternalEvent.CLONE_QUEUED);
                    break;
            }
        }

        return h(
            props.element,
            mergeProps(props.component_props, {
                ref: el,
                ...(state.animation.value == EState.INITIAL &&
                    !internal_state.value.visible && { style: { opacity: 0 } }),
            }),
            state.render_clone.value
                ? state.render_variant.value
                    ? internal_state.value.in.nodes
                    : internal_state.value.out.nodes
                : slots.default
                  ? slots.default()
                  : [],
        );
    });
</script>
