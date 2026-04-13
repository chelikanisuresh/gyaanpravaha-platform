// Rapid Reader — Swami and Friends vocabulary tooltips
// Difficult words from R.K. Narayan's novel, explained for an 11-year-old

export type WordMap = Record<string, { display: string; meaning: string }>

const ch1Words: WordMap = {
  'reluctant':       { display:'Reluctant',      meaning:'Unwilling or hesitant to do something. Swaminathan did not want to go to school on Monday.' },
  'dismal':          { display:'Dismal',          meaning:'Gloomy, depressing and without any brightness or hope.' },
  'presiding':       { display:'Presiding',       meaning:'Being in charge of or controlling a situation, like a teacher in charge of a class.' },
  'monotonously':    { display:'Monotonously',    meaning:'In a dull, boring, repetitive way — always the same sound or tone, never changing.' },
  'scrutinised':     { display:'Scrutinised',     meaning:'Examined something very closely and carefully.' },
  'reprimand':       { display:'Reprimand',       meaning:'A formal or official scolding for doing something wrong.' },
  'obstinate':       { display:'Obstinate',       meaning:'Stubbornly refusing to change your mind, even when you should.' },
  'heretic':         { display:'Heretic',         meaning:'Someone who holds beliefs that go against the official teachings of a religion.' },
  'fanaticism':      { display:'Fanaticism',      meaning:'Extreme, unreasonable enthusiasm for a belief — so strong it becomes dangerous.' },
  'conformed':       { display:'Conformed',       meaning:'Followed the usual rules or standards expected by others.' },
}

const ch2Words: WordMap = {
  'nonchalance':     { display:'Nonchalance',     meaning:'A relaxed, casual manner that shows you are not worried or impressed by anything.' },
  'indefatigable':   { display:'Indefatigable',   meaning:'Never getting tired; always having energy to keep going.' },
  'triumvirate':     { display:'Triumvirate',     meaning:'A group of three people who are in charge or closely connected — like the three rulers of ancient Rome.' },
  'menace':          { display:'Menace',           meaning:'A person or thing that is a serious threat or danger.' },
  'vague':           { display:'Vague',            meaning:'Not clear or precise — difficult to understand or describe exactly.' },
  'speculation':     { display:'Speculation',     meaning:'Thinking or guessing about something when you do not have all the facts.' },
  'seventy percenter': { display:'Seventy percenter', meaning:'Someone who regularly scores around seventy percent in exams — a good but not top student.' },
}

const ch3Words: WordMap = {
  'ecstatically':    { display:'Ecstatically',    meaning:'With overwhelming happiness and excitement — feeling extreme joy.' },
  'snug':            { display:'Snug',             meaning:'Warm, comfortable, and safe — like being wrapped in a cosy blanket.' },
  'rambled':         { display:'Rambled',          meaning:'Talked in a wandering, unfocused way — jumping from topic to topic.' },
  'recounted':       { display:'Recounted',        meaning:'Told a story or described events again in detail.' },
  'candour':         { display:'Candour',          meaning:'The quality of being honest and direct — sometimes painfully so.' },
  'senile':          { display:'Senile',           meaning:'Showing the mental weakness and confusion that can come with very old age.' },
}

const ch4Words: WordMap = {
  'ostracised':      { display:'Ostracised',       meaning:'Deliberately excluded from a group as a form of punishment.' },
  'vacantly':        { display:'Vacantly',         meaning:'With a blank, empty expression — without any thoughts or feelings showing.' },
  'studiously':      { display:'Studiously',       meaning:'Deliberately and carefully — doing something with full attention and purpose.' },
  'irresistible':    { display:'Irresistible',     meaning:'Too strong or attractive to resist — you cannot help acting on it.' },
  'formidable':      { display:'Formidable',       meaning:'Causing fear or respect because of great size, power, or difficulty.' },
}

const ch5Words: WordMap = {
  'anticipated':     { display:'Anticipated',      meaning:'Expected something to happen in advance and prepared for it.' },
  'pretence':        { display:'Pretence',         meaning:'Acting as if something is true when it is not — keeping up a false impression.' },
  'vaguely':         { display:'Vaguely',          meaning:'In an unclear, uncertain, or uncommitted way.' },
  'revolving':       { display:'Revolving',        meaning:'Turning in a circle around a central point — a revolving chair spins around.' },
  'tiffin':          { display:'Tiffin',           meaning:'A light meal or snack, typically eaten in the afternoon. A word used in South Asia.' },
}

const ch6Words: WordMap = {
  'astonishment':    { display:'Astonishment',     meaning:'A feeling of great surprise and wonder.' },
  'brandished':      { display:'Brandished',       meaning:'Waved something, especially a weapon, in a threatening or excited way.' },
  'nonchalantly':    { display:'Nonchalantly',     meaning:'In a casual, unconcerned manner — as if nothing is surprising or impressive.' },
  'ferocious':       { display:'Ferocious',        meaning:'Extremely fierce, violent, and aggressive.' },
  'caution':         { display:'Caution',          meaning:'Care taken to avoid danger or mistakes; a warning to be careful.' },
}

const ch7Words: WordMap = {
  'dishevelled':     { display:'Dishevelled',      meaning:'Untidy in appearance — messy hair, crumpled clothes, looking disorganised.' },
  'confinement':     { display:'Confinement',      meaning:'The state of being restricted to a bed or room, especially after having a baby.' },
  'indifferent':     { display:'Indifferent',      meaning:'Having no particular interest or concern — neither positive nor negative.' },
}

const ch8Words: WordMap = {
  'fussy':           { display:'Fussy',            meaning:'Hard to please; paying too much attention to small, unimportant details.' },
  'harass':          { display:'Harass',           meaning:'To trouble or annoy someone repeatedly.' },
  'subsidiary':      { display:'Subsidiary',       meaning:'Less important than the main thing — secondary or supporting.' },
  'contemptible':    { display:'Contemptible',     meaning:'Deserving to be looked down upon with scorn; completely without worth.' },
  'incessant':       { display:'Incessant',        meaning:'Never stopping; continuing without any pause or break.' },
}

const ch9Words: WordMap = {
  'exaltation':      { display:'Exaltation',       meaning:'A feeling of great happiness and triumph — the joy of achieving something.' },
  'listless':        { display:'Listless',         meaning:'Having no energy or enthusiasm — too tired to do anything.' },
  'jubilant':        { display:'Jubilant',         meaning:'Feeling or expressing great happiness and triumph.' },
  'laggard':         { display:'Laggard',          meaning:'A person who makes slow progress and falls behind others.' },
}

const ch10Words: WordMap = {
  'shackles':        { display:'Shackles',         meaning:'Metal rings linked by a chain, used to restrain prisoners. Also means anything that restricts freedom.' },
  'cosmopolitan':    { display:'Cosmopolitan',     meaning:'Familiar with and comfortable in many different countries and cultures.' },
  'exploits':        { display:'Exploits',         meaning:'Bold, exciting actions or achievements — things that are talked about admiringly.' },
  'contemplation':   { display:'Contemplation',   meaning:'Deep, quiet thinking and reflection about something.' },
}

const ch11Words: WordMap = {
  'sweltering':      { display:'Sweltering',       meaning:'Uncomfortably hot; so hot that you sweat and feel exhausted.' },
  'stupefied':       { display:'Stupefied',        meaning:'So shocked or amazed that you cannot think clearly.' },
  'authoritative':   { display:'Authoritative',   meaning:'Commanding respect because of knowledge, power, or confidence.' },
  'remorse':         { display:'Remorse',          meaning:'Deep regret and guilt for something wrong you have done.' },
}

const ch12Words: WordMap = {
  'khaddar':         { display:'Khaddar',          meaning:'Handspun, handwoven cotton cloth associated with the Indian independence movement.' },
  'boycott':         { display:'Boycott',          meaning:'Refuse to buy, use, or participate in something as a form of protest.' },
  'patriotism':      { display:'Patriotism',       meaning:'Love and devotion to one\'s country, especially shown through actions.' },
  'impending':       { display:'Impending',        meaning:'About to happen very soon — often used for something threatening or difficult.' },
  'eloquent':        { display:'Eloquent',         meaning:'Able to speak or write in a clear, powerful, and persuasive way.' },
}

const ch13Words: WordMap = {
  'amiably':         { display:'Amiably',          meaning:'In a friendly and pleasant manner — getting along well with others.' },
  'sceptical':       { display:'Sceptical',        meaning:'Doubtful; not easily convinced that something is true.' },
  'earnestness':     { display:'Earnestness',      meaning:'Seriousness and genuine feeling in what you say or do.' },
  'tactics':         { display:'Tactics',          meaning:'Carefully planned actions used to achieve a goal, especially in sport or competition.' },
}

const ch14Words: WordMap = {
  'tenacious':       { display:'Tenacious',        meaning:'Holding firmly to something; very determined and not giving up easily.' },
  'interminable':    { display:'Interminable',     meaning:'Endless; seeming to last forever and becoming very boring or annoying.' },
  'exasperated':     { display:'Exasperated',      meaning:'Intensely irritated and frustrated — driven to the end of your patience.' },
  'arithmetic':      { display:'Arithmetic',       meaning:'The branch of mathematics dealing with addition, subtraction, multiplication, and division.' },
}

const ch15Words: WordMap = {
  'indefatigable':   { display:'Indefatigable',   meaning:'Never getting tired; showing tireless determination and energy.' },
  'feint':           { display:'Feint',            meaning:'A deceptive movement intended to trick an opponent — pretending to do one thing while doing another.' },
  'strategy':        { display:'Strategy',         meaning:'A plan of action designed to achieve a long-term goal.' },
  'pandemonium':     { display:'Pandemonium',      meaning:'A scene of wild chaos and noisy confusion.' },
}

const ch16Words: WordMap = {
  'frantic':         { display:'Frantic',          meaning:'Wildly anxious and hurried — desperate with worry or excitement.' },
  'desolate':        { display:'Desolate',         meaning:'Empty, lonely, and unhappy — without comfort or company.' },
}

const ch17Words: WordMap = {
  'eugenia':         { display:'Eugenia',          meaning:'A tropical tree that produces small purple or red fruits, common in South India.' },
  'pandemonium':     { display:'Pandemonium',      meaning:'Loud, chaotic noise and confusion — total disorder.' },
  'triumph':         { display:'Triumph',          meaning:'A great victory or achievement, especially after a struggle.' },
  'anguish':         { display:'Anguish',          meaning:'Severe mental or physical pain — extreme suffering.' },
}

const ch18Words: WordMap = {
  'inscrutable':     { display:'Inscrutable',      meaning:'Impossible to understand or interpret — not showing any feelings or thoughts.' },
  'reconciliation':  { display:'Reconciliation',  meaning:'The restoration of friendly relations after a disagreement.' },
  'remorse':         { display:'Remorse',          meaning:'Deep, painful regret for something wrong you have done.' },
}

const ch19Words: WordMap = {
  'inexorable':      { display:'Inexorable',       meaning:'Impossible to stop or prevent — moving forward relentlessly.' },
  'parting':         { display:'Parting',          meaning:'The act of leaving or saying goodbye, especially for a long time.' },
  'hysterically':    { display:'Hysterically',     meaning:'In an uncontrolled and wildly emotional way — crying or laughing beyond control.' },
}

const WORD_MAPS: Record<number, WordMap> = {
  1:ch1Words, 2:ch2Words, 3:ch3Words, 4:ch4Words, 5:ch5Words,
  6:ch6Words, 7:ch7Words, 8:ch8Words, 9:ch9Words, 10:ch10Words,
  11:ch11Words, 12:ch12Words, 13:ch13Words, 14:ch14Words, 15:ch15Words,
  16:ch16Words, 17:ch17Words, 18:ch18Words, 19:ch19Words,
}

export function getRapidWordMap(chapterId: number): WordMap {
  return WORD_MAPS[chapterId] ?? {}
}
