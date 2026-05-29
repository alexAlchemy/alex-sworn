/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { systemLabels } from '../data/oracles';
import { findWorldTruth } from '../data/truths';
const route = useRoute();
const truth = computed(() => findWorldTruth(String(route.params.id)));
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['option-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['subtable-row']} */ ;
/** @type {__VLS_StyleScopedClasses['subtable-row']} */ ;
/** @type {__VLS_StyleScopedClasses['subtable-row']} */ ;
/** @type {__VLS_StyleScopedClasses['subtable-row']} */ ;
/** @type {__VLS_StyleScopedClasses['quest-starter']} */ ;
/** @type {__VLS_StyleScopedClasses['quest-starter']} */ ;
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
/** @ts-ignore @type { | typeof __VLS_components.ionBackButton | typeof __VLS_components.IonBackButton | typeof __VLS_components['ion-back-button']} */
ionBackButton;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    defaultHref: "/truths",
    text: "",
}));
const __VLS_27 = __VLS_26({
    defaultHref: "/truths",
    text: "",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
var __VLS_22;
let __VLS_30;
/** @ts-ignore @type { | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title'] | typeof __VLS_components.ionTitle | typeof __VLS_components.IonTitle | typeof __VLS_components['ion-title']} */
ionTitle;
// @ts-ignore
const __VLS_31 = __VLS_asFunctionalComponent1(__VLS_30, new __VLS_30({}));
const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
const { default: __VLS_35 } = __VLS_33.slots;
(__VLS_ctx.truth?.title ?? 'World Truth');
// @ts-ignore
[truth,];
var __VLS_33;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({}));
const __VLS_38 = __VLS_37({}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
if (__VLS_ctx.truth) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "truth-detail-shell" },
    });
    /** @type {__VLS_StyleScopedClasses['truth-detail-shell']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "detail-heading" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-heading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.systemLabels[__VLS_ctx.truth.system]);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    (__VLS_ctx.truth.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "option-list" },
    });
    /** @type {__VLS_StyleScopedClasses['option-list']} */ ;
    for (const [option] of __VLS_vFor((__VLS_ctx.truth.options))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
            key: (option.id),
            ...{ class: "truth-option" },
        });
        /** @type {__VLS_StyleScopedClasses['truth-option']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "option-heading" },
        });
        /** @type {__VLS_StyleScopedClasses['option-heading']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (option.range);
        __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
        (option.result);
        if (option.description) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "description" },
            });
            /** @type {__VLS_StyleScopedClasses['description']} */ ;
            (option.description);
        }
        if (option.subtable.length) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
                ...{ class: "subtable" },
            });
            /** @type {__VLS_StyleScopedClasses['subtable']} */ ;
            for (const [row] of __VLS_vFor((option.subtable))) {
                __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
                    key: (row.id),
                    ...{ class: "subtable-row" },
                });
                /** @type {__VLS_StyleScopedClasses['subtable-row']} */ ;
                __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
                (row.range);
                __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
                (row.result);
                // @ts-ignore
                [truth, truth, truth, truth, systemLabels,];
            }
        }
        if (option.questStarter) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
                ...{ class: "quest-starter" },
            });
            /** @type {__VLS_StyleScopedClasses['quest-starter']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
            (option.questStarter);
        }
        // @ts-ignore
        [];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "truth-detail-shell" },
    });
    /** @type {__VLS_StyleScopedClasses['truth-detail-shell']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "empty-state" },
    });
    /** @type {__VLS_StyleScopedClasses['empty-state']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    let __VLS_42;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
        routerLink: "/truths",
        routerDirection: "root",
    }));
    const __VLS_44 = __VLS_43({
        routerLink: "/truths",
        routerDirection: "root",
    }, ...__VLS_functionalComponentArgsRest(__VLS_43));
    const { default: __VLS_47 } = __VLS_45.slots;
    // @ts-ignore
    [];
    var __VLS_45;
}
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
