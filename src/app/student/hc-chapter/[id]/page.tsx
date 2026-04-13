'use client'
import { getChapter } from '@/lib/hc-chapter-content'
import { getHCWordMap as getWordMap } from '@/lib/hc-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'history-civics',
  dashboardSection: 'history',
  subjectLabel: 'History & Civics',
  chapterRoute: 'hc-chapter',
  quizRoute: 'hc-quiz',
  theme: {
    primary: '#78350F',
    mid: '#92400E',
    accent: '#FBBF24',
    heroBg: '#FFFBEB',
    tooltipBg: '#431407',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
