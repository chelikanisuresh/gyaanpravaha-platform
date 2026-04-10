'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// ── Dynamic mother messages ──────────────────────────────────────────────────

function getMessage(
  name: string,
  gender: 'male' | 'female' | null,
  streak: number,
  gapDays: number,
  justCompletedChapter: boolean,
  lastScore: number | null,
): string {
  const beta = gender === 'female' ? 'beti' : 'beta'
  const firstName = name.split(' ')[0]

  if (justCompletedChapter) {
    return `Ek aur chapter khatam, ${firstName} ${beta}! You are working so hard — Mummy is really proud of you 🎉`
  }
  if (lastScore !== null && lastScore >= 80) {
    return `${lastScore}% in the quiz! Shabash ${firstName} ${beta}! That is wonderful 🌟`
  }
  if (lastScore !== null && lastScore < 60) {
    return `Koi baat nahi ${firstName} ${beta}, marks se zyada mehnat matters. Try again — you can do it 💪`
  }
  if (gapDays >= 2) {
    return `${firstName} ${beta}... Mummy wait kar rahi hai 🥺 Come back today — even just one section, okay?`
  }
  if (gapDays === 1) {
    return `Kal nahi aaya padhai pe, ${firstName} ${beta}. Koi baat nahi — aaj aa gaya na, that is what matters 😊`
  }
  if (streak >= 7) {
    return `Wah ${firstName} ${beta}! Poora ek hafta padhte rahe — you are a real champion! 🏆`
  }
  if (streak >= 3) {
    return `${firstName} ${beta}, ${streak} din se padh rahe ho! Mummy ko bahut khushi ho rahi hai 🌟`
  }
  if (streak === 1) {
    return `Aaj padhai shuru ki, ${firstName} ${beta} — bahut achha! Kal bhi aana, haan? 🌱`
  }
  return `${firstName} ${beta}, ready ho padhai ke liye? Mummy always believes in you 💚`
}

// ── Mango tree SVG — 9 stages (0 to 8 chapters) ────────────────────────────

function MangoTree({ chaptersCompleted }: { chaptersCompleted: number }) {
  const stage = Math.min(chaptersCompleted, 8)

  // Leaf count and mango count per stage
  const leaves  = [0, 2, 4, 6, 9, 12, 16, 20, 24][stage]
  const mangoes = stage >= 7 ? (stage === 8 ? 6 : 3) : 0
  const treeH   = [20, 35, 50, 65, 78, 88, 95, 100, 100][stage] // % height
  const trunkH  = Math.round(40 + treeH * 0.5)
  const canopyR = Math.round(10 + treeH * 0.55)

  // Leaf positions — arranged in a rough circle around canopy centre
  const leafPositions = Array.from({ length: leaves }, (_, i) => {
    const angle = (i / leaves) * Math.PI * 2
    const r = canopyR * (0.45 + Math.random() * 0.4)
    return {
      x: 100 + Math.cos(angle) * r,
      y: 85 - trunkH * 0.5 + Math.sin(angle) * r * 0.7,
    }
  })

  // Mango positions
  const mangoPositions = Array.from({ length: mangoes }, (_, i) => {
    const angle = (i / mangoes) * Math.PI * 2
    const r = canopyR * 0.55
    return {
      x: 100 + Math.cos(angle) * r,
      y: 85 - trunkH * 0.5 + Math.sin(angle) * r * 0.65,
    }
  })

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <style>{`
        @keyframes gp-leaf-sway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes gp-mango-drop { 0%{transform:scale(0);opacity:0} 100%{transform:scale(1);opacity:1} }
        @keyframes gp-grow { from{transform:scaleY(0)} to{transform:scaleY(1)} }
        .gp-leaf { animation: gp-leaf-sway 3s ease-in-out infinite; transform-origin: center bottom; }
        .gp-mango { animation: gp-mango-drop 0.5s ease-out forwards; }
      `}</style>

      <svg viewBox="0 0 200 180" width="100%" style={{ display: 'block' }}>
        {/* Ground */}
        <ellipse cx="100" cy="170" rx="50" ry="6" fill="#D8F3DC" opacity="0.6"/>

        {/* Trunk */}
        {stage > 0 && (
          <rect
            x="94" y={170 - trunkH} width="12" height={trunkH}
            rx="4" fill="#92400E" opacity="0.85"
          />
        )}

        {/* Branches — appear from stage 3 */}
        {stage >= 3 && (
          <>
            <line x1="100" y1={170 - trunkH + 10} x2={100 - canopyR * 0.5} y2={170 - trunkH - 10}
              stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.75"/>
            <line x1="100" y1={170 - trunkH + 10} x2={100 + canopyR * 0.5} y2={170 - trunkH - 10}
              stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.75"/>
          </>
        )}

        {/* Canopy base */}
        {stage >= 2 && (
          <ellipse
            cx="100" cy={85 - trunkH * 0.5}
            rx={canopyR} ry={canopyR * 0.75}
            fill="#2D6A4F" opacity="0.25"
          />
        )}

        {/* Leaves */}
        {leafPositions.map((pos, i) => (
          <g key={i} className="gp-leaf"
            style={{ animationDelay: `${(i * 0.3) % 2}s`, animationDuration: `${2 + (i % 3)}s` }}
            transform={`translate(${pos.x}, ${pos.y})`}>
            <ellipse cx="0" cy="0" rx="9" ry="5"
              fill={i % 3 === 0 ? '#40916C' : i % 3 === 1 ? '#52B788' : '#74C69D'}
              transform={`rotate(${(i * 47) % 180})`}
              opacity="0.9"
            />
          </g>
        ))}

        {/* Mangoes */}
        {mangoPositions.map((pos, i) => (
          <g key={i} className="gp-mango"
            style={{ animationDelay: `${i * 0.15}s` }}
            transform={`translate(${pos.x}, ${pos.y})`}>
            {/* Mango body */}
            <ellipse cx="0" cy="0" rx="6" ry="8"
              fill={stage === 8 ? '#F59E0B' : '#84CC16'}
            />
            {/* Mango tip */}
            <circle cx="0" cy="-7" r="2" fill={stage === 8 ? '#D97706' : '#65A30D'}/>
            {/* Stem */}
            <line x1="0" y1="-9" x2="0" y2="-13" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round"/>
          </g>
        ))}

        {/* Seedling for stage 0 */}
        {stage === 0 && (
          <>
            <line x1="100" y1="170" x2="100" y2="148" stroke="#92400E" strokeWidth="3" strokeLinecap="round"/>
            <ellipse cx="95" cy="144" rx="7" ry="4" fill="#74C69D" transform="rotate(-30, 95, 144)"/>
            <ellipse cx="105" cy="144" rx="7" ry="4" fill="#74C69D" transform="rotate(30, 105, 144)"/>
          </>
        )}

        {/* Stage label */}
        <text x="100" y="178" textAnchor="middle"
          fontFamily="var(--font-body)" fontSize="9" fill="#6B7280">
          {stage === 0 ? 'Plant your first seed — start reading!'
            : stage === 8 ? 'Your tree is in full bloom! 🥭'
            : `${8 - stage} more chapter${8 - stage > 1 ? 's' : ''} to full bloom`}
        </text>
      </svg>
    </div>
  )
}

// ── Streak dots ──────────────────────────────────────────────────────────────

function StreakDots({ streak }: { streak: number }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const today = new Date().getDay() // 0=Sun
  const todayIdx = today === 0 ? 6 : today - 1

  return (
    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
      {days.map((day, i) => {
        const daysAgo = (todayIdx - i + 7) % 7
        const studied = daysAgo < streak
        const isToday = i === todayIdx
        return (
          <div key={day} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: studied ? '#2D6A4F' : isToday ? '#D8F3DC' : '#F3F4F6',
              border: isToday ? '2px solid #2D6A4F' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {studied && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '9px', color: '#9CA3AF' }}>{day}</p>
          </div>
        )
      })}
    </div>
  )
}

// ── Fun facts per chapter ────────────────────────────────────────────────────

const FUN_FACTS: Record<number, string> = {
  1: 'The real Gilbreth family had 12 children — and their dad actually timed everything, including how fast each child could button a shirt!',
  2: 'Walter de la Mare wrote poetry until he was 83 years old. He believed imagination never grows old.',
  3: 'Isaac Asimov wrote over 500 books in his lifetime. He started writing at age 11 — just like you!',
  4: 'Keki N Daruwalla is one of India\'s most respected English poets. He grew up observing the natural world around him.',
  5: 'Milkha Singh once ran against a train to improve his speed. He never had professional coaching when he started.',
  6: 'Colley Cibber became Poet Laureate of England — one of the highest honours for a poet — in 1730.',
  7: 'Leo Tolstoy gave away all his wealth and land in his old age because he believed simple living was the highest wisdom.',
  8: 'Robert Louis Stevenson wrote Treasure Island while playing with his stepson\'s toy map on a rainy afternoon.',
}

// ── Badge definitions ────────────────────────────────────────────────────────

const BADGES = [
  { id: 'first_chapter',   label: 'First Step',       emoji: '🌱', desc: 'Completed your first chapter',    condition: (c: number) => c >= 1 },
  { id: 'prose_reader',    label: 'Story Lover',      emoji: '📖', desc: 'Completed a prose chapter',       condition: (c: number) => c >= 1 },
  { id: 'poetry_explorer', label: 'Poetry Explorer',  emoji: '✨', desc: 'Completed a poetry chapter',      condition: (c: number) => c >= 2 },
  { id: 'halfway',         label: 'Halfway There',    emoji: '🎯', desc: 'Completed 4 chapters',             condition: (c: number) => c >= 4 },
  { id: 'scholar',         label: 'Scholar',          emoji: '🎓', desc: 'Completed all 8 chapters',        condition: (c: number) => c >= 8 },
]

// ── Main dashboard panel ─────────────────────────────────────────────────────

interface Props {
  studentId: string
}

export default function StudentDashboardPanel({ studentId }: Props) {
  const [name,              setName]              = useState('Student')
  const [gender,            setGender]            = useState<'male' | 'female' | null>(null)
  const [streak,            setStreak]            = useState(0)
  const [gapDays,           setGapDays]           = useState(0)
  const [chaptersCompleted, setChaptersCompleted] = useState(0)
  const [currentChapterId,  setCurrentChapterId]  = useState(1)
  const [lastScore,         setLastScore]         = useState<number | null>(null)
  const [todayGoalDone,     setTodayGoalDone]     = useState(false)
  const [loading,           setLoading]           = useState(true)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()

      const { data: p } = await supabase
        .from('profiles')
        .select('full_name, gender')
        .eq('id', studentId)
        .maybeSingle()

      if (p?.full_name) setName(p.full_name)
      if (p?.gender)    setGender(p.gender as 'male' | 'female')

      // Section progress
      const { data: sections } = await supabase
        .from('student_lesson_progress')
        .select('chapter_id, completed_at')
        .eq('student_id', studentId)
        .order('completed_at', { ascending: false })

      // Chapters fully completed (7 sections)
      const countMap: Record<number, number> = {}
      sections?.forEach((r: any) => {
        countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1
      })
      const completed = Object.values(countMap).filter(v => v >= 7).length
      setChaptersCompleted(completed)

      // Current chapter
      const current = [1,2,3,4,5,6,7,8].find(id => (countMap[id] || 0) < 7) || 8
      setCurrentChapterId(current)

      // Today's goal — did they read anything today?
      const today = new Date().toDateString()
      const studiedToday = sections?.some((r: any) => new Date(r.completed_at).toDateString() === today)
      setTodayGoalDone(!!studiedToday)

      // Streak calculation
      if (sections?.length) {
        const studyDates = [...new Set(sections.map((r: any) => new Date(r.completed_at).toDateString()))]
        let s = 0
        const d = new Date()
        while (studyDates.includes(d.toDateString())) {
          s++
          d.setDate(d.getDate() - 1)
        }
        setStreak(s)

        // Gap days
        const lastStudied = new Date(sections[0].completed_at)
        const diffMs = Date.now() - lastStudied.getTime()
        setGapDays(Math.floor(diffMs / (1000 * 60 * 60 * 24)))
      }

      // Latest quiz score
      const { data: quiz } = await supabase
        .from('student_quiz_attempts')
        .select('score')
        .eq('student_id', studentId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (quiz?.score != null) setLastScore(quiz.score)

      setLoading(false)
    }
    load()
  }, [studentId])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '200px' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9CA3AF' }}>Loading...</p>
    </div>
  )

  const message   = getMessage(name, gender, streak, gapDays, false, lastScore)
  const earnedBadges = BADGES.filter(b => b.condition(chaptersCompleted))
  const latestBadge  = earnedBadges[earnedBadges.length - 1]
  const funFact      = FUN_FACTS[currentChapterId] || FUN_FACTS[1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

      {/* Mother's message */}
      <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '16px', padding: '18px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '8px' }}>
          💚 Message from Mummy
        </p>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'white', lineHeight: 1.6 }}>
          "{message}"
        </p>
      </div>

      {/* Streak */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>
            🔥 Study streak
          </p>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '18px', color: streak > 0 ? '#F59E0B' : '#9CA3AF' }}>
            {streak} {streak === 1 ? 'day' : 'days'}
          </span>
        </div>
        <StreakDots streak={streak}/>
      </div>

      {/* Mango tree */}
      <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '16px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '12px' }}>
          🥭 Your mango tree
        </p>
        <MangoTree chaptersCompleted={chaptersCompleted}/>
      </div>

      {/* Daily goal */}
      <div style={{ background: todayGoalDone ? '#F0FDF4' : 'white', borderRadius: '14px', border: `1px solid ${todayGoalDone ? '#D8F3DC' : '#E5E7EB'}`, padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '2px' }}>
            🎯 Today's goal
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#6B7280' }}>
            Read at least 1 section
          </p>
        </div>
        {todayGoalDone
          ? <div style={{ background: '#2D6A4F', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l3 3 7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          : <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Not yet</span>
        }
      </div>

      {/* Badge */}
      {latestBadge && (
        <div style={{ background: '#FEF3C7', borderRadius: '14px', border: '1px solid #FDE68A', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '28px' }}>{latestBadge.emoji}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#92400E', marginBottom: '2px' }}>
              🏆 {latestBadge.label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#B45309' }}>
              {latestBadge.desc}
            </p>
          </div>
        </div>
      )}

      {/* Fun fact */}
      <div style={{ background: '#F0FDF4', borderRadius: '14px', border: '1px solid #D8F3DC', padding: '14px 16px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '6px' }}>
          💡 Did you know?
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#40916C', lineHeight: 1.6 }}>
          {funFact}
        </p>
      </div>

    </div>
  )
}
