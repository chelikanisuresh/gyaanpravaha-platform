'use client'
import { getSciQuiz } from '@/lib/sci-quiz-content'
import { getChapter } from '@/lib/sci-chapter-content'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'

const CONFIG: QuizConfig = {
  subject: 'science',
  dashboardSection: 'science',
  subjectLabel: 'Science',
  chapterRoute: 'sci-chapter',
  theme: {
    primary: '#0F766E',
    mid: '#0D9488',
    accent: '#5EEAD4',
    heroBg: '#F0FDFA',
  },
  getQuizFn: getSciQuiz,
  getChapterFn: getChapter,
}

export default function QuizPage() {
  return <GenericQuizPage config={CONFIG}/>
}
