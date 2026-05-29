import { ironsworn, starforged } from 'dataforged';
import type { OracleSystem } from './oracles';

export type TruthSystem = Exclude<OracleSystem, 'custom'>;

export interface TruthSubtableRow {
  id: string;
  range: string;
  result: string;
}

export interface TruthOption {
  id: string;
  range: string;
  result: string;
  description?: string;
  questStarter?: string;
  subtable: readonly TruthSubtableRow[];
}

export interface WorldTruth {
  id: string;
  sourceId: string;
  system: TruthSystem;
  title: string;
  options: readonly TruthOption[];
}

type DataforgedTruth = {
  $id?: string;
  Name?: string;
  Display?: {
    Title?: string;
  };
  Table?: DataforgedTruthRow[];
};

type DataforgedTruthRow = {
  $id?: string;
  Floor?: number;
  Ceiling?: number;
  Result?: unknown;
  Description?: unknown;
  'Quest Starter'?: unknown;
  Subtable?: DataforgedTruthRow[];
};

const cleanText = (value: unknown) =>
  String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const titleize = (value: string) => value.replace(/_/g, ' ');

const toId = (sourceId: string) => sourceId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const formatRange = (min: number, max: number) => (min === max ? `${min}` : `${min}-${max}`);

const toSubtableRow = (row: DataforgedTruthRow, index: number): TruthSubtableRow => {
  const min = row.Floor ?? index + 1;
  const max = row.Ceiling ?? min;

  return {
    id: row.$id ?? `subtable-${index}`,
    range: formatRange(min, max),
    result: cleanText(row.Result)
  };
};

const toTruthOption = (row: DataforgedTruthRow, index: number): TruthOption => {
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

const toWorldTruth = (truth: DataforgedTruth, system: TruthSystem): WorldTruth | null => {
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

const getSettingTruths = (data: unknown) => {
  const root = data as { 'Setting Truths'?: unknown; default?: { 'Setting Truths'?: unknown } };
  return root['Setting Truths'] ?? root.default?.['Setting Truths'];
};

const collectTruths = (truths: unknown, system: TruthSystem) => {
  if (!truths || typeof truths !== 'object') {
    return [];
  }

  const dataTruths = (Array.isArray(truths) ? truths : Object.values(truths as Record<string, unknown>)) as DataforgedTruth[];

  return dataTruths.map((truth) => toWorldTruth(truth, system)).filter((truth): truth is WorldTruth => Boolean(truth));
};

export const worldTruths: readonly WorldTruth[] = [
  ...collectTruths(getSettingTruths(ironsworn), 'ironsworn'),
  ...collectTruths(getSettingTruths(starforged), 'starforged')
];

export const findWorldTruth = (id: string) => worldTruths.find((truth) => truth.id === id);
