'use client'
import { getChapter } from '@/lib/geo-chapter-content'
import { getGeoWordMap as getWordMap } from '@/lib/geo-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'geography',
  dashboardSection: 'geo',
  subjectLabel: 'Geography',
  chapterRoute: 'geo-chapter',
  quizRoute: 'geo-quiz',
  theme: {
    primary: '#075985',
    mid: '#0369A1',
    accent: '#7DD3FC',
    heroBg: '#F0F9FF',
    tooltipBg: '#082F49',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
