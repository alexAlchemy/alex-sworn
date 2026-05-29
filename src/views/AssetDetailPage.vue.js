/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { findAsset } from '../data/assets';
import { systemLabels } from '../data/oracles';
const route = useRoute();
const asset = computed(() => findAsset(String(route.params.id)));
const facts = computed(() => {
    const currentAsset = asset.value;
    if (!currentAsset) {
        return [];
    }
    return [
        currentAsset.requirement ? { label: 'Requirement', value: currentAsset.requirement } : null,
        currentAsset.inputs.length ? { label: 'Inputs', value: currentAsset.inputs.join(', ') } : null,
        currentAsset.conditionMeter ? { label: 'Meter', value: currentAsset.conditionMeter } : null,
        currentAsset.attachments ? { label: 'Attachments', value: currentAsset.attachments } : null,
        currentAsset.shared ? { label: 'Usage', value: 'Shared asset' } : null
    ].filter((fact) => Boolean(fact));
});
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['detail-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['description']} */ ;
/** @type {__VLS_StyleScopedClasses['fact-list']} */ ;
/** @type {__VLS_StyleScopedClasses['fact-row']} */ ;
/** @type {__VLS_StyleScopedClasses['fact-row']} */ ;
/** @type {__VLS_StyleScopedClasses['fact-row']} */ ;
/** @type {__VLS_StyleScopedClasses['fact-row']} */ ;
/** @type {__VLS_StyleScopedClasses['ability-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ability-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ability-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['ability-heading']} */ ;
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
    defaultHref: "/assets",
    text: "",
}));
const __VLS_27 = __VLS_26({
    defaultHref: "/assets",
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
(__VLS_ctx.asset?.title ?? 'Asset');
// @ts-ignore
[asset,];
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
if (__VLS_ctx.asset) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "asset-detail-shell" },
    });
    /** @type {__VLS_StyleScopedClasses['asset-detail-shell']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)({
        ...{ class: "detail-heading" },
    });
    /** @type {__VLS_StyleScopedClasses['detail-heading']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "asset-swatch" },
        ...{ style: ({ '--asset-color': __VLS_ctx.asset.color ?? '#2f604f' }) },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['asset-swatch']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
    (__VLS_ctx.systemLabels[__VLS_ctx.asset.system]);
    (__VLS_ctx.asset.group);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
    (__VLS_ctx.asset.title);
    if (__VLS_ctx.asset.description) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "description" },
        });
        /** @type {__VLS_StyleScopedClasses['description']} */ ;
        (__VLS_ctx.asset.description);
    }
    if (__VLS_ctx.facts.length) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
            ...{ class: "fact-list" },
        });
        /** @type {__VLS_StyleScopedClasses['fact-list']} */ ;
        for (const [fact] of __VLS_vFor((__VLS_ctx.facts))) {
            __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
                key: (fact.label),
                ...{ class: "fact-row" },
            });
            /** @type {__VLS_StyleScopedClasses['fact-row']} */ ;
            __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
            (fact.label);
            __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
            (fact.value);
            // @ts-ignore
            [asset, asset, asset, asset, asset, asset, asset, systemLabels, facts, facts,];
        }
    }
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "ability-list" },
    });
    /** @type {__VLS_StyleScopedClasses['ability-list']} */ ;
    for (const [ability, index] of __VLS_vFor((__VLS_ctx.asset.abilities))) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.article, __VLS_intrinsics.article)({
            key: (ability.id),
            ...{ class: "ability-card" },
        });
        /** @type {__VLS_StyleScopedClasses['ability-card']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
            ...{ class: "ability-heading" },
        });
        /** @type {__VLS_StyleScopedClasses['ability-heading']} */ ;
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
        (index + 1);
        __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
        (ability.name ?? (ability.enabled ? 'Starting ability' : 'Upgrade'));
        __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({});
        (ability.text);
        // @ts-ignore
        [asset,];
    }
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
        ...{ class: "asset-detail-shell" },
    });
    /** @type {__VLS_StyleScopedClasses['asset-detail-shell']} */ ;
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
        routerLink: "/assets",
        routerDirection: "root",
    }));
    const __VLS_44 = __VLS_43({
        routerLink: "/assets",
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
