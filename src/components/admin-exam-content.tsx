'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

const TEST_TYPES = ['Unit Test 1', 'Term Test 1', 'Unit Test 2', 'Term Test 2', 'Unit Test 3', 'Term Test 3', 'Final']

const CHAPTER_NAMES: Record<string, Record<number, string>> = {
  english: {
    1: 'Whistles and Shaving Bristles', 2: 'If I Were Lord of Tartary',
    3: 'The Fun They Had', 4: 'In Morning Dew',
    5: 'The Boy Who Outran the Wind', 6: 'The Blind Boy',
    7: 'Three Questions', 8: 'From a Railway Carriage',
  },
  maths: {
    1: 'Whole Numbers', 2: 'H.C.F. and L.C.M.', 3: 'Area and Perimeter',
    4: 'Volume', 5: 'Fractions', 6: 'Percentage', 7: 'Ratio and Proportion',
    8: 'Basic Geometrical Concepts', 9: 'Angles', 10: 'Circles', 11: 'Vedic Knowledge',
  },
  science: {
    1: 'Magnetism', 2: 'Simple Machines', 3: 'Work and Energy',
    4: 'Introduction to Chemistry', 5: 'Structure of Atom',
    6: 'Physical and Chemical Changes', 7: 'Cell – The Basic Unit of Life',
    8: 'The Leaf', 9: 'Human Body: Respiratory System',
  },
  history: {
    1: 'The Vedas — Our Sacred Heritage', 2: 'Essence of Hinduism',
    3: 'The Great Preachers', 4: 'The Preamble',
    5: 'India Lives in Villages', 6: 'The Power of Determination',
  },
  geo: {
    1: 'Our Earth in the Solar System', 2: 'The Earth as a Globe — 1 (Movements)',
    3: 'The Earth as a Globe — 2 (Imaginary Lines)', 4: 'Landforms',
    5: 'Representation of Geographical Features', 6: 'Agriculture in India and World',
    7: 'North America',
  },
  sanskrit: {
    1: 'Prarthana (Prayer)', 2: 'Vivekananda (Vivekanandah)',
    3: 'Sanchalana Geetam (March Song)', 4: 'Sanskritabhasha Grihe Grihe',
    5: 'Sankhyah (Numbers 21-40)', 6: 'Sandhi (Combination of Letters)',
    7: 'Bhutakalah (Past Tense)', 8: 'Sambhashanam (Conversation)',
  },
  ict: {
    1: 'File Management — Organization of Data', 2: 'Artificial Intelligence',
    3: 'Introduction to HTML', 4: 'HTML — Formatting a Web Page',
    5: 'Creating Tables in HTML',
  },
  marathi: {
    1: 'Bharatmata', 2: 'Majha Anubhav', 3: 'Paaus Aala! Paaus Aala!',
    4: 'Mahiti Gheuya', 5: 'Sugaraniche Gharte', 6: 'He Khare Khare Vhave',
    7: 'Udyanat Bhetlela Vidyarthi', 8: 'Kundache Sahas', 9: 'Ghar',
    10: 'Babanch Patra', 11: 'Minucha Jalpravaas', 12: 'Chandravarchi Shala',
    13: 'Mothi Aai', 14: 'Appajinche Chaturya', 15: 'Holi Aali Holi',
    16: 'Mukya Pranyachi Kaifiyat', 17: 'Panpoi',
  },
  rapid: {
    1: 'Monday Morning', 2: 'Rajam and Mani', 3: "Swami's Grandmother",
    4: 'What is a Tail?', 5: "Father's Room", 6: 'A Friend in Need',
    7: 'A New Arrival', 8: 'Before the Examinations', 9: 'School Breaks Up',
    10: "The Coachman's Son", 11: "In Father's Presence", 12: 'Broken Panes',
    13: 'The M.C.C.', 14: "Granny Shoves Her Ignorance", 15: 'Before the Match',
    16: 'Swami Disappears', 17: 'The Day of the Match', 18: 'The Return',
    19: 'Parting Present',
  },
}

const SUBJECTS = [
  { id: 'english',  label: 'English',         emoji: '📖', color: '#1B4332', chapters: 8  },
  { id: 'maths',    label: 'Mathematics',      emoji: '🔢', color: '#1E3A5F', chapters: 11 },
  { id: 'science',  label: 'Science',          emoji: '🔬', color: '#3B1F5E', chapters: 9  },
  { id: 'history',  label: 'History & Civics', emoji: '🏛️', color: '#7C2D12', chapters: 6  },
  { id: 'geo',      label: 'Geography',        emoji: '🌍', color: '#064E3B', chapters: 7  },
  { id: 'sanskrit', label: 'Sanskrit',         emoji: '🕉️', color: '#78350F', chapters: 8  },
  { id: 'ict',      label: 'ICT',              emoji: '💻', color: '#1E40AF', chapters: 5  },
  { id: 'marathi',  label: 'मराठी',            emoji: '📜', color: '#831843', chapters: 17 },
  { id: 'rapid',    label: 'Rapid Reader',     emoji: '📚', color: '#065F46', chapters: 19 },
]

interface ExamConfig {
  subject: string
  chapter_ids: number[]
  is_active: boolean
  duration_mins: number
  term: string
}

export default function ExamContent() {
  const [configs,      setConfigs]      = useState<Record<string, ExamConfig>>({})
  const [loading,      setLoading]      = useState(true)
  const [saving,       setSaving]       = useState<string | null>(null)
  const [saveSuccess,  setSaveSuccess]  = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState('Unit Test 1')
  const [expandedSubj, setExpandedSubj] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('exam_config').select('*')
      const map: Record<string, ExamConfig> = {}
      SUBJECTS.forEach(s => {
        const existing = data?.find(d => d.subject === s.id)
        map[s.id] = existing ?? { subject: s.id, chapter_ids: [], is_active: false, duration_mins: 60, term: 'Unit Test 1' }
      })
      setConfigs(map)
      if (data?.[0]?.term) setSelectedTerm(data[0].term)
      setLoading(false)
    }
    load()
  }, [])

  const toggleChapter = (subjectId: string, chapterId: number) => {
    setConfigs(prev => {
      const curr = prev[subjectId]
      const ids  = curr.chapter_ids.includes(chapterId)
        ? curr.chapter_ids.filter(id => id !== chapterId)
        : [...curr.chapter_ids, chapterId].sort((a, b) => a - b)
      return { ...prev, [subjectId]: { ...curr, chapter_ids: ids } }
    })
  }

  const saveSubject = async (subjectId: string) => {
    setSaving(subjectId)
    const supabase = createClient()
    const { error } = await supabase.from('exam_config')
      .upsert({ ...configs[subjectId], term: selectedTerm }, { onConflict: 'subject,term' })
    if (error) {
      console.error('Save error:', error)
      alert(`Save failed: ${error.message}`)
    } else {
      setSaveSuccess(subjectId)
      setTimeout(() => setSaveSuccess(null), 2000)
    }
    setSaving(null)
  }

  const toggleActive = async (subjectId: string) => {
    const newVal = !configs[subjectId].is_active
    setConfigs(prev => ({ ...prev, [subjectId]: { ...prev[subjectId], is_active: newVal } }))
    const supabase = createClient()
    await supabase.from('exam_config')
      .upsert({ ...configs[subjectId], is_active: newVal, term: selectedTerm }, { onConflict: 'subject,term' })
  }

  const activeCount = Object.values(configs).filter(c => c.is_active).length

  return (
    <div style={{ maxWidth: '960px' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1F2937', marginBottom: '4px' }}>Exam Mode</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>
            Select chapters per subject and publish. {activeCount > 0 ? `${activeCount} subject${activeCount > 1 ? 's' : ''} currently live.` : 'No subjects live.'}
          </p>
        </div>

        {/* Test type selector */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>Test type</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {TEST_TYPES.map(t => (
              <button key={t} onClick={() => setSelectedTerm(t)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: `1.5px solid ${selectedTerm === t ? '#1B4332' : '#E5E7EB'}`, background: selectedTerm === t ? '#1B4332' : 'white', color: selectedTerm === t ? 'white' : '#374151', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', transition: 'all 0.15s' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Loading…</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {SUBJECTS.map(subject => {
            const config    = configs[subject.id]
            const selected  = config.chapter_ids.length
            const isExpanded = expandedSubj === subject.id
            const names     = CHAPTER_NAMES[subject.id] ?? {}

            return (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: '18px', border: `1.5px solid ${config.is_active ? subject.color + '40' : '#F1F5F9'}`, overflow: 'hidden', boxShadow: config.is_active ? `0 2px 12px ${subject.color}15` : 'none' }}>

                {/* Subject header row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: subject.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '17px', flexShrink: 0 }}>
                    {subject.emoji}
                  </div>

                  {/* Expand/collapse toggle */}
                  <button onClick={() => setExpandedSubj(isExpanded ? null : subject.id)}
                    style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1F2937' }}>{subject.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>
                      {selected > 0 ? `${selected} chapter${selected > 1 ? 's' : ''} selected` : 'No chapters selected'} · click to {isExpanded ? 'collapse' : 'expand'}
                    </p>
                  </button>

                  {/* Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexShrink: 0 }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>⏱</span>
                    <input type="number" min={10} max={180} value={config.duration_mins}
                      onChange={e => setConfigs(prev => ({ ...prev, [subject.id]: { ...prev[subject.id], duration_mins: Number(e.target.value) } }))}
                      style={{ width: '48px', padding: '4px 6px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', textAlign: 'center', outline: 'none' }}/>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8' }}>m</span>
                  </div>

                  {/* Save */}
                  <button onClick={() => saveSubject(subject.id)}
                    style={{ background: saveSuccess === subject.id ? '#D1FAE5' : '#F1F5F9', color: saveSuccess === subject.id ? '#065F46' : '#374151', border: `1px solid ${saveSuccess === subject.id ? '#6EE7B7' : 'transparent'}`, borderRadius: '8px', padding: '7px 14px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s' }}>
                    {saving === subject.id ? 'Saving…' : saveSuccess === subject.id ? '✓ Saved' : 'Save'}
                  </button>

                  {/* Live toggle */}
                  <button onClick={() => toggleActive(subject.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '7px 12px', borderRadius: '10px', border: `2px solid ${config.is_active ? subject.color : '#E5E7EB'}`, background: config.is_active ? subject.color + '15' : 'white', cursor: 'pointer', flexShrink: 0 }}>
                    <div style={{ width: '32px', height: '18px', borderRadius: '9px', background: config.is_active ? subject.color : '#E5E7EB', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: '3px', left: config.is_active ? '17px' : '3px', width: '12px', height: '12px', borderRadius: '50%', background: 'white', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: config.is_active ? subject.color : '#94A3B8' }}>
                      {config.is_active ? 'Live' : 'Off'}
                    </span>
                  </button>
                </div>

                {/* Chapter list — expandable */}
                {isExpanded && (
                  <div style={{ borderTop: `1px solid ${subject.color}15`, padding: '14px 20px 16px', background: '#FAFAFA' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {Array.from({ length: subject.chapters }, (_, i) => i + 1).map(chId => {
                        const checked  = config.chapter_ids.includes(chId)
                        const chName   = names[chId] ?? `Chapter ${chId}`
                        return (
                          <button key={chId} onClick={() => toggleChapter(subject.id, chId)}
                            style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '9px 14px', borderRadius: '10px', border: `1.5px solid ${checked ? subject.color : '#E5E7EB'}`, background: checked ? subject.color + '10' : 'white', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}>
                            <div style={{ width: '20px', height: '20px', borderRadius: '6px', border: `2px solid ${checked ? subject.color : '#CBD5E1'}`, background: checked ? subject.color : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                              {checked && <span style={{ color: 'white', fontSize: '12px', fontWeight: 900 }}>✓</span>}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: checked ? subject.color : '#374151', fontWeight: checked ? 600 : 400 }}>
                                {chName}
                              </span>
                            </div>
                            <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#94A3B8', flexShrink: 0 }}>Ch {chId}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
