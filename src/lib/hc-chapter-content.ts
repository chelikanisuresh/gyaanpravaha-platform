// History & Civics Chapter Content — Gyaanpravaha
// Connexion Class 6, Project 1
// All 6 chapters — fully written in tuition-teacher style
// Approved content based on scanned textbook (April 2026)

export interface Section {
  id: number
  title: string
  content: string
  minReadSeconds?: number
}

export interface Chapter {
  id: number
  title: string
  type: 'History' | 'Civics' | 'Values'
  estimatedReadMins: number
  sections: Section[]
}

// ─── CHAPTER 1 ────────────────────────────────────────────────────────────────

const chapter1: Chapter = {
  id: 1,
  title: 'The Vedas — Our Sacred Heritage',
  type: 'History',
  estimatedReadMins: 18,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Have you ever wondered where India's oldest culture came from? Who were the first people to bring Sanskrit, the Vedas, and the Gurukul system to this land?

This chapter takes us back to 1500 B.C. — a time when a group of people called the Aryans arrived in India and changed it forever. They brought with them a rich language, a deep knowledge system, and a way of life that still shapes India today. From the sacred Vedas to the system of Gurukuls, everything you will read here is the foundation of ancient Indian civilization.

Get ready to travel back 3,500 years.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is a History lesson. History is the study of the past — of events, people, and civilizations that shaped the world we live in today.

In Class 5, you learnt about Pre-History — the time before written records. In Class 6, you will study Ancient History and Medieval History. This chapter is your first lesson in Ancient History.

The word "ancient" means very old — and the Vedic civilization is one of the oldest known civilizations in the world. The amazing thing is that so much of what the Aryans created thousands of years ago — the Sanskrit language, the Vedas, the Gods they worshipped — is still very much alive in India today.

The main source for everything we know about this period is the Vedas themselves — one of the oldest collections of knowledge in human history.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Compare the culture and growth of trade before and after the coming of the Aryans
• Explain the contribution of the Aryans to literature, religion and philosophy
• Understand the social structure of Vedic society — the family, the caste system and the four stages of life
• Describe the Gurukul system of education and how it was different from schools today
• Appreciate the lasting impact of Aryan civilization on present-day India`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 720,
      content: `Let us walk through this chapter together, section by section.

─────

PART A — Who were the Aryans and where did they come from?

Around 1500 B.C., the advanced Harappan civilization had begun to stagnate. Around this very time, a group of people called the Aryans began to arrive in India.

The Aryans originally lived in Central Asia and the region around the Caspian Sea. Forced by shortage of food and fodder, they left their original home. They were a cultured race — some of them went to Europe, while others came to India through the mountain passes of Hindukush around 1500 B.C. Those who came to India came to be known as the Indo-Aryans.

They used horses and chariots to move from place to place, and they knew the use of iron — both of which were important advantages in that era.

Did you know? In ancient times, Iran was called Persia by the Greeks. But the people there called themselves "Ariya" and their land "Iran" — meaning "land of the Ariya." Iran became the official name in 1935.

─────

PART B — Where did the Aryans settle?

The Aryans settled in two phases. Think of it like moving to a new city — first you stay close to where you arrived, and then you spread outward.

Early Vedic Period (1500 B.C. – 1000 B.C.):
The Aryans first settled in the fertile region of Punjab — the northwest of India. They called this the "Region of the Seven Rivers" or Saptasindhu. They named it "Brahmavarta" meaning "the land of the Gods." The Rig Veda — the oldest of all Vedas — was composed during this period. This is also called the Early Vedic Period or the Rig Vedic Period.

Later Vedic Period (1000 B.C. – 600 B.C.):
During this period, the Aryans moved eastward and settled in the Gangetic valley. They called this region "Madhyadesh" or "Aryavarta" — meaning "land of the Aryans." This period is also known as the Later Vedic Period or the Epic Age — because the great epics Ramayana and Mahabharata belong to this era.

─────

PART C — What is Vedic Literature?

The most important source of knowledge about the Vedic civilization is the Vedas. The word "Veda" means knowledge.

The Vedas are neither a single religious book nor a fixed collection. They grew over centuries and were passed down from generation to generation by word of mouth — recited, memorised, and taught orally, long before they were written down.

The Vedic literature is divided into three classes:

Vedas — The four sacred texts: Rig Veda (oldest, about mythology and hymns), Sama Veda (religious rituals), Yajur Veda (instructions for rituals), and Atharva Veda (spells and healing).

Vedanta — Texts that explain and expand on the Vedas: Samhitas, Brahmanas, Aranyakas, and Upanishads.

Epics — The two great stories: Ramayana (by Sage Valmiki) and Mahabharata (by Sage Ved Vyasa). These are not just stories — they contain deep teachings about dharma, duty, courage and righteousness.

Sanskrit note: Sanskrit has a "half 'a' sound." Because of this, Sanskrit words are sometimes written with an 'a' at the end in English — like Indra or Sapta — but they are not pronounced with a big 'aa' sound.

─────

PART D — How did society change from Early to Later Vedic Age?

This is a very important comparison. Let us look at five key areas of social life and how they changed.

1. Family Life
Early Vedic Age — The family unit was called "Kula." There was a joint family system, and the father was the head — called "Grihapati." Women enjoyed a respectable position. They could choose their husbands in a ceremony called "Swayamwara." There were many women scholars like Gargi and Maitreyi.
Later Vedic Age — The joint family system continued, but the position of women declined. They did not enjoy much freedom, and marriage laws became stricter.

2. Political Life
Early Vedic Age — A number of joint families made a village (gram). Groups of villages formed a clan (vish), and several clans formed a tribe (jana). Each tribe had a king. The king was assisted by a Purohita (main religious advisor), Senani (head of army), and Gramini (village headman).
Later Vedic Age — Kingship became hereditary. The king had absolute power and performed grand sacrifices like "Rajasuya" (Coronation) and "Ashwamedha Yajna" (horse sacrifice) — where a horse was let loose to wander for a year and all territory it covered was claimed by the king.

3. Religion
Early Vedic Age — People mainly worshipped nature Gods: Surya (Sun), Indra (Rain and Thunder), Agni (Fire), Varuna (Water), Vayu (Wind), Som (Plant), Prithvi (Earth), Usha (Dawn), and Yama (Death).
Later Vedic Age — These nature Gods lost importance. Worship became more complex with many rituals and sacrifices. New Gods like Brahma (Creator), Vishnu (Preserver), and Shiva (Destroyer) became prominent.

4. Caste System
Early Vedic Age — The Aryans grouped themselves by the skills involved in certain jobs, creating four Varnas (classes): Brahmans (educated priests and scholars), Kshatriyas (warriors), Vaishyas (farmers, traders and craftsmen), and Shudras (labourers). The system was flexible — one could move between castes.
Later Vedic Age — The caste system became rigid. Occupations became hereditary. One could not change the caste they were born into.

5. Economic Life
Early Vedic Age — The Aryans were nomadic (moving from place to place). The cow was highly valued. They practised agriculture and had craftsmen like chariot makers, weavers and potters.
Later Vedic Age — They settled into a more permanent life. Agriculture continued as the main occupation. Towns and cities grew. The economy included a barter system, and new occupations like dyeing and basket-making became common.

─────

PART E — The Four Ashramas

In the Later Vedic Age, life was divided into four stages called Ashramas. Think of it as a guide for how a person should spend their life.

1. Brahmacharya — The first stage. A person stayed with their guru in a gurukul and received education. This was the time for learning.

2. Grihastha — The second stage. A person got married, set up a home, and led a family life as a householder. This was the time for earning and family responsibility.

3. Vanaprastha — The third stage. After fulfilling family duties, a person gave up worldly life and went away into the forest to meditate. This was the time for reflection.

4. Sanyasa — The fourth and final stage. The person renounced all worldly ties completely and became an ascetic — a wandering spiritual teacher spreading the principles of religion and truth.

This system gave a clear purpose to each phase of life. It was not just about growing old — it was about growing wiser.

─────

PART F — The Gurukul System of Education

When a boy was seven years old, he was sent to a gurukul — the house of the Guru — for 25 years. Gurukuls were situated deep inside forests, away from the noise of cities.

Students led a simple, highly disciplined life. They cleaned the house, gathered wood, and worked in the fields. They were taught orally — there were no textbooks. The student had to listen, remember and repeat. This trained their memory and concentration.

After completing their education, the students gave "Gurudakshina" to their guru — an offering of gratitude. This could be anything from gold to service.

Think about it: our school system has chairs, desks, printed books and digital screens. The Gurukul had none of these — and yet it produced scholars, philosophers, astronomers and kings.

─────

PART G — The Impact of Aryan Civilization

The Aryans left behind a legacy that India still carries today. Here are the key impacts:

Language — Sanskrit, the language of the Aryans, is the mother of most Indian languages. Hindi, Marathi, Bengali, and many other regional languages are derived from Sanskrit. It acts as a unifying force across India.

Agriculture — The Aryans cleared the forests and gave India an agrarian base — making farming the foundation of the Indian economy. This remains true today.

Philosophy — The Vedas, the Upanishads, and the teachings of the two great Epics (Ramayana and Mahabharata) are the foundations of present-day Hindu religion and life.

Religion — The Gods of the Later Vedic Period — Brahma, Vishnu, Shiva, Rama, and Krishna — are worshipped across India today. Yajnas are performed at weddings and religious ceremonies. The Bhagavad Gita, which contains the teachings of Lord Krishna, continues to inspire millions with its philosophy of selfless action.

Thus, the Later Vedic Period, with its rich literature and value system, has left a deep and lasting impact on the present-day life and society of India.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Aryans — A group of people who originally lived in Central Asia and settled in India around 1500 B.C. They gave India the Sanskrit language and the Vedic civilization.

Saptasindhu — Means "Region of the Seven Rivers." The area in northwest India (modern Punjab) where the Aryans first settled. They called it "Brahmavarta" — the land of the Gods.

Vedas — The most sacred texts of Hinduism. The word means "knowledge." There are four Vedas: Rig, Sama, Yajur, and Atharva. They were passed down orally for centuries before being written in Sanskrit.

Early Vedic Period — The time from 1500 B.C. to 1000 B.C. when the Aryans lived in Punjab. Also called the Rig Vedic Period.

Later Vedic Period — The time from 1000 B.C. to 600 B.C. when the Aryans moved to the Gangetic valley. Also called the Epic Age.

Varna — The four social divisions of Vedic society: Brahman, Kshatriya, Vaishya, and Shudra. Originally based on skill and occupation.

Ashramas — The four stages of life in Vedic tradition: Brahmacharya (student), Grihastha (householder), Vanaprastha (forest dweller), and Sanyasa (ascetic).

Gurukul — The ancient Indian residential school where students lived and studied with their guru for 25 years. Located in forests, away from worldly distractions.

Gurudakshina — The offering of gratitude given by a student to their guru after completing their education.

Ashwamedha Yajna — A royal horse sacrifice performed by powerful kings in the Later Vedic Age to claim territory and prove supremacy.

Nomadic — Moving from place to place, with no fixed home. The early Aryans were nomadic before they settled in Punjab.

Agrarian — Related to farming and agriculture. India's agrarian base — established by the Aryans — means farming remains central to the Indian economy.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Knowledge is our greatest heritage — The Aryans gave India its most precious gift: knowledge. The Vedas were not written in books initially — they were memorised, recited, and passed from guru to student for generations. This shows us that knowledge kept alive and shared from heart to heart is more powerful than anything written on paper.

Discipline leads to learning — The Gurukul system taught students to live simply and with great discipline. No luxuries, no shortcuts. Students chopped wood, fetched water, and studied for 25 years. This deep discipline is what produced the great scholars and thinkers of ancient India. The lesson for us: real learning requires real effort.

Respect your roots — So much of modern India — our languages, our Gods, our family values, our philosophy — comes directly from the Aryan civilization. Understanding our roots helps us understand who we are. As the Bhagavad Gita teaches us: do your duty without worrying about results. That teaching is 3,500 years old and still rings true today.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The Aryans arrived in India around 1500 B.C. from Central Asia. They settled first in Punjab (Early Vedic Period) and later moved to the Gangetic valley (Later Vedic Period).

2. The Vedas are the most important source of Vedic civilization. There are four Vedas — Rig, Sama, Yajur, and Atharva — passed down orally for centuries before being written in Sanskrit.

3. Vedic society had four Varnas (Brahman, Kshatriya, Vaishya, Shudra). In the Early Vedic Age the system was flexible; in the Later Vedic Age it became rigid and hereditary.

4. Life was divided into four Ashramas — Brahmacharya (student), Grihastha (householder), Vanaprastha (forest dweller), and Sanyasa (ascetic) — giving clear purpose to each stage of life.

5. The Gurukul was the ancient residential school where students lived with their guru for 25 years in the forest, learning through oral teaching and disciplined service.`,
    },
  ],
}

// ─── CHAPTER 2 ────────────────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'Essence of Hinduism',
  type: 'History',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `You have probably visited a temple, heard a prayer, or seen someone perform a puja at home. But have you ever wondered — what exactly is Hinduism? Where did it come from? What does it believe in?

Hinduism is one of the oldest living religions in the world — over 5,000 years old. Unlike most religions, it has no single founder and no single founding date. It grew and developed over thousands of years as a way of life.

This chapter explores the essence — the heart — of Hinduism. You will learn about its core beliefs, its Gods, its sacred texts, and the principles that guide the lives of millions of Hindus across India and the world.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter continues our study of Ancient Indian history and religion. While the previous chapter focused on the Aryan civilization and the Vedas, this chapter goes deeper into the religious and philosophical system that grew out of that civilization — Hinduism.

The word "Hindu" has been derived from the river Sindhu — the Sanskrit word for the Indus river. The faith that evolved from the Indus region came to be called Hinduism. It is also called Brahmanism — the oldest faith in the world.

What makes Hinduism unique is this: it was not founded by a single person. In the words of Justice Nagarathna, Hinduism "is a way of life which combines many beliefs, philosophies and practices." It is a faith that has developed — not one that was founded.

As the Svetashvatara Upanishad says: "There is only one God who resides deep inside all objects and beings. He is everywhere and the inner-self of all."`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the origin of Hinduism and its basic principles
• Explain the Pantheon of Gods — the Trimurti and the 10 Avatars of Vishnu
• Describe the six basic principles of Hinduism: Dharma, Karma, Moksha, Satya, Ahimsa, and Gau-raksha
• Understand the two categories of Hindu Scriptures: Shrutis and Smritis
• Identify sacred Hindu symbols and explain their significance
• Appreciate the importance of religious tolerance`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 660,
      content: `Let us explore Hinduism together — section by section.

─────

PART A — What is Sanatana Dharma?

Hinduism is referred to as "Sanatana Dharma" — which means "an eternal faith." Sanatana means eternal, and Dharma means righteous duty or the right way of living.

Why is Hinduism called eternal? Because Hindus believe that their faith has no beginning and no end. It is a continuous process, even preceding the existence of our Earth. It is a faith that has developed over thousands of years and accepts all believers. It is deeply tolerant — it respects all paths to God.

Sanatana Dharma is not just a religion. It is a set of eternal and universal ethical and moral principles of virtuous and true living. The Hindu ethical code attaches great importance to values such as truth, right conduct, love, peace and non-violence.

─────

PART B — The Pantheon of Gods

Hindus believe in one supreme God — the Brahman. Everything in the universe is a part of and a manifestation of Brahman. However, Brahman's qualities and powers may be represented by a great diversity of Gods and deities — all of which ultimately come from the Brahman.

The Trimurti — the three forms of God:
Brahma — the Creator (associated with birth)
Vishnu — the Preserver (associated with life)
Shiva — the Destroyer (associated with death)

These three together represent the three prime stages of life: birth, life, and death. The Trimurti are the most important Gods in Hinduism.

The 10 Avatars (Incarnations) of Vishnu:
God incarnates Himself on earth to uphold righteousness. Vishnu has appeared 10 times in different forms:
1. Matsya (fish)
2. Kurma (tortoise)
3. Varaha (boar)
4. Narasimha (man-lion)
5. Vaman (dwarf)
6. Parshuram (man with the axe)
7. Rama (the hero of Ramayana)
8. Krishna (destroyer of Kansa)
9. Buddha
10. Kalki (rider of the white horse — the tenth avatar who has not yet appeared. It is believed Vishnu will appear in this form at the end of the present age to destroy the wicked and re-establish order.)

─────

PART C — Basic Principles of Hinduism

The structure of Hinduism revolves around six core ethical principles. Let us understand each one clearly.

1. Dharma — One's moral obligation or the right way of living. Dharma is not just about religion — it means doing the right thing in every situation. A student's dharma is to study. A parent's dharma is to protect and provide for their children.

2. Karma — Actions performed by each individual during their lifetime. The consequences of those actions influence their present and future lives. Put simply: as you sow, so shall you reap. Good actions lead to good results. Bad actions lead to suffering — if not now, then later.

3. Moksha — The soul is immortal. It is born and reborn continuously in different bodies until it attains liberation from the cycle of birth and death. This liberation is called Moksha — and it is considered the chief goal of life.

4. Satya (Truth) — One of the basic virtues in Hindu ethics. Those who speak the truth without faltering are entitled to a reward. The national motto of India — Satyameva Jayate (Truth alone triumphs) — comes from this principle.

5. Ahimsa (Nonviolence) — Hindus abhor killing or shedding of blood. Devout Hindus practise abstinence from animal flesh. Ahimsa also means living one's life without hurting anyone physically, emotionally, mentally or morally. Mahatma Gandhi carried ahimsa from faith to politics and made it a force that changed the world.

6. Gau-raksha (Cow protection) — Cows are considered sacred in Hinduism. Lord Krishna is associated with cows and his paradise is called Gaushala (cowshed). In the 4th century A.D. during the Gupta period, cow slaughter was made a capital offence.

─────

PART D — Hindu Scriptures

Hinduism has an extensive collection of ancient religious writings — passed on through oral and written tradition across thousands of years.

These scriptures are broadly divided into two categories:

Shrutis — The word Shruti means "heard." These are the firsthand knowledge of universal truth recorded by great rishis (sages). They are considered the most sacred. The four Vedas and 108 Upanishads are examples of Shruti texts.

Smritis — The word Smriti means "memory." These texts help Hindus remember and apply the teachings of the Shrutis in their daily lives. Puranas, Epics (Ramayana and Mahabharata), and the Bhagavad Gita are examples of Smritis.

The Two Great Epics:
Ramayana — The story of Prince Rama of Ayodhya, the seventh avatar of Vishnu. Written by Sage Valmiki in Sanskrit between 200 BC and 200 AD. The popular Hindi version, "Ram Charit Manas," was written by Saint Tulsi Das in the seventeenth century.

Mahabharata — Written by Sage Ved Vyasa. It is the story of the war between the Pandavas and Kauravas. The most important section of this epic is the Bhagavad Gita — the divine dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra. Its most famous teaching: "Karmanye Vadhikaraste ma phaleshu kadachana" — "You have the right to perform your duties, but not to the results of your actions."

─────

PART E — Sacred Symbols of Hinduism

Hinduism has several powerful sacred symbols. Here are three of the most important:

Aum/Om — This is the most sacred symbol in Hinduism. It represents the basic sound of the universe — the primordial vibration from which everything was created. It is used at the beginning of every sacred act or writing.

Shankha (Conch shell) — It symbolizes the origin of the universe from a single source — Brahma and water. The sound it produces when blown represents the primeval sound of OM.

Swastika — This ancient auspicious symbol is a sign of good luck, happiness, prosperity and world peace. In Hinduism it represents:
— 4 directions: North, East, West, South
— 4 seasons: Summer, Winter, Monsoon, Spring
— 4 Vedas: Rig, Yajur, Sama, Atharva
— 4 Yugas: Satya, Treta, Dwapara, Kali

─────

PART F — Doctrines of Hinduism

The key doctrines around which Hinduism is organized:

One Supreme Being — God is present everywhere, in everything.
Trinity — Brahma, Vishnu, Mahesha (Shiva) as the three prime forms.
Dharma — Righteousness of thought, deed and conduct.
Karma — Doctrine of cause and effect.
Moksha — Freedom from the cycle of birth and death.
Re-incarnation — The cycle of birth and death.
Ahimsa — Nonviolence.
Divinity of Vedas — The Vedas are divine revelations.
Respect for all spiritual paths — No path to God is wrong.
Guidance from spiritually awakened Masters.
God incarnates Himself on earth to uphold righteousness.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Sanatana Dharma — Means "eternal faith" — the name Hindus use for their religion. Sanatana = eternal, Dharma = righteous duty.

Brahman — The one supreme God in Hinduism — the universal spirit present in everything and everywhere.

Trimurti — The three primary forms of God: Brahma (Creator), Vishnu (Preserver), and Shiva (Destroyer). Together they represent birth, life and death.

Avatar — An incarnation of God on earth. Vishnu has 10 avatars. Avatar literally means "descent" — God descending to earth to restore order.

Dharma — One's moral obligation or right way of living. It varies with one's role — a student's dharma is to study, a soldier's dharma is to protect.

Karma — The idea that every action has consequences. Good actions lead to good results; bad actions lead to suffering.

Moksha — Liberation from the endless cycle of birth and death. The ultimate goal of Hindu life.

Satya — Truth. Speaking the truth without faltering is a basic virtue in Hinduism. Satyameva Jayate means "Truth alone triumphs."

Ahimsa — Nonviolence. Not causing harm to any living being through thought, word, or action.

Shrutis — Sacred Hindu texts that are considered "heard" — firsthand knowledge of universal truth recorded by great rishis. The four Vedas and 108 Upanishads.

Smritis — Hindu texts that are based on "memory" — they help people understand and apply the Shrutis. Puranas, Epics, and the Bhagavad Gita.

Bhagavad Gita — A section of the Mahabharata. A divine dialogue between Lord Krishna and Arjuna on the battlefield. One of the most important philosophical texts in the world.

Aum/Om — The most sacred sound in Hinduism, representing the basic vibration of the universe. Used at the beginning of every sacred act.

Swastika — An ancient Hindu symbol representing good luck, happiness, prosperity and peace.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Religious tolerance — Hinduism accepts all paths to God. It does not say one way is right and all others are wrong. It says: truth is one, paths are many. This tolerance is one of Hinduism's greatest gifts to the world. In a country as diverse as India, where people of many faiths live together, this spirit of tolerance is absolutely essential.

Truth and nonviolence — Satya and Ahimsa are not just religious principles. They are universal human values. Mahatma Gandhi took these two principles and used them to win India's freedom — without firing a single shot. He showed the world that truth and nonviolence are more powerful than any weapon.

Karma — do good, expect nothing — The principle of Karma teaches us that we are responsible for our actions. We cannot escape the consequences of what we do. But the Bhagavad Gita goes further — it says: do your duty without worrying about the results. This is one of the most profound ideas in human thought.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Hinduism is called Sanatana Dharma — the eternal faith. It has no single founder and has developed over 5,000 years as a way of life that accepts all believers.

2. The Trimurti — Brahma (Creator), Vishnu (Preserver), Shiva (Destroyer) — represent the three prime stages of life: birth, life and death. Vishnu has 10 avatars.

3. The six basic principles of Hinduism are: Dharma (right conduct), Karma (actions and consequences), Moksha (liberation), Satya (truth), Ahimsa (nonviolence), and Gau-raksha (reverence for cows).

4. Hindu scriptures are divided into Shrutis (heard — the Vedas and Upanishads) and Smritis (remembered — the Epics and Bhagavad Gita). The Bhagavad Gita contains Lord Krishna's teachings to Arjuna about selfless action.

5. The three sacred symbols of Hinduism are Om (the universal sound), Shankha (conch shell, representing primeval creation), and Swastika (representing the four directions, seasons, Vedas and Yugas).`,
    },
  ],
}

// ─── CHAPTER 3 ────────────────────────────────────────────────────────────────

const chapter3: Chapter = {
  id: 3,
  title: 'The Great Preachers',
  type: 'History',
  estimatedReadMins: 20,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Imagine a time when religion had become so complicated that ordinary people could not understand it. When priests exploited the poor. When caste decided your worth as a human being. When the idea of questioning anything religious was dangerous.

This was India around 600 B.C. — and it was at exactly this moment that two extraordinary men were born: Mahavira and Gautama Buddha. Their teachings changed India — and then changed the world.

This chapter tells the story of Jainism, Buddhism, and the great preachers behind them. By the end, you will understand why these religions emerged, what they taught, and why their message is still deeply relevant today.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is a History lesson that takes us to the 6th century B.C. — one of the most remarkable periods in world history.

Look at the timeline at the beginning of this chapter:
— 599 B.C.: Birth of Mahavira
— 567 B.C.: Birth of Buddha
— 527 B.C.: Death of Mahavira (attained Nirvana at age 72)
— 487 B.C.: Death of Buddha

This was a period of extraordinary intellectual and spiritual energy across the world. In India, Jainism and Buddhism emerged. In China at the same time, Confucianism and Taoism spread. It was as if the whole world was searching for answers — at the same time.

This chapter covers three great religious traditions: Jainism, Buddhism, and Confucianism — and explains what caused them to emerge, what they taught, and the lasting impact they have had on the world.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand why the Vedic religion became unpopular and why new religions emerged
• Explain the teachings of Jainism — the Five Great Vows and the Three Jewels
• Describe the life and teachings of Gautama Buddha — the Four Noble Truths and the Eightfold Path
• Understand the spread of Buddhism across Asia
• Compare Jainism and Buddhism and explain why both became so popular
• Develop religious tolerance and appreciate the global impact of Indian religions`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 780,
      content: `Let us walk through this important chapter together.

─────

PART A — Why did the Vedic religion lose popularity?

Towards the end of the Later Vedic Age, something had gone wrong with religion. The economy had changed, cities had grown, new occupations had appeared — but religion had not kept up.

Six reasons why the Vedic religion became unpopular:

1. It was controlled by meaningless rites and rituals involving many sacrifices. Followers became very superstitious.

2. The Brahmans — in order to gain more power, wealth and status — made the rituals, texts and the religion itself beyond the reach of common people.

3. Common people could not read the scriptures because they were written in Sanskrit, which only the Brahmans knew.

4. The Brahmans started exploiting people by charging money for performing rites and rituals.

5. The caste system became very rigid. The lower castes (Shudras) were completely isolated — they could not read religious texts or recite scriptures.

6. The masses wanted equality amongst social classes and opposed rigid rituals.

Is it any surprise then that when two great men appeared with a simple, clear message of equality and nonviolence — millions flocked to them?

─────

PART B — Jainism

Jainism is a religion which exemplifies the noblest values: moral upliftment, spiritual elevation, leading to eternal peace and infinite bliss. Jainism gives the message of love, respect, nonviolence and peace — both personal and universal.

The word "Jain" means the conqueror — one who has conquered all their own passions and attained liberation from the cycles of birth and death is called a "Jina." One who follows and worships the Jina is a Jain.

Lord Mahavira (599 B.C. – 527 B.C.):
Mahavira was the 24th Tirthankara (great teacher) of Jainism. He was born in 599 B.C. At the age of 30, he renounced worldly life and became an ascetic. After 12 years of intense meditation and penance, he attained enlightenment (Nirvana). He preached his teachings for 30 years.

At the age of 72 (527 B.C.), Lord Mahavira attained Nirvana — complete liberation — at Pavapuri in Bihar.

The Five Great Vows (Pancha Mahavratas):
Mahavira believed that to achieve Nirvana, one had to live by five spiritual vows. These are followed strictly by Jain monks and nuns, and in a less strict form by regular Jains.

1. Ahimsa (Nonviolence) — not to cause harm to any living being
2. Satya (Truth) — to speak the truth only
3. Asteya (Non-stealing) — not taking anything that belongs to others
4. Brahmacharya (Chastity) — leading a pure, disciplined life
5. Aparigraha (Non-possessiveness) — complete detachment from people, places and material things

Important: All five vows are followed by mind, body and words. The result of sin is the same whether one does it, makes someone else do it, or approves of someone else doing it.

The Three Jewels:
1. Samyak Darshan (Right Belief) — having right belief in God, Guru and religion
2. Samyak Gyan (Right Knowledge) — knowledge which reveals the exact nature of things
3. Samyak Charitra (Right Conduct) — freeing oneself from all impure activities and attaining perfect equanimity

Other teachings of Jainism:
Jainism believes God to be free from love and hatred. It does not believe God to be the creator of the universe. Blind faith is to be condemned. Jains have strict rules about food — they are not allowed to eat root vegetables, meat, honey or eat food after sunset.

The Two Sects:
After Lord Mahavira's salvation, Jainism broke into two sects:
Digambars — monks who do not wear any clothes
Shwetambars — monks who wear white clothes

Literature — The religious books of the Jains are the "Agams" (teachings of Mahavira).

Impact of Jainism:
Jainism has had an extensive effect on Indian culture, language, cuisine and art. Because Jains consider construction of temples a meritorious act, they have constructed an unusually large number of magnificent temples throughout India — including the Dilwara Temple at Mt. Abu (Rajasthan) and the famous Jain statue at Shravanbelagola (Karnataka). Mahavira propounded a casteless and classless society.

─────

PART C — Buddhism

Of the two great new religions, Buddhism spread far more widely — to other countries, and eventually across the whole of Asia.

Gautama Buddha's religious philosophy is called Buddhism.

The Life of Gautama Buddha:
Siddhartha Gautama was born in 567 B.C. into a royal family in Lumbini (present-day Nepal). As a prince, he had every luxury. But he was deeply disturbed by the suffering he saw in the world — old age, sickness, and death.

At the age of 29, he left his palace, his wife and his young son, and went in search of the truth about suffering. After years of intense meditation under a Bodhi tree at Bodh Gaya, he attained enlightenment — and became the Buddha (the Enlightened One).

He gave his first sermon at Deer Park in Sarnath — to five disciples. This event is known as the "Dharmachakra Pravartan" — the turning of the wheel of Dharma.

Buddha's Teachings:
1. The Four Noble Truths (Aryasatyas):
(a) The world is full of suffering.
(b) Desire for worldly things is the main cause of suffering.
(c) Suffering can be overcome by winning over desire.
(d) To end desire, one must follow the Eightfold Path (Ashtanga Marg).

2. The Eightfold Path — Right View, Right Thinking, Right Speech, Right Action, Right Means of Livelihood, Right Effort, Right Kind of Meditation, Right Conduct.

3. Panchasheel — The five rules of conduct for everyday followers:
(a) Ahimsa (nonviolence)
(b) Asteya (non-stealing)
(c) Control over desire
(d) Truthfulness
(e) Not taking intoxicants

Buddha preached in Pali and Prakrit — the language of the common people. This was very important because Sanskrit was accessible only to the elite. His teachings could be understood by everyone.

Spread of Buddhism:
Buddhism received royal patronage from great rulers like Ashoka and Harshavardhana. King Ashoka — after the bloody Kalinga war — was so moved by destruction and suffering that he converted to Buddhism and became its greatest missionary.

Spread across Asia:
Sri Lanka — Ashoka sent his son Mahendra and daughter Sanghamitra to spread Buddhism there.
China — The Buddhist scholar Bodhi Dharma travelled from India to China in 475 AD.
Japan and Korea — Buddhism spread from China.
Tibet — Through the efforts of the Indian scholar Shantarakshita.
Western Countries — In recent times, Buddhism has become popular in Western nations.

The two sects of Buddhism:
Hinayana — Remained close to original teachings. Believed Buddha was a preacher.
Mahayana — Believed in rituals, sacrifice, and worshipped Buddha as God.

Literature — The original teachings of the Buddha are found in "The Three Baskets" — the Tripitikas — composed in Pali. The Jataka tales contain stories of the Buddha from his previous births.

─────

PART D — Why did Buddhism and Jainism become so popular?

Both religions spread across India and the world in a short time. Here is why:

• They rejected the rigidities imposed on society by the Brahmins.
• They stressed teachings which were easily understood and taught in Pali and Prakrit — the language of common people.
• They did not believe in costly rituals and sacrifices. Anyone, irrespective of caste, could follow these paths.
• They laid emphasis on nonviolence.
• They did away with the priestly class and believed in equality of all.
• They laid emphasis on a clearly specified social code of conduct.
• Merchants and traders were attracted to these religions because they stressed equality of all people. They gave huge donations for the construction of monasteries, viharas and stupas.

─────

PART E — Confucianism

At about the same time as Buddhism and Jainism were becoming popular in India, China was also experiencing the rise of a new philosophy — Confucianism.

Confucius was a great Chinese philosopher and reformer. He was born in 551 B.C. in a poor but respectable family of the Lu province in China. He lost his father at a very young age, but despite hardships, he mastered the six arts — ritual, music, archery, charioteering, calligraphy and arithmetic. He became a teacher.

Confucius laid stress on right conduct, love and benevolence. He believed that to become a superior person, the right path must be followed. He did not discuss God or spiritual matters — he was a "practical philosopher" who wanted to establish a well-organised and morally sound society. He was convinced this could be achieved through strong family ties, respect for traditions, ancestors and elders.

─────

PART F — Conclusion

India is home to three great world religions — Hinduism, Jainism and Buddhism. People of these three faiths are still found in our country. Later, two more great religions emerged in other parts of the world — Christianity and Islam.

India consists of people from all these religions. We must learn to respect all religions. They teach us values which are common to all — tolerance, patience, love, respect, honesty, loyalty, honour and much more. If you ponder over all these aspects, you will realise that they are the values we need to make our lives happy and peaceful.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Jainism — A religion founded by Lord Mahavira that emphasises nonviolence, truth, non-stealing, and non-possessiveness. Jain means "conqueror" — one who has conquered their own passions.

Mahavira — The 24th Tirthankara (great teacher) of Jainism. Born 599 B.C. Attained enlightenment after 12 years of meditation. Taught the Five Great Vows.

Buddhism — A religion founded by Gautama Buddha based on the Four Noble Truths and the Eightfold Path. Spread from India across the whole of Asia.

Gautama Buddha — Born 567 B.C. as Prince Siddhartha. Left his palace to understand suffering. Attained enlightenment under a Bodhi tree at Bodh Gaya.

Nirvana — In Jainism and Buddhism: the state of complete liberation from the cycle of birth and death. The highest goal.

Five Mahavratas — The Five Great Vows of Jainism: Ahimsa (nonviolence), Satya (truth), Asteya (non-stealing), Brahmacharya (chastity), Aparigraha (non-possessiveness).

Three Jewels — The three guiding principles of Jainism: Right Belief, Right Knowledge, Right Conduct.

Four Noble Truths — The core of Buddha's teaching: (1) Life is suffering, (2) Suffering is caused by desire, (3) Suffering can end, (4) The Eightfold Path ends suffering.

Eightfold Path — Buddha's guide for overcoming desire: Right View, Right Thinking, Right Speech, Right Action, Right Livelihood, Right Effort, Right Meditation, Right Conduct.

Panchasheel — The five rules of conduct for Buddhist followers: nonviolence, non-stealing, control over desire, truthfulness, no intoxicants.

Tripitikas — "The Three Baskets" — the original teachings of the Buddha, composed in Pali.

Confucianism — A philosophy founded by Confucius in China around 551 B.C. focused on right conduct, family values, respect for elders, and building a morally sound society.

Ashoka — The Mauryan emperor who converted to Buddhism after the Kalinga war and became its greatest missionary, spreading the faith across Asia.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Equality of all human beings — Both Mahavira and Gautama Buddha challenged the rigid caste system that had made people unequal. They said: it does not matter what family you were born into. What matters is how you live and how you treat others. This message of equality was revolutionary 2,600 years ago — and it is still needed today.

Nonviolence is the highest duty — Both Jainism and Buddhism place Ahimsa — nonviolence — at the centre of their teaching. Not just nonviolence in action, but in thought and word too. Think about how differently we would treat each other if we took this seriously.

Religious tolerance — The conclusion of this chapter says it best: all religions share common values — tolerance, patience, love, respect, honesty. No one religion has a monopoly on goodness. Learning about other religions does not weaken your faith — it strengthens your understanding of what all faiths are trying to say.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Jainism and Buddhism emerged in the 6th century B.C. as a reaction against the corrupt and rigid practices of the Vedic religion — especially the exploitation by Brahmins and the rigid caste system.

2. Jainism was founded by Lord Mahavira (599–527 B.C.). Its core teachings are the Five Great Vows (Ahimsa, Satya, Asteya, Brahmacharya, Aparigraha) and the Three Jewels (Right Belief, Right Knowledge, Right Conduct).

3. Buddhism was founded by Gautama Buddha (567–487 B.C.). Its core teachings are the Four Noble Truths (suffering, desire, overcoming desire, Eightfold Path) and the Panchasheel (five rules of conduct).

4. Buddhism spread across Asia — to Sri Lanka, China, Japan, Korea, Tibet and Western countries — through the patronage of great rulers like King Ashoka.

5. Both religions became popular because they rejected costly rituals, used common languages (Pali and Prakrit), promoted equality of all, and emphasized nonviolence and a clear moral code of conduct.`,
    },
  ],
}

// ─── CHAPTER 4 ────────────────────────────────────────────────────────────────

const chapter4: Chapter = {
  id: 4,
  title: 'The Preamble',
  type: 'Civics',
  estimatedReadMins: 15,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every country needs rules. A family has rules. A school has rules. A sports team has rules. Without rules, everything falls apart.

India has 1.4 billion people — from different religions, languages, regions, and backgrounds. How do they all live together as one nation? The answer is: the Constitution of India.

But the Constitution is a very long and detailed document. Its very first page — the Preamble — tells us in just a few lines what kind of country India chose to be when it became independent. It is like the vision statement of our nation.

This chapter explains what the Preamble says, what it means, and why every Indian citizen should know and understand it.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is a Civics lesson. While History teaches us about the past, Civics teaches us about how our country is governed today — the rights we have, the duties we must fulfil, and the institutions that run our democracy.

The Constitution of India is the supreme law of the land. It was adopted on 26th November 1949 and came into force on 26th January 1950 — which is why we celebrate Republic Day every year on that date.

The Constitution was handwritten by Prem Behari Narain Raizada in calligraphy. The document was written in both English and Hindi. It took six months to complete — and he did not charge any money for it. Each page was uniquely decorated by artists from Shantiniketan, including Beohar Rammanohar Sinha and Nandalal Bose.

Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constitution and is considered its chief architect.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the relevance of a Constitution and why every country needs one
• Explain what the Indian Constitution is and how it was made
• Understand the Preamble and what each key term in it means
• List the six Fundamental Rights guaranteed by the Constitution
• Know the Fundamental Duties of Indian citizens`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `Let us understand the Constitution and the Preamble together.

─────

PART A — What is a Constitution?

The Constitution of a country is a very important document. No government can be run without a clear set of laws. In simple words, the Constitution of a country is a body of laws according to which the country is governed.

It lays down the guidelines and the powers of a particular government agency — whether it is the Central Government, State Government, or Local Government.

It is a framework within which a government has to work. It tells the government what it can do and what it cannot do.

─────

PART B — What is the Preamble?

The Preamble is the introduction to the Constitution. It has been given on the very first page of the Constitution and is a part of it. It states certain goals which the Constitution seeks to achieve.

The Preamble tells us what kind of country India should be. Let us understand every word of it.

"WE, THE PEOPLE OF INDIA..."
This means: all the people of India — big or small, rich or poor, of every region and every religion. The Constitution belongs to the people — not to the government or the leaders.

"...having solemnly resolved to constitute India into a..."

SOVEREIGN — India is an independent country. No other country can tell India what to do. India makes its own decisions.

SOCIALIST — The wealth of the nation should be shared by all Indian people, so that everyone has what they need. It is not just for the rich.

SECULAR — There is no official state religion. The government does not give more importance to one religion over another. In India, all people are free to follow whatever religious beliefs they like.

DEMOCRATIC REPUBLIC — The government is elected by the people. India will not have a king or queen as its head — the head will be a President elected by the people's representatives.

"...and to secure to all its citizens..."

JUSTICE — Social, economic and political. All people should have a fair chance to earn their living. All people should be able to vote freely. Fair treatment for everyone.

LIBERTY — Of thought, expression, belief, faith and worship. Freedom to speak without fear. Freedom to think what they please, to believe what they like, to practise whatever religion they choose — as long as none of these things harm anyone else.

EQUALITY — Of status and opportunity. Whether rich or poor, man or woman, of whatever region or religion — everyone should have an equal and fair opportunity to have a good life.

FRATERNITY — Ensuring the dignity of the individual and the unity and integrity of the Nation. All Indians should try to live like brothers and sisters. All people should be treated with respect. The country should remain united, whole and unharmed.

─────

PART C — Fundamental Rights

The Constitution of India guarantees six Fundamental Rights to the citizens of India. These are rights that the government cannot take away from you.

1. Right to Equality — Everyone is equal before the law. The state cannot discriminate between people on the basis of caste, creed, colour, gender, religion, or place of birth.

2. Right to Freedom — This right guarantees:
(a) Freedom of speech and expression
(b) Freedom to assemble peacefully without arms
(c) Freedom to move freely throughout India
(d) Freedom to join associations and unions
(e) Freedom to reside and settle in any part of India
(f) Freedom to practise any profession, trade or business

3. Right against Exploitation — It prohibits beggary and other forms of forced labour. It prohibits trafficking of human beings. It prohibits employment of children below the age of 14 years in factories, mines and other hazardous occupations.

4. Right to Freedom of Religion — Citizens of India have the right to profess, practise and propagate the religion of their choice. There is no state religion in India.

5. Cultural and Educational Rights — Different cultural groups have the freedom to preserve and promote their language, script and culture. Educational institutions maintained by state funds are open to all — no one can be denied admission on the grounds of religion, colour, caste or creed.

6. Right to Constitutional Remedies — If any of your Fundamental Rights are violated, you have the right to go to court. A citizen can approach the courts for the violation of their Fundamental Rights.

─────

PART D — Fundamental Duties

In 1976, Fundamental Duties of citizens were added to the Constitution by the 42nd amendment. Rights come with responsibilities — and these duties remind every citizen of what they owe to their country.

The Fundamental Duties of every Indian citizen are:
• To respect the Constitution, National Flag and National Anthem
• To preserve the rich cultural heritage of India
• To follow the ideals of our freedom struggle
• To protect the natural environment and develop compassion for living creatures
• To protect the sovereignty, unity and integrity of India
• To develop a scientific attitude and spirit of inquiry
• To defend the country and render national service
• To safeguard public property and abjure violence
• To promote harmony and brotherhood and to respect the dignity of women
• To strive for excellence in all spheres
• A parent or guardian has the duty to provide education to their child between the ages of six and fourteen years`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Constitution — The supreme law of a country. A body of laws according to which the country is governed. India's Constitution came into force on 26th January 1950.

Preamble — The introduction to the Constitution. It appears on the very first page and states the goals the Constitution seeks to achieve for India.

Sovereign — Completely independent. A sovereign country makes its own decisions and no other country can tell it what to do.

Socialist — A system where the wealth of the nation is shared fairly among all people so everyone has what they need.

Secular — No official state religion. The government treats all religions equally and does not favour one religion over another.

Democratic Republic — A government elected by the people. The head of state is an elected President, not a king or queen.

Justice — Fair treatment for all people — socially, economically and politically.

Liberty — The freedom to think, speak, express, believe, and worship as one chooses — without harming others.

Equality — Equal status and opportunity for all people, regardless of caste, religion, gender or wealth.

Fraternity — A spirit of brotherhood and sisterhood among all citizens. Living together with dignity and unity.

Fundamental Rights — Six rights guaranteed by the Constitution to every Indian citizen that the government cannot take away.

Fundamental Duties — Eleven duties added in 1976 that remind citizens of their responsibilities towards their country and fellow citizens.

Right against Exploitation — The Fundamental Right that prohibits forced labour, human trafficking, and employment of children under 14 in hazardous occupations.

42nd Amendment — The constitutional amendment of 1976 that added Fundamental Duties to the Constitution.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Every citizen matters — The Preamble begins with "We, the People of India." Not "We, the Government." Not "We, the Rich." Every single Indian — big or small, rich or poor, man or woman, from every region and religion — is equally important. The Constitution belongs to all of us.

Rights come with duties — The Constitution gives us six powerful Fundamental Rights. But it also gives us Fundamental Duties. This is a profound lesson: you cannot only take from your country. You must also give back — by protecting it, respecting it, and contributing to it.

Unity in diversity — India is the most diverse country in the world. Yet the Preamble commits India to Fraternity — living like brothers and sisters despite all differences. This is not just an ideal. It is a daily choice that every Indian citizen must make.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The Constitution is the supreme law of India. It came into force on 26th January 1950. It was handwritten by Prem Behari Narain Raizada, and its chief architect was Dr. B.R. Ambedkar.

2. The Preamble is the introduction to the Constitution. It declares India to be a Sovereign, Socialist, Secular, Democratic Republic.

3. The Preamble promises all citizens Justice (fair treatment), Liberty (freedom), Equality (equal opportunity), and Fraternity (brotherhood and unity).

4. India's Constitution guarantees six Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.

5. Fundamental Duties were added in 1976 by the 42nd Amendment. They include respecting the Constitution, protecting the environment, defending the country, promoting harmony, and striving for excellence.`,
    },
  ],
}

// ─── CHAPTER 5 ────────────────────────────────────────────────────────────────

const chapter5: Chapter = {
  id: 5,
  title: 'India Lives in Villages (Rural Administration)',
  type: 'Civics',
  estimatedReadMins: 14,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Did you know that more than 60% of India's population lives in villages? India truly lives in its villages — in the fields, the farms, the small markets, and the humble homes of rural India.

But who looks after these villages? Who fixes the roads, provides clean water, maintains the school, and settles local disputes? The answer is: the Panchayat — India's oldest and most democratic form of local government.

This chapter explains how rural India is governed — from the smallest village Panchayat to the district-level Zila Parishad. By the end, you will understand how democracy works not just in Parliament, but right at the grassroots — in every Indian village.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is a Civics lesson about local self-government in rural India.

Mahatma Gandhi had a dream: he believed that true democracy in India could only be achieved when the village communities governed themselves. He called this "Gram Swaraj" — village self-rule.

After independence, this dream was given shape through the Panchayati Raj system. The village Panchayat is the smallest unit in the system of local self-government in rural areas.

A landmark moment came in 1993 — when the 73rd Amendment to the Indian Constitution was passed. This gave constitutional status to Panchayats, allowed them to spend money on projects they chose, and recognised their growing role as local governing bodies.

The Ministry of Panchayati Raj has been celebrating the National Panchayati Raj Day (NPRD) on 24th April every year since 2010 — the day the 73rd Amendment came into force.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the meaning of rural local self-government and why it is important
• Explain what a Panchayat is, how it is formed, and who its members are
• Describe the three-tier Panchayati Raj system: Gram Panchayat, Block Samiti, Zila Parishad
• List the key functions of the Village Panchayat
• Understand the significance of the Village Panchayat in Indian democracy`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 540,
      content: `Let us understand rural India's system of governance together.

─────

PART A — What is a Panchayat?

India is a land of villages. Each village has its own problems — and only the people living in that village truly understand those problems. They are the best people to solve them.

But they must do so in an organised and systematic way. This requires a local government in the village. That local government is called the Panchayat.

In its original sense, a Panchayat is a committee of five elderly and responsible people of a village whose decisions and judgements are respected by all. (Panch = five, Ayat = committee.)

When the British started ruling India, they took over the functions of the Panchayat through government officials. The Panchayat stopped functioning. After independence, village Panchayats were revived under the Constitution.

Today, the village Panchayat is the smallest unit in the system of local self-government in rural areas. Normally, there is a panchayat for every village with a population of one thousand or more. For smaller villages, a Panchayat is formed by combining two or more small villages. It is elected for five years. Seats are reserved for Scheduled Tribes in proportion to their population.

─────

PART B — The Gram Sabha (Village Assembly)

Every village has a Gram Sabha. Every adult — male or female — who is 18 years of age or above, is a member of the Gram Sabha. This means everyone has a voice.

The Gram Sabha must meet at least twice a year. It passes the annual budget and discusses the major problems of the village. The members of the Gram Sabha elect the Gram Panchayat through a secret ballot.

Think about this — in the Gram Sabha, every adult citizen of the village can speak, question, and vote. This is democracy at its most direct and local level.

─────

PART C — The Sarpanch and the Panchayat Secretary

The Sarpanch (Village Pradhan):
The head of the Panchayat is called the Sarpanch. In different states, the Sarpanch is known by different names — in Punjab and U.P. it is Sarpanch, in Bihar it is Mukhiya. It is the duty of the Sarpanch to call meetings of the Panchayat and the Gram Sabha. In the Sarpanch's absence, a Deputy Sarpanch (Deputy Pradhan) presides over the meetings.

The Panchayat Secretary:
The Panchayat Secretary is a paid officer of the Panchayat. He maintains records of all the work done by the Panchayat and also prepares its accounts. Unlike the Sarpanch who is elected, the Secretary is an appointed government official.

─────

PART D — Works and Services of the Village Panchayat

The Panchayat does a lot for the village. Here are its key functions:

1. Construction and repair of village roads
2. Planting of trees and their protection
3. Construction and repair of village wells and tanks
4. Provision of light on roads and streets
5. Provision of clean drinking water
6. Sanitation and public health
7. Maintenance of public places
8. Cleanliness of public streets
9. Collection of rents
10. Keeping a record of births and deaths
11. Maintenance of burial and cremation grounds
12. Removal of encroachments on roads and streets
13. Supply of good seeds and fertilizers

All of these services directly affect the day-to-day quality of life of villagers. Without the Panchayat, who would repair the broken road? Who would ensure clean drinking water? Who would maintain the school building?

─────

PART E — Significance of the Village Panchayat

The Village Panchayat plays three very important roles:

1. They help people solve their own problems — reducing the burden on the central and state government.

2. They provide the first lesson in democracy — by giving village voters a chance to elect their own leaders, the Panchayat teaches democracy from the grassroots.

3. They teach villagers to be self-dependent — to develop and use their own resources rather than waiting for everything from the government.

─────

PART F — The Panchayati Raj System (Three Tiers)

The Panchayati Raj System operates at three levels — from the village all the way up to the district.

Tier 1 — Gram Panchayat (Village Level)
This is the most basic unit — the local government of the village. Directly elected by the Gram Sabha.

Tier 2 — Block Samiti (Block Level)
Also called Panchayat Samiti or Khand Samiti. A Block is formed by a number of villages (generally 20 to 50 villages). The Block Samiti works to execute development programmes, encourage agriculture and small-scale industries, and help in removing illiteracy.

The Block Development Officer (BDO) is the executive officer of the block, appointed by the state government. The Block Samiti's income comes from state government grants, taxes on lands and houses, and voluntary contributions.

Tier 3 — Zila Parishad (District Level)
This is the third and highest tier of the Panchayati Raj. The Zila Parishad co-ordinates and supervises the work of the Gram Panchayats and Block Samitis within its jurisdiction. India has 641 districts — so there are 641 Zila Parishads. The Zila Parishad prepares a comprehensive development plan for the whole district and co-ordinates grants from the state government.

─────

PART G — Conclusion

Mahatma Gandhi saw the self-government of the village community as the basis for Indian democracy. His ideas provided a great source for the establishment of the Panchayati Raj System. This system works at the village level for development and making communities self-reliant.

The 73rd Amendment of 1993 gave the Panchayats constitutional status, greater powers, and allowed them to spend funds on development projects they chose. This was a landmark step in deepening democracy in India.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Panchayat — The local government of a village. Panch means five and Ayat means committee. Originally a committee of five wise elders. Today it is the smallest unit of local self-government in rural India.

Gram Sabha — The village assembly. Every adult citizen (18 years and above) is a member. It meets at least twice a year and elects the Gram Panchayat by secret ballot.

Sarpanch — The elected head of the Village Panchayat. Called Mukhiya in Bihar and Sarpanch in Punjab and U.P. Responsible for calling Panchayat meetings.

Panchayat Secretary — A paid government official who maintains records of the Panchayat's work and prepares its accounts.

Panchayati Raj — The three-tier system of local self-government in rural India: Gram Panchayat (village), Block Samiti (block), Zila Parishad (district).

Block Samiti — The second tier of the Panchayati Raj. Covers 20 to 50 villages. Executes development programmes and encourages agriculture. Also called Panchayat Samiti or Khand Samiti.

Block Development Officer (BDO) — The executive officer of the block, appointed by the state government. Manages block-level development.

Zila Parishad — The third and highest tier of the Panchayati Raj, operating at the district level. Coordinates all Gram Panchayats and Block Samitis in the district.

73rd Amendment — The constitutional amendment passed in 1993 that gave Panchayats constitutional status, greater powers, and allowed them to spend money on development projects they chose.

National Panchayati Raj Day — Celebrated every year on 24th April since 2010 — the day the 73rd Amendment came into force in 1993.

Gram Swaraj — Mahatma Gandhi's vision of village self-rule — the idea that true democracy begins at the village level.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Democracy begins at the grassroots — We often think of democracy as Parliament, elections, and political leaders. But the Panchayati Raj system teaches us that real democracy happens at the village level — where ordinary people elect their leaders, attend the Gram Sabha, and have a direct say in decisions that affect their daily lives.

Self-reliance — The Panchayat teaches villages to solve their own problems. Rather than waiting for the government to fix every road and well, the village community takes responsibility for itself. This spirit of self-reliance is essential for real development.

Everyone's voice matters — In the Gram Sabha, every adult — man or woman, rich or poor — has an equal vote and an equal voice. This is a powerful reminder that in a democracy, no one person or group is more important than another. Your voice counts.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The Panchayat is the local government of the village — the smallest unit of self-government in rural India. It is elected for five years by the Gram Sabha (village assembly of all adults 18 and above).

2. The Sarpanch is the elected head of the Panchayat. The Panchayat Secretary is a paid government official who maintains records and accounts.

3. The Village Panchayat performs 13 key services: roads, trees, wells, lighting, drinking water, sanitation, public places, cleanliness, rent collection, birth/death records, cremation grounds, encroachments, and seeds/fertilizers.

4. The Panchayati Raj System has three tiers: Gram Panchayat (village level), Block Samiti (block level covering 20–50 villages), and Zila Parishad (district level — highest tier).

5. The 73rd Amendment of 1993 gave Panchayats constitutional status and greater powers, allowing them to spend funds on their own development projects. National Panchayati Raj Day is celebrated on 24th April every year.`,
    },
  ],
}

// ─── CHAPTER 6 ────────────────────────────────────────────────────────────────

const chapter6: Chapter = {
  id: 6,
  title: 'The Power of Determination',
  type: 'Values',
  estimatedReadMins: 10,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `"Determination is the golden rule to success."

Have you ever wanted to give up halfway through something difficult — a tough exam, a sports practice that was going badly, a project that felt impossible? In that moment, what you needed was determination — the strong inner resolve to keep going no matter what.

This chapter is different from the other chapters. It is not about ancient history or government systems. It is about you — and the power of your own mind, speech and body to shape your life.

This chapter teaches us that determination, when aligned across three things — mind, speech and body — creates a unity that leads to happiness and peace. Let us understand what that means.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is a Values lesson. Values are the principles and beliefs that guide how we live and treat others.

While History and Civics chapters teach us about the world outside — ancient civilizations, government systems, rights and duties — this chapter turns inward. It asks us to look at ourselves.

The chapter draws deeply from the Jain philosophy of nonviolence — not just as a rule for living, but as a deep commitment of the mind, speech and body together. When all three are aligned, we become truly non-violent — in thought, in word, and in action.

This is also called yoga — not just the physical postures, but the deeper unity of the external body and the internal mind. When determination guides this unity, it brings happiness and peace.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the significance of determination in achieving success
• Learn about the three aspects of the self: Mind, Speech and Body
• Understand how determination across all three aspects establishes unity and peace
• Appreciate the three ways of performing actions and your responsibility in each
• Develop the resolve to align your thoughts, words and actions towards positive outcomes`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 360,
      content: `Let us understand the power of determination together.

─────

PART A — What is Determination?

Determination is the golden rule to success.

When a desire becomes strong enough, it takes the form of determination. Determination is not just wanting something — it is deciding firmly that you will achieve it, and then working towards it with your full mind, speech and body.

There are different aspects of determination. The first of them is yoga — not just physical yoga, but the yoga of mind, speech and body. When we practise determination with all three of these, the unity between the external and the internal body is established. This is what leads to lasting happiness and peace.

─────

PART B — The Three Aspects of the Self

1. MIND
That which thinks is mind. Mind performs three functions: recalling, contemplating and imagining.

When we take a vow — a firm determination — that we will not even think of violence, the memory, the contemplation and the imagination of the mind all work together to stop us from indulging in any form of violence.

Think about it this way: if you have firmly made up your mind that you will not cheat in an exam, then even when the opportunity arises, your mind immediately stops you. That is the power of a firm mental determination.

2. SPEECH
Sounds that make some sense are called speech. When we are determined that we will not commit violence through speech, our mind controls our speech and stops us from using language that may hurt others.

Harsh words, cruel jokes, humiliating comments — these are all forms of violence through speech. When we are determined to be kind in our words, we think before we speak. And what we say becomes gentle, honest and constructive.

3. BODY
The body parts and sense organs which the consciousness uses are called the body. When we are determined that we will not allow the body to become violent, our mind stops us from committing violence — that is, from attacking anyone physically or mentally.

The body obeys the mind. If the mind is determined, the body follows.

─────

PART C — Three Ways of Performing Actions

Action is something that we do, often for a particular purpose. Our mind governs our actions, speech voices our acts, and the body performs or carries out those commands.

There are three ways of performing actions:

1. Doing oneself — When a person does something himself. For example, if you help a classmate understand a lesson, that is doing it yourself.

2. Making others do — When a person does something with the help of other members of the family and society, or makes them do it. For example, if you ask your friend to help someone carry a heavy bag.

3. Approving what others do — Certain jobs a person neither does himself nor makes others do — but simply approves of what others do. For example, if someone bullies a student and you laugh or stay silent, you are approving.

This is an important principle: the responsibility for an action is the same whether you do it yourself, ask someone else to do it, or simply approve of it. Silence in the face of wrongdoing is also a form of participation.

─────

PART D — Alignment leads to Happiness

Mind, body, speech and actions, if determined to align towards a positive outcome, will always bring happiness and peace.

Think about a student who has determined to be honest:
— Their mind does not think of ways to cheat
— Their speech does not encourage others to cheat
— Their body does not carry cheat sheets into the exam
— They do not approve when others cheat

All four are aligned. The result? Clear conscience, genuine success, and lasting peace.

Now think about the opposite — a student who cheats:
— Their mind is always anxious about getting caught
— Their speech is full of excuses
— Their body is tense during the exam
— Inside, they know what they did was wrong

No alignment — and no peace.

This is the essence of The Power of Determination.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Determination — The firm resolve to achieve something, no matter how difficult. When a desire becomes strong enough, it becomes determination. It is considered the golden rule to success.

Yoga — In the context of this chapter, yoga refers to the deeper unity of mind, speech and body — not just physical postures. When all three are aligned, inner peace is achieved.

Mind — That which thinks. It performs three functions: recalling (remembering), contemplating (thinking deeply), and imagining (creating mental pictures).

Speech — Sounds that make sense and communicate meaning. When the mind is determined, it controls what the tongue says and stops harmful words.

Body — The physical form that the consciousness uses. The body acts on the commands of the mind.

Action — Something done, often for a particular purpose. Mind governs actions, speech voices them, and body performs them.

Vow — A solemn, firm promise made to oneself. A vow of determination guides the mind, speech and body towards a specific goal.

Contemplating — Thinking deeply about something. One of the three functions of the mind.

Approving — Accepting or supporting what others do — even without doing it yourself. According to this chapter, approving of a wrong action carries the same responsibility as doing it yourself.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Your thoughts, words and actions must match — Determination is not just about what you say you will do. It is about aligning what you think, what you say, and what you do. A person who says "I will be honest" but thinks about cheating and stays silent when others cheat — is not truly determined. True determination goes all the way through.

You are responsible for what you approve — This is one of the most powerful lessons in this chapter. It is easy to think: "I didn't do it, so I'm not responsible." But if you approved — if you laughed, stayed silent, or encouraged — you shared in the action. This lesson asks us to have the courage to speak up when something is wrong.

Alignment brings peace — When your mind, speech and body all work towards the same positive goal, you experience a deep sense of peace and confidence. There is no anxiety, no guilt, no hidden burden. That is the reward of true determination — not just success, but the peace that comes with it.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Determination is the golden rule to success. When a desire becomes strong enough, it becomes determination — and it works through the yoga of Mind, Speech and Body together.

2. The Mind performs three functions: recalling, contemplating and imagining. When determined, the mind stops us from even thinking of harmful actions.

3. Speech is sounds that make sense. Determination of speech means choosing kind, truthful and constructive words — and refusing to hurt others with language.

4. The Body carries out the commands of the mind. When the mind is firmly determined, the body follows and stops us from committing physical or mental violence against others.

5. There are three ways of performing actions: doing oneself, making others do, and approving what others do. All three carry equal responsibility — silence and approval of wrongdoing make you a participant.`,
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
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
