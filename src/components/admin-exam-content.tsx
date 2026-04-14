'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'

const SUBJECTS = [
  { id: 'english',  label: 'English',          emoji: '📖', color: '#1B4332', chapters: 8  },
  { id: 'maths',    label: 'Mathematics',       emoji: '🔢', color: '#1E3A5F', chapters: 11 },
  { id: 'science',  label: 'Science',           emoji: '🔬', color: '#3B1F5E', chapters: 9  },
  { id: 'history',  label: 'History & Civics',  emoji: '🏛️', color: '#7C2D12', chapters: 6  },
  { id: 'geo',      label: 'Geography',         emoji: '🌍', color: '#064E3B', chapters: 7  },
  { id: 'sanskrit', label: 'Sanskrit',          emoji: '🕉️', color: '#78350F', chapters: 8  },
  { id: 'ict',      label: 'ICT',               emoji: '💻', color: '#1E40AF', chapters: 5  },
  { id: 'marathi',  label: 'मराठी',             emoji: '📜', color: '#831843', chapters: 17 },
  { id: 'rapid',    label: 'Rapid Reader',      emoji: '📚', color: '#065F46', chapters: 19 },
]

interface ExamConfig {
  subject: string
  chapter_ids: number[]
  is_active: boolean
  duration_mins: number
  term: string
}

export default function ExamContent() {
  const [configs,   setConfigs]   = useState<Record<string, ExamConfig>>({})
  const [loading,   setLoading]   = useState(true)
  const [saving,    setSaving]    = useState<string | null>(null)
  const [term,      setTerm]      = useState('Term 1')

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('exam_config').select('*')
      const map: Record<string, ExamConfig> = {}
      SUBJECTS.forEach(s => {
        const existing = data?.find(d => d.subject === s.id)
        map[s.id] = existing ?? {
          subject:      s.id,
          chapter_ids:  [],
          is_active:    false,
          duration_mins: 60,
          term:         'Term 1',
        }
      })
      setConfigs(map)
      if (data?.[0]?.term) setTerm(data[0].term)
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
    const config   = { ...configs[subjectId], term }
    await supabase.from('exam_config')
      .upsert(config, { onConflict: 'subject' })
    setSaving(null)
  }

  const toggleActive = async (subjectId: string) => {
    const newVal = !configs[subjectId].is_active
    setConfigs(prev => ({ ...prev, [subjectId]: { ...prev[subjectId], is_active: newVal } }))
    const supabase = createClient()
    await supabase.from('exam_config')
      .upsert({ ...configs[subjectId], is_active: newVal, term }, { onConflict: 'subject' })
  }

  const activeCount = Object.values(configs).filter(c => c.is_active).length

  return (
    <div style={{ maxWidth: '960px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '24px', color: '#1F2937', marginBottom: '4px' }}>Exam Mode</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#64748B' }}>
            Select chapters per subject and publish to students. {activeCount > 0 ? `${activeCount} subject${activeCount > 1 ? 's' : ''} active.` : 'No subjects active.'}
          </p>
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>Term label</p>
            <input value={term} onChange={e => setTerm(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', width: '100px', outline: 'none' }}/>
          </div>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px' }}>
          <p style={{ fontFamily: 'var(--font-body)', color: '#94A3B8' }}>Loading…</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {SUBJECTS.map(subject => {
            const config   = configs[subject.id]
            const selected = config.chapter_ids.length
            return (
              <motion.div key={subject.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'white', borderRadius: '20px', border: `1.5px solid ${config.is_active ? subject.color + '40' : '#F1F5F9'}`, padding: '20px 24px', boxShadow: config.is_active ? `0 2px 12px ${subject.color}15` : 'none' }}>

                {/* Subject header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: subject.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>
                    {subject.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#1F2937' }}>{subject.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#94A3B8' }}>
                      {selected} of {subject.chapters} chapters selected
                    </p>
                  </div>

                  {/* Duration */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B' }}>⏱</span>
                    <input
                      type="number" min={10} max={180}
                      value={config.duration_mins}
                      onChange={e => setConfigs(prev => ({ ...prev, [subject.id]: { ...prev[subject.id], duration_mins: Number(e.target.value) } }))}
                      style={{ width: '52px', padding: '5px 8px', borderRadius: '8px', border: '1.5px solid #E5E7EB', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', textAlign: 'center', outline: 'none' }}
                    />
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#64748B' }}>mins</span>
                  </div>

                  {/* Save button */}
                  <button onClick={() => saveSubject(subject.id)}
                    style={{ background: '#F1F5F9', color: '#374151', border: 'none', borderRadius: '10px', padding: '8px 16px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                    {saving === subject.id ? 'Saving…' : 'Save'}
                  </button>

                  {/* Active toggle */}
                  <button onClick={() => toggleActive(subject.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '12px', border: `2px solid ${config.is_active ? subject.color : '#E5E7EB'}`, background: config.is_active ? subject.color + '15' : 'white', cursor: 'pointer' }}>
                    <div style={{ width: '36px', height: '20px', borderRadius: '10px', background: config.is_active ? subject.color : '#E5E7EB', position: 'relative', transition: 'all 0.2s', flexShrink: 0 }}>
                      <div style={{ position: 'absolute', top: '3px', left: config.is_active ? '19px' : '3px', width: '14px', height: '14px', borderRadius: '50%', background: 'white', transition: 'all 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}/>
                    </div>
                    <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: config.is_active ? subject.color : '#94A3B8' }}>
                      {config.is_active ? 'Live' : 'Off'}
                    </span>
                  </button>
                </div>

                {/* Chapter checkboxes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Array.from({ length: subject.chapters }, (_, i) => i + 1).map(chId => {
                    const checked = config.chapter_ids.includes(chId)
                    return (
                      <button key={chId} onClick={() => toggleChapter(subject.id, chId)}
                        style={{ padding: '5px 14px', borderRadius: '20px', border: `1.5px solid ${checked ? subject.color : '#E5E7EB'}`, background: checked ? subject.color + '15' : 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: checked ? subject.color : '#94A3B8', cursor: 'pointer', transition: 'all 0.15s' }}>
                        Ch {chId}
                      </button>
                    )
                  })}
                </div>

              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
