'use client'
import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'

const CHAPTERS: SubjectChapter[] = [
  { id:1, title:'Prarthana (Prayer)',                         type:'Prayer',       emoji:'🙏', estimatedReadMins:10 },
  { id:2, title:'Vivekananda (Vivekanandah)',                 type:'Prose',        emoji:'📖', estimatedReadMins:14 },
  { id:3, title:'Sanchalana Geetam (March Song)',             type:'Poetry',       emoji:'🎵', estimatedReadMins:10 },
  { id:4, title:'Sanskritabhasha Grihe Grihe (Vocabulary)',   type:'Vocabulary',   emoji:'📝', estimatedReadMins:12 },
  { id:5, title:'Sankhyah (Numbers 21–40)',                   type:'Numbers',      emoji:'🔢', estimatedReadMins:10 },
  { id:6, title:'Sandhi (Combination of Letters)',            type:'Grammar',      emoji:'🔤', estimatedReadMins:14 },
  { id:7, title:'Bhutakalah (Past Tense)',                    type:'Grammar',      emoji:'📚', estimatedReadMins:16 },
  { id:8, title:'Sambhashanam (Conversation)',                type:'Conversation', emoji:'💬', estimatedReadMins:10 },
]

const THEME: SubjectTheme = {
  title:'Sanskrit', emoji:'🕉️', subject:'sanskrit', bookSeries:'Sanskrit',
  description:'The mother of Indian languages — prayers, prose, poetry, grammar and conversation in Sanskrit.',
  chapterRoute:'skt-chapter', quizRoute:'skt-quiz',
  heroBg:'linear-gradient(135deg,#FFFBEB 0%,#FEF9C3 50%,#FEF08A 100%)',
  heroBorder:'#FDE047', primaryDark:'#713F12', primaryMid:'#92400E', primaryLight:'#FFFBEB',
  accentColor:'#FCD34D',
  counterBg:'#FEF9C3', counterText:'#713F12', counterSub:'#A16207',
  scoreBg:'#F0FDF4', scoreText:'#166534', scoreSub:'#16A34A',
  progressColor:'#92400E',
  typeColors:{
    'Prayer':      { bg:'#FEF9C3', text:'#713F12', border:'#FDE047', emoji:'🙏', desc:'श्लोक and prayers — recitation practice'        },
    'Prose':       { bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'📖', desc:'Reading and understanding Sanskrit prose'        },
    'Poetry':      { bg:'#EEF2FF', text:'#3730A3', border:'#C7D2FE', emoji:'🎵', desc:'Sanskrit poetry with rhythm and metre'          },
    'Vocabulary':  { bg:'#FDF4FF', text:'#7E22CE', border:'#E9D5FF', emoji:'📝', desc:'Common Sanskrit words used in daily life'       },
    'Numbers':     { bg:'#FFF7ED', text:'#9A3412', border:'#FED7AA', emoji:'🔢', desc:'Sanskrit numbers — संख्याः'                     },
    'Grammar':     { bg:'#F0F9FF', text:'#075985', border:'#BAE6FD', emoji:'🔤', desc:'Sandhi, verb forms and sentence structure'      },
    'Conversation':{ bg:'#F0FDF4', text:'#166534', border:'#BBF7D0', emoji:'💬', desc:'Spoken Sanskrit — simple dialogue practice'     },
  },
  tips:[
    'Read every Sanskrit lesson aloud — pronunciation and rhythm are part of the marks.',
    'Learn सन्धि rules with examples — the pattern is more important than memorising rules.',
    'For vocabulary, make flashcards with the Sanskrit word, English meaning and a sentence.',
    'Write the Numbers chapter (21–40) five times — muscle memory helps in exams.',
  ],
  floatEmojis:['🕉️','📜','🎵'],
}

export default function SanskritSubjectPage({ studentId }: { studentId: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId}/>
}
