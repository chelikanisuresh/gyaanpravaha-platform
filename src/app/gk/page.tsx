'use client'

import { useState } from 'react'
import Link from 'next/link'

const GK_TOPICS = [
  {
    id: 1,
    category: 'Science',
    emoji: '🌱',
    title: 'How do plants make their own food?',
    readTime: '1 min read',
    content: `Have you ever wondered how plants eat? Unlike us, plants do not go to a kitchen or a restaurant. They make their own food — and they do it using just three things: sunlight, water, and air.

This process is called photosynthesis (say it: foto-SIN-thuh-sis). Here is how it works:

Plants have a green pigment in their leaves called chlorophyll. This chlorophyll captures energy from sunlight. The plant then uses this energy to combine water (absorbed through the roots) and carbon dioxide gas (absorbed from the air through tiny pores in the leaves called stomata) to produce glucose — a type of sugar that is the plant's food.

The amazing part? As a byproduct of this process, the plant releases oxygen into the air. That is the oxygen we breathe every day. So every breath you take is actually a gift from a plant!

Key fact to remember: Photosynthesis happens in the leaves, where chlorophyll is found. No sunlight = no photosynthesis = no food for the plant.`,
    questions: [
      {
        id: 'q1a',
        question: 'Which gas do plants absorb from the air during photosynthesis?',
        options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
        answer: 2,
        explanation: 'Plants absorb Carbon Dioxide (CO₂) from the air and combine it with water and sunlight energy to make glucose. They release oxygen as a byproduct — which is what all living things breathe!'
      },
      {
        id: 'q1b',
        question: 'What is the green pigment in plant leaves that captures sunlight called?',
        options: ['Glucose', 'Chlorophyll', 'Stomata', 'Cellulose'],
        answer: 1,
        explanation: 'Chlorophyll is the green pigment found in plant leaves. It captures energy from sunlight, which the plant uses to make food. Chlorophyll is also what gives plants their green colour!'
      },
    ]
  },
  {
    id: 2,
    category: 'History',
    emoji: '🏛️',
    title: 'The story of India\'s independence',
    readTime: '1 min read',
    content: `On 15 August 1947, India woke up as a free nation after nearly 200 years of British rule. But this freedom did not come easily — it was earned through decades of struggle, sacrifice, and courage by millions of Indians.

The fight for independence had many heroes. Mahatma Gandhi led the movement through non-violence — refusing to obey unjust laws, organising peaceful marches, and fasting to draw attention to India's cause. His 1930 Dandi March, where he walked 241 miles to make salt from the sea (to protest the British salt tax), became one of the most iconic moments of the freedom struggle.

Bhagat Singh, Subhas Chandra Bose, Jawaharlal Nehru, Sardar Vallabhbhai Patel, and countless others each played their role. Some fought with words, some with peaceful protests, and some with revolutionary action.

When independence finally came, Jawaharlal Nehru — who became India's first Prime Minister — gave his famous "Tryst with Destiny" speech at midnight, declaring that India had kept its appointment with destiny.

Key fact: India became a Republic on 26 January 1950, when the Constitution of India came into effect. That is why we celebrate Republic Day on 26 January every year.`,
    questions: [
      {
        id: 'q2a',
        question: 'On which date did India gain independence from British rule?',
        options: ['26 January 1950', '15 August 1947', '2 October 1942', '30 January 1948'],
        answer: 1,
        explanation: 'India gained independence on 15 August 1947, after nearly 200 years of British rule. This day is celebrated every year as Independence Day. India became a Republic on 26 January 1950, when the Constitution came into effect.'
      },
      {
        id: 'q2b',
        question: 'What was the Dandi March about?',
        options: ['Protesting against unfair taxes on salt', 'A march to free political prisoners', 'Walking to Delhi to meet the Viceroy', 'A protest against the partition of Bengal'],
        answer: 0,
        explanation: 'The Dandi March in 1930 was Mahatma Gandhi\'s protest against the British salt tax. Gandhi walked 241 miles to the sea to make salt — an act of civil disobedience that inspired millions across India to join the freedom movement.'
      },
    ]
  },
  {
    id: 3,
    category: 'Geography',
    emoji: '🌍',
    title: 'Rivers — the lifelines of civilisation',
    readTime: '1 min read',
    content: `Every great civilisation in history grew near a river. The ancient Egyptians thrived along the Nile. The people of Mesopotamia built cities between the Tigris and Euphrates. And in India, one of the world's oldest civilisations — the Indus Valley Civilisation — flourished along the banks of the Indus River over 4,000 years ago.

Why rivers? Because rivers provide fresh water for drinking and farming, fertile soil on their banks, fish for food, and a route for transport and trade. They are, quite literally, the lifelines of civilisation.

India is a land of great rivers. The Ganga (or Ganges) is the longest river in India, flowing 2,525 km from the Gangotri glacier in the Himalayas to the Bay of Bengal. It is considered sacred in Hinduism and millions of people live along its banks.

Other major rivers include the Brahmaputra (originating in Tibet), the Yamuna (a major tributary of the Ganga), the Godavari (the longest river in South India, also called the Dakshin Ganga or Ganga of the South), and the Krishna and Kaveri in the Deccan.

Key fact: Rivers that flow into the sea are called rivers. Rivers that flow into another river are called tributaries. The Yamuna is a tributary of the Ganga.`,
    questions: [
      {
        id: 'q3a',
        question: 'Which is the longest river in India?',
        options: ['Yamuna', 'Ganga', 'Godavari', 'Brahmaputra'],
        answer: 1,
        explanation: 'The Ganga (Ganges) is the longest river in India at about 2,525 km. It originates at the Gangotri glacier in the Himalayas and flows into the Bay of Bengal. It is considered sacred in Hinduism and is a lifeline for millions of people.'
      },
      {
        id: 'q3b',
        question: 'What do we call a river that flows into another river (rather than into the sea)?',
        options: ['Delta', 'Tributary', 'Glacier', 'Estuary'],
        answer: 1,
        explanation: 'A tributary is a river or stream that flows into a larger river. For example, the Yamuna is a tributary of the Ganga — it joins the Ganga at Prayagraj (Allahabad). A delta is the fan-shaped area formed where a river meets the sea.'
      },
    ]
  },
  {
    id: 4,
    category: 'Sports',
    emoji: '🏃',
    title: 'Milkha Singh — the man who outran the wind',
    readTime: '1 min read',
    content: `In 1947, a young boy named Milkha Singh lost his home and his family during the Partition of India. He ran — not towards victory, but simply to survive. His father's last words to him were "Bhaag Milkha Bhaag!" — Run, Milkha, Run!

Milkha ran all the way to Delhi, lived in refugee camps, and eventually joined the Indian Army. One day, a cross-country race was announced in the army. The prize? A glass of milk. For someone who had been hungry for so long, that glass of milk meant everything. Milkha ran with every bit of strength he had — and finished in the top ten. That was the beginning.

He began training like no one else — running on hills at night, running against speeding trains to increase his speed, sometimes collapsing from exhaustion but always getting back up.

He went on to win gold medals at the Asian Games and the Commonwealth Games, representing India on the world stage. In 1960, he was invited to race in Pakistan — the country where he had lost everything. He ran so fast that he broke the world record. The President of Pakistan was so amazed that he said: "Milkha, you didn't run today — you flew!"

From that day on, the world called him The Flying Sikh.

Milkha Singh's story teaches us that hard work and determination can turn a life of tragedy into a life of triumph.`,
    questions: [
      {
        id: 'q4a',
        question: 'What nickname was Milkha Singh given after his historic race in Pakistan?',
        options: ['The Golden Runner', 'The Iron Man', 'The Flying Sikh', 'The Champion of Asia'],
        answer: 2,
        explanation: 'After Milkha Singh broke the world record in Pakistan in 1960, the President of Pakistan said "Milkha, you didn\'t run today — you flew!" From that day on, the world called him The Flying Sikh — a title he carried with pride for the rest of his life.'
      },
      {
        id: 'q4b',
        question: 'What was the prize for the first cross-country race Milkha Singh ran in the Indian Army?',
        options: ['A gold medal', 'A cash prize', 'A glass of milk', 'A promotion in rank'],
        answer: 2,
        explanation: 'The prize for that first race was simply a glass of milk. But for Milkha, who had been hungry for so long living in refugee camps, that glass of milk meant the world. He ran with everything he had, finished in the top ten, and a legendary athletic journey began.'
      },
    ]
  },
  {
    id: 5,
    category: 'General',
    emoji: '🔭',
    title: 'Our solar system — a quick tour',
    readTime: '1 min read',
    content: `Our solar system is our cosmic neighbourhood — the Sun and everything that orbits around it. Let us take a quick tour.

At the centre is the Sun — a massive star made mostly of hydrogen and helium. It is so large that about 1.3 million Earths could fit inside it. The Sun provides the light and heat that makes life on Earth possible.

Orbiting the Sun are 8 planets (in order from the Sun): Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune. A simple way to remember them: "My Very Educated Mother Just Served Us Noodles."

Earth is the third planet from the Sun and the only planet known to support life. Mars, the fourth planet, is called the Red Planet because its surface is covered with reddish iron oxide (rust). Jupiter is the largest planet — so large that all other planets could fit inside it. Saturn is famous for its beautiful rings made of ice and rock. Neptune is the farthest planet from the Sun.

There are also dwarf planets (like Pluto, which was reclassified from a planet in 2006), asteroids, comets, and moons orbiting many of the planets.

Key fact: The Sun accounts for about 99.86% of the total mass of the entire solar system. Everything else — all the planets, moons, asteroids, and comets — makes up just 0.14%.`,
    questions: [
      {
        id: 'q5a',
        question: 'Which is the largest planet in our solar system?',
        options: ['Saturn', 'Neptune', 'Jupiter', 'Uranus'],
        answer: 2,
        explanation: 'Jupiter is the largest planet in our solar system — so large that all the other planets combined could fit inside it! It is the fifth planet from the Sun and is known for its Great Red Spot, a storm that has been raging for hundreds of years.'
      },
      {
        id: 'q5b',
        question: 'Why is Mars called the Red Planet?',
        options: ['It is very hot', 'Its surface is covered with iron oxide (rust)', 'It reflects red light from the Sun', 'It has red clouds in its atmosphere'],
        answer: 1,
        explanation: 'Mars is called the Red Planet because its surface is covered with iron oxide — which is essentially rust. This gives Mars its distinctive reddish colour visible even from Earth. Mars is the fourth planet from the Sun and is the most explored planet after Earth.'
      },
    ]
  },
]

const CATEGORIES = ['All', 'Science', 'History', 'Geography', 'Sports', 'General']

const CATEGORY_STYLE: Record<string, { bg: string; text: string }> = {
  Science:   { bg: '#E0F2FE', text: '#0369A1' },
  History:   { bg: '#FEF3C7', text: '#92400E' },
  Geography: { bg: '#D1FAE5', text: '#065F46' },
  Sports:    { bg: '#EDE9FE', text: '#5B21B6' },
  General:   { bg: '#FFE4E6', text: '#9F1239' },
}

export default function GKPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [readTopics, setReadTopics] = useState<Set<number>>(new Set())
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [revealed, setRevealed] = useState<Record<string, boolean>>({})
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})

  const filtered = activeCategory === 'All'
    ? GK_TOPICS
    : GK_TOPICS.filter(t => t.category === activeCategory)

  const markRead = (topicId: number) => {
    setReadTopics(prev => new Set([...prev, topicId]))
    setExpanded(prev => ({ ...prev, [topicId]: false }))
  }

  const handleAnswer = (qId: string, optIndex: number) => {
    if (revealed[qId]) return
    setSelected(prev => ({ ...prev, [qId]: optIndex }))
    setRevealed(prev => ({ ...prev, [qId]: true }))
  }

  const totalQuestions = filtered.reduce((acc, t) => acc + t.questions.length, 0)
  const answeredCorrect = filtered.reduce((acc, t) =>
    acc + t.questions.filter(q => revealed[q.id] && selected[q.id] === q.answer).length, 0)
  const answeredTotal = filtered.reduce((acc, t) =>
    acc + t.questions.filter(q => revealed[q.id]).length, 0)

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
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'var(--green-deepest)', lineHeight: 1 }}>Gyaanpravaha</p>
            <span className="hindi">ज्ञानप्रवाह</span>
          </div>
        </Link>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/login" className="btn-outline" style={{ padding: '7px 16px', fontSize: '13px' }}>Log in</Link>
          <Link href="/register" className="btn-primary" style={{ padding: '7px 16px', fontSize: '13px' }}>Register</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)',
        padding: '52px 5%', textAlign: 'center',
      }}>
        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#74C69D', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Free for everyone · No login needed</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: 'clamp(28px, 5vw, 44px)', color: 'white', margin: '12px 0 12px' }}>
          General Knowledge
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.75)', maxWidth: '520px', margin: '0 auto 24px' }}>
          5 topics with short reads and quiz questions. Read first, then answer — just like the full platform works.
        </p>
        {answeredTotal > 0 && (
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(116,198,157,0.2)', border: '1px solid rgba(116,198,157,0.4)', borderRadius: '20px', padding: '8px 20px' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: '#74C69D' }}>
              {answeredCorrect} / {answeredTotal} correct so far
            </span>
          </div>
        )}
      </section>

      {/* CATEGORY FILTER */}
      <div style={{ padding: '20px 5% 0', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '7px 16px', borderRadius: '20px', cursor: 'pointer',
                fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
                transition: 'all 0.2s',
                background: activeCategory === cat ? 'var(--green-dark)' : 'white',
                color: activeCategory === cat ? 'white' : 'var(--gray-600)',
                border: activeCategory === cat ? '1px solid var(--green-dark)' : '1px solid var(--gray-200)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* TOPICS */}
      <div style={{ padding: '20px 5% 56px', maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {filtered.map((topic) => {
          const isRead = readTopics.has(topic.id)
          const isExpanded = expanded[topic.id] !== false
          const catStyle = CATEGORY_STYLE[topic.category] || { bg: '#F3F4F6', text: '#374151' }

          return (
            <div key={topic.id} className="card" style={{ padding: '0', overflow: 'hidden' }}>

              {/* Topic header */}
              <div style={{ padding: '24px 28px 20px', borderBottom: isRead ? '1px solid var(--gray-200)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '28px' }}>{topic.emoji}</span>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 700, background: catStyle.bg, color: catStyle.text }}>
                      {topic.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--gray-400)' }}>{topic.readTime}</span>
                    {isRead && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--emerald-light)', color: '#065F46', padding: '3px 10px', borderRadius: '20px', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px' }}>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#065F46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Read
                      </span>
                    )}
                  </div>
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'var(--green-deepest)', marginBottom: '16px', lineHeight: 1.3 }}>
                  {topic.title}
                </h2>

                {/* Read content */}
                {!isRead ? (
                  <>
                    <div style={{
                      fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)',
                      lineHeight: 1.8, whiteSpace: 'pre-line',
                      background: 'var(--green-pale)', borderRadius: 'var(--radius-md)',
                      padding: '20px', marginBottom: '16px',
                    }}>
                      {topic.content}
                    </div>
                    <button
                      onClick={() => markRead(topic.id)}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '14px' }}
                    >
                      Got it! Take the quiz →
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setExpanded(prev => ({ ...prev, [topic.id]: !isExpanded }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--green-dark)', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {isExpanded ? '▲ Hide reading' : '▼ Re-read this topic'}
                  </button>
                )}

                {/* Re-read toggle */}
                {isRead && isExpanded && (
                  <div style={{
                    fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)',
                    lineHeight: 1.8, whiteSpace: 'pre-line',
                    background: 'var(--green-pale)', borderRadius: 'var(--radius-md)',
                    padding: '20px', marginTop: '16px',
                  }}>
                    {topic.content}
                  </div>
                )}
              </div>

              {/* Questions — only show after reading */}
              {isRead && (
                <div style={{ padding: '20px 28px 24px', background: 'var(--gray-50)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Quiz — {topic.questions.length} questions
                  </p>
                  {topic.questions.map((q, qi) => {
                    const isRevealed = revealed[q.id]
                    const userAnswer = selected[q.id]
                    const isCorrect = userAnswer === q.answer

                    return (
                      <div key={q.id}>
                        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--green-deepest)', marginBottom: '12px', lineHeight: 1.5 }}>
                          {qi + 1}. {q.question}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                          {q.options.map((opt, i) => {
                            let bg = 'white'
                            let border = '1.5px solid var(--gray-200)'
                            let color = 'var(--gray-700)'

                            if (isRevealed) {
                              if (i === q.answer) { bg = 'var(--emerald-light)'; border = '1.5px solid #10B981'; color = '#065F46' }
                              else if (i === userAnswer && !isCorrect) { bg = 'var(--red-light)'; border = '1.5px solid #EF4444'; color = '#991B1B' }
                            }

                            return (
                              <button
                                key={i}
                                onClick={() => handleAnswer(q.id, i)}
                                disabled={isRevealed}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: '10px',
                                  padding: '10px 14px', borderRadius: 'var(--radius-md)',
                                  background: bg, border, cursor: isRevealed ? 'default' : 'pointer',
                                  textAlign: 'left', transition: 'all 0.2s', width: '100%',
                                }}
                              >
                                <span style={{
                                  width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  background: isRevealed && i === q.answer ? '#10B981' : isRevealed && i === userAnswer && !isCorrect ? '#EF4444' : 'var(--gray-200)',
                                  color: isRevealed && (i === q.answer || (i === userAnswer && !isCorrect)) ? 'white' : 'var(--gray-600)',
                                  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px',
                                }}>
                                  {String.fromCharCode(65 + i)}
                                </span>
                                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color, lineHeight: 1.4 }}>{opt}</span>
                              </button>
                            )
                          })}
                        </div>

                        {isRevealed && (
                          <div style={{
                            padding: '14px 16px', borderRadius: 'var(--radius-md)',
                            background: isCorrect ? 'var(--emerald-light)' : 'var(--red-light)',
                            border: `1px solid ${isCorrect ? '#10B981' : '#EF4444'}`,
                          }}>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: isCorrect ? '#065F46' : '#991B1B', marginBottom: '4px' }}>
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
                </div>
              )}
            </div>
          )
        })}

        {/* Register nudge at bottom */}
        <div className="card" style={{ padding: '32px', textAlign: 'center', border: '2px solid var(--green-dark)' }}>
          <p style={{ fontSize: '36px', marginBottom: '12px' }}>🎓</p>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'var(--green-deepest)', marginBottom: '8px' }}>
            Liked this? The full platform goes much deeper.
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', marginBottom: '24px', lineHeight: 1.7 }}>
            Every subject, every chapter — explained just like this, with full lesson content, smart quizzes, writing practice, and a parent dashboard to track progress.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" className="btn-outline" style={{ padding: '11px 24px' }}>Learn more</Link>
            <Link href="/register" className="btn-primary" style={{ padding: '11px 24px', fontWeight: 800 }}>Register now — ₹2,499/year</Link>
          </div>
        </div>
      </div>

    </div>
  )
}
