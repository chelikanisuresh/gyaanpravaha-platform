// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MathsSubjectPage.tsx
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1,  title:'Whole Numbers',             type:'Numbers',     emoji:'🔢', estimatedReadMins:14 },
  { id:2,  title:'H.C.F. and L.C.M.',         type:'Numbers',     emoji:'➗', estimatedReadMins:16 },
  { id:3,  title:'Area and Perimeter',         type:'Measurement', emoji:'📐', estimatedReadMins:12 },
  { id:4,  title:'Volume',                     type:'Measurement', emoji:'📦', estimatedReadMins:12 },
  { id:5,  title:'Fractions',                  type:'Numbers',     emoji:'½',  estimatedReadMins:14 },
  { id:6,  title:'Percentage',                 type:'Numbers',     emoji:'💯', estimatedReadMins:12 },
  { id:7,  title:'Ratio and Proportion',       type:'Numbers',     emoji:'⚖️', estimatedReadMins:12 },
  { id:8,  title:'Basic Geometrical Concepts', type:'Geometry',    emoji:'📏', estimatedReadMins:10 },
  { id:9,  title:'Angles',                     type:'Geometry',    emoji:'📐', estimatedReadMins:12 },
  { id:10, title:'Circles',                    type:'Geometry',    emoji:'⭕', estimatedReadMins:10 },
  { id:11, title:'Vedic Knowledge',            type:'Vedic Maths', emoji:'🕉️', estimatedReadMins:10 },
]

const THEME: SubjectTheme = {
  title:'Mathematics', emoji:'📐', subject:'maths', bookSeries:'Mathematics',
  description:'Numbers, measurement, geometry and Vedic mathematics — building logical thinking step by step.',
  chapterRoute:'mth-chapter', quizRoute:'mth-quiz',
  heroBg:'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 60%,#BFDBFE 100%)',
  heroBorder:'#BFDBFE', primaryDark:'#1E3A8A', primaryMid:'#1D4ED8', primaryLight:'#EFF6FF',
  accentColor:'#93C5FD',
  counterBg:'#DBEAFE', counterText:'#1E3A8A', counterSub:'#3B82F6',
  scoreBg:'#FEF3C7', scoreText:'#92400E', scoreSub:'#F59E0B',
  progressColor:'#1D4ED8',
  typeColors:{
    'Numbers':    { bg:'#DBEAFE', text:'#1E3A8A', border:'#BFDBFE', emoji:'🔢', desc:'Whole numbers, fractions, ratios, percentages' },
    'Measurement':{ bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'📐', desc:'Area, perimeter, volume calculations'          },
    'Geometry':   { bg:'#FDF4FF', text:'#7E22CE', border:'#E9D5FF', emoji:'📏', desc:'Shapes, angles, circles and concepts'          },
    'Vedic Maths':{ bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA', emoji:'🕉️', desc:'Ancient Indian mathematical techniques'       },
  },
  tips:[
    'Show every step of your working — even if the answer is wrong, steps earn marks.',
    'Draw diagrams for geometry problems. A clear diagram often reveals the solution.',
    'For word problems, underline the key numbers and what is being asked first.',
    'Practice multiplication tables daily — speed in tables saves time in exams.',
  ],
  floatEmojis:['📐','➗','⭕'],
}

export default function MathsSubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
