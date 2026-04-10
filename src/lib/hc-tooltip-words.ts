// HC Tooltip word maps — Gyaanpravaha
// History & Civics — Connexion Class 6, Project 1

export interface TooltipWord {
  display: string
  meaning: string
}

export type WordMap = Record<string, TooltipWord>

const chapter1Words: WordMap = {
  'aryans':           { display: 'Aryans',           meaning: 'A group of people from Central Asia who arrived in India around 1500 B.C. and gave India the Sanskrit language and Vedic civilization.' },
  'saptasindhu':      { display: 'Saptasindhu',      meaning: 'Means "Region of the Seven Rivers" — the fertile region of Punjab where the Aryans first settled. Also called Brahmavarta.' },
  'vedas':            { display: 'Vedas',             meaning: 'The most sacred texts of Hinduism. The word means "knowledge." There are four Vedas: Rig, Sama, Yajur, and Atharva.' },
  'vedic':            { display: 'Vedic',             meaning: 'Relating to the Vedas or the civilization of the Aryans. The Vedic period covers 1500 B.C. to 600 B.C.' },
  'gurukul':          { display: 'Gurukul',           meaning: 'An ancient residential school in the forest where students lived with their guru for 25 years. No books — everything was taught orally.' },
  'gurudakshina':     { display: 'Gurudakshina',      meaning: 'The offering of gratitude given by a student to their guru after completing their education at the Gurukul.' },
  'brahmacharya':     { display: 'Brahmacharya',      meaning: 'The first stage of life in the Ashrama system — the student stage, when a person studies with their guru.' },
  'grihastha':        { display: 'Grihastha',         meaning: 'The second stage of life — the householder stage, when a person marries, raises a family, and fulfils worldly duties.' },
  'vanaprastha':      { display: 'Vanaprastha',       meaning: 'The third stage of life — when a person gives up worldly life and goes to the forest to meditate.' },
  'sanyasa':          { display: 'Sanyasa',           meaning: 'The fourth and final stage of life — when a person renounces all worldly ties and becomes a wandering spiritual teacher.' },
  'nomadic':          { display: 'Nomadic',           meaning: 'Moving from place to place without a fixed home. The early Aryans were nomadic before settling in Punjab.' },
  'ashwamedha yajna': { display: 'Ashwamedha Yajna',  meaning: 'A royal horse sacrifice performed by Later Vedic Age kings to claim territory and prove supremacy.' },
  'brahmavarta':      { display: 'Brahmavarta',       meaning: 'The name the Aryans gave to their first settlement in Punjab — meaning "the land of the Gods."' },
  'aryavarta':        { display: 'Aryavarta',         meaning: 'The name given to the Gangetic valley where the Aryans settled in the Later Vedic Period — meaning "land of the Aryans."' },
}

const chapter2Words: WordMap = {
  'sanatana dharma':  { display: 'Sanatana Dharma',  meaning: 'Means "eternal faith" — the name Hindus use for Hinduism. Sanatana = eternal, Dharma = righteous duty.' },
  'brahman':          { display: 'Brahman',           meaning: 'The one supreme God in Hinduism — the universal spirit present in everything and everywhere.' },
  'trimurti':         { display: 'Trimurti',          meaning: 'The three primary forms of God: Brahma (Creator), Vishnu (Preserver), and Shiva (Destroyer).' },
  'avatar':           { display: 'Avatar',            meaning: 'An incarnation of God on earth. Vishnu has 10 avatars — God descending to earth to restore righteousness.' },
  'dharma':           { display: 'Dharma',            meaning: 'One\'s moral obligation or the right way of living. A student\'s dharma is to study; a soldier\'s dharma is to protect.' },
  'karma':            { display: 'Karma',             meaning: 'The idea that every action has consequences. Good actions lead to good results; bad actions lead to suffering.' },
  'moksha':           { display: 'Moksha',            meaning: 'Liberation from the endless cycle of birth and death. The ultimate goal of Hindu life.' },
  'satya':            { display: 'Satya',             meaning: 'Truth. One of the basic virtues in Hindu ethics. The national motto "Satyameva Jayate" means "Truth alone triumphs."' },
  'ahimsa':           { display: 'Ahimsa',            meaning: 'Nonviolence. Not hurting any living being through thought, word or action. Mahatma Gandhi used this to win India\'s freedom.' },
  'shrutis':          { display: 'Shrutis',           meaning: 'Hindu scriptures that are "heard" — the Vedas and Upanishads. Considered the most sacred, directly revealed to great sages.' },
  'smritis':          { display: 'Smritis',           meaning: 'Hindu scriptures that are "remembered" — including the Epics, Puranas, and Bhagavad Gita.' },
  'bhagavad gita':    { display: 'Bhagavad Gita',     meaning: 'The divine dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Part of the Mahabharata.' },
  'swastika':         { display: 'Swastika',          meaning: 'An ancient Hindu symbol of good luck, happiness and peace. Represents the 4 directions, 4 seasons, 4 Vedas, and 4 Yugas.' },
}

const chapter3Words: WordMap = {
  'jainism':          { display: 'Jainism',          meaning: 'A religion founded by Lord Mahavira that emphasises nonviolence, truth, and non-possessiveness.' },
  'mahavira':         { display: 'Mahavira',         meaning: 'The 24th Tirthankara of Jainism. Born 599 B.C. Attained enlightenment after 12 years of meditation.' },
  'nirvana':          { display: 'Nirvana',          meaning: 'Complete liberation from the cycle of birth and death. The highest spiritual goal in Jainism and Buddhism.' },
  'buddhism':         { display: 'Buddhism',         meaning: 'A religion founded by Gautama Buddha based on the Four Noble Truths and the Eightfold Path.' },
  'aparigraha':       { display: 'Aparigraha',       meaning: 'Non-possessiveness — complete detachment from people, places and material things. The fifth Great Vow of Jainism.' },
  'asteya':           { display: 'Asteya',           meaning: 'Non-stealing — not taking anything that belongs to others. The third Great Vow of Jainism and part of Panchasheel in Buddhism.' },
  'tripitikas':       { display: 'Tripitikas',       meaning: '"The Three Baskets" — the original teachings of the Buddha, composed in Pali.' },
  'panchasheel':      { display: 'Panchasheel',      meaning: 'The five rules of conduct for Buddhist followers: nonviolence, non-stealing, control over desire, truthfulness, no intoxicants.' },
  'digambars':        { display: 'Digambars',        meaning: 'One of the two main sects of Jainism — monks who do not wear any clothes as a symbol of complete detachment.' },
  'shwetambars':      { display: 'Shwetambars',      meaning: 'One of the two main sects of Jainism — monks who wear white clothes.' },
  'confucianism':     { display: 'Confucianism',     meaning: 'A philosophy founded by Confucius in China (551 B.C.) focused on right conduct, family values, and respect for elders.' },
  'bodhi tree':       { display: 'Bodhi tree',       meaning: 'The tree under which Gautama Buddha attained enlightenment at Bodh Gaya.' },
  'jina':             { display: 'Jina',             meaning: 'One who has conquered all their passions and attained liberation from the cycle of birth and death. Jains worship the Jina.' },
}

const chapter4Words: WordMap = {
  'constitution':         { display: 'Constitution',         meaning: 'The supreme law of a country — a body of laws according to which the country is governed.' },
  'preamble':             { display: 'Preamble',             meaning: 'The introduction to the Constitution. It appears on the first page and states the goals India seeks to achieve.' },
  'sovereign':            { display: 'Sovereign',            meaning: 'Completely independent — making own decisions without interference from any other country.' },
  'socialist':            { display: 'Socialist',            meaning: 'A system where the wealth of the nation is shared fairly among all people.' },
  'secular':              { display: 'Secular',              meaning: 'No official state religion — the government treats all religions equally.' },
  'fraternity':           { display: 'Fraternity',           meaning: 'Brotherhood and unity among all citizens — living together with dignity and respect.' },
  'fundamental rights':   { display: 'Fundamental Rights',   meaning: 'Six rights guaranteed by the Constitution to every Indian citizen that the government cannot take away.' },
  'fundamental duties':   { display: 'Fundamental Duties',   meaning: 'Eleven duties added in 1976 that remind citizens of their responsibilities towards their country.' },
  'republic':             { display: 'Republic',             meaning: 'A state where the head of government is elected by the people, not a king or queen.' },
  'liberty':              { display: 'Liberty',              meaning: 'Freedom — to think, speak, express, believe, and worship as one chooses, without harming others.' },
  'equality':             { display: 'Equality',             meaning: 'Equal status and opportunity for all people regardless of caste, religion, gender or wealth.' },
}

const chapter5Words: WordMap = {
  'panchayat':           { display: 'Panchayat',           meaning: 'The local government of the village — the smallest unit of local self-government in rural India.' },
  'gram sabha':          { display: 'Gram Sabha',           meaning: 'The village assembly — every adult (18+) is a member. Meets at least twice a year and elects the Gram Panchayat.' },
  'sarpanch':            { display: 'Sarpanch',            meaning: 'The elected head of the Village Panchayat. Called Mukhiya in Bihar.' },
  'panchayati raj':      { display: 'Panchayati Raj',      meaning: 'The three-tier system of local self-government: Gram Panchayat, Block Samiti, and Zila Parishad.' },
  'gram panchayat':      { display: 'Gram Panchayat',      meaning: 'The local government at the village level — the most basic unit of the Panchayati Raj system.' },
  'block samiti':        { display: 'Block Samiti',        meaning: 'The second tier of Panchayati Raj, covering 20–50 villages. Executes development programmes.' },
  'zila parishad':       { display: 'Zila Parishad',       meaning: 'The third and highest tier of Panchayati Raj at the district level. India has 641 Zila Parishads.' },
  'gram swaraj':         { display: 'Gram Swaraj',         meaning: 'Mahatma Gandhi\'s vision of village self-rule — the idea that true democracy begins at the village level.' },
  '73rd amendment':      { display: '73rd Amendment',      meaning: 'The 1993 constitutional amendment that gave Panchayats constitutional status and greater powers.' },
  'self-reliant':        { display: 'Self-reliant',        meaning: 'Able to manage on one\'s own without depending on others. The Panchayati Raj promotes village self-reliance.' },
  'bdo':                 { display: 'BDO',                 meaning: 'Block Development Officer — the executive officer of the Block Samiti, appointed by the state government.' },
}

const chapter6Words: WordMap = {
  'determination':    { display: 'Determination',    meaning: 'The firm resolve to achieve something no matter how difficult. The chapter calls it "the golden rule to success."' },
  'yoga':             { display: 'Yoga',             meaning: 'In this chapter, yoga means the unity of mind, speech and body — not just physical postures.' },
  'contemplating':    { display: 'Contemplating',    meaning: 'Thinking deeply about something. One of the three functions of the mind, along with recalling and imagining.' },
  'vow':              { display: 'Vow',              meaning: 'A solemn, firm promise made to oneself. A vow guides the mind, speech and body towards a specific goal.' },
  'approving':        { display: 'Approving',        meaning: 'Supporting or accepting what others do. The chapter teaches that approving wrongdoing carries the same responsibility as doing it.' },
  'aligned':          { display: 'Aligned',          meaning: 'Moving in the same direction towards the same goal. When mind, speech and body are aligned, peace results.' },
  'recalling':        { display: 'Recalling',        meaning: 'Remembering past events or information. One of the three functions of the mind.' },
  'imagining':        { display: 'Imagining',        meaning: 'Creating mental pictures or scenarios. One of the three functions of the mind.' },
}

export const HC_CHAPTER_WORDS: Record<number, WordMap> = {
  1: chapter1Words,
  2: chapter2Words,
  3: chapter3Words,
  4: chapter4Words,
  5: chapter5Words,
  6: chapter6Words,
}

export function getHCWordMap(chapterId: number): WordMap {
  return HC_CHAPTER_WORDS[chapterId] || {}
}
