import { ironsworn, starforged } from 'dataforged';
const cleanText = (value) => String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const titleize = (value) => value.replace(/_/g, ' ');
const toId = (sourceId) => sourceId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const formatRange = (min, max) => (min === max ? `${min}` : `${min}-${max}`);
const toSubtableRow = (row, index) => {
    const min = row.Floor ?? index + 1;
    const max = row.Ceiling ?? min;
    return {
        id: row.$id ?? `subtable-${index}`,
        range: formatRange(min, max),
        result: cleanText(row.Result)
    };
};
const toTruthOption = (row, index) => {
    const min = row.Floor ?? index + 1;
    const max = row.Ceiling ?? min;
    return {
        id: row.$id ?? `truth-option-${index}`,
        range: formatRange(min, max),
        result: cleanText(row.Result),
        description: cleanText(row.Description) || undefined,
        questStarter: cleanText(row['Quest Starter']) || undefined,
        subtable: row.Subtable?.map(toSubtableRow).filter((subtableRow) => subtableRow.result.length > 0) ?? []
    };
};
const toWorldTruth = (truth, system) => {
    if (!truth.$id || !truth.Table?.length) {
        return null;
    }
    return {
        id: toId(truth.$id),
        sourceId: truth.$id,
        system,
        title: titleize(truth.Display?.Title ?? truth.Name ?? 'World Truth'),
        options: truth.Table.map(toTruthOption).filter((option) => option.result.length > 0)
    };
};
const getSettingTruths = (data) => {
    const root = data;
    return root['Setting Truths'] ?? root.default?.['Setting Truths'];
};
const collectTruths = (truths, system) => {
    if (!truths || typeof truths !== 'object') {
        return [];
    }
    const dataTruths = (Array.isArray(truths) ? truths : Object.values(truths));
    return dataTruths.map((truth) => toWorldTruth(truth, system)).filter((truth) => Boolean(truth));
};
export const worldTruths = [
    ...collectTruths(getSettingTruths(ironsworn), 'ironsworn'),
    ...collectTruths(getSettingTruths(starforged), 'starforged')
];
export const findWorldTruth = (id) => worldTruths.find((truth) => truth.id === id);
