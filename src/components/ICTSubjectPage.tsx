'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1, title:'File Management — Organization of Data', type:'Concepts',  emoji:'📁', estimatedReadMins:12 },
  { id:2, title:'Artificial Intelligence',                type:'AI',        emoji:'🤖', estimatedReadMins:14 },
  { id:3, title:'Introduction to HTML',                   type:'HTML',      emoji:'🌐', estimatedReadMins:15 },
  { id:4, title:'HTML — Formatting a Web Page',           type:'HTML',      emoji:'🎨', estimatedReadMins:16 },
  { id:5, title:'Creating Tables in HTML',                type:'Practical', emoji:'📊', estimatedReadMins:13 },
]

const THEME: SubjectTheme = {
  title:'ICT', emoji:'💻', subject:'ict', bookSeries:'Maharashtra State Board · Class 6',
  description:'File management, Artificial Intelligence and HTML — learning to work with computers and the web.',
  chapterRoute:'ict-chapter', quizRoute:'ict-quiz',
  heroBg:'linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 60%,#DDD6FE 100%)',
  heroBorder:'#C4B5FD', primaryDark:'#4C1D95', primaryMid:'#6D28D9', primaryLight:'#F5F3FF',
  accentColor:'#A78BFA',
  counterBg:'#EDE9FE', counterText:'#4C1D95', counterSub:'#7C3AED',
  scoreBg:'#FEF3C7', scoreText:'#92400E', scoreSub:'#F59E0B',
  progressColor:'#6D28D9',
  typeColors:{
    'Concepts': { bg:'#EDE9FE', text:'#4C1D95', border:'#C4B5FD', emoji:'💡', desc:'Core ideas: files, folders and data'   },
    'AI':       { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'🤖', desc:'Artificial Intelligence — the basics'  },
    'HTML':     { bg:'#EFF6FF', text:'#1E3A8A', border:'#BFDBFE', emoji:'🌐', desc:'Building web pages with HTML tags'    },
    'Practical':{ bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA', emoji:'⌨️', desc:'Hands-on HTML — tables and structure' },
  },
  tips:[
    'For HTML, always type out the tags yourself — reading is not enough, practise matters.',
    'Remember: every opening tag like <table> must have a closing tag </table>.',
    'Learn the difference between hardware and software — it comes up in every exam.',
    'For AI questions, focus on real-life examples — examiners love practical applications.',
  ],
  floatEmojis:['💻','🌐','🤖'],
}

export default function ICTSubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
