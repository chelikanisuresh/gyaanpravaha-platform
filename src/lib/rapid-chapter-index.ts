// Lightweight index — imports one chapter at a time, not all 19 at once
import CH1  from './rapid-chapters/ch-1'
import CH2  from './rapid-chapters/ch-2'
import CH3  from './rapid-chapters/ch-3'
import CH4  from './rapid-chapters/ch-4'
import CH5  from './rapid-chapters/ch-5'
import CH6  from './rapid-chapters/ch-6'
import CH7  from './rapid-chapters/ch-7'
import CH8  from './rapid-chapters/ch-8'
import CH9  from './rapid-chapters/ch-9'
import CH10 from './rapid-chapters/ch-10'
import CH11 from './rapid-chapters/ch-11'
import CH12 from './rapid-chapters/ch-12'
import CH13 from './rapid-chapters/ch-13'
import CH14 from './rapid-chapters/ch-14'
import CH15 from './rapid-chapters/ch-15'
import CH16 from './rapid-chapters/ch-16'
import CH17 from './rapid-chapters/ch-17'
import CH18 from './rapid-chapters/ch-18'
import CH19 from './rapid-chapters/ch-19'

const ALL = [CH1,CH2,CH3,CH4,CH5,CH6,CH7,CH8,CH9,CH10,CH11,CH12,CH13,CH14,CH15,CH16,CH17,CH18,CH19]

export function getRapidChapter(id: number) {
  return ALL.find(c => c.id === id) ?? null
}

export const RAPID_CHAPTERS = ALL
