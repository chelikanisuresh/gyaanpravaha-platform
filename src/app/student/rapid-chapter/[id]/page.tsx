'use client'
import { getRapidChapter } from '@/lib/rapid-chapter-index'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject:          'rapid',
  dashboardSection: 'rapid',
  subjectLabel:     'Rapid Reader',
  chapterRoute:     'rapid-chapter',
  quizRoute:        'rapid-quiz',
  theme: {
    primary:   '#7C3AED',
    mid:       '#6D28D9',
    accent:    '#DDD6FE',
    heroBg:    '#F5F3FF',
    tooltipBg: '#4C1D95',
  },
  getChapterFn: getRapidChapter,
  getWordMapFn: () => ({}),
}

export default function RapidChapterPage() {
  return <GenericChapterReader config={CONFIG}/>
}
