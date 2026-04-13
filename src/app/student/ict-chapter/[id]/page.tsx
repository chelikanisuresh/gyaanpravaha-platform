'use client'
import { getChapter } from '@/lib/ict-chapter-content'
import { getICTWordMap as getWordMap } from '@/lib/ict-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'ict',
  dashboardSection: 'ict',
  subjectLabel: 'ICT',
  chapterRoute: 'ict-chapter',
  quizRoute: 'ict-quiz',
  theme: {
    primary: '#4C1D95',
    mid: '#6D28D9',
    accent: '#A78BFA',
    heroBg: '#F5F3FF',
    tooltipBg: '#1E1B4B',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
