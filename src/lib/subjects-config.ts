// ── Single source of truth for all subjects on the platform ──────────────────
// When adding a new subject: add it here. Everything else updates automatically.

export interface SubjectConfig {
  id:       string
  label:    string
  emoji:    string
  color:    string
  accent:   string
  light:    string
  dark:     string
  total:    number   // total chapters
  route:    string   // chapter route prefix  e.g. 'mth-chapter'
  quizRoute:string   // quiz route prefix     e.g. 'mth-quiz'
}

export const PLATFORM_SUBJECTS: SubjectConfig[] = [
  { id:'english',       label:'English',       emoji:'📖', color:'#1B4332', accent:'#52B788', light:'#D8F3DC', dark:'#081C15', total:8,  route:'chapter',       quizRoute:'quiz'         },
  { id:'maths',         label:'Mathematics',   emoji:'📐', color:'#1E3A8A', accent:'#60A5FA', light:'#DBEAFE', dark:'#0F1E4A', total:11, route:'mth-chapter',   quizRoute:'mth-quiz'     },
  { id:'science',       label:'Science',       emoji:'🔬', color:'#134E4A', accent:'#2DD4BF', light:'#CCFBF1', dark:'#042F2E', total:9,  route:'sci-chapter',   quizRoute:'sci-quiz'     },
  { id:'history',       label:'History',       emoji:'🏛️', color:'#7C2D12', accent:'#FB923C', light:'#FFEDD5', dark:'#431407', total:6,  route:'hc-chapter',    quizRoute:'hc-quiz'      },
  { id:'geo',           label:'Geography',     emoji:'🌍', color:'#1E40AF', accent:'#818CF8', light:'#EEF2FF', dark:'#0F172A', total:7,  route:'geo-chapter',   quizRoute:'geo-quiz'     },
  { id:'sanskrit',      label:'Sanskrit',      emoji:'🕉️', color:'#92400E', accent:'#FBBF24', light:'#FEF3C7', dark:'#451A03', total:8,  route:'skt-chapter',   quizRoute:'skt-quiz'     },
  { id:'ict',           label:'ICT',           emoji:'💻', color:'#312E81', accent:'#A78BFA', light:'#EDE9FE', dark:'#1E1B4B', total:5,  route:'ict-chapter',   quizRoute:'ict-quiz'     },
  { id:'marathi',       label:'मराठी',         emoji:'📝', color:'#701A75', accent:'#E879F9', light:'#FDF4FF', dark:'#3B0764', total:17, route:'mar-chapter',   quizRoute:'mar-quiz'     },
  { id:'rapid',         label:'Rapid Reader',  emoji:'📗', color:'#7C3AED', accent:'#DDD6FE', light:'#F5F3FF', dark:'#4C1D95', total:19, route:'rapid-chapter', quizRoute:'rapid-quiz'   },
]

export const TOTAL_CHAPTERS  = PLATFORM_SUBJECTS.reduce((sum, s) => sum + s.total, 0)
export const TOTAL_SECTIONS  = TOTAL_CHAPTERS * 7
export const SUBJECT_COUNT   = PLATFORM_SUBJECTS.length
