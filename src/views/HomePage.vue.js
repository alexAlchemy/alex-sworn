/// <reference types="../../node_modules/@vue/language-core/types/template-helpers.d.ts" />
/// <reference types="../../node_modules/@vue/language-core/types/props-fallback.d.ts" />
import { computed, ref, watch } from 'vue';
import { settingsOutline } from 'ionicons/icons';
import { getRollResultText, getRollValueLabel, getUnrolledLabel, oracleTables, rollTable, systemLabels } from '../data/oracles';
import { useRollHistory } from '../data/history';
import { useOracleSettings } from '../data/settings';
import ActionRollForm from '../components/pre-roll/ActionRollForm.vue';
import AskOracleForm from '../components/pre-roll/AskOracleForm.vue';
const search = ref('');
const selectedTable = ref(oracleTables[0]);
const currentResult = ref(null);
const settingsOpen = ref(false);
const preRollOpen = ref(false);
const currentPreRollTable = ref(null);
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
const filteredTables = computed(() => {
    const query = search.value.trim().toLowerCase();
    return oracleTables.filter((table) => {
        const matchesSystem = table.system === selectedSystem.value || (includeCustom.value && table.system === 'custom');
        const matchesQuery = !query ||
            table.title.toLowerCase().includes(query) ||
            table.category.toLowerCase().includes(query) ||
            systemLabels[table.system].toLowerCase().includes(query);
        return matchesSystem && matchesQuery;
    });
});
watch([selectedSystem, includeCustom], () => {
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
const completeRoll = (table, payload) => {
    currentResult.value = rollTable(table, payload);
    addRoll(table, currentResult.value);
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
/** @type {__VLS_StyleScopedClasses['oracle-card']} */ ;
/** @type {__VLS_StyleScopedClasses['settings-content']} */ ;
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
const __VLS_56 = __VLS_asFunctionalComponent1(__VLS_55, new __VLS_55({}));
const __VLS_57 = __VLS_56({}, ...__VLS_functionalComponentArgsRest(__VLS_56));
const { default: __VLS_60 } = __VLS_58.slots;
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
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "eyebrow" },
});
/** @type {__VLS_StyleScopedClasses['eyebrow']} */ ;
(__VLS_ctx.systemLabels[__VLS_ctx.selectedTable.system]);
(__VLS_ctx.selectedTable.category);
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
let __VLS_61;
/** @ts-ignore @type { | typeof __VLS_components.ionSearchbar | typeof __VLS_components.IonSearchbar | typeof __VLS_components['ion-searchbar']} */
ionSearchbar;
// @ts-ignore
const __VLS_62 = __VLS_asFunctionalComponent1(__VLS_61, new __VLS_61({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find an oracle",
    inputmode: "search",
    debounce: (120),
}));
const __VLS_63 = __VLS_62({
    modelValue: (__VLS_ctx.search),
    placeholder: "Find an oracle",
    inputmode: "search",
    debounce: (120),
}, ...__VLS_functionalComponentArgsRest(__VLS_62));
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "oracle-grid" },
});
/** @type {__VLS_StyleScopedClasses['oracle-grid']} */ ;
for (const [table] of __VLS_vFor((__VLS_ctx.filteredTables))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.rollRow(table);
                // @ts-ignore
                [systemLabels, selectedTable, selectedTable, selectedTable, selectedTable, currentResult, currentResult, currentResult, currentResult, currentResult, getRollResultText, rollSelectedTable, getRollValueLabel, getUnrolledLabel, search, filteredTables, rollRow,];
            } },
        key: (table.id),
        type: "button",
        ...{ class: "oracle-card" },
        ...{ class: ({ active: table.id === __VLS_ctx.selectedTable.id }) },
    });
    /** @type {__VLS_StyleScopedClasses['oracle-card']} */ ;
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.strong, __VLS_intrinsics.strong)({});
    (table.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (table.category);
    // @ts-ignore
    [selectedTable,];
}
let __VLS_66;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_67 = __VLS_asFunctionalComponent1(__VLS_66, new __VLS_66({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.settingsOpen),
    initialBreakpoint: (0.42),
    breakpoints: ([0, 0.42, 0.72]),
}));
const __VLS_68 = __VLS_67({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.settingsOpen),
    initialBreakpoint: (0.42),
    breakpoints: ([0, 0.42, 0.72]),
}, ...__VLS_functionalComponentArgsRest(__VLS_67));
let __VLS_71;
const __VLS_72 = ({ didDismiss: {} },
    { onDidDismiss: (...[$event]) => {
            __VLS_ctx.settingsOpen = false;
            // @ts-ignore
            [settingsOpen, settingsOpen,];
        } });
const { default: __VLS_73 } = __VLS_69.slots;
let __VLS_74;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_75 = __VLS_asFunctionalComponent1(__VLS_74, new __VLS_74({
    ...{ class: "settings-sheet" },
}));
const __VLS_76 = __VLS_75({
    ...{ class: "settings-sheet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_75));
/** @type {__VLS_StyleScopedClasses['settings-sheet']} */ ;
const { default: __VLS_79 } = __VLS_77.slots;
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
let __VLS_80;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_81 = __VLS_asFunctionalComponent1(__VLS_80, new __VLS_80({
    inset: (true),
}));
const __VLS_82 = __VLS_81({
    inset: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_81));
const { default: __VLS_85 } = __VLS_83.slots;
let __VLS_86;
/** @ts-ignore @type { | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group'] | typeof __VLS_components.ionRadioGroup | typeof __VLS_components.IonRadioGroup | typeof __VLS_components['ion-radio-group']} */
ionRadioGroup;
// @ts-ignore
const __VLS_87 = __VLS_asFunctionalComponent1(__VLS_86, new __VLS_86({
    ...{ 'onIonChange': {} },
    value: (__VLS_ctx.selectedSystem),
}));
const __VLS_88 = __VLS_87({
    ...{ 'onIonChange': {} },
    value: (__VLS_ctx.selectedSystem),
}, ...__VLS_functionalComponentArgsRest(__VLS_87));
let __VLS_91;
const __VLS_92 = ({ ionChange: {} },
    { onIonChange: (__VLS_ctx.handleSystemChange) });
const { default: __VLS_93 } = __VLS_89.slots;
let __VLS_94;
/** @ts-ignore @type { | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header'] | typeof __VLS_components.ionListHeader | typeof __VLS_components.IonListHeader | typeof __VLS_components['ion-list-header']} */
ionListHeader;
// @ts-ignore
const __VLS_95 = __VLS_asFunctionalComponent1(__VLS_94, new __VLS_94({}));
const __VLS_96 = __VLS_95({}, ...__VLS_functionalComponentArgsRest(__VLS_95));
const { default: __VLS_99 } = __VLS_97.slots;
let __VLS_100;
/** @ts-ignore @type { | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label'] | typeof __VLS_components.ionLabel | typeof __VLS_components.IonLabel | typeof __VLS_components['ion-label']} */
ionLabel;
// @ts-ignore
const __VLS_101 = __VLS_asFunctionalComponent1(__VLS_100, new __VLS_100({}));
const __VLS_102 = __VLS_101({}, ...__VLS_functionalComponentArgsRest(__VLS_101));
const { default: __VLS_105 } = __VLS_103.slots;
// @ts-ignore
[selectedSystem, handleSystemChange,];
var __VLS_103;
// @ts-ignore
[];
var __VLS_97;
let __VLS_106;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_107 = __VLS_asFunctionalComponent1(__VLS_106, new __VLS_106({}));
const __VLS_108 = __VLS_107({}, ...__VLS_functionalComponentArgsRest(__VLS_107));
const { default: __VLS_111 } = __VLS_109.slots;
let __VLS_112;
/** @ts-ignore @type { | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio'] | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio']} */
ionRadio;
// @ts-ignore
const __VLS_113 = __VLS_asFunctionalComponent1(__VLS_112, new __VLS_112({
    value: "ironsworn",
}));
const __VLS_114 = __VLS_113({
    value: "ironsworn",
}, ...__VLS_functionalComponentArgsRest(__VLS_113));
const { default: __VLS_117 } = __VLS_115.slots;
// @ts-ignore
[];
var __VLS_115;
// @ts-ignore
[];
var __VLS_109;
let __VLS_118;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_119 = __VLS_asFunctionalComponent1(__VLS_118, new __VLS_118({}));
const __VLS_120 = __VLS_119({}, ...__VLS_functionalComponentArgsRest(__VLS_119));
const { default: __VLS_123 } = __VLS_121.slots;
let __VLS_124;
/** @ts-ignore @type { | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio'] | typeof __VLS_components.ionRadio | typeof __VLS_components.IonRadio | typeof __VLS_components['ion-radio']} */
ionRadio;
// @ts-ignore
const __VLS_125 = __VLS_asFunctionalComponent1(__VLS_124, new __VLS_124({
    value: "starforged",
}));
const __VLS_126 = __VLS_125({
    value: "starforged",
}, ...__VLS_functionalComponentArgsRest(__VLS_125));
const { default: __VLS_129 } = __VLS_127.slots;
// @ts-ignore
[];
var __VLS_127;
// @ts-ignore
[];
var __VLS_121;
// @ts-ignore
[];
var __VLS_89;
var __VLS_90;
// @ts-ignore
[];
var __VLS_83;
let __VLS_130;
/** @ts-ignore @type { | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list'] | typeof __VLS_components.ionList | typeof __VLS_components.IonList | typeof __VLS_components['ion-list']} */
ionList;
// @ts-ignore
const __VLS_131 = __VLS_asFunctionalComponent1(__VLS_130, new __VLS_130({
    inset: (true),
}));
const __VLS_132 = __VLS_131({
    inset: (true),
}, ...__VLS_functionalComponentArgsRest(__VLS_131));
const { default: __VLS_135 } = __VLS_133.slots;
let __VLS_136;
/** @ts-ignore @type { | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item'] | typeof __VLS_components.ionItem | typeof __VLS_components.IonItem | typeof __VLS_components['ion-item']} */
ionItem;
// @ts-ignore
const __VLS_137 = __VLS_asFunctionalComponent1(__VLS_136, new __VLS_136({}));
const __VLS_138 = __VLS_137({}, ...__VLS_functionalComponentArgsRest(__VLS_137));
const { default: __VLS_141 } = __VLS_139.slots;
let __VLS_142;
/** @ts-ignore @type { | typeof __VLS_components.ionCheckbox | typeof __VLS_components.IonCheckbox | typeof __VLS_components['ion-checkbox'] | typeof __VLS_components.ionCheckbox | typeof __VLS_components.IonCheckbox | typeof __VLS_components['ion-checkbox']} */
ionCheckbox;
// @ts-ignore
const __VLS_143 = __VLS_asFunctionalComponent1(__VLS_142, new __VLS_142({
    ...{ 'onIonChange': {} },
    checked: (__VLS_ctx.includeCustom),
}));
const __VLS_144 = __VLS_143({
    ...{ 'onIonChange': {} },
    checked: (__VLS_ctx.includeCustom),
}, ...__VLS_functionalComponentArgsRest(__VLS_143));
let __VLS_147;
const __VLS_148 = ({ ionChange: {} },
    { onIonChange: (__VLS_ctx.handleIncludeCustomChange) });
const { default: __VLS_149 } = __VLS_145.slots;
// @ts-ignore
[includeCustom, handleIncludeCustomChange,];
var __VLS_145;
var __VLS_146;
// @ts-ignore
[];
var __VLS_139;
// @ts-ignore
[];
var __VLS_133;
// @ts-ignore
[];
var __VLS_77;
// @ts-ignore
[];
var __VLS_69;
var __VLS_70;
let __VLS_150;
/** @ts-ignore @type { | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal'] | typeof __VLS_components.ionModal | typeof __VLS_components.IonModal | typeof __VLS_components['ion-modal']} */
ionModal;
// @ts-ignore
const __VLS_151 = __VLS_asFunctionalComponent1(__VLS_150, new __VLS_150({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.preRollOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "pre-roll-modal" },
}));
const __VLS_152 = __VLS_151({
    ...{ 'onDidDismiss': {} },
    isOpen: (__VLS_ctx.preRollOpen),
    initialBreakpoint: (1),
    breakpoints: ([0, 1]),
    ...{ class: "pre-roll-modal" },
}, ...__VLS_functionalComponentArgsRest(__VLS_151));
let __VLS_155;
const __VLS_156 = ({ didDismiss: {} },
    { onDidDismiss: (__VLS_ctx.closePreRoll) });
/** @type {__VLS_StyleScopedClasses['pre-roll-modal']} */ ;
const { default: __VLS_157 } = __VLS_153.slots;
let __VLS_158;
/** @ts-ignore @type { | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content'] | typeof __VLS_components.ionContent | typeof __VLS_components.IonContent | typeof __VLS_components['ion-content']} */
ionContent;
// @ts-ignore
const __VLS_159 = __VLS_asFunctionalComponent1(__VLS_158, new __VLS_158({
    ...{ class: "settings-sheet" },
}));
const __VLS_160 = __VLS_159({
    ...{ class: "settings-sheet" },
}, ...__VLS_functionalComponentArgsRest(__VLS_159));
/** @type {__VLS_StyleScopedClasses['settings-sheet']} */ ;
const { default: __VLS_163 } = __VLS_161.slots;
if (__VLS_ctx.currentPreRollComponent && __VLS_ctx.currentPreRollTable) {
    const __VLS_164 = (__VLS_ctx.currentPreRollComponent);
    // @ts-ignore
    const __VLS_165 = __VLS_asFunctionalComponent1(__VLS_164, new __VLS_164({
        ...{ 'onSubmit': {} },
        table: (__VLS_ctx.currentPreRollTable),
    }));
    const __VLS_166 = __VLS_165({
        ...{ 'onSubmit': {} },
        table: (__VLS_ctx.currentPreRollTable),
    }, ...__VLS_functionalComponentArgsRest(__VLS_165));
    let __VLS_169;
    const __VLS_170 = ({ submit: {} },
        { onSubmit: (__VLS_ctx.completePreRoll) });
    var __VLS_167;
    var __VLS_168;
}
// @ts-ignore
[preRollOpen, closePreRoll, currentPreRollComponent, currentPreRollComponent, currentPreRollTable, currentPreRollTable, completePreRoll,];
var __VLS_161;
// @ts-ignore
[];
var __VLS_153;
var __VLS_154;
// @ts-ignore
[];
var __VLS_58;
// @ts-ignore
[];
var __VLS_3;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
