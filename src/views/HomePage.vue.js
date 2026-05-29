/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { informationCircleOutline, settingsOutline } from 'ionicons/icons';
import { allCategory, categoryOrders, findRandomTable, getRollResultText, getRollValueLabel, getUnrolledLabel, oracleTables, rollTable, systemLabels } from '../data/oracles';
import { useRollHistory } from '../data/history';
import { useOracleSettings } from '../data/settings';
import ActionRollForm from '../components/pre-roll/ActionRollForm.vue';
import AskOracleForm from '../components/pre-roll/AskOracleForm.vue';
const search = ref('');
const router = useRouter();
const selectedTable = ref(oracleTables[0]);
const selectedCategory = ref(allCategory);
const currentResult = ref(null);
const contentRef = ref(null);
const settingsOpen = ref(false);
const preRollOpen = ref(false);
const currentPreRollTable = ref(null);
const infoOpen = ref(false);
const infoTable = ref(null);
const { addRoll } = useRollHistory();
const { selectedSystem, includeCustom, setSelectedSystem, setIncludeCustom } = useOracleSettings();
const preRollForms = {
    ActionRollForm,
    AskOracleForm
};
const currentPreRollComponent = computed(() => {
    const formName = currentPreRollTable.value?.preRollForm?.component;
    return formName ? preRollForms[formName] : null;
});
const categoryOptions = computed(() => {
    const available = new Set(oracleTables
        .filter((table) => table.system === selectedSystem.value || (includeCustom.value && table.system === 'custom'))
        .map((table) => table.category));
    const ordered = categoryOrders[selectedSystem.value].filter((category) => category === allCategory || available.has(category));
    const extras = [...available].filter((category) => !ordered.includes(category)).sort();
    return [...ordered, ...extras];
});
const filteredTables = computed(() => {
    const query = search.value.trim().toLowerCase();
    return oracleTables.filter((table) => {
        const matchesSystem = table.system === selectedSystem.value || (includeCustom.value && table.system === 'custom');
        const matchesCategory = selectedCategory.value === allCategory || table.category === selectedCategory.value;
        const matchesQuery = !query ||
            table.title.toLowerCase().includes(query) ||
            table.category.toLowerCase().includes(query) ||
            systemLabels[table.system].toLowerCase().includes(query);
        return matchesSystem && matchesCategory && matchesQuery;
    });
});
watch([selectedSystem, includeCustom, selectedCategory], () => {
    if (!categoryOptions.value.includes(selectedCategory.value)) {
        selectedCategory.value = allCategory;
        return;
    }
    if (!filteredTables.value.some((table) => table.id === selectedTable.value.id)) {
        selectedTable.value = filteredTables.value[0] ?? oracleTables[0];
        currentResult.value = null;
    }
});
const handleSystemChange = (event) => {
    setSelectedSystem(event.detail.value);
};
const handleIncludeCustomChange = (event) => {
    setIncludeCustom(event.detail.checked);
};
const scrollToResult = () => {
    requestAnimationFrame(() => {
        contentRef.value?.$el.scrollToTop(260);
    });
};
const completeRoll = (table, payload) => {
    currentResult.value = rollTable(table, payload);
    addRoll(table, currentResult.value);
    scrollToResult();
};
const requestRoll = (table) => {
    if (table.preRollForm) {
        currentPreRollTable.value = table;
        preRollOpen.value = true;
        return;
    }
    completeRoll(table);
};
const rollSelectedTable = () => {
    requestRoll(selectedTable.value);
};
const rollRow = (table) => {
    selectedTable.value = table;
    requestRoll(table);
};
const canBrowseInfoTable = computed(() => Boolean(infoTable.value && findRandomTable(infoTable.value.id)));
const openInfo = (table) => {
    infoTable.value = table;
    infoOpen.value = true;
};
const closeInfo = () => {
    infoOpen.value = false;
    infoTable.value = null;
};
const goToInfoTable = () => {
    if (!infoTable.value || !canBrowseInfoTable.value) {
        return;
    }
    router.push({ name: 'RandomTableDetail', params: { id: infoTable.value.id } });
    infoOpen.value = false;
};
const rollInfoTable = () => {
    const table = infoTable.value;
    if (!table) {
        return;
    }
    selectedTable.value = table;
    infoOpen.value = false;
    requestRoll(table);
};
const completePreRoll = (payload) => {
    const table = currentPreRollTable.value;
    if (table) {
        selectedTable.value = table;
        completeRoll(table, payload);
    }
    preRollOpen.value = false;
};
const closePreRoll = () => {
    preRollOpen.value = false;
    currentPreRollTable.value = null;
};
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
/** @type {__VLS_StyleScopedClasses['roll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['roll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['unrolled']} */ ;
/** @type {__VLS_StyleScopedClasses['roll-value']} */ ;
/** @type {__VLS_StyleScopedClasses['oracle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['oracle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['oracle-label']} */ ;
/** @type {__VLS_StyleScopedClasses['category-rail']} */ ;
/** @type {__VLS_StyleScopedClasses['category-chip']} */ ;
/** @type {__VLS_StyleScopedClasses['active']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-content']} */ ;
/** @type {__VLS_StyleScopedClasses['sheet-eyebrow']} */ ;
/** @type {__VLS_StyleScopedClasses['info-content']} */ ;
/** @type {__VLS_StyleScopedClasses['info-description']} */ ;
/** @type {__VLS_StyleScopedClasses['home-shell']} */ ;
/** @type {__VLS_StyleScopedClasses['roll-panel']} */ ;
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
let __VLS_36;
/** @ts-ignore @type { | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons'] | typeof __VLS_components.ionButtons | typeof __VLS_components.IonButtons | typeof __VLS_components['ion-buttons']} */
ionButtons;
// @ts-ignore
const __VLS_37 = __VLS_asFunctionalComponent1(__VLS_36, new __VLS_36({
    slot: "end",
}));
const __VLS_38 = __VLS_37({
    slot: "end",
}, ...__VLS_functionalComponentArgsRest(__VLS_37));
const { default: __VLS_41 } = __VLS_39.slots;
let __VLS_42;
/** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
ionButton;
// @ts-ignore
const __VLS_43 = __VLS_asFunctionalComponent1(__VLS_42, new __VLS_42({
    ...{ 'onClick': {} },
    'aria-label': "Open settings",
}));
const __VLS_44 = __VLS_43({
    ...{ 'onClick': {} },
    'aria-label': "Open settings",
}, ...__VLS_functionalComponentArgsRest(__VLS_43));
let __VLS_47;
const __VLS_48 = ({ click: {} },
    { onClick: (...[$event]) => {
            __VLS_ctx.settingsOpen = true;
            // @ts-ignore
            [settingsOpen,];
        } });
const { default: __VLS_49 } = __VLS_45.slots;
let __VLS_50;
/** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
ionIcon;
// @ts-ignore
const __VLS_51 = __VLS_asFunctionalComponent1(__VLS_50, new __VLS_50({
    slot: "icon-only",
    icon: (__VLS_ctx.settingsOutline),
}));
const __VLS_52 = __VLS_51({
    slot: "icon-only",
    icon: (__VLS_ctx.settingsOutline),
}, ...__VLS_functionalComponentArgsRest(__VLS_51));
// @ts-ignore
[settingsOutline,];
var __VLS_45;
var __VLS_46;
// @ts-ignore
[];
var __VLS_39;
// @ts-ignore
[];
var __VLS_16;
// @ts-ignore
[];
var __VLS_10;
let __VLS_55;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({
    ref: "contentRef",
}));
const __VLS_57 = __VLS_56({
    ref: "contentRef",
}, ...__VLS_functionalComponentArgsRest(__VLS_56));
var __VLS_60;
const { default: __VLS_62 } = __VLS_58.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.main, __VLS_intrinsics.main)({
    ...{ class: "home-shell" },
});
/** @type {__VLS_StyleScopedClasses['home-shell']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "roll-panel" },
    'aria-live': "polite",
});
/** @type {__VLS_StyleScopedClasses['roll-panel']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "roll-copy" },
});
/** @type {__VLS_StyleScopedClasses['roll-copy']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)({});
(__VLS_ctx.selectedTable.title);
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "result" },
});
/** @type {__VLS_StyleScopedClasses['result']} */ ;
(__VLS_ctx.currentResult ? __VLS_ctx.getRollResultText(__VLS_ctx.currentResult) : 'Tap a row to roll.');
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    ...{ onClick: (__VLS_ctx.rollSelectedTable) },
    ...{ class: "roll-button" },
    ...{ class: ({ unrolled: !__VLS_ctx.currentResult }) },
    type: "button",
});
/** @type {__VLS_StyleScopedClasses['roll-button']} */ ;
/** @type {__VLS_StyleScopedClasses['unrolled']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "roll-value" },
});
/** @type {__VLS_StyleScopedClasses['roll-value']} */ ;
(__VLS_ctx.currentResult ? __VLS_ctx.getRollValueLabel(__VLS_ctx.currentResult) : __VLS_ctx.getUnrolledLabel(__VLS_ctx.selectedTable));
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
let __VLS_63;
/** @ts-ignore @type { | typeof __VLS_components.ionSearchbar | typeof __VLS_components.IonSearchbar | typeof __VLS_components['ion-searchbar']} */
ionSearchbar;
// @ts-ignore
const __VLS_64 = __VLS_asFunctionalComponent1(__VLS_63, new __VLS_63({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find an oracle",
    inputmode: "search",
    debounce: (120),
}));
const __VLS_65 = __VLS_64({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find an oracle",
    inputmode: "search",
    debounce: (120),
}, ...__VLS_functionalComponentArgsRest(__VLS_64));
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)({
    ...{ class: "category-rail" },
    'aria-label': "Table families",
});
/** @type {__VLS_StyleScopedClasses['category-rail']} */ ;
for (const [category] of __VLS_vFor((__VLS_ctx.categoryOptions))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.selectedCategory = category;
                // @ts-ignore
                [selectedTable, selectedTable, currentResult, currentResult, currentResult, currentResult, currentResult, getRollResultText, rollSelectedTable, getRollValueLabel, getUnrolledLabel, search, categoryOptions, selectedCategory,];
            } },
        key: (category),
        type: "button",
        ...{ class: "category-chip" },
        ...{ class: ({ active: category === __VLS_ctx.selectedCategory }) },
    });
    /** @type {__VLS_StyleScopedClasses['category-chip']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    (category);
    // @ts-ignore
    [selectedCategory,];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "oracle-grid" },
});
/** @type {__VLS_StyleScopedClasses['oracle-grid']} */ ;
for (const [table] of __VLS_vFor((__VLS_ctx.filteredTables))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.rollRow(table);
                // @ts-ignore
                [filteredTables, rollRow,];
            } },
        key: (table.id),
        type: "button",
        ...{ class: "oracle-card" },
        ...{ class: ({ active: table.id === __VLS_ctx.selectedTable.id }) },
    });
    /** @type {__VLS_StyleScopedClasses['oracle-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "oracle-label" },
    });
    /** @type {__VLS_StyleScopedClasses['oracle-label']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (table.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (table.category);
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.openInfo(table);
                // @ts-ignore
                [selectedTable, openInfo,];
            } },
        type: "button",
        ...{ class: "info-button" },
        'aria-label': (`About ${table.title}`),
    });
    /** @type {__VLS_StyleScopedClasses['info-button']} */ ;
    let __VLS_68;
    /** @ts-ignore @type { | typeof __VLS_components.ionIcon | typeof __VLS_components.IonIcon | typeof __VLS_components['ion-icon']} */
    ionIcon;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent1(__VLS_68, new __VLS_68({
        icon: (__VLS_ctx.informationCircleOutline),
    }));
    const __VLS_70 = __VLS_69({
        icon: (__VLS_ctx.informationCircleOutline),
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    // @ts-ignore
    [informationCircleOutline,];
}
let __VLS_73;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_74 = __VLS_asFunctionalComponent1(__VLS_73, new __VLS_73({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.settingsOpen),
    initialBreakpoint: (0.42),
    breakpoints: ([0, 0.42, 0.72]),
}));
const __VLS_75 = __VLS_74({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.settingsOpen),
    initialBreakpoint: (0.42),
    breakpoints: ([0, 0.42, 0.72]),
}, ...__VLS_functionalComponentArgsRest(__VLS_74));
let __VLS_78;
const __VLS_79 = ({ didDismiss: {} },
    { onDidDismiss: (...[$event]) => {
            __VLS_ctx.settingsOpen = false;
            // @ts-ignore
            [settingsOpen, settingsOpen,];
        } });
const { default: __VLS_80 } = __VLS_76.slots;
let __VLS_81;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_82 = __VLS_asFunctionalComponent1(__VLS_81, new __VLS_81({
    ...{ class: "settings-sheet" },
}));
const __VLS_83 = __VLS_82({
    ...{ class: "settings-sheet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_82));
/** @type {__VLS_StyleScopedClasses['settings-sheet']} */ ;
const { default: __VLS_86 } = __VLS_84.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "settings-content" },
});
/** @type {__VLS_StyleScopedClasses['settings-content']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "sheet-handle" },
    'aria-hidden': "true",
});
/** @type {__VLS_StyleScopedClasses['sheet-handle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
let __VLS_87;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_88 = __VLS_asFunctionalComponent1(__VLS_87, new __VLS_87({
    inset: (true),
}));
const __VLS_89 = __VLS_88({
    inset: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_88));
const { default: __VLS_92 } = __VLS_90.slots;
let __VLS_93;
/** @ts-ignore @type { | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group'] | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group']} */
ionRadioGroup;
// @ts-ignore
const __VLS_94 = __VLS_asFunctionalComponent1(__VLS_93, new __VLS_93({
    ...{ 'onIonChange': {} },
    value: (__VLS_ctx.selectedSystem),
}));
const __VLS_95 = __VLS_94({
    ...{ 'onIonChange': {} },
    value: (__VLS_ctx.selectedSystem),
}, ...__VLS_functionalComponentArgsRest(__VLS_94));
let __VLS_98;
const __VLS_99 = ({ ionChange: {} },
    { onIonChange: (__VLS_ctx.handleSystemChange) });
const { default: __VLS_100 } = __VLS_96.slots;
let __VLS_101;
/** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
ionListHeader;
// @ts-ignore
const __VLS_102 = __VLS_asFunctionalComponent1(__VLS_101, new __VLS_101({}));
const __VLS_103 = __VLS_102({}, ...__VLS_functionalComponentArgsRest(__VLS_102));
const { default: __VLS_106 } = __VLS_104.slots;
let __VLS_107;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_108 = __VLS_asFunctionalComponent1(__VLS_107, new __VLS_107({}));
const __VLS_109 = __VLS_108({}, ...__VLS_functionalComponentArgsRest(__VLS_108));
const { default: __VLS_112 } = __VLS_110.slots;
// @ts-ignore
[selectedSystem, handleSystemChange,];
var __VLS_110;
// @ts-ignore
[];
var __VLS_104;
let __VLS_113;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_114 = __VLS_asFunctionalComponent1(__VLS_113, new __VLS_113({}));
const __VLS_115 = __VLS_114({}, ...__VLS_functionalComponentArgsRest(__VLS_114));
const { default: __VLS_118 } = __VLS_116.slots;
let __VLS_119;
/** @ts-ignore @type { | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio'] | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio']} */
ionRadio;
// @ts-ignore
const __VLS_120 = __VLS_asFunctionalComponent1(__VLS_119, new __VLS_119({
    value: "ironsworn",
}));
const __VLS_121 = __VLS_120({
    value: "ironsworn",
}, ...__VLS_functionalComponentArgsRest(__VLS_120));
const { default: __VLS_124 } = __VLS_122.slots;
// @ts-ignore
[];
var __VLS_122;
// @ts-ignore
[];
var __VLS_116;
let __VLS_125;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_126 = __VLS_asFunctionalComponent1(__VLS_125, new __VLS_125({}));
const __VLS_127 = __VLS_126({}, ...__VLS_functionalComponentArgsRest(__VLS_126));
const { default: __VLS_130 } = __VLS_128.slots;
let __VLS_131;
/** @ts-ignore @type { | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio'] | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio']} */
ionRadio;
// @ts-ignore
const __VLS_132 = __VLS_asFunctionalComponent1(__VLS_131, new __VLS_131({
    value: "starforged",
}));
const __VLS_133 = __VLS_132({
    value: "starforged",
}, ...__VLS_functionalComponentArgsRest(__VLS_132));
const { default: __VLS_136 } = __VLS_134.slots;
// @ts-ignore
[];
var __VLS_134;
// @ts-ignore
[];
var __VLS_128;
// @ts-ignore
[];
var __VLS_96;
var __VLS_97;
// @ts-ignore
[];
var __VLS_90;
let __VLS_137;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_138 = __VLS_asFunctionalComponent1(__VLS_137, new __VLS_137({
    inset: (true),
}));
const __VLS_139 = __VLS_138({
    inset: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_138));
const { default: __VLS_142 } = __VLS_140.slots;
let __VLS_143;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_144 = __VLS_asFunctionalComponent1(__VLS_143, new __VLS_143({}));
const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
const { default: __VLS_148 } = __VLS_146.slots;
let __VLS_149;
/** @ts-ignore @type { | typeof __VLS_components.ionCheckbox | typeof __VLS_components.IonCheckbox | typeof __VLS_components['ion-checkbox'] | typeof __VLS_components.ionCheckbox | typeof __VLS_components.IonCheckbox | typeof __VLS_components['ion-checkbox']} */
ionCheckbox;
// @ts-ignore
const __VLS_150 = __VLS_asFunctionalComponent1(__VLS_149, new __VLS_149({
    ...{ 'onIonChange': {} },
    checked: (__VLS_ctx.includeCustom),
}));
const __VLS_151 = __VLS_150({
    ...{ 'onIonChange': {} },
    checked: (__VLS_ctx.includeCustom),
}, ...__VLS_functionalComponentArgsRest(__VLS_150));
let __VLS_154;
const __VLS_155 = ({ ionChange: {} },
    { onIonChange: (__VLS_ctx.handleIncludeCustomChange) });
const { default: __VLS_156 } = __VLS_152.slots;
// @ts-ignore
[includeCustom, handleIncludeCustomChange,];
var __VLS_152;
var __VLS_153;
// @ts-ignore
[];
var __VLS_146;
// @ts-ignore
[];
var __VLS_140;
// @ts-ignore
[];
var __VLS_84;
// @ts-ignore
[];
var __VLS_76;
var __VLS_77;
let __VLS_157;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_158 = __VLS_asFunctionalComponent1(__VLS_157, new __VLS_157({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.preRollOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "pre-roll-modal" },
}));
const __VLS_159 = __VLS_158({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.preRollOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "pre-roll-modal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_158));
let __VLS_162;
const __VLS_163 = ({ didDismiss: {} },
    { onDidDismiss: (__VLS_ctx.closePreRoll) });
/** @type {__VLS_StyleScopedClasses['pre-roll-modal']} */ ;
const { default: __VLS_164 } = __VLS_160.slots;
let __VLS_165;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_166 = __VLS_asFunctionalComponent1(__VLS_165, new __VLS_165({
    ...{ class: "settings-sheet" },
}));
const __VLS_167 = __VLS_166({
    ...{ class: "settings-sheet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_166));
/** @type {__VLS_StyleScopedClasses['settings-sheet']} */ ;
const { default: __VLS_170 } = __VLS_168.slots;
if (__VLS_ctx.currentPreRollComponent && __VLS_ctx.currentPreRollTable) {
    const __VLS_171 = (__VLS_ctx.currentPreRollComponent);
    // @ts-ignore
    const __VLS_172 = __VLS_asFunctionalComponent1(__VLS_171, new __VLS_171({
        ...{ 'onSubmit': {} },
        table: (__VLS_ctx.currentPreRollTable),
    }));
    const __VLS_173 = __VLS_172({
        ...{ 'onSubmit': {} },
        table: (__VLS_ctx.currentPreRollTable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_172));
    let __VLS_176;
    const __VLS_177 = ({ submit: {} },
        { onSubmit: (__VLS_ctx.completePreRoll) });
    var __VLS_174;
    var __VLS_175;
}
// @ts-ignore
[preRollOpen, closePreRoll, currentPreRollComponent, currentPreRollComponent, currentPreRollTable, currentPreRollTable, completePreRoll,];
var __VLS_168;
// @ts-ignore
[];
var __VLS_160;
var __VLS_161;
let __VLS_178;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_179 = __VLS_asFunctionalComponent1(__VLS_178, new __VLS_178({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.infoOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "info-modal" },
}));
const __VLS_180 = __VLS_179({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.infoOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "info-modal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_179));
let __VLS_183;
const __VLS_184 = ({ didDismiss: {} },
    { onDidDismiss: (__VLS_ctx.closeInfo) });
/** @type {__VLS_StyleScopedClasses['info-modal']} */ ;
const { default: __VLS_185 } = __VLS_181.slots;
let __VLS_186;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_187 = __VLS_asFunctionalComponent1(__VLS_186, new __VLS_186({
    ...{ class: "settings-sheet" },
}));
const __VLS_188 = __VLS_187({
    ...{ class: "settings-sheet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_187));
/** @type {__VLS_StyleScopedClasses['settings-sheet']} */ ;
const { default: __VLS_191 } = __VLS_189.slots;
if (__VLS_ctx.infoTable) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
        ...{ class: "info-content" },
    });
    /** @type {__VLS_StyleScopedClasses['info-content']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "sheet-handle" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['sheet-handle']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "sheet-eyebrow" },
    });
    /** @type {__VLS_StyleScopedClasses['sheet-eyebrow']} */ ;
    (__VLS_ctx.systemLabels[__VLS_ctx.infoTable.system]);
    (__VLS_ctx.infoTable.category);
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({});
    (__VLS_ctx.infoTable.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "info-description" },
    });
    /** @type {__VLS_StyleScopedClasses['info-description']} */ ;
    (__VLS_ctx.infoTable.description ?? 'No description is available for this table yet.');
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "info-actions" },
    });
    /** @type {__VLS_StyleScopedClasses['info-actions']} */ ;
    let __VLS_192;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_193 = __VLS_asFunctionalComponent1(__VLS_192, new __VLS_192({
        ...{ 'onClick': {} },
        fill: "outline",
        expand: "block",
        disabled: (!__VLS_ctx.canBrowseInfoTable),
    }));
    const __VLS_194 = __VLS_193({
        ...{ 'onClick': {} },
        fill: "outline",
        expand: "block",
        disabled: (!__VLS_ctx.canBrowseInfoTable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_193));
    let __VLS_197;
    const __VLS_198 = ({ click: {} },
        { onClick: (__VLS_ctx.goToInfoTable) });
    const { default: __VLS_199 } = __VLS_195.slots;
    // @ts-ignore
    [infoOpen, closeInfo, infoTable, infoTable, infoTable, infoTable, infoTable, systemLabels, canBrowseInfoTable, goToInfoTable,];
    var __VLS_195;
    var __VLS_196;
    let __VLS_200;
    /** @ts-ignore @type { | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button'] | typeof __VLS_components.ionButton | typeof __VLS_components.IonButton | typeof __VLS_components['ion-button']} */
    ionButton;
    // @ts-ignore
    const __VLS_201 = __VLS_asFunctionalComponent1(__VLS_200, new __VLS_200({
        ...{ 'onClick': {} },
        expand: "block",
    }));
    const __VLS_202 = __VLS_201({
        ...{ 'onClick': {} },
        expand: "block",
    }, ...__VLS_functionalComponentArgsRest(__VLS_201));
    let __VLS_205;
    const __VLS_206 = ({ click: {} },
        { onClick: (__VLS_ctx.rollInfoTable) });
    const { default: __VLS_207 } = __VLS_203.slots;
    // @ts-ignore
    [rollInfoTable,];
    var __VLS_203;
    var __VLS_204;
}
// @ts-ignore
[];
var __VLS_189;
// @ts-ignore
[];
var __VLS_181;
var __VLS_182;
// @ts-ignore
[];
var __VLS_58;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
var __VLS_61 = __VLS_60;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
