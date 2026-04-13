'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1, title:'Our Earth in the Solar System',                  type:'Space',       emoji:'🌍', estimatedReadMins:14 },
  { id:2, title:'The Earth as a Globe — 1 (Movements)',           type:'Earth',       emoji:'🌐', estimatedReadMins:18 },
  { id:3, title:'The Earth as a Globe — 2 (Imaginary Lines)',     type:'Earth',       emoji:'📍', estimatedReadMins:16 },
  { id:4, title:'Landforms',                                       type:'Landforms',   emoji:'⛰️', estimatedReadMins:20 },
  { id:5, title:'Representation of Geographical Features',         type:'Maps',        emoji:'🗺️', estimatedReadMins:15 },
  { id:6, title:'Agriculture in India and World',                  type:'Agriculture', emoji:'🌾', estimatedReadMins:16 },
  { id:7, title:'North America',                                   type:'Continents',  emoji:'🌎', estimatedReadMins:20 },
]

const THEME: SubjectTheme = {
  title:'Geography', emoji:'🌍', subject:'geography', bookSeries:'Geography',
  description:'Our solar system, earth movements, landforms, maps and the agriculture that feeds the world.',
  chapterRoute:'geo-chapter', quizRoute:'geo-quiz',
  heroBg:'linear-gradient(135deg,#EFF6FF 0%,#DBEAFE 40%,#E0F2FE 100%)',
  heroBorder:'#BAE6FD', primaryDark:'#075985', primaryMid:'#0369A1', primaryLight:'#EFF6FF',
  accentColor:'#7DD3FC',
  counterBg:'#DBEAFE', counterText:'#075985', counterSub:'#0369A1',
  scoreBg:'#FEF3C7', scoreText:'#92400E', scoreSub:'#F59E0B',
  progressColor:'#0369A1',
  typeColors:{
    'Space':      { bg:'#F0F9FF', text:'#075985', border:'#BAE6FD', emoji:'🌌', desc:'Solar system, planets and space'       },
    'Earth':      { bg:'#DBEAFE', text:'#1E3A8A', border:'#BFDBFE', emoji:'🌐', desc:'Earth movements and imaginary lines'  },
    'Landforms':  { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'⛰️', desc:'Mountains, plains, plateaus and more' },
    'Maps':       { bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA', emoji:'🗺️', desc:'Reading and interpreting maps'        },
    'Agriculture':{ bg:'#FEFCE8', text:'#713F12', border:'#FEF08A', emoji:'🌾', desc:'Farming, crops and food production'   },
    'Continents': { bg:'#FDF4FF', text:'#7E22CE', border:'#E9D5FF', emoji:'🌎', desc:'Major continents and their features'  },
  },
  tips:[
    'Always sketch a rough map when answering geography questions — it helps you remember.',
    'Learn cardinal directions (N/S/E/W) and intermediate directions for every map question.',
    'For landform questions, visualise the shape first — then write the definition.',
    'Agriculture: link the crop to the type of soil and climate it needs.',
  ],
  floatEmojis:['🗺️','⛰️','🌐'],
}

export default function GeographySubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
