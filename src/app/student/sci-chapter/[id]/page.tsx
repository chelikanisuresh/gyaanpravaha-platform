'use client'
import { getChapter } from '@/lib/sci-chapter-content'
import { getSciWordMap as getWordMap } from '@/lib/sci-tooltip-words'
import GenericChapterReader, { ReaderConfig } from '@/components/GenericChapterReader'

const CONFIG: ReaderConfig = {
  subject: 'science',
  dashboardSection: 'science',
  subjectLabel: 'Science',
  chapterRoute: 'sci-chapter',
  quizRoute: 'sci-quiz',
  theme: {
    primary: '#0F766E',
    mid: '#0D9488',
    accent: '#5EEAD4',
    heroBg: '#F0FDFA',
    tooltipBg: '#042F2E',
  },
  getChapterFn: getChapter,
  getWordMapFn: getWordMap,
}

export default function ChapterReaderPage() {
  return <GenericChapterReader config={CONFIG}/>
}
