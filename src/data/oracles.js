import { ironsworn, starforged } from 'dataforged';
export const systemLabels = {
    all: 'All',
    ironsworn: 'Ironsworn',
    starforged: 'Starforged',
    custom: 'Custom'
};
export const allCategory = 'All';
export const categoryOrders = {
    ironsworn: [
        allCategory,
        'Core',
        'Moves',
        'Settlement',
        'Place',
        'Character',
        'Name',
        'Turning Point',
        'Delve',
        'Threat'
    ],
    starforged: [
        allCategory,
        'Core',
        'Moves',
        'Space',
        'Settlements',
        'Planets',
        'Characters',
        'Starships',
        'Factions',
        'Derelicts',
        'Vaults',
        'Creatures',
        'Location Themes',
        'Character Creation',
        'Misc'
    ]
};
const rollDie = (sides) => Math.floor(Math.random() * sides) + 1;
const actionRollTables = [
    {
        id: 'ironsworn-action-roll',
        system: 'ironsworn',
        kind: 'action-roll',
        preRollForm: { component: 'ActionRollForm' },
        title: 'Action Roll',
        category: 'Core',
        description: 'Roll an action die plus a modifier against two challenge dice to resolve an uncertain action.'
    },
    {
        id: 'starforged-action-roll',
        system: 'starforged',
        kind: 'action-roll',
        preRollForm: { component: 'ActionRollForm' },
        title: 'Action Roll',
        category: 'Core',
        description: 'Roll an action die plus a modifier against two challenge dice to resolve an uncertain action.'
    }
];
const askOracleTables = [
    {
        id: 'ironsworn-ask-the-oracle',
        system: 'ironsworn',
        kind: 'ask-oracle',
        preRollForm: { component: 'AskOracleForm' },
        title: 'Ask the Oracle',
        category: 'Moves',
        description: 'Use this move when you have a yes/no question or want to leave an uncertain detail to fate.',
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
        description: 'Use this move when you have a yes/no question or want to leave an uncertain detail to fate.',
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
const customTables = [
    {
        id: 'custom-tension',
        system: 'custom',
        kind: 'oracle',
        title: 'Scene Tension',
        category: 'Play Aid',
        description: 'A simple custom table for setting the pressure level of a scene.',
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
const categoryOverrides = {
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
const cleanText = (value) => String(value ?? '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/^"+|",?$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
const titleize = (value) => value.replace(/_/g, ' ');
const getCategory = (sourceId, fallback) => {
    const oraclePath = sourceId?.split('/Oracles/')[1];
    const topLevel = oraclePath?.split('/')[0] ?? fallback?.split('/').at(-1) ?? 'Oracles';
    return categoryOverrides[topLevel] ?? titleize(topLevel);
};
const getTitle = (node) => {
    const baseTitle = titleize(node.Display?.Title ?? node.Name ?? 'Oracle');
    const oraclePath = node.$id?.split('/Oracles/')[1]?.split('/') ?? [];
    const parentName = oraclePath.length > 2 ? titleize(oraclePath.at(-2) ?? '') : '';
    if (node.$id?.includes('/Settlement/Name/') && baseTitle !== 'Name') {
        return `Settlement Name: ${baseTitle}`;
    }
    if (parentName && (baseTitle.length <= 2 || ['Prefix', 'Suffix'].includes(baseTitle))) {
        return `${parentName} ${baseTitle}`;
    }
    return baseTitle;
};
const getResultText = (row) => {
    const result = cleanText(row.Result);
    const summary = cleanText(row.Summary);
    if (summary && summary !== result) {
        return `${result}: ${summary}`;
    }
    return result;
};
const getDescription = (node) => {
    if (node.$id === 'Ironsworn/Oracles/Settlement/Name/Something_Else') {
        return 'A settlement-name source for unusual inspirations such as trade goods, founders, gods, relics, or notable local history.';
    }
    const description = cleanText(node.Description ?? node.Summary);
    return description.length > 0 ? description : undefined;
};
const toOracleTable = (node, system) => {
    const entries = node.Table?.map((row) => ({
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
        title: getTitle(node),
        category: getCategory(node.$id, node.Category),
        description: getDescription(node),
        die: Math.max(...entries.map((entry) => entry.max)),
        entries
    };
};
const collectOracleTables = (nodes, system) => {
    const tables = [];
    const visit = (node) => {
        if (Array.isArray(node)) {
            node.forEach(visit);
            return;
        }
        if (!node || typeof node !== 'object') {
            return;
        }
        const oracle = node;
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
export const oracleTables = [...actionRollTables, ...askOracleTables, ...importedTables, ...customTables];
export const randomTables = oracleTables.filter((table) => table.kind === 'oracle' || table.kind === 'ask-oracle');
export const findRandomTable = (id) => randomTables.find((table) => table.id === id);
export const rollOracle = (table) => {
    const roll = rollDie(table.die);
    const entry = table.entries.find((candidate) => roll >= candidate.min && roll <= candidate.max);
    return {
        kind: 'oracle',
        roll,
        entry: entry ?? table.entries[table.entries.length - 1]
    };
};
const getActionOutcome = (score, challengeDice) => {
    const hits = challengeDice.filter((challengeDie) => score > challengeDie).length;
    if (hits === 2) {
        return 'Strong hit';
    }
    if (hits === 1) {
        return 'Weak hit';
    }
    return 'Miss';
};
export const rollAction = (payload) => {
    const actionDie = rollDie(6);
    const modifier = Number(payload?.modifier ?? 0);
    const score = actionDie + modifier;
    const challengeDice = [rollDie(10), rollDie(10)];
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
export const rollAskOracle = (table, payload) => {
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
export const rollTable = (table, payload) => {
    if (table.kind === 'action-roll') {
        return rollAction(payload);
    }
    if (table.kind === 'ask-oracle') {
        return rollAskOracle(table, payload);
    }
    return rollOracle(table);
};
export const getUnrolledLabel = (table) => {
    if (table.kind === 'action-roll') {
        return 'd6 + 2d10';
    }
    if (table.kind === 'ask-oracle') {
        return 'd100';
    }
    return `d${table.die}`;
};
export const getRollValueLabel = (result) => {
    if (result.kind === 'action-roll') {
        const [firstChallenge, secondChallenge] = result.challengeDice;
        return `${result.score} vs ${firstChallenge}, ${secondChallenge}`;
    }
    if (result.kind === 'ask-oracle') {
        return `${result.roll}`;
    }
    return `${result.roll}`;
};
export const getRollResultText = (result) => {
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
