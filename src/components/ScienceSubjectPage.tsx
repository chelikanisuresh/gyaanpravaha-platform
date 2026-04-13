'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1, title:'Magnetism',                       type:'Physics',   emoji:'🧲', estimatedReadMins:16 },
  { id:2, title:'Simple Machines',                 type:'Physics',   emoji:'⚙️', estimatedReadMins:16 },
  { id:3, title:'Work and Energy',                 type:'Physics',   emoji:'⚡', estimatedReadMins:16 },
  { id:4, title:'Introduction to Chemistry',       type:'Chemistry', emoji:'🧪', estimatedReadMins:10 },
  { id:5, title:'Structure of Atom',               type:'Chemistry', emoji:'⚛️', estimatedReadMins:14 },
  { id:6, title:'Physical and Chemical Changes',   type:'Chemistry', emoji:'🔬', estimatedReadMins:14 },
  { id:7, title:'Cell – The Basic Unit of Life',   type:'Biology',   emoji:'🦠', estimatedReadMins:14 },
  { id:8, title:'The Leaf',                        type:'Biology',   emoji:'🌿', estimatedReadMins:12 },
  { id:9, title:'Human Body: Respiratory System',  type:'Biology',   emoji:'🫁', estimatedReadMins:12 },
]

const THEME: SubjectTheme = {
  title:'Science', emoji:'🔬', subject:'science', bookSeries:'Science',
  description:'Physics, Chemistry and Biology — understanding the natural world through observation and inquiry.',
  chapterRoute:'sci-chapter', quizRoute:'sci-quiz',
  heroBg:'linear-gradient(135deg,#F0FDFA 0%,#CCFBF1 60%,#99F6E4 100%)',
  heroBorder:'#5EEAD4', primaryDark:'#0F766E', primaryMid:'#0D9488', primaryLight:'#F0FDFA',
  accentColor:'#5EEAD4',
  counterBg:'#CCFBF1', counterText:'#0F766E', counterSub:'#0D9488',
  scoreBg:'#FEF3C7', scoreText:'#92400E', scoreSub:'#F59E0B',
  progressColor:'#0D9488',
  typeColors:{
    'Physics':   { bg:'#CCFBF1', text:'#0F766E', border:'#5EEAD4', emoji:'⚡', desc:'Forces, energy, machines and magnetism' },
    'Chemistry': { bg:'#FDF4FF', text:'#7E22CE', border:'#E9D5FF', emoji:'🧪', desc:'Atoms, elements and chemical changes'   },
    'Biology':   { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'🌿', desc:'Cells, plants and the human body'       },
  },
  tips:[
    'Draw and label diagrams — a labelled diagram often replaces a full paragraph answer.',
    'Learn definitions exactly as given. Science marks depend on precise wording.',
    'For Biology, understand the function of each part — not just the name.',
    'In Chemistry, remember: elements combine in fixed ratios. Always show the formula.',
  ],
  floatEmojis:['⚛️','🧪','🌿'],
}

export default function ScienceSubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
