'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import StudentSidebarLayout from '@/components/StudentSidebarLayout'
import StudentDashboardPanel from '@/components/StudentDashboardPanel'
import DailyActivities from '@/components/DailyActivities'
import ClassQuestionsWidget from '@/components/ClassQuestionsWidget'
import { getAllMarChapters } from '@/lib/mar-chapter-content'
import AnimatedDashboardHome from '@/components/AnimatedDashboardHome'
import EnglishSubjectPageComponent from '@/components/EnglishSubjectPage'

// ── Chapter data ─────────────────────────────────────────────────────────────

const CHAPTERS = [
  { id: 1, title: 'Whistles and Shaving Bristles', type: 'Prose',     emoji: '📖', estimatedReadMins: 15 },
  { id: 2, title: 'If I Were Lord of Tartary',     type: 'Poetry',    emoji: '✨', estimatedReadMins: 12 },
  { id: 3, title: 'The Fun They Had',              type: 'Story',     emoji: '🤖', estimatedReadMins: 16 },
  { id: 4, title: 'In Morning Dew',                type: 'Poetry',    emoji: '🌿', estimatedReadMins: 11 },
  { id: 5, title: 'The Boy Who Outran the Wind',   type: 'Biography', emoji: '🏃', estimatedReadMins: 18 },
  { id: 6, title: 'The Blind Boy',                 type: 'Poetry',    emoji: '🌟', estimatedReadMins: 12 },
  { id: 7, title: 'Three Questions',               type: 'Story',     emoji: '🤔', estimatedReadMins: 20 },
  { id: 8, title: 'From a Railway Carriage',       type: 'Poetry',    emoji: '🚂', estimatedReadMins: 10 },
]

const GEO_CHAPTERS = [
  { id: 1, title: 'Our Earth in the Solar System',                   type: 'Solar System', emoji: '🌍', estimatedReadMins: 14 },
  { id: 2, title: 'The Earth as a Globe — 1 (Movements)',            type: 'Earth',        emoji: '🌐', estimatedReadMins: 18 },
  { id: 3, title: 'The Earth as a Globe — 2 (Imaginary Lines)',      type: 'Earth',        emoji: '📍', estimatedReadMins: 16 },
  { id: 4, title: 'Landforms',                                        type: 'Landforms',    emoji: '⛰️',  estimatedReadMins: 20 },
  { id: 5, title: 'Representation of Geographical Features',          type: 'Maps',         emoji: '🗺️',  estimatedReadMins: 15 },
  { id: 6, title: 'Agriculture in India and World',                   type: 'Agriculture',  emoji: '🌾', estimatedReadMins: 16 },
  { id: 7, title: 'North America',                                    type: 'Continents',   emoji: '🌎', estimatedReadMins: 20 },
]

const ICT_CHAPTERS = [
  { id: 1, title: 'File Management — Organization of Data', type: 'Concepts', emoji: '📁', estimatedReadMins: 12 },
  { id: 2, title: 'Artificial Intelligence',                type: 'AI',       emoji: '🤖', estimatedReadMins: 14 },
  { id: 3, title: 'Introduction to HTML',                   type: 'HTML',     emoji: '🌐', estimatedReadMins: 15 },
  { id: 4, title: 'HTML — Formatting a Web Page',           type: 'HTML',     emoji: '🎨', estimatedReadMins: 16 },
  { id: 5, title: 'Creating Tables in HTML',                type: 'Practical',emoji: '📊', estimatedReadMins: 13 },
]

const SKT_CHAPTERS = [
  { id: 1, title: 'Prarthana (Prayer)',                          type: 'Prayer',       emoji: '🙏', estimatedReadMins: 10 },
  { id: 2, title: 'Vivekananda (Vivekanandah)',                  type: 'Prose',        emoji: '📖', estimatedReadMins: 14 },
  { id: 3, title: 'Sanchalana Geetam (March Song)',              type: 'Poetry',       emoji: '🎵', estimatedReadMins: 10 },
  { id: 4, title: 'Sanskritabhasha Grihe Grihe (Vocabulary)',    type: 'Vocabulary',   emoji: '📝', estimatedReadMins: 12 },
  { id: 5, title: 'Sankhyah (Numbers 21-40)',                    type: 'Numbers',      emoji: '🔢', estimatedReadMins: 10 },
  { id: 6, title: 'Sandhi (Combination of Letters)',             type: 'Grammar',      emoji: '🔤', estimatedReadMins: 14 },
  { id: 7, title: 'Bhutakalah (Past Tense)',                     type: 'Grammar',      emoji: '📚', estimatedReadMins: 16 },
  { id: 8, title: 'Sambhashanam (Conversation)',                 type: 'Conversation', emoji: '💬', estimatedReadMins: 10 },
]

const SCI_CHAPTERS = [
  { id: 1, title: 'Magnetism',                        branch: 'Physics',    type: 'Physics',    emoji: '🧲', estimatedReadMins: 16 },
  { id: 2, title: 'Simple Machines',                  branch: 'Physics',    type: 'Physics',    emoji: '⚙️', estimatedReadMins: 16 },
  { id: 3, title: 'Work and Energy',                  branch: 'Physics',    type: 'Physics',    emoji: '⚡', estimatedReadMins: 16 },
  { id: 4, title: 'Introduction to Chemistry',        branch: 'Chemistry',  type: 'Chemistry',  emoji: '🧪', estimatedReadMins: 10 },
  { id: 5, title: 'Structure of Atom',                branch: 'Chemistry',  type: 'Chemistry',  emoji: '⚛️', estimatedReadMins: 14 },
  { id: 6, title: 'Physical and Chemical Changes',    branch: 'Chemistry',  type: 'Chemistry',  emoji: '🔬', estimatedReadMins: 14 },
  { id: 7, title: 'Cell – The Basic Unit of Life',    branch: 'Biology',    type: 'Biology',    emoji: '🦠', estimatedReadMins: 14 },
  { id: 8, title: 'The Leaf',                         branch: 'Biology',    type: 'Biology',    emoji: '🌿', estimatedReadMins: 12 },
  { id: 9, title: 'Human Body: Respiratory System',   branch: 'Biology',    type: 'Biology',    emoji: '🫁', estimatedReadMins: 12 },
]

const MTH_CHAPTERS = [
  { id: 1,  title: 'Whole Numbers',               type: 'Numbers',    emoji: '🔢', estimatedReadMins: 14 },
  { id: 2,  title: 'H.C.F. and L.C.M.',           type: 'Numbers',    emoji: '➗', estimatedReadMins: 16 },
  { id: 3,  title: 'Area and Perimeter',           type: 'Measurement',emoji: '📐', estimatedReadMins: 12 },
  { id: 4,  title: 'Volume',                       type: 'Measurement',emoji: '📦', estimatedReadMins: 12 },
  { id: 5,  title: 'Fractions',                    type: 'Numbers',    emoji: '½',  estimatedReadMins: 14 },
  { id: 6,  title: 'Percentage',                   type: 'Numbers',    emoji: '💯', estimatedReadMins: 12 },
  { id: 7,  title: 'Ratio and Proportion',         type: 'Numbers',    emoji: '⚖️', estimatedReadMins: 12 },
  { id: 8,  title: 'Basic Geometrical Concepts',   type: 'Geometry',   emoji: '📏', estimatedReadMins: 10 },
  { id: 9,  title: 'Angles',                       type: 'Geometry',   emoji: '📐', estimatedReadMins: 12 },
  { id: 10, title: 'Circles',                      type: 'Geometry',   emoji: '⭕', estimatedReadMins: 10 },
  { id: 11, title: 'Vedic Knowledge',              type: 'Vedic Maths',emoji: '🕉️', estimatedReadMins: 10 },
]

const HC_CHAPTERS = [
  { id: 1, title: 'The Vedas — Our Sacred Heritage',             type: 'History', emoji: '📜', estimatedReadMins: 18 },
  { id: 2, title: 'Essence of Hinduism',                         type: 'History', emoji: '🕉️',  estimatedReadMins: 16 },
  { id: 3, title: 'The Great Preachers',                         type: 'History', emoji: '🙏', estimatedReadMins: 20 },
  { id: 4, title: 'The Preamble',                                type: 'Civics',  emoji: '⚖️',  estimatedReadMins: 15 },
  { id: 5, title: 'India Lives in Villages (Rural Administration)', type: 'Civics', emoji: '🏡', estimatedReadMins: 14 },
  { id: 6, title: 'The Power of Determination',                  type: 'Values',  emoji: '💪', estimatedReadMins: 10 },
]

// ── Dashboard home ───────────────────────────────────────────────────────────

function DashboardHome({ studentId, onNavigate }: { studentId: string; onNavigate: (s: string) => void }) {
  return <AnimatedDashboardHome studentId={studentId} onNavigate={onNavigate}/>
}

// ── English subject page ─────────────────────────────────────────────────────

function EnglishSubjectPage({ studentId }: { studentId: string }) {
  return <EnglishSubjectPageComponent studentId={studentId}/>
}

// ── Profile page (inline — no separate SidebarLayout) ────────────────────────

function StudentProfileContent({ studentId }: { studentId: string }) {
  const [profile, setProfile] = useState<{ full_name: string; email: string } | null>(null)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('profiles').select('full_name, email').eq('id', studentId).single()
      setProfile(data)
    }
    load()
  }, [studentId])

  return (
    <div style={{ maxWidth: '560px' }}>
      {/* Profile header */}
      <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '20px', padding: '32px', textAlign: 'center', marginBottom: '16px' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#74C69D', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332' }}>
          {profile?.full_name?.[0] || 'S'}
        </div>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: 'white', marginBottom: '4px' }}>
          {profile?.full_name || 'Student'}
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
          {profile?.email}
        </p>
      </div>

      {/* Account details */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', marginBottom: '14px' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Account details</p>
        </div>
        {[
          { label: 'Full name',    value: profile?.full_name || '—', icon: '👤' },
          { label: 'Login email',  value: profile?.email     || '—', icon: '📧' },
          { label: 'Account type', value: 'Student',                  icon: '🎓' },
          { label: 'School',       value: 'Singhania School, Thane',  icon: '🏫' },
          { label: 'Grade',        value: 'Grade 6',                  icon: '📚' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 20px', borderBottom: '1px solid #F9FAFB' }}>
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '14px', color: '#1B4332' }}>{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Password note */}
      <div style={{ background: '#FEF3C7', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
        <span style={{ fontSize: '20px', flexShrink: 0 }}>🔑</span>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#92400E', marginBottom: '4px' }}>Password is managed by your parent</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#B45309', lineHeight: 1.6 }}>
            If you need to change your password, ask your parent to update it from their account.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── History & Civics subject page ────────────────────────────────────────────

function HistoryCivicsSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase
        .from('student_lesson_progress')
        .select('chapter_id')
        .eq('student_id', studentId)
        .eq('subject', 'history-civics')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)

      const { data: quiz } = await supabase
        .from('student_quiz_attempts')
        .select('chapter_id, score')
        .eq('student_id', studentId)
        .eq('subject', 'history-civics')
        .order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = HC_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = HC_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / HC_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'History': { bg: '#FEF3C7', text: '#92400E' },
    'Civics':  { bg: '#EDE9FE', text: '#5B21B6' },
    'Values':  { bg: '#D8F3DC', text: '#1B4332' },
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Page header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>
          🏛️ History & Civics
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
          Connexion — Class 6, Project 1 · {completedCount} of {HC_CHAPTERS.length} chapters completed
        </p>
      </div>

      {/* Stats + progress bar */}
      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>
            Ancient history, Hinduism, great preachers, the Preamble and rural governance
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/{HC_CHAPTERS.length}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
            </div>
            {Object.keys(scores).length > 0 && (
              <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#92400E', lineHeight: 1 }}>
                  {Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length)}%
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309', marginTop: '2px' }}>Avg score</p>
              </div>
            )}
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>
          {overallProgress}% complete — keep going!
        </p>
      </div>

      {/* Continue card */}
      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <style>{`@keyframes gp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gp-b{animation:gp-b 2.5s ease-in-out infinite}`}</style>
          <div className="gp-b">
            <Link href={`/student/hc-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>
                    {currentChapter.title}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
                    Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read
                  </p>
                  {(progress[currentChapter.id] || 0) > 0 && (
                    <div style={{ marginTop: '10px', height: '4px', background: 'rgba(255,255,255,0.15)', borderRadius: '2px', width: '180px' }}>
                      <div style={{ height: '100%', width: `${((progress[currentChapter.id] || 0) / 7) * 100}%`, background: '#74C69D', borderRadius: '2px' }}/>
                    </div>
                  )}
                </div>
                <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      {/* Chapter list */}
      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
        All chapters
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {HC_CHAPTERS.map(chapter => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const typeStyle   = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score       = scores[chapter.id]
          const ctaLabel    = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'

          return (
            <Link
              key={chapter.id}
              href={`/student/hc-chapter/${chapter.id}`}
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
              >
                {(isCompleted || isCurrent) && (
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>
                )}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6', color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #D8F3DC' : 'none' }}>
                    {ctaLabel}
                  </span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="history" studentId={studentId}/>
    </div>
  )
}

// ── Geography subject page ────────────────────────────────────────────────────

function GeographySubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'geography')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'geography').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = GEO_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = GEO_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / GEO_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Solar System': { bg: '#FEF3C7', text: '#92400E' },
    'Earth':        { bg: '#DBEAFE', text: '#1E40AF' },
    'Landforms':    { bg: '#D8F3DC', text: '#1B4332' },
    'Maps':         { bg: '#EDE9FE', text: '#5B21B6' },
    'Agriculture':  { bg: '#FEF3C7', text: '#92400E' },
    'Continents':   { bg: '#DBEAFE', text: '#1E40AF' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>🌍 Geography</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Connexion — Class 6, Project 1 · {completedCount} of {GEO_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Solar system, Earth movements, landforms, maps, agriculture and North America</p>
          <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/{GEO_CHAPTERS.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% complete — keep going!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/student/geo-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>All chapters</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {GEO_CHAPTERS.map(chapter => {
          const secsDone = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7; const isStarted = secsDone > 0 && !isCompleted
          const isCurrent = chapter.id === currentChapter?.id
          const typeStyle = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score = scores[chapter.id]; const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/geo-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6', color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #D8F3DC' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="geography" studentId={studentId}/>
    </div>
  )
}

// ── ICT subject page ──────────────────────────────────────────────────────────

function ICTSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'ict')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'ict').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = ICT_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = ICT_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / ICT_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Concepts':  { bg: '#D8F3DC', text: '#1B4332' },
    'AI':        { bg: '#EDE9FE', text: '#5B21B6' },
    'HTML':      { bg: '#DBEAFE', text: '#1E40AF' },
    'Practical': { bg: '#FEF3C7', text: '#92400E' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>💻 ICT</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Connexion — Class 6, Project 1 · {completedCount} of {ICT_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>File management, AI, and HTML web development</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/{ICT_CHAPTERS.length}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
            </div>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% complete — keep going!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <style>{`@keyframes gp-b{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}.gp-b{animation:gp-b 2.5s ease-in-out infinite}`}</style>
          <div className="gp-b">
            <Link href={`/student/ict-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                    {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.title}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
                </div>
                <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>All chapters</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ICT_CHAPTERS.map(chapter => {
          const secsDone = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted = secsDone > 0 && !isCompleted
          const isCurrent = chapter.id === currentChapter?.id
          const typeStyle = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score = scores[chapter.id]
          const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/ict-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6', color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #D8F3DC' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="ict" studentId={studentId}/>
    </div>
  )
}

// ── Sanskrit subject page ────────────────────────────────────────────────────

function SanskritSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'sanskrit')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'sanskrit').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = SKT_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = SKT_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / SKT_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Prayer':       { bg: '#FEF3C7', text: '#92400E' },
    'Prose':        { bg: '#DBEAFE', text: '#1E40AF' },
    'Poetry':       { bg: '#EDE9FE', text: '#5B21B6' },
    'Vocabulary':   { bg: '#D8F3DC', text: '#1B4332' },
    'Numbers':      { bg: '#FEE2E2', text: '#991B1B' },
    'Grammar':      { bg: '#E0F2FE', text: '#0369A1' },
    'Conversation': { bg: '#FDF4FF', text: '#7E22CE' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>🕉️ Sanskrit</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>सुरभारती — Connexion Class 6, Project 1 · {completedCount} of {SKT_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Prayer, Vivekananda, march song, vocabulary, numbers, sandhi, past tense and conversation</p>
          <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/{SKT_CHAPTERS.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% complete — keep going!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/student/skt-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>All chapters</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SKT_CHAPTERS.map(chapter => {
          const secsDone = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7; const isStarted = secsDone > 0 && !isCompleted
          const isCurrent = chapter.id === currentChapter?.id
          const typeStyle = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score = scores[chapter.id]; const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/skt-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6', color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #D8F3DC' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="sanskrit" studentId={studentId}/>
    </div>
  )
}

// ── Science subject page ──────────────────────────────────────────────────────

function ScienceSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'science')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'science').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = SCI_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = SCI_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / SCI_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Physics':   { bg: '#FEF3C7', text: '#92400E' },
    'Chemistry': { bg: '#DBEAFE', text: '#1E40AF' },
    'Biology':   { bg: '#D8F3DC', text: '#1B4332' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>🔬 Science</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Science Connexion — Class 6 · Physics · Chemistry · Biology · {completedCount} of {SCI_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Magnetism, Machines, Energy (Physics) · Atoms, Chemistry, Changes (Chemistry) · Cell, Leaf, Respiration (Biology)</p>
          <div style={{ background: '#D8F3DC', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1B4332', lineHeight: 1 }}>{completedCount}/{SCI_CHAPTERS.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#40916C', marginTop: '2px' }}>Chapters</p>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#2D6A4F,#52B788)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% complete — keep going!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/student/sci-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Chapter {currentChapter.id} · {currentChapter.branch} · {currentChapter.estimatedReadMins} min read</p>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#74C69D', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#1B4332" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>All chapters</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {SCI_CHAPTERS.map(chapter => {
          const secsDone = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7; const isStarted = secsDone > 0 && !isCompleted
          const isCurrent = chapter.id === currentChapter?.id
          const typeStyle = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score = scores[chapter.id]; const ctaLabel = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/sci-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#F0FDF4' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #2D6A4F' : isCompleted ? '1px solid #D8F3DC' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#10B981' : '#2D6A4F', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#D8F3DC' : isCurrent ? '#2D6A4F' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1B4332' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.branch}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#2D6A4F' : '#F3F4F6', color: isCompleted ? '#2D6A4F' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #D8F3DC' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="science" studentId={studentId}/>
    </div>
  )
}

// ── Maths subject page ────────────────────────────────────────────────────────

function MathsSubjectPage({ studentId }: { studentId: string }) {
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'maths')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'maths').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = MTH_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = MTH_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / MTH_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'Numbers':     { bg: '#DBEAFE', text: '#1E40AF' },
    'Measurement': { bg: '#FEF3C7', text: '#92400E' },
    'Geometry':    { bg: '#D8F3DC', text: '#1B4332' },
    'Vedic Maths': { bg: '#FDF4FF', text: '#7E22CE' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>📐 Mathematics</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Maths Connexion — Class 6 · Numbers · Measurement · Geometry · Vedic Maths · {completedCount} of {MTH_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>Whole Numbers, HCF & LCM, Area, Volume, Fractions, Percentage, Ratio, Geometry, Angles, Circles, Vedic Maths</p>
          <div style={{ background: '#DBEAFE', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#1E40AF', lineHeight: 1 }}>{completedCount}/{MTH_CHAPTERS.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#3B82F6', marginTop: '2px' }}>Chapters</p>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#1E40AF,#3B82F6)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% complete — keep going!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/student/mth-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#1E3A8A,#1E40AF)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#93C5FD', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 Continue reading' : '▶️ Start reading'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.title}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>Chapter {currentChapter.id} · {currentChapter.type} · {currentChapter.estimatedReadMins} min read</p>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#93C5FD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>All chapters</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {MTH_CHAPTERS.map(chapter => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const typeStyle   = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score       = scores[chapter.id]
          const ctaLabel    = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/mth-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#EFF6FF' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #1E40AF' : isCompleted ? '1px solid #BFDBFE' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#3B82F6' : '#1E40AF', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#DBEAFE' : isCurrent ? '#1E40AF' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#1E40AF' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.emoji}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.title}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#1E40AF', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#1E40AF' : '#F3F4F6', color: isCompleted ? '#1E40AF' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #BFDBFE' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>

      <ClassQuestionsWidget subject="maths" studentId={studentId}/>
    </div>
  )
}

// ── Marathi Subject Page ─────────────────────────────────────────────────────

function MarathiSubjectPage({ studentId }: { studentId: string }) {
  const MAR_CHAPTERS = getAllMarChapters()
  const [progress, setProgress] = useState<Record<number, number>>({})
  const [scores,   setScores]   = useState<Record<number, number>>({})

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: secs } = await supabase.from('student_lesson_progress').select('chapter_id').eq('student_id', studentId).eq('subject', 'marathi')
      const countMap: Record<number, number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })
      setProgress(countMap)
      const { data: quiz } = await supabase.from('student_quiz_attempts').select('chapter_id, score').eq('student_id', studentId).eq('subject', 'marathi').order('created_at', { ascending: false })
      const scoreMap: Record<number, number> = {}
      quiz?.forEach((r: any) => { if (!(r.chapter_id in scoreMap)) scoreMap[r.chapter_id] = r.score })
      setScores(scoreMap)
    }
    load()
  }, [studentId])

  const currentChapter  = MAR_CHAPTERS.find(c => (progress[c.id] || 0) < 7)
  const completedCount  = MAR_CHAPTERS.filter(c => (progress[c.id] || 0) >= 7).length
  const overallProgress = Math.round((completedCount / MAR_CHAPTERS.length) * 100)

  const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
    'गद्य':       { bg: '#FEF3C7', text: '#92400E' },
    'कविता':      { bg: '#D8F3DC', text: '#1B4332' },
    'गाणे':       { bg: '#DBEAFE', text: '#1E40AF' },
    'एकांकिका':   { bg: '#FDF4FF', text: '#7E22CE' },
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '28px', color: '#1B4332', marginBottom: '4px' }}>📝 मराठी</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>सुलभभारती — इयत्ता सहावी · गद्य · कविता · गाणे · {completedCount} of {MAR_CHAPTERS.length} chapters completed</p>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px 24px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280' }}>भारतमाता · माझा अनुभव · पाऊस आला · सुगरणीचे घरटे · घर · बाबांचं पत्र · अप्पाजींचे चातुर्य आणि बरेच काही</p>
          <div style={{ background: '#FEF3C7', borderRadius: '10px', padding: '10px 16px', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: '#92400E', lineHeight: 1 }}>{completedCount}/{MAR_CHAPTERS.length}</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309', marginTop: '2px' }}>पाठ</p>
          </div>
        </div>
        <div style={{ height: '8px', background: '#E5E7EB', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${overallProgress}%`, background: 'linear-gradient(90deg,#92400E,#B45309)', borderRadius: '4px', transition: 'width 0.8s ease' }}/>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginTop: '6px' }}>{overallProgress}% पूर्ण — पुढे चला!</p>
      </div>

      {currentChapter && (
        <div style={{ marginBottom: '20px' }}>
          <Link href={`/student/mar-chapter/${currentChapter.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ background: 'linear-gradient(135deg,#78350F,#92400E)', borderRadius: '18px', padding: '22px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#FDE68A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '5px' }}>
                  {(progress[currentChapter.id] || 0) > 0 ? '📖 पुढे वाचा' : '▶️ वाचायला सुरुवात करा'}
                </p>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '20px', color: 'white', lineHeight: 1.3, marginBottom: '4px' }}>{currentChapter.titleMarathi}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>पाठ {currentChapter.id} · {currentChapter.type} · {currentChapter.author} · {currentChapter.estimatedReadMins} मिनिटे</p>
              </div>
              <div style={{ width: '44px', height: '44px', background: '#FDE68A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 3l7 6-7 6" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>
          </Link>
        </div>
      )}

      <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>सर्व पाठ</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {MAR_CHAPTERS.map(chapter => {
          const secsDone    = progress[chapter.id] || 0
          const isCompleted = secsDone >= 7
          const isStarted   = secsDone > 0 && !isCompleted
          const isCurrent   = chapter.id === currentChapter?.id
          const typeStyle   = TYPE_COLORS[chapter.type] || { bg: '#F3F4F6', text: '#374151' }
          const score       = scores[chapter.id]
          const ctaLabel    = isCompleted ? 'Review' : isStarted ? 'Resume' : 'Start'
          return (
            <Link key={chapter.id} href={`/student/mar-chapter/${chapter.id}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ background: isCompleted ? '#FFFBEB' : 'white', borderRadius: '16px', border: isCurrent ? '2px solid #92400E' : isCompleted ? '1px solid #FDE68A' : '1px solid #E5E7EB', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'box-shadow 0.15s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(27,67,50,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}>
                {(isCompleted || isCurrent) && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: isCompleted ? '#F59E0B' : '#92400E', borderRadius: '16px 0 0 16px' }}/>}
                <div style={{ width: '40px', height: '40px', minWidth: '40px', borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isCompleted ? '#FEF3C7' : isCurrent ? '#92400E' : '#F3F4F6', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px', color: isCompleted ? '#92400E' : isCurrent ? 'white' : '#9CA3AF' }}>
                  {isCompleted ? '✓' : chapter.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', flexWrap: 'wrap' }}>
                    <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', lineHeight: 1.3 }}>{chapter.titleMarathi}</p>
                    {isCurrent && !isCompleted && <span style={{ background: '#92400E', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '10px', flexShrink: 0 }}>UP NEXT</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                    <span style={{ padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: typeStyle.bg, color: typeStyle.text }}>{chapter.type}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>✍️ {chapter.author}</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>⏱ {chapter.estimatedReadMins} min</span>
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📋 7 sections</span>
                    {isStarted && <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 600 }}>{secsDone}/7 read</span>}
                    {score != null && <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : '#EF4444' }}>Score: {score}%</span>}
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', padding: '8px 18px', borderRadius: '8px', flexShrink: 0, background: isCompleted ? 'white' : isCurrent ? '#92400E' : '#F3F4F6', color: isCompleted ? '#92400E' : isCurrent ? 'white' : '#6B7280', border: isCompleted ? '1px solid #FDE68A' : 'none' }}>{ctaLabel}</span>
              </div>
            </Link>
          )
        })}
      </div>
      <ClassQuestionsWidget subject="marathi" studentId={studentId}/>
    </div>
  )
}

// ── Coming soon ──────────────────────────────────────────────────────────────

function ComingSoon({ subject }: { subject: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', textAlign: 'center' }}>
      <div style={{ fontSize: '52px', marginBottom: '16px' }}>🚀</div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '8px' }}>
        {subject} is coming soon!
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', maxWidth: '320px', lineHeight: 1.7 }}>
        We are building this subject for you. Complete English first and it will be ready!
      </p>
    </div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────

export default function StudentMainPage() {
  return (
    <StudentSidebarLayout>
      {(activeSection, studentId) => {
        switch (activeSection) {
          case 'dashboard': return <DashboardHome           studentId={studentId} onNavigate={section => window.dispatchEvent(new CustomEvent('gp-navigate', { detail: section }))}/>
          case 'english':   return <EnglishSubjectPage      studentId={studentId}/>
          case 'maths':     return <MathsSubjectPage studentId={studentId}/>
          case 'science':   return <ScienceSubjectPage studentId={studentId}/>
          case 'history':   return <HistoryCivicsSubjectPage studentId={studentId}/>
          case 'geo':       return <GeographySubjectPage    studentId={studentId}/>
          case 'sanskrit':  return <SanskritSubjectPage  studentId={studentId}/>
          case 'ict':       return <ICTSubjectPage         studentId={studentId}/>
          case 'marathi':   return <MarathiSubjectPage     studentId={studentId}/>
          case 'profile':   return <StudentProfileContent   studentId={studentId}/>
          default:          return <DashboardHome           studentId={studentId} onNavigate={section => window.dispatchEvent(new CustomEvent('gp-navigate', { detail: section }))}/>
        }
      }}
    </StudentSidebarLayout>
  )
}
