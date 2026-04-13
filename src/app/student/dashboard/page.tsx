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
import MathsSubjectPageComponent    from '@/components/MathsSubjectPage'
import ScienceSubjectPageComponent  from '@/components/ScienceSubjectPage'
import HistorySubjectPageComponent  from '@/components/HistoryCivicsSubjectPage'
import GeoSubjectPageComponent      from '@/components/GeographySubjectPage'
import SanskritSubjectPageComponent from '@/components/SanskritSubjectPage'
import ICTSubjectPageComponent      from '@/components/ICTSubjectPage'
import MarathiSubjectPageComponent  from '@/components/MarathiSubjectPage'

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
  return <HistorySubjectPageComponent studentId={studentId}/>
}

// ── Geography subject page ────────────────────────────────────────────────────

function GeographySubjectPage({ studentId }: { studentId: string }) {
  return <GeoSubjectPageComponent studentId={studentId}/>
}

// ── ICT subject page ──────────────────────────────────────────────────────────

function ICTSubjectPage({ studentId }: { studentId: string }) {
  return <ICTSubjectPageComponent studentId={studentId}/>
}

// ── Sanskrit subject page ────────────────────────────────────────────────────

function SanskritSubjectPage({ studentId }: { studentId: string }) {
  return <SanskritSubjectPageComponent studentId={studentId}/>
}

// ── Science subject page ──────────────────────────────────────────────────────

function ScienceSubjectPage({ studentId }: { studentId: string }) {
  return <ScienceSubjectPageComponent studentId={studentId}/>
}

// ── Maths subject page ────────────────────────────────────────────────────────

function MathsSubjectPage({ studentId }: { studentId: string }) {
  return <MathsSubjectPageComponent studentId={studentId}/>
}

// ── Marathi Subject Page ─────────────────────────────────────────────────────

function MarathiSubjectPage({ studentId }: { studentId: string }) {
  return <MarathiSubjectPageComponent studentId={studentId}/>
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
