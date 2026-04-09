'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

const QUESTIONS = [
  { id: 'overall', label: 'Overall, how satisfied are you with Gyaanpravaha?', type: 'rating' },
  { id: 'content', label: 'How would you rate the quality of the lesson content?', type: 'rating' },
  { id: 'child_engagement', label: 'How engaged is your child with the platform?', type: 'rating' },
  { id: 'parent_dashboard', label: 'How useful is the parent dashboard for you?', type: 'rating' },
]

export default function FeedbackPage() {
  const [ratings, setRatings] = useState<Record<string, number>>({})
  const [liked, setLiked] = useState('')
  const [improve, setImprove] = useState('')
  const [features, setFeatures] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // In production: save to Supabase feedback table
    await new Promise(r => setTimeout(r, 1000))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <ParentSidebarLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', padding: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🙏</div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '24px', color: '#1B4332', marginBottom: '12px' }}>Thank you for your feedback!</h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: '#6B7280', lineHeight: 1.7, marginBottom: '24px' }}>
              Your feedback helps us make Gyaanpravaha better for every child. We read every single response.
            </p>
            <button onClick={() => setSubmitted(false)} style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#2D6A4F', background: '#D8F3DC', border: 'none', borderRadius: '10px', padding: '10px 24px', cursor: 'pointer' }}>
              Submit another response
            </button>
          </div>
        </div>
      </ParentSidebarLayout>
    )
  }

  return (
    <ParentSidebarLayout>
      <div style={{ maxWidth: '640px', padding: '28px 28px 60px' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '26px', color: '#1B4332', marginBottom: '6px' }}>Share your feedback</h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
            You are one of our earliest parents. Your feedback directly shapes what we build next. Please be honest — it helps us more than compliments do.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Rating questions */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>Rate your experience</p>
            </div>
            {QUESTIONS.map((q, i) => (
              <div key={q.id} style={{ padding: '14px 20px', borderBottom: i < QUESTIONS.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#374151', marginBottom: '10px' }}>{q.label}</p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatings(prev => ({ ...prev, [q.id]: star }))}
                      style={{
                        width: '40px', height: '40px', borderRadius: '10px', border: '1.5px solid',
                        borderColor: ratings[q.id] >= star ? '#2D6A4F' : '#E5E7EB',
                        background: ratings[q.id] >= star ? '#D8F3DC' : 'white',
                        fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px',
                        color: ratings[q.id] >= star ? '#1B4332' : '#9CA3AF',
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {star}
                    </button>
                  ))}
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', alignSelf: 'center', marginLeft: '4px' }}>
                    {ratings[q.id] ? ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'][ratings[q.id]] : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Open ended */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label className="label" htmlFor="liked">What do you like most about Gyaanpravaha?</label>
              <textarea id="liked" value={liked} onChange={e => setLiked(e.target.value)}
                style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: '10px', outline: 'none', resize: 'vertical', minHeight: '80px', lineHeight: 1.6 }}
                placeholder="Tell us what is working well..."/>
            </div>
            <div>
              <label className="label" htmlFor="improve">What should we improve?</label>
              <textarea id="improve" value={improve} onChange={e => setImprove(e.target.value)}
                style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: '10px', outline: 'none', resize: 'vertical', minHeight: '80px', lineHeight: 1.6 }}
                placeholder="Be honest — we want to know what is not working..."/>
            </div>
            <div>
              <label className="label" htmlFor="features">What features would you like to see next?</label>
              <textarea id="features" value={features} onChange={e => setFeatures(e.target.value)}
                style={{ width: '100%', padding: '12px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#374151', background: '#F9FAFB', border: '1.5px solid #E5E7EB', borderRadius: '10px', outline: 'none', resize: 'vertical', minHeight: '80px', lineHeight: 1.6 }}
                placeholder="e.g. video lessons, live doubt solving, more subjects..."/>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Submitting...' : 'Submit feedback'}
          </button>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#9CA3AF', textAlign: 'center' }}>
            Your feedback is private and goes directly to the Gyaanpravaha team.
          </p>
        </form>
      </div>
    </ParentSidebarLayout>
  )
}
