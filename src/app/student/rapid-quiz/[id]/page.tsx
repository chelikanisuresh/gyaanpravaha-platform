'use client'

import { useParams } from 'next/navigation'
import GenericQuizPage, { QuizConfig } from '@/components/GenericQuizPage'
import { getRapidQuiz } from '@/lib/rapid-quiz-content'
import { getRapidChapter } from '@/lib/rapid-chapter-content'

const CONFIG: QuizConfig = {
  subject:          'rapid-reader',
  dashboardSection: 'rapid',
  subjectLabel:     'Rapid Reader',
  chapterRoute:     'rapid-chapter',
  theme: {
    primary:  '#7C3AED',
    mid:      '#6D28D9',
    accent:   '#DDD6FE',
    heroBg:   '#F5F3FF',
  },
  getQuizFn:    (id: number) => {
    const q = getRapidQuiz(id)
    if (!q) return null
    return { id, totalMarks: q.totalMarks, questions: q.questions }
  },
  getChapterFn: (id: number) => {
    const ch = getRapidChapter(id)
    return ch ? { id: ch.id, title: ch.title } : null
  },
}

export default function RapidQuizPage() {
  const params = useParams()
  return <GenericQuizPage config={CONFIG}/>
}
