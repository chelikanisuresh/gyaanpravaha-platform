'use client'
import { getGeoQuiz } from '@/lib/geo-quiz-content'
import { getChapter } from '@/lib/geo-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'geography',
  dashboardSection: 'geo',
  subjectLabel: 'Geography',
  chapterRoute: 'geo-chapter',
  theme: {
    primary: '#075985',
    mid: '#0369A1',
    accent: '#7DD3FC',
    heroBg: '#F0F9FF',
  },
  getQuizFn: getGeoQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
