'use client'

import { useState, useEffect } from 'react'

// ── Date helpers ──────────────────────────────────────────────────────────────

function getDayOfYear(): number {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const diff = now.getTime() - start.getTime()
  return Math.floor(diff / (1000 * 60 * 60 * 24))
}

function getTodayKey(): string {
  const now = new Date()
  return `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`
}

function getDayOfWeek(): number {
  return new Date().getDay() // 0=Sun,1=Mon,...,6=Sat
}

function pickByDay<T>(arr: T[]): T {
  return arr[getDayOfYear() % arr.length]
}

// ── Question banks ────────────────────────────────────────────────────────────

// ENGLISH — 6 game types, rotate by day of week
const ENGLISH_WORDS = [
  { word: 'Eloquent',    meaning: 'Fluent or persuasive in speaking or writing',      synonym: 'Articulate',  antonym: 'Inarticulate', sentence: ['She', 'gave', 'an', 'eloquent', 'speech'], spellings: ['Eloquent','Elequant','Eloqeunt','Eloqwent'] },
  { word: 'Benevolent',  meaning: 'Well-meaning and kindly',                           synonym: 'Generous',    antonym: 'Cruel',        sentence: ['The', 'benevolent', 'king', 'helped', 'the', 'poor'], spellings: ['Benevolent','Benovelent','Benevelont','Benevolant'] },
  { word: 'Diligent',    meaning: 'Having or showing care in one\'s work',             synonym: 'Hardworking', antonym: 'Lazy',         sentence: ['She', 'is', 'a', 'diligent', 'student'], spellings: ['Diligent','Dilligent','Deligent','Diligant'] },
  { word: 'Persevere',   meaning: 'Continue despite difficulty',                       synonym: 'Persist',     antonym: 'Quit',         sentence: ['We', 'must', 'persevere', 'through', 'hardship'], spellings: ['Persevere','Persevear','Persivere','Perservere'] },
  { word: 'Eloquence',   meaning: 'Fluent and effective use of language',              synonym: 'Articulacy',  antonym: 'Silence',      sentence: ['His', 'eloquence', 'impressed', 'everyone'], spellings: ['Eloquence','Eloqence','Eloquanse','Eloqwence'] },
  { word: 'Tenacious',   meaning: 'Holding firm to a purpose; persistent',             synonym: 'Determined',  antonym: 'Weak-willed',  sentence: ['The', 'tenacious', 'athlete', 'never', 'gave', 'up'], spellings: ['Tenacious','Tenacous','Tenacius','Tenasious'] },
  { word: 'Prudent',     meaning: 'Acting with care and thought for the future',       synonym: 'Wise',        antonym: 'Reckless',     sentence: ['It', 'is', 'prudent', 'to', 'save', 'money'], spellings: ['Prudent','Pruedent','Prudant','Proodent'] },
  { word: 'Resilient',   meaning: 'Able to recover quickly from difficulties',         synonym: 'Tough',       antonym: 'Fragile',      sentence: ['Children', 'are', 'remarkably', 'resilient'], spellings: ['Resilient','Resiliant','Resillient','Resileint'] },
  { word: 'Virtuous',    meaning: 'Having high moral standards',                       synonym: 'Righteous',   antonym: 'Immoral',      sentence: ['He', 'led', 'a', 'virtuous', 'life'], spellings: ['Virtuous','Virtouous','Virtous','Virtuos'] },
  { word: 'Serene',      meaning: 'Calm, peaceful and untroubled',                     synonym: 'Tranquil',    antonym: 'Agitated',     sentence: ['The', 'lake', 'was', 'perfectly', 'serene'], spellings: ['Serene','Sereen','Serean','Sereene'] },
  { word: 'Gallant',     meaning: 'Brave, heroic and chivalrous',                      synonym: 'Brave',       antonym: 'Cowardly',     sentence: ['The', 'gallant', 'soldier', 'saved', 'his', 'friends'], spellings: ['Gallant','Galant','Gallent','Galleant'] },
  { word: 'Humble',      meaning: 'Having a modest view of one\'s importance',         synonym: 'Modest',      antonym: 'Arrogant',     sentence: ['Despite', 'his', 'success', 'he', 'stayed', 'humble'], spellings: ['Humble','Humbal','Humble','Humbell'] },
  { word: 'Candid',      meaning: 'Truthful and straightforward',                      synonym: 'Honest',      antonym: 'Deceptive',    sentence: ['She', 'gave', 'a', 'candid', 'opinion'], spellings: ['Candid','Candied','Candiid','Candedd'] },
  { word: 'Jubilant',    meaning: 'Feeling or expressing great happiness',             synonym: 'Joyful',      antonym: 'Sorrowful',    sentence: ['The', 'team', 'was', 'jubilant', 'after', 'winning'], spellings: ['Jubilant','Jubilent','Jubelant','Jubillant'] },
  { word: 'Frugal',      meaning: 'Sparing or economical with money',                  synonym: 'Thrifty',     antonym: 'Wasteful',     sentence: ['She', 'was', 'frugal', 'with', 'her', 'pocket', 'money'], spellings: ['Frugal','Froogal','Frugel','Frugle'] },
  { word: 'Amicable',    meaning: 'Having a spirit of friendliness',                   synonym: 'Friendly',    antonym: 'Hostile',      sentence: ['They', 'reached', 'an', 'amicable', 'solution'], spellings: ['Amicable','Amicible','Amicabel','Amikable'] },
  { word: 'Meticulous',  meaning: 'Showing great attention to detail',                 synonym: 'Careful',     antonym: 'Careless',     sentence: ['She', 'was', 'meticulous', 'in', 'her', 'work'], spellings: ['Meticulous','Meticulious','Metticulous','Meticuluos'] },
  { word: 'Empathy',     meaning: 'Understanding another\'s feelings',                 synonym: 'Compassion',  antonym: 'Indifference', sentence: ['Empathy', 'is', 'the', 'key', 'to', 'kindness'], spellings: ['Empathy','Empthy','Empathey','Emphathy'] },
  { word: 'Eloquent',    meaning: 'Well-expressed and persuasive',                     synonym: 'Articulate',  antonym: 'Mumbling',     sentence: ['He', 'wrote', 'an', 'eloquent', 'letter'], spellings: ['Eloquent','Elokwent','Eloqeunt','Elequent'] },
  { word: 'Vigilant',    meaning: 'Keeping careful watch for danger',                  synonym: 'Alert',       antonym: 'Careless',     sentence: ['Stay', 'vigilant', 'on', 'the', 'road'], spellings: ['Vigilant','Vigillant','Vigilent','Vigilant'] },
  { word: 'Gregarious',  meaning: 'Fond of company; sociable',                         synonym: 'Sociable',    antonym: 'Shy',          sentence: ['She', 'is', 'a', 'gregarious', 'person'], spellings: ['Gregarious','Gregarius','Grigarious','Gregareous'] },
  { word: 'Tranquil',    meaning: 'Free from disturbance; calm',                       synonym: 'Peaceful',    antonym: 'Turbulent',    sentence: ['The', 'garden', 'was', 'tranquil', 'at', 'dawn'], spellings: ['Tranquil','Tranquill','Tranquile','Trankwil'] },
  { word: 'Magnanimous', meaning: 'Generous or forgiving toward rivals or enemies',    synonym: 'Generous',    antonym: 'Petty',        sentence: ['He', 'was', 'magnanimous', 'in', 'victory'], spellings: ['Magnanimous','Magnanimus','Magnanimeous','Magnanimoous'] },
  { word: 'Zealous',     meaning: 'Having great energy or enthusiasm for a cause',     synonym: 'Enthusiastic',antonym: 'Apathetic',    sentence: ['She', 'was', 'zealous', 'in', 'her', 'efforts'], spellings: ['Zealous','Zeolous','Zealus','Zelous'] },
  { word: 'Lucid',       meaning: 'Expressed clearly; easy to understand',             synonym: 'Clear',       antonym: 'Confusing',    sentence: ['Give', 'a', 'lucid', 'explanation'], spellings: ['Lucid','Lusid','Luccid','Lucied'] },
  { word: 'Solemn',      meaning: 'Formal and dignified; serious',                     synonym: 'Serious',     antonym: 'Cheerful',     sentence: ['The', 'ceremony', 'was', 'solemn', 'and', 'dignified'], spellings: ['Solemn','Sollemn','Solomn','Solemne'] },
  { word: 'Inquisitive', meaning: 'Having a strong desire to learn or know things',    synonym: 'Curious',     antonym: 'Indifferent',  sentence: ['He', 'was', 'an', 'inquisitive', 'child'], spellings: ['Inquisitive','Inqisitive','Inquizitive','Inquisiteve'] },
  { word: 'Versatile',   meaning: 'Able to adapt to many different functions',         synonym: 'Adaptable',   antonym: 'Limited',      sentence: ['She', 'is', 'a', 'versatile', 'athlete'], spellings: ['Versatile','Versatill','Versatyle','Versitile'] },
  { word: 'Sincere',     meaning: 'Free from pretence; genuine',                       synonym: 'Genuine',     antonym: 'Fake',         sentence: ['Please', 'give', 'a', 'sincere', 'apology'], spellings: ['Sincere','Sincear','Sinceere','Sinceer'] },
  { word: 'Audacious',   meaning: 'Showing a willingness to take bold risks',          synonym: 'Bold',        antonym: 'Timid',        sentence: ['It', 'was', 'an', 'audacious', 'plan'], spellings: ['Audacious','Audacous','Audatious','Audacious'] },
]

// MATHS — mental maths challenges
const MATHS_QUESTIONS = [
  { q: 'What is 25% of 200?',                          options: ['40','50','60','45'],         answer: '50'  },
  { q: 'LCM of 4 and 6 is?',                           options: ['12','24','8','6'],           answer: '12'  },
  { q: 'Area of a square with side 9 cm?',             options: ['36 cm²','81 cm²','18 cm²','72 cm²'], answer: '81 cm²' },
  { q: 'Volume of a cube with side 3 cm?',             options: ['9 cm³','27 cm³','18 cm³','12 cm³'], answer: '27 cm³' },
  { q: '3/4 + 1/4 = ?',                                options: ['1','4/8','2/4','3/8'],       answer: '1'   },
  { q: 'HCF of 12 and 18 is?',                         options: ['3','6','9','12'],            answer: '6'   },
  { q: 'What is 15% of 300?',                          options: ['30','45','50','60'],         answer: '45'  },
  { q: 'Perimeter of a rectangle 8 cm × 5 cm?',       options: ['26 cm','40 cm','13 cm','24 cm'], answer: '26 cm' },
  { q: '75² = ?',                                      options: ['5025','5625','5225','5725'], answer: '5625' },
  { q: 'Ratio of 50 paise to ₹2 in simplest form?',   options: ['1:4','1:2','2:5','1:3'],     answer: '1:4'  },
  { q: '5/8 ÷ 5/4 = ?',                               options: ['1/2','2/5','25/32','4/8'],   answer: '1/2'  },
  { q: 'What is 0.25 as a percentage?',                options: ['2.5%','0.25%','25%','250%'], answer: '25%'  },
  { q: '21 × 22 using Vedic method = ?',               options: ['452','462','442','472'],      answer: '462'  },
  { q: 'Area of rectangle 12 cm × 7 cm?',             options: ['84 cm²','38 cm²','72 cm²','96 cm²'], answer: '84 cm²' },
  { q: 'LCM of 8, 12 and 16 is?',                     options: ['24','48','96','32'],          answer: '48'   },
  { q: 'What is 1/3 as a percentage?',                 options: ['30%','33⅓%','33%','13%'],    answer: '33⅓%' },
  { q: 'HCF × LCM of two numbers = ?',                options: ['Sum of numbers','Product of numbers','Difference','Quotient'], answer: 'Product of numbers' },
  { q: 'Successor of 9999 is?',                       options: ['9998','10000','9990','10001'], answer: '10000' },
  { q: '45² using Vedic = ?',                          options: ['2025','2015','2005','2035'],  answer: '2025'  },
  { q: 'Convert 134% to fraction in lowest terms?',   options: ['67/50','134/10','13/4','33/25'], answer: '67/50' },
  { q: 'Volume of cuboid 5×3×2 cm?',                  options: ['10 cm³','30 cm³','20 cm³','25 cm³'], answer: '30 cm³' },
  { q: '2/5 + 3/10 = ?',                              options: ['5/15','7/10','1/2','5/10'],   answer: '7/10'  },
  { q: 'Perimeter of square with side 6.5 cm?',       options: ['26 cm','42.25 cm','13 cm','16 cm'], answer: '26 cm' },
  { q: 'Additive identity in whole numbers?',          options: ['1','0','10','Any number'],    answer: '0'     },
  { q: 'What is 20% of 450?',                         options: ['80','90','100','45'],          answer: '90'    },
  { q: 'Ratio in simplest form: 36:48?',              options: ['3:4','4:3','9:12','6:8'],      answer: '3:4'   },
  { q: 'Is 2 a prime number?',                        options: ['Yes — only even prime','No — it has 3 factors','No — it is composite','Yes — all small numbers are prime'], answer: 'Yes — only even prime' },
  { q: 'Area of square with perimeter 40 cm?',        options: ['100 cm²','160 cm²','200 cm²','80 cm²'], answer: '100 cm²' },
  { q: '23 × 27 using Vedic = ?',                     options: ['621','641','611','651'],        answer: '621'  },
  { q: 'LCM of co-prime numbers 7 and 9?',            options: ['63','16','7','9'],              answer: '63'   },
]

// SCIENCE — True or False
const SCIENCE_TF = [
  { statement: 'A magnet always has two poles — North and South.',                    answer: true,  explanation: 'Every magnet has two poles. A monopole (single pole) does not exist — if you cut a magnet in half, each half still has both poles.' },
  { statement: 'Simple machines always reduce the amount of work done.',              answer: false, explanation: 'Simple machines do NOT reduce work. They change the direction or magnitude of force, making work easier, but the total work done remains the same.' },
  { statement: 'Work is done when a force causes displacement in its direction.',     answer: true,  explanation: 'W = F × d. Work is done only when force causes displacement in the direction of the force.' },
  { statement: 'An atom is the smallest particle that cannot be divided further.',    answer: false, explanation: 'Atoms can be divided into subatomic particles: protons, neutrons, and electrons.' },
  { statement: 'Rusting of iron is a physical change.',                              answer: false, explanation: 'Rusting is a chemical change — iron reacts with oxygen and water to form iron oxide (rust), which is a new substance.' },
  { statement: 'The cell is the basic structural and functional unit of all life.',  answer: true,  explanation: 'All living organisms are made of cells. The cell theory states that the cell is the basic unit of life.' },
  { statement: 'Chlorophyll is found in the roots of a plant.',                      answer: false, explanation: 'Chlorophyll is found in the leaves (in chloroplasts), not in roots. Roots absorb water and minerals.' },
  { statement: 'The diaphragm plays a role in breathing.',                           answer: true,  explanation: 'The diaphragm is a dome-shaped muscle below the lungs. It contracts during inhalation and relaxes during exhalation.' },
  { statement: 'Magnets attract all metals.',                                         answer: false, explanation: 'Magnets only attract ferromagnetic materials: iron, nickel, and cobalt. They do not attract aluminium, copper, or gold.' },
  { statement: 'Energy can be created and destroyed.',                               answer: false, explanation: 'Energy cannot be created or destroyed — only converted from one form to another. This is the Law of Conservation of Energy.' },
  { statement: 'A lever is a type of simple machine.',                               answer: true,  explanation: 'Yes. A lever is one of the six types of simple machines, along with the wheel and axle, pulley, inclined plane, wedge, and screw.' },
  { statement: 'Protons are negatively charged particles in an atom.',               answer: false, explanation: 'Protons are positively charged. Electrons are negatively charged. Neutrons have no charge.' },
  { statement: 'Burning wood is a chemical change.',                                 answer: true,  explanation: 'Burning is a chemical change. New substances (ash, carbon dioxide, water vapour) are formed that cannot be reversed.' },
  { statement: 'Plants produce oxygen during photosynthesis.',                       answer: true,  explanation: 'During photosynthesis, plants use sunlight, water, and CO₂ to make glucose and release oxygen as a by-product.' },
  { statement: 'The human respiratory system includes the kidneys.',                 answer: false, explanation: 'The kidneys are part of the excretory system. The respiratory system includes the nose, trachea, lungs, bronchi, and diaphragm.' },
  { statement: 'A pulley changes the direction of force.',                           answer: true,  explanation: 'A fixed pulley changes the direction of force (you pull down to lift up). A movable pulley reduces the effort needed.' },
  { statement: 'Like poles of magnets attract each other.',                          answer: false, explanation: 'Like poles REPEL each other. Unlike poles (N-S) attract each other.' },
  { statement: 'Melting of ice is a physical change.',                               answer: true,  explanation: 'Melting is a physical change because only the state changes (solid to liquid) — the chemical composition of water (H₂O) stays the same.' },
  { statement: 'An electron has more mass than a proton.',                           answer: false, explanation: 'A proton is about 1836 times heavier than an electron. Electrons have negligible mass compared to protons and neutrons.' },
  { statement: 'Stomata are found on the surface of leaves.',                        answer: true,  explanation: 'Stomata are tiny pores on leaf surfaces (mostly the underside) through which gases are exchanged and water vapour is lost.' },
  { statement: 'Work done = Force × Distance.',                                      answer: true,  explanation: 'W = F × d. The SI unit of work is the joule (J). Work is done only when there is displacement in the direction of force.' },
  { statement: 'All plants have chlorophyll.',                                        answer: false, explanation: 'Not all plants have chlorophyll. Parasitic plants like Cuscuta (dodder) lack chlorophyll and get nutrients from host plants.' },
  { statement: 'The nucleus of an atom contains protons and neutrons.',              answer: true,  explanation: 'The nucleus is the dense central part of an atom containing protons (+) and neutrons (no charge). Electrons orbit around the nucleus.' },
  { statement: 'A screw is an inclined plane wound around a cylinder.',              answer: true,  explanation: 'A screw is essentially an inclined plane (ramp) wrapped around a cylindrical shaft. It converts rotational force into linear motion.' },
  { statement: 'Oxygen is produced during respiration.',                             answer: false, explanation: 'Oxygen is CONSUMED during respiration. CO₂ is produced. (In photosynthesis, the opposite happens — oxygen is produced.)' },
  { statement: 'The cell wall is found in animal cells.',                            answer: false, explanation: 'Cell walls are found in plant cells (made of cellulose). Animal cells only have a cell membrane.' },
  { statement: 'Kinetic energy is energy due to motion.',                            answer: true,  explanation: 'KE = ½mv². Kinetic energy is the energy an object possesses because of its motion.' },
  { statement: 'A compass needle points towards the geographic South Pole.',         answer: false, explanation: 'A compass needle points towards the magnetic North Pole (geographic north). The needle\'s north-seeking end points north.' },
  { statement: 'Respiration occurs only in animals.',                                answer: false, explanation: 'Respiration occurs in ALL living organisms — plants, animals, and microorganisms. It is the process of releasing energy from glucose.' },
  { statement: 'The wheel and axle is a type of simple machine.',                    answer: true,  explanation: 'Yes. The wheel and axle (e.g., a doorknob, steering wheel) is one of the six simple machines.' },
]

// HISTORY — Fill in the blank
const HISTORY_FITB = [
  { q: 'The Vedas are written in ______ language.',         answer: 'Sanskrit',   options: ['Sanskrit','Hindi','Pali','Tamil'] },
  { q: 'The Preamble begins with the words "We, the ______ of India".',  answer: 'People',    options: ['People','Citizens','Leaders','Rulers'] },
  { q: 'India became a republic on ______ January 1950.',  answer: '26th',       options: ['26th','15th','2nd','1st'] },
  { q: 'The Rig Veda contains ______ hymns.',               answer: '1028',       options: ['1028','108','1008','2028'] },
  { q: 'Swami Vivekananda represented India at the Parliament of Religions in ______.',  answer: 'Chicago', options: ['Chicago','London','Paris','New York'] },
  { q: 'India\'s villages are governed by the ______.',     answer: 'Gram Panchayat', options: ['Gram Panchayat','District Court','Municipal Corporation','State Assembly'] },
  { q: 'The four Vedas are Rigveda, Samaveda, Yajurveda and ______.',   answer: 'Atharvaveda', options: ['Atharvaveda','Upanishad','Gita','Purana'] },
  { q: 'The Preamble declares India to be a Sovereign, Socialist, Secular, Democratic ______.',  answer: 'Republic', options: ['Republic','Kingdom','Federation','Empire'] },
  { q: 'Ram Mohan Roy founded the ______ in 1828.',         answer: 'Brahmo Samaj', options: ['Brahmo Samaj','Arya Samaj','Prarthana Samaj','Ramakrishna Mission'] },
  { q: 'The village head in a Gram Panchayat is called the ______.',  answer: 'Sarpanch',   options: ['Sarpanch','Mayor','MLA','Collector'] },
  { q: 'Swami Dayananda Saraswati founded the ______ in 1875.',       answer: 'Arya Samaj',  options: ['Arya Samaj','Brahmo Samaj','Theosophical Society','Ramakrishna Mission'] },
  { q: 'The word "Veda" means ______.',                     answer: 'Knowledge',  options: ['Knowledge','Prayer','Sacrifice','Wisdom'] },
  { q: 'The fundamental duties of citizens are in ______ of the Constitution.',  answer: 'Part IVA', options: ['Part IVA','Part III','Part IV','Part II'] },
  { q: 'Ramakrishna Paramahamsa\'s most famous disciple was ______.',  answer: 'Swami Vivekananda', options: ['Swami Vivekananda','Dayananda Saraswati','Ram Mohan Roy','Bal Gangadhar Tilak'] },
  { q: 'The Gram Sabha consists of all ______ voters of the village.',  answer: 'adult',      options: ['adult','male','educated','registered'] },
  { q: 'India has ______ Fundamental Rights.',              answer: 'six',        options: ['six','seven','five','eight'] },
  { q: 'The Upanishads are also called ______.',            answer: 'Vedanta',    options: ['Vedanta','Vedanga','Brahmana','Aranyaka'] },
  { q: 'Our Constitution was adopted on ______ November 1949.',  answer: '26th',  options: ['26th','15th','1st','2nd'] },
  { q: 'The Bhagavad Gita is a part of the epic ______.',   answer: 'Mahabharata', options: ['Mahabharata','Ramayana','Rigveda','Upanishad'] },
  { q: 'Justice, Liberty, Equality and ______ are the aims stated in the Preamble.',  answer: 'Fraternity', options: ['Fraternity','Harmony','Unity','Peace'] },
  { q: 'The "Father of the Indian Constitution" is ______.',  answer: 'B.R. Ambedkar', options: ['B.R. Ambedkar','Jawaharlal Nehru','Mahatma Gandhi','Sardar Patel'] },
  { q: 'Mahatma Gandhi\'s philosophy of non-violence is called ______.',  answer: 'Ahimsa',   options: ['Ahimsa','Satya','Dharma','Karma'] },
  { q: 'The Pancayati Raj system has ______ levels of government.',  answer: 'three',     options: ['three','two','four','five'] },
  { q: 'India has ______ Fundamental Duties for citizens.',  answer: 'eleven',     options: ['eleven','ten','six','eight'] },
  { q: 'The concept of Dharma (duty) is central to ______.',  answer: 'Hinduism',  options: ['Hinduism','Buddhism','Jainism','Sikhism'] },
  { q: 'The right to equality is a ______ Right.',           answer: 'Fundamental', options: ['Fundamental','Constitutional','Legal','Natural'] },
  { q: 'Swami Vivekananda\'s speech at Chicago began with "Sisters and ______".',  answer: 'Brothers', options: ['Brothers','Friends','Gentlemen','Countrymen'] },
  { q: 'The Gram Panchayat is at the ______ level of Panchayati Raj.',  answer: 'village',   options: ['village','block','district','state'] },
  { q: 'Adi Shankaracharya wrote the ______ Bhashya (commentary).',     answer: 'Brahma Sutra', options: ['Brahma Sutra','Yoga Sutra','Nyaya Sutra','Mimamsa Sutra'] },
  { q: 'The Indian national anthem was written by ______.',  answer: 'Rabindranath Tagore', options: ['Rabindranath Tagore','Bankim Chandra','Mahatma Gandhi','Jawaharlal Nehru'] },
]

// GEOGRAPHY — MCQ
const GEOGRAPHY_QUESTIONS = [
  { q: 'What is the standard meridian of India?',           options: ['82.5°E','77°E','90°E','75°E'],          answer: '82.5°E' },
  { q: 'Which is the largest continent?',                   options: ['Africa','Asia','North America','Europe'], answer: 'Asia' },
  { q: 'The Tropic of Cancer passes through India at which latitude?', options: ['23.5°N','0°','66.5°N','23.5°S'], answer: '23.5°N' },
  { q: 'Which layer of the Earth is liquid?',               options: ['Crust','Mantle','Outer Core','Inner Core'], answer: 'Outer Core' },
  { q: 'A compass needle always points towards the?',       options: ['South','East','North','West'],            answer: 'North' },
  { q: 'The Earth completes one rotation in?',              options: ['365 days','24 hours','12 hours','30 days'], answer: '24 hours' },
  { q: 'Which is the longest river in India?',              options: ['Yamuna','Brahmaputra','Ganga','Godavari'], answer: 'Ganga' },
  { q: 'The scale of a map shows?',                         options: ['Direction','Symbols','Distance ratio','Elevation'], answer: 'Distance ratio' },
  { q: 'What causes day and night on Earth?',               options: ['Revolution','Rotation','Tilt','Eclipse'], answer: 'Rotation' },
  { q: 'Which is the smallest continent?',                  options: ['Europe','Antarctica','Australia','South America'], answer: 'Australia' },
  { q: 'Latitudes run in which direction?',                 options: ['North-South','East-West','Diagonal','Vertical'], answer: 'East-West' },
  { q: 'The Earth revolves around the Sun in?',             options: ['24 hours','365¼ days','30 days','12 hours'], answer: '365¼ days' },
  { q: 'Which is the highest peak in India?',               options: ['Mount Everest','K2','Kanchenjunga','Nanda Devi'], answer: 'Kanchenjunga' },
  { q: 'Longitudes are also called?',                       options: ['Parallels','Meridians','Equators','Tropics'], answer: 'Meridians' },
  { q: 'The equator is at which latitude?',                 options: ['90°N','23.5°N','0°','66.5°S'],            answer: '0°' },
  { q: 'Which ocean is the largest?',                       options: ['Atlantic','Indian','Arctic','Pacific'],    answer: 'Pacific' },
  { q: 'A physical map shows?',                             options: ['Political boundaries','Rivers and mountains','Roads','Railways'], answer: 'Rivers and mountains' },
  { q: 'The Arctic Circle is at?',                          options: ['23.5°N','66.5°N','90°N','0°'],            answer: '66.5°N' },
  { q: 'Which gas is most abundant in Earth\'s atmosphere?', options: ['Oxygen','Carbon dioxide','Nitrogen','Hydrogen'], answer: 'Nitrogen' },
  { q: 'The innermost layer of the Earth is the?',          options: ['Crust','Mantle','Outer Core','Inner Core'], answer: 'Inner Core' },
  { q: 'Which country has the largest area in the world?',  options: ['China','USA','Canada','Russia'],           answer: 'Russia' },
  { q: 'India is located in which hemisphere?',             options: ['Southern','Northern','Both','Western'],    answer: 'Northern' },
  { q: 'What is the full form of GMT?',                     options: ['Global Map Time','Greenwich Mean Time','General Meridian Time','Global Meridian Time'], answer: 'Greenwich Mean Time' },
  { q: 'Which is the national animal of India?',            options: ['Lion','Elephant','Tiger','Leopard'],       answer: 'Tiger' },
  { q: 'The Himalayas are examples of which type of mountains?', options: ['Block','Volcanic','Fold','Residual'], answer: 'Fold' },
  { q: 'How many states does India have?',                  options: ['28','29','30','27'],                        answer: '28' },
  { q: 'The sun rises in the?',                             options: ['West','North','South','East'],              answer: 'East' },
  { q: 'Which is the capital of India?',                    options: ['Mumbai','Kolkata','New Delhi','Chennai'],   answer: 'New Delhi' },
  { q: 'A globe is a model of the?',                        options: ['Moon','Sun','Earth','Solar System'],        answer: 'Earth' },
  { q: 'The Deccan Plateau is in which part of India?',     options: ['North','South','East','West'],              answer: 'South' },
]

// SANSKRIT — match word to meaning
const SANSKRIT_WORDS = [
  { word: 'नमः (Namah)',       meaning: 'Salutation / Bow',          options: ['Salutation / Bow','Victory','Peace','Blessing'] },
  { word: 'शान्तिः (Shantih)', meaning: 'Peace',                      options: ['Peace','Power','Wealth','Knowledge'] },
  { word: 'विद्या (Vidya)',    meaning: 'Knowledge / Education',      options: ['Knowledge / Education','Money','Food','Shelter'] },
  { word: 'गुरु (Guru)',       meaning: 'Teacher / Master',           options: ['Teacher / Master','Student','Parent','Elder'] },
  { word: 'धर्म (Dharma)',     meaning: 'Duty / Righteousness',       options: ['Duty / Righteousness','Money','Fame','Power'] },
  { word: 'सत्यम् (Satyam)',   meaning: 'Truth',                      options: ['Truth','Beauty','Goodness','Wealth'] },
  { word: 'अहिंसा (Ahimsa)',   meaning: 'Non-violence',               options: ['Non-violence','Bravery','Kindness','Patience'] },
  { word: 'प्रणाम (Pranam)',   meaning: 'Respectful greeting / bow',  options: ['Respectful greeting / bow','Farewell','Gratitude','Blessing'] },
  { word: 'वन्दे (Vande)',     meaning: 'I salute / I worship',       options: ['I salute / I worship','I love','I serve','I follow'] },
  { word: 'मातृभूमि (Matrubhumi)', meaning: 'Motherland',             options: ['Motherland','Homeland','Birthplace','Country'] },
  { word: 'ज्ञान (Jnana)',     meaning: 'Wisdom / Knowledge',         options: ['Wisdom / Knowledge','Strength','Courage','Power'] },
  { word: 'भारत (Bharat)',     meaning: 'India',                      options: ['India','Sun','King','World'] },
  { word: 'आचार्य (Acharya)',  meaning: 'Learned teacher',            options: ['Learned teacher','Elder','Leader','Scholar'] },
  { word: 'शिष्य (Shishya)',   meaning: 'Disciple / Student',         options: ['Disciple / Student','Friend','Servant','Devotee'] },
  { word: 'कर्म (Karma)',      meaning: 'Action / Deed',              options: ['Action / Deed','Fate','God','Prayer'] },
  { word: 'अध्ययन (Adhyayan)', meaning: 'Study',                      options: ['Study','Work','Play','Sleep'] },
  { word: 'सर्वे (Sarve)',     meaning: 'All / Everyone',             options: ['All / Everyone','Some','Many','Few'] },
  { word: 'सुखिनः (Sukhinah)', meaning: 'Happy / Joyful',             options: ['Happy / Joyful','Healthy','Wise','Peaceful'] },
  { word: 'भवन्तु (Bhavantu)', meaning: 'May they be / Let them be', options: ['May they be / Let them be','They are','They were','They will'] },
  { word: 'लोका (Loka)',       meaning: 'World / Realm',              options: ['World / Realm','Sky','Earth','Heaven'] },
  { word: 'समस्त (Samastha)',  meaning: 'All / Entire',               options: ['All / Entire','Half','Part','Some'] },
  { word: 'पृथ्वी (Prithvi)',  meaning: 'Earth',                      options: ['Earth','Water','Fire','Air'] },
  { word: 'आकाश (Akash)',      meaning: 'Sky / Space',                options: ['Sky / Space','Ocean','Mountain','Forest'] },
  { word: 'अग्नि (Agni)',      meaning: 'Fire',                       options: ['Fire','Water','Wind','Earth'] },
  { word: 'वायु (Vayu)',       meaning: 'Wind / Air',                 options: ['Wind / Air','Water','Fire','Sky'] },
  { word: 'अमृत (Amrit)',      meaning: 'Nectar of immortality',      options: ['Nectar of immortality','Honey','Milk','Water'] },
  { word: 'स्वर्ग (Swarga)',   meaning: 'Heaven',                     options: ['Heaven','Earth','Hell','Sky'] },
  { word: 'राज (Raja)',        meaning: 'King',                       options: ['King','Teacher','Warrior','Priest'] },
  { word: 'पुस्तक (Pustak)',   meaning: 'Book',                       options: ['Book','Pen','Desk','School'] },
  { word: 'विद्यालय (Vidyalay)', meaning: 'School',                   options: ['School','Temple','Market','Home'] },
]

// ICT — quick tech questions
const ICT_QUESTIONS = [
  { q: 'What does CPU stand for?',                          options: ['Central Processing Unit','Computer Power Unit','Central Program Utility','Core Processing Unit'], answer: 'Central Processing Unit' },
  { q: 'Which of these is an input device?',               options: ['Monitor','Printer','Keyboard','Speaker'],     answer: 'Keyboard' },
  { q: 'What does RAM stand for?',                         options: ['Random Access Memory','Read Access Memory','Rapid Access Module','Random Application Memory'], answer: 'Random Access Memory' },
  { q: 'Which storage device stores the most data?',       options: ['Floppy Disk','CD-ROM','Pen Drive','Hard Disk'], answer: 'Hard Disk' },
  { q: 'The internet is a global network of?',             options: ['Satellites','Computers','Telephones','Televisions'], answer: 'Computers' },
  { q: 'Which is an output device?',                       options: ['Scanner','Keyboard','Mouse','Monitor'],       answer: 'Monitor' },
  { q: 'MS Word is used for?',                             options: ['Drawing','Calculations','Word processing','Playing games'], answer: 'Word processing' },
  { q: 'What does WWW stand for?',                         options: ['World Wide Web','World Wide Workshop','Wide World Web','World Web Works'], answer: 'World Wide Web' },
  { q: 'Which key is used to delete text to the right of the cursor?', options: ['Backspace','Delete','Escape','Enter'], answer: 'Delete' },
  { q: 'A URL is the address of a?',                       options: ['Computer','Website','File','Network'],         answer: 'Website' },
  { q: 'Which device converts digital signals to analog for internet?', options: ['Router','Switch','Modem','Hub'],  answer: 'Modem' },
  { q: 'What does PDF stand for?',                         options: ['Portable Document Format','Printed Digital File','Personal Data Format','Public Document File'], answer: 'Portable Document Format' },
  { q: 'ROM stands for?',                                  options: ['Read Only Memory','Random Only Memory','Read Open Module','Record Only Memory'], answer: 'Read Only Memory' },
  { q: 'Which is NOT a social media platform?',            options: ['WhatsApp','Instagram','MS Excel','Twitter'],   answer: 'MS Excel' },
  { q: 'A byte is made up of how many bits?',              options: ['4','16','8','2'],                              answer: '8' },
  { q: 'Which key combination is used to Copy?',           options: ['Ctrl+V','Ctrl+X','Ctrl+C','Ctrl+Z'],           answer: 'Ctrl+C' },
  { q: 'The brain of a computer is the?',                  options: ['RAM','ROM','CPU','Hard Disk'],                  answer: 'CPU' },
  { q: 'Email is a way to send messages over the?',        options: ['Telephone','Post','Internet','Television'],     answer: 'Internet' },
  { q: 'Which file extension is for MS Word documents?',   options: ['.pdf','.xlsx','.docx','.pptx'],                answer: '.docx' },
  { q: 'A computer virus is a type of?',                   options: ['Hardware','Software','Firmware','Network'],     answer: 'Software' },
  { q: 'What does "Save As" do?',                          options: ['Deletes a file','Saves with a new name/location','Prints the file','Closes the file'], answer: 'Saves with a new name/location' },
  { q: 'Which of these is a web browser?',                 options: ['MS Word','Google Chrome','MS Paint','Notepad'], answer: 'Google Chrome' },
  { q: 'A keyboard shortcut to Undo is?',                  options: ['Ctrl+Y','Ctrl+X','Ctrl+Z','Ctrl+U'],           answer: 'Ctrl+Z' },
  { q: 'The @ symbol in an email address separates?',      options: ['First and last name','Username and domain','Subject and body','Sender and receiver'], answer: 'Username and domain' },
  { q: 'Which memory loses data when power is off?',       options: ['ROM','Hard Disk','RAM','CD'],                   answer: 'RAM' },
  { q: 'GPS stands for?',                                  options: ['Global Positioning System','General Purpose Software','Global Printer System','Geographic Position Standard'], answer: 'Global Positioning System' },
  { q: 'Which is the shortcut to Select All?',             options: ['Ctrl+S','Ctrl+A','Ctrl+X','Ctrl+P'],           answer: 'Ctrl+A' },
  { q: 'A scanner is used to?',                            options: ['Print documents','Convert physical documents to digital','Store data','Show images'], answer: 'Convert physical documents to digital' },
  { q: 'What does ISP stand for?',                         options: ['Internet Service Provider','Internal System Protocol','Internet Security Program','Integrated Software Package'], answer: 'Internet Service Provider' },
  { q: 'Which is the largest unit of storage?',            options: ['Kilobyte','Megabyte','Gigabyte','Terabyte'],    answer: 'Terabyte' },
]

// ── Activity card types ───────────────────────────────────────────────────────

type ActivityStatus = 'idle' | 'correct' | 'wrong' | 'revealed'

// ── Individual Activity Cards ─────────────────────────────────────────────────

function CardShell({ emoji, subject, color, children }: { emoji: string; subject: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      <div style={{ background: color, padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '16px' }}>{emoji}</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'white', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{subject}</p>
      </div>
      <div style={{ padding: '16px' }}>{children}</div>
    </div>
  )
}

function StatusBadge({ status, correct }: { status: ActivityStatus; correct?: string }) {
  if (status === 'idle') return null
  const isCorrect = status === 'correct'
  return (
    <div style={{ marginTop: '10px', padding: '10px 14px', borderRadius: '10px', background: isCorrect ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${isCorrect ? '#86EFAC' : '#FCA5A5'}` }}>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: isCorrect ? '#166534' : '#DC2626', marginBottom: correct && !isCorrect ? '4px' : '0' }}>
        {isCorrect ? '✓ Correct! Well done!' : '✗ Not quite!'}
      </p>
      {!isCorrect && correct && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151' }}>Answer: <strong>{correct}</strong></p>
      )}
    </div>
  )
}

// ENGLISH card
function EnglishCard({ todayKey }: { todayKey: string }) {
  const word = ENGLISH_WORDS[getDayOfYear() % ENGLISH_WORDS.length]
  const gameType = getDayOfWeek() // 0-6
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  const [arranged, setArranged] = useState<string[]>([])
  const [remaining, setRemaining] = useState<string[]>([])

  useEffect(() => {
    if (gameType === 4) setRemaining([...word.sentence].sort(() => Math.random() - 0.5))
  }, [todayKey])

  const checkMCQ = (choice: string, correct: string) => {
    setSelected(choice)
    setStatus(choice === correct ? 'correct' : 'wrong')
  }

  // Game 0: Word of the Day (Sun)
  if (gameType === 0 || gameType === 6) return (
    <CardShell emoji="📚" subject="English · Word of the Day" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '22px', color: '#1B4332', marginBottom: '6px' }}>{word.word}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '10px', fontStyle: 'italic' }}>{word.meaning}</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Example: <em>"She was a {word.word.toLowerCase()} student who never missed a day."</em></p>
    </CardShell>
  )

  // Game 1: Meaning Match (Mon)
  if (gameType === 1) return (
    <CardShell emoji="📚" subject="English · Meaning Match" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>What does this word mean?</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '12px' }}>{word.word}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[word.meaning, word.synonym, word.antonym, `To ${word.word.toLowerCase()}`].sort(() => Math.sin(getDayOfYear()) - 0.5).slice(0,4).map((opt, i) => (
          <button key={i} disabled={status !== 'idle'} onClick={() => checkMCQ(opt, word.meaning)}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (status === 'correct' && opt === word.meaning ? '#86EFAC' : status === 'wrong' && selected === opt ? '#FCA5A5' : opt === word.meaning && status === 'wrong' ? '#86EFAC' : '#E5E7EB') : '#E5E7EB'}`, background: selected === opt ? (status === 'correct' ? '#F0FDF4' : '#FEF2F2') : opt === word.meaning && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={word.meaning}/>
    </CardShell>
  )

  // Game 2: Synonym Finder (Tue)
  if (gameType === 2) return (
    <CardShell emoji="📚" subject="English · Synonym" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>Find the synonym of:</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '12px' }}>{word.word}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[word.synonym, word.antonym, word.meaning.split(' ')[0], 'Unknown'].map((opt, i) => (
          <button key={i} disabled={status !== 'idle'} onClick={() => checkMCQ(opt, word.synonym)}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === word.synonym ? '#86EFAC' : '#FCA5A5') : opt === word.synonym && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === word.synonym ? '#F0FDF4' : '#FEF2F2') : opt === word.synonym && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={word.synonym}/>
    </CardShell>
  )

  // Game 3: Spell Check (Wed)
  if (gameType === 3) return (
    <CardShell emoji="📚" subject="English · Spell Check" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>Which spelling is correct?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {word.spellings.map((opt, i) => (
          <button key={i} disabled={status !== 'idle'} onClick={() => checkMCQ(opt, word.spellings[0])}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === word.spellings[0] ? '#86EFAC' : '#FCA5A5') : opt === word.spellings[0] && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === word.spellings[0] ? '#F0FDF4' : '#FEF2F2') : opt === word.spellings[0] && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '14px', letterSpacing: '0.04em', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={word.spellings[0]}/>
    </CardShell>
  )

  // Game 4: Sentence Builder (Thu)
  if (gameType === 4) return (
    <CardShell emoji="📚" subject="English · Sentence Builder" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '10px' }}>Arrange the words to form a correct sentence:</p>
      {status === 'idle' ? (
        <>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px', minHeight: '36px', background: '#F8FAFC', borderRadius: '10px', padding: '8px' }}>
            {arranged.map((w, i) => (
              <button key={i} onClick={() => { setArranged(p => p.filter((_, j) => j !== i)); setRemaining(p => [...p, w]) }}
                style={{ background: '#1B4332', color: 'white', border: 'none', borderRadius: '8px', padding: '4px 12px', fontFamily: 'var(--font-body)', fontSize: '13px', cursor: 'pointer' }}>
                {w}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
            {remaining.map((w, i) => (
              <button key={i} onClick={() => { setRemaining(p => p.filter((_, j) => j !== i)); setArranged(p => [...p, w]) }}
                style={{ background: '#F3F4F6', color: '#374151', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '4px 12px', fontFamily: 'var(--font-body)', fontSize: '13px', cursor: 'pointer' }}>
                {w}
              </button>
            ))}
          </div>
          <button onClick={() => {
            const correct = word.sentence.join(' ')
            const attempt = arranged.join(' ')
            setStatus(attempt === correct ? 'correct' : 'wrong')
          }} style={{ padding: '8px 20px', borderRadius: '10px', border: 'none', background: '#1B4332', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Check
          </button>
        </>
      ) : (
        <div style={{ marginTop: '4px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151' }}>
            Correct: <strong>{word.sentence.join(' ')}</strong>
          </p>
          <StatusBadge status={status}/>
        </div>
      )}
    </CardShell>
  )

  // Game 5: Antonym (Fri)
  return (
    <CardShell emoji="📚" subject="English · Antonym" color="#7C3AED">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>Find the antonym (opposite) of:</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: '#1B4332', marginBottom: '12px' }}>{word.word}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[word.antonym, word.synonym, word.meaning.split(' ').slice(-1)[0], 'Similar'].map((opt, i) => (
          <button key={i} disabled={status !== 'idle'} onClick={() => checkMCQ(opt, word.antonym)}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === word.antonym ? '#86EFAC' : '#FCA5A5') : opt === word.antonym && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === word.antonym ? '#F0FDF4' : '#FEF2F2') : opt === word.antonym && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={word.antonym}/>
    </CardShell>
  )
}

// MATHS card
function MathsCard() {
  const q = MATHS_QUESTIONS[getDayOfYear() % MATHS_QUESTIONS.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="📐" subject="Mathematics · Mental Maths" color="#1E40AF">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1B4332', marginBottom: '12px' }}>{q.q}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {q.options.map((opt) => (
          <button key={opt} disabled={status !== 'idle'} onClick={() => { setSelected(opt); setStatus(opt === q.answer ? 'correct' : 'wrong') }}
            style={{ padding: '10px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === q.answer ? '#86EFAC' : '#FCA5A5') : opt === q.answer && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === q.answer ? '#F0FDF4' : '#FEF2F2') : opt === q.answer && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={q.answer}/>
    </CardShell>
  )
}

// SCIENCE card
function ScienceCard() {
  const q = SCIENCE_TF[getDayOfYear() % SCIENCE_TF.length]
  const [selected, setSelected] = useState<boolean | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="🔬" subject="Science · True or False" color="#065F46">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '14px', lineHeight: 1.5 }}>{q.statement}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        {[true, false].map(val => (
          <button key={String(val)} disabled={status !== 'idle'} onClick={() => { setSelected(val); setStatus(val === q.answer ? 'correct' : 'wrong') }}
            style={{ flex: 1, padding: '11px', borderRadius: '10px', border: `1.5px solid ${selected === val ? (val === q.answer ? '#86EFAC' : '#FCA5A5') : val === q.answer && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === val ? (val === q.answer ? '#F0FDF4' : '#FEF2F2') : val === q.answer && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: val ? '#065F46' : '#DC2626', cursor: status !== 'idle' ? 'default' : 'pointer' }}>
            {val ? '✓ True' : '✗ False'}
          </button>
        ))}
      </div>
      {status !== 'idle' && (
        <div style={{ marginTop: '10px', padding: '10px 14px', borderRadius: '10px', background: status === 'correct' ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${status === 'correct' ? '#86EFAC' : '#FCA5A5'}` }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: status === 'correct' ? '#166534' : '#DC2626', marginBottom: '4px' }}>
            {status === 'correct' ? '✓ Correct!' : `✗ It is ${q.answer ? 'True' : 'False'}!`}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151', lineHeight: 1.5 }}>{q.explanation}</p>
        </div>
      )}
    </CardShell>
  )
}

// HISTORY card
function HistoryCard() {
  const q = HISTORY_FITB[getDayOfYear() % HISTORY_FITB.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="🏛️" subject="History & Civics · Fill in the Blank" color="#92400E">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '12px', lineHeight: 1.6 }}>
        {q.q.replace('______', '________')}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {q.options.map(opt => (
          <button key={opt} disabled={status !== 'idle'} onClick={() => { setSelected(opt); setStatus(opt === q.answer ? 'correct' : 'wrong') }}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === q.answer ? '#86EFAC' : '#FCA5A5') : opt === q.answer && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === q.answer ? '#F0FDF4' : '#FEF2F2') : opt === q.answer && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={q.answer}/>
    </CardShell>
  )
}

// GEOGRAPHY card
function GeographyCard() {
  const q = GEOGRAPHY_QUESTIONS[getDayOfYear() % GEOGRAPHY_QUESTIONS.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="🌍" subject="Geography · Quick Fact" color="#065F46">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '12px', lineHeight: 1.5 }}>{q.q}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
        {q.options.map(opt => (
          <button key={opt} disabled={status !== 'idle'} onClick={() => { setSelected(opt); setStatus(opt === q.answer ? 'correct' : 'wrong') }}
            style={{ padding: '9px 10px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === q.answer ? '#86EFAC' : '#FCA5A5') : opt === q.answer && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === q.answer ? '#F0FDF4' : '#FEF2F2') : opt === q.answer && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'center', lineHeight: 1.3 }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={q.answer}/>
    </CardShell>
  )
}

// SANSKRIT card
function SanskritCard() {
  const q = SANSKRIT_WORDS[getDayOfYear() % SANSKRIT_WORDS.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="🕉️" subject="Sanskrit · Word Meaning" color="#B45309">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280', marginBottom: '6px' }}>What does this Sanskrit word mean?</p>
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: '#1B4332', marginBottom: '12px' }}>{q.word}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {q.options.map(opt => (
          <button key={opt} disabled={status !== 'idle'} onClick={() => { setSelected(opt); setStatus(opt === q.meaning ? 'correct' : 'wrong') }}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === q.meaning ? '#86EFAC' : '#FCA5A5') : opt === q.meaning && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === q.meaning ? '#F0FDF4' : '#FEF2F2') : opt === q.meaning && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={q.meaning}/>
    </CardShell>
  )
}

// ICT card
function ICTCard() {
  const q = ICT_QUESTIONS[getDayOfYear() % ICT_QUESTIONS.length]
  const [selected, setSelected] = useState<string | null>(null)
  const [status,   setStatus]   = useState<ActivityStatus>('idle')
  return (
    <CardShell emoji="💻" subject="ICT · Tech Quiz" color="#0369A1">
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '12px', lineHeight: 1.5 }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {q.options.map(opt => (
          <button key={opt} disabled={status !== 'idle'} onClick={() => { setSelected(opt); setStatus(opt === q.answer ? 'correct' : 'wrong') }}
            style={{ padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${selected === opt ? (opt === q.answer ? '#86EFAC' : '#FCA5A5') : opt === q.answer && status === 'wrong' ? '#86EFAC' : '#E5E7EB'}`, background: selected === opt ? (opt === q.answer ? '#F0FDF4' : '#FEF2F2') : opt === q.answer && status === 'wrong' ? '#F0FDF4' : 'white', fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', cursor: status !== 'idle' ? 'default' : 'pointer', textAlign: 'left' }}>
            {opt}
          </button>
        ))}
      </div>
      <StatusBadge status={status} correct={q.answer}/>
    </CardShell>
  )
}

// ── Main exported component ───────────────────────────────────────────────────

export default function DailyActivities() {
  const todayKey = getTodayKey()
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{ width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '18px', color: '#1B4332', marginBottom: '2px' }}>
          🌅 Daily Warm-Up
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>
          {today} · One activity from each subject · Refreshes tomorrow
        </p>
      </div>

      {/* 7 activity cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <EnglishCard   todayKey={todayKey} />
        <MathsCard     />
        <ScienceCard   />
        <HistoryCard   />
        <GeographyCard />
        <SanskritCard  />
        <ICTCard       />
      </div>
    </div>
  )
}
