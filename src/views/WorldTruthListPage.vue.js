/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { chevronForward } from 'ionicons/icons';
import { systemLabels } from '../data/oracles';
import { useOracleSettings } from '../data/settings';
import { worldTruths } from '../data/truths';
const router = useRouter();
const search = ref('');
const { selectedSystem } = useOracleSettings();
const filteredTruths = computed(() => {
    const query = search.value.trim().toLowerCase();
    return worldTruths.filter((truth) => {
        const matchesSystem = truth.system === selectedSystem.value;
        const matchesQuery = !query ||
            truth.title.toLowerCase().includes(query) ||
            truth.options.some((option) => option.result.toLowerCase().includes(query));
        return matchesSystem && matchesQuery;
    });
});
const openTruth = (id) => {
    router.push({ name: 'WorldTruthDetail', params: { id } });
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['truth-row']} */ ;
/** @type {__VLS_StyleScopedClasses['truth-row']} */ ;
/** @type {__VLS_StyleScopedClasses['truth-row']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
/** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
let __VLS_0;
/** @ts-ignore @type { | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page'] | typeof __VLS_components.ionPage | typeof __VLS_components.IonPage | typeof __VLS_components['ion-page']} */
ionPage;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({}));
const __VLS_2 = __VLS_1({}, ...__VLS_functionalComponentArgsRest(__VLS_1));
var __VLS_5;
const { default: __VLS_6 } = __VLS_3.slots;
let __VLS_7;
/** @ts-ignore @type { | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header'] | typeof __VLS_components.ionHeader | typeof __VLS_components.IonHeader | typeof __VLS_components['ion-header']} */
ionHeader;
// @ts-ignore
const __VLS_8 = __VLS_asFunctionalComponent1(__VLS_7, new __VLS_7({
    translucent: (true),
}));
const __VLS_9 = __VLS_8({
    translucent: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_8));
const { default: __VLS_12 } = __VLS_10.slots;
let __VLS_13;
/** @ts-ignore @type { | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar'] | typeof __VLS_components.ionToolbar | typeof __VLS_components.IonToolbar | typeof __VLS_components['ion-toolbar']} */
ionToolbar;
// @ts-ignore
const __VLS_14 = __VLS_asFunctionalComponent1(__VLS_13, new __VLS_13({}));
const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
const { default: __VLS_18 } = __VLS_16.slots;
let __VLS_19;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_20 = __VLS_asFunctionalComponent1(__VLS_19, new __VLS_19({
    slot: "start",
}));
const __VLS_21 = __VLS_20({
    slot: "start",
}, ...__VLS_functionalComponentArgsRest(__VLS_20));
const { default: __VLS_24 } = __VLS_22.slots;
let __VLS_25;
/** @ts-ignore @type { | typeof __VLS_components.ionMenuButton | typeof __VLS_components.IonMenuButton | typeof __VLS_components['ion-menu-button']} */
ionMenuButton;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    'aria-label': "Open menu",
}));
const __VLS_27 = __VLS_26({
    'aria-label': "Open menu",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_22;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
var __VLS_33;
var __VLS_16;
var __VLS_10;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "truth-list-shell" },
});
/** @type {__VLS_StyleScopedClasses['truth-list-shell']} */ ;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.ionSearchbar | typeof __VLS_components.IonSearchbar | typeof __VLS_components['ion-searchbar']} */
ionSearchbar;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find a truth",
    inputmode: "search",
    debounce: (120),
}));
const __VLS_44 = __VLS_43({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find a truth",
    inputmode: "search",
    debounce: (120),
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
if (__VLS_ctx.filteredTruths.length) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "truth-list" },
    });
    /** @type {__VLS_StyleScopedClasses['truth-list']} */ ;
    for (const [truth] of __VLS_vFor((__VLS_ctx.filteredTruths))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
            ...{ onClick: (...[$event]) => {
                    if (!(__VLS_ctx.filteredTruths.length))
                        return;
                    __VLS_ctx.openTruth(truth.id);
                    // @ts-ignore
                    [search, filteredTruths, filteredTruths, openTruth,];
                } },
            key: (truth.id),
            type: "button",
            ...{ class: "truth-row" },
        });
        /** @type {__VLS_StyleScopedClasses['truth-row']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (truth.title);
        __VLS_asFunctionalElement1(__VLS_intrinsics.small, __VLS_intrinsics.small)({});
        (__VLS_ctx.systemLabels[truth.system]);
        (truth.options.length);
        let __VLS_47;
        /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
        ionIcon;
        // @ts-ignore
        const __VLS_48 = __VLS_asFunctionalComponent1(__VLS_47, new __VLS_47({
            icon: (__VLS_ctx.chevronForward),
            'aria-hidden': "true",
        }));
        const __VLS_49 = __VLS_48({
            icon: (__VLS_ctx.chevronForward),
            'aria-hidden': "true",
        }, ...__VLS_functionalComponentArgsRest(__VLS_48));
        // @ts-ignore
        [systemLabels, chevronForward,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.systemLabels[__VLS_ctx.selectedSystem]);
}
// @ts-ignore
[systemLabels, selectedSystem,];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
