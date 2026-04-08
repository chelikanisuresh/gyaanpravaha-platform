'use client'

import { useState } from 'react'
import Link from 'next/link'

const GK_QUESTIONS = [
  {
    id: 1, category: 'Science',
    question: 'Which gas do plants absorb from the atmosphere during photosynthesis?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    answer: 2,
    explanation: 'Plants absorb Carbon Dioxide (CO₂) from the atmosphere and use it along with sunlight and water to make food through a process called photosynthesis. They release oxygen as a byproduct — which is what we breathe!'
  },
  {
    id: 2, category: 'History',
    question: 'Who gave the famous slogan "Do or Die" during the Quit India Movement?',
    options: ['Jawaharlal Nehru', 'Bhagat Singh', 'Mahatma Gandhi', 'Subhas Chandra Bose'],
    answer: 2,
    explanation: 'Mahatma Gandhi gave the famous slogan "Do or Die" (Karo ya Maro) during the Quit India Movement in 1942. He urged Indians to either free India or die trying. The movement became one of the most powerful in the fight for independence.'
  },
  {
    id: 3, category: 'Geography',
    question: 'Which is the longest river in India?',
    options: ['Yamuna', 'Ganga', 'Godavari', 'Brahmaputra'],
    answer: 1,
    explanation: 'The Ganga (Ganges) is the longest river in India, stretching about 2,525 km. It flows from the Gangotri glacier in the Himalayas all the way to the Bay of Bengal. It is also considered sacred in Hinduism.'
  },
  {
    id: 4, category: 'Science',
    question: 'What is the closest star to Earth?',
    options: ['Sirius', 'Alpha Centauri', 'The Sun', 'Proxima Centauri'],
    answer: 2,
    explanation: 'The Sun is the closest star to Earth, at a distance of about 150 million kilometres. It provides the light and heat that makes life on Earth possible. After the Sun, the next closest star is Proxima Centauri — about 4.24 light years away!'
  },
  {
    id: 5, category: 'Sports',
    question: 'Who is known as "The Flying Sikh" in Indian athletics?',
    options: ['P.T. Usha', 'Milkha Singh', 'Neeraj Chopra', 'Abhinav Bindra'],
    answer: 1,
    explanation: 'Milkha Singh is known as "The Flying Sikh." He earned this title after his incredible performance in Pakistan in 1960 where he broke the world record. The Pakistani leader said "Milkha, you didn\'t run today — you flew!" He became one of India\'s greatest athletes.'
  },
  {
    id: 6, category: 'General',
    question: 'How many bones are there in an adult human body?',
    options: ['106', '206', '306', '406'],
    answer: 1,
    explanation: 'An adult human body has 206 bones. Interestingly, babies are born with about 270 bones, but many of them fuse together as we grow up. The smallest bone in the body is the stapes, found inside the ear!'
  },
  {
    id: 7, category: 'Geography',
    question: 'Which country is both a continent and a country?',
    options: ['Brazil', 'Russia', 'Australia', 'India'],
    answer: 2,
    explanation: 'Australia is unique — it is the only country in the world that is also an entire continent. It is sometimes called the "island continent" because it is completely surrounded by water. It is the sixth largest country in the world by area.'
  },
  {
    id: 8, category: 'History',
    question: 'In which year did India gain independence from British rule?',
    options: ['1942', '1945', '1947', '1950'],
    answer: 2,
    explanation: 'India gained independence on 15 August 1947. This was after nearly 200 years of British rule. Jawaharlal Nehru became the first Prime Minister of independent India and gave his famous "Tryst with Destiny" speech at midnight.'
  },
  {
    id: 9, category: 'Science',
    question: 'What is the powerhouse of the cell?',
    options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Cell wall'],
    answer: 1,
    explanation: 'The Mitochondria is called the powerhouse of the cell because it produces energy in the form of ATP (Adenosine Triphosphate). This energy is used for all the activities of the cell. Every living cell — in plants, animals, and humans — contains mitochondria.'
  },
  {
    id: 10, category: 'General',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
    answer: 2,
    explanation: 'Mars is called the Red Planet because its surface is covered with reddish dust and rocks containing iron oxide (rust). Mars is the fourth planet from the Sun and is the most explored planet after Earth. Scientists believe Mars may have had liquid water in the past!'
  },
]

const CATEGORIES = ['All', 'Science', 'History', 'Geography', 'Sports', 'General']
const CATEGORY_COLORS: Record<string, string> = {
  Science:   '#E0F2FE',
  History:   '#FEF3C7',
  Geography: '#D1FAE5',
  Sports:    '#EDE9FE',
  General:   '#FFE4E6',
}
const CATEGORY_TEXT: Record<string, string> = {
  Science:   '#0369A1',
  History:   '#92400E',
  Geography: '#065F46',
  Sports:    '#5B21B6',
  General:   '#9F1239',
}

export default function GKPage() {
  const [selected, setSelected] = useState<Record<number, number>>({})
  const [revealed, setRevealed] = useState<Record<number, boolean>>({})
  const [activeCategory, setActiveCategory] = useState('All')
  const [score, setScore] = useState<number | null>(null)

  const filtered = activeCategory === 'All'
    ? GK_QUESTIONS
    : GK_QUESTIONS.filter(q => q.category === activeCategory)

  const handleAnswer = (qId: number, optIndex: number, correctIndex: number) => {
    if (revealed[qId]) return
    setSelected(prev => ({ ...prev, [qId]: optIndex }))
    setRevealed(prev => ({ ...prev, [qId]: true }))
  }

  const handleShowScore = () => {
    const answeredAll = filtered.every(q => revealed[q.id])
    if (!answeredAll) return
    const correct = filtered.filter(q => selected[q.id] === q.answer).length
    setScore(correct)
  }

  const allAnswered = filtered.every(q => revealed[q.id])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--green-pale)' }}>

      {/* NAV */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 5%', height: '64px',
        background: 'white', borderBottom: '1px solid var(--gray-200)',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{ width: '34px', height: '34px', background: 'var(--green-dark)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'var(--green-deepest)' }}>Gyaanpravaha</p>
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/login" className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>Log in</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>Register</Link>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)',
        padding: '52px 5%', textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Free for everyone</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', color: 'white', margin: '12px 0 12px' }}>
          General Knowledge Challenge
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto' }}>
          10 questions across Science, History, Geography, Sports and more — crafted for curious minds. No login needed. Just start!
        </p>
      </section>

      {/* CATEGORY FILTER */}
      <div style={{ padding: '24px 5% 0', maxWidth: '860px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setScore(null) }}
              style={{
                padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                background: activeCategory === cat ? 'var(--green-dark)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--gray-600)',
                border: activeCategory === cat ? 'none' : '1px solid var(--gray-200)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* QUESTIONS */}
      <div style={{ padding: '24px 5% 48px', maxWidth: '860px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {filtered.map((q, idx) => {
          const isRevealed = revealed[q.id]
          const userAnswer = selected[q.id]
          const isCorrect = userAnswer === q.answer

          return (
            <div key={q.id} className="card" style={{ padding: '28px' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{
                  padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700,
                  background: CATEGORY_COLORS[q.category] || '#F3F4F6',
                  color: CATEGORY_TEXT[q.category] || '#374151',
                }}>
                  {q.category}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>Q{idx + 1}</span>
              </div>

              {/* Question */}
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: 'var(--green-deepest)', marginBottom: '20px', lineHeight: 1.5 }}>
                {q.question}
              </p>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                {q.options.map((opt, i) => {
                  let bg = 'var(--gray-50)'
                  let border = '1.5px solid var(--gray-200)'
                  let color = 'var(--gray-700)'

                  if (isRevealed) {
                    if (i === q.answer) {
                      bg = 'var(--emerald-light)'; border = '1.5px solid #10B981'; color = '#065F46'
                    } else if (i === userAnswer && !isCorrect) {
                      bg = 'var(--red-light)'; border = '1.5px solid #EF4444'; color = '#991B1B'
                    }
                  } else if (userAnswer === i) {
                    bg = 'var(--green-pale)'; border = '1.5px solid var(--green-dark)'
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleAnswer(q.id, i, q.answer)}
                      disabled={isRevealed}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '12px 16px', borderRadius: 'var(--radius-md)',
                        background: bg, border, cursor: isRevealed ? 'default' : 'pointer',
                        textAlign: 'left', transition: 'all 0.2s', width: '100%',
                      }}
                    >
                      <span style={{
                        width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isRevealed && i === q.answer ? '#10B981' : isRevealed && i === userAnswer && !isCorrect ? '#EF4444' : 'var(--gray-200)',
                        color: isRevealed && (i === q.answer || (i === userAnswer && !isCorrect)) ? 'white' : 'var(--gray-600)',
                        fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                      }}>
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color, lineHeight: 1.4 }}>{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation */}
              {isRevealed && (
                <div style={{
                  padding: '16px', borderRadius: 'var(--radius-md)',
                  background: isCorrect ? 'var(--emerald-light)' : 'var(--red-light)',
                  border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: isCorrect ? '#065F46' : '#991B1B', marginBottom: '6px' }}>
                    {isCorrect ? '✓ Correct!' : '✗ Not quite!'}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: isCorrect ? '#065F46' : '#991B1B', lineHeight: 1.65 }}>
                    {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}

        {/* Score button */}
        {allAnswered && score === null && (
          <button onClick={handleShowScore} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '16px' }}>
            See my score
          </button>
        )}

        {/* Score card */}
        {score !== null && (
          <div className="card" style={{ padding: '40px 32px', textAlign: 'center', border: '2px solid var(--green-dark)' }}>
            <p style={{ fontSize: '48px', marginBottom: '8px' }}>
              {score === filtered.length ? '🏆' : score >= filtered.length * 0.7 ? '🌟' : '📚'}
            </p>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '48px', color: 'var(--green-deepest)', lineHeight: 1 }}>
              {score} / {filtered.length}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--gray-600)', margin: '12px 0 28px' }}>
              {score === filtered.length ? 'Perfect score! You are a GK champion!' : score >= filtered.length * 0.7 ? 'Great job! You know your stuff.' : 'Good attempt! Keep practising and you will get there.'}
            </p>
            <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius-lg)', padding: '24px', marginBottom: '24px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--green-deepest)', marginBottom: '8px' }}>
                Want to learn like this for every subject?
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '16px' }}>
                Gyaanpravaha has full chapter-by-chapter lessons, quizzes, and explanations for all subjects. Parents register and get the child started in minutes.
              </p>
              <Link href="/register" className="btn-primary" style={{ display: 'inline-flex', justifyContent: 'center', padding: '12px 28px' }}>
                Register now — ₹2,499/year
              </Link>
            </div>
            <button
              onClick={() => { setSelected({}); setRevealed({}); setScore(null) }}
              className="btn-outline"
              style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* BOTTOM REGISTER NUDGE */}
      <div style={{ background: 'var(--green-deepest)', padding: '40px 5%', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(18px,3vw,26px)', color: 'white', marginBottom: '8px' }}>
          Liked this? The full platform goes much deeper.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.65)', marginBottom: '24px' }}>
          Chapter lessons, smart quizzes, writing practice, and parent dashboards — all in one place.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', padding: '11px 24px' }}>Learn more</Link>
          <Link href="/register" className="btn-primary" style={{ background: '#74C69D', color: 'var(--green-deepest)', padding: '11px 24px', fontWeight: 800 }}>Register now</Link>
        </div>
      </div>

    </div>
  )
}
