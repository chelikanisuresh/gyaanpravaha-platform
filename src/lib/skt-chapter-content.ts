// Sanskrit Chapter Content — Gyaanpravaha
// सुरभारती — Connexion Class 6, Project 1
// All 8 chapters — fully written in tuition-teacher style

export interface Section {
  id: number
  title: string
  content: string
  minReadSeconds?: number
}

export interface Chapter {
  id: number
  title: string
  titleDevanagari: string
  type: 'Prayer' | 'Prose' | 'Poetry' | 'Vocabulary' | 'Numbers' | 'Grammar' | 'Conversation'
  estimatedReadMins: number
  sections: Section[]
}

// ─── CHAPTER 1 ────────────────────────────────────────────────────────────────

const chapter1: Chapter = {
  id: 1,
  title: 'Prarthana (Prayer)',
  titleDevanagari: 'प्रार्थना',
  type: 'Prayer',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every great learning tradition begins with a prayer. Before we open a book, before we pick up a pen, we pause — and offer a few words of gratitude and request to something larger than ourselves.

This chapter is called प्रार्थना (Prarthana) — meaning Prayer. It contains four beautiful Sanskrit shlokas (verses) that have been recited by students, scholars, and seekers in India for hundreds of years.

The four shlokas are prayers to: Goddess Saraswati (the goddess of learning), the Motherland (a verse from the Ramayana about why our homeland is greater than heaven), the nature of true knowledge (a verse by the poet Bhartrhari about how knowledge serves different people), and Lord Ganesha (the remover of obstacles, worshipped before any new beginning).

By learning these four shlokas, you are connecting yourself to a tradition of learning that is thousands of years old.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit is one of the oldest languages in the world. The word Sanskrit (संस्कृत) means "perfected" or "refined." It is the language of the Vedas, the Upanishads, the Ramayana, the Mahabharata, and thousands of other texts. Most Indian languages have their roots in Sanskrit.

This book is called सुरभारती (Surbharati) — a beautiful name meaning "the eloquent speech of the gods." सुर means divine, and भारती means speech or Saraswati. It is the perfect name for a Sanskrit textbook.

A shloka is a verse in Sanskrit, typically composed in a particular metre (rhythm). Shlokas are designed to be easy to memorise and recite — they have a beautiful rhythmic quality. The four shlokas in this chapter are among the most well-known in the Sanskrit tradition.

Sanskrit prayers are not just religious — they carry deep wisdom about learning, duty, the relationship between knowledge and character, and love for one's homeland.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Recite all four shlokas correctly with proper pronunciation
• Understand the meaning of each shloka in your own words
• Identify the deity or subject of each shloka
• Explain the difference between how the wicked and the wise use knowledge (Shloka 3)
• Understand what makes our motherland "greater than heaven" (Shloka 2)
• Know the qualities of Lord Ganesha described in Shloka 4`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `Let us read, understand, and learn all four shlokas of the Prarthana.

─────

SHLOKA 1 — Prayer to Goddess Saraswati

Sanskrit:
नमामि शारदां देवीं वीणापुस्तकधारिणीम्।
विद्यारम्भं करिष्यामि प्रसन्नास्तु च सा सदा।।

Word by word meaning:
नमामि — I bow to / I salute
शारदाम् — to Sharada (Goddess Saraswati)
देवीम् — the goddess
वीणापुस्तकधारिणीम् — the one who holds a veena (musical instrument) and a book
विद्यारम्भं करिष्यामि — I shall begin my studies / learning
प्रसन्ना — pleased / happy
अस्तु — may she be
सा सदा — she always

Full meaning: I bow to Goddess Sharada (Saraswati), who holds a veena and a book. I shall begin my learning. May she always be pleased with me.

Saraswati is the goddess of knowledge, music, arts, wisdom, and learning. She is shown holding a veena (symbolising music and harmony) and a book (symbolising knowledge). Invoking her before beginning any study is a tradition across India.

─────

SHLOKA 2 — The Greatness of the Motherland (from the Ramayana)

Sanskrit:
अपि स्वर्णमयी लङ्का न मे लक्ष्मण रोचते।
जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।।

Word by word meaning:
अपि — even though
स्वर्णमयी — made of gold
लङ्का — Lanka (the golden city of Ravana)
न — not
मे — to me
लक्ष्मण — O Lakshmana (brother of Rama)
रोचते — is pleasing / appeals
जननी — mother
जन्मभूमिः — the land of birth / motherland
च — and
स्वर्गादपि — even compared to heaven
गरीयसी — greater / more valuable

Full meaning: O Lakshmana, even though Lanka is made of gold, it does not appeal to me. Mother and motherland are greater even than heaven.

This is spoken by Lord Rama to his brother Lakshmana after defeating Ravana in Lanka. Even after winning the battle and standing in the golden city of Lanka, Rama says he prefers his own homeland. This shloka teaches us to love and value our country above all material wealth.

─────

SHLOKA 3 — Knowledge: The Wise vs The Wicked (Bhartrhari)

Sanskrit:
विद्या विवादाय धनं मदाय शक्ति: परेषां परपीडनाय।
खलस्य साधोर्विपरीतमेतज्ज्ञानाय दानाय च रक्षणाय।।

Word by word meaning:
विद्या — knowledge
विवादाय — for argument / quarrel
धनम् — wealth
मदाय — for pride / arrogance
शक्ति: — power / strength
परेषाम् — of others
परपीडनाय — for harming others
खलस्य — of the wicked / evil person
साधो: — of the good / noble person
विपरीतम् — opposite
एतत् — this (same: knowledge, wealth, power)
ज्ञानाय — for gaining wisdom / understanding
दानाय — for giving / charity
च — and
रक्षणाय — for protection

Full meaning: For the wicked person, knowledge is for argument, wealth is for arrogance, and strength is for harming others. For the noble person, it is exactly the opposite — knowledge is for gaining wisdom, wealth is for giving, and strength is for protecting others.

This shloka by the Sanskrit poet Bhartrhari is a profound observation about human nature. The same resources — knowledge, wealth, power — produce completely different results depending on the character of the person who holds them.

─────

SHLOKA 4 — Prayer to Lord Ganesha

Sanskrit:
विघ्नेश्वराय वरदाय सुरप्रियाय।
लम्बोदराय सकलाय जगध्दिताय।।
नागाननाय श्रुतियज्ञविभूषिताय।
गौरीसुताय गणनाथ नमो नमस्ते।।

Word by word meaning:
विघ्नेश्वराय — to the Lord of obstacles (Vighna = obstacle, Ishvara = Lord)
वरदाय — to the giver of boons
सुरप्रियाय — to the one beloved by the gods (devas)
लम्बोदराय — to the one with a large belly
सकलाय — to the one who is complete / perfect
जगध्दिताय — to the one who is beneficial to the world
नागाननाय — to the one with an elephant face (Naga = elephant, Anana = face)
श्रुतियज्ञविभूषिताय — to the one adorned with the knowledge of the Vedas (Shruti) and sacrifice (Yagna)
गौरीसुताय — to the son of Gauri (Parvati)
गणनाथ — O Lord of the Ganas (attendants of Shiva)
नमो नमस्ते — salutation upon salutation to you / I bow to you again and again

Full meaning: Salutation to Lord Ganesha — the Lord of obstacles, the giver of boons, beloved by the gods, the large-bellied one, the perfect one, the one who benefits the world, the one with an elephant face, adorned with Vedic knowledge, son of Gauri. O Lord of the Ganas, I bow to you again and again.

Lord Ganesha is worshipped at the beginning of every auspicious activity — every new venture, every new learning, every new journey — because he removes obstacles from the path. He is the son of Lord Shiva and Goddess Parvati (Gauri).`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `प्रार्थना (Prarthana) — Prayer. From pra + artha + na, meaning "to request earnestly."

सुरभारती (Surbharati) — The name of this Sanskrit textbook. Sura = divine, Bharati = eloquent speech/Saraswati. The eloquent speech of the gods.

शारदा (Sharada) — Another name for Goddess Saraswati. Also the name of the autumn season. The goddess of knowledge and arts.

वीणापुस्तकधारिणी (Veenapustakadhaarini) — One who holds a veena and a book. Description of Goddess Saraswati — the veena symbolises music and harmony; the book symbolises knowledge.

जन्मभूमि: (Janmabhumi) — Land of birth / motherland. Janma = birth, Bhumi = land/earth.

गरीयसी (Gariyasi) — Greater, more valuable. From the same root as the word "guru" (heavy, weighty, important).

विद्या (Vidya) — Knowledge, learning, education. One of the most important Sanskrit words — it gives us words like "vidyalaya" (school) and "Vidyarthi" (student).

खल: (Khala) — A wicked, evil, or base person.

साधु: (Sadhu) — A noble, good, virtuous person.

विघ्न (Vighna) — Obstacle, impediment. Ganesha is called Vighnaharta (one who removes obstacles) and Vighnesha (Lord of obstacles).

गणनाथ (Gananatha) — Lord of the Ganas. Gana = a group/attendant, Natha = Lord. One of the names of Lord Ganesha.

गौरी (Gauri) — A name of Goddess Parvati, wife of Lord Shiva and mother of Ganesha. Means "the fair/golden one."

नमस्ते (Namaste) — A respectful salutation. Namas = bow/salutation, Te = to you. The universal Indian greeting of respect.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Begin every learning with humility — All four shlokas are acts of humility. Before beginning to study, we bow to Saraswati. Before beginning any task, we seek Ganesha's blessings. This teaches us that learning is not about ego — the truly learned person knows how much they do not know, and approaches every new lesson with an open mind and a humble heart.

Your homeland is your greatest wealth — The shloka spoken by Rama in Lanka is one of the most beautiful expressions of patriotism in world literature. Even standing in a city of gold, Rama says his heart belongs to his homeland. This teaches us that material wealth can never replace the love we feel for our home, our culture, and our people.

Character determines how you use your gifts — The Bhartrhari shloka (Shloka 3) is perhaps the most profound teaching in this chapter. Knowledge, wealth and power are gifts. In the hands of the wicked, they cause argument, arrogance and harm. In the hands of the noble, they create wisdom, generosity and protection. This teaches us that it is not what you have but who you are that matters most.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

1. Shloka 1 — Prayer to Goddess Saraswati (Sharada): she holds a veena and a book; the student prays for her blessings before beginning studies. नमामि शारदां देवीं वीणापुस्तकधारिणीम्।

2. Shloka 2 — From the Ramayana (Rama to Lakshmana): even golden Lanka does not appeal to Rama — "Mother and motherland are greater even than heaven." जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।

3. Shloka 3 — Bhartrhari on knowledge: the wicked use knowledge for argument, wealth for pride, power to harm others. The noble use knowledge for wisdom, wealth for charity, power for protection.

4. Shloka 4 — Prayer to Lord Ganesha: son of Gauri (Parvati), elephant-faced, Lord of Ganas, remover of obstacles, giver of boons. Worshipped before every new beginning.

5. Key vocabulary: विद्या (knowledge), जन्मभूमि: (motherland), गरीयसी (greater), खल: (wicked), साधु: (noble), विघ्न (obstacle), नमस्ते (salutation/bow).`,
    },
  ],
}

// ─── CHAPTER 2 ────────────────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'Vivekananda (Vivekanandah)',
  titleDevanagari: 'विवेकानन्द:',
  type: 'Prose',
  estimatedReadMins: 14,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Swami Vivekananda is one of the greatest Indians who ever lived. His words — "Arise, Awake, and Stop not till the goal is reached" — have inspired millions of young Indians for over a hundred years. He carried the message of Indian philosophy, the Vedanta, to the entire world.

This chapter tells the story of Swami Vivekananda's life in Sanskrit — the ancient language he would have revered deeply as a student of Indian philosophy. You will read about his early life as Narendradatt, his extraordinary encounter with Ramakrishna Paramahamsa, his wandering across India, his historic speech at the World Parliament of Religions in Chicago in 1893, and the essence of his teachings.

Reading this in Sanskrit is a double lesson — you learn about a great soul, and you practise reading Sanskrit prose at the same time.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit prose (गद्य — Gadya) is different from Sanskrit poetry (पद्य — Padya). Prose is written in sentences that flow naturally without a fixed metre or rhyme. This chapter is a Sanskrit prose passage (गद्यांश — Gadyansha) — a paragraph form.

Reading Sanskrit prose helps you understand how Sanskrit sentences are constructed. Sanskrit sentences often put the verb at the end. The subject comes first, then the object, then the verb. For example: "Narendra guru to made" = नरेन्द्र: तं स्वं गुरुं स्वयकरोत् (Narendra made him his own guru).

The chapter also teaches you vocabulary (शब्दार्था: — Shabdarthah), synonyms (समानार्थकशब्दान् — Samanartha words), antonyms (विलोमपदानि — Vilompadani), and answer-in-one-sentence exercises (एकवाक्येन उत्तरत — Ekvakyen Uttarat).

This comprehensive approach — text + vocabulary + exercises — is the classic Sanskrit learning method.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read the Sanskrit prose passage about Vivekananda with understanding
• Know the key facts about Swami Vivekananda's life (birth name, father's name, guru, Chicago speech)
• Understand and use the vocabulary (शब्दार्था:) from the passage
• Match Sanskrit synonyms (समानार्थकशब्दान्) from the chapter
• Match Sanskrit antonyms (विलोमपदानि) from the chapter
• Answer the एकवाक्येन उत्तरत (one-sentence answer) questions`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 480,
      content: `Let us read the Sanskrit passage about Swami Vivekananda together, with full meaning.

─────

THE SANSKRIT PASSAGE

पूर्वस्मिन् वयसि विवेकानन्दस्य नाम नरेन्द्रदत्त: आसीत् ।
तस्य पिता विश्वनाथदत्त: आसीत् ।
नरेन्द्र: यदा स्नातकोऽभवत् तदा तस्य पिता परलोकमगच्छत् ।

MEANING: In his earlier age, Vivekananda's name was Narendradatt. His father was Vishwanath Datta. When Narendra became a graduate, at that time his father passed away (went to the other world).

─────

एकदा कस्याञ्चित् सभायां नरेन्द्र: रामकृष्ण-परमहंस महोदयस्य स्पर्शमधिगत्य समाधिस्थौभवत् ।
तस्यैव गुरो: स्पर्शेन च तस्य समाधि: समाप्त: अभवत् ।
तस्मात् दिनात् नरेन्द्र: तं स्वं गुरुं स्वयकरोत् तप: च अकरोत् ।

MEANING: Once in some assembly, Narendra, having received the touch of Sri Ramakrishna Paramahamsa, entered into a state of meditation (samadhi). Only by that same guru's touch did his samadhi come to an end. From that day, Narendra made him his own guru and performed penance.

─────

गुरो: आज्ञाम् विदित्वा स: सर्वत्र अभ्रमत् ।
भारतीय संस्कृते: च प्रचारं अकरोत् ।

MEANING: Knowing the command of his guru, he wandered everywhere. And he propagated (spread) Indian culture.

─────

1893 तमे वर्षे अमेरिका देशे शिकागो नाम नगरे विश्व धर्म सम्मेलनम् अभवत् ।
तत्रापि स: अगच्छत ।
तत्र तस्य भाषणम् आकर्ण्य सर्वे श्रोतार: तस्य प्रशंसितार: अभवन् ।
तस्य यश: सर्वत्र प्रासरत् ।
अनेके जना: तस्य भक्ता: अभवन् ।

MEANING: In the year 1893, in the city called Chicago in America, a World Parliament of Religions took place. He also went there. There, having heard his speech, all the listeners became his admirers. His fame spread everywhere. Many people became his devotees.

─────

तस्य उपदेशाना सार: अस्ति एष:
— नर्भय: भव ।
— तेजस्वी भव ।
— श्रद्धावान् भव ।
— कर्मयोगी भव ।
— राष्ट्रदेव: भव ।

MEANING: The essence of his teachings is this:
— Be fearless.
— Be illustrious/radiant.
— Be full of faith.
— Be one who believes in selfless action (Karmayogi).
— Serve the nation as God (Rashtradev bhav).

─────

दक्षिण भारते समुद्रस्य मध्ये पर्वते तस्य मन्दिरम् अस्ति ।
1970 तमे अस्माकं राष्ट्रपति: तस्य उद्घाटनं अकरोत् ।

MEANING: In South India, in the middle of the sea, on a rock, is his temple (Vivekananda Rock Memorial). In the year 1970, our President performed its inauguration.

─────

VOCABULARY (शब्दार्था:)
पूर्व — earlier / before
वयस् — age
स्नातक: — graduate
समाधि: — deep meditation / trance
तपस् — penance / spiritual practice
प्रचार: — propagation / spreading
तेजस्विन् — illustrious / radiant
श्रद्धावत् — full of faith
मध्य: — middle
उद्घाटनं — inauguration
भूत्वा — having been
कर्मयोगिन् — one who believes in selfless action

─────

SYNONYMS (समानार्थकशब्दान्)
पिता = जनक:
राष्ट्र: = देश:
समुद्र: = सागर:
पर्वत: = अचल:
सभा = समिति:
गुरु: = शिक्षक:

─────

ANTONYMS (विलोमपदानि)
पूर्वम् × पश्चात् (before × after)
परलोकं × भूलोकं (next world × this world)
समाप्त: × प्रारम्भ: (ended × begun)
श्रोतर: × वक्तार: (listeners × speakers)
प्रशंसित: × निन्दित: (praised × condemned)
यश: × पराभव: (fame × defeat/disgrace)
निर्भय: × भय: (fearless × fearful)

─────

EXERCISES — Answer in one sentence (एकवाक्येन उत्तरत)
1. विवेकानन्दस्य पिता क: आसीत्? — Vivekananda's father was Vishwanath Datta.
2. विवेकानन्दस्य पिता कदा परलोकम् अगच्छत्? — When Narendra became a graduate.
3. कस्य स्पर्शम् अधिगत्य स: समाधिस्थ: अभवत्? — By the touch of Ramakrishna Paramahamsa.
4. विवेकानन्द: कस्य प्रचारं अकरोत्? — He spread Indian culture.
5. शिकागो नगरे किम् अभवत्? — The World Parliament of Religions took place.
6. के विवेकानन्दस्य प्रशंसितार: अभवन्? — All the listeners/audience became his admirers.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `स्नातक: (Snatak) — Graduate. One who has completed their formal studies. When Narendra became a graduate, his father passed away — thrusting him into great hardship at a young age.

समाधि: (Samadhi) — A state of deep meditation or trance — the highest state of concentration in yoga and Indian philosophy. When Ramakrishna touched Narendra, he entered this state spontaneously.

परमहंस (Paramahansa) — A title of honour for a great spiritual teacher. Parama = supreme, Hamsa = swan (symbolic of wisdom and purity). Ramakrishna Paramahansa was Vivekananda's guru.

गुरु: (Guru) — Teacher, spiritual preceptor. A guru is more than a teacher — in Indian tradition, the guru is a guide for the entire spiritual life of a student. The relationship between guru and shishya (student) is considered sacred.

तपस् (Tapas) — Penance, spiritual practice, austerity. Vivekananda practised tapas — austerities and deep meditation — under the guidance of his guru.

प्रचार: (Prachar) — Propagation, spreading, dissemination. Vivekananda spread (अकरोत् प्रचारम्) Indian culture across the world.

विश्व धर्म सम्मेलनम् (Vishwa Dharma Sammelanam) — World Parliament of Religions. Vishwa = world, Dharma = religion/faith, Sammelana = conference/parliament.

निर्भय: (Nirbhaya) — Fearless. Nir = without, Bhaya = fear. One of Vivekananda's five great teachings: Be fearless.

कर्मयोगिन् (Karmayogin) — One who believes in selfless action. Karma = action, Yoga = union. A karmayogi works without attachment to the fruits of their actions — they serve for the sake of service itself.

राष्ट्रदेव (Rashtradev) — Serving the nation as God. Rashtra = nation, Dev = God. Vivekananda's teaching that service to the nation is service to God.

उद्घाटनं (Udghatanam) — Inauguration, opening ceremony. The Vivekananda Rock Memorial in Kanyakumari, Tamil Nadu, was inaugurated by President of India in 1970.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Adversity shapes greatness — Vivekananda lost his father the moment he became a graduate — when he most needed support. Yet instead of giving up, he channelled that pain into spiritual seeking. The greatest people are often those who turned hardship into purpose. Difficulties are not obstacles to your path — they are part of your path.

One encounter can change a life — A single touch from Ramakrishna Paramahamsa changed Narendra's entire direction forever. From that day, he committed himself to his guru and to a life of service. This teaches us that we should remain open to transformative encounters — a teacher, a book, a conversation — that can change the trajectory of our lives if we are open to them.

Knowledge must serve the nation — Vivekananda's five teachings are not about personal success — they are about national service. Be fearless, be radiant, have faith, work selflessly, see the nation as God. This is a call to use your education, your strength and your character in the service of something larger than yourself.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

1. Vivekananda's original name was नरेन्द्रदत्त: (Narendradatt). His father was विश्वनाथदत्त: (Vishwanath Datta). His father passed away when Narendra became a graduate (स्नातक:).

2. In an assembly, Narendra received the touch (स्पर्श:) of Ramakrishna Paramahamsa and entered samadhi. The same guru's touch ended his samadhi. From that day he made him his guru and performed tapas.

3. In 1893, at the World Parliament of Religions (विश्व धर्म सम्मेलनम्) in Chicago, USA, all listeners became his admirers. His fame spread everywhere.

4. His five teachings: निर्भय: भव (be fearless), तेजस्वी भव (be illustrious), श्रद्धावान् भव (be full of faith), कर्मयोगी भव (be a Karmayogi), राष्ट्रदेव: भव (see the nation as God).

5. His temple is in South India on a rock in the sea — the Vivekananda Rock Memorial, inaugurated by India's President in 1970.`,
    },
  ],
}

// ─── CHAPTER 3 ────────────────────────────────────────────────────────────────

const chapter3: Chapter = {
  id: 3,
  title: 'Sanchalana Geetam (March Song)',
  titleDevanagari: 'सञ्चलनगीतम्',
  type: 'Poetry',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `A सञ्चलनगीतम् (Sanchalana Geetam) is a march song — a song sung while marching. It is a patriotic poem that calls upon soldiers (and by extension all citizens) to be brave, to protect India, to embody Indian culture, and to march forward with enthusiasm.

This is a Sanskrit poem with four stanzas (verses), each ending with a refrain-like rhyme. It was written for young students to recite while doing a march past — a common feature of Indian school Independence Day and Republic Day celebrations.

The poem speaks to the spirit of patriotism, courage, and service. It calls out to the "वीर" (Veer — brave one) to come forward, to be fearless, to uphold Indian culture, and to march ahead with purpose.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit poetry is called पद्य (Padya). Unlike Sanskrit prose (गद्य — Gadya), poetry follows specific metres (छन्द — Chhanda) which give it rhythm and musicality. This poem has a clear, march-like rhythm — which is why it works so well as a marching song.

In Sanskrit poetry, the same word can appear with slight variations depending on its grammatical form. For example, वीरता (Veerata) means bravery, वीरान् (Veeran) means brave people (accusative plural), and वीर (Veera) is the root word meaning brave.

The poem also uses command forms of verbs (imperatives) — एहि (come), विधेहि (show/create), प्रदेहि (give/offer), भव (be), भज (worship/follow), धर (hold). These commanding forms give the poem its energy and urgency.

Learning to recite this poem with proper pronunciation and rhythm is the goal of this chapter.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Recite all four stanzas of the Sanchalana Geetam with proper rhythm and pronunciation
• Understand the meaning of each stanza word by word
• Identify the command forms (imperative verbs) used in the poem
• Explain what qualities the poem calls upon the soldier/citizen to have
• Understand the Sanskrit words for key concepts: veer (brave), veerata (bravery), rashtra (nation), sanskriti (culture)`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `Let us read all four stanzas of the Sanchalana Geetam with their full meanings.

─────

STANZA 1

Sanskrit:
एहि एहि वीर रे
वीरतां विधेहि रे।
भारतस्य रक्षणाय
जीवनं प्रदेहि रे ।।1।।

Word by word:
एहि — come (command form of एति — to come)
वीर — O brave one
रे — O (exclamation of address)
वीरताम् — bravery (accusative)
विधेहि — show / create / establish (command form)
भारतस्य — of India (genitive)
रक्षणाय — for the protection (dative)
जीवनम् — life
प्रदेहि — offer / give (command form)

Meaning: Come, come, O brave one! Show your bravery! Offer your life for the protection of India!

─────

STANZA 2

Sanskrit:
त्वं हि मार्गदर्शक:
त्वं हि देशरक्षक:
त्वं हि शत्रुनाशक:
कालनागतक्षक: ।।2।।

Word by word:
त्वम् — you
हि — indeed / truly
मार्गदर्शक: — guide (one who shows the path: marga = path, darshak = one who shows)
देशरक्षक: — protector of the nation (desh = country, rakshak = protector)
शत्रुनाशक: — destroyer of enemies (shatru = enemy, nashak = destroyer)
कालनागतक्षक: — destroyer of the serpent of time / one who overcomes the deadly serpent (kala = time/death, naga = serpent, takshak = cutter/destroyer)

Meaning: You are indeed the guide! You are indeed the protector of the nation! You are indeed the destroyer of enemies! You are the slayer of the deadly serpent (of time and death)!

─────

STANZA 3

Sanskrit:
साहसी सदा भव
वीरतां सदा भज।
भारतीयसंस्कृतिं
मानसे सदा धर ।।3।।

Word by word:
साहसी — courageous / daring
सदा — always
भव — be (command form of भू — to be)
वीरताम् — bravery
भज — follow / worship / embrace (command form)
भारतीयसंस्कृतिम् — Indian culture (accusative)
मानसे — in the mind / in the heart (locative)
धर — hold / keep (command form)

Meaning: Always be courageous! Always embrace bravery! Always hold Indian culture in your heart!

─────

STANZA 4

Sanskrit:
पदं पदं पुरश्चलेत्
सोत्साहं मनो भवेत्।
भारतस्य गौरवाय
सर्वदा जयो भवेत् ।।4।।

Word by word:
पदम् पदम् — step by step (pada = step/foot)
पुरश्चलेत् — should march forward (puras = forward, chalet = should move)
सोत्साहम् — with enthusiasm (sa + utsaha = with + enthusiasm)
मन: — mind
भवेत् — should be / let it be (optative form)
भारतस्य — of India
गौरवाय — for the glory / for the honour
सर्वदा — always / forever
जय: — victory
भवेत् — may there be

Meaning: Let us march forward step by step! Let the mind be filled with enthusiasm! May there always be victory for the glory of India!

─────

KEY COMMAND FORMS (Imperative Verbs) in this poem:
एहि — come!
विधेहि — show / establish!
प्रदेहि — offer / give!
भव — be!
भज — embrace / follow!
धर — hold / keep!`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `सञ्चलनगीतम् (Sanchalana Geetam) — March song. Sanchalana = march/movement, Geetam = song.

वीर (Veera) — Brave, heroic. One of the most important words in Sanskrit and Indian culture. A Veer is someone of extraordinary courage.

वीरता (Veerata) — Bravery, heroism, valour. The quality of being a Veer.

मार्गदर्शक: (Margadarshak) — Guide, one who shows the way. Marga = path/road, Darshak = one who shows. The word Margadarshak is still used in modern Hindi/Sanskrit to mean guide or mentor.

देशरक्षक: (Desharaksak) — Protector of the nation. Desh = country, Rakshak = protector. The soldiers of India are the desh-rakshak of the nation.

शत्रुनाशक: (Shatrunashak) — Destroyer of enemies. Shatru = enemy, Nashak = destroyer.

साहसी (Sahasi) — Courageous, daring. From sahas = courage/daring. Sahasi is the adjective form — one who possesses sahas.

संस्कृति (Sanskriti) — Culture. Derived from Sanskrit — the word sanskriti means what has been cultivated and refined over generations. Bharatiya Sanskriti = Indian culture.

मानस (Manasa) — Mind, heart, soul. Manasa = in the mind. The mind is considered the seat of all emotions, thoughts and values in Sanskrit philosophy.

उत्साह (Utsaha) — Enthusiasm, energy, zeal. One of the most positive Sanskrit words. Utsaha is the fuel that drives every great achievement.

गौरव (Gaurav) — Honour, glory, pride. From guru (heavy/important) — gaurav is that which makes something weighty and worthy of respect.

जय (Jaya) — Victory. One of the most common Sanskrit words — used in greetings, prayers and national slogans. जय हिन्द! जय भारत!`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Courage is a choice — The poem calls out to the "veer" — the brave one. But bravery is not just physical — it is the courage to stand up for what is right, to keep going when things are hard, to protect those who cannot protect themselves. The poem asks: be courageous always (साहसी सदा भव). Not just when it is easy. Always.

Culture is worth protecting — The third stanza asks us to hold भारतीयसंस्कृतिम् (Indian culture) in our hearts always. Culture is not just festivals and food — it is the values, wisdom, art, philosophy and way of life that a civilisation has built over thousands of years. Our culture — with its emphasis on knowledge, family, respect for elders, nonviolence and truth — is among the richest in the world. It is worth knowing, celebrating, and passing on.

March forward with enthusiasm — The final stanza is the most energising: step by step, with enthusiasm, for the glory of India. This is the attitude we should bring to everything — to our studies, our work, our relationships. Move forward. Step by step. With enthusiasm. For something greater than yourself.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

1. Stanza 1 — Call to the brave soldier: एहि एहि वीर रे — come, come O brave one! Show bravery, offer your life for the protection of India.

2. Stanza 2 — The soldier's identity: You are the guide (मार्गदर्शक:), the protector of the nation (देशरक्षक:), the destroyer of enemies (शत्रुनाशक:), the slayer of the deadly serpent.

3. Stanza 3 — Be brave always: साहसी सदा भव — always be courageous; भारतीयसंस्कृतिम् मानसे सदा धर — always hold Indian culture in your heart.

4. Stanza 4 — March forward: पदं पदं पुरश्चलेत् — march forward step by step; सोत्साहं मनो भवेत् — let the mind be enthusiastic; भारतस्य गौरवाय सर्वदा जयो भवेत् — may there always be victory for India's glory.

5. Command forms (imperative verbs): एहि (come), विधेहि (show), प्रदेहि (offer), भव (be), भज (embrace), धर (hold).`,
    },
  ],
}

// ─── CHAPTER 4 ────────────────────────────────────────────────────────────────

const chapter4: Chapter = {
  id: 4,
  title: 'Sanskritabhasha Grihe Grihe (Sanskrit in every home)',
  titleDevanagari: 'संस्कृतभाषा गृहे-गृहे',
  type: 'Vocabulary',
  estimatedReadMins: 12,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Did you know that most of the everyday things around you — in your classroom, your kitchen, your garden — have beautiful Sanskrit names? Sanskrit is not just an ancient language of temples and scriptures — it is a language that was once used in daily life across India.

This chapter is called संस्कृतभाषा गृहे-गृहे — meaning "Sanskrit language in every home." Its goal is simple but powerful: to bring Sanskrit into your daily life by learning Sanskrit names for the objects you see and use every day.

The chapter gives you 20 Sanskrit words divided into two groups: classroom objects (1–10) and fruits (11–20). By learning these 20 words, you begin a journey of making Sanskrit a living, breathing part of your everyday world.

The Sanskrit movement "संस्कृत भारती" (Sanskrit Bharati) works across India to revive spoken Sanskrit — and this lesson is your first step into that world.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit vocabulary is built on roots (धातु — Dhaatu) — base forms from which hundreds of words are derived. When you learn one Sanskrit root, you often unlock a whole family of related words.

For example, the root लिख् (Likh) means to write:
• लेखनी (Lekhani) — pen (that which writes)
• लेखन पुस्तिका (Lekhan Pustika) — notebook (book for writing)
• लेखक: (Lekhak) — writer/author

Similarly, the root पठ् (Path) means to read:
• पठन (Pathana) — reading
• पाठ: (Path) — lesson
• पाठशाला (Pathashala) — school (place of lessons)

This chapter focuses on nouns — the names of things. In Sanskrit, all nouns have a gender (masculine, feminine, or neuter) and different endings depending on how they are used in a sentence. For now, just learn the words as they are given.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Name all 20 objects in Sanskrit correctly
• Recognise both the Sanskrit word and its meaning when given either one
• Identify which words are classroom objects and which are fruits
• Notice the Sanskrit word endings: ः (for masculine nouns), ी/ा (for feminine), म् (for neuter)
• Use at least 5 of these Sanskrit words naturally in a sentence or conversation`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 420,
      content: `Let us learn all 20 Sanskrit words with their meanings, pronunciations, and memory tips.

─────

CLASSROOM OBJECTS (कक्षायां वस्तूनि) — 1 to 10

1. मापिका (Mapika) — Scale / ruler
   MAP-i-ka | A measuring instrument — "mapa" means measurement

2. पुन: पूरणी (Punah Poorani) — Refill
   PU-nah POO-ra-ni | "puna" = again, "poorana" = filling — refilling a pen

3. लेखन पुस्तिका (Lekhan Pustika) — Notebook / exercise book
   LEK-han PUS-ti-ka | "lekhan" = writing, "pustika" = small book

4. मार्जक: (Marjak) — Eraser / rubber
   MAR-jak | From the root "marj" meaning to wipe/clean

5. लेखनी (Lekhani) — Pen
   LEK-ha-ni | From "likh" = to write — the instrument that writes

6. स्यूत: (Syoot) — Bag
   SYOO-ta | A bag or satchel — your school bag

7. व्यजनम् (Vyajanam) — Fan
   VYA-ja-nam | An instrument to create air — a fan

8. वातायनम् (Vataynam) — Window
   VA-ta-ya-nam | "Vata" = wind/air, "ayana" = path — a window is the path for wind/air

9. आसन्द: (Asanda) — Chair
   A-san-da | A seat — your classroom chair

10. उत्पीठिका (Utpeethika) — Stool
    UT-pee-thi-ka | A small raised seat — a stool without a back

─────

FRUITS (फलानि) — 11 to 20

11. सुधाखण्ड (Sudhakhand) — Chalk
    SU-dha-khan-da | Sudha = white/nectar, Khanda = piece — a piece of white chalk

12. आम्रम् (Aamram) — Mango
    AUM-ram | The Sanskrit word for mango — आम (Aam) in Hindi comes directly from this!

13. द्राक्षा (Draksha) — Grapes
    DRAK-sha | Sanskrit for grapes — still used in Ayurvedic medicine

14. कदली (Kadali) — Banana
    ka-DA-li | The Sanskrit word for banana — Kadalivana means banana grove

15. सेवम् (Sevam) — Apple
    SAY-vam | Sanskrit for apple

16. कलिङ्गम् (Kalingam) — Watermelon
    ka-LING-am | Interestingly, the ancient region of Kalinga (modern Odisha) is named after this fruit!

17. मधुकर्कटी (Madhukarkatee) — Muskmelon
    MA-dhu-kar-ka-tee | "Madhu" = sweet/honey, "karkata" = melon — the sweet melon

18. नारङ्गम् (Narangam) — Orange
    NA-rang-am | Sanskrit for orange — "narangi" in Hindi comes from this!

19. पनसम् (Panasam) — Jackfruit
    PA-na-sam | Sanskrit for jackfruit — the world's largest tree-borne fruit

20. दाडिमम् (Dadimam) — Pomegranate
    DA-di-mam | Sanskrit for pomegranate — "anar" in Hindi, but Sanskrit uses this ancient name

─────

MEMORY TIPS

Classroom objects — remember them in pairs:
1-2: Scale + Refill (measuring tools)
3-4: Notebook + Eraser (writing essentials)
5-6: Pen + Bag (what you carry to school)
7-8: Fan + Window (things that bring air)
9-10: Chair + Stool (things to sit on)

Fruits — remember them by type:
Tropical: Mango (आम्रम्), Banana (कदली), Jackfruit (पनसम्)
Juicy: Grapes (द्राक्षा), Watermelon (कलिङ्गम्), Orange (नारङ्गम्)
Round: Apple (सेवम्), Muskmelon (मधुकर्कटी), Pomegranate (दाडिमम्)`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `गृहे-गृहे (Grihe-Grihe) — In every home, house to house. Griha = home. The repetition "grihe-grihe" means "in every home, in every home" — everywhere. This usage of repetition for emphasis is common in Sanskrit.

मापिका (Mapika) — Scale/ruler. From the root "ma" meaning to measure. Related to the word "mapa" (map) — both involve measuring.

लेखनी (Lekhani) — Pen. From the root "likh" (to write). Note how in Sanskrit, adding "-ani" to a verb root creates the instrument noun: likh + ani = lekhani (that which writes = pen).

पुस्तिका (Pustika) — Small book (notebook). From "pustaka" (book) + diminutive suffix "ika." Pustakalaya (library) = pustaka + alaya (house of books).

मार्जक: (Marjak) — Eraser. From root "marj" meaning to clean or wipe. The marjak cleans (removes) writing.

वातायनम् (Vataynam) — Window. One of the most poetic Sanskrit compound words: Vata (wind/air) + Ayana (path/passage) = the passage for wind = window. This compound beautifully explains what a window does.

आम्रम् (Aamram) — Mango. One of the oldest words for mango in any language. Many Indian languages get their word for mango from this Sanskrit root: aam (Hindi), amba (Marathi), mavu (Tamil from the root).

द्राक्षा (Draksha) — Grapes. Still used in Ayurveda — "draksha" is one of the therapeutic herbs/fruits in Ayurvedic medicine for its cooling and strengthening properties.

मधुकर्कटी (Madhukarkatee) — Muskmelon. A compound word: Madhu (sweet/honey) + Karkata (crab/melon). The sweetest melon.

नारङ्गम् (Narangam) — Orange. This Sanskrit word is the origin of the word "orange" in European languages — via Persian (narang) → Arabic (naranj) → Spanish (naranja) → English (orange)! Sanskrit gave the world the word for this fruit.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Language connects us to our roots — Every Sanskrit word carries centuries of wisdom. When you say वातायनम् for window, you are saying "the passage for wind" — a description so apt and poetic that it makes you see a window differently. Learning Sanskrit vocabulary reconnects you to the way your ancestors thought about the world around them.

Our everyday world has Sanskrit names — The movement to use Sanskrit in daily life (संस्कृत भारती) reminds us that Sanskrit was never just a language of temples and scriptures. It was a living, spoken language. When you call a mango आम्रम् or a pen लेखनी, you are participating in that living tradition.

Small steps lead to big changes — Learning 20 words may seem small. But imagine if every day you learnt just five Sanskrit words — in a year you would know 1,800 words. In Sanskrit, knowing 2,000–3,000 words allows you to read most texts. संस्कृतभाषा गृहे-गृहे begins with just 20 words — but those 20 words are the door to a vast world.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the 20 words to remember:

Classroom objects:
1. मापिका — Scale/ruler
2. पुन: पूरणी — Refill
3. लेखन पुस्तिका — Notebook
4. मार्जक: — Eraser
5. लेखनी — Pen
6. स्यूत: — Bag
7. व्यजनम् — Fan
8. वातायनम् — Window
9. आसन्द: — Chair
10. उत्पीठिका — Stool

Fruits:
11. सुधाखण्ड — Chalk
12. आम्रम् — Mango
13. द्राक्षा — Grapes
14. कदली — Banana
15. सेवम् — Apple
16. कलिङ्गम् — Watermelon
17. मधुकर्कटी — Muskmelon
18. नारङ्गम् — Orange
19. पनसम् — Jackfruit
20. दाडिमम् — Pomegranate

Key word structure tip: nouns ending in ः are usually masculine, nouns ending in म् are usually neuter, nouns ending in ी/ा are usually feminine.`,
    },
  ],
}

// ─── CHAPTER 5 ────────────────────────────────────────────────────────────────

const chapter5: Chapter = {
  id: 5,
  title: 'Sankhyah (Numbers 21-40)',
  titleDevanagari: 'सङ्ख्या:',
  type: 'Numbers',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Numbers are the universal language. And Sanskrit has one of the most elegant, logical, and systematic number systems in the world. In fact, the decimal system — the system of tens used everywhere in the world today — was developed in India, and Sanskrit was the language in which it was first expressed.

This chapter teaches you Sanskrit numbers from 21 to 40. You have likely already studied numbers 1 to 20 earlier. This chapter extends that knowledge through the next twenty numbers — covering the twenties (विंशति series) and the thirties (त्रिंशत् series).

Sanskrit numbers follow beautiful patterns that are easy to learn once you see the logic. Knowing Sanskrit numbers helps you in three ways: it builds your Sanskrit vocabulary, it helps you understand Sanskrit texts and shlokas that contain numbers, and it gives you a deeper appreciation of the mathematical heritage of India.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit numbers from 21 to 30 follow the pattern: [unit] + विंशति: (twenty). For example:
• एक + विंशति: = एकविंशति: (21 — one-twenty)
• द्वा + विंशति: = द्राविंशति: (22 — two-twenty)
• त्रय: + विंशति: = त्रयोविंशति: (23 — three-twenty)

Numbers from 31 to 40 follow the pattern: [unit] + त्रिंशत् (thirty). For example:
• एक + त्रिंशत् = एकत्रिंशत् (31 — one-thirty)
• द्वा + त्रिंशत् = द्रात्रिंशत् (32 — two-thirty)

The standalone numbers त्रिंशत् (30) and चत्वारिंशत् (40) are the base words.

This pattern — where the unit comes before the ten — is similar to how numbers work in German (einundzwanzig = one-and-twenty = 21) and in old English (one-and-twenty). Sanskrit numbers reveal the deep structure of how humans think about counting.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Recite Sanskrit numbers from 21 to 40 correctly
• Write the Sanskrit word for any number between 21 and 40 when given the numeral
• Recognise the pattern: unit + विंशति: for 21-29, and त्रिंशत् for 30, unit + त्रिंशत् for 31-39
• Connect Sanskrit numbers to numbers in other Indian languages (Hindi, Marathi) that share the same roots
• Write the numeral when given the Sanskrit number word`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `Let us learn all 20 numbers (21 to 40) with their patterns and pronunciations.

─────

THE NUMBERS 21 TO 30 (विंशति series)

21 — एकविंशति: (Ekavimshati)
     EK-a-vim-sha-ti | Eka (1) + Vimshati (20) = 21

22 — द्राविंशति: (Dvavimshati)
     DVAA-vim-sha-ti | Dva (2) + Vimshati (20) = 22

23 — त्रयोविंशति: (Trayovimshati)
     TRA-yo-vim-sha-ti | Trayo (3, in compound) + Vimshati (20) = 23

24 — चतुर्विंशति: (Chaturvimshati)
     CHA-tur-vim-sha-ti | Chatur (4) + Vimshati (20) = 24

25 — पञ्चविंशति: (Panchavimshati)
     PAN-cha-vim-sha-ti | Pancha (5) + Vimshati (20) = 25

26 — षड्विंशति: (Shadvimshati)
     SHAD-vim-sha-ti | Shad (6) + Vimshati (20) = 26

27 — सप्तविंशति: (Saptavimshati)
     SAP-ta-vim-sha-ti | Sapta (7) + Vimshati (20) = 27

28 — अष्टाविंशति: (Ashtavimshati)
     ASH-ta-vim-sha-ti | Ashta (8) + Vimshati (20) = 28

29 — नवविंशति: (Navavimshati)
     NA-va-vim-sha-ti | Nava (9) + Vimshati (20) = 29

30 — त्रिंशत् (Trimshat)
     TRIM-shat | The base word for thirty — from tri (3) × dasha (10) = 30

─────

THE NUMBERS 31 TO 40 (त्रिंशत् series)

31 — एकत्रिंशत् (Ekatrimshat)
     E-ka-trim-shat | Eka (1) + Trimshat (30) = 31

32 — द्रात्रिंशत् (Dvatrimshat)
     DVA-trim-shat | Dva (2) + Trimshat (30) = 32

33 — त्रयस्त्रिंशत् (Trayastrimshat)
     TRA-yas-trim-shat | Traya (3) + Trimshat (30) = 33

34 — चतुस्त्रिंशत् (Chatustrimshhat)
     CHA-tus-trim-shat | Chatu (4) + Trimshat (30) = 34

35 — पञ्चत्रिंशत् (Panchatrimshat)
     PAN-cha-trim-shat | Pancha (5) + Trimshat (30) = 35

36 — षट्त्रिंशत् (Shattrimshat)
     SHAT-trim-shat | Shat (6) + Trimshat (30) = 36

37 — सप्तत्रिंशत् (Saptatrimshat)
     SAP-ta-trim-shat | Sapta (7) + Trimshat (30) = 37

38 — अष्टात्रिंशत् (Ashthatrimshat)
     ASH-ta-trim-shat | Ashta (8) + Trimshat (30) = 38

39 — नवत्रिंशत् (Navatrimshat)
     NA-va-trim-shat | Nava (9) + Trimshat (30) = 39

40 — चत्वारिंशत् (Chatvarimshhat)
     CHAT-va-rim-shat | From Chatvara (4) × Dasha (10) = 40

─────

THE PATTERN SUMMARY

Numbers 21-29: [unit] + विंशति:
Numbers 31-39: [unit] + त्रिंशत्
Special standalone: त्रिंशत् (30), चत्वारिंशत् (40)

The unit numbers used in compounds:
1 = एक | 2 = द्वा/द्रा | 3 = त्रयो/त्रयस् | 4 = चतुर्/चतुस् | 5 = पञ्च
6 = षड्/षट् | 7 = सप्त | 8 = अष्ट/अष्टा | 9 = नव

Notice how the unit number changes slightly when combined — this is called sandhi (combination of letters) — which you will study in Chapter 6!`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `सङ्ख्या (Sankhya) — Number, numeral. This is the Sanskrit word for number. Interestingly, Sankhya is also the name of one of the oldest schools of Indian philosophy (Sankhya Darshana) — which uses a system of counting and categorising reality.

विंशति: (Vimshati) — Twenty. From "vi" (two) + "dasha" (ten) × = 20. The base word for all numbers 21-29.

त्रिंशत् (Trimshat) — Thirty. From "tri" (three) + "dasha" (ten) = 30. The base word for all numbers 31-39.

चत्वारिंशत् (Chatvarimshhat) — Forty. From "chatvara" (four) + "dasha" (ten) = 40. Note that 40 does not follow the simple pattern of the others — it has its own compound form.

एक (Eka) — One. The root that gives us: ekavachana (singular), ekant (solitude — one alone), Ekatma (one spirit/soul — the concept of unity in Hinduism).

पञ्च (Pancha) — Five. Gives us: Panchayat (assembly of five), Pancha Mahavratas (five great vows of Jainism), Panchatantra (five books of wisdom). The number five is deeply significant in Indian culture.

सप्त (Sapta) — Seven. Gives us: Saptapadi (seven steps of the Hindu wedding), Saptasindhu (seven rivers — the name the Aryans gave to Punjab), Saptarishi (seven great sages).

अष्ट (Ashta) — Eight. Gives us: Ashtanga (eight-limbed — referring to the eight limbs of yoga), Ashtami (the eighth day of the lunar fortnight), Ashta Lakshmi (eight forms of Goddess Lakshmi).

नव (Nava) — Nine. Gives us: Navaratri (nine nights — the festival of nine nights of the goddess), Navagraha (nine planets in Indian astrology). Nava also means "new" — so nava has a dual meaning of nine and new!`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Mathematics has deep roots in India — The decimal system — the most important mathematical invention in human history — was developed in India and expressed in Sanskrit. The number zero (शून्य — Shunya), the concept of infinity (अनन्त — Ananta), and the digit system were all Indian contributions. When you learn Sanskrit numbers, you are touching the source of the mathematical language that the entire world uses today.

Patterns make learning easier — Sanskrit numbers are beautifully logical. Once you know the units (1-9) and the tens (20, 30, 40), you can construct any number in between. This is not memorisation — it is understanding a system. The same principle applies in all of learning: understand the pattern and the rest falls into place.

Small numbers, big connections — The word पञ्च (5) gives us Panchayat (democratic village assembly of five). The word सप्त (7) gives us Saptapadi (the seven steps of the Hindu wedding). Learning numbers in Sanskrit is not just counting — it is unlocking the numbers hidden in culture, tradition, and daily life all around you.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

Pattern for 21-29: Unit + विंशति:
21 एकविंशति: | 22 द्राविंशति: | 23 त्रयोविंशति: | 24 चतुर्विंशति: | 25 पञ्चविंशति:
26 षड्विंशति: | 27 सप्तविंशति: | 28 अष्टाविंशति: | 29 नवविंशति:

30 त्रिंशत् (standalone — thirty)

Pattern for 31-39: Unit + त्रिंशत्
31 एकत्रिंशत् | 32 द्रात्रिंशत् | 33 त्रयस्त्रिंशत् | 34 चतुस्त्रिंशत् | 35 पञ्चत्रिंशत्
36 षट्त्रिंशत् | 37 सप्तत्रिंशत् | 38 अष्टात्रिंशत् | 39 नवत्रिंशत्

40 चत्वारिंशत् (standalone — forty)

Unit numbers in compounds: 1=एक, 2=द्वा/द्रा, 3=त्रयो/त्रयस्, 4=चतुर्/चतुस्, 5=पञ्च, 6=षड्/षट्, 7=सप्त, 8=अष्ट/अष्टा, 9=नव`,
    },
  ],
}

// ─── CHAPTER 6 ────────────────────────────────────────────────────────────────

const chapter6: Chapter = {
  id: 6,
  title: 'Sandhi (Combination of Letters)',
  titleDevanagari: 'सन्धि',
  type: 'Grammar',
  estimatedReadMins: 14,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `In Sanskrit, when two words are placed next to each other, something beautiful happens — the sounds at the junction of the two words combine and change. This phenomenon is called Sandhi (सन्धि) — which means "junction" or "combination."

Sandhi is one of the most distinctive and elegant features of Sanskrit. It is the reason why Sanskrit sounds like music when it is spoken correctly — the sounds flow into each other smoothly, without harsh breaks.

This chapter teaches you two types of Sandhi: Savarna Dirgha Sandhi (सवर्णदीर्घसन्धि:) — where similar vowels combine into one long vowel; and Guna Sandhi (गुणसन्धि:) — where अ/आ combines with इ/ई to make ए, or with उ/ऊ to make ओ.

By the end of this chapter, you will be able to recognise and apply these two types of Sandhi — a fundamental skill in reading and understanding Sanskrit.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `The word सन्धि (Sandhi) literally means "junction" or "joining." It comes from the prefix "sam" (together) and "dhi" (to hold/join).

Sandhi rules describe what happens when two sounds meet. In Sanskrit, there are three main categories of Sandhi:
1. Svara Sandhi (स्वरसन्धि) — Vowel Sandhi — when vowels meet at word junction
2. Vyanjana Sandhi (व्यञ्जनसन्धि) — Consonant Sandhi — when consonants meet
3. Visarga Sandhi (विसर्गसन्धि) — Visarga Sandhi — when "ḥ" (visarga) meets another sound

This chapter covers Svara Sandhi — specifically two types: Savarna Dirgha (same vowel → long vowel) and Guna (a/aa + i/ii → e, a/aa + u/uu → o).

Sandhi is not just a rule — it reflects how spoken Sanskrit naturally sounds. When you say "nava + api" quickly in Sanskrit speech, the two "a" sounds merge naturally into "aa" — giving नवापि (navapi). The rules just codify what the tongue does naturally.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define Sandhi and explain why it occurs in Sanskrit
• Apply Savarna Dirgha Sandhi: अ/आ + अ/आ = आ; इ/ई + इ/ई = ई; उ/ऊ + उ/ऊ = ऊ; ऋ/ॠ + ऋ/ॠ = ॠ
• Apply Guna Sandhi: अ/आ + इ/ई = ए; अ/आ + उ/ऊ = ओ
• Recognise compound words formed through Sandhi (like महेश: = महा + ईश:)
• Solve all 10 Sandhi exercises from the chapter`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 540,
      content: `Let us understand both types of Sandhi fully, with all rules and examples.

─────

WHAT IS SANDHI?

Sandhi means the combination of two letters (or sounds) at the junction of two words. When two words are written or spoken together in Sanskrit, the final sound of the first word and the initial sound of the second word combine according to specific rules.

─────

TYPE 1: सवर्णदीर्घसन्धि: (Savarna Dirgha Sandhi)

Rule: When similar vowels meet, they are substituted by a similar long vowel.

The word "Savarna" means "similar/same class." The word "Dirgha" means "long."
So: same vowel + same vowel = one long vowel.

Rule अ) अ/आ + अ/आ = आ
Examples:
• नव + अपि = नवापि (nava + api = navapi — even nine)
• पुस्तक + आलय: = पुस्तकालय: (pustaka + alayah = pustakalayah — library!)

Rule आ) इ/ई + इ/ई = ई
Examples:
• नदी + इव = नदीव (nadi + iva = nadiva — like a river)
• कपि + ईश: = कपीश: (kapi + ishah = kapeeshah — Lord of monkeys = Hanuman!)

Rule इ) उ/ऊ + उ/ऊ = ऊ
Examples:
• भानु + उदय: = भानूदय: (bhanu + udayah = bhanudayah — sunrise)
• गुरु + उपदेश: = गुरूपदेश: (guru + upadesh = gurupadesh — guru's teaching)

Rule ई) ऋ/ॠ + ऋ/ॠ = ॠ (rit)
Examples:
• पितृ + ऋणम् = पितॄणम् (pitr + rinam = pitrrinam — father's debt)
• मातृ + ऋणम् = मातॄणम् (matr + rinam = matrrinam — mother's debt)

─────

TYPE 2: गुणसन्धि: (Guna Sandhi)

The word "Guna" in Sanskrit grammar refers to the substituted vowel that replaces the original combination. Guna of अ/इ is ए; Guna of अ/उ is ओ.

Rule i) अ/आ + इ/ई = ए
When अ or आ is followed by इ or ई, both are substituted by ए.

Examples:
• उप + इन्द्र: = उपेन्द्र: (upa + indrah = upendrah — another name of Vishnu)
• गण + ईश: = गणेश: (gana + eshah = Ganesh! — Lord of the Ganas)
• हित + उपदेश: = हितोपदेश: (wait, this is rule ii) let me correct...
• महा + ईश: = महेश: (maha + eshah = Mahesh — another name of Shiva!)
• महा + इन्द्र: = महेन्द्र: (maha + indrah = Mahendra — great Indra)

Rule ii) अ/आ + उ/ऊ = ओ
When अ or आ is followed by उ or ऊ, both are substituted by ओ.

Examples:
• महा + उत्सव: = महोत्सव: (maha + utsavah = mahotsavah — great festival)
• हित + उपदेश: = हितोपदेश: (hita + upadesh = Hitopadesha — the famous book of wise stories!)
• यथा + उचितम् = यथोचितम् (yatha + uchitam = yathochitam — as appropriate/fitting)

─────

SANDHI EXERCISES (from the textbook — solve these)

1. यथा + अर्थ: = यथार्थ: (Savarna Dirgha — आ+अ=आ — meaning: true/real)
2. अति + इव = अतीव (Savarna Dirgha — इ+इ=ई — meaning: very much/extremely)
3. मुनि + इन्द्र: = मुनीन्द्र: (Savarna Dirgha — इ+इ=ई — meaning: king of sages)
4. वधू + उत्सव: = वधूत्सव: (Savarna Dirgha — ऊ+उ=ऊ — meaning: wedding festival)
5. भातृ + ऋणम् = भातॄणम् (Savarna Dirgha — ऋ+ऋ=ॠ — meaning: brother's debt)
6. देव + इन्द्र: = देवेन्द्र: (Guna Sandhi — अ+इ=ए — meaning: Indra, king of gods)
7. सर्व + ईश्वर: = सर्वेश्वर: (Guna Sandhi — अ+ई=ए — meaning: Lord of all)
8. ज्ञान + उपदेश: = ज्ञानोपदेश: (Guna Sandhi — अ+उ=ओ — meaning: teaching of knowledge)
9. गङ्गा + उदक: = गङ्गोदक: (Guna Sandhi — आ+उ=ओ — meaning: water of the Ganga)
10. विद्या + उन्नति = विद्योन्नति (Guna Sandhi — आ+उ=ओ — meaning: progress through knowledge)`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `सन्धि (Sandhi) — Junction, combination. The meeting point of two sounds. From sam (together) + dhi (to hold/join). In music, a sandhi is the transitional point between two notes. In Sanskrit, it is the transition point between two words.

सवर्ण (Savarna) — Same class/similar. Referring to vowels of the same type (short and long versions of the same vowel are "savarna" — similar). अ and आ are savarna; इ and ई are savarna; उ and ऊ are savarna.

दीर्घ (Dirgha) — Long. In Sanskrit phonetics, vowels can be short (hrasva) or long (dirgha). A long vowel takes twice as long to pronounce as a short vowel.

गुण (Guna) — In grammar, guna refers to a specific set of substituted vowels: the guna of इ/ई is ए; the guna of उ/ऊ is ओ; the guna of ऋ is अर्.

पुस्तकालय: (Pustakalayah) — Library! This word is formed by Sandhi: पुस्तक (book) + आलय: (house/home) = pustaka-aalayah → pustakalayah. The house of books = library!

महेश: (Mahesh) — One of the names of Lord Shiva. Formed by Guna Sandhi: महा (great) + ईश: (Lord) = महेश: (the Great Lord).

गणेश: (Ganesh) — Lord Ganesha's name is itself a Sandhi! गण (group/ganas) + ईश: (Lord) → गणेश: (Lord of the Ganas). Through Guna Sandhi.

हितोपदेश: (Hitopadesha) — A famous Sanskrit collection of wisdom stories. हित (benefit/welfare) + उपदेश: (teaching) = हितोपदेश: — teachings for one's welfare. Through Guna Sandhi.

यथार्थ (Yathartha) — True, real, genuine. यथा (as it is) + अर्थ: (meaning/substance) = यथार्थ: (as it truly is = real). Through Savarna Dirgha Sandhi.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Language is a living, flowing thing — Sandhi shows us that language is not just a collection of fixed words — it is something that flows and changes when words meet each other. Just as rivers merge and change when they join, Sanskrit words change at their junctions. This flowing, dynamic quality is what makes spoken Sanskrit sound like music.

Patterns reveal deeper order — At first, Sandhi rules may seem like a lot to memorise. But when you see the pattern — similar vowels merge into long vowels, and अ + इ always becomes ए — you realise there is a beautiful, logical order underlying everything. The universe has patterns. Mathematics has patterns. Language has patterns. Learning to see these patterns is one of the most valuable skills you can develop.

The familiar names you know have Sandhi hidden in them — Ganesha, Mahesh, Upendra, Hitopadesha, Pustakalaya — all of these well-known words are actually Sandhi compounds. Once you learn Sandhi, you start seeing the hidden grammar inside words you have always known. This is the joy of Sanskrit — the more you learn, the more you see.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key Sandhi rules to remember:

TYPE 1 — Savarna Dirgha Sandhi (similar vowels → one long vowel):
• अ/आ + अ/आ = आ — e.g. पुस्तक + आलय: = पुस्तकालय:
• इ/ई + इ/ई = ई — e.g. नदी + इव = नदीव; कपि + ईश: = कपीश:
• उ/ऊ + उ/ऊ = ऊ — e.g. भानु + उदय: = भानूदय:
• ऋ/ॠ + ऋ/ॠ = ॠ — e.g. पितृ + ऋणम् = पितॄणम्

TYPE 2 — Guna Sandhi:
• अ/आ + इ/ई = ए — e.g. गण + ईश: = गणेश:; महा + ईश: = महेश:
• अ/आ + उ/ऊ = ओ — e.g. महा + उत्सव: = महोत्सव:; यथा + उचितम् = यथोचितम्

The 10 exercise answers:
1. यथार्थ: | 2. अतीव | 3. मुनीन्द्र: | 4. वधूत्सव: | 5. भातॄणम्
6. देवेन्द्र: | 7. सर्वेश्वर: | 8. ज्ञानोपदेश: | 9. गङ्गोदक: | 10. विद्योन्नति`,
    },
  ],
}

// ─── CHAPTER 7 ────────────────────────────────────────────────────────────────

const chapter7: Chapter = {
  id: 7,
  title: 'Bhutakalah (Past Tense)',
  titleDevanagari: 'भूतकाल:',
  type: 'Grammar',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every language has a past tense — a way of talking about things that have already happened. In Sanskrit, the past tense is called भूतकाल: (Bhutakala). Bhuta means "past" or "that which has been," and Kala means "time."

Sanskrit has several ways to express the past tense. The most important one for Class 6 is the Langlakar (लङ्गलकार:) — the simple past tense used for narrating events that happened in the recent or distant past.

The Langlakar is easy to recognise because all its verb forms begin with the prefix अ (a). For example: the verb "to go" (गम्) becomes अगच्छत् (he/she went), अगच्छताम् (they two went), अगच्छन् (they all went).

This chapter also teaches you the declension table for 'वन' (forest) — an अकारान्त नपुसकलिंग (akaaranta napumsaka linga) noun — a neuter noun ending in 'a'. Understanding this table unlocks the declension of dozens of common Sanskrit nouns.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `In Sanskrit grammar, every verb must agree with its subject in two ways: Person (पुरुष — Purusha) and Number (वचन — Vachana).

Three Persons (Purusha):
• प्रथम पुरुष (Prathama Purusha) — Third person: he/she/it/they
• द्वितीय पुरुष (Dvitiya Purusha) — Second person: you
• तृतीय पुरुष (Tritiya Purusha) — First person: I/we

Three Numbers (Vachana):
• एकवचनम् (Ekavacanam) — Singular: one person/thing
• द्विवचनम् (Dvivachanam) — Dual: exactly two people/things
• बहुवचनम् (Bahuvachanam) — Plural: three or more

So in Sanskrit, you need 3 × 3 = 9 verb forms for any tense. The Langlakar table gives you all 9 forms.

Note: Sanskrit uniquely has a DUAL form (द्विवचन) for exactly two of something — this is different from English (which only has singular and plural) and gives Sanskrit greater precision.

For nouns, this chapter teaches the 'वन' table — the declension of neuter nouns ending in अ (the "a" ending). There are 8 cases (विभक्ति — Vibhakti) × 3 numbers = 24 forms. This table is used for common nouns like फल (fruit), पुष्प (flower), पुस्तक (book), नेत्र (eye), वस्त्र (cloth).`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the structure of the Langlakar (past tense) termination table
• Conjugate the verb पठ् (to read) in all 9 forms of the Langlakar
• Identify the subject of a past tense sentence and match it to the correct verb form
• Understand the 10 example sentences given in the chapter
• Recite the 'वन' शब्दरूप (declension table) — all 8 cases in singular, dual, and plural
• Apply the वन table to other neuter अकारान्त nouns: फल, वस्त्र, पुस्तक, पुष्प, गीत`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `Let us learn the Bhutakala (past tense) and the Vana Shabdarupa together.

─────

PART A — LANGLAKAR TERMINATION TABLE (लङ्गलकार: — Past Tense Endings)

The Langlakar is the simple past tense (लङ् = past tense marker, कार = form/maker).

| | एकवचनम् | द्विवचनम् | बहुवचनम् | पुरुष: |
|---|---|---|---|---|
| | अम् | (आ) व | (आ) म | प्रथम: |
| | स (:) | तम् | त | द्वितीय: |
| | त् | ताम् | अन् | तृतीय: |

Memory tip: Think of the endings in rows:
प्रथम: (3rd person): अम् — (आ)व — (आ)म
द्वितीय: (2nd person): स(:) — तम् — त
तृतीय: (1st person): त् — ताम् — अन्

─────

PART B — पठ् (PATH) — TO READ — Conjugated in Langlakar

| | एकवचनम् | द्विवचनम् | बहुवचनम् | पुरुष: |
|---|---|---|---|---|
| | अपठम् | अपठाव | अपठाम | प्रथम: |
| | अपठ: | अपठतम् | अपठत | द्वितीय: |
| | अपठत् | अपठताम् | अपठन् | तृतीय: |

Reading the table:
अपठम् — I read (1st person singular)
अपठाव — We two read (1st person dual)
अपठाम — We all read (1st person plural)
अपठ: — You (one) read (2nd person singular)
अपठतम् — You two read (2nd person dual)
अपठत — You all read (2nd person plural)
अपठत् — He/she read (3rd person singular)
अपठताम् — They two read (3rd person dual)
अपठन् — They all read (3rd person plural)

─────

PART C — TEN EXAMPLE SENTENCES IN PAST TENSE

1. बालक: पाठशालां अगच्छत्।
   The boy went to school. (Balakah = boy, pathshalam = school, agachchhat = went)

2. छात्रौ पुस्तकं अपठताम्।
   The two students read the book. (Chhatrau = two students, pustakam = book, apathatam = read/they two)

3. बालिका: कथां अकथयन्।
   The girls told a story. (Balikas = girls, katham = story, akathayan = told)

4. त्वं देवालयं अगच्छ:।
   You went to the temple. (tvam = you, devalayam = temple, agachchhah = went)

5. युवां निबन्धं अलिखतम्।
   You two wrote an essay. (yuvam = you two, nibandham = essay, alikhatatam = wrote)

6. यूयं सर्वे गीतं अगायत।
   You all sang a song. (yuyam sarve = you all, geetam = song, agayat = sang)

7. अहं भोजनम् अखादम्।
   I ate food. (aham = I, bhojanam = food, akhadam = ate)

8. आवां जलं अपिबाव।
   We two drank water. (avam = we two, jalam = water, apibav = drank)

9. वयं प्रश्नानि अपृच्छाम।
   We asked questions. (vayam = we, prashnani = questions, aprichchhama = asked)

10. पिता देवम् अपूजयत्।
    Father worshipped God. (pita = father, devam = God, apujayat = worshipped)

─────

PART D — 'वन' अकारान्त नपुसकलिंग शब्दरूप

वन = forest (a neuter noun ending in अ)
This table is used for all neuter nouns ending in अ: फल (fruit), पुष्प (flower), पुस्तक (book), नेत्र (eye), फलक (board/blackboard), व्यजन (fan), वस्त्र (cloth/garment).

| विभक्ति: | एकवचनम् | द्विवचनम् | बहुवचनम् |
|---|---|---|---|
| प्रथमा | वनम् | वने | वनानि |
| द्वितीया | वनम् | वने | वनानि |
| तृतीया | वनेन | वनाभ्याम् | वनै: |
| चतुर्थी | वनाय | वनाभ्याम् | वनेभ्य: |
| पञ्चमी | वनात् | वनाभ्याम् | वनेभ्य: |
| षष्ठी | वनस्य | वनयो: | वनानाम् |
| सप्तमी | वने | वनयो: | वनेषु |
| संबोधन | हे वन | हे वने | हे वनानि |

Note: In the वन table, the Prathama (nominative) and Dvitiya (accusative) singular and dual forms are identical — a distinctive feature of neuter nouns.

─────

PART E — EXERCISE: Apply the वन table to other nouns

The textbook asks you to find the fourth form (चतुर्थी = dative case — "for") for:
1. वन — वानानि (plural) → फल — फलानि (fruits)
2. वन — वनात् (5th case/ablative) → वस्त्र — वस्त्रात् (from cloth)
3. पर्ण — पर्णेन् (3rd case/dual) → पुस्तक — पुस्ताभ्याम् (by means of two books)
4. कर्ण — कर्णस्य (6th case/genitive) → पुष्प — पुष्पस्य (of the flower)
5. यान — यानाभ्याम् (instrumental dual) → गीत — गीताभ्याम् (by/with two songs)

─────

PART F — SENTENCES USING THE VAN TABLE

1. छात्र: फलकं पश्यति। — The student sees the blackboard. (फलकम् = accusative singular)
2. पुष्पाणि तत्र सन्ति। — Flowers are there. (पुष्पाणि = nominative plural)
3. वयं सर्वे नेत्राभ्याम् पश्याम:। — We all see with two eyes. (नेत्राभ्याम् = instrumental dual)
4. फलात् रसं प्राप्नोति/लभते। — He gets juice from the fruit. (फलात् = ablative singular)
5. एतद् वनस्य नाम 'गिर' इति अस्ति। — The name of this forest is 'Gir.' (वनस्य = genitive)
6. पशव: वने वसन्ति। — Animals live in the forest. (वने = locative singular)
7. बालका: पुस्तकानि पठन्ति। — Children read books. (पुस्तकानि = accusative plural)
8. एतद् वस्त्रम् उपयुक्तम् अस्ति। — This cloth is useful. (वस्त्रम् = nominative singular)
9. फलानां रसा: मधुराणि सन्ति। — The juices of fruits are sweet. (फलानाम् = genitive plural)`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `भूतकाल: (Bhutakalah) — Past tense. Bhuta = past/that which has been, Kala = time. The past tense in Sanskrit grammar.

लङ्गलकार: (Langlakar) — The past tense verb form in Sanskrit. The simplest past tense, used for narrating events. All forms have the prefix अ (a) added to the verb root.

पुरुष: (Purusha) — Person (in grammar). Sanskrit has three persons: Prathama Purusha (third person — he/she/they), Dvitiya Purusha (second person — you), and Tritiya Purusha (first person — I/we).

वचनम् (Vachanam) — Number (in grammar). Sanskrit uniquely has three numbers: Ekavachanam (singular), Dvivachanam (dual — for exactly two), Bahuvachanam (plural — for three or more).

शब्दरूप (Shabdarupa) — Declension table. Shabda = word, Rupa = form. The full set of all grammatical forms of a noun — 8 cases × 3 numbers = 24 forms.

विभक्ति (Vibhakti) — Case (grammatical). Sanskrit has 8 cases that show the relationship between a noun and the other words in a sentence.

प्रथमा विभक्ति: (Prathama Vibhakti) — The nominative case — the subject of the sentence.
द्वितीया विभक्ति: (Dvitiya Vibhakti) — The accusative case — the object of the sentence.
तृतीया विभक्ति: (Tritiya Vibhakti) — The instrumental case — by/with.
चतुर्थी विभक्ति: (Chaturti Vibhakti) — The dative case — for/to.
पञ्चमी विभक्ति: (Panchami Vibhakti) — The ablative case — from.
षष्ठी विभक्ति: (Shashti Vibhakti) — The genitive case — of/belonging to.
सप्तमी विभक्ति: (Saptami Vibhakti) — The locative case — in/at/on.
संबोधन (Sambodhana) — The vocative case — direct address (O! Hey!).

अकारान्त (Akaranta) — Ending in the vowel अ (a). "A-kara" = the letter a, "anta" = end. Most common Sanskrit noun type.

नपुसकलिंग (Napumsaka Linga) — Neuter gender. Sanskrit has three genders: Pumlinga (masculine), Strilinga (feminine), and Napumsaka Linga (neuter).`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Precision gives power — Sanskrit's three numbers (singular, dual, plural) give it extraordinary precision. In English, "they went" could mean two or two hundred went. In Sanskrit, अगच्छताम् means exactly two went, and अगच्छन् means three or more went. This precision is not pedantry — it is a commitment to communicating exactly what you mean. In life, precision matters: in science, in medicine, in law, in relationships.

The past shapes the present — Bhutakala (past tense) allows us to tell stories, narrate history, share experiences. All learning is built on the past — every lesson you have ever had is stored in your memory as a past event that shapes your present understanding. Sanskrit's past tense is not just grammar — it is the linguistic foundation for memory, history, and storytelling.

Structure is freedom — The Shabdarupa (declension table) might look like a lot to memorise. But once you know the 24 forms of वन, you know the forms of फल, पुष्प, पुस्तक, नेत्र, वस्त्र and dozens more — for free. The structure liberates you. In Sanskrit, mastering one table unlocks hundreds of words. This is the power of systematic thinking.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

1. Langlakar = past tense. All past tense forms have prefix अ added to the verb root.

2. पठ् (to read) in Langlakar:
   अपठम् (I) | अपठाव (we 2) | अपठाम (we all)
   अपठ: (you 1) | अपठतम् (you 2) | अपठत (you all)
   अपठत् (he/she) | अपठताम् (they 2) | अपठन् (they all)

3. Key sentences: बालक: पाठशालां अगच्छत् (the boy went to school); अहं भोजनम् अखादम् (I ate food); पिता देवम् अपूजयत् (father worshipped God).

4. वन शब्दरूप key forms:
   Singular: वनम् (nom/acc) | वनेन (by) | वनाय (for) | वनात् (from) | वनस्य (of) | वने (in)
   Dual: वने (nom/acc) | वनाभ्याम् (by/for/from) | वनयो: (of/in)
   Plural: वनानि (nom/acc) | वनै: (by) | वनेभ्य: (for/from) | वनानाम् (of) | वनेषु (in)

5. Other nouns that decline like वन: फल (fruit), पुष्प (flower), पुस्तक (book), नेत्र (eye), फलक (board), व्यजन (fan), वस्त्र (cloth).`,
    },
  ],
}

// ─── CHAPTER 8 ────────────────────────────────────────────────────────────────

const chapter8: Chapter = {
  id: 8,
  title: 'Sambhashanam (Conversation — Nutritious Food)',
  titleDevanagari: 'सम्भाषणम्',
  type: 'Conversation',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `One of the best ways to learn any language is through conversation — talking about real situations with real people. This chapter is called सम्भाषणम् (Sambhashanam) — meaning Conversation.

The conversation is titled पौष्टिक-भोजनम् (Paushtik Bhojanam) — Nutritious Food. It is a dialogue between two friends: अनन्या (Ananya) and सिया (Siya). The conversation takes place when Siya is eating a burger and Ananya challenges her to think about whether that is healthy — and teaches her about nutritious food instead.

This chapter is particularly valuable because:
1. It shows Sanskrit being used as a living, conversational language
2. It covers a topic that matters in everyday life — healthy eating
3. It introduces you to future tense forms (खादिष्यामि — I will eat; आनेष्यामि — I will bring)
4. It gives you a model for how to have a simple conversation in Sanskrit

By the end, you will be able to read, understand, and even act out this short play in Sanskrit.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `Sanskrit is not a dead language. It is spoken today by communities in Mattur village in Karnataka (where the whole village speaks Sanskrit daily), by scholars and students across India, and increasingly by people who want to connect with India's living intellectual heritage.

Sambhashanam (conversation) in Sanskrit follows the same structure as conversation in any language — greeting, asking, replying, agreeing or disagreeing, concluding.

This particular conversation introduces several important Sanskrit language features:
• Present tense (खादसि — you eat; जानासि — you know; अस्ति — it is)
• Future tense (खादिष्यामि — I will eat; आनेष्यामि — I will bring; खादिष्यसि — you will eat)
• Expressions of agreement (आम् — yes; अतिशोभनम् — excellent)
• Expressions of explanation (एव — indeed/only; तु — but/however; च — and)
• Polite forms of address (हे — O! / Hey!)

The topic — healthy food — is also a wonderful opportunity to learn Sanskrit food vocabulary: बर्गर (burger), अङ्कुराणि (sprouts), पौष्टिक भोजनम् (nutritious food), स्वास्थ्यवर्धकं भोजनम् (health-promoting food).`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Read the complete Sanskrit conversation with correct pronunciation
• Understand every sentence in the dialogue
• Identify present tense and future tense forms in the conversation
• Explain in English what each character says and why
• Define पौष्टिक भोजनम् (nutritious food) in Sanskrit as explained by Ananya
• Use at least three phrases from this conversation in your own spoken Sanskrit`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `Let us read the conversation between Ananya and Siya, line by line, with full meanings.

─────

CONVERSATION: पौष्टिक-भोजनम् (Nutritious Food)

Characters: अनन्या (Ananya) and सिया (Siya)

─────

अनन्या — हे सिये ! त्वं किं खादसि?
MEANING: Hey Siya! What are you eating?
(हे = O/Hey, सिये = Siya (vocative), त्वम् = you, किम् = what, खादसि = you eat)

─────

सिया — हे अनन्ये ! अहं बर्गर खादामि ।
अनन्ये ! त्वं किं खदिष्यसि?
MEANING: Hey Ananya! I am eating a burger.
Ananya! What will you eat?
(अहम् = I, बर्गर = burger, खादामि = I eat, खदिष्यसि = you will eat — future tense)

─────

अनन्या — हे सिये ! अहम् एतानि अङ्कुराणि खादिष्यामि ।
एतत् तु पौष्टिक भोजनम् अस्ति ।
MEANING: Hey Siya! I will eat these sprouts.
But this is nutritious food.
(एतानि = these, अङ्कुराणि = sprouts, खादिष्यामि = I will eat — future tense, तु = but/however, पौष्टिक = nutritious, भोजनम् = food, अस्ति = is)

─────

सिया — भो अनन्ये ! त्वं जानासि पौष्टिक भोजनं किं भवति?
MEANING: Oh Ananya! Do you know what nutritious food is?
(भो = Oh!, जानासि = you know, पौष्टिक भोजनम् = nutritious food, किम् = what, भवति = becomes/is)

─────

अनन्या — आम् । स्वास्थ्यवर्धकं भोजनम् एव पौष्टिक भोजनं भवति ।
MEANING: Yes. Health-promoting food alone is nutritious food.
(आम् = yes, स्वास्थ्यवर्धकम् = health-promoting, एव = alone/only/indeed, पौष्टिक = nutritious)

─────

सिया — हे अनन्ये ! श्व: अहमपि पौष्टिक भोजनम् एव आनेष्यामि
खादिष्यामि च ।
MEANING: Hey Ananya! Tomorrow I too will bring nutritious food
and will eat it.
(श्व: = tomorrow, अहमपि = I too, आनेष्यामि = I will bring — future tense, खादिष्यामि = I will eat, च = and)

─────

अनन्या — सिये ! अतिशोभनम् । अहं प्रसन्ना अस्मि ।
त्वं पौष्टिकं भोजनस्य महत्वं अवगच्छसि।
MEANING: Siya! Excellent! I am happy.
You understand the importance of nutritious food.
(अतिशोभनम् = excellent/very beautiful, प्रसन्ना = happy/pleased, अस्मि = I am, पौष्टिकम् = nutritious, भोजनस्य = of food (genitive), महत्वम् = importance, अवगच्छसि = you understand)

─────

IMPORTANT VERB FORMS IN THIS CONVERSATION

Present Tense (वर्तमानकाल:):
खादसि — you eat | खादामि — I eat | जानासि — you know
भवति — it is/becomes | अस्मि — I am | अस्ति — it is
अवगच्छसि — you understand

Future Tense (भविष्यकाल:):
खादिष्यसि — you will eat | खादिष्यामि — I will eat
आनेष्यामि — I will bring

─────

THE MEANING OF KEY WORDS

पौष्टिक (Paushtik) — Nutritious, nourishing
अङ्कुराणि (Ankurani) — Sprouts (plural neuter)
स्वास्थ्यवर्धकम् (Swasthyavardhakam) — Health-promoting (Swasthya = health, vardhak = increasing)
अतिशोभनम् (Atishobhanam) — Excellent, very beautiful
महत्वम् (Mahatvam) — Importance (from Maha = great)
श्व: (Shvah) — Tomorrow
आम् (Aam) — Yes (the Sanskrit yes!)`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `सम्भाषणम् (Sambhashanam) — Conversation, dialogue. Sam = together, bhash = to speak, anam = the act. The act of speaking together.

पौष्टिक (Paushtik) — Nutritious, nourishing, strengthening. From the root "push" meaning to nourish, to strengthen. Paushtik food is food that builds and strengthens the body.

अङ्कुर (Ankura) — Sprout, a new shoot. अङ्कुराणि (plural neuter) = sprouts. When seeds are soaked and allowed to germinate, the tiny shoots that emerge are called ankura. Sprouts are among the most nutritious foods — high in protein and vitamins.

स्वास्थ्य (Swasthya) — Health. Swa = self, sthya = established/stable. Swasthya literally means "established in oneself" — a state of complete physical and mental balance. This is the Sanskrit/Ayurvedic concept of health.

वर्धक (Vardhak) — That which increases/promotes. From the root "vridh" = to grow. स्वास्थ्यवर्धकम् = that which promotes health.

अतिशोभनम् (Atishobhanam) — Excellent, very beautiful. Ati = very/beyond, shobhanam = beautiful/auspicious. An expression of enthusiastic approval.

महत्वम् (Mahatvam) — Importance, significance. From Maha (great) + the suffix -tva (making an abstract noun — "the quality of being"). Mahatva = the quality of being great = importance.

श्व: (Shvah) — Tomorrow. An unusual Sanskrit word — it sounds nothing like the Hindi kal (which means both yesterday and tomorrow). Sanskrit has different words for yesterday (ह्य: — hyah) and tomorrow (श्व: — shvah).

आम् (Aam) — Yes. The Sanskrit word for yes! Interestingly, this is also the Hindi word for "come" (आ + म), but in Sanskrit it means yes.

अवगच्छसि (Avagachchhasi) — You understand. Ava + gam (to go) + asi (you) = you grasp/understand. The prefix "ava" gives the verb gam the meaning of comprehension — to "go down" into something deeply = to understand.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Healthy choices need healthy thinking — Ananya doesn't just eat healthy food — she explains why. She tells Siya that स्वास्थ्यवर्धकं भोजनम् एव पौष्टिक भोजनम् (health-promoting food alone is nutritious food). This is a life skill: being able to articulate why a choice is good — not just making it, but understanding it and being able to explain it to others. Good habits are strongest when they are backed by understanding.

Real friends encourage better choices — Ananya does not criticise Siya for eating a burger. She explains, in a friendly way, what nutritious food is. And she says she is happy when Siya decides to change. This is how good friendship works — it encourages better choices through understanding and kindness, not through judgment or criticism.

Language comes alive in conversation — All the grammar you have studied — verb forms, noun cases, sandhi — comes together in conversation. A conversation is the final test of language learning: can you use what you have learnt to actually communicate? This chapter shows you that Sanskrit can do everything a modern language can — express questions, answers, agreements, future intentions, and emotions. It is a living language.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the key things to remember:

1. The conversation is about पौष्टिक-भोजनम् (nutritious food) between Ananya and Siya.

2. Siya was eating a बर्गर (burger). Ananya says she will eat अङ्कुराणि (sprouts) — which is पौष्टिक भोजनम् (nutritious food).

3. Ananya defines nutritious food: स्वास्थ्यवर्धकं भोजनम् एव पौष्टिक भोजनं भवति — health-promoting food alone is nutritious food.

4. Siya agrees: tomorrow (श्व:) she will also bring and eat nutritious food.

5. Ananya says: अतिशोभनम् (excellent!) and अहं प्रसन्ना अस्मि (I am happy) — and notes that Siya now understands (अवगच्छसि) the महत्वम् (importance) of nutritious food.

6. Key verb forms: Present — खादामि (I eat), खादसि (you eat), अस्मि (I am); Future — खादिष्यामि (I will eat), आनेष्यामि (I will bring).`,
    },
  ],
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const CHAPTERS: Chapter[] = [
  chapter1, chapter2, chapter3, chapter4,
  chapter5, chapter6, chapter7, chapter8,
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
