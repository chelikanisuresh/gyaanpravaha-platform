// History & Civics Quiz Content — Gyaanpravaha
// All 6 chapters, 25 marks each
// Part A: 5 MCQ (1 mark) | Part B: 5 Single word (1 mark) | Part C: 5 Sentence forming (2 marks) | Part D: 1 Long answer (5 marks)

export type QuestionType = 'mcq' | 'single_word' | 'sentence' | 'long_answer'

export interface MCQOption { label: string; text: string }

export interface Question {
  id: number
  type: QuestionType
  marks: number
  question: string
  options?: MCQOption[]
  answer: string
  reexplanation: string
  hint?: string
  sectionId?: number  // which chapter section (1-7)
}

export interface ChapterQuiz {
  chapterId: number
  title: string
  totalMarks: number
  questions: Question[]
}

// ─── CHAPTER 1 — The Vedas: Our Sacred Heritage ───────────────────────────────

const quiz1: ChapterQuiz = {
  chapterId: 1,
  title: 'The Vedas — Our Sacred Heritage',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Around which year did the Aryans begin to arrive in India?',
      options: [
        { label: 'A', text: '3000 B.C.' },
        { label: 'B', text: '1500 B.C.' },
        { label: 'C', text: '500 B.C.' },
        { label: 'D', text: '1000 A.D.' },
      ],
      answer: 'B',
      reexplanation: 'The Aryans began to arrive in India around 1500 B.C. Around this time, the advanced Harappan civilization had reached a stage of stagnation. The Aryans came through the passes of Hindukush from Central Asia.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What did the Aryans call the region of seven rivers where they first settled in India?',
      options: [
        { label: 'A', text: 'Madhyadesh' },
        { label: 'B', text: 'Aryavarta' },
        { label: 'C', text: 'Saptasindhu' },
        { label: 'D', text: 'Brahmavarta' },
      ],
      answer: 'C',
      reexplanation: 'The Aryans called the region of seven rivers "Saptasindhu." They settled in the fertile province of Punjab, which they called Saptasindhu. They also named it "Brahmavarta" meaning "the land of the Gods." Madhyadesh and Aryavarta were names for their later settlement in the Gangetic valley.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which of the following is the oldest of the four Vedas?',
      options: [
        { label: 'A', text: 'Sama Veda' },
        { label: 'B', text: 'Yajur Veda' },
        { label: 'C', text: 'Atharva Veda' },
        { label: 'D', text: 'Rig Veda' },
      ],
      answer: 'D',
      reexplanation: 'The Rig Veda is the oldest of the four Vedas. It was composed during the Early Vedic Period (1500–1000 B.C.) and contains hymns about mythology. The Early Vedic Period is also called the Rig Vedic Period because of this.',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What was the Gurukul system of education?',
      options: [
        { label: 'A', text: 'A school in the city with printed books' },
        { label: 'B', text: 'A residential school in the forest where students lived with their guru for 25 years' },
        { label: 'C', text: 'A system where parents taught children at home' },
        { label: 'D', text: 'A royal school only for princes and warriors' },
      ],
      answer: 'B',
      reexplanation: 'The Gurukul was a residential school situated deep inside the forest, where a boy was sent at age seven to live with his Guru for 25 years. Students led a simple, disciplined life — they cleaned the house, gathered wood, and were taught orally. After completing education, they gave Gurudakshina to their guru.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'The caste system during the Early Vedic Age was:',
      options: [
        { label: 'A', text: 'Rigid and hereditary — you could not change your caste' },
        { label: 'B', text: 'Flexible — based on skills and occupation' },
        { label: 'C', text: 'Based only on wealth' },
        { label: 'D', text: 'There was no caste system in the Early Vedic Age' },
      ],
      answer: 'B',
      reexplanation: 'In the Early Vedic Age, the caste system was flexible — based on the skills involved in certain jobs. The four Varnas were Brahman (priests/scholars), Kshatriya (warriors), Vaishya (farmers/traders) and Shudra (labourers). One could move between castes. It was only in the Later Vedic Age that the system became rigid and hereditary.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What does the word "Veda" mean?',
      answer: 'Knowledge',
      reexplanation: 'The word "Veda" means knowledge. The Vedas are the most important source of knowledge about the Vedic civilization. They were passed down from generation to generation by word of mouth before being written in Sanskrit.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What was the offering given by a student to their guru after completing education called?',
      answer: 'Gurudakshina',
      reexplanation: 'Gurudakshina was the offering of gratitude given by a student to their guru after completing their education at the Gurukul. It could be anything from gold to service — a symbolic way of thanking the guru for 25 years of teaching.',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the name of the Later Vedic Period, also known as the Epic Age?',
      answer: 'Later Vedic Period',
      reexplanation: 'The period from 1000 B.C. to 600 B.C. is called the Later Vedic Period. During this time, the Aryans moved to the Gangetic valley, which they called Madhyadesh or Aryavarta. It is also called the Epic Age because the great epics Ramayana and Mahabharata belong to this era.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What was the third stage of life in the Ashrama system called?',
      answer: 'Vanaprastha',
      reexplanation: 'Vanaprastha was the third stage in the four Ashramas. After fulfilling family duties as a Grihastha (householder), a person gave up worldly life and went away into the forest to meditate. The four stages were: Brahmacharya, Grihastha, Vanaprastha, and Sanyasa.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'Which ceremony allowed women to choose their own husbands in the Early Vedic Age?',
      answer: 'Swayamwara',
      reexplanation: 'In the Early Vedic Age, women enjoyed a respectable position in society. They could choose their own husbands in a ceremony called Swayamwara. There were also many women scholars like Gargi and Maitreyi. This changed in the Later Vedic Age when the position of women declined.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "nomadic" in a sentence related to the early Aryans.',
      answer: 'The early Aryans were nomadic people who moved from place to place before finally settling in the fertile plains of Punjab.',
      hint: 'Nomadic means moving from place to place without a fixed home.',
      reexplanation: 'Nomadic means moving from place to place without a permanent home. The early Aryans were nomadic people who later led a pastoral and then agricultural life after settling in India.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "hereditary" in a sentence about the caste system.',
      answer: 'In the Later Vedic Age, the caste system became hereditary — meaning a person was born into a caste and could not change it.',
      hint: 'Hereditary means passed down from parents to children, something you are born into.',
      reexplanation: 'Hereditary means something that is passed down from parent to child — something you are born into. In the Later Vedic Age, the caste system became hereditary and rigid, unlike the flexible system of the Early Vedic Age.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "agrarian" in a sentence about India\'s economy.',
      answer: 'The Aryans cleared the forests and gave India an agrarian base, making farming the foundation of the Indian economy, which remains true even today.',
      hint: 'Agrarian means related to farming and agriculture.',
      reexplanation: 'Agrarian means related to farming and the cultivation of land. One of the most lasting impacts of the Aryan civilization is that they gave India its agrarian base — making agriculture the backbone of the Indian economy.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "discipline" in a sentence related to the Gurukul system.',
      answer: 'The Gurukul system instilled great discipline in students, who had to wake early, clean the ashram, gather wood and study hard for 25 years.',
      hint: 'Discipline means following rules and habits consistently, even when it is difficult.',
      reexplanation: 'Discipline means following a strict routine and set of rules consistently. The Gurukul system was built on discipline — students had no luxuries and had to perform daily chores while studying under the guru for 25 years.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "sacrifice" in a sentence related to Vedic religious practices.',
      answer: 'In the Later Vedic Age, kings performed grand sacrifices like the Ashwamedha Yajna to prove their power and claim new territories.',
      hint: 'A sacrifice is an offering made to God or a higher power, often as part of a religious ritual.',
      reexplanation: 'In the Later Vedic Age, religion became complex and involved many sacrifices. Kings performed the Ashwamedha Yajna — a horse sacrifice — to claim territory. The Brahmans performed elaborate rituals and sacrifices, which eventually led to discontent among common people.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'The Aryan civilization had a lasting impact on India. Explain at least three ways in which the legacy of the Aryan civilization can be seen in India today. Use examples from the chapter.',
      answer: 'The Aryan civilization has had a profound and lasting impact on India that is visible even today. First, the Sanskrit language — brought by the Aryans — is the mother of most Indian languages including Hindi, Marathi and Bengali. It acts as a unifying force across India. Second, the Gods of the Later Vedic Period — Brahma, Vishnu, Shiva, Rama and Krishna — are still worshipped across India today. Yajnas are performed at weddings and religious ceremonies. The Bhagavad Gita, containing Lord Krishna\'s teachings, continues to inspire millions. Third, the Aryans gave India its agrarian base by clearing forests and making farming the foundation of the economy, which remains true today. Additionally, the philosophical ideas from the Vedas and Upanishads form the basis of Hindu religion and thought that guides the lives of hundreds of millions of Indians.',
      hint: 'Think of three areas: language, religion, and economy. Find one example for each from the chapter.',
      reexplanation: 'Look for three specific impacts: (1) Sanskrit language — mother of Indian languages, unifying force; (2) Vedic Gods and religious practices — Brahma, Vishnu, Shiva, Rama, Krishna, still worshipped today, Bhagavad Gita; (3) Agrarian base — Aryans cleared forests and made farming central to India\'s economy. Use specific examples from the chapter for each point.',
    },
  ],
}

// ─── CHAPTER 2 — Essence of Hinduism ─────────────────────────────────────────

const quiz2: ChapterQuiz = {
  chapterId: 2,
  title: 'Essence of Hinduism',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'From which river is the word "Hindu" derived?',
      options: [
        { label: 'A', text: 'Ganga' },
        { label: 'B', text: 'Yamuna' },
        { label: 'C', text: 'Sindhu (Indus)' },
        { label: 'D', text: 'Brahmaputra' },
      ],
      answer: 'C',
      reexplanation: 'The word "Hindu" has been derived from the river Sindhu — the Sanskrit word for the Indus river. The faith that evolved from the Indus region came to be called Hinduism. It is also called Brahmanism — the oldest faith in the world.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What does "Sanatana Dharma" mean?',
      options: [
        { label: 'A', text: 'Ancient scripture' },
        { label: 'B', text: 'Eternal faith' },
        { label: 'C', text: 'Sacred river' },
        { label: 'D', text: 'Divine knowledge' },
      ],
      answer: 'B',
      reexplanation: 'Sanatana Dharma means "eternal faith." Sanatana means eternal and Dharma means the right way of living. Hinduism is referred to as Sanatana Dharma because Hindus believe their faith has no beginning and no end — it is a continuous process.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which of the following correctly describes the Trimurti?',
      options: [
        { label: 'A', text: 'Brahma — Preserver, Vishnu — Creator, Shiva — Destroyer' },
        { label: 'B', text: 'Brahma — Creator, Vishnu — Preserver, Shiva — Destroyer' },
        { label: 'C', text: 'Brahma — Destroyer, Vishnu — Creator, Shiva — Preserver' },
        { label: 'D', text: 'Brahma — Creator, Vishnu — Destroyer, Shiva — Preserver' },
      ],
      answer: 'B',
      reexplanation: 'The Trimurti — the three forms of God — are: Brahma the Creator (associated with birth), Vishnu the Preserver (associated with life), and Shiva the Destroyer (associated with death). Together they represent the three prime stages of life.',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What does "Ahimsa" mean in Hinduism?',
      options: [
        { label: 'A', text: 'Truth' },
        { label: 'B', text: 'Nonviolence' },
        { label: 'C', text: 'Salvation' },
        { label: 'D', text: 'Duty' },
      ],
      answer: 'B',
      reexplanation: 'Ahimsa means nonviolence. It is one of the basic principles of Hinduism. Hindus abhor killing or shedding of blood. Ahimsa means living without hurting anyone physically, emotionally, mentally or morally. Mahatma Gandhi made this principle famous globally by using it in the freedom movement.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which category of Hindu scriptures includes the Vedas and 108 Upanishads?',
      options: [
        { label: 'A', text: 'Smritis' },
        { label: 'B', text: 'Puranas' },
        { label: 'C', text: 'Shrutis' },
        { label: 'D', text: 'Epics' },
      ],
      answer: 'C',
      reexplanation: 'Shrutis are the firsthand knowledge of universal truth — the word Shruti means "heard." The four Vedas and 108 Upanishads are examples of Shruti texts. They are considered the most sacred. Smritis (meaning "memory") include the Puranas, Epics, and Bhagavad Gita.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the name of the cycle of birth and death from which Hindus seek liberation?',
      answer: 'Moksha',
      reexplanation: 'Moksha is the liberation from the endless cycle of birth and death. The soul is considered immortal — it is born and reborn until it attains Moksha, which is the chief goal of Hindu life.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the most sacred symbol in Hinduism that represents the basic sound of the universe?',
      answer: 'Om / Aum',
      reexplanation: 'Om (also written as Aum) is the most sacred symbol in Hinduism. It represents the basic sound of the universe — the primordial vibration from which everything was created. It is used at the beginning of every sacred act or writing.',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the national motto of India, derived from the Hindu principle of Satya?',
      answer: 'Satyameva Jayate',
      reexplanation: 'Satyameva Jayate means "Truth alone triumphs." It is the national motto of India and comes from the Hindu principle of Satya (truth). It appears on the national emblem of India.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is Karma in Hinduism?',
      answer: 'Actions and their consequences',
      reexplanation: 'Karma refers to actions performed by each individual during their lifetime, and the consequences of those actions — which influence their present and future lives. Put simply: as you sow, so shall you reap. Good actions lead to good results; bad actions lead to suffering.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'Who wrote the Mahabharata?',
      answer: 'Sage Ved Vyasa',
      reexplanation: 'The Mahabharata was written by Sage Ved Vyasa. It is the story of the war between the Pandavas and Kauravas. The most important section is the Bhagavad Gita — the dialogue between Lord Krishna and Arjuna on the battlefield of Kurukshetra.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "Dharma" in a sentence of your own.',
      answer: 'A student\'s Dharma is to study sincerely and learn well, just as a soldier\'s Dharma is to protect the country.',
      hint: 'Dharma means one\'s moral obligation or right way of living — it varies with one\'s role in life.',
      reexplanation: 'Dharma means one\'s moral obligation or the right way of living. It is not just about religion — it means doing the right thing according to your role and situation. Write a sentence showing what Dharma means for a specific person or role.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "tolerance" in a sentence about Hinduism.',
      answer: 'Hinduism is known for its tolerance — it accepts all paths to God and respects all religions as different routes to the same truth.',
      hint: 'Tolerance means accepting and respecting beliefs different from your own.',
      reexplanation: 'Tolerance means accepting and respecting other beliefs and ways of life even when they are different from your own. Hinduism is famous for its religious tolerance — it does not say one religion is right and all others wrong.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "sacred" in a sentence about a Hindu symbol or text.',
      answer: 'The Om symbol is sacred in Hinduism and is used at the beginning of every prayer and religious ceremony.',
      hint: 'Sacred means something holy, deeply respected and connected to God or religion.',
      reexplanation: 'Sacred means something holy and deeply connected to religious belief. Write a sentence about a Hindu symbol (Om, Shankha, Swastika) or text (Vedas, Gita) and describe why it is considered sacred.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "nonviolence" in a sentence about Mahatma Gandhi.',
      answer: 'Mahatma Gandhi used nonviolence as his most powerful weapon — he won India\'s freedom without firing a single shot.',
      hint: 'Nonviolence means refusing to cause harm to any living being through action, word, or thought.',
      reexplanation: 'Nonviolence (Ahimsa) means not causing harm to any living being. Mahatma Gandhi took this Hindu principle and applied it to politics — using it as the foundation of India\'s freedom movement. He showed that nonviolence is more powerful than any weapon.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "avatar" in a sentence about Vishnu.',
      answer: 'Vishnu has ten avatars — different forms in which God descended to earth to protect good people and destroy evil.',
      hint: 'An avatar is an incarnation — God taking a physical form on earth.',
      reexplanation: 'An avatar is an incarnation of God on earth. Vishnu has 10 avatars including Matsya (fish), Vaman (dwarf), Rama, Krishna, and Buddha. These represent God descending to earth to restore righteousness when evil becomes too powerful.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'Hinduism has six basic principles. Choose any three and explain them clearly, giving an example for each from your own life or from what you read in the chapter.',
      answer: 'Hinduism has six basic principles that guide the lives of Hindus. First, Dharma — one\'s moral obligation or the right way of living. For example, a student\'s Dharma is to study sincerely and learn, not waste time. Second, Karma — the idea that every action has consequences. If we are kind to others, kindness comes back to us. If we hurt others, we face difficulties in return. Third, Ahimsa — nonviolence. Not hurting anyone through thought, word or action. Mahatma Gandhi used this principle to lead the freedom movement without any violence. These three principles together teach us to live with purpose, take responsibility for our actions, and treat others with compassion.',
      hint: 'Pick three from: Dharma, Karma, Moksha, Satya, Ahimsa, Gau-raksha. Explain each in your own words and give a real example.',
      reexplanation: 'The six principles are: Dharma (right conduct), Karma (actions and consequences), Moksha (liberation from birth-death cycle), Satya (truth), Ahimsa (nonviolence), and Gau-raksha (reverence for cows). For each principle you choose, explain what it means and connect it to a real example from your life or from the chapter.',
    },
  ],
}

// ─── CHAPTER 3 — The Great Preachers ─────────────────────────────────────────

const quiz3: ChapterQuiz = {
  chapterId: 3,
  title: 'The Great Preachers',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'In which year was Lord Mahavira born?',
      options: [
        { label: 'A', text: '527 B.C.' },
        { label: 'B', text: '567 B.C.' },
        { label: 'C', text: '599 B.C.' },
        { label: 'D', text: '487 B.C.' },
      ],
      answer: 'C',
      reexplanation: 'Lord Mahavira was born in 599 B.C. He attained Nirvana at the age of 72 in 527 B.C. at Pavapuri in Bihar. Gautama Buddha was born in 567 B.C. and died in 487 B.C. Both lived in the same remarkable century.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What are the Five Great Vows of Jainism called?',
      options: [
        { label: 'A', text: 'Panchasheel' },
        { label: 'B', text: 'Pancha Mahavratas' },
        { label: 'C', text: 'Five Noble Truths' },
        { label: 'D', text: 'Three Jewels' },
      ],
      answer: 'B',
      reexplanation: 'The Five Great Vows of Jainism are called the Pancha Mahavratas. They are: Ahimsa (nonviolence), Satya (truth), Asteya (non-stealing), Brahmacharya (chastity), and Aparigraha (non-possessiveness). Panchasheel is the five rules of conduct in Buddhism.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Where did Gautama Buddha give his first sermon?',
      options: [
        { label: 'A', text: 'Bodh Gaya' },
        { label: 'B', text: 'Lumbini' },
        { label: 'C', text: 'Deer Park, Sarnath' },
        { label: 'D', text: 'Pavapuri' },
      ],
      answer: 'C',
      reexplanation: 'Gautama Buddha attained enlightenment under a Bodhi tree at Bodh Gaya. He gave his first sermon at the Deer Park in Sarnath — to five disciples. This event is known as the "Dharmachakra Pravartan" — the turning of the wheel of Dharma. He was born in Lumbini (Nepal).',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which emperor became the greatest missionary of Buddhism after converting to the faith?',
      options: [
        { label: 'A', text: 'Kanishka' },
        { label: 'B', text: 'Harshavardhana' },
        { label: 'C', text: 'Ashoka' },
        { label: 'D', text: 'Chandragupta' },
      ],
      answer: 'C',
      reexplanation: 'King Ashoka — after witnessing the destruction and suffering of the Kalinga war — converted to Buddhism and became its greatest missionary. He sent his son Mahendra and daughter Sanghamitra to spread Buddhism in Sri Lanka. He actively helped spread Buddhism across Asia.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What are the Two Sects of Jainism?',
      options: [
        { label: 'A', text: 'Hinayana and Mahayana' },
        { label: 'B', text: 'Shrutis and Smritis' },
        { label: 'C', text: 'Digambars and Shwetambars' },
        { label: 'D', text: 'Tripitikas and Agams' },
      ],
      answer: 'C',
      reexplanation: 'After Lord Mahavira\'s salvation, Jainism broke into two sects: Digambars — monks who do not wear any clothes, and Shwetambars — monks who wear white clothes. Hinayana and Mahayana are the two sects of Buddhism, not Jainism.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What are the original teachings of the Buddha found in, composed in Pali, called?',
      answer: 'Tripitikas',
      reexplanation: 'The Tripitikas (meaning "The Three Baskets") are the original teachings of Gautama Buddha, composed in Pali. The Jataka tales — stories of the Buddha from his previous births — are also important Buddhist literature.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What does the word "Jain" mean?',
      answer: 'Conqueror',
      reexplanation: 'The word "Jain" means the conqueror — one who has conquered all their passions and attained complete liberation from the cycles of birth and death. This person is called a "Jina." One who follows and worships the Jina is a Jain.',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What are the Three Jewels of Jainism?',
      answer: 'Right Belief, Right Knowledge, Right Conduct',
      reexplanation: 'The Three Jewels of Jainism are: Samyak Darshan (Right Belief), Samyak Gyan (Right Knowledge), and Samyak Charitra (Right Conduct). Together they guide a Jain towards liberation and perfect equanimity.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the Eightfold Path of Buddhism also called?',
      answer: 'Ashtanga Marg',
      reexplanation: 'The Eightfold Path is also called Ashtanga Marg. It includes: Right View, Right Thinking, Right Speech, Right Action, Right Means of Livelihood, Right Effort, Right Kind of Meditation, and Right Conduct. Following this path is how one ends suffering according to Buddhism.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'In which language did Buddha preach his teachings?',
      answer: 'Pali and Prakrit',
      reexplanation: 'Buddha preached in Pali and Prakrit — the language of the common people. This was very important because Sanskrit was accessible only to the elite, particularly the Brahmins. By preaching in common languages, Buddha\'s teachings could be understood by everyone regardless of caste.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "nonviolence" in a sentence about Jainism.',
      answer: 'Jainism places nonviolence at the very centre of its teachings — Jain monks are so committed to it that they even avoid eating food after sunset to prevent harming insects.',
      hint: 'Nonviolence (Ahimsa) is the first and most important of the Five Great Vows in Jainism.',
      reexplanation: 'Nonviolence is the first Great Vow in Jainism — not to cause harm to any living being. Jains have very strict rules: they do not eat meat, root vegetables, honey, or food after sunset — all to avoid harming living creatures.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "equality" in a sentence about why Buddhism became popular.',
      answer: 'Buddhism became popular because it believed in equality of all people — it rejected the rigid caste system and said that anyone, regardless of birth, could attain Nirvana.',
      hint: 'Equality means treating all people as equal regardless of their caste, wealth or background.',
      reexplanation: 'Buddhism rejected the rigid caste system that had made people unequal. It taught that anyone — regardless of the caste they were born into — could follow the Eightfold Path and attain Nirvana. This message of equality was one of the main reasons Buddhism spread so quickly.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "tolerance" in a sentence about the conclusion of this chapter.',
      answer: 'The chapter concludes with a call for religious tolerance — reminding us that all religions share the same core values of love, respect and honesty.',
      hint: 'Tolerance means accepting and respecting beliefs and practices that are different from your own.',
      reexplanation: 'The chapter ends by saying: India consists of people from all religions — Hinduism, Jainism, Buddhism, Christianity, Islam. We must respect all religions because they all teach the same core values. This spirit of religious tolerance is essential in a diverse country like India.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "philosopher" in a sentence about Confucius.',
      answer: 'Confucius was a practical philosopher who believed that a morally sound society could be built through strong family bonds, respect for traditions, and right conduct.',
      hint: 'A philosopher is a person who thinks deeply about the meaning of life, truth, and how people should live.',
      reexplanation: 'Confucius was a "practical philosopher" — he did not discuss God or spiritual matters but focused on how to build a well-organised and morally sound society through right conduct, love, strong family ties, and respect for elders and traditions.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "liberation" in a sentence about the goal of Jainism or Buddhism.',
      answer: 'Both Jainism and Buddhism teach that the ultimate goal of life is liberation from the endless cycle of birth and death — called Nirvana or Moksha.',
      hint: 'Liberation means freedom — in religion, it means freedom from the cycle of birth, death and rebirth.',
      reexplanation: 'Liberation (Nirvana in Buddhism and Moksha in Jainism) means complete freedom from the cycle of birth and death. Both Mahavira and Buddha taught that this liberation is achievable by anyone who follows the right path — regardless of their caste or background.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'Both Jainism and Buddhism emerged as a reaction to the problems in Vedic society. What were those problems, and how did the teachings of Jainism and Buddhism address them? Use examples from the chapter.',
      answer: 'Towards the end of the Later Vedic Age, the Vedic religion had become deeply problematic. The Brahmins had made religion inaccessible to common people by keeping scriptures in Sanskrit, charging money for rituals, and gaining too much power. The caste system had become rigid, with the lower castes completely isolated. People wanted equality and opposed meaningless rituals. It was against this background that Jainism and Buddhism emerged. Both religions addressed these problems directly. They rejected the caste system and said anyone could attain Nirvana regardless of birth. They preached in Pali and Prakrit — the languages of common people — rather than Sanskrit. They did not believe in costly rituals or sacrifices. They emphasised equality, nonviolence and a clear moral code. Merchants and traders flocked to these religions because they promised dignity and fairness for all. As a result, both religions spread rapidly across India and beyond.',
      hint: 'First list the problems in Vedic society (Brahmins, caste, rituals, language). Then for each problem, explain how Jainism/Buddhism responded with a different approach.',
      reexplanation: 'Structure your answer in two parts. First, explain why the Vedic religion became unpopular — the exploitation by Brahmins, costly rituals, Sanskrit language barrier, rigid caste system. Then explain how Jainism and Buddhism responded — by using common languages, rejecting the caste system, promoting nonviolence and equality, and providing a clear moral code that anyone could follow.',
    },
  ],
}

// ─── CHAPTER 4 — The Preamble ─────────────────────────────────────────────────

const quiz4: ChapterQuiz = {
  chapterId: 4,
  title: 'The Preamble',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'When did the Indian Constitution come into force?',
      options: [
        { label: 'A', text: '15th August 1947' },
        { label: 'B', text: '26th November 1949' },
        { label: 'C', text: '26th January 1950' },
        { label: 'D', text: '2nd October 1869' },
      ],
      answer: 'C',
      reexplanation: 'The Constitution of India came into force on 26th January 1950 — which is why we celebrate Republic Day on that date every year. It was adopted on 26th November 1949 and came into force on 26th January 1950. 15th August 1947 is Independence Day.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What does "Secular" mean in the Preamble?',
      options: [
        { label: 'A', text: 'The government follows Hinduism as the official religion' },
        { label: 'B', text: 'There is no official state religion; the government treats all religions equally' },
        { label: 'C', text: 'Citizens are not allowed to follow any religion' },
        { label: 'D', text: 'Only one religion is recognised by the Constitution' },
      ],
      answer: 'B',
      reexplanation: 'Secular means there is no official state religion. The government does not give more importance to one religion over another. In India, people of all religions are free to follow whatever beliefs they like. India is a secular state — meaning all religions are treated equally.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which Fundamental Right prohibits employment of children below 14 years in hazardous occupations?',
      options: [
        { label: 'A', text: 'Right to Equality' },
        { label: 'B', text: 'Right to Freedom' },
        { label: 'C', text: 'Right against Exploitation' },
        { label: 'D', text: 'Right to Constitutional Remedies' },
      ],
      answer: 'C',
      reexplanation: 'The Right against Exploitation prohibits beggary and other forms of forced labour, human trafficking, and employment of children below the age of 14 years in factories, mines and other hazardous occupations. This is one of the six Fundamental Rights guaranteed by the Constitution.',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'When were Fundamental Duties added to the Constitution, and by which amendment?',
      options: [
        { label: 'A', text: '1950, by the 1st amendment' },
        { label: 'B', text: '1976, by the 42nd amendment' },
        { label: 'C', text: '1993, by the 73rd amendment' },
        { label: 'D', text: '1947, at the time of independence' },
      ],
      answer: 'B',
      reexplanation: 'Fundamental Duties were added to the Constitution in 1976 by the 42nd Amendment. The 73rd Amendment of 1993 gave constitutional status to Panchayats — that relates to Chapter 5. Fundamental Rights were part of the original Constitution from 1950.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What does "Sovereign" mean in the Preamble?',
      options: [
        { label: 'A', text: 'India is ruled by a king' },
        { label: 'B', text: 'India is a completely independent country — no other country can tell India what to do' },
        { label: 'C', text: 'India shares power with other countries' },
        { label: 'D', text: 'India is part of the British Empire' },
      ],
      answer: 'B',
      reexplanation: 'Sovereign means completely independent. A sovereign country makes its own decisions and no other country can interfere in its affairs. India is a sovereign nation — meaning no foreign power can tell India what to do. This was one of the most important declarations after independence.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'Who was the chief architect of the Indian Constitution?',
      answer: 'Dr. B.R. Ambedkar',
      reexplanation: 'Dr. B.R. Ambedkar was the Chairman of the Drafting Committee of the Constitution and is considered its chief architect. The Constitution was handwritten by Prem Behari Narain Raizada in calligraphy — but Ambedkar led the process of drafting it.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the introduction to the Constitution called?',
      answer: 'Preamble',
      reexplanation: 'The Preamble is the introduction to the Constitution. It appears on the very first page and states the goals the Constitution seeks to achieve. It begins with the famous words: "We, the People of India..."',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What does "Fraternity" mean in the Preamble?',
      answer: 'Brotherhood and unity among all citizens',
      reexplanation: 'Fraternity means a spirit of brotherhood and sisterhood among all citizens. It means all Indians should try to live like brothers and sisters, treating each other with respect. The country should remain united, whole and unharmed. It also ensures the dignity of every individual.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'How many Fundamental Rights does the Indian Constitution guarantee?',
      answer: 'Six',
      reexplanation: 'The Indian Constitution guarantees six Fundamental Rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What type of government does a Democratic Republic have as its head?',
      answer: 'An elected President',
      reexplanation: 'In a Democratic Republic, the government is elected by the people and the head of state is an elected President — not a king or queen. India chose to be a Democratic Republic, meaning the President is elected by representatives of the people, not inherited by birth.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "sovereign" in a sentence about India.',
      answer: 'India is a sovereign nation — it makes all its own decisions and no other country has the right to interfere in its affairs.',
      hint: 'Sovereign means completely independent — making your own decisions without interference from others.',
      reexplanation: 'Sovereign means completely independent. A sovereign country makes its own decisions. Write a sentence that shows what being sovereign means for India — that no foreign power can tell India what to do or how to govern itself.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "equality" in a sentence about the Preamble.',
      answer: 'The Preamble promises equality of status and opportunity to all citizens of India — whether rich or poor, man or woman, from any region or religion.',
      hint: 'Equality means giving everyone a fair and equal chance, regardless of their background.',
      reexplanation: 'Equality of status and opportunity means everyone gets an equal and fair chance — rich or poor, men or women, from whatever region or religion. Write a sentence that captures this idea of equal opportunity for all Indians as promised by the Preamble.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the phrase "Fundamental Rights" in a sentence of your own.',
      answer: 'Fundamental Rights are guaranteed by the Constitution to every Indian citizen — rights that the government cannot take away under any circumstances.',
      hint: 'Fundamental Rights are the six basic rights guaranteed to every citizen by the Constitution.',
      reexplanation: 'Fundamental Rights are six rights that the Constitution guarantees to every Indian citizen — they cannot be taken away by any government. They include the Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "secular" in a sentence about India.',
      answer: 'India is a secular country where the government does not favour any one religion — all citizens are free to practise the religion of their choice.',
      hint: 'Secular means no official state religion — all religions are treated equally by the government.',
      reexplanation: 'Secular means the government treats all religions equally and does not give special status to any one religion. In a secular country like India, people of all faiths — Hindu, Muslim, Christian, Sikh, Jain, Buddhist — are equally free to practise their religion.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "constitution" in a sentence explaining what it is.',
      answer: 'A constitution is the supreme set of laws that guides how a country is governed — it tells the government what it can and cannot do.',
      hint: 'A Constitution is the highest law of the land — a set of rules according to which the country is governed.',
      reexplanation: 'A Constitution is the supreme law of a country. It is a body of laws according to which the country is governed. It lays down guidelines and the powers of the government — whether central, state, or local.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'The Preamble declares India to be a Sovereign, Socialist, Secular, Democratic Republic. Explain what each of these five words means and why each one is important for India.',
      answer: 'The Preamble of the Indian Constitution declares India to be five things. First, Sovereign — meaning India is completely independent. No other country can tell India what to do. This is important because India fought for freedom from British rule and must remain in charge of its own decisions. Second, Socialist — meaning the wealth of the nation should be shared by all, so everyone has what they need. This is important in a country with great inequality between the rich and the poor. Third, Secular — meaning there is no official state religion. The government treats all religions equally. This is essential in a country as religiously diverse as India. Fourth, Democratic — meaning the government is elected by the people. Citizens choose their leaders. This gives every citizen a voice. Fifth, Republic — meaning the head of state is an elected President, not a king or queen. Anyone can become President through election, not just through birth. Together, these five words describe a fair, free and inclusive nation that belongs to all its people.',
      hint: 'Take each word one by one: Sovereign, Socialist, Secular, Democratic, Republic. Explain what it means and why India needs that quality.',
      reexplanation: 'Explain each word clearly: Sovereign (independent, no foreign interference), Socialist (wealth shared fairly), Secular (no state religion, all religions equal), Democratic (government elected by people), Republic (elected head, not a king). For each one, give a reason why it matters for India specifically — think about India\'s diversity, its history of colonial rule, and its many religions and communities.',
    },
  ],
}

// ─── CHAPTER 5 — India Lives in Villages ─────────────────────────────────────

const quiz5: ChapterQuiz = {
  chapterId: 5,
  title: 'India Lives in Villages (Rural Administration)',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What is the local government of a village called?',
      options: [
        { label: 'A', text: 'Zila Parishad' },
        { label: 'B', text: 'Block Samiti' },
        { label: 'C', text: 'Panchayat' },
        { label: 'D', text: 'Gram Sabha' },
      ],
      answer: 'C',
      reexplanation: 'The Panchayat is the local government of the village — the smallest unit of local self-government in rural India. The Gram Sabha is the village assembly of all adult voters. The Block Samiti and Zila Parishad are higher tiers of the Panchayati Raj system.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Who is the elected head of the Village Panchayat?',
      options: [
        { label: 'A', text: 'Panchayat Secretary' },
        { label: 'B', text: 'Block Development Officer' },
        { label: 'C', text: 'Sarpanch' },
        { label: 'D', text: 'District Collector' },
      ],
      answer: 'C',
      reexplanation: 'The Sarpanch is the elected head of the Village Panchayat. In different states, the Sarpanch is known by different names — in Punjab and U.P. it is Sarpanch, in Bihar it is Mukhiya. The Panchayat Secretary, on the other hand, is a paid government official (not elected) who maintains records.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which constitutional amendment gave Panchayats greater powers and constitutional status?',
      options: [
        { label: 'A', text: '42nd Amendment, 1976' },
        { label: 'B', text: '73rd Amendment, 1993' },
        { label: 'C', text: '44th Amendment, 1978' },
        { label: 'D', text: '86th Amendment, 2002' },
      ],
      answer: 'B',
      reexplanation: 'The 73rd Amendment of 1993 gave constitutional status to Panchayats, recognised their growing role as local governing bodies, and allowed Panchayats to spend money on development projects they preferred. The 42nd Amendment of 1976 added Fundamental Duties to the Constitution.',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'The Panchayati Raj system has three tiers. Which is the highest tier?',
      options: [
        { label: 'A', text: 'Gram Panchayat' },
        { label: 'B', text: 'Block Samiti' },
        { label: 'C', text: 'Gram Sabha' },
        { label: 'D', text: 'Zila Parishad' },
      ],
      answer: 'D',
      reexplanation: 'The Zila Parishad is the third and highest tier of the Panchayati Raj system, operating at the district level. The three tiers from bottom to top are: Gram Panchayat (village level), Block Samiti (block level), and Zila Parishad (district level). India has 641 Zila Parishads.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Who is eligible to be a member of the Gram Sabha?',
      options: [
        { label: 'A', text: 'Only men above 21 years' },
        { label: 'B', text: 'Every adult male and female above 18 years in the village' },
        { label: 'C', text: 'Only elected members of the Panchayat' },
        { label: 'D', text: 'Only taxpayers in the village' },
      ],
      answer: 'B',
      reexplanation: 'Every adult — male or female — who is 18 years of age or above, is a member of the Gram Sabha. This means every adult citizen of the village has a voice. The Gram Sabha elects the Gram Panchayat through a secret ballot and meets at least twice a year.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is Mahatma Gandhi\'s vision of village self-rule called?',
      answer: 'Gram Swaraj',
      reexplanation: 'Gram Swaraj means village self-rule — Mahatma Gandhi\'s vision that true democracy in India could only be achieved when village communities governed themselves. His ideas provided the inspiration for the establishment of the Panchayati Raj system in India.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the paid official who maintains records and accounts of the Panchayat called?',
      answer: 'Panchayat Secretary',
      reexplanation: 'The Panchayat Secretary is a paid government official of the Panchayat. Unlike the Sarpanch who is elected, the Secretary is appointed. The Secretary maintains records of all the work done by the Panchayat and prepares its accounts.',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'On which date is National Panchayati Raj Day celebrated every year?',
      answer: '24th April',
      reexplanation: 'National Panchayati Raj Day (NPRD) is celebrated every year on 24th April since 2010. This is the date on which the 73rd Constitutional Amendment came into force in 1993, giving Panchayats constitutional status and greater powers.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the executive officer of the Block Samiti called?',
      answer: 'Block Development Officer (BDO)',
      reexplanation: 'The Block Development Officer (BDO) is the executive officer of the block, appointed by the state government. The BDO manages block-level development programmes and helps the Block Samiti execute its work.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'How many times a year must the Gram Sabha meet at minimum?',
      answer: 'Twice',
      reexplanation: 'The Gram Sabha must meet at least twice a year. At these meetings, it passes the annual budget and discusses the major problems of the village. The members of the Gram Sabha elect the Gram Panchayat through a secret ballot.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "self-reliant" in a sentence about the Panchayati Raj system.',
      answer: 'The Panchayati Raj system helps villages become self-reliant by empowering them to solve their own problems rather than depending on the central government for everything.',
      hint: 'Self-reliant means able to take care of yourself without depending on others.',
      reexplanation: 'Self-reliant means independent and able to manage on one\'s own. The Panchayati Raj system was designed to make villages self-reliant — encouraging them to identify and solve their own problems, develop their own resources, and reduce dependence on higher government bodies.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "democracy" in a sentence about the Gram Sabha.',
      answer: 'The Gram Sabha is democracy at its most direct — every adult in the village has an equal vote and an equal voice in decisions that affect their daily life.',
      hint: 'Democracy means government by the people, where everyone has an equal say.',
      reexplanation: 'Democracy means a system of government where people elect their leaders and have a say in decisions. The Gram Sabha is the most direct form of democracy — every adult citizen of the village participates directly, not through a representative.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "sanitation" in a sentence about the functions of the Village Panchayat.',
      answer: 'One of the important responsibilities of the Village Panchayat is sanitation — maintaining clean public streets and ensuring proper disposal of waste to protect public health.',
      hint: 'Sanitation means keeping the environment clean and free from disease-causing conditions.',
      reexplanation: 'Sanitation is one of the 13 key functions of the Village Panchayat. It includes maintaining clean public streets and public health. Without proper sanitation, villages are at risk from disease and poor living conditions.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "elected" in a sentence about the Sarpanch.',
      answer: 'The Sarpanch is elected by the members of the Gram Sabha through a secret ballot and serves as the head of the Village Panchayat for five years.',
      hint: 'Elected means chosen by voting — the people decide who gets the position.',
      reexplanation: 'The Sarpanch is elected — meaning chosen by the voters of the village through the Gram Sabha. This is what makes the Panchayat democratic. The Panchayat Secretary, by contrast, is appointed (not elected) by the government.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the phrase "local self-government" in a sentence about why it is important.',
      answer: 'Local self-government through the Panchayati Raj system is important because the people of a village know their own problems best and are the most capable of solving them.',
      hint: 'Local self-government means a community governing itself at the local level rather than being governed from a far-away central authority.',
      reexplanation: 'Local self-government means the community governs itself locally. The Panchayati Raj gives villages the power to manage their own affairs — from roads and water to schools and sanitation. This is more efficient than waiting for decisions from the state or central government.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'Describe the three-tier Panchayati Raj system in India. What is each tier called, at what level does it work, and what are its main functions? Why is this system important for Indian democracy?',
      answer: 'The Panchayati Raj system operates at three levels. The first and most basic tier is the Gram Panchayat, which works at the village level. It is directly elected by the Gram Sabha and performs 13 key services for the village including road construction, provision of clean drinking water, sanitation, maintenance of public places, and keeping records of births and deaths. The second tier is the Block Samiti (also called Panchayat Samiti or Khand Samiti), which works at the block level — covering 20 to 50 villages. It executes development programmes, encourages agriculture and small industries, and helps remove illiteracy. The Block Development Officer (BDO) is its executive head. The third and highest tier is the Zila Parishad, which works at the district level. India has 641 districts, so there are 641 Zila Parishads. It coordinates grants from the state government and prepares a comprehensive development plan for the district. This three-tier system is important for Indian democracy because it brings governance to the grassroots level, empowers ordinary citizens to participate in decision-making, and teaches democracy from the village upward.',
      hint: 'Describe each tier: (1) Gram Panchayat — village level, (2) Block Samiti — block level (20–50 villages), (3) Zila Parishad — district level. For each, say what it does and why it matters.',
      reexplanation: 'Your answer should cover all three tiers in order from bottom to top: Gram Panchayat (village level — elected by Gram Sabha, performs 13 services), Block Samiti (block level — 20-50 villages, executes development, headed by BDO), Zila Parishad (district level — highest tier, 641 districts). Then explain why the system matters: brings democracy to the grassroots, empowers local communities, reduces burden on central government.',
    },
  ],
}

// ─── CHAPTER 6 — The Power of Determination ──────────────────────────────────

const quiz6: ChapterQuiz = {
  chapterId: 6,
  title: 'The Power of Determination',
  totalMarks: 25,
  questions: [
    {
      id: 1, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'According to the chapter, what is the "golden rule to success"?',
      options: [
        { label: 'A', text: 'Hard work' },
        { label: 'B', text: 'Determination' },
        { label: 'C', text: 'Intelligence' },
        { label: 'D', text: 'Luck' },
      ],
      answer: 'B',
      reexplanation: 'The chapter states that determination is the golden rule to success. When a desire becomes strong enough, it takes the form of determination. Unlike luck or intelligence, determination is something every person can develop — it is a choice and a commitment.',
    },
    {
      id: 2, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which three aspects of the self does determination work through?',
      options: [
        { label: 'A', text: 'Mind, Heart, Soul' },
        { label: 'B', text: 'Thought, Action, Result' },
        { label: 'C', text: 'Mind, Speech, Body' },
        { label: 'D', text: 'Desire, Effort, Reward' },
      ],
      answer: 'C',
      reexplanation: 'Determination works through three aspects: Mind (that which thinks), Speech (sounds that make sense and communicate), and Body (the physical form that carries out commands). When determination is practised with all three, unity between the external and internal body is established — leading to happiness and peace.',
    },
    {
      id: 3, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'What are the three functions of the Mind?',
      options: [
        { label: 'A', text: 'Seeing, hearing, touching' },
        { label: 'B', text: 'Recalling, contemplating, imagining' },
        { label: 'C', text: 'Speaking, acting, resting' },
        { label: 'D', text: 'Planning, doing, reviewing' },
      ],
      answer: 'B',
      reexplanation: 'According to the chapter, the Mind performs three functions: recalling (remembering past events), contemplating (thinking deeply about something), and imagining (creating mental pictures or scenarios). When the mind is firmly determined, all three functions work together to stop us from harmful thoughts.',
    },
    {
      id: 4, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'Which of the following is NOT one of the three ways of performing actions?',
      options: [
        { label: 'A', text: 'Doing oneself' },
        { label: 'B', text: 'Making others do' },
        { label: 'C', text: 'Ignoring what others do' },
        { label: 'D', text: 'Approving what others do' },
      ],
      answer: 'C',
      reexplanation: 'The three ways of performing actions are: (1) Doing oneself, (2) Making others do, and (3) Approving what others do. Ignoring is not one of the three — in fact, the chapter teaches that silence and approval of wrongdoing carry the same responsibility as doing it yourself.',
    },
    {
      id: 5, type: 'mcq', marks: 1,
      sectionId: 3,
      question: 'According to the chapter, what results when mind, body, speech and actions are all aligned towards a positive outcome?',
      options: [
        { label: 'A', text: 'Fame and power' },
        { label: 'B', text: 'Happiness and peace' },
        { label: 'C', text: 'Wealth and comfort' },
        { label: 'D', text: 'Knowledge and strength' },
      ],
      answer: 'B',
      reexplanation: 'The chapter states: "Mind, body, speech and actions, if determined to align towards a positive outcome, will always bring happiness and peace." When all four are aligned — when you think, speak, and act in the same positive direction — you experience a deep sense of peace and confidence.',
    },
    {
      id: 6, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is the word used in the chapter for the unity of the external body and internal mind achieved through determination?',
      answer: 'Yoga',
      reexplanation: 'In the context of this chapter, yoga refers to the unity of mind, speech and body — not just physical postures. When we practise determination with all three aspects, the unity between the external and the internal body is established. This unity is called yoga.',
    },
    {
      id: 7, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What does "Speech" mean according to the chapter?',
      answer: 'Sounds that make some sense',
      reexplanation: 'According to the chapter, speech refers to "sounds that make some sense" — meaning communication through words. When we are determined that we will not commit violence through speech, our mind controls what we say and stops us from using language that may hurt others.',
    },
    {
      id: 8, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'According to the chapter, what happens when a desire becomes strong enough?',
      answer: 'It becomes determination',
      reexplanation: 'The chapter states: "When a desire becomes strong enough, it takes the form of determination." Determination is not just a weak wish — it is a strong, firm resolve to achieve something, no matter how difficult.',
    },
    {
      id: 9, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What does "contemplating" mean as one of the functions of the mind?',
      answer: 'Thinking deeply about something',
      reexplanation: 'Contemplating means thinking deeply or meditating on something. It is one of the three functions of the mind — along with recalling (remembering) and imagining (creating mental pictures). When a person contemplates something, they engage with it thoughtfully and thoroughly.',
    },
    {
      id: 10, type: 'single_word', marks: 1,
      sectionId: 4,
      question: 'What is it called when a person does not do something themselves but supports others in doing it?',
      answer: 'Approving',
      reexplanation: 'Approving what others do is the third way of performing actions. Even if you do not do something yourself, and you do not ask someone else to do it — if you approve of it (by staying silent, laughing, or encouraging), you are considered a participant and share in the responsibility.',
    },
    {
      id: 11, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "determination" in a sentence about a student\'s goal.',
      answer: 'With determination and daily practice, she studied every evening and scored top marks in her final exams.',
      hint: 'Determination means the firm resolve to achieve something despite difficulties.',
      reexplanation: 'Determination is the strong inner resolve to achieve a goal. It is not just wanting something — it is committing to it fully and working towards it consistently. Write a sentence where someone\'s determination helps them achieve something that was difficult.',
    },
    {
      id: 12, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "aligned" in a sentence about thoughts, words and actions.',
      answer: 'When your thoughts, words and actions are aligned — when you think, say and do the same honest thing — you live with a clear conscience and deep peace.',
      hint: 'Aligned means arranged in the same direction, working towards the same goal.',
      reexplanation: 'Aligned means all parts moving in the same direction. When mind, speech and body are all aligned towards a positive goal — when what you think, say and do are all the same — you experience inner peace and confidence. When they are misaligned (saying one thing and doing another), you feel anxious and guilty.',
    },
    {
      id: 13, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "responsibility" in a sentence about approving wrongdoing.',
      answer: 'Staying silent when someone is being bullied is not innocence — it is a form of approval, and with approval comes responsibility.',
      hint: 'Responsibility means being accountable for an action or its consequences.',
      reexplanation: 'The chapter teaches that approving of a wrong action carries the same responsibility as doing it yourself. Silence, laughter, or encouragement in the face of wrongdoing makes you a participant. Write a sentence that connects this idea of responsibility to approving.',
    },
    {
      id: 14, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the word "vow" in a sentence about determination.',
      answer: 'When a student takes a vow to be honest in all exams, their mind, speech and body all work together to keep that commitment.',
      hint: 'A vow is a solemn, firm promise made to oneself.',
      reexplanation: 'A vow is a firm, solemn commitment. In the chapter, taking a vow is described as the way to guide the mind, speech and body towards a specific goal. When a person takes a vow — such as a vow of nonviolence — all three aspects of the self work together to honour it.',
    },
    {
      id: 15, type: 'sentence', marks: 2,
      sectionId: 5,
      question: 'Use the phrase "mind, speech and body" in a sentence about honesty.',
      answer: 'A truly honest person has honesty in mind, speech and body — they do not think dishonest thoughts, say dishonest words, or take dishonest actions.',
      hint: 'Mind, speech and body are the three aspects through which determination works.',
      reexplanation: 'The chapter teaches that true determination works through all three aspects: mind (thoughts), speech (words), and body (actions). For something like honesty, all three must be aligned — you cannot be honest in words but dishonest in thoughts or actions.',
    },
    {
      id: 16, type: 'long_answer', marks: 5,
      sectionId: 7,
      question: 'The chapter says: "Mind, body, speech and actions, if determined to align towards a positive outcome, will always bring happiness and peace." Do you agree with this? Explain using an example of your own.',
      answer: 'I completely agree with this statement. The chapter teaches that when all four — mind, body, speech and actions — are aligned towards a positive goal, the result is always happiness and peace. Let me explain with an example. Imagine a student who has decided to be completely honest. Their mind does not think of ways to cheat. Their speech does not encourage others to cheat. Their body does not carry cheat sheets. And they do not approve when others cheat. All four are aligned. The result is a clear conscience, genuine success, and deep inner peace — even if the marks are not the highest. Contrast this with a student who cheats. Their mind is always anxious about getting caught. Their speech is full of excuses. Inside, they know what they did was wrong. There is no alignment — and no peace. This is exactly what the chapter means. Determination is not about what you say you will do. It is about aligning what you think, say, and do towards the same good goal. When you achieve this alignment, peace follows naturally.',
      hint: 'Agree or disagree with the statement, then use a personal example to show how alignment of mind, speech and body towards a positive goal leads to peace — and how misalignment leads to anxiety.',
      reexplanation: 'Take a clear position (agree or disagree) and back it up with a concrete example. The strongest examples show the contrast: what happens when all four aspects are aligned (peace, confidence, good results) versus when they are not aligned (anxiety, guilt, hidden burden). Use a situation from your own life — honesty in exams, helping a friend, keeping a promise — to make it personal and real.',
    },
  ],
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const ALL_HC_QUIZZES: ChapterQuiz[] = [
  quiz1, quiz2, quiz3, quiz4, quiz5, quiz6,
]

export function getHCQuiz(chapterId: number): ChapterQuiz | undefined {
  return ALL_HC_QUIZZES.find(q => q.chapterId === chapterId)
}
