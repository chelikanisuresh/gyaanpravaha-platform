// Chapter content — Gyaanpravaha
// All content approved and locked. Do not edit without admin review.

export interface Section {
  id: number
  title: string
  content: string       // rich text with \n for paragraphs
  minReadSeconds?: number  // only Section 3 (the actual text) has this
}

export interface Chapter {
  id: number
  title: string
  type: 'Prose' | 'Poetry' | 'Short story' | 'Biographical narrative'
  estimatedReadMins: number
  sections: Section[]
}

// ─── CHAPTER 1 ────────────────────────────────────────────────────────────────

const chapter1: Chapter = {
  id: 1,
  title: 'Whistles and Shaving Bristles',
  type: 'Prose',
  estimatedReadMins: 15,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Imagine living in a house with twelve brothers and sisters — yes, twelve! Now imagine your father running that house like a factory, with charts on the bathroom walls and a special whistle call just for your family. Sounds fun and a little crazy, right?

This chapter is an extract — which means it is a small piece taken from a much bigger book called Cheaper by the Dozen written by Frank B. Gilbreth Jr. and Ernestine Gilbreth Carey. It gives us a peek into the wonderfully organised, slightly mad, and deeply loving life of the Gilbreth family.

Get ready to laugh, think, and maybe even see your own family in a new way.`,
    },
    {
      id: 2,
      title: 'About the authors',
      content: `Frank B. Gilbreth Jr. and Ernestine Gilbreth Carey were brother and sister — two of the twelve Gilbreth children. They grew up and wrote this book together, telling the world about their extraordinary family life.

Their parents — Frank Gilbreth Sr. and Lillian Moller Gilbreth — were real-life pioneers of something called motion study. Motion study is the science of figuring out the most efficient way to do any task — using the least number of movements possible. Their father applied this not just at work, but at home with his twelve children. That is what makes this story so funny and fascinating.

The book Cheaper by the Dozen became so popular that it was made into a film. The title itself is a joke — a dozen means twelve, and things are "cheaper by the dozen" when you buy them in bulk. The Gilbreths had a dozen children — get it?`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand what an extract is and how it differs from a complete story
• Describe the Gilbreth family and what made their home life unique
• Explain what motion study and efficiency mean with examples
• Understand new vocabulary words used in the chapter
• Reflect on the values of family bonding and discipline from the story`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 180, // 3 minutes minimum
      content: `PART A — Meet the Gilbreth family

The story opens with a simple but striking line — the family had fourteen members. Two parents and twelve children. The narrator is one of the children, looking back at their childhood with warmth and humour.

Their father was not an ordinary man. He was an efficiency expert — someone companies hired to visit their factories and tell them how to get work done faster and with less waste. He was tall, confident, and proud of his family. He believed that if you could run a factory efficiently, you could run a home the same way.

Their house in Montclair, New Jersey, was a beautiful mansion. And just like a well-run factory, nothing in that house was wasted — not time, not movement, not effort. Their mother called this approach motion study.

─────

PART B — The bathroom charts

Now here is where it gets really interesting.

Dad put up charts in the bathrooms. Yes — in the bathroom! These charts tracked whether each child had brushed their teeth, combed their hair, and completed their morning chores. Every child had to sign their initials on the chart after finishing each task.

Why? Because managing twelve children was a huge job. The charts made sure no one could skip brushing their teeth and pretend they had done it.

Dad had what the author calls an eagle eye — meaning he noticed everything. Not a single child could get away with lying to him. With twelve children, you might think it would be easy to hide — but not with Dad around.

─────

PART C — The efficiency of shaving

This is the funniest part of the chapter — and the one that gives the story its title.

Dad was obsessed with saving time in everything he did. He buttoned his shirt from the bottom up because he timed it and discovered it saved four seconds compared to buttoning from the top.

He used two shaving brushes at the same time to lather his face — because using two at once saved seventeen seconds.

Then one day, he had an idea: what if he used two razors at the same time to shave? Surely that would save even more time!

He tried it. It did not go well.

He cut himself badly and had to spend almost two minutes bandaging the wound. That was far more time than he had saved. And the worst part — for Dad — was not the pain. It was the wasted two minutes. That bothered him more than the cut!

This tells us so much about his character. He was a man who valued time above almost everything else. To him, wasted time was the real injury.

─────

PART D — Strict but fiercely protective

Although Dad was very strict at home — chores, charts, discipline, efficiency — he had one rule that overrode everything: no outsider could criticise his children.

The story gives us a perfect example. A neighbour came to complain that one of the Gilbreth boys had teased his son. What did Dad do? He gave the neighbour a blank look and walked away without saying a word.

You might think — oh, so Dad did not care?

Wrong. The moment Dad got home, he made that same son do a hundred sit-ups as punishment. But that punishment was private — within the family. The neighbour had no right to discipline his children. That was Dad's job, and his alone.

This shows us something beautiful about the Gilbreth family. The father was tough on the inside but a shield on the outside.

─────

PART E — The whistle

Dad travelled a lot for work. And every time he came home, he did something wonderful and a little dramatic — he blew a special whistle as he entered the gate.

This was no ordinary whistle. It was a tune he had composed himself — his own signature sound. And every child in the house knew exactly what it meant.

Drop everything. Run to the yard. Right now.

The whistle was used for many things — family announcements, surprise treats, or sometimes just because Dad was bored and wanted to have some fun. The children were so used to this ritual that they would assemble in the yard within seconds, no matter what they were doing.

The whistle proved most valuable on one terrifying day when the house caught fire. A bonfire of dry leaves on the driveway got out of control and spread to the side of the house. Dad blew his whistle loudly. The entire family — all twelve children — evacuated the house in just fourteen seconds.

Fourteen seconds. Twelve children. Because they had practised responding to that whistle so many times, it became second nature. That is the power of habit and discipline.

─────

PART F — The surprise smiles

The most heartwarming part of the chapter comes at the very end.

Sometimes Dad would blow the whistle just to surprise the children. He would gather everyone in the yard, look at them with a stern, angry face — as if they had done something terribly wrong. The children would stand there nervously, wondering what was about to happen.

And then, suddenly, the frown would melt into a divine smile — and in his hands would be candies for all of them.

The children would rush to hug him, throwing their arms around his neck.

The author says: "Those were the best times we had with our father."

This one moment captures everything about the chapter — a father who was disciplined, organised, sometimes strict — but underneath all of it, deeply, completely in love with his family.`,
    },
    {
      id: 5,
      title: 'Word meanings',
      content: `Efficiency expert — A person who studies how work is done and suggests ways to do it faster and better. Think of an expert at a factory watching workers and finding shortcuts.

Motion study — The scientific study of movements involved in doing a task, to find the most efficient way. Motion = movement. Study = analyse.

Eagle eye — A very sharp, observant eye that notices every detail. Eagles can spot a mouse from high up in the sky — that sharp!

Initials — The first letters of your name. If your name is Rahul Sharma, your initials are R.S.

Criticising — Pointing out faults or expressing disapproval of someone.

Accustomed — Used to something; familiar with it through habit.

Assemble — To gather or come together in one place. Your school assembly — everyone gathers together.

Divine — Wonderfully beautiful or heavenly. Something so good it feels like it came from heaven.

Mansion — A very large, grand house.

Extract — A short piece taken from a longer book or text. Like taking one slice from a whole cake — you get a taste, not the whole thing.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Family bonding — The Gilbreth family had twelve children — yet they functioned as one unit. The whistle, the charts, the routines — all of these brought the family together. True family bonding is not just about having fun together. It is about having systems, rituals, and shared moments that make everyone feel they belong.

Discipline — Dad's discipline was not about punishment — it was about building habits that worked. Signing charts, responding to the whistle, completing chores — these were not rules meant to restrict the children. They were habits that made the family stronger, faster, and safer. The fire evacuation in fourteen seconds proves that discipline, when practised regularly, can save lives.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The Gilbreth family had fourteen members — two parents and twelve children. Their father was an efficiency expert who believed in eliminating wasted time and movement.

2. Dad put charts in the bathrooms to track whether each child had completed their morning tasks — every child signed their initials as proof.

3. In his obsession with saving time, Dad tried using two razors at once while shaving — it went badly wrong and cost him two minutes, which bothered him more than the injury itself.

4. Dad was strict at home but fiercely protective of his children from outsiders — no one outside the family was allowed to criticise his children.

5. Dad's whistle was a family ritual that once helped evacuate all twelve children from a house fire in just fourteen seconds — proof that habit and discipline truly matter.`,
    },
  ],
}

// ─── CHAPTER 2 (Poetry) ───────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'If I Were Lord of Tartary',
  type: 'Poetry',
  estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Close your eyes for a moment. Imagine you are the ruler of an entire kingdom — a magical, faraway land where everything belongs to you. What would it look like? What would you wear? What animals would roam your forests?\n\nThis chapter is a poem by Walter de la Mare called If I Were Lord of Tartary. In it, the poet imagines himself as the all-powerful ruler of a mysterious land called Tartary. Through beautiful, vivid images, he takes us on a dreamy journey through his fantasy kingdom. This poem is not just about imagination — it is about the joy of dreaming big and letting your mind wander freely.` },
    { id: 2, title: 'About the poet', content: `Walter de la Mare (25 April 1873 — 22 June 1956) was an English poet, short story writer, and novelist. He is best remembered for writing for children and for poems that have a dreamy, magical quality to them.\n\nHe had a unique gift — he could make the ordinary world feel mysterious and the imaginary world feel completely real. His most famous poem is The Listeners, but If I Were Lord of Tartary is loved by readers of all ages for its rich imagery and playful spirit.\n\nDe la Mare believed that imagination was one of the most powerful gifts a human being could have. This poem is his celebration of that belief.\n\nTartary — you might be wondering what this word means. Tartary was the name given to a vast, mysterious region of central Asia in old European maps and stories. It was considered exotic, faraway, and magical — the perfect setting for a fantasy kingdom.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:\n\n• Read and understand a poem written in the first person — where the poet speaks as "I"\n• Identify and explain vivid imagery in a poem — the pictures the poet creates with words\n• Understand new and interesting vocabulary from the poem\n• Appreciate the theme of imagination and what it means to dream freely\n• Identify the rhyme scheme in the poem` },
    { id: 4, title: 'Read the text', minReadSeconds: 180, content: `STANZA 1\n\nIf I were Lord of Tartary,\nMyself, and me alone,\nMy bed should be of ivory,\nOf beaten gold my throne;\nAnd in my court should peacocks flaunt,\nAnd in my forests tigers haunt,\nAnd in my pools great fishes slant\nTheir fins athwart the sun.\n\nThe poet begins with a big dream. If he were the ruler of Tartary — all by himself, answerable to no one — his bed would be made of ivory and his throne of beaten gold. In his court, peacocks would flaunt — show off their beautiful feathers proudly. Tigers would roam his forests. And in his pools, great fish would glide with their fins cutting across the water, catching sunlight.\n\nThe rhyme scheme is ABABCCCB — notice how flaunt, haunt, slant all rhyme.\n\n─────\n\nSTANZA 2\n\nIf I were Lord of Tartary,\nTrumpeters every day\nTo all my meals should summon me,\nAnd in my courtyards bray;\nAnd in the evening lamps should shine,\nYellow as honey, red as wine,\nWhile harp, and flute, and mandolin\nMade music sweet and gay.\n\nEvery day, trumpeters would announce his meals. In the evenings, lamps would glow warm and beautiful — yellow like honey, red like wine. While he ate or rested, harps, flutes, and mandolins would play sweet, joyful music.\n\nSimiles: yellow as honey, red as wine — comparing the colour of the lamps to honey and wine.\n\n─────\n\nSTANZA 3\n\nIf I were Lord of Tartary,\nI'd wear a robe of beads,\nWhite, and gold, and green they'd be,\nAnd small and thick as seeds;\nAnd ere should wane the morning star,\nI'd don my robe and scimitar.\nAnd zebras seven should draw my car\nThrough Tartary's dark glades.\n\nA magnificent robe covered in small, thick beads of white, gold, and green. Before the morning star fades, he would put on his robe and his scimitar — a curved sword. Seven zebras would pull his royal carriage through the dark forest paths of Tartary.\n\n─────\n\nSTANZA 4\n\nLord of the fruits of Tartary,\nHer rivers silver-pale!\nLord of the hills of Tartary,\nGlen, thicket, wood, and dale!\nHer flashing stars, her scented breeze,\nHer trembling lakes, like foamless seas,\nHer bird-delighting citron-trees,\nIn every purple vale!\n\nThe final stanza is a celebration. He is lord of the fruits of Tartary, its silver rivers, its hills, its valleys, its thick forest patches, its woods. He owns the flashing stars, the scented breeze, lakes so still they look like seas without waves, citron trees in every purple-tinged valley of his kingdom.` },
    { id: 5, title: 'Word meanings', content: `Flaunt — To show off something proudly. Think of peacocks spreading their feathers.\n\nAthwart — Across, from one side to the other.\n\nSummon — To call someone to come.\n\nBray — The loud sound of a trumpet or a donkey.\n\nMandolin — A small stringed musical instrument.\n\nEre — Before (old poetic word).\n\nWane — To grow smaller or fade away. The moon wanes after it is full.\n\nDon — To put on a piece of clothing.\n\nScimitar — A curved sword used by Eastern warriors and kings.\n\nGlade — An open space in a forest.\n\nThicket — A dense growth of bushes and small trees.\n\nCitron — A type of citrus fruit, similar to a large lemon.\n\nVale — A valley.\n\nFoamless — Without foam or waves — completely still.` },
    { id: 6, title: 'Values learnt', content: `Imagination is a gift — This poem celebrates the power of the human mind to create entire worlds. A child with a vivid imagination is already the lord of their own Tartary.\n\nAppreciation for beauty — The poet does not just imagine power — he imagines beauty. Silver rivers, scented breezes, glowing lamps, musical evenings. This teaches us to notice and appreciate the beautiful things around us in real life, not just in dreams.` },
    { id: 7, title: 'Quick recap', content: `1. If I Were Lord of Tartary is a poem by Walter de la Mare about the poet's fantasy of being the all-powerful ruler of a magical, exotic kingdom.\n\n2. Tartary was a mysterious, faraway land in old European stories — the perfect setting for a fantasy.\n\n3. The poem has four stanzas, each adding a new layer: grand furnishings, musical evenings, royal clothing, and the natural beauty of the land.\n\n4. Key poetic devices: simile (yellow as honey, red as wine), personification (peacocks flaunt), and vivid imagery throughout.\n\n5. The values in this poem are the celebration of imagination and appreciation for beauty in the world around us.` },
  ],
}

// ─── CHAPTERS 3-8 (abbreviated — full content to be loaded from Supabase in production) ──

const chapterMeta: Omit<Chapter, 'sections'>[] = [
  { id: 3, title: 'The Fun They Had',                           type: 'Short story',           estimatedReadMins: 16 },
  { id: 4, title: 'In Morning Dew',                            type: 'Poetry',                estimatedReadMins: 11 },
  { id: 5, title: 'The Boy Who Outran the Wind — Milkha Singh', type: 'Biographical narrative', estimatedReadMins: 18 },
  { id: 6, title: 'The Blind Boy',                             type: 'Poetry',                estimatedReadMins: 12 },
  { id: 7, title: 'Three Questions',                           type: 'Short story',           estimatedReadMins: 20 },
  { id: 8, title: 'From a Railway Carriage',                   type: 'Poetry',                estimatedReadMins: 10 },
]

// Full chapters array — chapters 3-8 use placeholder sections
// Replace with Supabase fetch in production
const placeholderSections = (chapterId: number): Section[] => [
  { id: 1, title: 'What is this chapter about?',  content: `Content for chapter ${chapterId} — coming soon.` },
  { id: 2, title: 'About the author',              content: `Author details for chapter ${chapterId}.` },
  { id: 3, title: 'Learning outcomes',             content: `Learning outcomes for chapter ${chapterId}.` },
  { id: 4, title: 'Read the text',                 content: `Full text for chapter ${chapterId}.`, minReadSeconds: 180 },
  { id: 5, title: 'Word meanings',                 content: `Word meanings for chapter ${chapterId}.` },
  { id: 6, title: 'Values learnt',                 content: `Values for chapter ${chapterId}.` },
  { id: 7, title: 'Quick recap',                   content: `Recap for chapter ${chapterId}.` },
]

export const CHAPTERS: Chapter[] = [
  chapter1,
  chapter2,
  ...chapterMeta.map(meta => ({ ...meta, sections: placeholderSections(meta.id) })),
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
