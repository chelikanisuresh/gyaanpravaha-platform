'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1, title:'The Vedas — Our Sacred Heritage',                type:'History', emoji:'📜', estimatedReadMins:18 },
  { id:2, title:'Essence of Hinduism',                            type:'History', emoji:'🕉️', estimatedReadMins:16 },
  { id:3, title:'The Great Preachers',                            type:'History', emoji:'🙏', estimatedReadMins:20 },
  { id:4, title:'The Preamble',                                   type:'Civics',  emoji:'⚖️', estimatedReadMins:15 },
  { id:5, title:'India Lives in Villages (Rural Administration)', type:'Civics',  emoji:'🏡', estimatedReadMins:14 },
  { id:6, title:'The Power of Determination',                     type:'Values',  emoji:'💪', estimatedReadMins:10 },
]

const THEME: SubjectTheme = {
  title:'History & Civics', emoji:'🏛️', subject:'history-civics', bookSeries:'History & Civics',
  description:'Ancient Indian heritage, great thinkers, the Indian Constitution and how our democracy works.',
  chapterRoute:'hc-chapter', quizRoute:'hc-quiz',
  heroBg:'linear-gradient(135deg,#FFFBEB 0%,#FEF3C7 60%,#FDE68A 100%)',
  heroBorder:'#FDE68A', primaryDark:'#78350F', primaryMid:'#92400E', primaryLight:'#FFFBEB',
  accentColor:'#FBBF24',
  counterBg:'#FEF3C7', counterText:'#78350F', counterSub:'#B45309',
  scoreBg:'#F0FDF4', scoreText:'#166534', scoreSub:'#16A34A',
  progressColor:'#92400E',
  typeColors:{
    'History':{ bg:'#FEF3C7', text:'#78350F', border:'#FDE68A', emoji:'📜', desc:'Ancient India, Vedas and great preachers' },
    'Civics': { bg:'#DBEAFE', text:'#1E3A8A', border:'#BFDBFE', emoji:'⚖️', desc:'Constitution, Preamble and governance'   },
    'Values': { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'💪', desc:'Inspirational lessons and moral values'  },
  },
  tips:[
    'For History, always connect events to their cause and effect — not just the date.',
    'Learn the Preamble by heart — questions often ask you to fill in specific words.',
    'For Civics, understand the role and function of each institution, not just its name.',
    'Great preachers — remember their key teachings, not just their names and places.',
  ],
  floatEmojis:['📜','🕉️','⚖️'],
}

export default function HistoryCivicsSubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
