import { ironsworn, starforged } from 'dataforged';

export type OracleSystem = 'ironsworn' | 'starforged' | 'custom';

export interface OracleEntry {
  min: number;
  max: number;
  result: string;
}

export interface OracleTable {
  id: string;
  sourceId?: string;
  system: OracleSystem;
  kind: 'oracle';
  preRollForm?: PreRollFormConfig;
  title: string;
  category: string;
  die: number;
  entries: readonly OracleEntry[];
}

export interface ActionRollTable {
  id: string;
  system: Exclude<OracleSystem, 'custom'>;
  kind: 'action-roll';
  preRollForm: PreRollFormConfig;
  title: string;
  category: string;
}

export interface AskOracleOption {
  id: string;
  label: string;
  yes: readonly OracleEntry[];
}

export interface AskOracleTable {
  id: string;
  system: Exclude<OracleSystem, 'custom'>;
  kind: 'ask-oracle';
  preRollForm: PreRollFormConfig;
  title: string;
  category: string;
  die: number;
  odds: readonly AskOracleOption[];
}

export type PreRollFormComponent = 'ActionRollForm' | 'AskOracleForm';

export interface PreRollFormConfig {
  component: PreRollFormComponent;
}

export interface ActionRollPayload {
  modifier: number;
}

export interface AskOraclePayload {
  likelihood: string;
}

export type PreRollPayload = ActionRollPayload | AskOraclePayload;

export type RollableTable = OracleTable | ActionRollTable | AskOracleTable;

export interface OracleRollResult {
  kind: 'oracle';
  roll: number;
  entry: OracleEntry;
}

export interface ActionRollResult {
  kind: 'action-roll';
  actionDie: number;
  modifier: number;
  score: number;
  challengeDice: readonly [number, number];
  outcome: 'Strong hit' | 'Weak hit' | 'Miss';
  match: boolean;
}

export interface AskOracleResult {
  kind: 'ask-oracle';
  roll: number;
  likelihood: string;
  answer: string;
}

export type RollResult = OracleRollResult | ActionRollResult | AskOracleResult;

type DataforgedRow = {
  Floor?: number;
  Ceiling?: number;
  Result?: unknown;
  Summary?: unknown;
};

type DataforgedOracle = {
  $id?: string;
  Name?: string;
  Display?: {
    Title?: string;
  };
  Category?: string;
  Table?: DataforgedRow[];
  Oracles?: DataforgedOracle[];
};

export const systemLabels: Record<OracleSystem | 'all', string> = {
  all: 'All',
  ironsworn: 'Ironsworn',
  starforged: 'Starforged',
  custom: 'Custom'
};

const rollDie = (sides: number) => Math.floor(Math.random() * sides) + 1;

const actionRollTables: ActionRollTable[] = [
  {
    id: 'ironsworn-action-roll',
    system: 'ironsworn',
    kind: 'action-roll',
    preRollForm: { component: 'ActionRollForm' },
    title: 'Action Roll',
    category: 'Core'
  },
  {
    id: 'starforged-action-roll',
    system: 'starforged',
    kind: 'action-roll',
    preRollForm: { component: 'ActionRollForm' },
    title: 'Action Roll',
    category: 'Core'
  }
];

const askOracleTables: AskOracleTable[] = [
  {
    id: 'ironsworn-ask-the-oracle',
    system: 'ironsworn',
    kind: 'ask-oracle',
    preRollForm: { component: 'AskOracleForm' },
    title: 'Ask the Oracle',
    category: 'Moves',
    die: 100,
    odds: [
      { id: 'almost-certain', label: 'Almost Certain', yes: [{ min: 11, max: 100, result: 'Yes' }] },
      { id: 'likely', label: 'Likely', yes: [{ min: 26, max: 100, result: 'Yes' }] },
      { id: 'fifty-fifty', label: 'Fifty-fifty', yes: [{ min: 51, max: 100, result: 'Yes' }] },
      { id: 'unlikely', label: 'Unlikely', yes: [{ min: 76, max: 100, result: 'Yes' }] },
      { id: 'small-chance', label: 'Small Chance', yes: [{ min: 91, max: 100, result: 'Yes' }] }
    ]
  },
  {
    id: 'starforged-ask-the-oracle',
    system: 'starforged',
    kind: 'ask-oracle',
    preRollForm: { component: 'AskOracleForm' },
    title: 'Ask the Oracle',
    category: 'Moves',
    die: 100,
    odds: [
      { id: 'almost-certain', label: 'Almost Certain', yes: [{ min: 1, max: 90, result: 'Yes' }] },
      { id: 'likely', label: 'Likely', yes: [{ min: 1, max: 75, result: 'Yes' }] },
      { id: 'fifty-fifty', label: 'Fifty-fifty', yes: [{ min: 1, max: 50, result: 'Yes' }] },
      { id: 'unlikely', label: 'Unlikely', yes: [{ min: 1, max: 25, result: 'Yes' }] },
      { id: 'small-chance', label: 'Small Chance', yes: [{ min: 1, max: 10, result: 'Yes' }] }
    ]
  }
];

const customTables: OracleTable[] = [
  {
    id: 'custom-tension',
    system: 'custom',
    kind: 'oracle',
    title: 'Scene Tension',
    category: 'Play Aid',
    die: 20,
    entries: [
      { min: 1, max: 4, result: 'Quiet, but watchful' },
      { min: 5, max: 8, result: 'A useful complication' },
      { min: 9, max: 12, result: 'Pressure from a new angle' },
      { min: 13, max: 16, result: 'The worst person notices' },
      { min: 17, max: 20, result: 'Immediate trouble' }
    ]
  }
];

const categoryOverrides: Record<string, string> = {
  Action_and_Theme: 'Core',
  Moves: 'Moves',
  Feature: 'Delve',
  Site_Name: 'Delve',
  Site_Nature: 'Delve',
  Monstrosity: 'Delve',
  Trap: 'Delve',
  Combat_Event: 'Delve',
  Threat: 'Delve'
};

const cleanText = (value: unknown) =>
  String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/^"+|",?$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const titleize = (value: string) => value.replace(/_/g, ' ');

const getCategory = (sourceId: string | undefined, fallback: string | undefined) => {
  const oraclePath = sourceId?.split('/Oracles/')[1];
  const topLevel = oraclePath?.split('/')[0] ?? fallback?.split('/').at(-1) ?? 'Oracles';
  return categoryOverrides[topLevel] ?? titleize(topLevel);
};

const getResultText = (row: DataforgedRow) => {
  const result = cleanText(row.Result);
  const summary = cleanText(row.Summary);

  if (summary && summary !== result) {
    return `${result}: ${summary}`;
  }

  return result;
};

const toOracleTable = (node: DataforgedOracle, system: Exclude<OracleSystem, 'custom'>): OracleTable | null => {
  const entries =
    node.Table?.map((row) => ({
      min: row.Floor ?? 1,
      max: row.Ceiling ?? row.Floor ?? 1,
      result: getResultText(row)
    })).filter((entry) => entry.result.length > 0) ?? [];

  if (!node.$id || entries.length === 0 || node.$id.includes('/Ask_the_Oracle/')) {
    return null;
  }

  return {
    id: node.$id.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
    sourceId: node.$id,
    system,
    kind: 'oracle',
    title: titleize(node.Name ?? node.Display?.Title ?? 'Oracle'),
    category: getCategory(node.$id, node.Category),
    die: Math.max(...entries.map((entry) => entry.max)),
    entries
  };
};

const collectOracleTables = (nodes: unknown, system: Exclude<OracleSystem, 'custom'>): OracleTable[] => {
  const tables: OracleTable[] = [];

  const visit = (node: unknown) => {
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }

    if (!node || typeof node !== 'object') {
      return;
    }

    const oracle = node as DataforgedOracle;
    const table = oracle.Table ? toOracleTable(oracle, system) : null;

    if (table) {
      tables.push(table);
    }

    if (oracle.Oracles) {
      oracle.Oracles.forEach(visit);
    }
  };

  visit(nodes);
  return tables;
};

const importedTables = [
  ...collectOracleTables(ironsworn['Oracle Categories'], 'ironsworn'),
  ...collectOracleTables(starforged['Oracle Categories'], 'starforged')
];

export const oracleTables: RollableTable[] = [...actionRollTables, ...askOracleTables, ...importedTables, ...customTables];

export const rollOracle = (table: OracleTable): OracleRollResult => {
  const roll = rollDie(table.die);
  const entry = table.entries.find((candidate) => roll >= candidate.min && roll <= candidate.max);

  return {
    kind: 'oracle',
    roll,
    entry: entry ?? table.entries[table.entries.length - 1]
  };
};

const getActionOutcome = (score: number, challengeDice: readonly [number, number]) => {
  const hits = challengeDice.filter((challengeDie) => score > challengeDie).length;

  if (hits === 2) {
    return 'Strong hit';
  }

  if (hits === 1) {
    return 'Weak hit';
  }

  return 'Miss';
};

export const rollAction = (payload?: Partial<ActionRollPayload>): ActionRollResult => {
  const actionDie = rollDie(6);
  const modifier = Number(payload?.modifier ?? 0);
  const score = actionDie + modifier;
  const challengeDice = [rollDie(10), rollDie(10)] as const;

  return {
    kind: 'action-roll',
    actionDie,
    modifier,
    score,
    challengeDice,
    outcome: getActionOutcome(score, challengeDice),
    match: challengeDice[0] === challengeDice[1]
  };
};

export const rollAskOracle = (table: AskOracleTable, payload?: Partial<AskOraclePayload>): AskOracleResult => {
  const likelihood = payload?.likelihood ?? 'fifty-fifty';
  const odds = table.odds.find((candidate) => candidate.id === likelihood) ?? table.odds[2];
  const roll = rollDie(table.die);
  const isYes = odds.yes.some((entry) => roll >= entry.min && roll <= entry.max);

  return {
    kind: 'ask-oracle',
    roll,
    likelihood: odds.label,
    answer: isYes ? 'Yes' : 'No'
  };
};

export const rollTable = (table: RollableTable, payload?: PreRollPayload): RollResult => {
  if (table.kind === 'action-roll') {
    return rollAction(payload as ActionRollPayload | undefined);
  }

  if (table.kind === 'ask-oracle') {
    return rollAskOracle(table, payload as AskOraclePayload | undefined);
  }

  return rollOracle(table);
};

export const getUnrolledLabel = (table: RollableTable) => {
  if (table.kind === 'action-roll') {
    return 'd6 + 2d10';
  }

  if (table.kind === 'ask-oracle') {
    return 'd100';
  }

  return `d${table.die}`;
};

export const getRollValueLabel = (result: RollResult) => {
  if (result.kind === 'action-roll') {
    const [firstChallenge, secondChallenge] = result.challengeDice;
    return `${result.score} vs ${firstChallenge}, ${secondChallenge}`;
  }

  if (result.kind === 'ask-oracle') {
    return `${result.roll}`;
  }

  return `${result.roll}`;
};

export const getRollResultText = (result: RollResult) => {
  if (result.kind === 'action-roll') {
    const [firstChallenge, secondChallenge] = result.challengeDice;
    const modifier = result.modifier >= 0 ? `+${result.modifier}` : `${result.modifier}`;
    const match = result.match ? ' Match.' : '';
    return `${result.outcome}: action die ${result.actionDie} ${modifier} = ${result.score} vs challenge dice ${firstChallenge} and ${secondChallenge}.${match}`;
  }

  if (result.kind === 'ask-oracle') {
    return `${result.answer} (${result.likelihood}).`;
  }

  return result.entry.result;
};
