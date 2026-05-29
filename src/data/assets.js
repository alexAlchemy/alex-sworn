import { ironsworn, starforged } from 'dataforged';
export const assetGroupOrders = {
    ironsworn: ['All', 'Companion', 'Path', 'Combat Talent', 'Ritual'],
    starforged: ['All', 'Command Vehicle', 'Module', 'Support Vehicle', 'Path', 'Companion', 'Deed']
};
const cleanText = (value) => String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const titleize = (value) => value.replace(/_/g, ' ');
const toId = (sourceId) => sourceId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const getAssetTypeName = (sourceId) => titleize(sourceId.split('/').at(-1) ?? 'Asset');
const getAttachmentText = (attachments) => {
    if (!attachments?.['Asset Types']?.length) {
        return undefined;
    }
    const names = attachments['Asset Types'].map(getAssetTypeName).join(', ');
    const max = attachments.Max === null || attachments.Max === undefined ? 'any number of' : `up to ${attachments.Max}`;
    return `Can attach ${max} ${names} assets.`;
};
const getConditionMeterText = (meter) => {
    if (!meter?.Name) {
        return undefined;
    }
    return `${meter.Name}${meter.Max ? ` ${meter.Max}` : ''}`;
};
const toGameAsset = (asset, group, system) => {
    if (!asset.$id) {
        return null;
    }
    return {
        id: toId(asset.$id),
        sourceId: asset.$id,
        system,
        group,
        title: titleize(asset.Display?.Title ?? asset.Name ?? 'Asset'),
        color: asset.Display?.Color,
        description: cleanText(asset.Description) || undefined,
        requirement: cleanText(asset.Requirement) || undefined,
        shared: Boolean(asset.Usage?.Shared),
        inputs: asset.Inputs?.map((input) => input.Name ?? input['Input Type'] ?? 'Input') ?? [],
        conditionMeter: getConditionMeterText(asset['Condition Meter']),
        attachments: getAttachmentText(asset.Attachments),
        abilities: asset.Abilities?.map((ability, index) => ({
            id: ability.$id ?? `${asset.$id}/Abilities/${index + 1}`,
            name: ability.Name,
            text: cleanText(ability.Text),
            enabled: Boolean(ability.Enabled)
        })).filter((ability) => ability.text.length > 0) ?? []
    };
};
const collectAssets = (groups, system) => {
    const dataGroups = (Array.isArray(groups) ? groups : Object.values(groups));
    return dataGroups.flatMap((group) => {
        const groupName = titleize(group.Display?.Title ?? group.Name ?? 'Assets');
        return group.Assets?.map((asset) => toGameAsset(asset, groupName, system)).filter((asset) => Boolean(asset)) ?? [];
    });
};
export const gameAssets = [
    ...collectAssets(ironsworn.Assets, 'ironsworn'),
    ...collectAssets(starforged.Assets, 'starforged')
];
export const findAsset = (id) => gameAssets.find((asset) => asset.id === id);
