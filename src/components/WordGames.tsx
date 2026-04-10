'use client'

import { useState, useEffect, useCallback } from 'react'

// ─── WORD DATA (linked to chapters) ─────────────────────────────────────────

const SCRAMBLE_WORDS = [
  { word: 'EFFICIENCY',    meaning: 'Doing something in the best way without wasting time or effort',  chapter: 1 },
  { word: 'RESILIENCE',    meaning: 'The ability to bounce back from difficulties',                     chapter: 5 },
  { word: 'DETERMINATION', meaning: 'Firmness of purpose — never giving up',                           chapter: 5 },
  { word: 'CONTENTMENT',   meaning: 'Being happy and satisfied with what you have',                    chapter: 6 },
  { word: 'EMPATHY',       meaning: 'Understanding and sharing the feelings of others',                chapter: 7 },
  { word: 'FLEETING',      meaning: 'Lasting for only a very short time',                              chapter: 8 },
  { word: 'SCORNFUL',      meaning: 'Feeling that something is worthless or beneath you',              chapter: 3 },
  { word: 'ASSEMBLE',      meaning: 'To gather or come together in one place',                         chapter: 1 },
  { word: 'IMAGINATION',   meaning: 'The ability to form pictures or ideas in your mind',              chapter: 2 },
  { word: 'COURAGE',       meaning: 'The ability to do something even when it is frightening',         chapter: 5 },
]

const FIB_QUESTIONS = [
  { chapter: 'Chapter 1', sentence: 'Dad put up ___ in the bathrooms to track each child\'s morning tasks.', answer: 'charts', options: ['charts', 'trophies', 'mirrors', 'windows'] },
  { chapter: 'Chapter 1', sentence: 'Dad used two shaving ___ at the same time to save seventeen seconds.', answer: 'brushes', options: ['brushes', 'razors', 'combs', 'blades'] },
  { chapter: 'Chapter 3', sentence: 'Margie\'s mechanical teacher gave her test after test in ___.', answer: 'geography', options: ['geography', 'history', 'arithmetic', 'science'] },
  { chapter: 'Chapter 5', sentence: 'Milkha Singh\'s father\'s last words were "Bhaag Milkha ___!"', answer: 'Bhaag', options: ['Bhaag', 'Run', 'Fight', 'Win'] },
  { chapter: 'Chapter 6', sentence: '"Whilst thus I ___, I am a king."', answer: 'sing', options: ['sing', 'sleep', 'dream', 'walk'] },
  { chapter: 'Chapter 7', sentence: 'The Hermit said: "There is only one important time — ___."', answer: 'Now', options: ['Now', 'Tomorrow', 'Yesterday', 'Always'] },
  { chapter: 'Chapter 8', sentence: 'The poet says sights fly past "as thick as driving ___."', answer: 'rain', options: ['rain', 'snow', 'wind', 'clouds'] },
  { chapter: 'Chapter 2', sentence: 'In his fantasy kingdom, the poet\'s bed would be made of ___.', answer: 'ivory', options: ['ivory', 'gold', 'silver', 'wood'] },
  { chapter: 'Chapter 4', sentence: 'The scarecrow combs his hair in morning ___.', answer: 'dew', options: ['dew', 'rain', 'mist', 'light'] },
  { chapter: 'Chapter 5', sentence: 'Milkha Singh earned the nickname "The Flying ___".', answer: 'Sikh', options: ['Sikh', 'Arrow', 'Eagle', 'Star'] },
]

const WORDLE_WORDS = [
  { word: 'EAGLE', hint: 'Dad had this kind of eye — very sharp and observant (Chapter 1)' },
  { word: 'BRAVE', hint: 'Milkha showed this quality by racing in Pakistan (Chapter 5)' },
  { word: 'CHAOS', hint: 'Complete confusion and disorder (Chapter 5)' },
  { word: 'ROAMS', hint: 'What tigers did in the Lord of Tartary\'s forest (Chapter 2)' },
  { word: 'IVORY', hint: 'The Lord of Tartary\'s bed was made of this (Chapter 2)' },
  { word: 'GLEAM', hint: 'A flash of light — like fins athwart the sun (Chapter 2)' },
  { word: 'TRAIL', hint: 'The path Milkha left behind him (Chapter 5)' },
  { word: 'GRADE', hint: 'Your school year — you are in this (General)' },
  { word: 'FLAME', hint: 'A tongue of fire — like determination burning inside (General)' },
  { word: 'REIGN', hint: 'To rule a kingdom — like the Lord of Tartary (Chapter 2)' },
]

// Weekly crossword — fixed for the week
const CROSSWORD = {
  size: 9,
  words: [
    { word: 'EAGLE',   row: 0, col: 0, dir: 'across' as const, num: 1, clue: 'Dad had this kind of eye — very sharp' },
    { word: 'BRAVE',   row: 0, col: 3, dir: 'down'   as const, num: 2, clue: 'Milkha\'s quality going to Pakistan' },
    { word: 'CHAOS',   row: 2, col: 0, dir: 'across' as const, num: 3, clue: 'Complete confusion and disorder' },
    { word: 'ASSEMBLE',row: 4, col: 0, dir: 'across' as const, num: 4, clue: 'To gather together in one place' },
    { word: 'SING',    row: 4, col: 4, dir: 'down'   as const, num: 5, clue: '"Whilst thus I ___, I am a king"' },
    { word: 'EMPATHY', row: 6, col: 0, dir: 'across' as const, num: 6, clue: 'Feeling what others feel' },
    { word: 'ECHO',    row: 0, col: 7, dir: 'down'   as const, num: 7, clue: 'A sound that comes back to you' },
  ],
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── GAME 1: WORD SCRAMBLE ───────────────────────────────────────────────────

function WordScramble() {
  const [idx,       setIdx]       = useState(0)
  const [placed,    setPlaced]    = useState<(string|null)[]>([])
  const [letters,   setLetters]   = useState<{ l: string; used: boolean }[]>([])
  const [score,     setScore]     = useState(0)
  const [result,    setResult]    = useState<'correct'|'wrong'|null>(null)

  const load = useCallback((i: number) => {
    const w = SCRAMBLE_WORDS[i % SCRAMBLE_WORDS.length]
    setPlaced(Array(w.word.length).fill(null))
    setLetters(shuffle(w.word.split('')).map(l => ({ l, used: false })))
    setResult(null)
  }, [])

  useEffect(() => { load(idx) }, [idx, load])

  const word = SCRAMBLE_WORDS[idx % SCRAMBLE_WORDS.length]

  const pickLetter = (i: number) => {
    if (letters[i].used || result) return
    const emptySlot = placed.findIndex(p => p === null)
    if (emptySlot === -1) return
    const newPlaced = [...placed]; newPlaced[emptySlot] = letters[i].l
    const newLetters = [...letters]; newLetters[i] = { ...newLetters[i], used: true }
    setPlaced(newPlaced); setLetters(newLetters)
  }

  const removeSlot = (i: number) => {
    if (!placed[i] || result) return
    const newPlaced = [...placed]; newPlaced[i] = null
    // Find the letter in the used list and restore it
    const letter = placed[i]!
    const newLetters = [...letters]
    const usedIdx = newLetters.findIndex(l => l.used && l.l === letter)
    if (usedIdx !== -1) newLetters[usedIdx] = { ...newLetters[usedIdx], used: false }
    setPlaced(newPlaced); setLetters(newLetters)
  }

  const check = () => {
    if (placed.some(p => p === null)) return
    const answer = placed.join('')
    if (answer === word.word) {
      setResult('correct'); setScore(s => s + 1)
      setTimeout(() => { setIdx(i => i + 1) }, 1200)
    } else {
      setResult('wrong')
    }
  }

  const clear = () => load(idx)

  const btnBase: React.CSSProperties = { padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.15s' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Chapter {word.chapter}</p>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#2D6A4F' }}>Score: {score}</p>
      </div>

      <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '14px', marginBottom: '14px' }}>
        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '4px' }}>Meaning:</p>
        <p style={{ fontSize: '14px', color: '#1B4332', fontWeight: 600, lineHeight: 1.5 }}>{word.meaning}</p>
      </div>

      {/* Answer slots */}
      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '6px' }}>Your answer:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px', minHeight: '42px' }}>
        {placed.map((p, i) => (
          <div key={i} onClick={() => removeSlot(i)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: `2px solid ${p ? '#2D6A4F' : '#E5E7EB'}`, background: p ? 'white' : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: '#1B4332', cursor: p ? 'pointer' : 'default' }}>
            {p}
          </div>
        ))}
      </div>

      {/* Scrambled letters */}
      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '6px' }}>Tap letters to spell the word:</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '14px' }}>
        {letters.map((l, i) => (
          <div key={i} onClick={() => pickLetter(i)} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '2px solid #E5E7EB', background: l.used ? '#F3F4F6' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: l.used ? '#D1D5DB' : '#1B4332', cursor: l.used ? 'not-allowed' : 'pointer', transition: 'all 0.15s' }}>
            {l.used ? '' : l.l}
          </div>
        ))}
      </div>

      {result && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '12px', background: result === 'correct' ? '#D8F3DC' : '#FEE2E2', color: result === 'correct' ? '#1B4332' : '#991B1B', border: `1px solid ${result === 'correct' ? '#2D6A4F' : '#EF4444'}`, fontSize: '13px', fontWeight: 600 }}>
          {result === 'correct' ? 'Correct! Well done!' : `Not quite — the word is ${word.word}. Try again!`}
        </div>
      )}

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={clear} style={btnBase}>Clear</button>
        <button onClick={check} style={{ ...btnBase, background: '#2D6A4F', color: 'white', border: '1px solid #2D6A4F' }}>Check</button>
        <button onClick={() => setIdx(i => i + 1)} style={btnBase}>Skip →</button>
      </div>
    </div>
  )
}

// ─── GAME 2: FILL IN THE BLANK ───────────────────────────────────────────────

function FillInBlank() {
  const [idx,      setIdx]      = useState(0)
  const [chosen,   setChosen]   = useState<string|null>(null)
  const [score,    setScore]    = useState(0)
  const [shuffled, setShuffled] = useState<string[]>([])

  const q = FIB_QUESTIONS[idx % FIB_QUESTIONS.length]

  useEffect(() => {
    setChosen(null)
    setShuffled(shuffle(q.options))
  }, [idx])

  const pick = (opt: string) => {
    if (chosen) return
    setChosen(opt)
    if (opt === q.answer) setScore(s => s + 1)
  }

  const parts = q.sentence.split('___')

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{q.chapter}</p>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#2D6A4F' }}>Score: {score}</p>
      </div>

      <div style={{ background: '#F0FDF4', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
        <p style={{ fontSize: '15px', color: '#1B4332', lineHeight: 1.8, fontWeight: 500 }}>
          {parts[0]}
          <span style={{ display: 'inline-block', minWidth: '100px', borderBottom: '2px solid #2D6A4F', color: chosen ? (chosen === q.answer ? '#2D6A4F' : '#EF4444') : '#2D6A4F', fontWeight: 700, textAlign: 'center', padding: '0 6px' }}>
            {chosen || '\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0\u00a0'}
          </span>
          {parts[1]}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px' }}>
        {shuffled.map(opt => {
          let bg = 'white', border = '1px solid #E5E7EB', color = '#1B4332'
          if (chosen) {
            if (opt === q.answer) { bg = '#D8F3DC'; border = '1px solid #2D6A4F'; color = '#1B4332' }
            else if (opt === chosen) { bg = '#FEE2E2'; border = '1px solid #EF4444'; color = '#991B1B' }
          }
          return (
            <button key={opt} onClick={() => pick(opt)} style={{ padding: '10px', borderRadius: '10px', border, background: bg, color, cursor: chosen ? 'default' : 'pointer', fontSize: '14px', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.15s' }}>
              {opt}
            </button>
          )
        })}
      </div>

      {chosen && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '12px', background: chosen === q.answer ? '#D8F3DC' : '#FEE2E2', color: chosen === q.answer ? '#1B4332' : '#991B1B', border: `1px solid ${chosen === q.answer ? '#2D6A4F' : '#EF4444'}`, fontSize: '13px', fontWeight: 600 }}>
          {chosen === q.answer ? 'Correct! Great memory!' : `The answer was "${q.answer}". Remember it!`}
        </div>
      )}

      <button onClick={() => setIdx(i => i + 1)} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600 }}>
        Next question →
      </button>
    </div>
  )
}

// ─── GAME 3: GUESS THE WORD (WORDLE) ────────────────────────────────────────

type TileState = 'correct' | 'present' | 'absent' | 'empty' | 'current'

function GuessTheWord() {
  const [wordIdx,      setWordIdx]      = useState(() => Math.floor(Math.random() * WORDLE_WORDS.length))
  const [guesses,      setGuesses]      = useState<{ letter: string; state: TileState }[][]>([])
  const [current,      setCurrent]      = useState('')
  const [kbState,      setKbState]      = useState<Record<string, TileState>>({})
  const [gameOver,     setGameOver]     = useState(false)
  const [message,      setMessage]      = useState<{ text: string; type: 'win'|'lose' } | null>(null)

  const ROWS = 5
  const { word, hint } = WORDLE_WORDS[wordIdx]

  const checkGuess = (guess: string) => {
    const result: { letter: string; state: TileState }[] = []
    const wordArr = word.split('')
    const used = Array(word.length).fill(false)
    guess.split('').forEach((l, i) => {
      if (l === wordArr[i]) { result[i] = { letter: l, state: 'correct' }; used[i] = true }
      else result[i] = { letter: l, state: 'absent' }
    })
    guess.split('').forEach((l, i) => {
      if (result[i].state === 'correct') return
      const found = wordArr.findIndex((wl, wi) => !used[wi] && wl === l)
      if (found !== -1) { result[i].state = 'present'; used[found] = true }
    })
    return result
  }

  const submit = () => {
    if (current.length !== word.length || gameOver) return
    const result = checkGuess(current)
    const newGuesses = [...guesses, result]
    setGuesses(newGuesses)
    const newKb = { ...kbState }
    const priority: Record<TileState, number> = { correct: 3, present: 2, absent: 1, empty: 0, current: 0 }
    result.forEach(({ letter, state }) => {
      if (!newKb[letter] || priority[state] > priority[newKb[letter]]) newKb[letter] = state
    })
    setKbState(newKb)
    setCurrent('')
    if (result.every(r => r.state === 'correct')) {
      setGameOver(true); setMessage({ text: `You got it in ${newGuesses.length}!`, type: 'win' })
    } else if (newGuesses.length === ROWS) {
      setGameOver(true); setMessage({ text: `The word was ${word}`, type: 'lose' })
    }
  }

  const press = (k: string) => {
    if (gameOver) return
    if (k === 'ENTER') { submit(); return }
    if (k === '⌫') { setCurrent(c => c.slice(0, -1)); return }
    if (current.length < word.length) setCurrent(c => c + k)
  }

  const tileColor = (state: TileState) => ({
    correct: { bg: '#2D6A4F', color: 'white', border: '#2D6A4F' },
    present: { bg: '#F59E0B', color: 'white', border: '#F59E0B' },
    absent:  { bg: '#9CA3AF', color: 'white', border: '#9CA3AF' },
    empty:   { bg: 'white',   color: '#1B4332', border: '#E5E7EB' },
    current: { bg: 'white',   color: '#1B4332', border: '#2D6A4F' },
  }[state])

  const kbRows = [['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['ENTER','Z','X','C','V','B','N','M','⌫']]

  return (
    <div>
      <div style={{ background: '#F0FDF4', borderRadius: '10px', padding: '10px 14px', marginBottom: '12px' }}>
        <p style={{ fontSize: '11px', color: '#6B7280', marginBottom: '2px' }}>Hint:</p>
        <p style={{ fontSize: '13px', color: '#1B4332', fontWeight: 600, lineHeight: 1.5 }}>{hint}</p>
      </div>

      <p style={{ fontSize: '11px', color: '#9CA3AF', marginBottom: '8px' }}>Green = right spot · Yellow = wrong spot · Grey = not in word</p>

      {/* Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '14px', alignItems: 'flex-start' }}>
        {Array.from({ length: ROWS }).map((_, r) => (
          <div key={r} style={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: word.length }).map((_, c) => {
              let letter = '', state: TileState = 'empty'
              if (r < guesses.length) { letter = guesses[r][c].letter; state = guesses[r][c].state }
              else if (r === guesses.length) { letter = current[c] || ''; state = letter ? 'current' : 'empty' }
              const col = tileColor(state)
              return (
                <div key={c} style={{ width: '38px', height: '38px', borderRadius: '8px', border: `2px solid ${col.border}`, background: col.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 700, color: col.color, transition: 'all 0.2s' }}>
                  {letter}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {message && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', marginBottom: '12px', background: message.type === 'win' ? '#D8F3DC' : '#FEE2E2', color: message.type === 'win' ? '#1B4332' : '#991B1B', border: `1px solid ${message.type === 'win' ? '#2D6A4F' : '#EF4444'}`, fontSize: '13px', fontWeight: 600 }}>
          {message.text} {message.type === 'win' ? '🎉' : ''}
        </div>
      )}

      {/* Keyboard */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '12px' }}>
        {kbRows.map((row, ri) => (
          <div key={ri} style={{ display: 'flex', gap: '3px', justifyContent: 'flex-start' }}>
            {row.map(k => {
              const st = k.length === 1 ? kbState[k] : undefined
              const col = st ? tileColor(st) : { bg: '#F3F4F6', color: '#1B4332', border: '#E5E7EB' }
              return (
                <button key={k} onClick={() => press(k)} style={{ padding: k.length > 1 ? '8px 6px' : '8px', minWidth: k.length > 1 ? '44px' : '28px', borderRadius: '6px', border: `1px solid ${col.border}`, background: col.bg, color: col.color, fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {k}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      <button onClick={() => { setWordIdx(Math.floor(Math.random() * WORDLE_WORDS.length)); setGuesses([]); setCurrent(''); setKbState({}); setGameOver(false); setMessage(null) }}
        style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600 }}>
        New word
      </button>
    </div>
  )
}

// ─── GAME 4: CROSSWORD (WEEKLY) ──────────────────────────────────────────────

function Crossword() {
  const SIZE = CROSSWORD.size
  const [userGrid, setUserGrid] = useState<string[][]>(() => Array(SIZE).fill(null).map(() => Array(SIZE).fill('')))
  const [activeWord, setActiveWord] = useState<typeof CROSSWORD.words[0] | null>(null)
  const [checked, setChecked] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const letterGrid = (() => {
    const g: (string|null)[][] = Array(SIZE).fill(null).map(() => Array(SIZE).fill(null))
    CROSSWORD.words.forEach(({ word, row, col, dir }) => {
      word.split('').forEach((l, i) => {
        const r = row + (dir === 'down' ? i : 0)
        const c = col + (dir === 'across' ? i : 0)
        if (r < SIZE && c < SIZE) g[r][c] = l
      })
    })
    return g
  })()

  const numMap: Record<string, number> = {}
  CROSSWORD.words.forEach(w => { numMap[`${w.row},${w.col}`] = w.num })

  const getWordCells = (w: typeof CROSSWORD.words[0]) =>
    w.word.split('').map((_, i) => ({ r: w.row + (w.dir === 'down' ? i : 0), c: w.col + (w.dir === 'across' ? i : 0) }))

  const activeCells = activeWord ? getWordCells(activeWord) : []

  const handleInput = (r: number, c: number, val: string) => {
    const letter = val.toUpperCase().slice(-1)
    const newGrid = userGrid.map(row => [...row])
    newGrid[r][c] = letter
    setUserGrid(newGrid)
    setChecked(false)
    // Advance cursor
    if (letter && activeWord) {
      const cells = getWordCells(activeWord)
      const idx = cells.findIndex(cell => cell.r === r && cell.c === c)
      if (idx < cells.length - 1) {
        const next = cells[idx + 1]
        const nextEl = document.getElementById(`cw-${next.r}-${next.c}`) as HTMLInputElement
        nextEl?.focus()
      }
    }
  }

  const checkAnswers = () => {
    let correct = 0, total = 0
    CROSSWORD.words.forEach(w => {
      getWordCells(w).forEach(({ r, c }, i) => {
        total++
        if (userGrid[r][c] === w.word[i]) correct++
      })
    })
    setCorrectCount(correct)
    setChecked(true)
  }

  const isCorrectCell = (r: number, c: number) => {
    if (!checked || !letterGrid[r][c]) return false
    return userGrid[r][c] === letterGrid[r][c]
  }

  const isActiveCell = (r: number, c: number) => activeCells.some(cell => cell.r === r && cell.c === c)

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ background: '#FEF3C7', border: '1px solid #FDE68A', borderRadius: '8px', padding: '5px 12px' }}>
          <p style={{ fontSize: '11px', color: '#92400E', fontWeight: 700 }}>Weekly puzzle</p>
        </div>
        {checked && <p style={{ fontSize: '13px', fontWeight: 700, color: correctCount > 20 ? '#2D6A4F' : '#F59E0B' }}>{correctCount} letters correct</p>}
      </div>

      {/* Grid */}
      <div style={{ marginBottom: '14px', overflowX: 'auto' }}>
        <div style={{ display: 'inline-block', lineHeight: 0 }}>
          {Array.from({ length: SIZE }).map((_, r) => (
            <div key={r} style={{ display: 'flex' }}>
              {Array.from({ length: SIZE }).map((_, c) => {
                const isBlack = letterGrid[r][c] === null
                const isActive = isActiveCell(r, c)
                const isCorrect = isCorrectCell(r, c)
                const num = numMap[`${r},${c}`]
                return (
                  <div key={c} style={{ width: '32px', height: '32px', border: '1px solid #E5E7EB', position: 'relative', background: isBlack ? '#374151' : isCorrect ? '#D8F3DC' : isActive ? '#F0FDF4' : 'white', flexShrink: 0 }}>
                    {!isBlack && (
                      <>
                        {num && <span style={{ position: 'absolute', top: '1px', left: '2px', fontSize: '8px', color: '#9CA3AF', lineHeight: 1, zIndex: 1 }}>{num}</span>}
                        <input
                          id={`cw-${r}-${c}`}
                          maxLength={1}
                          value={userGrid[r][c]}
                          onChange={e => handleInput(r, c, e.target.value)}
                          onFocus={() => {
                            const w = CROSSWORD.words.find(w => getWordCells(w).some(cell => cell.r === r && cell.c === c))
                            setActiveWord(w || null)
                          }}
                          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none', background: 'transparent', textAlign: 'center', fontSize: '14px', fontWeight: 700, color: isCorrect ? '#1B4332' : '#374151', outline: 'none', textTransform: 'uppercase', cursor: 'pointer' }}
                        />
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Clues */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
        <div>
          <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Across</p>
          {CROSSWORD.words.filter(w => w.dir === 'across').map(w => (
            <p key={w.num} onClick={() => { setActiveWord(w); const el = document.getElementById(`cw-${w.row}-${w.col}`) as HTMLInputElement; el?.focus() }}
              style={{ fontSize: '12px', color: activeWord?.num === w.num ? '#1B4332' : '#6B7280', background: activeWord?.num === w.num ? '#F0FDF4' : 'transparent', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', lineHeight: 1.5, marginBottom: '2px', fontWeight: activeWord?.num === w.num ? 600 : 400 }}>
              {w.num}. {w.clue}
            </p>
          ))}
        </div>
        <div>
          <p style={{ fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>Down</p>
          {CROSSWORD.words.filter(w => w.dir === 'down').map(w => (
            <p key={w.num} onClick={() => { setActiveWord(w); const el = document.getElementById(`cw-${w.row}-${w.col}`) as HTMLInputElement; el?.focus() }}
              style={{ fontSize: '12px', color: activeWord?.num === w.num ? '#1B4332' : '#6B7280', background: activeWord?.num === w.num ? '#F0FDF4' : 'transparent', padding: '4px 8px', borderRadius: '6px', cursor: 'pointer', lineHeight: 1.5, marginBottom: '2px', fontWeight: activeWord?.num === w.num ? 600 : 400 }}>
              {w.num}. {w.clue}
            </p>
          ))}
        </div>
      </div>

      <button onClick={checkAnswers} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600 }}>
        Check answers
      </button>
    </div>
  )
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────

const GAMES = [
  { id: 'scramble', label: 'Scramble',  emoji: '🔀' },
  { id: 'blank',    label: 'Fill blank', emoji: '✏️' },
  { id: 'wordle',   label: 'Guess',     emoji: '🎯' },
  { id: 'crossword',label: 'Crossword', emoji: '🧩' },
]

export default function WordGames() {
  const [active, setActive] = useState('scramble')

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #F3F4F6' }}>
        <p style={{ fontSize: '13px', fontWeight: 700, color: '#1B4332', marginBottom: '10px' }}>🎮 Word games</p>
        <div style={{ display: 'flex', gap: '6px' }}>
          {GAMES.map(g => (
            <button key={g.id} onClick={() => setActive(g.id)} style={{ flex: 1, padding: '7px 4px', borderRadius: '8px', border: '1px solid', borderColor: active === g.id ? '#2D6A4F' : '#E5E7EB', background: active === g.id ? '#F0FDF4' : 'white', color: active === g.id ? '#1B4332' : '#6B7280', fontSize: '11px', fontWeight: active === g.id ? 700 : 500, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '14px', marginBottom: '2px' }}>{g.emoji}</span>
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Game area */}
      <div style={{ padding: '16px' }}>
        {active === 'scramble'  && <WordScramble/>}
        {active === 'blank'     && <FillInBlank/>}
        {active === 'wordle'    && <GuessTheWord/>}
        {active === 'crossword' && <Crossword/>}
      </div>
    </div>
  )
}

// ─── WORD SEARCH ─────────────────────────────────────────────────────────────

const SEARCH_WORDS = ['EFFICIENT','RESILIENT','EMPATHY','FLEETING','COURAGE','WISDOM','CONTENT','SCHOLAR']
const GRID_SIZE = 10

function buildSearchGrid() {
  const grid: string[][] = Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(''))
  const placed: { word: string; cells: [number,number][] }[] = []

  SEARCH_WORDS.forEach(word => {
    for (let tries = 0; tries < 100; tries++) {
      const dir = Math.random() > 0.5 ? 'across' : 'down'
      const r = Math.floor(Math.random() * (GRID_SIZE - (dir === 'down' ? word.length : 0)))
      const c = Math.floor(Math.random() * (GRID_SIZE - (dir === 'across' ? word.length : 0)))
      let ok = true
      const cells: [number,number][] = []
      word.split('').forEach((l, i) => {
        const nr = r + (dir === 'down' ? i : 0)
        const nc = c + (dir === 'across' ? i : 0)
        if (grid[nr][nc] && grid[nr][nc] !== l) ok = false
        cells.push([nr, nc])
      })
      if (ok) {
        word.split('').forEach((l, i) => { grid[cells[i][0]][cells[i][1]] = l })
        placed.push({ word, cells })
        break
      }
    }
  })
  for (let r = 0; r < GRID_SIZE; r++)
    for (let c = 0; c < GRID_SIZE; c++)
      if (!grid[r][c]) grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26))
  return { grid, placed }
}

export function WordSearch() {
  const [{ grid, placed }] = useState(() => buildSearchGrid())
  const [found, setFound]   = useState<Set<string>>(new Set())
  const [selecting, setSelecting] = useState(false)
  const [startCell, setStartCell] = useState<[number,number] | null>(null)
  const [highlight, setHighlight] = useState<[number,number][]>([])
  const [foundCells, setFoundCells] = useState<Set<string>>(new Set())

  const getCells = (start: [number,number], end: [number,number]): [number,number][] => {
    const cells: [number,number][] = [start]
    const dr = end[0] - start[0], dc = end[1] - start[1]
    if (dr === 0 && dc === 0) return cells
    if (dr === 0) { for (let i = 1; i <= Math.abs(dc); i++) cells.push([start[0], start[1] + i * (dc > 0 ? 1 : -1)]) }
    else if (dc === 0) { for (let i = 1; i <= Math.abs(dr); i++) cells.push([start[0] + i * (dr > 0 ? 1 : -1), start[1]]) }
    return cells
  }

  const endSelect = (end: [number,number]) => {
    if (!startCell) return
    const cells = getCells(startCell, end)
    const word = cells.map(([r,c]) => grid[r][c]).join('')
    const revWord = [...word].reverse().join('')
    const match = placed.find(p => p.word === word || p.word === revWord)
    if (match && !found.has(match.word)) {
      const newFound = new Set(found); newFound.add(match.word)
      setFound(newFound)
      const newFC = new Set(foundCells)
      match.cells.forEach(([r,c]) => newFC.add(`${r},${c}`))
      setFoundCells(newFC)
    }
    setSelecting(false); setStartCell(null); setHighlight([])
  }

  const isHighlighted = (r: number, c: number) => highlight.some(([hr,hc]) => hr===r && hc===c)
  const isFound = (r: number, c: number) => foundCells.has(`${r},${c}`)

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>🔍 Word search</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>Found: {found.size}/{SEARCH_WORDS.length}</p>
      </div>

      <div style={{ overflowX: 'auto', marginBottom: '12px' }}>
        <div style={{ display: 'inline-block', lineHeight: 0, userSelect: 'none' }}
          onMouseLeave={() => { if (selecting && startCell) { setSelecting(false); setStartCell(null); setHighlight([]) } }}>
          {grid.map((row, r) => (
            <div key={r} style={{ display: 'flex' }}>
              {row.map((letter, c) => (
                <div key={c}
                  onMouseDown={() => { setSelecting(true); setStartCell([r,c]); setHighlight([[r,c]]) }}
                  onMouseEnter={() => { if (selecting && startCell) setHighlight(getCells(startCell, [r,c])) }}
                  onMouseUp={() => endSelect([r,c])}
                  style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 600, cursor: 'pointer', borderRadius: '4px', background: isFound(r,c) ? '#2D6A4F' : isHighlighted(r,c) ? '#D8F3DC' : 'transparent', color: isFound(r,c) ? 'white' : isHighlighted(r,c) ? '#1B4332' : '#374151', transition: 'background 0.1s', fontFamily: 'monospace' }}>
                  {letter}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {SEARCH_WORDS.map(w => (
          <span key={w} style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 600, background: found.has(w) ? '#D8F3DC' : '#F3F4F6', color: found.has(w) ? '#1B4332' : '#9CA3AF', textDecoration: found.has(w) ? 'line-through' : 'none', transition: 'all 0.2s' }}>
            {w}
          </span>
        ))}
      </div>

      {found.size === SEARCH_WORDS.length && (
        <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '10px', background: '#D8F3DC', border: '1px solid #2D6A4F', color: '#1B4332', fontSize: '13px', fontWeight: 700 }}>
          All words found! Amazing! 🎉
        </div>
      )}
    </div>
  )
}

// ─── MEANING MATCH ────────────────────────────────────────────────────────────

const ALL_PAIRS = [
  { word: 'Resilience',   meaning: 'Bouncing back from hardship' },
  { word: 'Empathy',      meaning: 'Feeling what others feel' },
  { word: 'Fleeting',     meaning: 'Gone in a moment' },
  { word: 'Courage',      meaning: 'Acting despite fear' },
  { word: 'Wisdom',       meaning: 'Deep understanding from experience' },
  { word: 'Contentment',  meaning: 'Peace with what you have' },
  { word: 'Efficiency',   meaning: 'No wasted time or effort' },
  { word: 'Scornful',     meaning: 'Looking down on something' },
]

export function MeaningMatch() {
  const [pairs, setPairs]       = useState(() => shuffle(ALL_PAIRS).slice(0, 6))
  const [words, setWords]       = useState<typeof ALL_PAIRS>([])
  const [meanings, setMeanings] = useState<typeof ALL_PAIRS>([])
  const [selected, setSelected] = useState<{ item: typeof ALL_PAIRS[0]; type: 'word'|'meaning' } | null>(null)
  const [matched, setMatched]   = useState<Set<string>>(new Set())
  const [wrong, setWrong]       = useState<string | null>(null)

  useEffect(() => {
    setWords(shuffle([...pairs]))
    setMeanings(shuffle([...pairs]))
    setSelected(null); setMatched(new Set()); setWrong(null)
  }, [pairs])

  const pick = (item: typeof ALL_PAIRS[0], type: 'word'|'meaning') => {
    if (matched.has(item.word)) return
    if (!selected) { setSelected({ item, type }); return }
    if (selected.item === item && selected.type === type) { setSelected(null); return }
    if (selected.type === type) { setSelected({ item, type }); return }

    // Check match
    if (selected.item.word === item.word) {
      const newMatched = new Set(matched); newMatched.add(item.word)
      setMatched(newMatched); setSelected(null)
    } else {
      setWrong(`${selected.item.word}-${item.word}`)
      setTimeout(() => { setWrong(null); setSelected(null) }, 700)
    }
  }

  const isWrong = (item: typeof ALL_PAIRS[0]) => wrong?.includes(item.word)
  const isSelected = (item: typeof ALL_PAIRS[0], type: 'word'|'meaning') =>
    selected?.item.word === item.word && selected?.type === type

  const chipStyle = (item: typeof ALL_PAIRS[0], type: 'word'|'meaning'): React.CSSProperties => ({
    padding: '9px 12px', borderRadius: '10px', cursor: matched.has(item.word) ? 'default' : 'pointer',
    fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 600, lineHeight: 1.4,
    transition: 'all 0.15s', textAlign: 'left' as const, width: '100%', border: '1px solid',
    background: matched.has(item.word) ? '#2D6A4F' : isWrong(item) ? '#FEE2E2' : isSelected(item, type) ? '#D8F3DC' : 'white',
    borderColor: matched.has(item.word) ? '#2D6A4F' : isWrong(item) ? '#EF4444' : isSelected(item, type) ? '#2D6A4F' : '#E5E7EB',
    color: matched.has(item.word) ? 'white' : isWrong(item) ? '#991B1B' : isSelected(item, type) ? '#1B4332' : '#374151',
  })

  return (
    <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>🃏 Meaning match</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF' }}>{matched.size}/{pairs.length} matched</p>
      </div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', marginBottom: '12px' }}>Tap a word then tap its meaning</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {words.map(item => (
            <button key={item.word} onClick={() => pick(item, 'word')} style={chipStyle(item, 'word')}>
              {item.word}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {meanings.map(item => (
            <button key={item.word} onClick={() => pick(item, 'meaning')} style={chipStyle(item, 'meaning')}>
              {item.meaning}
            </button>
          ))}
        </div>
      </div>

      {matched.size === pairs.length && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', background: '#D8F3DC', border: '1px solid #2D6A4F', color: '#1B4332', fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
          All matched! You know your words! 🎉
        </div>
      )}

      <button onClick={() => setPairs(shuffle(ALL_PAIRS).slice(0, 6))}
        style={{ padding: '7px 14px', borderRadius: '8px', border: '1px solid #E5E7EB', background: 'white', cursor: 'pointer', fontSize: '13px', fontFamily: 'inherit', fontWeight: 600 }}>
        New round
      </button>
    </div>
  )
}
