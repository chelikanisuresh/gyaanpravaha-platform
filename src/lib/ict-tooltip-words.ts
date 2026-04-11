// ICT Tooltip word maps — Gyaanpravaha
// Connexion Class 6, Project 1

export interface TooltipWord { display: string; meaning: string }
export type WordMap = Record<string, TooltipWord>

const chapter1Words: WordMap = {
  'file':           { display: 'File',          meaning: 'A collection of data stored permanently on a computer — can contain text, images, audio, video, or any other information.' },
  'file extension': { display: 'File Extension', meaning: 'The three or four character code after the dot in a file name (like .jpg or .mp3). It tells the computer which app to use to open the file.' },
  '.jpg':           { display: '.jpg',           meaning: 'JPEG image — the most common photo format. Compressed for small size while keeping good quality.' },
  '.png':           { display: '.png',           meaning: 'Portable Network Graphics — supports transparent backgrounds. Used for logos and website graphics.' },
  '.gif':           { display: '.gif',           meaning: 'Graphics Interchange Format — supports animation. Used for animated images and memes.' },
  '.mp3':           { display: '.mp3',           meaning: 'The most popular audio format. Compressed for small file size while maintaining good sound quality.' },
  '.mp4':           { display: '.mp4',           meaning: 'The most popular video format today. Good quality with small file size. Used on YouTube and streaming platforms.' },
  '.pdf':           { display: '.pdf',           meaning: 'Portable Document Format — developed by Adobe. Looks the same on every device. Used for official documents and worksheets.' },
  '.docx':          { display: '.docx',          meaning: 'Microsoft Word document format. Used for writing documents, letters, and reports.' },
  '.xlsx':          { display: '.xlsx',          meaning: 'Microsoft Excel spreadsheet format. Used for tables, data, and calculations.' },
  '.pptx':          { display: '.pptx',          meaning: 'Microsoft PowerPoint format. Used for presentations and slideshows.' },
}

const chapter2Words: WordMap = {
  'artificial intelligence': { display: 'Artificial Intelligence', meaning: 'A branch of computer science that enables machines to think, learn, and act like humans — performing tasks without being explicitly programmed.' },
  'machine learning':        { display: 'Machine Learning',        meaning: 'A method of achieving AI where machines learn from data and improve automatically, without being manually programmed with rules.' },
  'deep learning':           { display: 'Deep Learning',           meaning: 'An advanced type of Machine Learning using multiple layers of artificial neurons to learn complex patterns. Used in self-driving cars.' },
  'speech recognition':      { display: 'Speech Recognition',      meaning: 'AI that converts spoken words into text. Used in Siri, Google Assistant, Alexa, and GPS systems.' },
  'natural language processing': { display: 'Natural Language Processing', meaning: 'AI that understands and generates human language. Used in chatbots, Google Translate, and voice assistants.' },
  'image recognition':       { display: 'Image Recognition',       meaning: 'AI that identifies objects, faces, and text in images. Used in Face ID, fingerprint scanning, and medical imaging.' },
  'automation':              { display: 'Automation',               meaning: 'Using machines or AI to perform tasks automatically that would otherwise need humans — especially repetitive tasks.' },
  'algorithm':               { display: 'Algorithm',               meaning: 'A set of rules or instructions that a computer follows step by step to solve a problem or complete a task.' },
  'chatbot':                 { display: 'Chatbot',                 meaning: 'An AI program that can have conversations with humans in natural language. Used on websites for customer service.' },
  'rational':                { display: 'Rational',                meaning: 'Based on reason and logic rather than emotions. AI makes rational decisions from data, not feelings.' },
}

const chapter3Words: WordMap = {
  'html':           { display: 'HTML',           meaning: 'Hyper Text Markup Language — the language used to create web pages. Not a programming language but a markup language.' },
  'markup language':{ display: 'Markup Language', meaning: 'A language that uses tags to describe the structure and appearance of content. HTML is a markup language.' },
  'web page':       { display: 'Web page',        meaning: 'A single document on the internet written in HTML — like one page of a book.' },
  'website':        { display: 'Website',         meaning: 'A collection of web pages linked together, all belonging to the same organisation or person.' },
  'web browser':    { display: 'Web browser',     meaning: 'Software that reads HTML files and displays them as web pages. Examples: Chrome, Firefox, Edge, Opera.' },
  'html tag':       { display: 'HTML tag',        meaning: 'A keyword enclosed in angle brackets (< >) that gives instructions to the browser about how to display content.' },
  'container tag':  { display: 'Container tag',   meaning: 'An HTML tag that has both an opening and closing tag. Content goes between them. Example: <b>bold</b>.' },
  'empty tag':      { display: 'Empty tag',       meaning: 'An HTML tag with only an opening tag — no closing tag needed. Examples: <br>, <img>.' },
  'notepad':        { display: 'Notepad',         meaning: 'A simple text editor on Windows used for writing HTML. Saves exactly what you type with no hidden formatting.' },
  'hyperlink':      { display: 'Hyperlink',       meaning: 'A clickable link in a web page that takes you to another page or document. HTML stands for Hyper Text Markup Language.' },
}

const chapter4Words: WordMap = {
  'bold':           { display: 'Bold',           meaning: 'Text that appears thicker and heavier. Created in HTML using the <b> tag.' },
  'italic':         { display: 'Italic',         meaning: 'Text that appears slanted to the right. Created in HTML using the <i> tag.' },
  'underline':      { display: 'Underline',      meaning: 'A line drawn under text. Created in HTML using the <u> tag.' },
  'subscript':      { display: 'Subscript',      meaning: 'Text that appears below the normal line — like the 2 in H₂O. Created using the <sub> tag.' },
  'superscript':    { display: 'Superscript',    meaning: 'Text that appears above the normal line — like the 3 in x³. Created using the <sup> tag.' },
  'strikethrough':  { display: 'Strikethrough',  meaning: 'A line drawn through the middle of text, showing it is cancelled. Created using the <s> tag.' },
  'attribute':      { display: 'Attribute',      meaning: 'A keyword inside an HTML tag that provides extra settings. Written as attribute="value". Example: color="red".' },
  'bgcolor':        { display: 'BGCOLOR',         meaning: 'An attribute of the <body> tag that sets the background colour of the whole web page.' },
  'marquee':        { display: 'Marquee',        meaning: 'An HTML tag that makes text scroll automatically from right to left across the screen.' },
  'hexadecimal':    { display: 'Hexadecimal',    meaning: 'A six-digit colour code starting with # used to specify colours in HTML. Example: #ff0000 is red.' },
  'ordered list':   { display: 'Ordered list',   meaning: 'An HTML list where items are numbered or lettered in sequence. Created using the <ol> tag.' },
  'unordered list': { display: 'Unordered list', meaning: 'An HTML list where items are marked with bullets. Created using the <ul> tag.' },
}

const chapter5Words: WordMap = {
  'table':          { display: 'Table',          meaning: 'A structured grid of rows and columns used to display data clearly. Created in HTML using the <table> tag.' },
  'table row':      { display: 'Table Row',      meaning: 'A horizontal strip in a table. Defined in HTML using the <tr> tag. Each row contains one or more cells.' },
  'table data':     { display: 'Table Data',     meaning: 'A single cell inside a table row. Defined using the <td> tag. The content of the cell goes between <td> and </td>.' },
  'border':         { display: 'Border',         meaning: 'A visible line around a table and its cells. Added using the border attribute: <table border=2>. The number is thickness in pixels.' },
  'cell padding':   { display: 'Cell Padding',   meaning: 'The space inside a cell between the content and the cell\'s border wall. Added using cellpadding attribute.' },
  'cell spacing':   { display: 'Cell Spacing',   meaning: 'The space between adjacent cells — the gap between neighbouring cell borders. Added using cellspacing attribute.' },
  'align':          { display: 'Align',          meaning: 'An attribute that controls the horizontal position of the table: LEFT, RIGHT, or CENTER.' },
  'src':            { display: 'src',            meaning: 'Source attribute of the <img> tag. Specifies the file path or URL of the image to display.' },
  'pixel':          { display: 'Pixel',          meaning: 'The smallest unit on a computer screen. Image dimensions and border thickness are measured in pixels.' },
  'tabular':        { display: 'Tabular',        meaning: 'Organised in a table format with rows and columns. HTML tables display data in tabular form.' },
}

export const ICT_CHAPTER_WORDS: Record<number, WordMap> = {
  1: chapter1Words, 2: chapter2Words, 3: chapter3Words, 4: chapter4Words, 5: chapter5Words,
}

export function getICTWordMap(chapterId: number): WordMap {
  return ICT_CHAPTER_WORDS[chapterId] || {}
}
