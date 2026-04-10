'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// ─── CONTENT DATA ────────────────────────────────────────────────────────────

const DAILY_SCROLL = [
  { day: 'Sun', type: 'Challenge', emoji: '🌟',
    content: 'Tell someone at home one thing you learned from your chapters this week. See if they are surprised!',
    cta: null },
  { day: 'Mon', type: 'Riddle', emoji: '🤔',
    content: 'I have no mouth but I tell stories. I have no legs but I travel the world. What am I?',
    answer: 'A book! 📚', cta: 'Tap to reveal answer' },
  { day: 'Tue', type: 'Fun fact', emoji: '💡',
    content: 'Isaac Asimov wrote his first story at age 11 — on a typewriter he found at home. You are the same age. What will you create?',
    cta: null },
  { day: 'Wed', type: 'Tongue twister', emoji: '😄',
    content: '"She sells sea shells by the sea shore and the shells she sells are surely seashells" — say it 5 times fast!',
    cta: null },
  { day: 'Thu', type: 'What if?', emoji: '🚀',
    content: 'What if you had Milkha Singh\'s determination for just one day — what would you do with it?',
    cta: null },
  { day: 'Fri', type: 'Quote', emoji: '✨',
    content: '"Whilst thus I sing, I am a king" — The Blind Boy by Colley Cibber. What does this line mean to you?',
    cta: null },
  { day: 'Sat', type: 'Did you know?', emoji: '📝',
    content: 'Walter de la Mare kept a notebook of interesting words he heard every day. Why not start your own today?',
    cta: null },
]

const CHARACTERS = [
  { chapter: 1, name: 'Dad Gilbreth',        emoji: '⏱️',
    tagline: 'Father of 12. Timed everything.',
    fun: 'If he had Instagram his bio would say: "⏱️ Efficiency expert | Father of 12 | Currently timing your scroll speed"' },
  { chapter: 2, name: 'Lord of Tartary',      emoji: '👑',
    tagline: 'Ruler of a magical kingdom.',
    fun: 'His kingdom had peacocks, tigers and zebras. What three animals would be in YOUR kingdom?' },
  { chapter: 3, name: 'Margie (Year 2157)',   emoji: '🤖',
    tagline: 'She wished she had a real school.',
    fun: 'Margie had a mechanical teacher in her bedroom and hated it. She would have loved your classroom.' },
  { chapter: 4, name: 'The Scarecrow',        emoji: '🌾',
    tagline: 'Watches everything, understands nothing.',
    fun: 'Stands in a field all day asking deep questions about seasons. Honestly, same.' },
  { chapter: 5, name: 'Milkha Singh',         emoji: '🏃',
    tagline: 'Lost everything. Became a legend.',
    fun: 'He once ran against a moving train to improve his speed. What would YOU do to get better at something you love?' },
  { chapter: 6, name: 'The Blind Boy',        emoji: '🌟',
    tagline: 'Never saw light. Never complained.',
    fun: '"Whilst thus I sing, I am a king." He had nothing — and felt like everything.' },
  { chapter: 7, name: 'The King',             emoji: '🤴',
    tagline: 'Had power. Searched for wisdom.',
    fun: 'He had an entire kingdom but could not answer three simple questions. Wisdom is not about what you have.' },
  { chapter: 8, name: 'The Train Traveller',  emoji: '🚂',
    tagline: 'Saw the world in a flash.',
    fun: '"Each a glimpse and gone forever." He found beauty in things that lasted only a second.' },
]

const READING_PERSONALITIES = [
  { min: 0, max: 0, title: 'The Explorer',            emoji: '🌱', desc: 'Your journey is just beginning. Every great reader started exactly where you are.' },
  { min: 1, max: 2, title: 'The Curious Reader',      emoji: '🔍', desc: 'You have started and that is the hardest part. Curiosity is your superpower.' },
  { min: 3, max: 4, title: 'The Story Seeker',        emoji: '📖', desc: 'You are halfway there and loving the journey. Stories are changing the way you see the world.' },
  { min: 5, max: 6, title: 'The Literary Adventurer', emoji: '🗺️', desc: 'You have explored poems, stories and biographies. Few readers your age have come this far.' },
  { min: 7, max: 7, title: 'The Champion Reader',     emoji: '🏆', desc: 'One chapter away from completing everything. You are extraordinary.' },
  { min: 8, max: 8, title: 'The Scholar',             emoji: '🎓', desc: 'You have read every single chapter. Mummy, teachers, everyone — all proud of you.' },
]

const BADGES = [
  { label: 'First Step',      emoji: '🌱', desc: 'Started first chapter',  min: 1 },
  { label: 'Story Lover',     emoji: '📖', desc: 'Completed prose',        min: 1 },
  { label: 'Poetry Explorer', emoji: '✨', desc: 'Completed poetry',       min: 2 },
  { label: 'Halfway There',   emoji: '🎯', desc: 'Completed 4 chapters',   min: 4 },
  { label: 'Scholar',         emoji: '🎓', desc: 'All 8 chapters done',    min: 8 },
]

const FUN_FACTS: Record<number, string> = {
  1: 'The real Gilbreth family had 12 children — and their dad actually timed how fast each child buttoned their shirt!',
  2: 'Walter de la Mare wrote poetry until age 83. He believed imagination never grows old.',
  3: 'Isaac Asimov wrote 500+ books. He started writing at age 11 — just like you!',
  4: 'Keki Daruwalla grew up in rural India observing nature, which inspired all his poetry.',
  5: 'Milkha Singh once ran against a moving train to push his speed. He never had a professional coach when he started.',
  6: 'Colley Cibber was made Poet Laureate of England in 1730 — one of the highest honours for a poet.',
  7: 'Tolstoy gave away all his wealth in old age because he believed simple living was the highest wisdom.',
  8: 'Stevenson wrote Treasure Island while playing with his stepson\'s toy map on a rainy afternoon.',
}

// ─── MOTHER MESSAGES ─────────────────────────────────────────────────────────

function getMessage(
  name: string,
  gender: 'male'|'female'|null,
  streak: number,
  gapDays: number,
  chaptersCompleted: number,
  lastScore: number|null,
  mood: string,
): string {
  const beta = gender === 'female' ? 'beti' : 'beta'
  const n = name.split(' ')[0]

  if (mood === 'tired')  return `Thaka hua hai ${n} ${beta}? Koi baat nahi — rest karo thoda, phir ek section padh lena 🌙`
  if (mood === 'okay')   return `Theek hai ${n} ${beta} — sometimes that is enough. Open one chapter and see how you feel 📖`
  if (mood === 'happy')  return `Mazza aa raha hai! ${n} ${beta}, yeh energy leke padhai mein laga do aaj 🔥`

  if (lastScore !== null && lastScore >= 80) return `${lastScore}% in the quiz! Shabash ${n} ${beta} — Mummy ka dil bhar aaya 🌟`
  if (lastScore !== null && lastScore < 60)  return `Koi baat nahi ${n} ${beta} — marks se zyada mehnat matters. Try again 💪`
  if (gapDays >= 2)   return `${n} ${beta}... Mummy wait kar rahi hai 🥺 Come back today — even one section, okay?`
  if (gapDays === 1)  return `Kal nahi aaya ${n} ${beta}. Koi baat nahi — aaj aa gaya, that is what matters 😊`
  if (chaptersCompleted >= 8) return `Wah ${n} ${beta}! All 8 chapters done! Mummy ka dil bhar aaya ❤️`
  if (streak >= 7)    return `${n} ${beta}, 7 din streak! Tu toh champion hai! 🏆`
  if (streak >= 3)    return `${streak} din se padh rahe ho ${n} ${beta}! Bahut achha lag raha hai 🌟`
  if (streak === 1)   return `Aaj padhai shuru ki ${n} ${beta} — bahut achha! Kal bhi aana haan? 🌱`
  return `${n} ${beta}, ready ho padhai ke liye? Mummy always believes in you 💚`
}

function getMummyChallenge(chaptersCompleted: number, currentChapterId: number): string {
  const challenges = [
    'Beta, today notice one beautiful thing around you and remember it tonight.',
    `Try to explain the story of Chapter ${currentChapterId} to someone at home in 3 sentences.`,
    'Today, use one new word you learned from your chapter in a real conversation.',
    'Ask someone older than you — what is their favourite book and why?',
    'Write down one thing from your reading that surprised you today.',
    'Read one section out loud today. It helps you remember much better!',
    'Imagine you are the author — what would YOU change about the story?',
  ]
  return challenges[chaptersCompleted % challenges.length]
}

// ─── COMPACT MANGO TREE ───────────────────────────────────────────────────────

function MangoTree({ chaptersCompleted }: { chaptersCompleted: number }) {
  const stage = Math.min(chaptersCompleted, 8)
  const labels = ['Start reading to plant your seed!','Your sapling is growing 🌱','Looking good — keep reading!','Branches forming!','Halfway to full bloom!','Flourishing! 🌿','Flowers blooming! 🌸','Green mangoes! 🟢','Ripe mangoes! You did it! 🥭']

  return (
    <div>
      <style>{`
        @keyframes sway{0%,100%{transform:rotate(-2deg)}50%{transform:rotate(2deg)}}
        @keyframes mango-pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}
        .gp-leaf{transform-origin:bottom center;animation:sway 3s ease-in-out infinite}
        .gp-mango{animation:mango-pop 0.4s ease-out forwards}
      `}</style>
      <svg viewBox="0 0 160 120" width="100%" style={{ display:'block', maxHeight:'140px' }}>
        <ellipse cx="80" cy="115" rx="34" ry="5" fill="#D8F3DC" opacity="0.7"/>
        {stage===0&&<><line x1="80" y1="115" x2="80" y2="98" stroke="#92400E" strokeWidth="3" strokeLinecap="round"/><ellipse cx="74" cy="95" rx="6" ry="3.5" fill="#74C69D" transform="rotate(-30,74,95)"/><ellipse cx="86" cy="95" rx="6" ry="3.5" fill="#74C69D" transform="rotate(30,86,95)"/></>}
        {stage>=1&&<rect x="76" y={115-(18+stage*6)} width="8" height={18+stage*6} rx="3" fill="#92400E" opacity="0.85"/>}
        {stage>=1&&stage<=2&&<><ellipse cx="80" cy={100-stage*6} rx={12+stage*5} ry={8+stage*3} fill="#40916C" opacity="0.9"/><ellipse cx="80" cy={103-stage*6} rx={9+stage*3} ry={6+stage*2} fill="#52B788"/></>}
        {stage>=3&&stage<=4&&<g><line x1="80" y1="80" x2={62-stage} y2={66-stage*3} stroke="#92400E" strokeWidth="4" strokeLinecap="round" opacity="0.8"/><line x1="80" y1="80" x2={98+stage} y2={66-stage*3} stroke="#92400E" strokeWidth="4" strokeLinecap="round" opacity="0.8"/><ellipse cx="80" cy={72-stage*4} rx={22+stage*3} ry={16+stage*2} fill="#2D6A4F" opacity="0.3"/><ellipse cx="80" cy={74-stage*4} rx={18+stage*2} ry={13+stage*2} fill="#40916C" opacity="0.85"/><ellipse cx={63-stage} cy={68-stage*4} rx="11" ry="8" fill="#52B788" opacity="0.9" className="gp-leaf"/><ellipse cx={97+stage} cy={68-stage*4} rx="11" ry="8" fill="#52B788" opacity="0.9" className="gp-leaf" style={{animationDelay:'0.6s'}}/><ellipse cx="80" cy={60-stage*4} rx="10" ry="7" fill="#74C69D" opacity="0.9" className="gp-leaf" style={{animationDelay:'1.1s'}}/></g>}
        {stage>=5&&<g><line x1="80" y1="82" x2="55" y2="62" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/><line x1="80" y1="82" x2="105" y2="62" stroke="#92400E" strokeWidth="5" strokeLinecap="round" opacity="0.8"/><line x1="80" y1="74" x2="80" y2="46" stroke="#92400E" strokeWidth="3" strokeLinecap="round" opacity="0.6"/><ellipse cx="80" cy="62" rx="42" ry="30" fill="#1B4332" opacity="0.2"/><ellipse cx="80" cy="64" rx="38" ry="26" fill="#2D6A4F" opacity="0.75"/><ellipse cx="57" cy="56" rx="16" ry="12" fill="#40916C" className="gp-leaf"/><ellipse cx="103" cy="56" rx="16" ry="12" fill="#40916C" className="gp-leaf" style={{animationDelay:'0.5s'}}/><ellipse cx="80" cy="44" rx="14" ry="10" fill="#52B788" className="gp-leaf" style={{animationDelay:'1s'}}/><ellipse cx="65" cy="70" rx="12" ry="9" fill="#52B788" className="gp-leaf" style={{animationDelay:'1.4s'}}/><ellipse cx="95" cy="70" rx="12" ry="9" fill="#52B788" className="gp-leaf" style={{animationDelay:'0.8s'}}/>
          {stage===6&&[60,100,80,70,90].map((x,i)=><circle key={i} cx={x} cy={[54,54,42,68,68][i]} r="3" fill="#FCD34D" opacity="0.9" className="gp-mango" style={{animationDelay:`${i*0.1}s`}}/>)}
          {stage>=7&&([[62,54],[98,54],[80,42],[68,68],[92,68],[76,50],[84,50]] as [number,number][]).slice(0,stage===8?7:4).map(([x,y],i)=><g key={i} className="gp-mango" style={{animationDelay:`${i*0.12}s`}}><ellipse cx={x} cy={y+4} rx="5" ry="6" fill={stage===8?'#F59E0B':'#84CC16'}/><ellipse cx={x} cy={y} rx="3" ry="3" fill={stage===8?'#D97706':'#65A30D'}/><line x1={x} y1={y-2} x2={x} y2={y-7} stroke="#92400E" strokeWidth="1.2" strokeLinecap="round"/></g>)}
        </g>}
      </svg>
      <p style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#6B7280',textAlign:'center',marginTop:'4px'}}>{labels[stage]}</p>
      <div style={{display:'flex',justifyContent:'center',gap:'4px',marginTop:'6px'}}>
        {Array.from({length:8}).map((_,i)=><div key={i} style={{width:'6px',height:'6px',borderRadius:'50%',background:i<stage?'#2D6A4F':'#E5E7EB',transition:'background 0.3s'}}/>)}
      </div>
    </div>
  )
}

// ─── STREAK DOTS ─────────────────────────────────────────────────────────────

function StreakDots({ streak }: { streak: number }) {
  const days = ['M','T','W','T','F','S','S']
  const todayIdx = new Date().getDay()===0?6:new Date().getDay()-1
  return (
    <div style={{display:'flex',gap:'4px',justifyContent:'space-between'}}>
      {days.map((d,i)=>{
        const studied=(todayIdx-i+7)%7<streak
        const isToday=i===todayIdx
        return (
          <div key={i} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'3px',flex:1}}>
            <div style={{width:'28px',height:'28px',borderRadius:'50%',background:studied?'#2D6A4F':isToday?'#D8F3DC':'#F3F4F6',border:isToday&&!studied?'2px solid #2D6A4F':'none',display:'flex',alignItems:'center',justifyContent:'center',transition:'all 0.3s'}}>
              {studied&&<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              {isToday&&!studied&&<div style={{width:'5px',height:'5px',borderRadius:'50%',background:'#2D6A4F'}}/>}
            </div>
            <p style={{fontFamily:'var(--font-body)',fontSize:'9px',color:'#9CA3AF'}}>{d}</p>
          </div>
        )
      })}
    </div>
  )
}

// ─── CONFETTI ────────────────────────────────────────────────────────────────

function Confetti({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t) }, [onDone])
  const pieces = Array.from({length:24}).map((_,i)=>({
    x: Math.random()*100, color:['#F59E0B','#2D6A4F','#74C69D','#EF4444','#6366F1','#EC4899'][i%6],
    delay: Math.random()*0.5, size: 6+Math.random()*8,
  }))
  return (
    <div style={{position:'fixed',inset:0,zIndex:999,pointerEvents:'none',overflow:'hidden'}}>
      <style>{`@keyframes confetti-fall{0%{transform:translateY(-20px) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}`}</style>
      {pieces.map((p,i)=>(
        <div key={i} style={{position:'absolute',left:`${p.x}%`,top:0,width:`${p.size}px`,height:`${p.size}px`,background:p.color,borderRadius:'2px',animation:`confetti-fall 3s ease-in ${p.delay}s forwards`}}/>
      ))}
      <div style={{position:'absolute',inset:0,display:'flex',alignItems:'center',justifyContent:'center',pointerEvents:'none'}}>
        <div style={{background:'white',borderRadius:'20px',padding:'32px 40px',textAlign:'center',boxShadow:'0 20px 60px rgba(0,0,0,0.2)',animation:'none'}}>
          <p style={{fontSize:'48px',marginBottom:'12px'}}>🎉</p>
          <p style={{fontFamily:'var(--font-heading)',fontWeight:900,fontSize:'22px',color:'#1B4332',marginBottom:'6px'}}>Chapter complete!</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:'14px',color:'#6B7280'}}>Mummy is so proud of you 💚</p>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PANEL ──────────────────────────────────────────────────────────────

export default function StudentDashboardPanel({ studentId }: { studentId: string }) {
  const [name,               setName]               = useState('Student')
  const [gender,             setGender]             = useState<'male'|'female'|null>(null)
  const [streak,             setStreak]             = useState(0)
  const [gapDays,            setGapDays]            = useState(0)
  const [chaptersCompleted,  setChaptersCompleted]  = useState(0)
  const [currentChapterId,   setCurrentChapterId]   = useState(1)
  const [lastScore,          setLastScore]          = useState<number|null>(null)
  const [todayGoalDone,      setTodayGoalDone]      = useState(false)
  const [mood,               setMood]               = useState('')
  const [showAnswer,         setShowAnswer]         = useState(false)
  const [showConfetti,       setShowConfetti]       = useState(false)
  const [prevCompleted,      setPrevCompleted]      = useState(-1)
  const [loading,            setLoading]            = useState(true)
  const [factOpen,           setFactOpen]           = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: p } = await supabase.from('profiles').select('full_name,gender').eq('id', studentId).maybeSingle()
      if (p?.full_name) setName(p.full_name)
      if (p?.gender)    setGender(p.gender as 'male'|'female')

      const { data: secs } = await supabase
        .from('student_lesson_progress').select('chapter_id,completed_at')
        .eq('student_id', studentId).order('completed_at', { ascending: false })

      const countMap: Record<number,number> = {}
      secs?.forEach((r: any) => { countMap[r.chapter_id] = (countMap[r.chapter_id]||0)+1 })

      const completed = Object.values(countMap).filter(v=>v>=7).length
      setChaptersCompleted(completed)
      if (prevCompleted>=0 && completed>prevCompleted) setShowConfetti(true)
      setPrevCompleted(completed)

      const current = [1,2,3,4,5,6,7,8].find(id=>(countMap[id]||0)<7)||8
      setCurrentChapterId(current)

      const today = new Date().toDateString()
      setTodayGoalDone(!!secs?.some((r:any)=>new Date(r.completed_at).toDateString()===today))

      if (secs?.length) {
        const dates = [...new Set(secs.map((r:any)=>new Date(r.completed_at).toDateString()))]
        let s=0; const d=new Date()
        while (dates.includes(d.toDateString())) { s++; d.setDate(d.getDate()-1) }
        setStreak(s)
        setGapDays(Math.floor((Date.now()-new Date(secs[0].completed_at).getTime())/86400000))
      }

      const { data: quiz } = await supabase.from('student_quiz_attempts').select('score')
        .eq('student_id',studentId).order('created_at',{ascending:false}).limit(1).maybeSingle()
      if (quiz?.score!=null) setLastScore(quiz.score)

      setLoading(false)
    }
    load()
  }, [studentId])

  if (loading) return <div style={{height:'200px',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#9CA3AF'}}>Loading...</p></div>

  const message    = getMessage(name, gender, streak, gapDays, chaptersCompleted, lastScore, mood)
  const challenge  = getMummyChallenge(chaptersCompleted, currentChapterId)
  const dayOfWeek  = new Date().getDay()
  const todayScroll= DAILY_SCROLL[dayOfWeek]
  const character  = CHARACTERS.find(c=>c.chapter===currentChapterId)||CHARACTERS[0]
  const personality= READING_PERSONALITIES.find(p=>chaptersCompleted>=p.min&&chaptersCompleted<=p.max)||READING_PERSONALITIES[0]
  const earnedBadges = BADGES.filter(b=>chaptersCompleted>=b.min)

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>

      {showConfetti && <Confetti onDone={()=>setShowConfetti(false)}/>}

      {/* ── Mood check ── */}
      {!mood && (
        <div style={{background:'white',borderRadius:'14px',border:'1px solid #E5E7EB',padding:'16px'}}>
          <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'13px',color:'#1B4332',marginBottom:'12px'}}>How are you feeling today?</p>
          <div style={{display:'flex',gap:'8px'}}>
            {[{key:'happy',label:'😊 Happy'},{key:'okay',label:'😐 Okay'},{key:'tired',label:'😴 Tired'}].map(m=>(
              <button key={m.key} onClick={()=>setMood(m.key)}
                style={{flex:1,padding:'10px 6px',borderRadius:'10px',border:'1.5px solid #E5E7EB',background:'white',cursor:'pointer',fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'12px',color:'#374151',transition:'all 0.15s'}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor='#2D6A4F';e.currentTarget.style.background='#F0FDF4'}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor='#E5E7EB';e.currentTarget.style.background='white'}}>
                {m.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Mother's message + challenge ── */}
      <div style={{background:'linear-gradient(135deg,#1B4332,#2D6A4F)',borderRadius:'14px',padding:'16px'}}>
        <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#74C69D',textTransform:'uppercase',letterSpacing:'0.07em',marginBottom:'6px'}}>💚 Message from Mummy</p>
        <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'13px',color:'white',lineHeight:1.6,marginBottom:'12px'}}>"{message}"</p>
        {mood && (
          <button onClick={()=>setMood('')} style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'rgba(255,255,255,0.45)',background:'none',border:'none',cursor:'pointer',padding:0,marginBottom:'10px'}}>
            Change mood
          </button>
        )}
        <div style={{background:'rgba(255,255,255,0.1)',borderRadius:'10px',padding:'12px'}}>
          <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'rgba(255,255,255,0.6)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'5px'}}>🎯 Mummy's challenge today</p>
          <p style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'rgba(255,255,255,0.85)',lineHeight:1.6}}>{challenge}</p>
        </div>
      </div>

      {/* ── Reading personality ── */}
      <div style={{background:'linear-gradient(135deg,#FEF3C7,#FDE68A)',borderRadius:'14px',border:'1px solid #FCD34D',padding:'16px'}}>
        <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#92400E',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'6px'}}>🌟 Your reading personality</p>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'6px'}}>
          <span style={{fontSize:'24px'}}>{personality.emoji}</span>
          <p style={{fontFamily:'var(--font-heading)',fontWeight:800,fontSize:'16px',color:'#78350F'}}>{personality.title}</p>
        </div>
        <p style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#92400E',lineHeight:1.6}}>{personality.desc}</p>
      </div>

      {/* ── Streak + Today goal ── */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'8px'}}>
        <div style={{background:'white',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'12px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'2px'}}>
            <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'11px',color:'#1B4332'}}>🔥 Streak</p>
            <p style={{fontFamily:'var(--font-heading)',fontWeight:800,fontSize:'20px',color:streak>0?'#F59E0B':'#D1D5DB'}}>{streak}</p>
          </div>
          <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#9CA3AF'}}>days in a row</p>
        </div>
        <div style={{background:todayGoalDone?'#F0FDF4':'white',borderRadius:'12px',border:`1px solid ${todayGoalDone?'#D8F3DC':'#E5E7EB'}`,padding:'12px'}}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'2px'}}>
            <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'11px',color:'#1B4332'}}>🎯 Today</p>
            {todayGoalDone
              ?<div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#2D6A4F',display:'flex',alignItems:'center',justifyContent:'center'}}><svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
              :<div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#F3F4F6'}}/>}
          </div>
          <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:todayGoalDone?'#2D6A4F':'#9CA3AF'}}>{todayGoalDone?'Done! 🎉':'Read 1 section'}</p>
        </div>
      </div>

      {/* ── Week view ── */}
      <div style={{background:'white',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'14px'}}>
        <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'11px',color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px'}}>This week</p>
        <StreakDots streak={streak}/>
      </div>

      {/* ── Mango tree ── */}
      <div style={{background:'white',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'14px'}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:'10px'}}>
          <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'12px',color:'#1B4332'}}>🥭 Your mango tree</p>
          <span style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#9CA3AF'}}>{chaptersCompleted}/8</span>
        </div>
        <MangoTree chaptersCompleted={chaptersCompleted}/>
      </div>

      {/* ── Daily scroll ── */}
      <div style={{background:'white',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'14px'}}>
        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'8px'}}>
          <span style={{fontSize:'18px'}}>{todayScroll.emoji}</span>
          <div>
            <p style={{fontFamily:'var(--font-body)',fontSize:'9px',color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.06em'}}>Today · {todayScroll.type}</p>
            <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'12px',color:'#1B4332'}}>Daily Scroll 📜</p>
          </div>
        </div>
        <p style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#374151',lineHeight:1.7,marginBottom:'8px'}}>{todayScroll.content}</p>
        {'answer' in todayScroll && todayScroll.answer && (
          <>
            {!showAnswer
              ?<button onClick={()=>setShowAnswer(true)} style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'12px',color:'#2D6A4F',background:'#F0FDF4',border:'1px solid #D8F3DC',borderRadius:'8px',padding:'6px 14px',cursor:'pointer'}}>
                Tap to reveal answer
              </button>
              :<div style={{background:'#F0FDF4',borderRadius:'8px',padding:'8px 12px'}}>
                <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'13px',color:'#1B4332'}}>{todayScroll.answer}</p>
              </div>}
          </>
        )}
      </div>

      {/* ── Word of the day ── */}
      <div style={{background:'#EEF2FF',borderRadius:'12px',border:'1px solid #C7D2FE',padding:'14px'}}>
        <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#4338CA',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>📝 Word of the day</p>
        {(() => {
          const words: Record<number,{word:string;meaning:string;example:string}> = {
            1:{word:'Efficiency',meaning:'Doing something in the best way without wasting time or effort',example:'"With great efficiency, she finished her homework before dinner."'},
            2:{word:'Flaunt',meaning:'To show off something proudly',example:'"The peacock began to flaunt its beautiful feathers."'},
            3:{word:'Scornful',meaning:'Feeling that something is worthless or beneath you',example:'"He gave a scornful look when asked to clean his room."'},
            4:{word:'Resilience',meaning:'The ability to bounce back from difficulties',example:'"Despite failing once, her resilience helped her succeed."'},
            5:{word:'Determination',meaning:'Firmness of purpose — not giving up',example:'"With determination, he practised every single day."'},
            6:{word:'Contentment',meaning:'Being happy and satisfied with what you have',example:'"She felt contentment sitting under the tree with a good book."'},
            7:{word:'Empathy',meaning:'Understanding and sharing the feelings of another person',example:'"He showed empathy by listening carefully to his friend."'},
            8:{word:'Fleeting',meaning:'Lasting for only a very short time',example:'"The beautiful sunset was fleeting — gone in minutes."'},
          }
          const w = words[currentChapterId]||words[1]
          return (
            <>
              <p style={{fontFamily:'var(--font-heading)',fontWeight:900,fontSize:'20px',color:'#3730A3',marginBottom:'4px'}}>{w.word}</p>
              <p style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#4338CA',marginBottom:'8px',lineHeight:1.5}}>{w.meaning}</p>
              <div style={{background:'rgba(255,255,255,0.6)',borderRadius:'8px',padding:'8px 10px'}}>
                <p style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#6366F1',lineHeight:1.5,fontStyle:'italic'}}>{w.example}</p>
              </div>
              <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#818CF8',marginTop:'8px'}}>💬 Can you use this word before dinner today?</p>
            </>
          )
        })()}
      </div>

      {/* ── Character of the week ── */}
      <div style={{background:'#FFF7ED',borderRadius:'12px',border:'1px solid #FED7AA',padding:'14px'}}>
        <p style={{fontFamily:'var(--font-body)',fontSize:'10px',color:'#C2410C',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'8px'}}>🎭 Character of the week</p>
        <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
          <span style={{fontSize:'28px'}}>{character.emoji}</span>
          <div>
            <p style={{fontFamily:'var(--font-heading)',fontWeight:800,fontSize:'15px',color:'#7C2D12'}}>{character.name}</p>
            <p style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#C2410C'}}>{character.tagline}</p>
          </div>
        </div>
        <p style={{fontFamily:'var(--font-body)',fontSize:'12px',color:'#9A3412',lineHeight:1.7}}>{character.fun}</p>
      </div>

      {/* ── Fun fact (tap to reveal) ── */}
      <div onClick={()=>setFactOpen(o=>!o)} style={{background:factOpen?'#F0FDF4':'#F8FAFC',borderRadius:'12px',border:`1px solid ${factOpen?'#D8F3DC':'#E5E7EB'}`,padding:'14px',cursor:'pointer',transition:'all 0.2s'}}>
        <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'12px',color:'#1B4332',marginBottom:'6px'}}>
          💡 Fun fact {!factOpen&&<span style={{fontFamily:'var(--font-body)',fontWeight:400,color:'#9CA3AF',fontSize:'10px'}}>— tap to reveal</span>}
        </p>
        {factOpen
          ?<p style={{fontFamily:'var(--font-body)',fontSize:'13px',color:'#374151',lineHeight:1.7}}>{FUN_FACTS[currentChapterId]||FUN_FACTS[1]}</p>
          :<div style={{height:'10px',background:'#E5E7EB',borderRadius:'5px',width:'75%'}}/>}
      </div>

      {/* ── Badges ── */}
      <div style={{background:'white',borderRadius:'12px',border:'1px solid #E5E7EB',padding:'14px'}}>
        <p style={{fontFamily:'var(--font-heading)',fontWeight:700,fontSize:'11px',color:'#9CA3AF',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:'10px'}}>🏆 Badges</p>
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          {BADGES.map(b=>{
            const earned=chaptersCompleted>=b.min
            return (
              <div key={b.label} title={`${b.label} — ${b.desc}`} style={{width:'46px',height:'46px',borderRadius:'12px',background:earned?'#F0FDF4':'#F9FAFB',border:`1.5px solid ${earned?'#D8F3DC':'#F3F4F6'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:earned?'22px':'18px',opacity:earned?1:0.3,filter:earned?'none':'grayscale(100%)',transition:'all 0.2s',cursor:'default'}}>
                {b.emoji}
              </div>
            )
          })}
        </div>
        {earnedBadges.length>0&&(
          <p style={{fontFamily:'var(--font-body)',fontSize:'11px',color:'#2D6A4F',marginTop:'8px'}}>{earnedBadges.length} of {BADGES.length} badges earned</p>
        )}
      </div>

    </div>
  )
}
