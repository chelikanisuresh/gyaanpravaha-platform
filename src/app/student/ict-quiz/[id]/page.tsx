'use client'
import { getICTQuiz } from '@/lib/ict-quiz-content'
import { getChapter } from '@/lib/ict-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'ict',
  dashboardSection: 'ict',
  subjectLabel: 'ICT',
  chapterRoute: 'ict-chapter',
  theme: {
    primary: '#4C1D95',
    mid: '#6D28D9',
    accent: '#A78BFA',
    heroBg: '#F5F3FF',
  },
  getQuizFn: getICTQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
