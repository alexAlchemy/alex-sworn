/// <reference types="../../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { ref } from 'vue';
const emit = defineEmits();
const modifier = ref(0);
const penalties = [-6, -5, -4, -3, -2, -1, 0];
const bonuses = [0, 1, 2, 3, 4, 5, 6];
const submit = () => {
    emit('submit', {
        modifier: Number(modifier.value) || 0
    });
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['modifier-block']} */ ;
/** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
/** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
/** @type {__VLS_StyleScopedClasses['penalty']} */ ;
/** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
/** @type {__VLS_StyleScopedClasses['bonus']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.submit) },
    ...{ class: "pre-roll-form" },
});
/** @type {__VLS_StyleScopedClasses['pre-roll-form']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sheet-handle" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['sheet-handle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "modifier-block" },
});
/** @type {__VLS_StyleScopedClasses['modifier-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modifier-grid" },
});
/** @type {__VLS_StyleScopedClasses['modifier-grid']} */ ;
for (const [value] of __VLS_vFor((__VLS_ctx.penalties))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.modifier = value;
                // @ts-ignore
                [submit, penalties, modifier,];
            } },
        key: (value),
        type: "button",
        ...{ class: "modifier-button penalty" },
        ...{ class: ({ active: __VLS_ctx.modifier === value }) },
    });
    /** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['penalty']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    (value);
    // @ts-ignore
    [modifier,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "modifier-block" },
});
/** @type {__VLS_StyleScopedClasses['modifier-block']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "modifier-grid" },
});
/** @type {__VLS_StyleScopedClasses['modifier-grid']} */ ;
for (const [value] of __VLS_vFor((__VLS_ctx.bonuses))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.modifier = value;
                // @ts-ignore
                [modifier, bonuses,];
            } },
        key: (value),
        type: "button",
        ...{ class: "modifier-button bonus" },
        ...{ class: ({ active: __VLS_ctx.modifier === value }) },
    });
    /** @type {__VLS_StyleScopedClasses['modifier-button']} */ ;
    /** @type {__VLS_StyleScopedClasses['bonus']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    (value);
    // @ts-ignore
    [modifier,];
}
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    expand: "block",
    type: "submit",
}));
const __VLS_2 = __VLS_1({
    expand: "block",
    type: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
const { default: __VLS_5 } = __VLS_3.slots;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
});
export default {};
