'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// ── Mother messages ──────────────────────────────────────────────────────────

function getMessage(
  name: string,
  gender: 'male' | 'female' | null,
  streak: number,
  gapDays: number,
  chaptersCompleted: number,
  lastScore: number | null,
): string {
  const beta = gender === 'female' ? 'beti' : 'beta'
  const n = name.split(' ')[0]
  if (lastScore !== null && lastScore >= 80) return `${lastScore}% in the quiz! Shabash ${n} ${beta}! Mummy is so proud 🌟`
  if (lastScore !== null && lastScore < 60) return `Koi baat nahi ${n} ${beta} — marks se zyada mehnat matters. Try again! 💪`
  if (gapDays >= 2) return `${n} ${beta}... Mummy is waiting 🥺 Come back today — even one section, okay?`
  if (gapDays === 1) return `Kal nahi aaya ${n} ${beta}. Koi baat nahi — aaj aa gaya, that is what matters 😊`
  if (chaptersCompleted >= 8) return `Wah ${n} ${beta}! All chapters done! Mummy ka dil bhar aaya ❤️`
  if (streak >= 7) return `${n} ${beta}, 7 din streak! Tu toh champion hai! 🏆`
  if (streak >= 3) return `${streak} din se padh rahe ho ${n} ${beta}! Bahut achha lag raha hai 🌟`
  if (streak === 1) return `Aaj padhai shuru ki ${n} ${beta} — bahut achha! Kal bhi aana haan? 🌱`
  return `${n} ${beta}, ready ho padhai ke liye? Mummy always believes in you 💚`
}

// ── Compact Mango Tree ───────────────────────────────────────────────────────

function MangoTree({ chaptersCompleted }: { chaptersCompleted: number }) {
  const stage = Math.min(chaptersCompleted, 8)
  const [hovered, setHovered] = useState(false)

  const stageLabel = [
    'Start reading to plant your seed!',
    'Your sapling is growing 🌱',
    'Looking good — keep reading!',
    'Your tree has branches now!',
    'Halfway there — beautiful tree!',
    'Your tree is flourishing!',
    'Flowers are blooming! 🌸',
    'Green mangoes appearing! 🟢',
    'Ripe mangoes! You did it! 🥭',
  ][stage]

  return (
    <div
      style={{ position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <style>{`
        @keyframes sway { 0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)} }
        @keyframes mango-in { from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1} }
        @keyframes pulse-tree { 0%,100%{filter:drop-shadow(0 0 0px #74C69D)}50%{filter:drop-shadow(0 0 8px #74C69D)} }
        .gp-leaf { transform-origin: bottom center; animation: sway 3s ease-in-out infinite; }
        .gp-mango { animation: mango-in 0.4s ease-out forwards; }
        .gp-tree-hover { animation: pulse-tree 1.5s ease-in-out infinite; }
      `}</style>

      <svg viewBox="0 0 160 130" width="100%" style={{ display: 'block', maxHeight: '160px' }}>

        {/* Ground shadow */}
        <ellipse cx="80" cy="124" rx="36" ry="5" fill="#D8F3DC" opacity="0.7"/>

        {/* Trunk — grows with stage */}
        {stage > 0 && (
          <rect x="75" y={124 - (20 + stage * 7)} width="10" height={20 + stage * 7}
            rx="3" fill="#92400E" opacity="0.85"/>
        )}

        {/* Seedling */}
        {stage === 0 && (
          <>
            <line x1="80" y1="124" x2="80" y2="105" stroke="#92400E" strokeWidth="3" strokeLinecap="round"/>
            <ellipse cx="74" cy="102" rx="6" ry="3.5" fill="#74C69D" transform="rotate(-30,74,102)"/>
            <ellipse cx="86" cy="102" rx="6" ry="3.5" fill="#74C69D" transform="rotate(30,86,102)"/>
          </>
        )}

        {/* Stage 1-2: small bush */}
        {stage >= 1 && stage <= 2 && (
          <g className={hovered ? 'gp-tree-hover' : ''}>
            <ellipse cx="80" cy={105 - stage * 5} rx={14 + stage * 4} ry={10 + stage * 3} fill="#40916C" opacity="0.9"/>
            <ellipse cx="80" cy={108 - stage * 5} rx={10 + stage * 3} ry={7 + stage * 2} fill="#52B788"/>
          </g>
        )}

        {/* Stage 3-4: growing tree */}
        {stage >= 3 && stage <= 4 && (
          <g className={hovered ? 'gp-tree-hover' : ''}>
            {/* Branches */}
            <line x1="80" y1={124 - (20 + stage*7)} x2={80 - 18 - stage*2} y2={90 - stage*4} stroke="#92400E" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
            <line x1="80" y1={124 - (20 + stage*7)} x2={80 + 18 + stage*2} y2={90 - stage*4} stroke="#92400E" strokeWidth="4" strokeLinecap="round" opacity="0.8"/>
            {/* Canopy */}
            <ellipse cx="80" cy={85 - stage*4} rx={24 + stage*4} ry={18 + stage*3} fill="#2D6A4F" opacity="0.3"/>
            <ellipse cx="80" cy={87 - stage*4} rx={20 + stage*3} ry={15 + stage*2} fill="#40916C" opacity="0.8"/>
            <ellipse cx="65" cy={82 - stage*4} rx="12" ry="9" fill="#52B788" opacity="0.9" className="gp-leaf" style={{animationDelay:'0.3s'}}/>
            <ellipse cx="95" cy={82 - stage*4} rx="12" ry="9" fill="#52B788" opacity="0.9" className="gp-leaf" style={{animationDelay:'0.7s'}}/>
            <ellipse cx="80" cy={76 - stage*4} rx="10" ry="8" fill="#74C69D" opacity="0.9" className="gp-leaf" style={{animationDelay:'1s'}}/>
          </g>
        )}

        {/* Stage 5-6: full tree */}
        {stage >= 5 && stage <= 6 && (
          <g className={hovered ? 'gp-tree-hover' : ''}>
            <line x1="80" y1="73" x2="55" y2="55" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
            <line x1="80" y1="73" x2="105" y2="55" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
            <line x1="80" y1="65" x2="80" y2="42" stroke="#92400E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            <ellipse cx="80" cy="55" rx="42" ry="30" fill="#1B4332" opacity="0.25"/>
            <ellipse cx="80" cy="57" rx="38" ry="27" fill="#2D6A4F" opacity="0.7"/>
            <ellipse cx="58" cy="50" rx="16" ry="12" fill="#40916C" className="gp-leaf" style={{animationDelay:'0s'}}/>
            <ellipse cx="102" cy="50" rx="16" ry="12" fill="#40916C" className="gp-leaf" style={{animationDelay:'0.5s'}}/>
            <ellipse cx="80" cy="40" rx="14" ry="10" fill="#52B788" className="gp-leaf" style={{animationDelay:'1s'}}/>
            <ellipse cx="65" cy="62" rx="12" ry="9" fill="#52B788" className="gp-leaf" style={{animationDelay:'1.5s'}}/>
            <ellipse cx="95" cy="62" rx="12" ry="9" fill="#52B788" className="gp-leaf" style={{animationDelay:'0.8s'}}/>
            {/* Flowers for stage 6 */}
            {stage === 6 && [
              [60,48],[100,48],[80,36],[70,60],[90,60]
            ].map(([x,y],i) => (
              <circle key={i} cx={x} cy={y} r="3" fill="#FCD34D" opacity="0.9" className="gp-mango" style={{animationDelay:`${i*0.1}s`}}/>
            ))}
          </g>
        )}

        {/* Stage 7-8: mangoes */}
        {stage >= 7 && (
          <g className={hovered ? 'gp-tree-hover' : ''}>
            <line x1="80" y1="75" x2="52" y2="52" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
            <line x1="80" y1="75" x2="108" y2="52" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/>
            <line x1="80" y1="65" x2="80" y2="38" stroke="#92400E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
            <ellipse cx="80" cy="54" rx="44" ry="32" fill="#1B4332" opacity="0.2"/>
            <ellipse cx="80" cy="56" rx="40" ry="28" fill="#2D6A4F" opacity="0.75"/>
            <ellipse cx="56" cy="48" rx="18" ry="13" fill="#40916C" className="gp-leaf"/>
            <ellipse cx="104" cy="48" rx="18" ry="13" fill="#40916C" className="gp-leaf" style={{animationDelay:'0.6s'}}/>
            <ellipse cx="80" cy="36" rx="15" ry="11" fill="#52B788" className="gp-leaf" style={{animationDelay:'1.1s'}}/>
            <ellipse cx="64" cy="62" rx="13" ry="10" fill="#52B788" className="gp-leaf" style={{animationDelay:'0.4s'}}/>
            <ellipse cx="96" cy="62" rx="13" ry="10" fill="#52B788" className="gp-leaf" style={{animationDelay:'0.9s'}}/>
            {/* Mangoes */}
            {[
              [62,46],[98,46],[80,34],[68,60],[92,60],[76,50],[84,50],
            ].slice(0, stage === 8 ? 7 : 4).map(([x,y],i) => (
              <g key={i} className="gp-mango" style={{animationDelay:`${i*0.12}s`}}>
                <ellipse cx={x} cy={y+4} rx="5" ry="6.5" fill={stage === 8 ? '#F59E0B' : '#84CC16'}/>
                <ellipse cx={x} cy={y} rx="3" ry="3" fill={stage === 8 ? '#D97706' : '#65A30D'}/>
                <line x1={x} y1={y-2} x2={x} y2={y-7} stroke="#92400E" strokeWidth="1.2" strokeLinecap="round"/>
              </g>
            ))}
          </g>
        )}
      </svg>

      {/* Stage label */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#6B7280', textAlign: 'center', marginTop: '4px', lineHeight: 1.4 }}>
        {stageLabel}
      </p>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '8px' }}>
        {Array.from({length: 8}).map((_, i) => (
          <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: i < stage ? '#2D6A4F' : '#E5E7EB', transition: 'background 0.3s' }}/>
        ))}
      </div>
    </div>
  )
}

// ── Streak dots ──────────────────────────────────────────────────────────────

function StreakDots({ streak }: { streak: number }) {
  const days = ['M','T','W','T','F','S','S']
  const today = new Date().getDay()
  const todayIdx = today === 0 ? 6 : today - 1

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'space-between' }}>
      {days.map((day, i) => {
        const daysAgo = (todayIdx - i + 7) % 7
        const studied = daysAgo < streak
        const isToday = i === todayIdx
        return (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px', flex: 1 }}>
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: studied ? '#2D6A4F' : isToday ? '#D8F3DC' : '#F3F4F6',
              border: isToday && !studied ? '2px solid #2D6A4F' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s',
            }}>
              {studied && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {isToday && !studied && (
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#2D6A4F' }}/>
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
  1: 'The real Gilbreth family had 12 children — and their dad timed how fast each child could button a shirt!',
  2: 'Walter de la Mare wrote poetry until age 83. He believed imagination never grows old.',
  3: 'Isaac Asimov wrote 500+ books. He started writing at age 11 — just like you!',
  4: 'Keki Daruwalla grew up observing nature in rural India, which inspired all his poems.',
  5: 'Milkha Singh once ran against a moving train to improve his speed!',
  6: 'Colley Cibber became Poet Laureate of England — the highest honour for a poet.',
  7: 'Tolstoy gave away all his wealth in old age because he believed simple living was the highest wisdom.',
  8: 'Stevenson wrote Treasure Island while playing with his stepson\'s toy map on a rainy afternoon!',
}

const BADGES = [
  { label: 'First Step',      emoji: '🌱', desc: 'Started your first chapter',  condition: (c: number) => c >= 1 },
  { label: 'Story Lover',     emoji: '📖', desc: 'Completed a prose chapter',   condition: (c: number) => c >= 1 },
  { label: 'Poetry Explorer', emoji: '✨', desc: 'Completed a poetry chapter',  condition: (c: number) => c >= 2 },
  { label: 'Halfway There',   emoji: '🎯', desc: 'Completed 4 chapters',         condition: (c: number) => c >= 4 },
  { label: 'Scholar',         emoji: '🎓', desc: 'Completed all 8 chapters',    condition: (c: number) => c >= 8 },
]

// ── Main panel ───────────────────────────────────────────────────────────────

export default function StudentDashboardPanel({ studentId }: { studentId: string }) {
  const [name,              setName]              = useState('Student')
  const [gender,            setGender]            = useState<'male'|'female'|null>(null)
  const [streak,            setStreak]            = useState(0)
  const [gapDays,           setGapDays]           = useState(0)
  const [chaptersCompleted, setChaptersCompleted] = useState(0)
  const [currentChapterId,  setCurrentChapterId]  = useState(1)
  const [lastScore,         setLastScore]         = useState<number|null>(null)
  const [todayGoalDone,     setTodayGoalDone]     = useState(false)
  const [loading,           setLoading]           = useState(true)
  const [activeFact,        setActiveFact]        = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: p } = await supabase.from('profiles').select('full_name, gender').eq('id', studentId).maybeSingle()
      if (p?.full_name) setName(p.full_name)
      if (p?.gender)    setGender(p.gender as 'male'|'female')

      const { data: secs } = await supabase
        .from('student_lesson_progress')
        .select('chapter_id, completed_at')
        .eq('student_id', studentId)
        .order('completed_at', { ascending: false })

      const countMap: Record<number,number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id] || 0) + 1 })

      const completed = Object.values(countMap).filter(v => v >= 7).length
      setChaptersCompleted(completed)

      const current = [1,2,3,4,5,6,7,8].find(id => (countMap[id] || 0) < 7) || 8
      setCurrentChapterId(current)

      const today = new Date().toDateString()
      setTodayGoalDone(!!secs?.some((r: any) => new Date(r.completed_at).toDateString() === today))

      // Streak
      if (secs?.length) {
        const dates = [...new Set(secs.map((r: any) => new Date(r.completed_at).toDateString()))]
        let s = 0
        const d = new Date()
        while (dates.includes(d.toDateString())) { s++; d.setDate(d.getDate() - 1) }
        setStreak(s)
        const last = new Date(secs[0].completed_at)
        setGapDays(Math.floor((Date.now() - last.getTime()) / 86400000))
      }

      const { data: quiz } = await supabase
        .from('student_quiz_attempts').select('score')
        .eq('student_id', studentId).order('created_at', { ascending: false }).limit(1).maybeSingle()
      if (quiz?.score != null) setLastScore(quiz.score)

      setLoading(false)
    }
    load()
  }, [studentId])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '120px' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>Loading...</p>
    </div>
  )

  const message      = getMessage(name, gender, streak, gapDays, chaptersCompleted, lastScore)
  const earnedBadges = BADGES.filter(b => b.condition(chaptersCompleted))
  const latestBadge  = earnedBadges[earnedBadges.length - 1]
  const funFact      = FUN_FACTS[currentChapterId] || FUN_FACTS[1]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

      {/* Mother's message */}
      <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '14px', padding: '16px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '7px' }}>
          💚 Message from Mummy
        </p>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', lineHeight: 1.6 }}>
          "{message}"
        </p>
      </div>

      {/* Streak + goal in one row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332' }}>🔥 Streak</p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: streak > 0 ? '#F59E0B' : '#D1D5DB' }}>{streak}</p>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: '#9CA3AF' }}>{streak === 1 ? 'day in a row' : 'days in a row'}</p>
        </div>
        <div style={{ background: todayGoalDone ? '#F0FDF4' : 'white', borderRadius: '12px', border: `1px solid ${todayGoalDone ? '#D8F3DC' : '#E5E7EB'}`, padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332' }}>🎯 Today</p>
            {todayGoalDone
              ? <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#2D6A4F', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              : <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#F3F4F6' }}/>
            }
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: todayGoalDone ? '#2D6A4F' : '#9CA3AF' }}>
            {todayGoalDone ? 'Goal done! 🎉' : 'Read 1 section'}
          </p>
        </div>
      </div>

      {/* Streak week view */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '14px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
          This week
        </p>
        <StreakDots streak={streak}/>
      </div>

      {/* Mango tree */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332' }}>
            🥭 Your mango tree
          </p>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
            {chaptersCompleted}/8 chapters
          </span>
        </div>
        <MangoTree chaptersCompleted={chaptersCompleted}/>
      </div>

      {/* Badge */}
      {latestBadge && (
        <div style={{ background: '#FEF3C7', borderRadius: '12px', border: '1px solid #FDE68A', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px', flexShrink: 0 }}>{latestBadge.emoji}</span>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#92400E', marginBottom: '1px' }}>
              🏆 {latestBadge.label}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#B45309' }}>{latestBadge.desc}</p>
          </div>
        </div>
      )}

      {/* All badges */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '14px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px' }}>
          Badges
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {BADGES.map(badge => {
            const earned = badge.condition(chaptersCompleted)
            return (
              <div key={badge.label} title={badge.desc} style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: earned ? '#F0FDF4' : '#F9FAFB',
                border: earned ? '1.5px solid #D8F3DC' : '1.5px solid #F3F4F6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: earned ? '22px' : '16px',
                opacity: earned ? 1 : 0.35,
                filter: earned ? 'none' : 'grayscale(100%)',
                transition: 'all 0.2s',
                cursor: 'default',
              }}>
                {badge.emoji}
              </div>
            )
          })}
        </div>
      </div>

      {/* Fun fact — tappable to reveal */}
      <div
        onClick={() => setActiveFact(f => !f)}
        style={{ background: activeFact ? '#F0FDF4' : '#F8FAFC', borderRadius: '12px', border: `1px solid ${activeFact ? '#D8F3DC' : '#E5E7EB'}`, padding: '14px', cursor: 'pointer', transition: 'all 0.2s' }}
      >
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#1B4332', marginBottom: '6px' }}>
          💡 Did you know? {!activeFact && <span style={{ fontFamily: 'var(--font-body)', fontWeight: 400, color: '#9CA3AF', fontSize: '11px' }}>tap to reveal</span>}
        </p>
        {activeFact
          ? <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', lineHeight: 1.6 }}>{funFact}</p>
          : <div style={{ height: '12px', background: '#E5E7EB', borderRadius: '6px', width: '80%' }}/>
        }
      </div>

    </div>
  )
}
