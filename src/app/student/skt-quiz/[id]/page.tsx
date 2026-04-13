'use client'
import { getSktQuiz } from '@/lib/skt-quiz-content'
import { getChapter } from '@/lib/skt-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'sanskrit',
  dashboardSection: 'sanskrit',
  subjectLabel: 'Sanskrit',
  chapterRoute: 'skt-chapter',
  theme: {
    primary: '#713F12',
    mid: '#92400E',
    accent: '#FCD34D',
    heroBg: '#FFFBEB',
  },
  getQuizFn: getSktQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
