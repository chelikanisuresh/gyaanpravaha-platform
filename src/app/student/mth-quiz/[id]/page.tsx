'use client'
import { getMthQuiz } from '@/lib/mth-quiz-content'
import { getChapter } from '@/lib/mth-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'maths',
  dashboardSection: 'maths',
  subjectLabel: 'Mathematics',
  chapterRoute: 'mth-chapter',
  theme: {
    primary: '#1E3A8A',
    mid: '#1D4ED8',
    accent: '#93C5FD',
    heroBg: '#EFF6FF',
  },
  getQuizFn: getMthQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
