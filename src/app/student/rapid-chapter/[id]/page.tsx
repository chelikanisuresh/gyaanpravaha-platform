'use client'

import { useParams, useRouter } from 'next/navigation'
import GenericChapterReader from '@/components/GenericChapterReader'
import { getRapidChapter } from '@/lib/rapid-chapter-content'

const CONFIG = {
  subject:          'rapid-reader',
  dashboardSection: 'rapid',
  subjectLabel:     'Rapid Reader',
  chapterRoute:     'rapid-chapter',
  quizRoute:        'rapid-quiz',
  theme: {
    primary:    '#7C3AED',
    mid:        '#6D28D9',
    accent:     '#DDD6FE',
    heroBg:     '#F5F3FF',
    tooltipBg:  '#4C1D95',
  },
  getChapterFn: (id: number) => {
    const ch = getRapidChapter(id)
    if (!ch) return null
    return {
      id:       ch.id,
      title:    ch.title,
      sections: ch.sections,
    }
  },
  getWordMapFn: (_id: number) => ({}),  // no vocabulary tooltips for novel reading
}

export default function RapidChapterPage() {
  const params = useParams()
  const id = Number(params.id)
  return <GenericChapterReader config={CONFIG}/>
}
