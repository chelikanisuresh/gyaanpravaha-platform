// Marathi Tooltip Words — key vocabulary per chapter

export interface MarWordEntry { meaning: string }
export type MarWordMap = Record<string, MarWordEntry>

const MAR_TOOLTIP_WORDS: Record<number, MarWordMap> = {
  1: {
    'धवल':       { meaning: 'पांढरा, शुभ्र (White, bright)' },
    'ध्वज':       { meaning: 'झेंडा, निशाण (Flag)' },
    'सद्गुणी':    { meaning: 'चांगले गुण असलेले (Virtuous)' },
    'वंदन':       { meaning: 'नमस्कार, प्रणाम (Salutation)' },
    'सळसळते':    { meaning: 'वाऱ्याने होणारा आवाज (Rustling sound)' },
    'झुळझुळते':  { meaning: 'पाण्याचा मंद आवाज (Gentle flowing sound)' },
  },
  2: {
    'लुकलुकणे':  { meaning: 'चमकणे (To shimmer, twinkle)' },
    'तल्लीन':     { meaning: 'दंग होणे, गुंग होणे (Absorbed, engrossed)' },
    'गहिवरणे':   { meaning: 'मन भरून येणे (To be emotionally moved)' },
    'धमाल':      { meaning: 'मजा (Great fun)' },
    'सळसळ':      { meaning: 'पानांचा आवाज (Rustling of leaves)' },
    'खळखळ':      { meaning: 'पाण्याचा आवाज (Sound of flowing water)' },
  },
  3: {
    'भणाण':      { meaning: 'भयानक जोरदार वाऱ्याचा आवाज (Howling wind)' },
    'चडफड':      { meaning: 'राग (Anger, irritation)' },
    'गिल्ला':    { meaning: 'गोंधळ, आरडाओरड (Commotion, noise)' },
    'खचणे':      { meaning: 'ढासळणे (To collapse, crumble)' },
  },
  4: {
    'कुशाग्र':   { meaning: 'तीक्ष्ण बुद्धीचे (Sharp-minded)' },
    'दृढ संकल्प': { meaning: 'पक्का निर्णय (Firm determination)' },
    'चुणूक':     { meaning: 'लक्षण, झलक (Sign, indication)' },
    'संशोधन':    { meaning: 'Research (नवे शोधणे)' },
    'जिज्ञासा':  { meaning: 'जाणून घेण्याची इच्छा (Curiosity)' },
  },
  5: {
    'मजबूत':     { meaning: 'पक्के, टिकाऊ (Strong, sturdy)' },
    'सुबक':      { meaning: 'सुंदर, नाजूक (Neat, beautiful)' },
    'वाखाणणी':  { meaning: 'स्तुती करणे (Praise, admiration)' },
    'कसब':       { meaning: 'कौशल्य (Skill, craft)' },
    'चिकाटी':    { meaning: 'न थांबता प्रयत्न करणे (Persistence)' },
    'विणकाम':    { meaning: 'धागे गुंफून बनवणे (Weaving)' },
  },
  6: {
    'क्षितिज':   { meaning: 'आकाश जमिनीला टेकलेले दिसणारे ठिकाण (Horizon)' },
    'भरारणारा':  { meaning: 'वेगाने वाहणारा (Rushing, sweeping)' },
    'अलगद':      { meaning: 'हळूवारपणे (Gently, softly)' },
    'मिष्कील':   { meaning: 'खोडकर (Mischievous, playful)' },
    'दवबिंदू':   { meaning: 'दवाचा थेंब (Dewdrop)' },
  },
  7: {
    'उद्यान':    { meaning: 'बाग, पार्क (Garden, park)' },
    'कुतूहल':    { meaning: 'जाणण्याची इच्छा (Curiosity)' },
    'अवांतर':    { meaning: 'पाठ्यक्रमाव्यतिरिक्त (Beyond syllabus)' },
    'अभेद्य':    { meaning: 'मजबूत, न तुटणारे (Unbreakable)' },
    'तल्लख':     { meaning: 'हुशार, तीक्ष्ण (Sharp-minded)' },
    'शिफारस':    { meaning: 'Recommendation' },
  },
  8: {
    'जलतरणपटू': { meaning: 'पोहणारी व्यक्ती (Swimmer)' },
    'गटांगळ्या': { meaning: 'पाण्यात उलटेसुलटे होणे (Somersaults in water)' },
    'हितचिंतक':  { meaning: 'काळजी घेणारा (Well-wisher)' },
    'माघारी':    { meaning: 'परत (Back, return)' },
  },
  9: {
    'जिव्हाळा':  { meaning: 'खोल प्रेम, आपुलकी (Warmth, affection)' },
    'वास्तू':    { meaning: 'इमारत (Building, dwelling)' },
    'अपार':      { meaning: 'अमाप, खूप जास्त (Immense, boundless)' },
    'गप्पिष्ट':  { meaning: 'गप्पा मारणारे (Talkative)' },
    'चविष्ट':    { meaning: 'चव असलेले (Tasty, delicious)' },
  },
  10: {
    'हितगुज':    { meaning: 'मनातील जवळची गोष्ट सांगणे (Heart-to-heart talk)' },
    'गुरफटणे':   { meaning: 'अडकणे, व्यग्र होणे (To be busy/tangled)' },
    'विपरीत':    { meaning: 'उलट, वाईट (Opposite, adverse)' },
    'आंतरिक':   { meaning: 'मनातील, आतील (Inner, internal)' },
    'जोपासणे':   { meaning: 'जतन करणे (To nurture, preserve)' },
  },
  11: {
    'इवलीशी':   { meaning: 'अगदी लहान (Very tiny)' },
    'कल्ले':     { meaning: 'माशाचे पंख (Fish fins)' },
    'गढुळणे':   { meaning: 'पाणी गढूळ होणे (Water becoming muddy)' },
    'चुकामूक':  { meaning: 'वेगळे होणे (Getting separated)' },
    'गिरक्या':  { meaning: 'गोलगोल फिरणे (Spinning around)' },
  },
  12: {
    'यान':       { meaning: 'अंतराळ जहाज (Spacecraft)' },
    'ऑक्सिजन':  { meaning: 'प्राणवायू (Oxygen)' },
    'तरंगणे':   { meaning: 'हवेत राहणे (To float, be weightless)' },
    'सिलिंडर':  { meaning: 'दंडगोल, ऑक्सिजन ठेवण्याचे भांडे (Cylinder)' },
  },
  13: {
    'भूमी':      { meaning: 'जमीन, पृथ्वी (Earth, land)' },
    'खाण':       { meaning: 'जमिनीतून खनिजे काढण्याची जागा (Mine)' },
    'कथील':      { meaning: 'Tin (एक धातू)' },
    'गिरणी':     { meaning: 'Mill, कारखाना (Mill, factory)' },
    'जिन्नस':    { meaning: 'वस्तू, पदार्थ (Item, thing)' },
  },
  14: {
    'चतुर':      { meaning: 'हुशार, चाणाक्ष (Clever, shrewd)' },
    'प्रधान':    { meaning: 'मुख्यमंत्री (Prime Minister)' },
    'निकृष्ट':   { meaning: 'सर्वांत कमी दर्जाचा (Inferior)' },
    'उत्कृष्ट':  { meaning: 'सर्वोत्तम (Excellent, best)' },
    'लवचिक':     { meaning: 'वाकणारी (Flexible)' },
  },
  15: {
    'अनिष्ट':    { meaning: 'वाईट (Bad, evil)' },
    'रूढी':      { meaning: 'जुन्या प्रथा (Old customs, traditions)' },
    'मोळी':      { meaning: 'लाकडाचा भारा (Bundle of firewood)' },
    'आण':        { meaning: 'शपथ (Oath, pledge)' },
    'वृक्ष':     { meaning: 'झाड (Tree)' },
  },
  16: {
    'कैफियत':   { meaning: 'तक्रार, बाजू मांडणे (Complaint, grievance)' },
    'कासाविशी': { meaning: 'अस्वस्थ, बेचैन (Restless, uneasy)' },
    'जलचर':     { meaning: 'पाण्यात राहणारे प्राणी (Aquatic creatures)' },
    'तगमग':     { meaning: 'छटपटणे (To suffer, squirm)' },
    'ऱ्हास':    { meaning: 'नाश (Destruction, decline)' },
  },
  17: {
    'पाणपोई':   { meaning: 'वाटसरूंना पाणी देण्याची सोय (Water station for travellers)' },
    'दग्ध':      { meaning: 'भाजणारे, जाळणारे (Scorching, burning)' },
    'रांजण':    { meaning: 'मातीचा मोठा घडा (Large earthen pot)' },
    'रंक':       { meaning: 'गरीब (Poor person)' },
    'राव':       { meaning: 'श्रीमंत (Rich person)' },
    'दुवा':      { meaning: 'आशीर्वाद (Blessing)' },
    'सज्जन':    { meaning: 'चांगला माणूस (Good person)' },
    'ग्लानी':   { meaning: 'चक्कर येणे, थकणे (Dizziness, fatigue)' },
  },
}

export function getMarWordMap(chapterId: number): MarWordMap {
  return MAR_TOOLTIP_WORDS[chapterId] || {}
}

export default MAR_TOOLTIP_WORDS
