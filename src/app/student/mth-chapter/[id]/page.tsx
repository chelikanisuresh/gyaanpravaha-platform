'use client'
import { getChapter } from '@/lib/mth-chapter-content'
import { getMthWordMap as getWordMap } from '@/lib/mth-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'maths',
  dashboardSection: 'maths',
  subjectLabel: 'Mathematics',
  chapterRoute: 'mth-chapter',
  quizRoute: 'mth-quiz',
  theme: {
    primary: '#1E3A8A',
    mid: '#1D4ED8',
    accent: '#93C5FD',
    heroBg: '#EFF6FF',
    tooltipBg: '#1E1B4B',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
