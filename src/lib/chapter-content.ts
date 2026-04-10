// Chapter content — Gyaanpravaha
// All 8 chapters fully populated from approved transcript (April 2026)
// Do not edit without admin review.

export interface Section {
  id: number
  title: string
  content: string
  minReadSeconds?: number
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
      minReadSeconds: 540,
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

Think about it this way — if your teacher asked the whole class to raise their hand if they had done their homework, and you hadn't, would you raise your hand anyway? With Dad, that simply was not possible.

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
      title: 'Word watch',
      content: `Efficiency expert — A person who studies how work is done and suggests ways to do it faster and better. Think of an expert at a factory watching workers and finding shortcuts.

Motion study — The scientific study of movements involved in doing a task, to find the most efficient way. Motion = movement. Study = analyse. Finding the best movement for every job.

Eagle eye — A very sharp, observant eye that notices every detail. Eagles can spot a mouse from high up in the sky — that sharp!

Initials — The first letters of your name. If your name is Rahul Sharma, your initials are R.S. The initial letter — the very first one.

Criticising — Pointing out faults or expressing disapproval of someone. When someone says "you did that wrong" — that is criticising.

Accustomed — Used to something; familiar with it through habit. You are accustomed to waking up at 7am if you do it every single day.

Assemble — To gather or come together in one place. Your school assembly — everyone gathers together. Same idea.

Divine — Wonderfully beautiful or heavenly. Something so good it feels like it came from heaven.

Mansion — A very large, grand house. Much bigger than a bungalow — think of a house with many rooms and a large garden.

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

// ─── CHAPTER 2 ────────────────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'If I Were Lord of Tartary',
  type: 'Poetry',
  estimatedReadMins: 12,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Close your eyes for a moment. Imagine you are the ruler of an entire kingdom — a magical, faraway land where everything belongs to you. What would it look like? What would you wear? What animals would roam your forests?

This chapter is a poem by Walter de la Mare called If I Were Lord of Tartary. In it, the poet imagines himself as the all-powerful ruler of a mysterious land called Tartary. Through beautiful, vivid images, he takes us on a dreamy journey through his fantasy kingdom. This poem is not just about imagination — it is about the joy of dreaming big and letting your mind wander freely.`,
    },
    {
      id: 2,
      title: 'About the poet',
      content: `Walter de la Mare (25 April 1873 — 22 June 1956) was an English poet, short story writer, and novelist. He is best remembered for writing for children and for poems that have a dreamy, magical quality to them.

He had a unique gift — he could make the ordinary world feel mysterious and the imaginary world feel completely real. His most famous poem is The Listeners, but If I Were Lord of Tartary is loved by readers of all ages for its rich imagery and playful spirit.

De la Mare believed that imagination was one of the most powerful gifts a human being could have. This poem is his celebration of that belief.

Tartary — you might be wondering what this word means. Tartary was the name given to a vast, mysterious region of central Asia in old European maps and stories. It was considered exotic, faraway, and magical — the perfect setting for a fantasy kingdom.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read and understand a poem written in the first person — where the poet speaks as "I"
• Identify and explain vivid imagery in a poem — the pictures the poet creates with words
• Understand new and interesting vocabulary from the poem
• Appreciate the theme of imagination and what it means to dream freely
• Identify the rhyme scheme in the poem`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 480,
      content: `STANZA 1

If I were Lord of Tartary,
Myself, and me alone,
My bed should be of ivory,
Of beaten gold my throne;
And in my court should peacocks flaunt,
And in my forests tigers haunt,
And in my pools great fishes slant
Their fins athwart the sun.

What does this mean?
The poet begins with a big dream. If he were the ruler of Tartary — all by himself, answerable to no one — his bed would be made of ivory (the precious white material from elephant tusks) and his throne of beaten gold (gold that has been hammered into shape).

In his imaginary court, peacocks would flaunt — meaning they would show off their beautiful feathers proudly. Tigers would roam his forests. And in his pools, great fish would glide with their fins cutting across the surface of the water, catching the sunlight.

Mood: Grand, rich, and majestic. The poet is creating a picture of absolute luxury and power.

Poetic device: Flaunt — peacocks showing off their feathers — this gives the peacock a human quality. It is called personification.
The rhyme scheme is ABABCCCB — notice how flaunt, haunt, slant all rhyme.

─────

STANZA 2

If I were Lord of Tartary,
Trumpeters every day
To all my meals should summon me,
And in my courtyards bray;
And in the evening lamps should shine,
Yellow as honey, red as wine,
While harp, and flute, and mandolin
Made music sweet and gay.

What does this mean?
Every day, trumpeters would announce his meals. His courtyards would be filled with the sound of trumpets braying — making loud, bold sounds. In the evenings, lamps would glow warm and beautiful — yellow like honey, red like wine. While he ate or rested, harps, flutes, and mandolins would play sweet, joyful music.

Mood: Festive, musical, and warm.

Poetic devices: "Yellow as honey, red as wine" — these are similes. The poet compares the colour of the lamps to honey and wine to help us picture exactly how warm and beautiful they look.

─────

STANZA 3

If I were Lord of Tartary,
I'd wear a robe of beads,
White, and gold, and green they'd be,
And small and thick as seeds;
And ere should wane the morning star,
I'd don my robe and scimitar.
And zebras seven should draw my car
Through Tartary's dark glades.

What does this mean?
A magnificent robe covered in small, thick beads of white, gold, and green. Before the morning star fades (ere should wane means before it disappears), he would put on (don) his robe and his scimitar — a curved sword worn by kings and warriors in the East. Seven zebras would pull his royal carriage through the dark, shadowy forest paths (glades) of Tartary.

Mood: Exotic and adventurous. The image of seven zebras pulling a royal carriage through dark forest glades feels like something from a fairy tale.

─────

STANZA 4

Lord of the fruits of Tartary,
Her rivers silver-pale!
Lord of the hills of Tartary,
Glen, thicket, wood, and dale!
Her flashing stars, her scented breeze,
Her trembling lakes, like foamless seas,
Her bird-delighting citron-trees,
In every purple vale!

What does this mean?
The final stanza is a celebration. The poet steps back and looks at his entire kingdom with wonder and pride. He is lord of the fruits of Tartary, its silver rivers, its hills, its valleys (glens), its thick forest patches (thickets), its woods and dales. He owns the flashing stars, the scented breeze, lakes so still they look like seas without waves (foamless), citron trees that delight the birds — all of this in every purple-tinged valley of his kingdom.

Mood: Sweeping, proud, and full of wonder. The poet stands on a hilltop surveying his entire kingdom with deep satisfaction.

Poetic devices: "Trembling lakes, like foamless seas" — a simile. "Silver-pale" rivers — vivid imagery creating a picture with words.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Flaunt — To show off something proudly. Think of peacocks spreading their feathers — showing off is exactly what they do.

Athwart — Across, from one side to the other. Like a plank laid athwart a boat — cutting across it.

Summon — To call someone to come. Think of being summoned to the principal's office — called to appear immediately.

Bray — The loud sound of a trumpet or a donkey. Both are loud and impossible to ignore.

Mandolin — A small stringed musical instrument, like a small guitar. Imagine a miniature guitar played at a royal feast.

Ere — Before (old poetic word). Used in old English poetry — ere long means before long.

Wane — To grow smaller or fade away. The moon wanes after it is full — it gets smaller each night.

Don — To put on a piece of clothing. Don your school uniform means put on your uniform.

Scimitar — A curved sword used by Eastern warriors and kings. Curved like a crescent moon — elegant and powerful.

Glade — An open space in a forest. Picture a clearing in the middle of dark trees.

Thicket — A dense growth of bushes and small trees. So thick you can barely push through.

Citron — A type of citrus fruit, similar to a large lemon. Citrus, citron — both start the same way.

Vale — A valley. Short for valley — used in poetry for its musical sound.

Foamless — Without foam or waves — completely still. A foamless sea is perfectly calm, like glass.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Imagination is a gift — This poem celebrates the power of the human mind to create entire worlds. Walter de la Mare shows us that imagination costs nothing and gives everything. A child with a vivid imagination is already the lord of their own Tartary.

Appreciation for beauty — The poet does not just imagine power — he imagines beauty. Silver rivers, scented breezes, glowing lamps, musical evenings. This teaches us to notice and appreciate the beautiful things around us in real life, not just in dreams.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. If I Were Lord of Tartary is a poem by Walter de la Mare about the poet's fantasy of being the all-powerful ruler of a magical, exotic kingdom.

2. Tartary was a mysterious, faraway land in old European stories — the perfect setting for a fantasy.

3. The poem has four stanzas, each adding a new layer: grand furnishings, musical evenings, royal clothing, and the natural beauty of the land.

4. Key poetic devices: simile (yellow as honey, red as wine), personification (peacocks flaunt), and vivid imagery throughout.

5. The values in this poem are the celebration of imagination and appreciation for beauty in the world around us.`,
    },
  ],
}

// ─── CHAPTER 3 ────────────────────────────────────────────────────────────────

const chapter3: Chapter = {
  id: 3,
  title: 'The Fun They Had',
  type: 'Short story',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Imagine it is the year 2157. There are no schools as we know them. No classrooms, no friends sitting next to you, no human teachers. Instead, every child has a mechanical teacher — a robot — right in their bedroom. Lessons happen on a screen. You never go anywhere. You never meet your classmates.

Now imagine finding an old, worn paper book that describes schools from hundreds of years ago — schools exactly like yours. How would you feel?

This is the story of The Fun They Had by Isaac Asimov. It is a science fiction story that makes us think deeply about something we often take for granted — our schools, our teachers, and our friends.`,
    },
    {
      id: 2,
      title: 'About the author',
      content: `Isaac Asimov (January 2, 1920 — April 6, 1992) was one of the greatest science fiction writers who ever lived. He was also a biochemist with a PhD from Columbia University — meaning he was both a brilliant scientist and a gifted storyteller.

He wrote hundreds of books and is best known for his science fiction stories that imagined the future of technology, robots, and artificial intelligence. What makes Asimov special is that many of his imagined futures have actually come true.

The Fun They Had was written in 1951 — over 70 years ago. At that time, computers barely existed. Yet Asimov imagined a world where children learned from machines on screens. Does that sound familiar? It should — because in many ways, that world is already here.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the genre of science fiction and what makes a story science fiction
• Explain the plot of The Fun They Had in your own words
• Compare the old school system (as Margie imagines it) with the mechanical school system of 2157
• Understand new vocabulary from the story
• Reflect on the value of human connection in education`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `SCENE A — The discovery of a real book

The story begins with Margie writing in her diary on 17 May 2157. She writes: "Today Tommy found a real book!"

Think about that — a real book is so unusual in 2157 that it is worth writing about in a diary. Tommy found it in the attic of his house. It was very old, with yellow, crinkly pages.

Both children found it strange to read. The words on the pages stood still — they did not move the way words on a screen do. And when you turned back to a previous page, the same words were still there. Tommy thought this was wasteful — "When you're through with the book, you just throw it away. Our television screen must have had a million books on it."

Margie, however, said she would not throw it away.

The book was about school. And Margie, who hated school, was scornful at first: "School? What's there to write about school? I hate school."

─────

SCENE B — Margie's mechanical teacher

We learn why Margie hates school. Her mechanical teacher — a large, black machine with a big screen — had been giving her test after test in geography and she kept doing worse and worse.

Her mother called the County Inspector, a round little man who came with a box of tools. He took the mechanical teacher apart, adjusted some settings, and announced that the geography sector had been "geared a little too quick" — meaning the machine was teaching too fast for Margie's level. He slowed it down.

Margie had hoped the Inspector would take the teacher away completely, like he had once removed Tommy's teacher for a whole month when its history sector broke down. But no — her teacher was fixed and back in place.

The part Margie hated most was the slot where she had to insert her homework and test papers written in punch code. The machine calculated her marks instantly. There was no hiding, no excuses. The machine was always waiting.

─────

SCENE C — The old kind of school

Tommy told Margie the book was about the old kind of school — hundreds and hundreds of years ago.

Margie was fascinated but confused. She learned that in the old days, children went to a special building — a school — where a human teacher taught them. All the children of the same age learned the same things together.

"A man? How could a man be a teacher?" Margie asked.

"Sure he is. My father knows as much as my teacher," said Tommy.

"He knows almost as much, I bet," said Margie, unconvinced.

She could not imagine a human being smart enough to teach. All she had ever known was her mechanical teacher, which knew everything and never made mistakes — at least in theory.

Then Margie asked something that hit right at the heart of the story: "And all the kids learned the same thing?"

"Sure, if they were the same age."

"But my mother says a teacher has to be adjusted to fit the mind of each boy and girl it teaches," said Margie.

This single exchange captures the whole debate of the story — is it better to have a perfect machine adjusted to each child, or a human teacher who teaches everyone together and connects with them as people?

─────

SCENE D — School time

Before they could finish reading, Margie's mother called: "Margie! School!"

Margie went into the schoolroom — right next to her bedroom. The mechanical teacher was on and waiting. The screen lit up: "Today's arithmetic lesson is on the addition of proper fractions. Please insert yesterday's homework in the proper slot."

Margie did so with a sigh.

She was thinking about the old schools. All the kids from the whole neighbourhood coming together, laughing and shouting in the schoolyard. Sitting together in a classroom. Going home together at the end of the day. Learning the same things, so they could help each other with homework and talk about it.

And the teachers were people.

The mechanical teacher was still flashing on the screen.

And Margie was thinking about the fun they had.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Crinkly — Wrinkled and slightly crushed. Crinkle cut chips have wavy edges — crinkly paper has similar wrinkles.

Scornful — Feeling that something is worthless or beneath you. When you say "that's a silly idea" with a look of disgust — that is scornful.

Slot — A narrow opening for inserting something. Like the slot in a piggy bank where you insert coins.

Geared — Set or adjusted to a particular level or speed. A bicycle gear changes how fast the wheels move — geared too quick means set too fast.

Loftily — In a proud, superior way, as if looking down on others. Tommy spoke loftily when he corrected Margie — he felt he knew more.

Nonchalantly — In a casual, unconcerned way, as if nothing matters. Tommy walked away nonchalantly — relaxed and unbothered.

Dispute — To argue against or challenge. Margie was not prepared to dispute what Tommy said — she could not argue back.

Blanked out — Stopped working completely. Like a TV screen that suddenly goes black.

Sector — A section or part of something. The geography sector of the mechanical teacher is the part that teaches geography.

Punch code — A system of holes punched in paper to store information. An early form of computer input — students had to write in this code.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Human connection in learning — The story shows us that school is not just about information. It is about growing up together — laughing in the yard, helping each other with homework, sharing the experience of learning. A machine can teach facts. But a human teacher, and human classmates, give you something a machine never can.

Respect for school — Margie hated school — until she read about the old kind of school and realised what she was missing. This story gently asks us: do we appreciate what we have? Our schools, our teachers, our friends? The fun they had — in real classrooms, with real people — is something worth treasuring.

Technology is a tool, not a replacement — Asimov was not saying technology is bad. He was asking us to think carefully about what we use it for. A mechanical teacher that never connects with a child emotionally is efficient — but is it enough?`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. The Fun They Had is set in 2157, where children learn from mechanical teachers on screens in their homes — there are no traditional schools or classrooms.

2. Tommy finds an old paper book about schools from hundreds of years ago, which fascinates both children.

3. Margie hates her mechanical teacher which gives her test after test in geography — but she cannot escape it as it is always there, waiting.

4. The children learn that in the old days, children went to a shared building, had a human teacher, and learned together — Margie finds this idea both strange and deeply appealing.

5. The story ends with Margie sitting at her mechanical teacher and thinking about the fun those old school children must have had — it is a quiet, powerful ending that makes us appreciate real schools.`,
    },
  ],
}

// ─── CHAPTER 4 ────────────────────────────────────────────────────────────────

const chapter4: Chapter = {
  id: 4,
  title: 'In Morning Dew',
  type: 'Poetry',
  estimatedReadMins: 11,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Have you ever watched a scarecrow standing alone in a field and wondered — what does it think about all day? What does it see? What questions does it have?

This poem by Keki N Daruwalla does exactly that. It gives a voice to a scarecrow — a figure made of straw and old clothes, standing in a field from morning to evening. Through the scarecrow's eyes, the poet observes the natural world and asks some beautiful, unanswerable questions about the seasons and the passage of time.

The poem is full of wit and gentle humour. It is playful but also thoughtful — and by the end, you will see the world a little differently.`,
    },
    {
      id: 2,
      title: 'About the poet',
      content: `Keki N Daruwalla is a contemporary Indian English writer and poet — one of India's most respected voices in English poetry. He writes about the natural world, human experiences, and the complexities of life with honesty and humour.

This poem looks at the world through the eyes of a scarecrow — an ordinary object that we usually walk past without a second thought. Daruwalla uses this unusual perspective to observe nature, the seasons, and the small mysteries of life that we never stop to question.

He is known for poems that feel grounded in real Indian landscapes — fields, birds, animals, seasons — which makes his work feel familiar and relatable even when he is exploring deep ideas.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read and understand a poem from the perspective of an unusual narrator — a scarecrow
• Identify the theme of the poem — observation, curiosity, and the mysteries of nature
• Understand how a poet uses humour to explore serious ideas
• Identify poetic devices including personification, imagery, and simile
• Appreciate the value of being observant and curious about the world`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 420,
      content: `STANZA 1

In morning dew the scarecrow combs his hair.
In morning light the scarecrow looks so spry,
You know he's had a good night's sleep
He's now in a fitter state to spy
On shouting monkeys and the porcupine.
He gets to see everything all the time,
Except his shadow which lazes about
Till the evening snuffs the fellow out.

What does this mean?
The poem opens with a wonderfully playful image — the scarecrow combing his hair in the morning dew, looking fresh and lively (spry) in the morning light. He has had a good night's sleep and is now ready to spy — to watch and observe everything in the field around him.

He can see the shouting monkeys and the porcupine. He sees everything, all the time. Except one thing — his own shadow, which lags lazily behind him until the evening comes and snuffs him out (puts him out like a candle).

Mood: Playful, fresh, and humorous.

Poetic devices: "Combs his hair in morning dew" — personification, giving the scarecrow human qualities. "Snuffs the fellow out" — a clever metaphor comparing evening to a finger snuffing out a candle.

─────

STANZA 2

Whether he sees the seasons come and go
Is a thing you and I may never know.
But busy as he is, he keeps an eye
On all the bird traffic passing by.
Some questions always bother him:
How seasons come and go.

What does this mean?
Now the poet introduces a touch of mystery. Does the scarecrow actually understand what he sees? We cannot know. But he is busy watching the bird traffic — a funny, modern phrase for the constant movement of birds through the sky, like traffic on a road.

Something bothers the scarecrow — the question of seasons. How do they come? How do they go? He sees them change but cannot understand the logic behind them.

Mood: Curious and gently philosophical. The tone has shifted from playful to thoughtful.

Poetic device: "Bird traffic" — an unexpected metaphor comparing birds flying overhead to cars on a busy road.

─────

STANZA 3

The way the seasons to and fro
He doesn't know who's getting in —
Summer, autumn or the snow?
Something he should surely know!
He knows he shivers in the cold
And in the summer he will fry.
Do seasons come up from the ground
Or do they drop down from the sky —
Are questions that have bothered him.

What does this mean?
The scarecrow experiences the seasons physically — he shivers in winter and fries in summer — but he cannot understand where seasons come from. Do they rise up from the ground? Or do they fall down from the sky? These are his great unanswerable questions.

There is a beautiful humour here — the scarecrow experiences everything directly but understands nothing about why it happens. It reminds us of how we too experience things without always understanding the deeper reasons behind them.

Mood: Gently comic but also surprisingly deep.

─────

STANZA 4

Answers do not dribble in.
To keep questions out and answers in
He bolts his upper storey's door.
Then he wonders why on Earth
His head goes round in circles for
While seasons circle round and round
Like oxen on a threshing floor.

What does this mean?
Answers do not dribble in — they do not come easily or at all. The scarecrow, frustrated, decides to bolt his upper storey's door — a wonderfully funny way of saying he closes his mind. His upper storey is his head — and he locks it shut to stop the confusing questions from getting in.

But then he wonders why his head goes round in circles — like the oxen that walk in circles on a threshing floor (a flat surface where farmers separate grain from stalks, with oxen walking round and round). His mind keeps going in circles just like the seasons — round and round, never settling on an answer.

Mood: Comic and absurd, but with a clever final image.

Poetic devices: "Upper storey" — a metaphor for the head or mind. "Like oxen on a threshing floor" — a simile comparing the scarecrow's confused mind to oxen grinding grain. A beautifully Indian image.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Dew — Tiny drops of water that form on surfaces overnight. Morning dew — the wetness you see on grass early in the morning.

Spry — Lively, energetic, and active. A spry old man moves quickly despite his age — full of energy.

Snuffs out — To put out a flame or end something suddenly. Like pinching a candle flame with your fingers to put it out.

To and fro — Moving backwards and forwards. A swing goes to and fro — back and forth.

Dribble — To flow in a slow, thin stream. Water dribbles from a leaky tap — barely coming out.

Upper storey — The top floor of a building; used here as a metaphor for the head or mind. Your brain is in your upper storey — the top of your body.

Bolts — To lock firmly with a bolt. Bolting a door means sliding a metal bar to lock it shut.

Threshing floor — A flat area where farmers separate grain from stalks. Oxen walk in circles on it — ancient farming technology still used in villages today.

Porcupine — A spiky animal with sharp quills on its back. Think of a hedgehog — but larger and with much longer, sharper quills.

Lazes — To relax and do nothing. The cat lazes in the sun — lying around without a care.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Being observant — The scarecrow watches everything around him — monkeys, porcupines, bird traffic, seasons changing. He is the most observant character in the field. This poem reminds us to slow down and observe the world around us. How much do we miss because we are not paying attention?

Asking questions to learn — The scarecrow is bothered by questions he cannot answer — about seasons, about why things happen the way they do. Rather than being embarrassed by not knowing, he keeps wondering. Curiosity and the courage to ask questions are how we grow.

Importance of being alert — The scarecrow stands in the field all day and night, always present and watchful. His alertness is what makes him valuable. In our own lives, being alert and present — truly paying attention to what is happening around us — is a skill worth developing.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. In Morning Dew is a poem by Keki N Daruwalla written from the perspective of a scarecrow standing in a field.

2. The scarecrow is personified — given human qualities like combing hair, sleeping, feeling cold, and wondering about things.

3. The scarecrow observes everything around him — birds, monkeys, porcupines, and the changing seasons — but cannot understand the deeper reasons behind what he sees.

4. His biggest question is about seasons: do they come from the ground or fall from the sky? His confused mind going in circles is compared to oxen walking in circles on a threshing floor.

5. The values of this poem are observation, curiosity, and the importance of asking questions even when answers are hard to find.`,
    },
  ],
}

// ─── CHAPTER 5 ────────────────────────────────────────────────────────────────

const chapter5: Chapter = {
  id: 5,
  title: 'The Boy Who Outran the Wind — Milkha Singh',
  type: 'Biographical narrative',
  estimatedReadMins: 18,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Have you ever felt like giving up when things got really hard? This chapter is the story of a real boy — Milkha Singh — who lost everything he loved, yet went on to become one of the greatest athletes India has ever seen. It is not just a sports story. It is a story about what happens when you refuse to stop, no matter how difficult life gets.`,
    },
    {
      id: 2,
      title: 'About the author',
      content: `This chapter is a biographical narrative. That means it is a story based on the real life of a real person — Milkha Singh. Unlike a fiction story that someone imagines, a biographical narrative tells us true events from someone's life.

Milkha Singh (1929–2021) was an Indian athlete who specialised in sprinting. He is one of the most celebrated sportspersons in Indian history. He earned the nickname "The Flying Sikh" — and by the time you finish this chapter, you will understand exactly why.

The story in your textbook is written in a simple, narrative style so that you can connect with Milkha's journey as if you were right there with him.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand what a biographical narrative is and how it is different from a fiction story
• Explain the key events in Milkha Singh's life in your own words
• Use new vocabulary related to sports, struggle, and emotions — words like chaos, refugee, collapse, determination, resilience
• Appreciate why hard work, discipline, and courage matter — not just in sports, but in life`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 720,
      content: `Let us walk through the story together, just like your teacher would explain it in class.

─────

PART A — A happy life, then tragedy

The story begins in a small village where a young boy named Milkha lived a simple, happy life with his family. Imagine a peaceful village — fields, family, laughter. That was Milkha's world.

Then, war broke out. This was the time of the Partition of India in 1947 — one of the most painful events in our country's history. Families were torn apart. Villages were destroyed. Milkha lost his home and, most heartbreakingly, his family.

His father's last words to him were: "Bhaag Milkha Bhaag!" — which means Run, Milkha, Run!

Think about that for a moment. His father did not say "be safe" or "be strong." He said run. And Milkha did. He ran — not towards victory at that point, but simply to survive.

─────

PART B — A new city, a hard life

Milkha ran until he reached Delhi. He was alone, hungry, and had no money. He lived in refugee camps — temporary shelters set up for people who had lost their homes due to the war.

Life in the refugee camps was tough. There was barely enough food. But even in his darkest days, Milkha never stopped moving forward. That inner strength — the ability to keep going when everything around you has fallen apart — is called resilience. Remember that word. It is one of the most important words in this chapter.

─────

PART C — The glass of milk that changed everything

When Milkha grew older, he joined the Indian Army. The army gave him structure, discipline, and a sense of purpose.

One day, a coach announced a cross-country race. The prize? Just a glass of milk. Now, you might think — a glass of milk? That's all? But remember, Milkha had been hungry for a very long time. That glass of milk meant everything.

He ran with all his might. He finished in the top ten.

That was the beginning.

That one race — run for a simple glass of milk — was the first step on a journey that would take Milkha Singh to the world stage.

─────

PART D — Training like no one else

What happened next is what separates great people from the rest.

Milkha did not just practise — he trained like no one else. While others slept, he ran on the hills in the dark. He ran against speeding trains to increase his pace. Sometimes he trained so hard that he would collapse on the ground from exhaustion. But he always got back up.

Think about that image — a young man falling down from tiredness, then standing up and running again. That is what determination looks like. It is not about never falling. It is about always getting up.

Soon, Milkha was winning gold medals at the Asian Games and the Commonwealth Games. The boy who had nothing was now representing his country on the world stage.

─────

PART E — The race in Pakistan and a title forever

In 1960, Milkha was invited to race in Pakistan — the very country where he had lost his family during Partition. At first, he was deeply sad. Those were painful memories.

But he made a decision: he would be brave.

He ran so fast in that race that he broke the world record. The leader of Pakistan was stunned. He said to Milkha: "Milkha, you didn't run today — you flew!"

And from that day forward, the whole world called him The Flying Sikh.

Milkha Singh went on to participate in the Olympics and became a hero to millions. He proved something very important: it does not matter where you start or what hardships you face. Even an orphan with no shoes can become a world champion — if they have the will to work hard.

─────

The moral of the story

Hard work and determination can turn a life of tragedy into a life of triumph.

Milkha Singh's life teaches us that the greatest race is not against others. It is against our own fears, our own doubts, and our own desire to stop. When life tells you to stop — listen to the voice inside that says: Run. Keep going. Never give up.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Chaos — Complete confusion and disorder. Think of a classroom where everyone is shouting at once — that is chaos.

Refugee — A person who has been forced to leave their home, usually because of war. A huge problem forces someone to leave home — that person becomes a refugee.

Resilience — The ability to recover quickly from difficulties. Like a rubber ball — no matter how hard you throw it down, it bounces back. Milkha showed resilience every time he got back up.

Collapse — To fall down suddenly due to exhaustion or weakness. When your legs give way after running your fastest in PE class — that is what it feels like to collapse.

Determination — Firmness of purpose; not giving up. The feeling that pushes you to finish your homework even when you are tired.

Cross-country race — A long-distance running race held over open or rough land, not on a track. Running through fields and hills, not on a flat ground.

Commonwealth Games — A major sports competition held every four years between countries that were once part of the British Empire — India participates. Like the Olympics, but for a specific group of countries.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Hard work and discipline lead to success — Milkha did not become great because he was born special. He became great because he worked harder than everyone else, every single day.

Hope, even in the darkest time — When Milkha lost his family and had nothing, he could have given up. But he kept hoping for a better tomorrow. That hope is what kept him running.

Courage is doing something even when it scares you — Going to Pakistan — the place of his worst memories — and racing there anyway, that was courage. True courage is not the absence of fear. It is choosing to act despite the fear.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. Milkha Singh lost his family and home during the Partition of India, but refused to give up.

2. His father's last words — "Bhaag Milkha Bhaag!" — became the driving force of his life.

3. A cross-country race in the army, run for a glass of milk, was the start of his athletic journey.

4. He trained with extreme dedication — running on hills and against trains — to become a world-class athlete.

5. His bravery in racing in Pakistan earned him the title "The Flying Sikh", a name the whole world remembers.`,
    },
  ],
}

// ─── CHAPTER 6 ────────────────────────────────────────────────────────────────

const chapter6: Chapter = {
  id: 6,
  title: 'The Blind Boy',
  type: 'Poetry',
  estimatedReadMins: 12,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `What if you had never seen sunlight, or colours, or the faces of people you love? Would you be sad all the time? Would you feel like life was unfair?

This poem The Blind Boy by Colley Cibber is written from the point of view of a boy who has been blind since birth. He has never seen light. Yet — and this is the most extraordinary thing — he is not bitter. He is not angry. He is at peace.

This poem teaches us one of the most powerful lessons in all of literature: happiness does not come from what you have. It comes from how you choose to feel about what you have.`,
    },
    {
      id: 2,
      title: 'About the poet',
      content: `Colley Cibber (1671–1757) was an English poet, playwright, and actor. He served as the Poet Laureate of England — one of the highest honours a poet in England can receive. His writings focused on human emotions, moral values, and social issues.

In The Blind Boy, Cibber presents a deeply sensitive and thoughtful portrait of a child who accepts his disability not with sadness but with patience and inner strength. This poem was written centuries ago, yet its message feels as powerful and relevant today as it did then.

It is a poem that makes you think: if this boy, who has never seen the beauty of the world, can find peace and joy in life — what excuse do the rest of us have to be unhappy?`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read and understand a poem written from the first person perspective of a child with a disability
• Identify the central theme of contentment, acceptance, and inner happiness
• Understand how the poet uses contrast to show the difference between physical blindness and inner vision
• Identify poetic devices including rhetorical questions, imagery, and metaphor
• Develop empathy for people with disabilities and reflect on the meaning of true happiness`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 480,
      content: `STANZA 1

O SAY what is that thing call'd Light,
Which I must ne'er enjoy;
What are the blessings of the sight,
O tell your poor blind boy!

What does this mean?
The poem opens with the blind boy asking a question — what is light? He has never experienced it and never will (ne'er is an old word for never). He asks what it means to see — what are the blessings of having sight? He calls himself a "poor blind boy" — not out of self-pity, but simply stating a fact.

Mood: Gentle and curious, with a touch of sadness. This opening pulls us in because the question is so simple yet so profound.

Poetic device: "O SAY" — the poem opens with a direct appeal to the reader. The question asked for effect — not necessarily expecting an answer — is called a rhetorical question.

─────

STANZA 2

You talk of wondrous things you see,
You say the sun shines bright;
I feel him warm, but how can he
Or make it day or night?

What does this mean?
The blind boy tells us that people around him talk about wonderful things they see. They tell him the sun shines bright. And he can feel the sun — its warmth on his skin. But he cannot understand how the same sun can make it day or night. For him, there is no difference between day and night — both are darkness.

Mood: Thoughtful and slightly puzzled.

Poetic device: "He" — the boy refers to the sun as "he" — this is personification, giving the sun a human gender.

─────

STANZA 3

My day or night myself I make
Whene'er I sleep or play;
And could I ever keep awake
With me 'twere always day.

What does this mean?
This is where the poem takes a beautiful turn. The blind boy says: I make my own day and night. When he sleeps, it is night. When he is awake and playing, it is day. If he could stay awake forever, it would always be day for him. His day is not defined by the sun — it is defined by his own consciousness and activity.

Mood: Suddenly bright and even cheerful. The boy has found his own way of understanding the world.

Poetic device: "My day or night myself I make" — this line shows the boy's sense of control over his own experience. He is not helpless. He creates his own reality.

─────

STANZA 4

With heavy sighs I often hear
You mourn my hapless woe;
But sure with patience I can bear
A loss I ne'er can know.

What does this mean?
The boy notices that people around him often sigh deeply and feel sad for him. But the boy gently pushes back. He says: with patience, I can bear a loss I never knew.

Think about this carefully. He has never known sight. So is he truly losing something? You cannot miss something you have never had. The people around him are sadder about his blindness than he is.

Mood: Calm, patient, and quietly profound. This is the philosophical heart of the poem.

─────

STANZA 5

Then let not what I cannot have
My cheer of mind destroy:
Whilst thus I sing, I am a king,
Although a poor blind boy.

What does this mean?
The boy says: do not let the fact that I cannot have something destroy my cheer of mind — my happiness, my peace of mind.

And then comes the most extraordinary line of the poem: Whilst thus I sing, I am a king.

While he sings — while he is happy, active, and engaged with life — he feels like a king. Not despite being blind. Not because he has everything. Simply because he has chosen cheerfulness over bitterness. He is "a poor blind boy" — and yet he is a king. In his mind, in his spirit, he is complete.

Mood: Triumphant and deeply moving. This ending does not feel sad. It feels like a victory.

Poetic devices: "Cheer of mind" — a beautiful phrase for inner happiness. "I am a king" — a metaphor for feeling complete and at peace. Singing is used here as a symbol of joy and aliveness.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Wondrous — Wonderful, marvellous, inspiring wonder. Wonder + ous. Full of wonder.

Ne'er — Never (poetic contraction). N + ever, shortened for poetry.

Hapless — Unfortunate, unlucky. Hap means luck in old English. Hapless = without luck.

Woe — Great sorrow or distress. "Woe is me!" — an old expression of deep sadness.

Mourn — To feel or express great sadness, especially for a loss. People mourn at funerals — they grieve deeply.

Cheer of mind — Inner happiness and cheerfulness. The happiness that lives inside you, not dependent on outside things.

Whilst — While (old English word). Whilst I read means while I read.

'Twere — It were / it would be (old poetic contraction). Used in old poetry for rhythm.

Whene'er — Whenever (poetic contraction). Shortened form used in poetry.

Blessings of sight — The gifts and advantages that come from being able to see. All the beautiful things you can experience because you have eyes.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Contentment — being happy with what you have — The blind boy has never seen the world. Yet he is at peace. He does not rage against his situation. He finds his own way of understanding day and night. He creates his own joy. This is contentment — and it is one of the rarest and most precious qualities a person can have.

Inner strength — happiness comes from the mind, not from things — The people around the boy pity him. They sigh heavily. They think he is missing out. But the boy himself is not unhappy. Because real happiness does not come from what you can see, touch, or own. It comes from your cheer of mind — the peace and joy you carry inside you.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. The Blind Boy is a poem by Colley Cibber written from the perspective of a boy who has been blind since birth — he has never seen light, colour, or the world around him.

2. Despite his blindness, the boy is not bitter or sad — he has found his own way of understanding day and night (when he sleeps it is night, when he is awake it is day).

3. He observes that people around him feel sadder about his blindness than he does — because he has never known sight, he does not grieve its loss.

4. The final stanza is the most powerful: "Whilst thus I sing, I am a king" — as long as he can find joy, he feels complete and powerful despite everything.

5. The two values in this poem are contentment (being happy with what you have) and inner strength (happiness comes from the mind, not from things).`,
    },
  ],
}

// ─── CHAPTER 7 ────────────────────────────────────────────────────────────────

const chapter7: Chapter = {
  id: 7,
  title: 'Three Questions',
  type: 'Short story',
  estimatedReadMins: 20,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `If you could know the answers to just three questions — questions that would help you never make a mistake — what would those questions be?

A king in this story by Leo Tolstoy asks exactly that. He wants to know: What is the right time to act? Who are the most important people to listen to? What is the most important thing to do? He believes that if he knows these three answers, he will never fail.

But the answers he finds are not what he expected. And they come not from scholars or wise men — but from a moment of pure human kindness.

This is one of the most beautiful and thought-provoking stories ever written.`,
    },
    {
      id: 2,
      title: 'About the author',
      content: `Leo Tolstoy (1828–1910) was a Russian writer considered one of the greatest novelists in human history. His most famous works are War and Peace and Anna Karenina — two of the greatest novels ever written. He explored big ideas like history, morality, love, and the meaning of life through deeply realistic characters.

Later in life, Tolstoy became a moral thinker who questioned wealth, violence, and organized religion, influencing figures like Mahatma Gandhi. Three Questions is a short story — a fable really — that captures the essence of his philosophy in just a few pages: what truly matters in life is the present moment and the person right in front of you.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the plot of Three Questions and explain it in your own words
• Identify the three questions and the answers the Hermit gives
• Explain the moral of the story and connect it to real life
• Understand new vocabulary from the story
• Reflect on the values of wisdom, empathy, and living in the present moment`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 780,
      content: `PART A — The king and his three questions

Once, in a kingdom far away, there lived a King who was ambitious and fearful at the same time. He wanted to be a great ruler — but he was constantly afraid of making mistakes. He believed that if only he could know three things, he would never fail:

• The right time to begin every task
• The right people to listen to and trust
• The most important thing to do at any moment

He sent messengers throughout his land promising a vast sum of gold to anyone who could answer these three questions.

Scholars and doctors and wise men came from across the kingdom. But their answers only confused the King more.

For the first question (right time), some said he needed a strict calendar. Others said he needed to wait for signs from the stars.

For the second question (right people), some voted for priests, others for doctors, others for warriors.

For the third question (most important task), some said science, others said religious worship.

None of these answers satisfied the King.

─────

PART B — The journey to the Hermit

The King decided to seek out a wise Hermit who lived high in the mountains. This Hermit was known to speak only to common people — never to kings or nobles.

So the King dressed in plain, dusty clothes, left his knights behind, and went alone to find the Hermit.

He found the old man digging in his garden. The Hermit was frail and thin. Each time he plunged his spade into the earth, he panted with exhaustion. Yet he kept digging.

The King approached and asked his three questions. The Hermit listened — then spat on his hands and went back to digging.

The King waited. Then offered: "You are tired. Let me take the spade and work for you."

The Hermit handed over the spade and sat down to rest.

The King dug two large beds of earth. He asked his questions again. The Hermit still gave no answer and reached for the spade.

The King continued digging. The sun began to sink. He was about to give up — when suddenly a man came running out of the woods.

─────

PART C — The wounded man

The man clutched his stomach and fell to the ground, moaning. He had a deep, bloody wound in his stomach.

The King immediately forgot his questions. He washed the wound and bandaged it with his handkerchief. When the blood soaked through, he washed and bandaged it again and again until the bleeding finally stopped.

The King and the Hermit carried the man into the hut. The King was so exhausted from digging that he curled up on the floor and fell into a deep sleep.

─────

PART D — The enemy revealed

The next morning, the wounded man was staring at the King with bright, tired eyes.

"Forgive me," he whispered.

"I do not know you," said the King. "What is there to forgive?"

The man replied: "You do not know me, but I know you. You executed my brother and seized my property. I came here to kill you. But your bodyguards wounded me instead. I would have died if you had not dressed my wounds. I intended to take your life — and instead, you saved mine. If I live, I will serve you as your most faithful servant."

The King was deeply moved. He not only forgave the man but promised to return all his property. And in doing so, he made a faithful friend out of what had been his most dangerous enemy.

─────

PART E — The Hermit's answers

Before leaving, the King knelt before the Hermit one last time and asked: "I pray you, wise man, answer my questions."

The Hermit looked up and said: "But you have already been answered!"

"How?" asked the King, bewildered.

The Hermit explained:

"If you had not pitied my weakness yesterday and stayed to dig these beds for me, that man would have attacked you on your way home. The most important time was when you were digging the beds. I was the most important person. And doing me good was your most important task."

"Later, when the man ran to us, the most important time was when you were attending to him — for if you hadn't, he would have died without making peace with you. He was the most important person. And saving him was your most important task."

Then the Hermit gave the King the final answer — the one that contains everything:

"Remember that there is only one time that is important — Now. It is the only time when we have any power. The most necessary person is the one with whom you are, for no man knows whether he will ever have dealings with anyone else. And the most important thing is to do that person good, because for that purpose alone was man sent into this life."`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Ambitious — Having a strong desire to succeed or achieve something. Ambition drives people to work hard for big goals.

Hermit — A person who lives alone, away from society. Hermits live in remote places — forests, mountains — far from people.

Frail — Weak and delicate. A frail old person needs gentle care — they are not strong.

Spade — A tool for digging, like a shovel. Spades are used in gardens to dig soil.

Panted — Breathed quickly and heavily from exertion. After running a race, you pant — breath comes fast and shallow.

Clutching — Holding something tightly. He clutched his bag tightly so no one could snatch it.

Moaning — Making a low sound of pain or suffering. When you hurt yourself and say "ohhh" — that is moaning.

Executed — Put to death as a punishment. In old kingdoms, criminals were sometimes executed by the king.

Seized — Taken by force. The enemy seized the fort — they took it by force.

Bewildered — Completely confused and puzzled. The bewildered student stared at the question he could not understand.

Pitied — Felt sympathy and sorrow for someone. She pitied the stray dog in the rain and took it inside.

Intended — Planned or meant to do something. He intended to study but fell asleep instead.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Wisdom — The Hermit's answers show us what true wisdom looks like. It is not found in calendars, stars, or scholars. It is found in paying attention to the present moment and the person right in front of you. True wisdom is simple — but not easy.

Empathetic attitude — The King could have walked away from the wounded man. He did not know him. He had no obligation. But he stopped, helped, and saved a life. That act of empathy — feeling for someone and acting on that feeling — turned an enemy into a friend.

Live in the present — The most important lesson: Now is the only time that matters. Not yesterday, not tomorrow. The person you are with right now is the most important person. What you can do for them right now is the most important thing. This is a lesson that sounds simple but changes everything when you truly understand it.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. A King wants to know the three most important things: the right time to act, the right people to listen to, and the most important thing to do — believing these answers will make him a perfect ruler.

2. He disguises himself and visits a Hermit, who instead of answering his questions, hands him a spade to dig. While digging, a wounded man arrives and the King saves his life.

3. The wounded man reveals he was the King's enemy who had come to kill him — but now, having been saved, pledges his loyal service. The King forgives him and returns his property.

4. The Hermit reveals that the King has already found his answers: the most important time is NOW, the most important person is whoever you are with, and the most important thing is to do that person good.

5. The values of this story are wisdom, empathy, and living fully in the present moment.`,
    },
  ],
}

// ─── CHAPTER 8 ────────────────────────────────────────────────────────────────

const chapter8: Chapter = {
  id: 8,
  title: 'From a Railway Carriage',
  type: 'Poetry',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Have you ever looked out of a train window while the train is moving fast? The world rushes past you — trees, houses, fields, people — each one there for just a second before it is gone. Before you can really look at anything properly, it has already disappeared.

This poem by Robert Louis Stevenson captures exactly that feeling. It is written as if you are sitting inside a moving train, watching the world flash by outside your window. The poem itself moves at the speed of a train — fast, breathless, and full of images that appear and vanish.

By the end of this poem, you will feel like you have taken a train journey.`,
    },
    {
      id: 2,
      title: 'About the poet',
      content: `Robert Louis Stevenson (13 November 1850 — 3 December 1894) was a Scottish novelist, essayist, poet, and travel writer. He is best known for his novels Treasure Island (1883), Strange Case of Dr Jekyll and Mr Hyde (1886), and Kidnapped (1893), and the poetry collection A Child's Garden of Verses (1885).

Stevenson loved travel and adventure. He was often ill as a child and spent long periods resting — but his imagination was always racing. This poem comes from A Child's Garden of Verses and is one of his most beloved poems. It captures the pure joy of movement and the beauty of the ordinary world seen from a moving train.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read and appreciate a poem that uses speed and rhythm to create an effect
• Identify how the poet uses rhyme, repetition, and fast-moving imagery to make the poem feel like a train journey
• Understand new vocabulary from the poem
• Identify poetic devices including simile, imagery, and onomatopoeia
• Appreciate the theme of the joy of travel and the beauty of fleeting moments`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `STANZA 1

Faster than fairies, faster than witches,
Bridges and houses, hedges and ditches;
And charging along like troops in a battle,
All through the meadows the horses and cattle:
All of the sights of the hill and the plain
Fly as thick as driving rain;
And ever again, in the wink of an eye,
Painted stations whistle by.

What does this mean?
The poem opens with an explosion of speed. The train moves faster than fairies and faster than witches — both magical, fast-moving creatures. This immediately tells us the train is moving incredibly fast.

As the train rushes forward, images flash past: bridges, houses, hedges, ditches. Horses and cattle in meadows appear as if charging like soldiers in a battle. All the sights of hills and flat plains fly past as thick as driving rain — so fast and so many that they are like raindrops in a heavy downpour.

And stations? They appear and vanish in the wink of an eye — painted and colourful, there one moment and gone the next.

Mood: Exhilarating and breathless. The poem itself moves fast — short, punchy phrases that rush past just like the scenery.

Poetic devices:
• "Faster than fairies, faster than witches" — simile. Comparing the train's speed to magical creatures.
• "Charging along like troops in a battle" — simile. The cattle appear to charge like soldiers because the train is moving so fast.
• "Fly as thick as driving rain" — simile. The sights are so numerous and fast they are like heavy rain.
• "In the wink of an eye" — an idiom meaning in a very short time.
• "Painted stations whistle by" — personification. The stations whistle as the train passes.

─────

STANZA 2

Here is a child who clambers and scrambles,
All by himself and gathering brambles;
Here is a tramp who stands and gazes;
And there is the green for stringing the daisies!
Here is a cart run away in the road
Lumping along with man and load;
And here is a mill, and there is a river:
Each a glimpse and gone forever!

What does this mean?
Now the poet slows down slightly — not the train, but our attention. Instead of rushing scenery, he picks out specific people and things from the landscape and describes them individually.

A child climbing and scrambling through bushes gathering brambles (wild berries with thorns). A tramp — a homeless wanderer — standing by the roadside, gazing at the passing train. A patch of green grass perfect for picking daisies. A cart on the road, bumping along heavily with a man and his load. A mill. A river.

Each of these images appears for just a moment — and then it is gone. Each a glimpse and gone forever. The final line is the heart of the poem.

Mood: Nostalgic and bittersweet. The first stanza was pure excitement. The second stanza is more reflective — we notice individual people and places, and then feel the sadness of them vanishing.

Poetic devices:
• "Clambers and scrambles" — onomatopoeia. Words that sound like the actions they describe.
• "Here is... Here is... And there is" — repetition. Each time we spot something new, the poet says "here is" — as if pointing out of the window.
• "Each a glimpse and gone forever" — the most powerful line. A glimpse is a brief, quick look. Everything seen from a train is a glimpse — there for a moment and then gone forever.
• "Lumping along" — a wonderfully descriptive word. The cart bumps and jolts heavily.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Hedges — Rows of bushes or shrubs used as a fence. Hedgerows line the sides of country roads in England.

Ditches — Long, narrow trenches dug at the side of roads. Rainwater collects in ditches beside roads.

Meadows — Open fields of grass, often with wildflowers. Cows graze in meadows — open, peaceful grassland.

Driving rain — Very heavy rain blown by the wind. Driving rain hits you sideways — it is fierce and intense.

Clambers — Climbs with difficulty using hands and feet. You clamber up a rocky hill — it takes effort.

Scrambles — Moves quickly and awkwardly over rough ground. Children scramble through bushes and over rocks.

Brambles — Wild prickly bushes that produce blackberries. Brambles scratch you — they have sharp thorns.

Tramp — A person with no home who wanders from place to place. In old English stories, tramps walked the roads looking for work.

Gazes — Looks steadily and intently at something. She gazed at the stars — long, steady, dreamy looking.

Lumping — Moving heavily and clumsily. A heavy cart lumps along a rough road — bumping and jolting.

Glimpse — A brief, quick look at something. You catch a glimpse of something — just a flash before it is gone.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Joy of travel — Stevenson captures the pure delight of movement — of going somewhere, of watching the world rush past. Travel opens our eyes to new sights, people, and places. Even a train journey through ordinary countryside becomes something magical when you truly pay attention.

Beauty in the commonplace — A child gathering brambles. A tramp by the roadside. A cart on a bumpy road. These are ordinary, everyday things. Yet the poet finds beauty in all of them. This poem teaches us to look at the ordinary world around us with fresh eyes — because beauty is everywhere, if we slow down enough to see it.

Enjoy moments in one's life — Each a glimpse and gone forever. Every moment in life is a glimpse. People, places, experiences — they appear and then they are gone. This poem asks us to be present, to look, to appreciate — because the moment will not last.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `1. From a Railway Carriage is a poem by Robert Louis Stevenson that captures the experience of looking out of a fast-moving train window.

2. The first stanza is all speed and excitement — everything rushes past like driving rain, faster than fairies and witches.

3. The second stanza slows down slightly to pick out individual people and things — a child, a tramp, a cart, a mill, a river — each appearing for just a moment.

4. The final line — "Each a glimpse and gone forever" — is the heart of the poem, capturing the bittersweet beauty of fleeting moments.

5. The three values are the joy of travel, finding beauty in ordinary things, and appreciating every moment before it is gone.`,
    },
  ],
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const CHAPTERS: Chapter[] = [
  chapter1,
  chapter2,
  chapter3,
  chapter4,
  chapter5,
  chapter6,
  chapter7,
  chapter8,
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
