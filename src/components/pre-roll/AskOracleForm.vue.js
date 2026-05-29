/// <reference types="../../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref } from 'vue';
const props = defineProps();
const emit = defineEmits();
const odds = computed(() => (props.table.kind === 'ask-oracle' ? props.table.odds : []));
const likelihood = ref('fifty-fifty');
const submit = () => {
    emit('submit', {
        likelihood: likelihood.value
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
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group'] | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group']} */
ionRadioGroup;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    modelValue: (__VLS_ctx.likelihood),
    ...{ class: "odds-list" },
}));
const __VLS_2 = __VLS_1({
    modelValue: (__VLS_ctx.likelihood),
    ...{ class: "odds-list" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
/** @type {__VLS_StyleScopedClasses['odds-list']} */ ;
const { default: __VLS_5 } = __VLS_3.slots;
for (const [option] of __VLS_vFor((__VLS_ctx.odds))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
        key: (option.id),
        ...{ class: "odds-option" },
    });
    /** @type {__VLS_StyleScopedClasses['odds-option']} */ ;
    let __VLS_6;
    /** @ts-ignore @type { | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio']} */
    ionRadio;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        value: (option.id),
    }));
    const __VLS_8 = __VLS_7({
        value: (option.id),
    }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (option.label);
    // @ts-ignore
    [submit, likelihood, odds,];
}
// @ts-ignore
[];
var __VLS_3;
let __VLS_11;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    expand: "block",
    type: "submit",
}));
const __VLS_13 = __VLS_12({
    expand: "block",
    type: "submit",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
// @ts-ignore
[];
var __VLS_14;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({
    __typeEmits: {},
    __typeProps: {},
});
export default {};
