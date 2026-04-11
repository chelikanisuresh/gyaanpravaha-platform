// ICT Chapter Content — Gyaanpravaha
// Connexion Class 6, Project 1
// All 5 chapters — fully written in tuition-teacher style

export interface Section {
  id: number
  title: string
  content: string
  minReadSeconds?: number
}

export interface Chapter {
  id: number
  title: string
  type: 'Concepts' | 'AI' | 'HTML' | 'Practical'
  estimatedReadMins: number
  sections: Section[]
}

// ─── CHAPTER 1 ────────────────────────────────────────────────────────────────

const chapter1: Chapter = {
  id: 1,
  title: 'File Management — Organization of Data',
  type: 'Concepts',
  estimatedReadMins: 12,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every time you take a photo, download a song, or save a document on a computer — you are creating a file. But have you ever wondered how computers store all of this? What exactly is a file? And why does every file have a different name ending — like .jpg, .mp3, or .pdf?

This chapter answers all of that. You will learn what files are, how they are classified, what file extensions mean, and how the computer uses them to recognise and open files automatically.

By the end of this chapter, you will be able to look at any file name and immediately know what type of file it is and which application it belongs to.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is part of ICT — Information and Communications Technology. ICT is the study of how computers, software, and networks are used to store, manage, and communicate information.

One of the most basic things a computer does is store information. Whether it is your favourite song, a school project, a family photo, or a game — everything on a computer is stored as a file.

Understanding how files work is the foundation of working with any computer or device. Before you can create websites, write code, or use AI — you need to understand the building blocks. Files and file formats are those building blocks.

This chapter gives you that foundation.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define what a file is and explain how computers store data
• Identify and describe the four common file formats: Image, Audio, Video, and Application-based
• Recognise file extensions and explain what they tell us about a file
• Match common file extensions to their correct file types and applications
• Explain why file extensions are important for computers`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 420,
      content: `Let us understand files and file management together.

─────

PART A — What is a File?

We know that computers store information permanently. This information is stored in the form of a FILE.

We can define a File as a collection of data. Files can contain any type of information — text, images, pictures, or any other data in any format.

Think of a file like a folder in your school bag. Just like different folders hold different subjects — Maths, Science, English — different files hold different types of information. And just like you can tell which subject a folder is for by reading its label, you can tell what type of information a file contains by reading its name and extension.

There are different file types used in computers. Files are classified on the basis of their application — meaning, what they are used for.

─────

PART B — Four Common File Formats

1. Image Files
Image files store pictures and photographs. When you take a photo or download a picture from the internet, it is saved as an image file.

2. Audio Files
Audio files store sound — music, voice recordings, podcasts. When you download a song or record your voice on a phone, it is saved as an audio file.

3. Video Files
Video files store moving images with sound. Movies, YouTube videos, and recorded lectures are stored as video files.

4. Application-based Files
Application-based files are created by specific software applications — like Microsoft Word, Excel, or PowerPoint. They can only be opened properly by the application that created them.

─────

PART C — What is a File Extension?

A computer file extension is commonly a three or four character addition that follows the name of a file.

For example: report.docx — here, "report" is the file name and ".docx" is the file extension.

The extension indicates the format of the file. A few common file extensions include DOCX, XLSX, TXT, PDF, MP3, JPG, etc.

Why do we need File Extensions?
File extensions are used so that the computer can recognise the file type. When your computer sees a file with a .xlsx extension, it knows that this file was created using Microsoft Excel. So when you double-click on any file, the computer automatically opens the file in that particular application.

Without file extensions, your computer would not know which application to use to open a file. It would be like receiving a letter with no instructions on which language to read it in.

─────

PART D — Image File Extensions

| Extension | Full Name | What it is |
.bmp — Bitmap image — A basic image format. Large file size, no compression. Good quality.
.gif — GIF image (Graphics Interchange Format) — Supports animation. Often used for animated stickers and memes.
.jpeg or .jpg — JPEG image (Joint Photographic Experts Group) — The most common photo format. Used for photographs and web images. Smaller file size.
.png — PNG image (Portable Network Graphics) — Supports transparent backgrounds. Used for logos and graphics on websites.

─────

PART E — Audio File Extensions

.mp3 — MP3 audio — The most popular music format. Compressed for small file size while keeping good sound quality.
.wav — Waveform Audio — High quality, uncompressed audio. Larger file size. Used in professional music production.
.wma — Windows Media Audio file — Microsoft's audio format. Used on Windows devices.
.wpl — Windows Media Player playlist — A list of songs to play in order, not an audio file itself.

─────

PART F — Video File Extensions

.avi — AVI file (Audio Video Interleave) — An older video format. High quality but large file size.
.mp4 — MPEG4 video file (Moving Picture Experts Group) — The most popular video format today. Good quality with small file size. Used on YouTube, phones, and streaming.
.wmv — Windows Media Video file — Microsoft's video format. Used on Windows Media Player.

─────

PART G — Application-based File Extensions

.doc or .docx — Microsoft Word file — Used for documents, essays, letters, and reports.
.xls or .xlsx — Microsoft Excel file — Used for spreadsheets, tables, and data.
.ppt or .pptx — Microsoft PowerPoint file — Used for presentations and slide shows.
.txt — Notepad Text file — A simple text file with no formatting. Opens in any text editor.
.pdf — Portable Document Format — Developed by Adobe Systems. A PDF file is like an electronic image of a document that can be printed or forwarded to others. Most school worksheets and forms are shared in PDF format. PDF files look the same on any device or operating system.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `File — A collection of data stored permanently on a computer. Files can contain text, images, audio, video, or any other type of information.

File Extension — A three or four character code that follows the file name (after the dot). It tells the computer what type of file it is and which application to use to open it.

Image File — A file that stores pictures or photographs. Common extensions: .bmp, .gif, .jpg, .png.

Audio File — A file that stores sound or music. Common extensions: .mp3, .wav, .wma.

Video File — A file that stores moving images with sound. Common extensions: .avi, .mp4, .wmv.

Application-based File — A file created by a specific software application. Examples: .docx (Word), .xlsx (Excel), .pptx (PowerPoint), .pdf (Adobe).

.jpg / .jpeg — Joint Photographic Experts Group. The most common image format for photographs. Compressed for smaller size.

.png — Portable Network Graphics. Supports transparent backgrounds. Used for logos and website graphics.

.gif — Graphics Interchange Format. Supports animation. Used for animated images and memes.

.mp3 — The most popular audio format. Compressed for small file size while maintaining good sound quality.

.mp4 — Moving Picture Experts Group. The most popular video format today. Used on YouTube, phones, and streaming platforms.

.pdf — Portable Document Format. Developed by Adobe. Looks the same on every device. Used for official documents, worksheets, and forms.

.docx — Microsoft Word document. Used for writing documents, letters, and reports.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Organisation is a superpower — A computer stores thousands of files. Without a proper system of file names, extensions, and folders, finding anything would be impossible. Good organisation — whether on a computer or in your school bag — saves time and reduces frustration. The habit of naming files clearly and keeping them in the right folders is something that will serve you well your whole life.

The right tool for the right job — Just as a doctor uses a stethoscope and a carpenter uses a hammer, different file formats exist because different jobs need different tools. A .jpg is great for a photograph but terrible for a legal document. A .pdf is perfect for sharing a form but wrong for editing a song. Learning which format is right for which job is an important real-world skill.

Understanding before using — Most people use files every day without ever thinking about what they are. This chapter teaches you to look more carefully at the technology you use — to understand it, not just use it. That curiosity and understanding is the beginning of becoming a true technology creator, not just a user.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. A File is a collection of data stored permanently on a computer. Files can contain text, images, audio, video, or any other type of information. There are four common file formats: Image, Audio, Video, and Application-based.

2. A File Extension is the three or four character code after the dot in a file name (e.g. .jpg, .mp3, .pdf). It tells the computer what type of file it is and which application to use to open it.

3. Image file extensions: .bmp (Bitmap), .gif (animated images), .jpg/.jpeg (photographs), .png (transparent graphics).

4. Audio extensions: .mp3 (most popular music format), .wav (high quality), .wma (Windows audio). Video extensions: .avi (older format), .mp4 (most popular today), .wmv (Windows video).

5. Application extensions: .docx (Word), .xlsx (Excel), .pptx (PowerPoint), .txt (Notepad), .pdf (Portable Document Format — looks the same on every device).`,
    },
  ],
}

// ─── CHAPTER 2 ────────────────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'Artificial Intelligence',
  type: 'AI',
  estimatedReadMins: 14,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `When you speak to Siri or Google Assistant, they understand you and reply. When Spotify recommends a song you end up loving, it has predicted your taste. When a self-driving car stops at a red light, it has made a decision on its own. None of this requires a human — the machine is thinking and deciding.

This is Artificial Intelligence — and it is changing the world faster than almost any technology in human history.

This chapter explains what AI is, where it is used, how Machine Learning and Deep Learning relate to it, and what it means to use AI responsibly. By the end, you will understand the technology that is already shaping your daily life — and will shape your future career.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is one of the most relevant lessons in your entire ICT course. Artificial Intelligence is no longer science fiction — it is in your phone, your apps, your hospital, your city, and your classroom.

The word "Artificial" means man-made or created by humans. The word "Intelligence" means the ability to think, learn, and solve problems. So Artificial Intelligence literally means: intelligence created by humans — and placed inside machines.

AI is a branch of computer science. It is the science and engineering of making intelligent machines — machines that can think, learn, and act like humans. Unlike traditional programs that follow fixed instructions, AI programs can learn from data and improve over time.

This chapter gives you the foundational understanding of a technology that will define the next 50 years.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define Artificial Intelligence and explain what makes it different from regular computer programs
• List and explain the three things AI includes: problem-solving ability, rational thinking, and human-like behaviour
• Describe five real-world applications of AI with examples
• Explain the relationship between AI, Machine Learning, and Deep Learning
• List the pros and cons of Artificial Intelligence
• Understand and explain the principles of responsible use of AI`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 540,
      content: `Let us understand Artificial Intelligence together — fully and clearly.

─────

PART A — What is Artificial Intelligence?

Artificial Intelligence (AI) is a branch of computer science that enables machines to think, learn, and act like humans.

Four key points about AI:
• AI is a branch of computer science
• It enables machines to think, learn, and act like humans
• AI performs tasks without being explicitly programmed — it figures things out on its own
• AI simulates human intelligence in machines

What does "simulate" mean here? It means the machine behaves AS IF it is intelligent — it can understand speech, recognise faces, make decisions, and solve problems — the way a human would.

AI includes three key capabilities:
1. Problem-solving ability — AI can analyse a situation and find the best solution. Like a chess computer that thinks many moves ahead.
2. Rational thinking — AI makes decisions based on logic and data, not emotions.
3. Human-like behaviour — AI can have conversations, recognise faces, understand language, and even create art.

─────

PART B — Implementation of AI — Where is it Used?

AI is not a single product — it is a set of technologies applied across many fields. Here are five major applications:

Speech Recognition
Description: Converts spoken words into text
Examples: Voice assistants (Siri, Google Assistant, Alexa), GPS navigation, dictation software
How it works: You speak, AI listens, converts your voice into text, understands it, and responds.

Image Recognition
Description: Identifies objects, faces, and text in images
Examples: Face ID on your phone, fingerprint scan, reading medical images (X-rays)
How it works: AI has been trained on millions of images. When it sees a new image, it compares it to what it has learned and identifies what it sees.

Natural Language Processing (NLP)
Description: AI understands and generates human language
Examples: Siri, Alexa, Chatbots on websites, Google Translate
How it works: AI is trained on vast amounts of human text and learns the patterns of language — grammar, meaning, context — and can then understand and respond in natural language.

Ride-Sharing Services
Description: Matches drivers and passengers efficiently
Examples: Uber, Ola, Rapido
How it works: AI analyses hundreds of variables — location, traffic, demand, driver availability — and makes the best match in seconds.

Household Robots
Description: Performs tasks intelligently in the home
Examples: Roomba vacuum cleaner, smart home systems
How it works: Robots use sensors and AI to navigate rooms, avoid obstacles, and complete tasks without human guidance.

─────

PART C — The Relationship between AI, Machine Learning and Deep Learning

Think of these three as circles inside each other:

AI is the biggest circle — the broadest concept. It covers any technique that makes machines intelligent.

Machine Learning is inside AI — it is a specific method of achieving AI. Instead of programming rules manually, you give the machine data and let it learn the rules on its own.
Example: You show a Machine Learning system thousands of photos of cats and dogs. It learns on its own what features distinguish cats from dogs. Next time it sees a new photo — it can tell you: cat or dog.

Deep Learning is inside Machine Learning — it is an advanced method that uses multiple layers of artificial "neurons" (inspired by the human brain) to learn very complex patterns.
Example: Self-driving cars use Deep Learning to understand the road, traffic signs, pedestrians, and other vehicles — all at the same time, in real time.

Summary table:
Artificial Intelligence — Making machines intelligent like humans — Example: Smart speakers
Machine Learning — Machines learn from data and improve automatically — Example: Image recognition
Deep Learning — Uses multiple layers to learn complex patterns — Example: Self-driving cars

─────

PART D — Pros of Artificial Intelligence

Error-Free — AI reduces human mistakes. A machine does not get tired, distracted, or emotional. It performs the same task with the same accuracy every single time.

Repetitive Work — AI automates repeated tasks. Work that would take a human hours — like sorting thousands of emails or scanning hundreds of X-rays — AI can do in minutes.

24/7 Availability — AI works anytime, any day. It never sleeps, never takes a holiday, never calls in sick.

Fast Decisions — AI provides quick and accurate results. In fields like stock trading or medical diagnosis, speed and accuracy can save lives and money.

Digital Assistance — AI helps users in daily tasks — from setting reminders to navigating traffic to translating languages instantly.

─────

PART E — Cons of Artificial Intelligence

High Cost — AI is expensive to develop and maintain. Building an AI system requires powerful computers, huge amounts of data, and teams of highly skilled engineers.

No Creativity — AI cannot think innovatively. It can only work within the patterns it has learned. It cannot truly invent something completely new or feel inspiration.

Human Laziness — AI can lead to over-dependence. If people rely on AI for everything, they may lose the ability to think, solve problems, and be self-sufficient on their own.

Unemployment Risk — As AI automates more jobs, some professions may disappear — particularly jobs that involve repetitive tasks.

Privacy Concerns — AI systems collect and analyse massive amounts of personal data. This raises serious questions about privacy and security.

─────

PART F — Responsible Use of Artificial Intelligence

AI is a powerful tool. Like all powerful tools, it can be used for good — or it can be misused. Responsible AI use means using it in a way that is safe, fair, and beneficial.

Three key principles of responsible AI use:

1. Do not share personal information unnecessarily — AI systems collect data. Be careful about what information you give to AI apps and platforms. Your location, habits, photos, and conversations are personal.

2. Use AI as a support tool, not a replacement — AI should help you think better, not think for you. Use it to assist your learning and work — but always apply your own judgement and understanding.

3. Report harmful or inappropriate content to elders — If you encounter AI-generated content that is wrong, harmful, misleading, or inappropriate, tell a trusted adult immediately.

The diagram in your textbook shows six pillars of Responsible AI: Explainability, Security, Reliability, Compliance, Human Design, and Fairness. Together they ensure that AI is used in a way that is transparent, safe, and fair for everyone.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Artificial Intelligence (AI) — A branch of computer science that enables machines to think, learn, and act like humans. AI performs tasks without being explicitly programmed.

Machine Learning — A method of achieving AI where machines learn from data and improve automatically without being manually programmed with rules.

Deep Learning — An advanced type of Machine Learning that uses multiple layers of artificial neurons to learn very complex patterns. Used in self-driving cars and advanced image recognition.

Speech Recognition — An AI application that converts spoken words into text. Used in voice assistants like Siri, Google Assistant, and Alexa.

Natural Language Processing (NLP) — AI that understands and generates human language. Used in chatbots, Google Translate, and virtual assistants.

Image Recognition — AI that identifies objects, faces, and text in images. Used in Face ID, fingerprint scanning, and medical imaging.

Algorithm — A set of rules or instructions that a computer follows to solve a problem or complete a task.

Automation — Using machines or AI to perform tasks that would otherwise be done by humans, especially repetitive tasks.

Responsible AI — The principle of using AI in a way that is safe, fair, transparent, and beneficial — without causing harm to people or society.

Simulation — Imitating the behaviour of something. AI simulates human intelligence — it behaves as if it is intelligent.

Rational thinking — Making decisions based on logic and data rather than emotions or instinct. One of the three key capabilities of AI.

Chatbot — An AI program that can have conversations with humans in natural language. Used on websites for customer service.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Technology must serve people, not replace them — The chapter makes an important point about responsible AI use: use AI as a support tool, not a replacement. AI is an extraordinary tool, but the human mind — with its creativity, empathy, and moral judgment — is something no machine can truly replicate. Use AI to become better at what you do. Do not let it think for you.

With great power comes great responsibility — AI can do amazing things. It can diagnose diseases, predict disasters, and help billions of people. But it can also be used to create fake news, invade privacy, or replace workers unfairly. Understanding this dual nature is essential. Every generation has the responsibility to use the most powerful technology of its time wisely and ethically.

Stay curious, stay in control — AI will continue to evolve at breathtaking speed. The students who understand how it works — not just how to use it — will be the ones who shape the future. This chapter is just the beginning. Stay curious, keep learning, and never stop asking: how does this work, and how can I use it for good?`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Artificial Intelligence (AI) is a branch of computer science that enables machines to think, learn, and act like humans. AI includes: problem-solving ability, rational thinking, and human-like behaviour.

2. Five key applications of AI: Speech Recognition (voice assistants), Image Recognition (Face ID), Natural Language Processing (chatbots), Ride-Sharing (Uber/Ola), and Household Robots (Roomba).

3. AI > Machine Learning > Deep Learning. AI is the broadest concept. Machine Learning is a method where machines learn from data. Deep Learning uses multiple neural layers to learn complex patterns (e.g. self-driving cars).

4. Pros of AI: Error-free, automates repetitive work, 24/7 availability, fast decisions, digital assistance. Cons of AI: High cost, no creativity, encourages human laziness, unemployment risk, privacy concerns.

5. Responsible AI: Do not share personal information unnecessarily. Use AI as a support tool, not a replacement. Report harmful content to elders.`,
    },
  ],
}

// ─── CHAPTER 3 ────────────────────────────────────────────────────────────────

const chapter3: Chapter = {
  id: 3,
  title: 'Introduction to HTML',
  type: 'HTML',
  estimatedReadMins: 15,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every website you have ever visited — YouTube, Google, your school website — was built using HTML. The page you are reading right now on this platform was structured using HTML.

HTML is not a programming language. It is a markup language — a way of describing the structure and content of a web page using special tags. Learning HTML is your first step into the world of web development.

This chapter introduces you to what HTML is, how it works, what the basic tags are, and how to create your very first web page. By the end, you will understand how every website in the world is built from the ground up.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter marks a shift in your ICT learning — from understanding concepts to actually building things.

HTML stands for Hyper Text Markup Language. Let us break that down:
Hyper Text — text that contains links to other texts or pages (hyperlinks)
Markup — a system of marking up (tagging) content to give it structure and meaning
Language — a set of rules for writing that both humans and computers can understand

HTML was created by Sir Tim Berners-Lee in 1991. He invented the World Wide Web — and HTML was the language he used to build it. Every web page on the internet is written in HTML at its core.

The great news: you do not need any special software to write HTML. All you need is Notepad (on Windows) and a web browser like Chrome, Firefox, or Microsoft Edge. Both of these are already on your computer.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define HTML and explain what makes it a markup language, not a programming language
• Differentiate between a web page, a website, and a web browser
• Explain what HTML tags are and identify container tags and empty tags
• List the four basic structure tags: HTML, HEAD, TITLE, BODY — and explain what each does
• Write a simple HTML page with a heading and body text
• Save an HTML file correctly with the .htm or .html extension and view it in a browser
• Use all six heading tags (H1 to H6) correctly`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `Let us learn HTML together — starting from the very beginning.

─────

PART A — What is HTML?

HTML is a language for creating web pages.

• HTML stands for Hyper Text Markup Language
• HTML is NOT a programming language — it is a markup language
• A markup language is a set of markup tags that describe the structure of content
• HTML uses these markup tags to describe web pages

The difference between a programming language and a markup language is important. A programming language (like Python or Java) gives instructions to a computer to perform calculations and make decisions. A markup language like HTML simply describes what content should look like and how it should be structured — it tells the browser: "This is a heading. This is a paragraph. This is a link."

─────

PART B — Key Definitions

Web Page — A single document on the internet written in HTML. Like one page of a book.

Website — A collection of web pages linked together, all belonging to the same organisation or person. Like a whole book made of many pages.

Web Browser — The software program that reads HTML files and displays them as web pages on your screen. Common browsers: Google Chrome, Microsoft Edge, Mozilla Firefox, and Opera.

─────

PART C — What are HTML Tags?

HTML markup tags are the most basic elements necessary to create a web page.

• HTML tags are keywords enclosed in angle brackets like <html>
• Tags tell the browser what to do with the content between them
• The first tag in a pair is known as the start/opening tag
• The second tag is known as the end/closing tag
• The closing tag has a forward slash before the keyword: </html>

Example: <b>Hello</b> — this tells the browser to display "Hello" in bold.

There are two types of tags:

Container tags — These tags have both a beginning and an end. The content goes between the two tags. The tag applies its effect to everything inside it.
Examples: <b>...</b>, <u>...</u>, <body>...</body>

Empty Tags — These tags have only an opening tag. They do not have a closing tag because they do not wrap around content — they perform an action on their own.
Examples: <img>, <br>, <li>

─────

PART D — Software Needed

You only need two things to write and view HTML:

1. A Text Editor — Notepad is a very basic text editing program which is excellent for coding because it does not interfere with what you are typing. It saves exactly what you type, with no hidden formatting. If you are using Windows, open Notepad from Start > All Programs > Accessories > Notepad.

2. A Web Browser — A browser is the program that makes it possible to browse and open websites. The most common browsers are Google Chrome, Microsoft Edge, Mozilla Firefox, and Opera.

That is all you need. No special software. No paid tools. Just Notepad and a browser.

─────

PART E — The Document Layout

In HTML, a program has a rigid (fixed) structure. Every HTML page must follow this structure:

The entire web page is enclosed within <HTML>...</HTML> tags.
Within these tags, two distinct sections are created:
— <HEAD>...</HEAD> — the header section
— <BODY>...</BODY> — the body section

The four Basic Structure Tags:

1. HTML tag — This is the most important tag of the web page. It tells the browser that everything inside it is HTML. The browser can read the HTML page because of this tag.

2. Head tag — This tag defines the header area of the page. Information in this section is NOT displayed on the page itself — it is essential to the inner working of the document (like the title, metadata, and links to stylesheets).

3. Title tag — This tag is present inside the HEAD section. It gives the title to the web page — this title appears on the browser tab at the top of the browser window.

4. Body tag — This is the main part of the HTML page. Everything that appears on the browser screen — text, images, links, tables — is placed inside the BODY tag.

─────

PART F — Your First HTML Page

Here is a complete, working HTML page:

<html>
  <head>
    <title>information and communications technology</title>
  </head>
  <body>
    Welcome to the world of internet. This is my first web page
  </body>
</html>

When you type this in Notepad and save it as a .html file, then open it in a browser — you will see "Welcome to the world of internet. This is my first web page" displayed on the screen, and "information and communications technology" in the browser tab at the top.

─────

PART G — Saving with HTM or HTML Extension

To save the HTML file, go to File > Save As. You can use either the .htm or the .html extension format to save the file.

For example: mypage.html or mypage.htm

These are the formats which the browser recognises when you view it on different web browsers. If you save it as .txt, the browser will not recognise it as a web page.

─────

PART H — Heading Tags

Heading tags are used to display text slightly bigger and bolder than normal text.

HTML supports six different levels of headings:
<h1> — the biggest heading (used for main page titles)
<h2> — the second biggest
<h3> — medium
<h4> — slightly smaller
<h5> — small
<h6> — the smallest heading

All heading styles appear in Bold. Heading tags must be used in pairs (opening and closing).

Example: <h1>This is a Heading</h1>

Think of it like the headings in a newspaper — the main story has the biggest headline, the smaller stories have smaller headings. H1 is the front page headline; H6 is the smallest caption.

The output shows headings getting progressively smaller from H1 to H6 — all in bold.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `HTML — Hyper Text Markup Language. The language used to create web pages. It is a markup language, not a programming language.

Markup Language — A language that uses tags to describe the structure and appearance of content. HTML is a markup language.

Web Page — A single document on the internet written in HTML.

Website — A collection of web pages linked together, all belonging to the same organisation or person.

Web Browser — The software that reads HTML files and displays them as web pages. Examples: Chrome, Firefox, Edge, Opera.

HTML Tag — A keyword enclosed in angle brackets (< >) that gives instructions to the browser about how to display content.

Container Tag — An HTML tag that has both an opening and a closing tag. Content goes between them. Example: <b>bold text</b>.

Empty Tag — An HTML tag that has only an opening tag. No content goes inside. Example: <br>, <img>.

Opening Tag — The first tag in a pair. Example: <body>.

Closing Tag — The second tag in a pair. Has a forward slash before the keyword. Example: </body>.

Head Tag — Defines the header section of an HTML page. Content here is not shown on screen — it provides information about the document.

Body Tag — The main section of an HTML page. Everything visible on screen is placed inside the body tag.

Title Tag — Placed inside the head section. Gives the web page its title — shown on the browser tab.

Heading Tags — HTML tags from h1 to h6 that display text in bold at different sizes. H1 is the largest, H6 is the smallest.

Notepad — A simple text editor on Windows computers that is ideal for writing HTML because it saves exactly what you type with no hidden formatting.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Start simple, build from there — HTML is one of the simplest languages you can learn. A basic HTML page has just four tags — html, head, title, body. And from just those four tags, you can build something real that works in any browser in the world. This is a powerful lesson: every complex thing — every great website, every app — started with simple fundamentals. Master the basics first.

Creativity has no barriers — To build a website, you do not need expensive equipment or fancy software. Just Notepad and a browser — both free and already on your computer. This means that web development is accessible to everyone. Your ideas are the only real requirement.

Precision matters in coding — When you write HTML, every tag must be opened and closed correctly. One missing bracket or one misspelled tag can break your page. This teaches an important habit: attention to detail. In coding — and in life — the small things matter enormously.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. HTML stands for Hyper Text Markup Language. It is a markup language (not a programming language) used to create web pages. A web browser reads HTML and displays it as a web page.

2. HTML Tags are keywords in angle brackets < >. They come in pairs: opening tag <tag> and closing tag </tag>. Container tags wrap content; Empty tags stand alone (like <br> and <img>).

3. The four basic structure tags every HTML page needs: <html> (tells the browser it's HTML), <head> (header info, not shown), <title> (shows in browser tab), <body> (all visible content goes here).

4. To write HTML: open Notepad, type your code, save with .htm or .html extension, then open in a browser. That is all you need.

5. Heading tags go from <h1> (biggest) to <h6> (smallest). All are displayed in bold. They must be used in pairs — <h1>text</h1>.`,
    },
  ],
}

// ─── CHAPTER 4 ────────────────────────────────────────────────────────────────

const chapter4: Chapter = {
  id: 4,
  title: 'HTML — Formatting a Web Page',
  type: 'HTML',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `In the previous chapter, you created your first HTML page. But it was pretty plain — just plain text on a white background. In this chapter, we take it to the next level.

You will learn how to make text bold, italic, underlined, and centred. You will learn how to add colour to your page background, change the font, make text scroll across the screen, and create ordered and unordered lists.

By the end of this chapter, you will be able to format a web page to look the way you want — with colour, style, and structure. This is where HTML starts to get exciting.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter builds directly on Chapter 3. Now that you understand the basic structure of an HTML page (html, head, title, body), you will learn the tags that go inside the body to format your content.

Formatting means changing how content looks — making it bigger, bolder, coloured, centred, or structured as a list. In the early days of the web, all formatting was done directly in HTML using tags and attributes. Today, much of this is done using CSS (Cascading Style Sheets), but understanding HTML formatting is the essential foundation.

The tags in this chapter are very widely used and will appear in every website you ever build or read about. Learn them well.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Use text formatting tags: bold, italic, centre, and underline
• Use subscript and superscript tags for chemical formulas and mathematical equations
• Use the strikethrough tag
• Understand what attributes are and how to use them in HTML tags
• Change the background colour of a web page using the BGCOLOR attribute
• Use the MARQUEE tag to create scrolling text
• Use the BR tag for line breaks
• Use the FONT tag to change size, face, and colour of text
• Create ordered lists and unordered lists using OL, UL, and LI tags`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 660,
      content: `Let us learn all the formatting tags together — with clear examples for each.

─────

PART A — HTML Text Formatting Tags

These four tags are the most basic and most used formatting tags in HTML:

<b> — Defines bold text
Makes text appear thicker and heavier. Used for important words or headings.
Example: <b>Welcome to my html page</b>

<i> — Defines italic text
Makes text appear slanted to the right. Used for titles of books, foreign words, or emphasis.
Example: <i>I am learning HTML</i>

<center> — Defines centred content
Centres the content horizontally on the page.
Example: <center>This text is in the middle</center>

<u> — Defines underlined text
Draws a line under the text. Used for links traditionally, or for emphasis.
Example: <u>Learning HTML is fun</u>

Complete Example:
<html>
<head>
  <title>HTML Page</title>
</head>
<body>
  <h1>My HTML page</h1>
  <br>
  <b>Welcome to my html page</b>
  <br>
  <i>I am learning HTML</i>
  <br>
  <u>Learning HTML is fun</u>
</body>
</html>

─────

PART B — Subscript and Superscript

Subscript (<sub>):
The <sub> tag defines subscript text. Subscript text appears half a character BELOW the normal line.
Used for: chemical formulas like H₂O, CO₂

Example: H₂O is written as: H<sub>2</sub>O
Example: CO₂ is written as: CO<sub>2</sub>O

Superscript (<sup>):
The <sup> tag defines superscript text. Superscript text appears half a character ABOVE the normal line.
Used for: mathematical equations like 4³ + 3²

Example: 4³ + 3² is written as: 4<sup>3</sup> + 3<sup>2</sup>

─────

PART C — Strikethrough <s>

The <s> tag draws a horizontal line through the middle of the text. Used for showing crossed-out or cancelled text.

Example: Discount Sale!! New price is <s>₹100</s> ₹50
This displays as: Discount Sale!! New price is ~~₹100~~ ₹50

Commonly used in online shopping to show the original price crossed out with the new price beside it.

─────

PART D — What are Attributes?

Attributes are keywords that provide additional information about HTML Tags.

Rules for attributes:
• A tag may have several attributes
• Each attribute is followed by = sign and then the attribute value
• The value is usually in quotation marks
• Different attributes in the same tag are separated by a space

Example: <font face="Comic Sans MS" color="red" size=5>

In this example, "font" is the tag, and "face", "color" and "size" are attributes with their values.

Think of attributes as settings for a tag. If the tag is a lamp, the attributes are the settings — how bright, what colour, where it points.

─────

PART E — Background Colour

BGCOLOR is an attribute of the <BODY> tag. It changes the default white background colour of the page to a specified colour.

Two ways to specify colour:
1. By colour name: <body bgcolor=BLUE>
2. By hexadecimal value: <body bgcolor=#0000FF>

BGCOLOR is written directly inside the body tag:
<body bgcolor=BLUE> or <body bgcolor=#00000>

─────

PART F — Special Effects Tag — MARQUEE

The <marquee> tag makes text scroll automatically from right to left across the screen.

Example: <marquee>Welcome to my website!</marquee>

When the browser reads this, the text "Welcome to my website!" will scroll continuously from right to left — like the news ticker at the bottom of a news channel.

─────

PART G — The Break Tag <br>

The <br> tag inserts a line break into a text flow. It is used when the text needs to start from a new line.

<br> is an EMPTY tag — it has no closing tag.

Example:
Line one<br>
Line two<br>
Line three

Without <br>, all three lines would appear on the same line. With <br>, each starts on a new line.

─────

PART H — The Font Tag

The <FONT> tag is used to change the size, style and colour of text specified within the tag. It has three main attributes:

1. Size — can be specified in absolute values ranging from 1 to 7. The default size is 3.
Example: <font size=3>This is some text!</font>
Example: <font size=2>This is some text!</font>

2. Face — changes the font style (the typeface/design of the letters).
Example: <font face="verdana">This is some text!</font>

3. Color — sets the colour of the enclosed text. The colour value is expressed as a colour name or its RGB hexadecimal value.
Examples of colour names: red, green, blue, yellow, orange
Example: <font size=3 color=red>This is some text!</font>
Example: <font face="verdana" color=green>This is some text!</font>

─────

PART I — The List Tag

There are two types of lists in HTML:

1. Ordered List (<ol>)
An ordered list is used when the sequence of items matters — they are listed in a numbered or lettered format.
By default, it starts from 1. But you can change the type:
<ol type=i> or <ol type=I> — for roman numerals (i, ii, iii...)
<ol type=A> or <ol type=a> — for alphabets (A, B, C... or a, b, c...)

2. Unordered List (<ul>)
An unordered list uses bullets or symbols. By default it uses a disc (filled circle).
<ul type=circle> — open circle
<ul type=square> — square bullets

Each item in both types of lists uses the <li> tag (list item):
<li>Monday — this is an empty tag, no closing needed.

Complete List Example:
<html>
<head>
  <title>Lists</title>
</head>
<body bgcolor=olive>
Ordered List
<ol type=A>
  <li>Monday
  <li>Tuesday
  <li>Wednesday
</ol>
Unordered list
<ul type=square>
  <li>Thursday
  <li>Friday
  <li>Saturday
</ul>
</body>
</html>

Output: Monday, Tuesday, Wednesday appear as A, B, C. Thursday, Friday, Saturday appear with square bullets.

─────

PART J — Colours and Their Hexadecimal Values

Every colour on a computer screen is represented by a hexadecimal (hex) value — a 6-digit code starting with #.

Some important colours:
black = #000000 | gray = #808080 | silver = #c0c0c0 | white = #ffffff
maroon = #800000 | red = #ff0000 | purple = #800080 | fuchsia = #ff00ff
green = #008000 | lime = #00ff00 | olive = #808000 | yellow = #ffff00
navy = #000080 | blue = #0000ff | teal = #008080 | aqua = #00FFFF
orange = #ffa500`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Bold (<b>) — An HTML tag that makes text appear thicker and heavier.

Italic (<i>) — An HTML tag that makes text appear slanted. Used for emphasis or book titles.

Underline (<u>) — An HTML tag that draws a line under the text.

Centre (<center>) — An HTML tag that centres content horizontally on the page.

Subscript (<sub>) — Text that appears half a character below the normal line. Used for chemical formulas like H₂O.

Superscript (<sup>) — Text that appears half a character above the normal line. Used for mathematical equations like x².

Strikethrough (<s>) — An HTML tag that draws a horizontal line through text. Used to show cancelled or old prices.

Attribute — A keyword placed inside an HTML tag to provide additional information or settings. Written as: attribute="value".

BGCOLOR — An attribute of the <body> tag that changes the background colour of the web page.

Hexadecimal — A number system used in computers to represent colours. Colour codes start with # and have 6 digits, e.g. #ff0000 for red.

Marquee (<marquee>) — An HTML tag that makes text scroll from right to left across the screen.

Break Tag (<br>) — An empty HTML tag that creates a line break — moves the next content to a new line.

Font Tag (<font>) — An HTML tag with attributes size, face, and color used to change the appearance of text.

Ordered List (<ol>) — An HTML list where items are numbered or lettered in sequence.

Unordered List (<ul>) — An HTML list where items are marked with bullets or symbols, not numbers.

List Item (<li>) — An empty HTML tag used to define each item inside an ordered or unordered list.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Details make the difference — The difference between a plain web page and a beautiful one comes down to details: the right font, the right colour, the right spacing. The formatting tags in this chapter — bold, italic, colour, font — are what turn raw content into a polished, readable experience. This applies beyond coding: in a presentation, a letter, or a project — how you present your work matters as much as what you are presenting.

Creativity within structure — HTML gives you a set of rules (tags must be opened and closed, attributes must have values). But within those rules, you have enormous creative freedom — any colour, any font, any layout. This is a beautiful model for life: learn the rules first, then use them to express yourself.

Practice is the only way to learn coding — Reading about HTML tags is useful. But you will truly understand them only when you open Notepad and type them yourself. Make mistakes. See what breaks. Fix it. That trial-and-error process is how every developer — from beginner to expert — really learns.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The four basic text formatting tags: <b> (bold), <i> (italic), <u> (underline), <center> (centre). All are container tags — they need an opening and closing tag.

2. <sub> creates subscript text (below the line) for chemical formulas like H₂O. <sup> creates superscript text (above the line) for maths like x². <s> creates strikethrough text.

3. Attributes provide extra information to tags. They follow the format: attribute="value". BGCOLOR is an attribute of the BODY tag that sets the background colour of the page.

4. <br> is a break tag (empty — no closing tag) that creates a new line. <marquee> makes text scroll right to left. <font> has three attributes: size (1–7), face (font name), and color (colour name or hex value).

5. Lists: <ol> creates an ordered (numbered/lettered) list. <ul> creates an unordered (bullet) list. Both use <li> for each item. Type attribute changes the style: type=A (alphabets), type=i (roman numerals), type=circle or square (for bullets).`,
    },
  ],
}

// ─── CHAPTER 5 ────────────────────────────────────────────────────────────────

const chapter5: Chapter = {
  id: 5,
  title: 'Creating Tables in HTML',
  type: 'Practical',
  estimatedReadMins: 13,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Imagine a school timetable, a train schedule, or a cricket scorecard. All of these display information in rows and columns — that is a table. Tables are one of the most useful ways to organise and display data clearly.

In HTML, tables allow you to display information in a structured, grid format — with rows going across and columns going down. From simple price lists to complex data displays, tables are used on almost every website.

This chapter teaches you exactly how to create tables in HTML — how to add rows, columns, borders, spacing, and even images inside tables.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This is the final chapter of your ICT course for this term. You have come a long way — from understanding what files are, to learning about AI, to writing your first HTML page, to formatting it with colour and fonts. Now you will add one of the most important structural elements to your web pages: tables.

A table is made up of rows (going across, left to right) and columns (going down, top to bottom). In HTML, the table is defined by three key tags: <table>, <tr>, and <td>.

Once you understand tables, you can display almost any kind of data on a web page in a clear and professional way. This is a practical, hands-on chapter — the best way to learn it is to type the code yourself, save it, and see the output in your browser.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Explain what a table is and how it is structured (rows and columns)
• Use the three core table tags: <table>, <tr> (table row), and <td> (table data/column)
• Add a border to a table using the border attribute
• Understand and use Cell Padding and Cell Spacing attributes
• Use the ALIGN attribute to position a table on the page
• Insert images into a web page using the <img> tag with src, height, and width attributes`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 480,
      content: `Let us learn how to create tables in HTML together.

─────

PART A — What is a Table?

A table is made up of rows and columns.

The table tag is used in HTML to represent data in tabular form — like a timetable, event schedule, price list, scorecard, etc.

The following tags are used to create a table. All of these tags are included within the <table> </table> tags:

<tr> — Table Row. Used to insert a row (going across).
<td> — Table Data. Used to insert a column (a cell inside the row).

Think of it like a grid:
— Each row is a horizontal strip (<tr>)
— Inside each row, each cell is a column (<td>)
— The content goes inside the <td> tags

─────

PART B — Basic Table Structure

<table>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
  <tr>
    <td>February</td>
    <td>$400</td>
  </tr>
  <tr>
    <td>March</td>
    <td>$200</td>
  </tr>
  <tr>
    <td>April</td>
    <td>$500</td>
  </tr>
  <tr>
    <td>May</td>
    <td>$400</td>
  </tr>
</table>

This creates a table with 5 rows. Each row has 2 cells: the month name and the amount. The output shows a simple table with months and amounts — but with no visible borders yet.

─────

PART C — Adding a Border

We can add a border to the table by adding the border attribute to the table tag.

<table border=1>

The number after border= determines the thickness of the border in pixels.
border=1 — thin border
border=5 — thicker border

We can increase the border size by increasing the number in the border attribute.

Example with border:
<table border=1>
  <tr>
    <td>January</td>
    <td>$100</td>
  </tr>
</table>

This displays a table with a visible border around each cell and around the whole table.

─────

PART D — Cell Padding and Cell Spacing

Cell Padding — This attribute controls the distance between the data inside a cell and the boundaries (walls) of the cell. It adds space between the text and the cell border.
Example: <table border=1 cellpadding=10>

Cell Spacing — This attribute controls the spacing between adjacent cells — the gap between the borders of neighbouring cells.
Example: <table border=1 cellspacing=5>

Think of it this way:
Cell Padding = the space inside the cell (between text and wall)
Cell Spacing = the space between cells (the gap between two rooms)

─────

PART E — Table Attributes

ALIGN — Controls the horizontal alignment of the table on the page. It can be set to LEFT, RIGHT, or CENTER.
Example: <table border=1 align=CENTER>

BORDER — Controls the border to be placed around the table. The border thickness is specified in pixels.
Example: <table border=5>

─────

PART F — Complete Table Example

Here is a complete, well-formatted HTML table:

<html>
<head>
  <title>My Table</title>
</head>
<body>
  <table border=2 cellpadding=5 cellspacing=3 align=CENTER>
    <tr>
      <td>January</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>February</td>
      <td>$400</td>
    </tr>
    <tr>
      <td>March</td>
      <td>$200</td>
    </tr>
  </table>
</body>
</html>

─────

PART G — Inserting Images

We can insert images into a web page by using the <img> tag.

The <img> tag is an EMPTY tag — it has no closing tag.

The src attribute is used with the img tag to specify the path (URL) to the image file that the browser should display on the web page.

The height and width attributes help to include the image with specific dimensions (in pixels).

Example:
<html>
<head>
  <title>Inserting image</title>
</head>
<body bgcolor=aqua>
  <img src=rose.jpg height=400 width=400>
</body>
</html>

This displays a page with an aqua background and an image called "rose.jpg" displayed at 400×400 pixels.

Important: The image file (rose.jpg in this case) must be saved in the same folder as your HTML file for the browser to find it. If the image is in a different location, you need to give the full path.

─────

PART H — Putting it all Together

You now know all the building blocks of a basic web page:
• Structure: html, head, title, body
• Text formatting: b, i, u, center, sub, sup, s
• Page styling: font (size, face, color), bgcolor, marquee, br
• Lists: ol, ul, li
• Tables: table, tr, td (with border, cellpadding, cellspacing, align)
• Images: img (with src, height, width)

With just these tags, you can build a real, working web page that displays text, colours, lists, tables, and images. That is the power of HTML.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Table — A structured arrangement of data in rows and columns. Used to display information clearly and systematically.

<table> — The HTML tag that defines the beginning and end of a table. All table content goes inside this tag.

<tr> — Table Row. Defines a horizontal row inside a table. Each row contains one or more cells.

<td> — Table Data. Defines a single cell inside a table row. Content goes between <td> and </td>.

Border — An attribute of the <table> tag that adds a visible line around the table and its cells. The value determines thickness in pixels.

Cell Padding — An attribute that controls the distance between the content inside a cell and the cell's border (wall). Adds space inside the cell.

Cell Spacing — An attribute that controls the space between adjacent cells — the gap between neighbouring cell borders.

ALIGN — An attribute that controls the horizontal positioning of the table on the page: LEFT, RIGHT, or CENTER.

<img> — The HTML tag for inserting an image. It is an empty tag with no closing tag.

src — An attribute of the <img> tag. Specifies the file path or URL of the image to be displayed.

height — An attribute of the <img> tag. Specifies the height of the image in pixels.

width — An attribute of the <img> tag. Specifies the width of the image in pixels.

Pixel — The smallest unit of measurement on a computer screen. Image dimensions and borders are measured in pixels.

Tabular form — Organised in a table format with rows and columns. HTML tables display data in tabular form.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Structure makes data meaningful — Raw data by itself is hard to understand. But the same data organised in a clear table — with proper rows, columns, borders, and spacing — becomes instantly readable and useful. This applies to everything in life: the way you present information determines how well it is understood.

Build on what you know — This chapter uses everything from the previous chapters: the HTML structure from Chapter 3, the attributes from Chapter 4, and now adds tables and images. Learning is cumulative — each thing you learn builds on what came before. Never skip the basics.

You are a web developer now — From this chapter, you have everything you need to build a real, working web page with text, formatting, colour, lists, tables, and images. That is not a small thing. Most people can browse the web but very few understand how it works from the inside. You now do. That knowledge — understanding the technology you use — is the foundation of a career in technology.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. A table is made of rows and columns. The three core tags are: <table> (defines the table), <tr> (table row — horizontal), <td> (table data — a cell inside the row).

2. Add a border using the border attribute in the table tag: <table border=1>. The number is the thickness in pixels. Higher number = thicker border.

3. Cell Padding controls space INSIDE the cell (between text and cell wall). Cell Spacing controls space BETWEEN cells (gap between neighbouring cells).

4. The ALIGN attribute positions the table: LEFT, RIGHT, or CENTER. Example: <table border=1 align=CENTER>.

5. Images are inserted using the <img> tag (an empty tag). It uses three key attributes: src (the file path of the image), height (image height in pixels), width (image width in pixels). Example: <img src=photo.jpg height=300 width=300>.`,
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
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
