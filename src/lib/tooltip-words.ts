// Tooltip word maps — Gyaanpravaha
// Used to highlight vocabulary words inline in the lesson text
// Each entry: word (lowercase key) → { display, meaning }

export interface TooltipWord {
  display: string   // original casing for display
  meaning: string   // short definition shown in tooltip
}

export type WordMap = Record<string, TooltipWord>

const chapter1Words: WordMap = {
  'efficiency expert':  { display: 'Efficiency expert',  meaning: 'Someone who studies how work is done and suggests ways to do it faster and better.' },
  'motion study':       { display: 'Motion study',       meaning: 'The science of finding the most efficient way to do a task using the fewest movements.' },
  'eagle eye':          { display: 'Eagle eye',           meaning: 'A very sharp, observant eye that notices every detail.' },
  'initials':           { display: 'Initials',            meaning: 'The first letters of a person\'s name — e.g. Rahul Sharma → R.S.' },
  'criticise':          { display: 'Criticise',           meaning: 'To point out faults or express disapproval of someone.' },
  'criticising':        { display: 'Criticising',         meaning: 'Pointing out faults or expressing disapproval of someone.' },
  'accustomed':         { display: 'Accustomed',          meaning: 'Used to something; familiar with it through habit.' },
  'assemble':           { display: 'Assemble',            meaning: 'To gather or come together in one place.' },
  'divine':             { display: 'Divine',              meaning: 'Wonderfully beautiful or heavenly.' },
  'mansion':            { display: 'Mansion',             meaning: 'A very large, grand house.' },
  'extract':            { display: 'Extract',             meaning: 'A short piece taken from a longer book or text.' },
  'efficiency':         { display: 'Efficiency',          meaning: 'The ability to do something well without wasting time or effort.' },
  'discipline':         { display: 'Discipline',          meaning: 'Following rules and habits consistently.' },
  'ritual':             { display: 'Ritual',              meaning: 'A repeated action done in a set way, often with special significance.' },
}

const chapter2Words: WordMap = {
  'flaunt':     { display: 'Flaunt',    meaning: 'To show off something proudly.' },
  'athwart':    { display: 'Athwart',   meaning: 'Across, from one side to the other.' },
  'summon':     { display: 'Summon',    meaning: 'To call someone to come.' },
  'bray':       { display: 'Bray',      meaning: 'The loud sound of a trumpet or a donkey.' },
  'mandolin':   { display: 'Mandolin',  meaning: 'A small stringed musical instrument, like a small guitar.' },
  'ere':        { display: 'Ere',       meaning: 'Before (old poetic word).' },
  'wane':       { display: 'Wane',      meaning: 'To grow smaller or fade away.' },
  'don':        { display: 'Don',       meaning: 'To put on a piece of clothing.' },
  'scimitar':   { display: 'Scimitar',  meaning: 'A curved sword used by Eastern warriors and kings.' },
  'glade':      { display: 'Glade',     meaning: 'An open space in a forest.' },
  'thicket':    { display: 'Thicket',   meaning: 'A dense growth of bushes and small trees.' },
  'citron':     { display: 'Citron',    meaning: 'A type of citrus fruit, similar to a large lemon.' },
  'vale':       { display: 'Vale',      meaning: 'A valley.' },
  'foamless':   { display: 'Foamless',  meaning: 'Without foam or waves — completely still.' },
  'ivory':      { display: 'Ivory',     meaning: 'A precious white material from elephant tusks.' },
  'tartary':    { display: 'Tartary',   meaning: 'A mysterious, faraway region in old European maps — the poet\'s fantasy kingdom.' },
}

const chapter3Words: WordMap = {
  'crinkly':        { display: 'Crinkly',        meaning: 'Wrinkled and slightly crushed.' },
  'scornful':       { display: 'Scornful',        meaning: 'Feeling that something is worthless or beneath you.' },
  'geared':         { display: 'Geared',          meaning: 'Set or adjusted to a particular level or speed.' },
  'loftily':        { display: 'Loftily',          meaning: 'In a proud, superior way, as if looking down on others.' },
  'nonchalantly':   { display: 'Nonchalantly',    meaning: 'In a casual, unconcerned way, as if nothing matters.' },
  'dispute':        { display: 'Dispute',          meaning: 'To argue against or challenge.' },
  'sector':         { display: 'Sector',           meaning: 'A section or part of something.' },
  'punch code':     { display: 'Punch code',       meaning: 'A system of holes punched in paper to store information — an early form of computer input.' },
  'mechanical':     { display: 'Mechanical',       meaning: 'Related to machines or working like a machine.' },
  'inspector':      { display: 'Inspector',        meaning: 'An official who checks that things are working correctly.' },
}

const chapter4Words: WordMap = {
  'dew':           { display: 'Dew',          meaning: 'Tiny drops of water that form on surfaces overnight.' },
  'spry':          { display: 'Spry',          meaning: 'Lively, energetic, and active.' },
  'snuffs out':    { display: 'Snuffs out',    meaning: 'To put out a flame or end something suddenly.' },
  'to and fro':    { display: 'To and fro',    meaning: 'Moving backwards and forwards.' },
  'dribble':       { display: 'Dribble',       meaning: 'To flow in a slow, thin stream.' },
  'upper storey':  { display: 'Upper storey',  meaning: 'The top floor of a building; here used as a metaphor for the head or mind.' },
  'bolts':         { display: 'Bolts',         meaning: 'To lock firmly with a bolt.' },
  'threshing floor': { display: 'Threshing floor', meaning: 'A flat area where farmers separate grain from stalks — oxen walk in circles on it.' },
  'porcupine':     { display: 'Porcupine',     meaning: 'A spiky animal with sharp quills on its back.' },
  'lazes':         { display: 'Lazes',         meaning: 'To relax and do nothing.' },
  'scarecrow':     { display: 'Scarecrow',     meaning: 'A figure made of straw and old clothes placed in fields to scare birds away.' },
}

const chapter5Words: WordMap = {
  'chaos':               { display: 'Chaos',              meaning: 'Complete confusion and disorder.' },
  'refugee':             { display: 'Refugee',             meaning: 'A person who has been forced to leave their home, usually because of war.' },
  'resilience':          { display: 'Resilience',          meaning: 'The ability to recover quickly from difficulties — like a rubber ball that always bounces back.' },
  'collapse':            { display: 'Collapse',            meaning: 'To fall down suddenly due to exhaustion or weakness.' },
  'determination':       { display: 'Determination',       meaning: 'Firmness of purpose; not giving up.' },
  'cross-country race':  { display: 'Cross-country race',  meaning: 'A long-distance running race held over open or rough land, not on a track.' },
  'commonwealth games':  { display: 'Commonwealth Games',  meaning: 'A major sports competition held every four years between countries once part of the British Empire.' },
  'partition':           { display: 'Partition',           meaning: 'The division of India in 1947 — one of the most painful events in the country\'s history.' },
  'refugee camps':       { display: 'Refugee camps',       meaning: 'Temporary shelters set up for people who have lost their homes due to war.' },
  'biographical narrative': { display: 'Biographical narrative', meaning: 'A story based on the real life of a real person.' },
  'sprinting':           { display: 'Sprinting',           meaning: 'Running at full speed over a short distance.' },
}

const chapter6Words: WordMap = {
  'wondrous':       { display: 'Wondrous',      meaning: 'Wonderful, marvellous, inspiring wonder.' },
  "ne'er":          { display: "Ne'er",          meaning: 'Never (old poetic contraction).' },
  'hapless':        { display: 'Hapless',        meaning: 'Unfortunate, unlucky.' },
  'woe':            { display: 'Woe',            meaning: 'Great sorrow or distress.' },
  'mourn':          { display: 'Mourn',          meaning: 'To feel or express great sadness, especially for a loss.' },
  'cheer of mind':  { display: 'Cheer of mind',  meaning: 'Inner happiness and cheerfulness — the joy that lives inside you.' },
  'whilst':         { display: 'Whilst',         meaning: 'While (old English word).' },
  'contentment':    { display: 'Contentment',    meaning: 'Being at peace and happy with what you have.' },
  'blessings':      { display: 'Blessings',      meaning: 'The gifts and advantages that make life good.' },
}

const chapter7Words: WordMap = {
  'ambitious':   { display: 'Ambitious',  meaning: 'Having a strong desire to succeed or achieve something.' },
  'hermit':      { display: 'Hermit',     meaning: 'A person who lives alone, away from society.' },
  'frail':       { display: 'Frail',      meaning: 'Weak and delicate.' },
  'spade':       { display: 'Spade',      meaning: 'A tool for digging, like a shovel.' },
  'panted':      { display: 'Panted',     meaning: 'Breathed quickly and heavily from exertion.' },
  'clutching':   { display: 'Clutching',  meaning: 'Holding something tightly.' },
  'moaning':     { display: 'Moaning',    meaning: 'Making a low sound of pain or suffering.' },
  'executed':    { display: 'Executed',   meaning: 'Put to death as a punishment.' },
  'seized':      { display: 'Seized',     meaning: 'Taken by force.' },
  'bewildered':  { display: 'Bewildered', meaning: 'Completely confused and puzzled.' },
  'pitied':      { display: 'Pitied',     meaning: 'Felt sympathy and sorrow for someone.' },
  'intended':    { display: 'Intended',   meaning: 'Planned or meant to do something.' },
  'empathy':     { display: 'Empathy',    meaning: 'Understanding and sharing the feelings of another person.' },
  'wisdom':      { display: 'Wisdom',     meaning: 'Good judgement and the ability to make the right decisions.' },
}

const chapter8Words: WordMap = {
  'hedges':         { display: 'Hedges',       meaning: 'Rows of bushes or shrubs used as a fence.' },
  'ditches':        { display: 'Ditches',       meaning: 'Long, narrow trenches dug at the side of roads.' },
  'meadows':        { display: 'Meadows',       meaning: 'Open fields of grass, often with wildflowers.' },
  'driving rain':   { display: 'Driving rain',  meaning: 'Very heavy rain blown hard by the wind.' },
  'clambers':       { display: 'Clambers',      meaning: 'Climbs with difficulty using hands and feet.' },
  'scrambles':      { display: 'Scrambles',     meaning: 'Moves quickly and awkwardly over rough ground.' },
  'brambles':       { display: 'Brambles',       meaning: 'Wild prickly bushes that produce blackberries.' },
  'tramp':          { display: 'Tramp',          meaning: 'A person with no home who wanders from place to place.' },
  'gazes':          { display: 'Gazes',          meaning: 'Looks steadily and intently at something.' },
  'lumping':        { display: 'Lumping',        meaning: 'Moving heavily and clumsily.' },
  'glimpse':        { display: 'Glimpse',        meaning: 'A brief, quick look at something.' },
  'exhilarating':   { display: 'Exhilarating',  meaning: 'Making you feel very happy, excited, and alive.' },
  'fleeting':       { display: 'Fleeting',       meaning: 'Lasting for only a very short time before it is gone.' },
}

export const CHAPTER_WORDS: Record<number, WordMap> = {
  1: chapter1Words,
  2: chapter2Words,
  3: chapter3Words,
  4: chapter4Words,
  5: chapter5Words,
  6: chapter6Words,
  7: chapter7Words,
  8: chapter8Words,
}

export function getWordMap(chapterId: number): WordMap {
  return CHAPTER_WORDS[chapterId] || {}
}
