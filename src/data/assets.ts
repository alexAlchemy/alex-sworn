import { ironsworn, starforged } from 'dataforged';
import type { OracleSystem } from './oracles';

export type AssetSystem = Exclude<OracleSystem, 'custom'>;

export interface AssetAbility {
  id: string;
  name?: string;
  text: string;
  enabled: boolean;
}

export interface GameAsset {
  id: string;
  sourceId: string;
  system: AssetSystem;
  group: string;
  title: string;
  color?: string;
  description?: string;
  requirement?: string;
  shared: boolean;
  inputs: readonly string[];
  conditionMeter?: string;
  attachments?: string;
  abilities: readonly AssetAbility[];
}

type DataforgedAssetGroup = {
  $id?: string;
  Name?: string;
  Display?: {
    Title?: string;
  };
  Description?: unknown;
  Assets?: DataforgedAsset[];
};

type DataforgedAsset = {
  $id?: string;
  Name?: string;
  Display?: {
    Title?: string;
    Color?: string;
  };
  Description?: unknown;
  Requirement?: unknown;
  Usage?: {
    Shared?: boolean;
  };
  Inputs?: Array<{
    Name?: string;
    'Input Type'?: string;
  }>;
  'Condition Meter'?: {
    Name?: string;
    Max?: number;
  };
  Attachments?: {
    'Asset Types'?: string[];
    Max?: number | null;
  };
  Abilities?: Array<{
    $id?: string;
    Name?: string;
    Text?: unknown;
    Enabled?: boolean;
  }>;
};

export const assetGroupOrders: Record<AssetSystem, readonly string[]> = {
  ironsworn: ['All', 'Companion', 'Path', 'Combat Talent', 'Ritual'],
  starforged: ['All', 'Command Vehicle', 'Module', 'Support Vehicle', 'Path', 'Companion', 'Deed']
};

const cleanText = (value: unknown) =>
  String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const titleize = (value: string) => value.replace(/_/g, ' ');

const toId = (sourceId: string) => sourceId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const getAssetTypeName = (sourceId: string) => titleize(sourceId.split('/').at(-1) ?? 'Asset');

const getAttachmentText = (attachments: DataforgedAsset['Attachments']) => {
  if (!attachments?.['Asset Types']?.length) {
    return undefined;
  }

  const names = attachments['Asset Types'].map(getAssetTypeName).join(', ');
  const max = attachments.Max === null || attachments.Max === undefined ? 'any number of' : `up to ${attachments.Max}`;

  return `Can attach ${max} ${names} assets.`;
};

const getConditionMeterText = (meter: DataforgedAsset['Condition Meter']) => {
  if (!meter?.Name) {
    return undefined;
  }

  return `${meter.Name}${meter.Max ? ` ${meter.Max}` : ''}`;
};

const toGameAsset = (asset: DataforgedAsset, group: string, system: AssetSystem): GameAsset | null => {
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
    abilities:
      asset.Abilities?.map((ability, index) => ({
        id: ability.$id ?? `${asset.$id}/Abilities/${index + 1}`,
        name: ability.Name,
        text: cleanText(ability.Text),
        enabled: Boolean(ability.Enabled)
      })).filter((ability) => ability.text.length > 0) ?? []
  };
};

const collectAssets = (groups: unknown, system: AssetSystem) => {
  if (!groups || typeof groups !== 'object') {
    return [];
  }

  const dataGroups = (Array.isArray(groups) ? groups : Object.values(groups as Record<string, unknown>)) as DataforgedAssetGroup[];

  return dataGroups.flatMap((group) => {
    const groupName = titleize(group.Display?.Title ?? group.Name ?? 'Assets');
    return group.Assets?.map((asset) => toGameAsset(asset, groupName, system)).filter((asset): asset is GameAsset =>
      Boolean(asset)
    ) ?? [];
  });
};

const getAssetTypes = (data: unknown) => {
  const root = data as { 'Asset Types'?: unknown; default?: { 'Asset Types'?: unknown } };
  return root['Asset Types'] ?? root.default?.['Asset Types'];
};

export const gameAssets: readonly GameAsset[] = [
  ...collectAssets(getAssetTypes(ironsworn), 'ironsworn'),
  ...collectAssets(getAssetTypes(starforged), 'starforged')
];

export const findAsset = (id: string) => gameAssets.find((asset) => asset.id === id);
