'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'
import { getAllMarChapters } from '@/lib/mar-chapter-content'

const THEME: SubjectTheme = {
  title:'मराठी', nativeTitle:'Marathi', emoji:'📝', subject:'marathi', bookSeries:'सुलभभारती · इयत्ता सहावी',
  description:'गद्य, कविता, गाणे आणि एकांकिका — मराठी भाषेचा आनंद घेऊया आणि साहित्याशी मैत्री करूया.',
  chapterRoute:'mar-chapter', quizRoute:'mar-quiz',
  heroBg:'linear-gradient(135deg,#FDF4FF 0%,#FAE8FF 60%,#F0ABFC 30%)',
  heroBorder:'#E879F9', primaryDark:'#701A75', primaryMid:'#86198F', primaryLight:'#FDF4FF',
  accentColor:'#E879F9',
  counterBg:'#FAE8FF', counterText:'#701A75', counterSub:'#A21CAF',
  scoreBg:'#FEF3C7', scoreText:'#92400E', scoreSub:'#F59E0B',
  progressColor:'#86198F',
  typeColors:{
    'गद्य':     { bg:'#FEF3C7', text:'#92400E', border:'#FDE68A', emoji:'📄', desc:'गोष्टी आणि माहितीपर लेखन'  },
    'कविता':    { bg:'#FAE8FF', text:'#701A75', border:'#E879F9', emoji:'🎭', desc:'यमक आणि छंदबद्ध कविता'     },
    'गाणे':     { bg:'#DBEAFE', text:'#1E3A8A', border:'#BFDBFE', emoji:'🎵', desc:'तालासुरात गायल्या जाणाऱ्या रचना' },
    'एकांकिका': { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'🎬', desc:'संवादात्मक एकांकी नाटिका'   },
  },
  tips:[
    'कविता मोठ्याने म्हणा — तालसुरात वाचल्यावर लक्षात राहते.',
    'शब्दार्थ लिहून काढा — परीक्षेत शब्दांचे अर्थ नेहमी येतात.',
    'प्रत्येक पाठाचा सारांश तीन-चार वाक्यात सांगण्याचा सराव करा.',
    'स्वाध्यायातील प्रश्न स्वतः उत्तरे देऊन सोडवा — नंतर तपासा.',
  ],
  floatEmojis:['📝','🎭','🎵'],
}

export default function MarathiSubjectPage({ studentId }: { studentId: string }) {
  const chapters = getAllMarChapters().map(ch => ({
    id: ch.id,
    title: ch.titleMarathi,
    type: ch.type,
    emoji: ch.type === 'कविता' ? '🎭' : ch.type === 'गाणे' ? '🎵' : ch.type === 'एकांकिका' ? '🎬' : '📄',
    estimatedReadMins: ch.estimatedReadMins,
  }))
  return <GenericSubjectPage chapters={chapters} theme={THEME} studentId={studentId}/>
}
