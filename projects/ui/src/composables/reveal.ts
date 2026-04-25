/*
 * Copyright (c) 2025-2026, xbanki <contact@xbanki.me>
 * Licensed under MIT License.
 * See LICENSE for more details.
 */

import type { ShallowRef, Ref } from 'vue';
import { shallowRef, onBeforeUnmount, onMounted, watch, ref } from 'vue';
import { merge } from 'ts-deepmerge';

// Hook type, which allows using either a string literal or enum member directly.
type Hook = `${EHook}` | EHook;

// Re-usable effect type.
type Effect = IEffect | ((state: Ref<boolean>, element: ShallowRef<HTMLElement>) => void);

// TODO: (xbanki) This type should be hoisted somewhere. Might be useful later.
type DeepPartial<T> = T extends Function
    ? T
    : T extends Map<infer K, infer V>
      ? Map<DeepPartial<K>, DeepPartial<V>>
      : T extends Set<infer U>
        ? Set<DeepPartial<U>>
        : T extends Array<infer U>
          ? Array<DeepPartial<U>>
          : T extends object
            ? { [K in keyof T]?: DeepPartial<T[K]> }
            : T;

/**
 * Condition for how the reveal effects are dispatched.
 */
export enum EHook {
    /**
     * The target window must be visible within the encapsulating element's viewable bounds.
     * Implements the `LOAD` effect as well.
     */
    INTERSECT = 'intersect',

    /**
     * Disables any automatic effect invocation, leaving the state management responsibility to the caller via the
     * `state` reference variable.
     */
    CUSTOM = 'custom',

    /**
     * Applies the effect after the browser has finished loading.
     */
    LOAD = 'load',
}

/**
 * Class-based effect specification type.
 */
interface IEffect {
    /**
     * Active state class (`true` state).
     */
    active: string;

    /**
     * Inactive state class (`false` state).
     */
    inactive: string;
}

/**
 * Reveal composable options.
 */
interface IOptions {
    /**
     * Delay which is applied when the effect is first loaded, in milliseconds.
     *
     * @default 225
     */
    delay: number;

    /**
     * The actual effect applied.
     *
     * 1. If the parameter is an `object` type, the caller can specify two classes which the hook switches between.
     *    `active` for the `true` state, and `inactive` for `false` state.
     * 2. If the parameter is a function, the function is used as the effect instead, with no defaults being applied. The
     *    function itself will be called twice: Once to set up the "base state", and then depending on if `options.once`
     *    is set, the necessary times required by the hook.
     */
    effect: Effect;

    /**
     * How the underlying effect is dispatched.
     *
     * - `EHook.INTERSECT` — The effect is applied when the target element is visible within the constraining box. It is
     *   important to note, that regardless of the initially specified value, the state variable will directly reflect
     *   whether the element is on screen or not.
     * - `EHook.CUSTOM` — A fully hands-off hook, which leaves the state management up to the caller via the `state`
     *   reference variable.
     * - `EHook.LOAD` — Invokes the effect after the browser has finished loading the page, with a short delay applied. It
     *   is important to note that the load hook flips the state variable boolean when the hook is invoked.
     *
     * @default EHook.INTERSECT
     */
    hook: Hook;

    /**
     * Observer API parameters. These are not used if `options.hook` is _not_ set to `intersect`.
     */
    observer: Required<IntersectionObserverInit & { scrollMargin: string }>;

    /**
     * Whether the effect is applied only once after set-up.
     *
     * @default false
     */
    once: boolean;

    /**
     * A callback function, which gets invoked after the document `load` state has been satisfied.
     */
    onLoad: () => void;

    /**
     * The default effect state the element starts off in.
     *
     * @default false
     */
    state: boolean;
}

interface IObserver {
    targets: Map<Element, Ref<boolean>>;
    observer: IntersectionObserver;
}

// How "long" the effect is throttled (delayed), in milliseconds.
const DEFAULT_LOAD_THROTTLE = 20;

// A list of CSS classes that are added to each target element, only if the hook is not `EHook.CUSTOM`.
const DEFAULT_CLASSES = ['transition-opacity'];

// Default `useReveal` options. Deeply merged with user's options, if any specified.
const DEFAULT_OPTIONS: IOptions = {
    effect: {
        inactive: 'opacity-0',
        active: 'opacity-100',
    },
    observer: {
        rootMargin: '0px 0px 0px 0px',
        scrollMargin: '16px',
        root: document,
        threshold: 0,
    },
    hook: EHook.INTERSECT,
    onLoad: () => {},
    state: false,
    once: false,
    delay: 225,
};

// Observer & target registry.
const observers: Map<string, IObserver> = new Map();

/**
 * Attaches the "default" effect, which effectively just swaps two classes on the target element based on state.
 *
 * @param el - The target element, which this effect is applied onto.
 * @param state - The actual state that controls which class gets applied.
 * @param inactive - The inactive class, applied when `state.value == false`.
 * @param active - The active class, applied when `state.value == true`.
 */
function effectDefault(el: ShallowRef<HTMLElement | undefined>, state: Ref<boolean>, inactive: string, active: string) {
    if (!el.value) return;

    switch (state.value) {
        case true:
            if (el.value.classList.contains(inactive)) el.value.classList.remove(inactive);

            if (!el.value.classList.contains(active)) el.value.classList.add(active);

            break;

        case false:
            if (el.value.classList.contains(active)) el.value.classList.remove(active);

            if (!el.value.classList.contains(inactive)) el.value.classList.add(inactive);

            break;
    }
}

/**
 * Creates, or returns an intersection observer instance if one exists already.
 *
 * @param options - The options which to pass to the observer, if not created.
 * @param fn - The callback which gets invoked whenever the observer intersects with anything.
 * @returns A new or pre-existing observer.
 */
function createOrGetObserver(options: IntersectionObserverInit, fn: IntersectionObserverCallback) {
    const id = JSON.stringify(options);
    if (!observers.has(id)) {
        const observer = new IntersectionObserver(fn, options);
        const targets = new Map();

        observers.set(id, { observer, targets });
    }

    return observers.get(id)!;
}

/**
 * Creates an effect watcher that is attached on an element based on a descriptor object. This function also attaches a
 * set of CSS classes, based on the `DEFAULT_CLASSES` constant variable.
 *
 * @param el - The target element which to attach the effect to.
 * @param state - The state reference, which will be watched as the effect trigger.
 * @param effect - Effect descriptor.
 * @param once - Whether the effect that is generated will be triggered just one time.
 */
function createEffect(el: ShallowRef<HTMLElement>, state: Ref<boolean>, effect: Effect, once: boolean) {
    switch (typeof effect) {
        case 'object':
            if (effect == null) return;
            for (const cls of DEFAULT_CLASSES) if (!el.value.classList.contains(cls)) el.value.classList.add(cls);

            if (once) {
                effectDefault(el, state, effect.inactive, effect.active);
                watch(
                    state,
                    // @ts-ignore `opts.effect` is guaranteed to have the same type.
                    () => effectDefault(el, state, effect.inactive, effect.active),
                    { once: true },
                );
            } else
                watch(
                    state,
                    // @ts-ignore Same as above.
                    () => effectDefault(el, state, effect.inactive, effect.active),
                    { immediate: true },
                );

            break;

        case 'function':
            if (once) {
                effect(state, el);
                watch(state, () => effect(state, el), { once: true });
            } else watch(state, () => effect(state, el), { immediate: true });

            break;
    }
}

/**
 * Creates the necessary boilerplate to observe a target element for the reveal effect.
 *
 * @param element - Element, which to observe.
 * @param state - State flag that will be mutated based on the observation state.
 * @param opts - Options, passed to the observer itself.
 */
function createIntersectionHook(element: ShallowRef<HTMLElement>, state: Ref<boolean>, opts: IntersectionObserverInit) {
    const { observer, targets } = createOrGetObserver(opts, entries => {
        const sorted = entries.length <= 1 ? entries : entries.sort((a, b) => a.time - b.time);

        for (const entry of sorted) {
            const state = targets.get(entry.target);
            if (state != undefined) state.value = entry.isIntersecting;
        }
    });

    if (element.value) {
        targets.set(element.value, state);
        observer.observe(element.value);
    }
}

/**
 * Creates a load event hook, which fires the supplied callback function depending on the loaded state.
 *
 * @param delay - Delay in milliseconds for how long after the load event the actual callback function is fired.
 * @param fn - Callback to execute after loading is complete.
 */
function createLoadHook(delay: number, fn: () => void) {
    if (document.readyState == 'loading') {
        const listener = () => {
            setTimeout(fn, delay + DEFAULT_LOAD_THROTTLE);
            document.removeEventListener('DOMContentLoaded', listener);
        };

        document.addEventListener('DOMContentLoaded', listener);
        return;
    }

    setTimeout(fn, delay + DEFAULT_LOAD_THROTTLE);
}

/**
 * Custom composable hook that allows effect orchestration based on the viewport reveal state.
 *
 * The function returns two variables:
 *
 * 1. `el` - A weak reference to the element, which this effect is applied to. This must be attached to the target
 *    element's `ref` property.
 * 2. `state` - Reference to the current reveal state. If the `options.hook` parameter is set to `custom`, this variable
 *    must be mutated _directly_ to invoke the attached effect.
 *
 * The default effect is class-based, which transitions the underlying element between two opacity states.
 *
 * By default, the effect is applied after application `load` state has completed, which is delayed by the
 * `options.delay` parameter. The delay is applied to allow the browser to paint the first render on-screen, resulting
 * in a smoother browsing experience.
 *
 * @param options - Reveal options.
 * @see IOptions
 */
export function useReveal(options?: DeepPartial<IOptions>) {
    const opts = merge.withOptions({ allowUndefinedOverrides: false }, DEFAULT_OPTIONS, options ?? {}) as IOptions;

    const el = shallowRef<HTMLElement>();
    const state = ref(opts.state);

    onBeforeUnmount(() => {
        const id = JSON.stringify(opts.observer);
        if (!observers.has(id) || !el.value) return;

        const { observer, targets } = observers.get(id)!;

        observer.unobserve(el.value);
        targets.delete(el.value);

        if (targets.size > 0) return;

        observer.disconnect();
        observers.delete(id);
    });

    onMounted(() => {
        if (!el.value || !(el.value instanceof HTMLElement)) return;

        switch (opts.hook) {
            case EHook.INTERSECT:
                createLoadHook(opts.delay, () => {
                    opts.onLoad();
                    createIntersectionHook(el as ShallowRef<HTMLElement>, state, opts.observer);
                });

                createEffect(el as ShallowRef<HTMLElement>, state, opts.effect, opts.once);

                break;

            case EHook.CUSTOM:
                createEffect(el as ShallowRef<HTMLElement>, state, opts.effect, opts.once);

                break;

            case EHook.LOAD:
                createLoadHook(opts.delay, () => {
                    opts.onLoad();
                    state.value = !state.value;
                });
                createEffect(el as ShallowRef<HTMLElement>, state, opts.effect, opts.once);

                break;
        }
    });

    return { state, el };
}
