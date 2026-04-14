// Marathi Quiz Content — Sulabhbharati Class 6
// 17 chapters × 10 questions each (20 marks total per chapter)

export interface MarQuizQuestion {
  id: number
  type: 'mcq' | 'truefalse' | 'fillinblank' | 'shortanswer'
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  marks: number
  sectionId?: number
}

export interface MarQuiz {
  chapterId: number
  chapterTitle: string
  totalMarks: number
  questions: MarQuizQuestion[]
}

const MAR_QUIZZES: MarQuiz[] = [

  { chapterId:1, chapterTitle:'भारतमाता', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'भारतमाता हे गाणे कोणी लिहिले?',options:['विंदा करंदीकर','शांता शेळके','सुमती पवार','दिलीप पाटील'],correctAnswer:'शांता शेळके',explanation:'हे गाणे प्रसिद्ध कवयित्री शांता शेळके यांनी लिहिले.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'"प्रियतम आमुचा धवल" असे कशाचे वर्णन आहे?',options:['गंगा नदी','हिमालय','सह्याद्री','विंध्य'],correctAnswer:'हिमालय',explanation:'"प्रियतम आमुचा धवल हिमालय बघे भिडाया जो गगना"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'गाण्यात भारतमातेची सर्व मुले एकसारखीच आहेत असे सांगितले आहे.',correctAnswer:'False',explanation:'"रंग वेगळे गंध वेगळे तरी येथली सर्व फुले" — मुले वेगवेगळी आहेत पण एकाच भूमीची.',marks:2, sectionId: 4 },
    {id:4,type:'fillinblank',question:'प्रियतम अमुची भारतमाता आम्ही सारी तिची ______',options:['लेकरे','मुले','फुले','बाळे'],correctAnswer:'मुले',explanation:'"आम्ही सारी तिची मुले" — धृवपदातील शब्द.',marks:2, sectionId: 5 },
    {id:5,type:'mcq',question:'"ध्वज" म्हणजे काय?',options:['झाड','झेंडा','पर्वत','नदी'],correctAnswer:'झेंडा',explanation:'ध्वज म्हणजे झेंडा — "सदा तिचा ध्वज उंच धरू"',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'गाण्यात कोणत्या दोन नद्यांचा उल्लेख आहे?',options:['गंगा आणि यमुना','कृष्णा आणि गोदावरी','नर्मदा आणि कावेरी','ब्रह्मपुत्रा आणि सिंधू'],correctAnswer:'गंगा आणि यमुना',explanation:'"प्रियतम या गंगा यमुना"',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'शांता शेळके यांनी हिंदी चित्रपटांसाठीही गाणी लिहिली.',correctAnswer:'True',explanation:'शांता शेळके यांनी मराठीसोबत हिंदी चित्रपटांसाठीही गाणी लिहिली.',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"सह्यविंध्य" मध्ये कोणते दोन पर्वत आहेत?',options:['सह्याद्री आणि विंध्य','हिमालय आणि विंध्य','सातपुडा आणि विंध्य','अरवली आणि सह्याद्री'],correctAnswer:'सह्याद्री आणि विंध्य',explanation:'सह्यविंध्य = सह्याद्री + विंध्य पर्वत.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'"धवल" म्हणजे काय?',options:['काळा','पांढरा','लाल','हिरवा'],correctAnswer:'पांढरा',explanation:'"धवल" म्हणजे पांढरा, शुभ्र — हिमालय बर्फामुळे पांढरा दिसतो.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'"विविधतेत एकता" याचे गाण्यात काय उदाहरण आहे?',correctAnswer:'रंग वेगळे गंध वेगळे तरी येथली सर्व फुले — भारतात वेगवेगळे रंग, भाषा असूनही आपण सगळे एक आहोत',explanation:'वेगळे रंग-गंध असूनही एकाच भूमीची फुले — हे विविधतेत एकतेचे उदाहरण.',marks:2, sectionId: 6 },
  ]},

  { chapterId:2, chapterTitle:'माझा अनुभव', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'रिमाला मामाच्या गावाला जाण्याची बातमी ऐकून काय वाटले?',options:['दु:ख झाले','भीती वाटली','आनंद झाला','आश्चर्य वाटले'],correctAnswer:'आनंद झाला',explanation:'रिमाने आनंदाने उड्या मारल्या.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'मुले मामाच्या गावाला कशाने गेली?',options:['बसने','रेल्वेने','विमानाने','बैलगाडीने'],correctAnswer:'रेल्वेने',explanation:'मुले आग्गाडीने (रेल्वेने) गेली.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'"लुकलुकणे" म्हणजे चमकणे.',correctAnswer:'True',explanation:'"लुकलुकणे" म्हणजे चमकणे, उजळणे.',marks:2, sectionId: 4 },
    {id:4,type:'fillinblank',question:'मामाने स्टेशनवर ______ घेऊन आला.',options:['बस','जीप','बैलगाडी','रिक्षा'],correctAnswer:'बैलगाडी',explanation:'स्टेशनवर बैलगाडी घेऊन मामा आला.',marks:2, sectionId: 5 },
    {id:5,type:'mcq',question:'"गहिवरून येणे" म्हणजे?',options:['भूक लागणे','मन भरून येणे','रडणे','हसणे'],correctAnswer:'मन भरून येणे',explanation:'"गहिवरून येणे" म्हणजे भावनेमुळे मन भरून येणे.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'बैलगाडीत कोणता आवाज आला?',options:['शिट्टीचा','घुंगूरमाळेचा','विमानाचा','पाण्याचा'],correctAnswer:'घुंगूरमाळेचा',explanation:'बैलांच्या गळ्यांतील घुंगूरमाळा खुळखुळ वाजत होत्या.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'मामाच्या गावी मुले आंब्याच्या झाडावर चढली.',correctAnswer:'True',explanation:'आंब्याच्या झाडावर चढून कैन्या, पाडाचा आंबा तोडून खाणे.',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"पाडाचा आंबा" म्हणजे?',options:['पूर्ण पिकलेला','अर्धवट पिकलेला','कच्चा','खूप गोड'],correctAnswer:'अर्धवट पिकलेला',explanation:'"पाडाचा आंबा" म्हणजे अर्धवट पिकलेला आंबा.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'"कडकडून भेटणे" म्हणजे?',options:['भांडणे','प्रेमाने मिठी मारणे','रागाने बोलणे','ओळखणे'],correctAnswer:'प्रेमाने मिठी मारणे',explanation:'"कडकडून भेटणे" म्हणजे आनंदाने प्रेमाने मिठी मारणे.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'बैलगाडीत कोणते निसर्गाचे आवाज ऐकू आले?',correctAnswer:'पानांची सळसळ, नदीची खळखळ, पक्ष्यांची किलबिल, गाईंचे हंबरणे',explanation:'बैलगाडीच्या प्रवासात निसर्गाचे अनेक आवाज ऐकू आले.',marks:2, sectionId: 6 },
  ]},

  { chapterId:3, chapterTitle:'पाऊस आला! पाऊस आला!', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"पाऊस आला!" ही कविता कोणी लिहिली?',options:['शांता शेळके','सुमती पवार','विंदा करंदीकर','दिलीप पाटील'],correctAnswer:'विंदा करंदीकर',explanation:'ही कविता विंदा करंदीकर यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'विंदा करंदीकर यांना कोणता पुरस्कार मिळाला?',options:['नोबेल','ज्ञानपीठ','साहित्य अकादमी','पद्मश्री'],correctAnswer:'ज्ञानपीठ',explanation:'विंदा करंदीकर यांना ज्ञानपीठ पुरस्कार मिळाला.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'पाऊस आल्यावर आजोबांनी छत्री शिवली.',correctAnswer:'True',explanation:'"आजोबांनी शिवली छत्री"',marks:2, sectionId: 4 },
    {id:4,type:'fillinblank',question:'"ऐन दुपारी विजा ______"',options:['चमकल्या','कडकडल्या','पडल्या','आल्या'],correctAnswer:'चमकल्या',explanation:'"ऐन दुपारी विजा चमकल्या"',marks:2, sectionId: 5 },
    {id:5,type:'mcq',question:'"चडफड" म्हणजे?',options:['आनंद','राग','दुःख','भीती'],correctAnswer:'राग',explanation:'"चडफड" म्हणजे राग.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'पाऊस आल्यावर शाळेला काय झाले?',options:['वर्ग सुरू राहिले','सुट्टी मिळाली','परीक्षा झाली','खेळ झाला'],correctAnswer:'सुट्टी मिळाली',explanation:'"चला पळा, शाळेला सुट्टी!"',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'कवितेत आईचे पापड भिजले.',correctAnswer:'True',explanation:'"आईचेही भिजले पापड"',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"भणाण वारा" म्हणजे?',options:['मंद वारा','थंड वारा','जोरदार भयानक वारा','गरम वारा'],correctAnswer:'जोरदार भयानक वारा',explanation:'"भणाण वारा" म्हणजे भयभीत करणाऱ्या आवाजाचा वारा.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'प्रत्येक कडव्याची सुरुवात कोणत्या शब्दांनी होते?',options:['विजा चमकल्या','पाऊस आला! पाऊस आला!','कडाड कडकड','गारा गारा'],correctAnswer:'पाऊस आला! पाऊस आला!',explanation:'प्रत्येक कडव्याची सुरुवात "पाऊस आला! पाऊस आला!" ने होते.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'पाऊस आल्यावर घरातील कोणाकोणाची काय प्रतिक्रिया झाली?',correctAnswer:'आजोबांनी छत्री शिवली, बाबा चडफडत गेले, आईचे पापड भिजले, मुलांनी गिल्ला केला, मॅडमनी सुट्टी दिली',explanation:'प्रत्येकाची वेगळी प्रतिक्रिया होती.',marks:2, sectionId: 6 },
  ]},

  { chapterId:4, chapterTitle:'माहिती घेऊया', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'डॉ. वसंत गोवारीकर कशासाठी प्रसिद्ध?',options:['अणुबॉम्बसाठी','पावसाचा अंदाज सांगण्यासाठी','संगणक शोधण्यासाठी','अंतराळात जाण्यासाठी'],correctAnswer:'पावसाचा अंदाज सांगण्यासाठी',explanation:'डॉ. गोवारीकर यांनी मानसूनच्या अंदाजाची नवी पद्धत शोधली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'डॉ. गोवारीकर यांचा जन्म कुठे झाला?',options:['मुंबई','नागपूर','पुणे','औरंगाबाद'],correctAnswer:'पुणे',explanation:'डॉ. गोवारीकरांचा जन्म २५ मार्च १९३३ रोजी पुण्यात झाला.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'डॉ. गोवारीकर यांनी वयाच्या तेराव्या वर्षी हेन्री फोर्डला पत्र लिहिले.',correctAnswer:'True',explanation:'अवघे तेरा वर्षाचे असताना त्यांनी थेट हेन्री फोर्डला पत्र लिहिले.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'डॉ. गोवारीकर यांनी कोणत्या विद्यापीठात संशोधन केले?',options:['ऑक्सफर्ड','केम्ब्रिज','बर्मिंगहॅम','MIT'],correctAnswer:'बर्मिंगहॅम',explanation:'बर्मिंगहॅम विद्यापीठात रासायनिक अभियांत्रिकीमध्ये संशोधन केले.',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'हेन्री फोर्ड कोण होते?',options:['शास्त्रज्ञ','अमेरिकन उद्योगपती','राजकारणी','लेखक'],correctAnswer:'अमेरिकन उद्योगपती',explanation:'हेन्री फोर्ड हे अमेरिकेतील प्रसिद्ध उद्योगपती होते.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'विक्रम साराभाई यांच्या आग्रहामुळे डॉ. गोवारीकर कुठे रुजू झाले?',options:['ISRO','IIT','भारताच्या अवकाश संशोधन केंद्रात','NASA'],correctAnswer:'भारताच्या अवकाश संशोधन केंद्रात',explanation:'१९६७ साली ते भारताच्या अवकाश संशोधन केंद्रात रुजू झाले.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'डॉ. गोवारीकर यांनी अग्निबाणासाठी घन इंधन बनवले.',correctAnswer:'True',explanation:'अग्निबाणाच्या मोटारीकरिता घन इंधन बनवण्याचे तंत्र त्यांनी विकसित केले.',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"जिज्ञासा" म्हणजे?',options:['आळस','जाणून घेण्याची इच्छा','भूक','झोप'],correctAnswer:'जाणून घेण्याची इच्छा',explanation:'"जिज्ञासा" म्हणजे नवे शिकण्याची, जाणण्याची तीव्र इच्छा.',marks:2, sectionId: 3 },
    {id:9,type:'fillinblank',question:'हेन्री फोर्डने डॉ. गोवारीकर यांना उत्तर आणि ______ पाठवले.',options:['पैसे','पुरस्कार','पुस्तके','खाऊ'],correctAnswer:'पुस्तके',explanation:'हेन्री फोर्डने उत्तर पाठवले आणि त्यासोबत काही पुस्तकेही पाठवली.',marks:2, sectionId: 5 },
    {id:10,type:'shortanswer',question:'डॉ. गोवारीकर यांच्याकडून कोणती मूल्ये शिकतो?',correctAnswer:'जिज्ञासा, धाडस, परिश्रम, देशसेवा',explanation:'त्यांच्या जीवनातून जिज्ञासा, धाडस, परिश्रम आणि देशसेवा ही मूल्ये शिकतो.',marks:2, sectionId: 6 },
  ]},

  { chapterId:5, chapterTitle:'सुगरणीचे घरटे', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'सुगरण पक्षी कुठे घरटे बांधत होता?',options:['आंब्याच्या झाडावर','निंबाच्या झाडावर','पिंपळावर','वडावर'],correctAnswer:'निंबाच्या झाडावर',explanation:'शाळेच्या परिसरात असलेल्या निंबाच्या झाडावर.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'सुगरण पक्षाला "सुगरण" का म्हणतात?',options:['रंग सुंदर म्हणून','गाणे गोड म्हणून','नक्षीदार वीण पाहून','घरटे मोठे म्हणून'],correctAnswer:'नक्षीदार वीण पाहून',explanation:'नक्षीदार वीण पाहूनच या पक्ष्याला "सुगरण" म्हणतात.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'सुगरण पक्षी चोचीने घरटे विणतो.',correctAnswer:'True',explanation:'सुगरण गवताच्या काड्या गोळा करतो आणि चोचीने घरटे विणतो.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'सुगरणाचे घरटे कशासारखे टांगलेले असते?',options:['पिशवी','झोका','फुगा','टोपली'],correctAnswer:'झोका',explanation:'निंब-बाभळीच्या फांदीला घरटे झोक्यासारखे टांगलेले असते.',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'"मजबूत" म्हणजे?',options:['नाजूक','पक्के-टिकाऊ','सुंदर','लहान'],correctAnswer:'पक्के-टिकाऊ',explanation:'"मजबूत" म्हणजे पक्के, टिकाऊ.',marks:2, sectionId: 3 },
    {id:6,type:'truefalse',question:'सुगरणाचे घरटे वादळातही शाबूत राहते.',correctAnswer:'True',explanation:'वादळातही हे घरटे शाबूत राहते.',marks:2, sectionId: 4 },
    {id:7,type:'mcq',question:'"वाखाणणी" म्हणजे?',options:['टीका','स्तुती','ओरडणे','विचारणे'],correctAnswer:'स्तुती',explanation:'"वाखाणणी" म्हणजे कौतुक, प्रशंसा.',marks:2, sectionId: 3 },
    {id:8,type:'mcq',question:'सुगरणाला "कसबी विणकर" का म्हटले?',options:['कारण ते उडते','कारण ते घरटे विणते','कारण ते गाते','कारण ते मोठे आहे'],correctAnswer:'कारण ते घरटे विणते',explanation:'सुगरण पक्षी कुशलतेने घरटे विणतो म्हणून "कसबी विणकर".',marks:2, sectionId: 3 },
    {id:9,type:'fillinblank',question:'सुगरण पक्षाचे घरटे पाहून नयना म्हणाली "किती ______ घरटे!"',options:['मोठे','आकारबद्ध','खराब','जड'],correctAnswer:'आकारबद्ध',explanation:'"सुगरण पक्षी किती आकारबद्ध घरटे बांधतो"',marks:2, sectionId: 5 },
    {id:10,type:'shortanswer',question:'सुगरण पक्ष्याकडून आपण कोणते गुण शिकतो?',correctAnswer:'नियोजन, परिश्रम, कुशलता, कुटुंबप्रेम, जबाबदारी',explanation:'सुगरण पक्ष्याकडून नियोजन, मेहनत, कौशल्य, कुटुंबप्रेम शिकतो.',marks:2, sectionId: 6 },
  ]},

  { chapterId:6, chapterTitle:'हे खरे खरे व्हावे...', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"हे खरे खरे व्हावे..." कोणी लिहिली?',options:['शांता शेळके','विंदा करंदीकर','सुमती पवार','चारुता पेंढरकर'],correctAnswer:'सुमती पवार',explanation:'"हे खरे खरे व्हावे..." सुमती पवार यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'कवयित्रीला सर्वप्रथम कोण व्हायचे?',options:['दवबिंदू','ढग','पक्षी','सूर्यकिरण'],correctAnswer:'पक्षी',explanation:'"मी पक्षी व्हावे" — हवेवर स्वार होऊन अवकाशात विहरायचे.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'दवबिंदू पहाटे गवतावर उतरतो.',correctAnswer:'True',explanation:'"दवबिंदू होऊनी पहाटे गवतावर उतरावे"',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"अलगद" म्हणजे?',options:['जोराने','घाईने','हळूच','मोठ्याने'],correctAnswer:'हळूच',explanation:'"अलगद" म्हणजे हळूवारपणे.',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'"भास" म्हणजे?',options:['स्वप्न','भ्रम','सत्य','आनंद'],correctAnswer:'भ्रम',explanation:'"भास" म्हणजे खरे नसलेले, भ्रम.',marks:2, sectionId: 3 },
    {id:6,type:'truefalse',question:'कवयित्रीला सूर्यकिरण होऊन काळोख दूर करायचा आहे.',correctAnswer:'True',explanation:'"काळोखाला चिरत चिरत मी सूर्य किरण व्हावा"',marks:2, sectionId: 4 },
    {id:7,type:'mcq',question:'"क्षितिज" म्हणजे?',options:['समुद्र','आकाश जमिनीला टेकलेले दिसणारे ठिकाण','पर्वत','वारा'],correctAnswer:'आकाश जमिनीला टेकलेले दिसणारे ठिकाण',explanation:'"क्षितिज" म्हणजे दूर जेथे आकाश जमिनीला टेकते असे दिसते.',marks:2, sectionId: 3 },
    {id:8,type:'fillinblank',question:'"निसर्गातल्या ______ मध्ये मी रंगून जावे"',options:['नद्यांमध्ये','रंगामध्ये','झाडांमध्ये','ढगांमध्ये'],correctAnswer:'रंगामध्ये',explanation:'"निसर्गातल्या रंगामध्ये मी रंगून जावे"',marks:2, sectionId: 5 },
    {id:9,type:'mcq',question:'कवितेचे नाव "हे खरे खरे व्हावे" का आहे?',options:['कारण ती खरी आहे','कारण कवयित्रीची इच्छा खरी व्हावी','कारण खोटे सांगितले','कारण निसर्ग खरा आहे'],correctAnswer:'कारण कवयित्रीची इच्छा खरी व्हावी',explanation:'शेवटी कवयित्री म्हणते — हे सगळे खरे व्हावे, स्वप्न नको.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'कवयित्रीने कोणकोणती निसर्गाची रूपे घ्यायची इच्छा व्यक्त केली?',correctAnswer:'पक्षी, दवबिंदू, ढग, धुके, सूर्यकिरण, निसर्गाचे रंग',explanation:'पक्षी, दवबिंदू, ढग, धुके, सूर्यकिरण — ही निसर्गाची रूपे.',marks:2, sectionId: 6 },
  ]},

  { chapterId:7, chapterTitle:'उद्यानात भेटलेला विद्यार्थी', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'केळूस्कर गुरुजी कोणत्या शाळेचे मुख्याध्यापक होते?',options:['एलफिन्स्टन','विल्सन हायस्कूल','सेंट झेवियर','भारतीय विद्यालय'],correctAnswer:'विल्सन हायस्कूल',explanation:'मुंबई येथील विल्सन हायस्कूलचे मुख्याध्यापक केळूस्कर गुरुजी.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'बालभीमराव कोणत्या शाळेत शिकत होते?',options:['विल्सन','एलफिन्स्टन हायस्कूल','सेंट झेवियर','राजा शाळा'],correctAnswer:'एलफिन्स्टन हायस्कूल',explanation:'"मी एलफिन्स्टन हायस्कूल, भायखळा येथे शिकतो"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'भीमराव फक्त शाळेची पुस्तके वाचत.',correctAnswer:'False',explanation:'भीमरावांना अवांतर पुस्तके वाचण्याची आवड होती.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"कुतूहल" म्हणजे?',options:['भीती','जाणून घेण्याची इच्छा','राग','दुःख'],correctAnswer:'जाणून घेण्याची इच्छा',explanation:'"कुतूहल" म्हणजे नवे जाणण्याची इच्छा.',marks:2, sectionId: 3 },
    {id:5,type:'fillinblank',question:'भीमराव पुढे ______ म्हणून ओळखले गेले.',options:['डॉ. बाबासाहेब आंबेडकर','महात्मा गांधी','जवाहरलाल नेहरू','लोकमान्य टिळक'],correctAnswer:'डॉ. बाबासाहेब आंबेडकर',explanation:'भीमराव रामजी आंबेडकर पुढे डॉ. बाबासाहेब आंबेडकर झाले.',marks:2, sectionId: 5 },
    {id:6,type:'mcq',question:'डॉ. आंबेडकरांना उच्च शिक्षणासाठी कोणी मदत केली?',options:['महात्मा गांधी','केळूस्कर गुरुजी आणि सयाजीराव गायकवाड','टिळक','नेहरू'],correctAnswer:'केळूस्कर गुरुजी आणि सयाजीराव गायकवाड',explanation:'केळूस्कर गुरुजींनी सयाजीराव गायकवाडकडे शिफारस केली.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'डॉ. आंबेडकर भारतीय संविधानाचे शिल्पकार आहेत.',correctAnswer:'True',explanation:'डॉ. बाबासाहेब आंबेडकर हे भारतीय संविधानाचे शिल्पकार.',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"उद्यान" म्हणजे?',options:['घर','बाग/पार्क','शाळा','बाजार'],correctAnswer:'बाग/पार्क',explanation:'"उद्यान" म्हणजे बाग, पार्क.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'केळूस्कर गुरुजी रोज उद्यानात किती वाजता येत?',options:['सकाळी ८:३०','दुपारी ३:३०','सायंकाळी ५:३०','रात्री ७:३०'],correctAnswer:'सायंकाळी ५:३०',explanation:'केळूस्कर गुरुजी रोज सायंकाळी ५:३० वाजता येत.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'या पाठातून वाचनाचे महत्त्व कसे दिसते?',correctAnswer:'बालभीमराव रोज उद्यानात अवांतर पुस्तके वाचत होते त्यामुळे केळूस्कर गुरुजींशी ओळख झाली आणि जीवन बदलले',explanation:'वाचनाच्या सवयीमुळे भीमरावांना गुरू मिळाले आणि महान व्यक्तिमत्त्व घडले.',marks:2, sectionId: 6 },
  ]},

  { chapterId:8, chapterTitle:'कुंदाचे साहस', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'कुंदा पोहायला कधी शिकली?',options:['पाचव्या वर्षी','सहाव्या वर्षी','आठव्या वर्षी','दहाव्या वर्षी'],correctAnswer:'आठव्या वर्षी',explanation:'कुंदा वयाच्या आठव्या वर्षीच पोहायला शिकली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'नदीत कोण पडले?',options:['कुंदा','नयना','नीला','रझिया'],correctAnswer:'रझिया',explanation:'खेळताना लहान रझिया नदीत पडली.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'कुंदाने रझियाला वाचवण्यासाठी नदीत उडी घेतली.',correctAnswer:'True',explanation:'कुंदाने क्षणाचाही विचार न करता नदीत उडी घेतली.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"जलतरणपटू" म्हणजे?',options:['मासे पकडणारा','पोहणारी व्यक्ती','नावाडी','मच्छीमार'],correctAnswer:'पोहणारी व्यक्ती',explanation:'"जलतरणपटू" म्हणजे swimmer.',marks:2, sectionId: 3 },
    {id:5,type:'fillinblank',question:'कुंदाने रझियाला सांगितले "माझ्या ______ घट्ट धर"',options:['हाताला','दंडाला','दोरीला','फांदीला'],correctAnswer:'दंडाला',explanation:'"आता फक्त माझ्या दंडाला घट्ट धर"',marks:2, sectionId: 5 },
    {id:6,type:'mcq',question:'लोकांनी मदत करायला काय सोडले?',options:['दोरी','काठी','नाव','बांबू'],correctAnswer:'दोरी',explanation:'लोकांनी मोठा दोर पाण्यात सोडला.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'कुंदाच्या धाडसाची बातमी गावभर पसरली.',correctAnswer:'True',explanation:'"ही बातमी गावभर पसरली"',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"गटांगळ्या खाणे" म्हणजे?',options:['पोहणे','पाण्यात उलटेसुलटे होणे','बुडणे','उडणे'],correctAnswer:'पाण्यात उलटेसुलटे होणे',explanation:'"गटांगळ्या खाणे" म्हणजे पाण्यात उलटेसुलटे होणे.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'या पाठातून कोणते कौशल्य शिकणे महत्त्वाचे दिसते?',options:['गाणे','पोहणे','नृत्य','चित्रकला'],correctAnswer:'पोहणे',explanation:'कुंदाला पोहता येत होते म्हणून ती रझियाला वाचवू शकली.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'कुंदाने संकटाच्या वेळी काय केले आणि यातून कोणता संदेश मिळतो?',correctAnswer:'स्वतःचा विचार न करता नदीत उडी घेऊन रझियाला वाचवले — निःस्वार्थी धाडसाचा संदेश',explanation:'संकटाच्या वेळी धाडसाने कार्य करणे हाच संदेश.',marks:2, sectionId: 6 },
  ]},

  { chapterId:9, chapterTitle:'घर', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"घर" ही कविता कोणी लिहिली?',options:['शांता शेळके','सुमती पवार','धुंडिराज जोशी','विंदा करंदीकर'],correctAnswer:'धुंडिराज जोशी',explanation:'"घर" ही कविता धुंडिराज जोशी यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'कवितेनुसार घर फक्त काय नाही?',options:['प्रेम','चार भिंती','आनंद','संस्कार'],correctAnswer:'चार भिंती',explanation:'"घर नाही चार भिंती घर असते देखण्या कृती"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'कवितेनुसार घर शिक्षणाची पहिली शाळा आहे.',correctAnswer:'True',explanation:'"घर शिक्षणाची पहिली शाळा"',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"जिव्हाळा" म्हणजे?',options:['भांडण','राग','खोल प्रेम','दुःख'],correctAnswer:'खोल प्रेम',explanation:'"जिव्हाळा" म्हणजे आपुलकी, खोल प्रेम.',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'कवितेत घर काय शिकवते?',options:['गाणे आणि नृत्य','चालणे, धावणे, लढणे','वाचणे आणि लिहिणे','खेळणे'],correctAnswer:'चालणे, धावणे, लढणे',explanation:'"घर शिकवते पाहायला चालायला धावायला लढायला"',marks:2, sectionId: 3 },
    {id:6,type:'truefalse',question:'कवितेत आईचे कष्ट अपार आहेत असे सांगितले.',correctAnswer:'True',explanation:'"घरात आईचे अपार कष्ट"',marks:2, sectionId: 4 },
    {id:7,type:'mcq',question:'कवितेत कोण गप्पिष्ट आहे?',options:['आई','बाबा','आजी','आजोबा'],correctAnswer:'आजोबा',explanation:'"घरात आजोबा गप्पिष्ट"',marks:2, sectionId: 3 },
    {id:8,type:'fillinblank',question:'"घर नाही नुसता ______"',options:['पसारा','वाडा','महाल','किल्ला'],correctAnswer:'पसारा',explanation:'"घर नाही नुसता पसारा"',marks:2, sectionId: 5 },
    {id:9,type:'mcq',question:'"चविष्ट" म्हणजे?',options:['कडक','मऊ','चव असलेले','कुजलेले'],correctAnswer:'चव असलेले',explanation:'"चविष्ट" म्हणजे चव असलेले, स्वादिष्ट.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'"घर नाही चार भिंती" — यातून कोणता अर्थ निघतो?',correctAnswer:'घर म्हणजे फक्त इमारत नाही तर प्रेम, माया, संस्कार आणि नाती',explanation:'घर म्हणजे त्यात राहणाऱ्या माणसांचे प्रेम आणि नाते.',marks:2, sectionId: 6 },
  ]},

  { chapterId:10, chapterTitle:'बाबांचं पत्र', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'बाबांनी पत्र कुणाला लिहिले?',options:['रिमाला','वैष्णवीला','मिनूला','कुंदाला'],correctAnswer:'वैष्णवीला',explanation:'बाबांनी आपल्या मुलीला वैष्णवीला पत्र लिहिले.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'वैष्णवीचा कोणता पेपर कठीण गेला?',options:['इंग्रजी','मराठी','गणित','विज्ञान'],correctAnswer:'गणित',explanation:'वैष्णवीचा गणिताचा पेपर कठीण गेला.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'बाबांनी फोनवर बोलण्याऐवजी पत्र लिहिले.',correctAnswer:'True',explanation:'बाबांनी पत्र लिहून हितगुज करण्याचा विचार केला.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'बाबांनी गणिताशी काय करायला सांगितले?',options:['टाळायला','मैत्री करायला','भीती ठेवायला','सोडायला'],correctAnswer:'मैत्री करायला',explanation:'"गणिताशी तू मैत्री कर"',marks:2, sectionId: 3 },
    {id:5,type:'fillinblank',question:'वैष्णवी गोष्टी छान सांगते, चित्रे उत्तम काढते आणि सुंदर ______ करते.',options:['गाणे','नृत्य','लेखन','खेळ'],correctAnswer:'नृत्य',explanation:'"सुंदर नृत्यही करतेस"',marks:2, sectionId: 5 },
    {id:6,type:'mcq',question:'"हितगुज" म्हणजे?',options:['भांडण','मनातील जवळची गोष्ट सांगणे','खेळणे','जेवणे'],correctAnswer:'मनातील जवळची गोष्ट सांगणे',explanation:'"हितगुज" म्हणजे प्रेमाने मनातील गोष्ट सांगणे.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'बाबांनी दिवाळीत गावाला येण्याचे सांगितले.',correctAnswer:'True',explanation:'"दिवाळीच्या सुट्टीत मी गावी येणार आहे"',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'बाबांनी दिवाळीत काय आणण्याचे सांगितले?',options:['कपडे','खाऊ आणि गोष्टींची पुस्तके','खेळणी','मिठाई'],correctAnswer:'खाऊ आणि गोष्टींची पुस्तके',explanation:'"तुझ्यासाठी गोष्टींची अनेक पुस्तके घेऊन येणार"',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'"आंतरिक गुण" म्हणजे?',options:['परीक्षेचे गुण','बाहेर दिसणारे','मनातील चांगले गुण','शारीरिक'],correctAnswer:'मनातील चांगले गुण',explanation:'"आंतरिक गुण" म्हणजे व्यक्तीच्या स्वभावाचे चांगले गुण.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'बाबांनी वैष्णवीला परीक्षेबद्दल काय सांगितले?',correctAnswer:'एक पेपर कठीण गेला म्हणजे सगळे संपत नाही, गणिताशी मैत्री कर, आंतरिक कलांची जोपासना कर',explanation:'बाबांनी प्रोत्साहनाने समजावले.',marks:2, sectionId: 6 },
  ]},

  { chapterId:11, chapterTitle:'मिनूचा जलप्रवास', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'मिनू ही काय आहे?',options:['मुलगी','माशी','पक्षी','कासव'],correctAnswer:'माशी',explanation:'मिनू ही इवलीशी मासोळी होती.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'मिनूला कशाची इच्छा होती?',options:['नदीत खेळण्याची','समुद्र पाहण्याची','पर्वत चढण्याची','उडण्याची'],correctAnswer:'समुद्र पाहण्याची',explanation:'"तो समुद्रच बघून आलो तर!"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'पाऊस आल्यामुळे मिनू समुद्राकडे वाहत गेली.',correctAnswer:'True',explanation:'मुसळधार पाऊस पडला, पूर आला आणि मिनू वाहत गेली.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'समुद्राचे पाणी कसे होते?',options:['गोड','खारट','कडू','थंड'],correctAnswer:'खारट',explanation:'"थू थू! सगळे खारट पाणी!"',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'समुद्रात मिनूला कोणाशी टक्कर झाली?',options:['कासव','घोडमासा','मगर','शार्क'],correctAnswer:'घोडमासा',explanation:'तिची एका विचित्र माशाशी — घोडमासा (sea horse) — टक्कर झाली.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'"चुकामूक" म्हणजे?',options:['भेटणे','वेगळे होणे','हरवणे','खेळणे'],correctAnswer:'वेगळे होणे',explanation:'"चुकामूक" म्हणजे दोन गोष्टी एकमेकांपासून वेगळ्या होणे.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'मिनू गोड्या पाण्याची मासोळी होती.',correctAnswer:'True',explanation:'मिनू गोड्या पाण्याची मासोळी — म्हणून खारट पाण्यात त्रास झाला.',marks:2, sectionId: 4 },
    {id:8,type:'fillinblank',question:'समुद्राच्या तळाशी मिनूला ______ भेटले.',options:['मासा','कासव','खेकडा','डॉल्फिन'],correctAnswer:'कासव',explanation:'तळाशी एक मोठे कासव बसले होते.',marks:2, sectionId: 5 },
    {id:9,type:'mcq',question:'मिनूच्या कथेतून काय शिकतो?',options:['समुद्र मोठा आहे','घराचे महत्त्व','मासे खाऊ नये','पाणी खारट असते'],correctAnswer:'घराचे महत्त्व',explanation:'खूप दूर गेल्यावर घराची ओढ लागते — मिनूलाही परत यायचे होते.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'मिनूने समुद्रात काय काय पाहिले?',correctAnswer:'खारट पाणी, खडकांवर फुलांसारखे जीव, घोडमासा, कासव',explanation:'समुद्रात मिनूने अनेक नवे अनुभव घेतले.',marks:2, sectionId: 6 },
  ]},

  { chapterId:12, chapterTitle:'चंद्रावरची शाळा', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"चंद्रावरची शाळा" कोणी लिहिली?',options:['सुमती पवार','शांता शेळके','चारुता पेंढरकर','दिलीप पाटील'],correctAnswer:'चारुता पेंढरकर',explanation:'"चंद्रावरची शाळा" चारुता पेंढरकर यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'चंद्रावरच्या शाळेत दप्तराऐवजी काय लागेल?',options:['वह्या','ऑक्सिजन सिलिंडर','लॅपटॉप','कपडे'],correctAnswer:'ऑक्सिजन सिलिंडर',explanation:'"ऑक्सिजनचा सिलिंडरच न्यावा लागेल वरती"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'चंद्रावर ऑक्सिजन नसल्याने सिलिंडर लागेल.',correctAnswer:'True',explanation:'चंद्रावर वातावरण नसल्याने ऑक्सिजन सिलिंडर लागेल.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'चंद्रावर जेवणाऐवजी काय असेल?',options:['भाजी-पोळी','फळे','जेवणाची गोड गोळी','बिस्किटे'],correctAnswer:'जेवणाची गोड गोळी',explanation:'"जेवणाची गोड गोळी घेऊन टाकायची पटपट"',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'चंद्रावर उडी मारली की काय होईल?',options:['खाली पडाल','तरंगत राहाल','पळत जाल','गोल फिराल'],correctAnswer:'तरंगत राहाल',explanation:'"एक उडी मारताच तसेच तरंगत रहाल" — गुरुत्वाकर्षण कमी.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'मुले शाळेत कसे जातील?',options:['चालत','बसने','छोट्या यानांतून','सायकलने'],correctAnswer:'छोट्या यानांतून',explanation:'"छोट्या छोट्या यानांतून शाळेत जातील मुले"',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'चंद्रावर खडू आणि फळा असेल.',correctAnswer:'False',explanation:'"चंद्रावरच्या शाळेत नसेल खडू आणि फळा"',marks:2, sectionId: 4 },
    {id:8,type:'fillinblank',question:'चंद्रावरच्या शाळेत फक्त ______ शी खेळता येईल.',options:['मुलांशी','चांदण्यांशी','रोबोटशी','पाण्याशी'],correctAnswer:'चांदण्यांशी',explanation:'"चंद्रावरच्या शाळेत फक्त चांदण्यांशीच खेळा"',marks:2, sectionId: 5 },
    {id:9,type:'mcq',question:'"यान" म्हणजे?',options:['बस','अंतराळ जहाज','बैलगाडी','विमान'],correctAnswer:'अंतराळ जहाज',explanation:'"यान" म्हणजे spacecraft.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'चंद्रावर गुरुत्वाकर्षण कमी असल्याने काय होते?',correctAnswer:'उडी मारली की तरंगत राहता येते कारण गुरुत्वाकर्षण पृथ्वीच्या १/६ आहे',explanation:'चंद्रावर गुरुत्वाकर्षण कमी आहे त्यामुळे तरंगत राहता येते.',marks:2, sectionId: 6 },
  ]},

  { chapterId:13, chapterTitle:'मोठी आई', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"मोठी आई" कोणाला म्हटले आहे?',options:['आजी','जमीन/भूमी','देश','नदी'],correctAnswer:'जमीन/भूमी',explanation:'जमीन — भूमी — हीच आपली मोठी आई.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'गहू, तांदूळ, जोंधळे कुठे तयार होतात?',options:['कारखान्यात','शेतात','झाडावर','नदीत'],correctAnswer:'शेतात',explanation:'हे सगळे शेतात — जमिनीतच — तयार होते.',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'रेशीम तुतीच्या झाडावरील किड्यांपासून मिळते.',correctAnswer:'True',explanation:'रेशमाचे किडे तुतीच्या झाडावर असतात.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"भूमी" म्हणजे?',options:['आकाश','समुद्र','जमीन','पाणी'],correctAnswer:'जमीन',explanation:'"भूमी" म्हणजे जमीन, पृथ्वी.',marks:2, sectionId: 3 },
    {id:5,type:'fillinblank',question:'चांदी, रुपे, पितळ, तांबे यांच्या ______ जमिनीत सापडतात.',options:['शेती','झाडे','खाणी','नद्या'],correctAnswer:'खाणी',explanation:'या धातूंच्या खाणी जमिनीत सापडतात.',marks:2, sectionId: 5 },
    {id:6,type:'truefalse',question:'कापूस जमिनीतून येतो.',correctAnswer:'True',explanation:'कापसाचे झाड जमिनीत वाढते.',marks:2, sectionId: 4 },
    {id:7,type:'mcq',question:'"खाण" म्हणजे?',options:['शेत','जमिनीतून खनिजे काढण्याची जागा','बाग','नदी'],correctAnswer:'जमिनीतून खनिजे काढण्याची जागा',explanation:'"खाण" म्हणजे Mine.',marks:2, sectionId: 3 },
    {id:8,type:'mcq',question:'लोखंड आणि दगडी कोळसा यामुळे काय चालते?',options:['शेती','गिरण्या आणि कारखाने','विमाने','जहाजे'],correctAnswer:'गिरण्या आणि कारखाने',explanation:'"लोखंड व कोळसा यांमुळे तर प्रत्येक गिरणी अन् कारखाना चालतो"',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'या पाठातून कोणती भावना शिकायला मिळते?',options:['राग','कृतज्ञता','दुःख','भीती'],correctAnswer:'कृतज्ञता',explanation:'जमिनीने इतके दिले — त्याबद्दल कृतज्ञता बाळगणे.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'जमीन आपली "मोठी आई" का आहे?',correctAnswer:'जमीन आपल्याला अन्न, कपडे, धातू, इंधन — सगळे देते. जशी आई पोषण करते तशी जमीन आपले पोषण करते',explanation:'जमिनीने आपल्याला जगण्यासाठी आवश्यक सगळ्या गोष्टी दिल्या आहेत.',marks:2, sectionId: 6 },
  ]},

  { chapterId:14, chapterTitle:'अप्पाजींचे चातुर्य', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'अप्पाजी कोणाचे प्रधान होते?',options:['शिवाजी महाराज','कृष्णदेवराय','औरंगजेब','अकबर'],correctAnswer:'कृष्णदेवराय',explanation:'विजयनगरात कृष्णदेवराय राज्य करत होते आणि अप्पाजी त्यांचे प्रधान होते.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'कलिंग राजाला काय पाठवायचे होते?',options:['आंबे','कोबी','फुले','तांदूळ'],correctAnswer:'कोबी',explanation:'कलिंग राजाला विजयनगरच्या चवदार कोबी पाठवायच्या होत्या.',marks:2, sectionId: 3 },
    {id:3,type:'mcq',question:'अप्पाजींनी कोबी पाठवण्यासाठी काय युक्ती केली?',options:['थंड खोलीत ठेवली','बैलगाडीत माती भरून बी पेरले','पाण्यात ठेवली','लवकर पाठवली'],correctAnswer:'बैलगाडीत माती भरून बी पेरले',explanation:'गाडीत माती भरून कोबीचे बी पेरले आणि प्रवासात पाणी देत नेले.',marks:2, sectionId: 3 },
    {id:4,type:'truefalse',question:'तीन महिन्यांत कोबी कलिंग राज्यात ताजी पोहोचली.',correctAnswer:'True',explanation:'तीन महिन्यांनी ती बैलगाडी कलिंग राज्यात पोहोचली — कोबी ताजी होती.',marks:2, sectionId: 4 },
    {id:5,type:'mcq',question:'तीन मूर्तींतील फरक शोधण्यासाठी अप्पाजींनी काय वापरले?',options:['पाणी','तार','दगड','काठी'],correctAnswer:'तार',explanation:'अप्पाजींनी एक लवचिक तार घेतली आणि मूर्तींच्या कानात घातली.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'पहिल्या मूर्तीतून तार कुठून बाहेर पडली?',options:['कानातून','तोंडातून','नाकातून','डोळ्यातून'],correctAnswer:'तोंडातून',explanation:'पहिल्या मूर्तींच्या कानात तार घातली — ती तोंडातून बाहेर पडली.',marks:2, sectionId: 3 },
    {id:7,type:'mcq',question:'उत्कृष्ट मूर्ती म्हणजे कोणती?',options:['एका कानाने ऐकणारी','तोंडाने सांगणारी','पोटात साठवणारी','न ऐकणारी'],correctAnswer:'पोटात साठवणारी',explanation:'तिसरी मूर्ती — ऐकले ते पोटात (मनात) साठवते — उत्कृष्ट.',marks:2, sectionId: 3 },
    {id:8,type:'truefalse',question:'"चतुर" म्हणजे हुशार.',correctAnswer:'True',explanation:'"चतुर" म्हणजे हुशार, चाणाक्ष.',marks:2, sectionId: 4 },
    {id:9,type:'fillinblank',question:'अप्पाजींच्या ______ ला कलिंग राजाने खूप दाद दिली.',options:['युक्तीला','रागाला','शक्तीला','संपत्तीला'],correctAnswer:'युक्तीला',explanation:'अप्पाजींच्या बुद्धिमत्तेचे आणि युक्तीचे राजाने खूप कौतुक केले.',marks:2, sectionId: 5 },
    {id:10,type:'shortanswer',question:'तीन मूर्तींचे उदाहरण देऊन ज्ञानाचे तीन प्रकार सांगा.',correctAnswer:'निकृष्ट — एका कानाने ऐकणे, दुसऱ्याने सोडणे; मध्यम — ऐकले ते दुसऱ्याला सांगणे; उत्कृष्ट — ऐकले ते मनात जपणे आणि विचार करणे',explanation:'तीन मूर्तींद्वारे ज्ञानाचे तीन स्तर स्पष्ट केले.',marks:2, sectionId: 6 },
  ]},

  { chapterId:15, chapterTitle:'होळी आली होळी', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"होळी आली होळी" कोणी लिहिली?',options:['विंदा करंदीकर','शांता शेळके','दिलीप पाटील','सुमती पवार'],correctAnswer:'दिलीप पाटील',explanation:'"होळी आली होळी" दिलीप पाटील यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'कवितेत होळीसाठी काय करू नका असे सांगितले?',options:['रंग खेळू नका','पोळी खाऊ नका','झाडे तोडू नका','आग लावू नका'],correctAnswer:'झाडे तोडू नका',explanation:'"झाडे, फांद्या तोडू नका केर-कचरा खड्ड्यात टाका"',marks:2, sectionId: 3 },
    {id:3,type:'truefalse',question:'होळी हा रंगांचा आणि आनंदाचा सण आहे.',correctAnswer:'True',explanation:'होळी हा हिंदूंचा आनंदाचा सण आहे.',marks:2, sectionId: 4 },
    {id:4,type:'mcq',question:'"अनिष्ट रूढी" म्हणजे?',options:['चांगल्या परंपरा','वाईट जुन्या प्रथा','नवीन फॅशन','खाद्यपदार्थ'],correctAnswer:'वाईट जुन्या प्रथा',explanation:'"अनिष्ट" म्हणजे वाईट — अनिष्ट रूढी म्हणजे वाईट जुन्या प्रथा.',marks:2, sectionId: 3 },
    {id:5,type:'mcq',question:'"पुरणाची पोळी" कोणत्या सणाचा पारंपरिक पदार्थ?',options:['दिवाळी','होळी','गणपती','दसरा'],correctAnswer:'होळी',explanation:'होळीला पुरणाची पोळी हा पारंपरिक खाद्यपदार्थ आहे.',marks:2, sectionId: 3 },
    {id:6,type:'fillinblank',question:'"होळी आली होळी भरा ______ ची झोळी"',options:['दुर्गुणांची','सद्गुणांची','पैशांची','मिठाईची'],correctAnswer:'सद्गुणांची',explanation:'"भरा सद्गुणांची झोळी, अनिष्ट रूढी प्रथांची बांधू होळीसाठी मोळी"',marks:2, sectionId: 5 },
    {id:7,type:'truefalse',question:'होळी म्हणजे अनिष्ट रूढी जाळून नव्या चांगल्या गोष्टी स्वीकारणे.',correctAnswer:'True',explanation:'होळीचा खरा अर्थ — वाईट गोष्टी जाळणे आणि चांगल्या गोष्टी स्वीकारणे.',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'"वृक्ष राजी" म्हणजे?',options:['झाडे','फुले','पाने','फळे'],correctAnswer:'झाडे',explanation:'"वृक्ष राजी" म्हणजे झाडे.',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'जो होळी जबाबदारीने साजरी करतो त्याच्या घरी कोण येतो?',options:['देव','निसर्गराजा','राजा','गुरुजी'],correctAnswer:'निसर्गराजा',explanation:'"निसर्गराजा त्याच्या घरी स्वतः येऊन पाणी भरील"',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'होळी साजरी करताना पर्यावरणाची काळजी कशी घ्यावी?',correctAnswer:'झाडे तोडू नका, सुकलेले गवत व कचरा वापरावा, कचरा खड्ड्यात टाकावा',explanation:'होळीसाठी झाडे तोडू नका — निसर्गाचे रक्षण करणे हीच खरी होळी.',marks:2, sectionId: 6 },
  ]},

  { chapterId:16, chapterTitle:'मुक्या प्राण्यांची कैफियत', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"मुक्या प्राण्यांची कैफियत" कोणी लिहिली?',options:['शांता शेळके','विंदा करंदीकर','ज्योती वैद्य–शेटे','दिलीप पाटील'],correctAnswer:'ज्योती वैद्य–शेटे',explanation:'"मुक्या प्राण्यांची कैफियत" ज्योती वैद्य–शेटे यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'या पाठात कोणकोणते प्राणी बोलतात?',options:['वाघ, सिंह, हत्ती','चिमणी, गाय, मासोळी, नागोबा','कुत्रा, मांजर, ससा','हरीण, कोल्हा, अस्वल'],correctAnswer:'चिमणी, गाय, मासोळी, नागोबा',explanation:'या पाठात चिमणी, गाय, मासोळी आणि नागोबा यांचा संवाद आहे.',marks:2, sectionId: 3 },
    {id:3,type:'mcq',question:'चिमणीला कशाचा त्रास होतो?',options:['प्लॅस्टिकचा','मोबाईलच्या आवाजाचा','प्रदूषणाचा','उकाड्याचा'],correctAnswer:'मोबाईलच्या आवाजाचा',explanation:'"मोबाईलचा आवाज, तुज सहन न होई"',marks:2, sectionId: 3 },
    {id:4,type:'truefalse',question:'गायीला प्लॅस्टिक खाल्ल्याने त्रास होतो.',correctAnswer:'True',explanation:'"घासाबरोबर प्लॅस्टिक जाते माझे तर पोटशूळच उठते"',marks:2, sectionId: 4 },
    {id:5,type:'mcq',question:'मासोळी सांगते तलावाचे पाणी कसे आहे?',options:['स्वच्छ','थंड','विषारी','गोड'],correctAnswer:'विषारी',explanation:'"अगं इथले जल विषारी तगमग जीवाची होते भारी"',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'"कैफियत" म्हणजे?',options:['आनंद','तक्रार, मांडणी','पत्र','गाणे'],correctAnswer:'तक्रार, मांडणी',explanation:'"कैफियत" म्हणजे तक्रार, स्वतःची बाजू मांडणे.',marks:2, sectionId: 3 },
    {id:7,type:'truefalse',question:'माणसाने जंगल नष्ट केल्यामुळे नागोबाला शेतात यावे लागते.',correctAnswer:'True',explanation:'"नाही वारूळ, नाही शेती, मला पकडून लाह्या देती"',marks:2, sectionId: 4 },
    {id:8,type:'mcq',question:'सर्व प्राणी मिळून माणसाला काय सांगतात?',options:['आम्हाला खायला द्या','निसर्गाला प्रदूषित करणे थांबव','आम्हाला सोडा','आम्हाला घरी या'],correctAnswer:'निसर्गाला प्रदूषित करणे थांबव',explanation:'सर्व प्राणी — "करत राहशील जर प्रदूषित सारे धरती माता देईल दूषणे"',marks:2, sectionId: 3 },
    {id:9,type:'mcq',question:'"परस्परावलंबन" म्हणजे?',options:['एकट्याने जगणे','एकमेकांवर अवलंबून असणे','स्वावलंबी असणे','दुसऱ्यावर राग करणे'],correctAnswer:'एकमेकांवर अवलंबून असणे',explanation:'"परस्परावलंबन" म्हणजे एकमेकांवर अवलंबून असणे — माणूस आणि प्राणी.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'या पाठात प्राण्यांनी कोणकोणत्या समस्या मांडल्या?',correctAnswer:'चिमणी — मोबाईल आवाज; गाय — प्लॅस्टिक खाणे; मासोळी — पाणी प्रदूषण; नागोबा — जंगल नाश',explanation:'प्रत्येक प्राण्याची वेगळी समस्या — सगळ्या माणसामुळेच.',marks:2, sectionId: 6 },
  ]},

  { chapterId:17, chapterTitle:'पाणपोई', totalMarks:20, questions:[
    {id:1,type:'mcq',question:'"पाणपोई" कोणी लिहिली?',options:['विंदा करंदीकर','शांता शेळके','अय्युब पठाण लोहगावकर','दिलीप पाटील'],correctAnswer:'अय्युब पठाण लोहगावकर',explanation:'"पाणपोई" अय्युब पठाण लोहगावकर यांनी लिहिली.',marks:2, sectionId: 3 },
    {id:2,type:'mcq',question:'"पाणपोई" म्हणजे काय?',options:['पाण्याचा झरा','वाटसरूंना पाणी पिण्यासाठी केलेली सोय','नदीकाठ','विहीर'],correctAnswer:'वाटसरूंना पाणी पिण्यासाठी केलेली सोय',explanation:'पाणपोई म्हणजे रस्त्याने येणाऱ्या-जाणाऱ्यांना मोफत थंड पाणी मिळण्याची सोय.',marks:2, sectionId: 3 },
    {id:3,type:'mcq',question:'पाणपोई कोणत्या झाडाखाली आहे?',options:['आंब्याच्या','निंबाच्या','वडाच्या','पिंपळाच्या'],correctAnswer:'वडाच्या',explanation:'"वटवृक्षाच्या सावलीत थाटलेली पाणपोई"',marks:2, sectionId: 3 },
    {id:4,type:'truefalse',question:'पाणपोईत श्रीमंत-गरीब सगळ्यांना समान पाणी मिळते.',correctAnswer:'True',explanation:'"रंक असो वा राव हे पाणी पितात सारेजण"',marks:2, sectionId: 4 },
    {id:5,type:'mcq',question:'"रंक" म्हणजे?',options:['श्रीमंत','राजा','गरीब','व्यापारी'],correctAnswer:'गरीब',explanation:'"रंक" म्हणजे गरीब, "राव" म्हणजे श्रीमंत.',marks:2, sectionId: 3 },
    {id:6,type:'mcq',question:'पाणपोईत पाणी कशात ठेवतात?',options:['बाटलीत','रांजणात','पिशवीत','थाळीत'],correctAnswer:'रांजणात',explanation:'"पिण्यास ठेवतात पाण्याने भरलेले रांजण"',marks:2, sectionId: 3 },
    {id:7,type:'fillinblank',question:'"धन्य असो ज्याने थाटिली ही ______ उन्हात"',options:['विहीर','शाळा','पाणपोई','बाग'],correctAnswer:'पाणपोई',explanation:'"धन्य असो ज्याने थाटिली ही पाणपोई उन्हात"',marks:2, sectionId: 5 },
    {id:8,type:'truefalse',question:'"दग्ध ऊन" म्हणजे भाजणारे ऊन.',correctAnswer:'True',explanation:'"दग्ध ऊन" म्हणजे भाजणारे, जाळणारे ऊन.',marks:2, sectionId: 4 },
    {id:9,type:'mcq',question:'"दुवा देणे" म्हणजे?',options:['शिव्या देणे','आशीर्वाद देणे','पैसे देणे','वस्तू देणे'],correctAnswer:'आशीर्वाद देणे',explanation:'"दुवा देणे" म्हणजे मनापासून आशीर्वाद देणे.',marks:2, sectionId: 3 },
    {id:10,type:'shortanswer',question:'पाणपोईतून कोणती मूल्ये शिकतो?',correctAnswer:'समता — रंक-राव समान; दातृत्व — मोफत सेवा; माणुसकी — इतरांसाठी करणे',explanation:'पाणपोई ही समता, दातृत्व आणि माणुसकीचे उत्कृष्ट उदाहरण.',marks:2, sectionId: 6 },
  ]},
]

export function getMarQuiz(chapterId: number): MarQuiz | undefined {
  return MAR_QUIZZES.find(q => q.chapterId === chapterId)
}

export default MAR_QUIZZES
