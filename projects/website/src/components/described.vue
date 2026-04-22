<!--
  - Copyright (c) 2026, xbanki <contact@xbanki.me>
  - Licensed under MIT License.
  - See LICENSE for more details.
  -->

<template>
    <!-- Title of the "Described" component. This component is responsible for "hiding" description bodies if a      -->
    <!-- sticky scroll element were to overlap with it, or in other words, if the viewport rect exceeded a           -->
    <!-- defined threshold.                                                                                          -->
    <!-- This is done for a few reasons:                                                                             -->
    <!--                                                                                                             -->
    <!--   1. Allows for a static interaction effect, while not forcing an entire body of text to travel;            -->
    <!--   2. Stops text from overlapping, which would make it difficult to read;                                    -->
    <!--                                                                                                             -->
    <!-- The effect is scroll driven, which is to say depending on the scroll position, the description box may be   -->
    <!-- more or less faded out depending on the scroll position.                                                    -->
    <div
        class="sticky top-0 h-fit w-fit"
        ref="v-described-title"
    >
        <slot name="title" />
    </div>
    <!-- Opacity transitioned "description" element. This element is constrained to it's parent's bounding box     //-->
    <!-- via relative positioning.                                                                                 //-->
    <div
        class="w-fit duration-150"
        ref="v-described-content"
        v-bind:style="style"
    >
        <slot name="default" />
    </div>
</template>

<script lang="ts" setup>
    import { useTemplateRef, onUnmounted, onMounted, computed, ref } from 'vue';

    const style = computed(() => ({ opacity: `${overlap.value}%` }));
    const content = useTemplateRef('v-described-content');
    const title = useTemplateRef('v-described-title');
    const overlap = ref(100);

    const SIZE_THRESHOLD_RANGE_MAX = 120;
    const SIZE_THRESHOLD_RANGE_MIN = 40;
    const SIZE_SCALE_THRESHOLD = 0.1;

    let position_active = false;

    /**
     * Calculates the overlap of two HTML elements that are axis-aligned, returning an approximate "overlap amount" that
     * scales between 0-100, inclusive.
     *
     * @param title The title element. This is the element that appears over the top of the `content` element.
     * @param content Content element. This element appears below the title element, thus overlap is measured against.
     * @returns How much the elements overlap. `0` signifies none, `100` signifies complete overlap.
     */
    function calculateOverlap(title: HTMLElement, content: HTMLElement) {
        const bounds_content = content.getBoundingClientRect();
        const bounds_title = title.getBoundingClientRect();

        if (
            bounds_title.bottom < bounds_content.top ||
            bounds_content.left > bounds_title.right ||
            bounds_title.left > bounds_content.right
        )
            return 1;

        const t = Math.min(
            1,
            (bounds_title.bottom - bounds_content.top) /
                Math.min(
                    SIZE_THRESHOLD_RANGE_MAX,
                    Math.max(SIZE_THRESHOLD_RANGE_MIN, Math.round(bounds_content.height * SIZE_SCALE_THRESHOLD)),
                ),
        );

        return (1 - t * t) * 100;
    }

    /**
     * Event handler, responsible for updating the description box opacity based on overlap amount.
     */
    function eventHandler() {
        if (position_active) return;

        setTimeout(() => {
            if (!title.value || !content.value) return;

            const value = calculateOverlap(title.value, content.value);
            if (value == overlap.value) {
                position_active = false;
                return;
            }

            position_active = false;
            overlap.value = value;
        }, 20);

        position_active = true;
    }

    onMounted(() => {
        if (!content.value || !title.value) return;

        overlap.value = calculateOverlap(title.value, content.value);
        document.addEventListener('scroll', eventHandler);
        document.addEventListener('resize', eventHandler);
    });

    onUnmounted(() => {
        document.removeEventListener('scroll', eventHandler);
        document.removeEventListener('resize', eventHandler);
    });
</script>
