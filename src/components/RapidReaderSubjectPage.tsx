'use client'

import GenericSubjectPage, { SubjectChapter, SubjectTheme } from '@/components/GenericSubjectPage'
import { RAPID_CHAPTERS } from '@/lib/rapid-chapter-content'

const CHAPTERS: SubjectChapter[] = RAPID_CHAPTERS.map(ch => ({
  id:                ch.id,
  title:             ch.title,
  type:              ch.id <= 7 ? 'Malgudi Days' : ch.id <= 13 ? 'School & Friends' : 'Cricket & Beyond',
  emoji:             ch.id <= 3 ? '📖' : ch.id <= 7 ? '🏡' : ch.id <= 13 ? '🏏' : '🌟',
  estimatedReadMins: Math.round(ch.sections.reduce((a, s) => a + s.minReadSeconds, 0) / 60),
}))

const THEME: SubjectTheme = {
  title:       'Rapid Reader',
  emoji:       '📗',
  subject:     'rapid',
  bookSeries:  'Swami and Friends · R.K. Narayan',
  description: 'Follow Swaminathan through his adventures in Malgudi — a timeless story of friendship, school days, and growing up in colonial India.',

  chapterRoute: 'rapid-chapter',
  quizRoute:    'rapid-quiz',

  heroBg:       'linear-gradient(135deg,#F5F3FF 0%,#EDE9FE 60%,#DDD6FE 100%)',
  heroBorder:   '#DDD6FE',
  primaryDark:  '#4C1D95',
  primaryMid:   '#6D28D9',
  primaryLight: '#F5F3FF',
  accentColor:  '#A78BFA',

  counterBg:    '#EDE9FE',
  counterText:  '#4C1D95',
  counterSub:   '#7C3AED',
  scoreBg:      '#FEF3C7',
  scoreText:    '#92400E',
  scoreSub:     '#F59E0B',
  progressColor:'#7C3AED',

  typeColors: {
    'Malgudi Days':     { bg:'#F5F3FF', text:'#4C1D95', border:'#DDD6FE', emoji:'📖', desc:'Chapters 1–7 · Swami\'s early school days and first friendships' },
    'School & Friends': { bg:'#EDE9FE', text:'#6D28D9', border:'#C4B5FD', emoji:'🏏', desc:'Chapters 8–13 · Exams, cricket, and the M.C.C.'                },
    'Cricket & Beyond': { bg:'#FDF4FF', text:'#7E22CE', border:'#E9D5FF', emoji:'🌟', desc:'Chapters 14–19 · The big match and bittersweet farewells'       },
  },

  tips: [
    'Read each section slowly — R.K. Narayan packs a lot of humour into every paragraph.',
    'Notice how Swaminathan\'s relationships with adults and friends change throughout the story.',
    'Look out for descriptions of Malgudi — the town feels like a real place.',
    'For the quiz, focus on character names, key events, and the vocabulary questions.',
  ],

  floatEmojis: ['📗','🏏','🌴'],
}

export default function RapidReaderSubjectPage({ studentId }: { studentId?: string }) {
  return <GenericSubjectPage chapters={CHAPTERS} theme={THEME} studentId={studentId ?? ''}/>
}
