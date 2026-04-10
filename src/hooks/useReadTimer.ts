'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

interface UseReadTimerReturn {
  elapsed: number          // seconds elapsed
  isRunning: boolean
  pause: () => void
  resume: () => void
  reset: () => void
}

export function useReadTimer(autoStart = true): UseReadTimerReturn {
  const [elapsed, setElapsed] = useState(0)
  const [isRunning, setIsRunning] = useState(autoStart)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsed(prev => prev + 1)
      }, 1000)
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning])

  // Pause timer when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        setIsRunning(false)
      } else if (autoStart) {
        setIsRunning(true)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [autoStart])

  const pause  = useCallback(() => setIsRunning(false), [])
  const resume = useCallback(() => setIsRunning(true),  [])
  const reset  = useCallback(() => { setElapsed(0); setIsRunning(autoStart) }, [autoStart])

  return { elapsed, isRunning, pause, resume, reset }
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}
