'use client'
import { getHCQuiz } from '@/lib/hc-quiz-content'
import { getChapter } from '@/lib/hc-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'history-civics',
  dashboardSection: 'history',
  subjectLabel: 'History & Civics',
  chapterRoute: 'hc-chapter',
  theme: {
    primary: '#78350F',
    mid: '#92400E',
    accent: '#FBBF24',
    heroBg: '#FFFBEB',
  },
  getQuizFn: getHCQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
