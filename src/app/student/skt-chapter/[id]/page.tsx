'use client'
import { getChapter } from '@/lib/skt-chapter-content'
import { getSktWordMap as getWordMap } from '@/lib/skt-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'sanskrit',
  dashboardSection: 'sanskrit',
  subjectLabel: 'Sanskrit',
  chapterRoute: 'skt-chapter',
  quizRoute: 'skt-quiz',
  theme: {
    primary: '#713F12',
    mid: '#92400E',
    accent: '#FCD34D',
    heroBg: '#FFFBEB',
    tooltipBg: '#451A03',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
