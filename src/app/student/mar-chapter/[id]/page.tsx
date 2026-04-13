'use client'
import { getMarChapter } from '@/lib/mar-chapter-content'
import { getMarWordMap } from '@/lib/mar-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'marathi',
  dashboardSection: 'marathi',
  subjectLabel: 'मराठी',
  chapterRoute: 'mar-chapter',
  quizRoute: 'mar-quiz',
  theme: {
    primary: '#701A75',
    mid: '#86198F',
    accent: '#E879F9',
    heroBg: '#FDF4FF',
    tooltipBg: '#3B0764',
  },
  getChapterFn: (id: number) => {
    const ch = getMarChapter(id)
    if (!ch) return undefined
    return { ...ch, title: ch.titleMarathi }
  },
  getWordMapFn: getMarWordMap,
}

export default function MarChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
