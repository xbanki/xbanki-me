<!--
 // Matrix Reveal Component declaration.
 //
 //    Copyright: Copyright (c) 2025, xbanki <contact@xbanki.me>
 //               Licensed under MIT License.
 //               See LICENSE for more details.
 //    Author:    xbanki <contact@xbanki.me>
 //    Since:     1.0.0
 //    Version:   1.0.0
 //-->

<template>
    <span class="block font-mono">
        {{ label }}
    </span>
</template>

<script lang="ts" setup>
import type { ICharacter } from "@/matrix-reveal/types.ts";

import { DEFAULT_REVEAL_PROPS_OPTIONAL } from "@/matrix-reveal/constants.ts";
import { ERevealDirection } from "@/matrix-reveal/types.ts";
import { ref } from "vue";

// Manually copied prop types, enabling automatic Storybook controls generation.
interface IRevealProps {
    direction?: ERevealDirection;
    duration?: number;
    initial?: string;
    cycles?: number;
    chars?: string;
    label: string;
}

const props = withDefaults(defineProps<IRevealProps>(), DEFAULT_REVEAL_PROPS_OPTIONAL);
const label = ref<string>(props.initial ?? props.label);

if (!props.initial) {
    let replacement = "";
    for (let i = 0; i < props.label.length; i++)
        replacement = `${replacement}${props.chars[Math.floor(Math.random() * props.chars.length)]}`;

    label.value = replacement;
}

let animation: NodeJS.Timeout | undefined = undefined;

switch (props.direction) {
    case ERevealDirection.RANDOM:
        if (animation == undefined) {
            const interval = props.duration / (props.label.length * props.cycles);
            const characters: ICharacter[] = [];

            for (let i = 0; i < props.label.length; i++) characters.push({ pointer: i, cycles: props.cycles - 1 });

            animation = setInterval(() => {
                if (characters.length == 0) {
                    clearInterval(animation);
                    return;
                }

                const i = Math.floor(Math.random() * characters.length);

                characters[i].cycles -= 1;
                if (characters[i].cycles <= 0) {
                    label.value =
                        label.value.slice(0, characters[i].pointer) +
                        props.label[characters[i].pointer] +
                        label.value.slice(characters[i].pointer + 1);
                    characters.splice(i, 1);
                } else
                    label.value =
                        label.value.slice(0, characters[i].pointer) +
                        props.chars[Math.floor(Math.random() * props.chars.length)] +
                        label.value.slice(characters[i].pointer + 1);
            }, interval);
        }
        break;
    case ERevealDirection.CENTER:
        if (animation == undefined) {
            const interval = props.duration / (props.label.length * props.cycles);
            const characters_l: ICharacter[] = [];
            const characters_r: ICharacter[] = [];

            for (let i = 0; i < props.label.length; i++)
                i <= props.label.length / 2
                    ? characters_l.push({ pointer: i, cycles: 0 })
                    : characters_r.push({ pointer: i, cycles: 0 });

            let probability: number = 0.5;
            let cycle = 1;

            animation = setInterval(() => {
                if (characters_r.length == 0 && characters_l.length == 0) {
                    clearInterval(animation);
                    return;
                }

                if (cycle % props.cycles != 0) cycle += 1;
                else {
                    const direction = Math.random() < probability ? 1 : 0;

                    if (characters_r.length <= 0 || (characters_l.length >= 1 && direction == 0)) {
                        const i = characters_l.length - 1;

                        label.value =
                            label.value.slice(0, characters_l[i].pointer) +
                            props.label[characters_l[i].pointer] +
                            label.value.slice(characters_l[i].pointer + 1);

                        characters_l.pop();

                        probability = Math.min(probability + 0.25, 1);
                    } else {
                        const i = 0;

                        label.value =
                            label.value.slice(0, characters_r[i].pointer) +
                            props.label[characters_r[i].pointer] +
                            label.value.slice(characters_r[i].pointer + 1);

                        characters_r.shift();

                        probability = Math.max(probability - 0.25, 0);
                    }

                    for (const character of [...characters_l, ...characters_r]) {
                        label.value =
                            label.value.slice(0, character.pointer) +
                            props.chars[Math.floor(Math.random() * props.chars.length)] +
                            label.value.slice(character.pointer + 1);
                    }

                    cycle = 1;
                }
            }, interval);
        }
        break;
    case ERevealDirection.RIGHT:
        if (animation == undefined) {
            const interval = props.duration / (props.label.length * props.cycles);
            const characters: ICharacter[] = [];

            let cycle = 0;

            for (let i = 0; i < props.label.length; i++) characters.push({ pointer: i, cycles: 0 });

            animation = setInterval(() => {
                if (characters.length == 0) {
                    clearInterval(animation);
                    return;
                }

                if (cycle % props.cycles != 0) cycle += 1;
                else {
                    const i = characters.length - 1;

                    label.value =
                        label.value.slice(0, characters[i].pointer) +
                        props.label[characters[i].pointer] +
                        label.value.slice(characters[i].pointer + 1);

                    characters.pop();

                    for (const character of characters) {
                        label.value =
                            label.value.slice(0, character.pointer) +
                            props.chars[Math.floor(Math.random() * props.chars.length)] +
                            label.value.slice(character.pointer + 1);
                    }

                    cycle = 1;
                }
            }, interval);
        }
        break;
    case ERevealDirection.LEFT:
        if (animation == undefined) {
            const interval = props.duration / (props.label.length * props.cycles);
            const characters: ICharacter[] = [];

            let cycle = 0;

            for (let i = 0; i < props.label.length; i++) characters.push({ pointer: i, cycles: 0 });

            animation = setInterval(() => {
                if (characters.length == 0) {
                    clearInterval(animation);
                    return;
                }

                if (cycle % props.cycles != 0) cycle += 1;
                else {
                    const i = 0;

                    label.value =
                        label.value.slice(0, characters[i].pointer) +
                        props.label[characters[i].pointer] +
                        label.value.slice(characters[i].pointer + 1);

                    characters.shift();

                    for (const character of characters) {
                        label.value =
                            label.value.slice(0, character.pointer) +
                            props.chars[Math.floor(Math.random() * props.chars.length)] +
                            label.value.slice(character.pointer + 1);
                    }

                    cycle = 1;
                }
            }, interval);
        }
        break;
}
</script>
