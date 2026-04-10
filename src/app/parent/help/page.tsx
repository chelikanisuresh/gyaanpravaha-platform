'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import ParentSidebarLayout from '@/components/ParentSidebarLayout'

interface Child { id: string; full_name: string }

interface Ticket {
  id: string
  ticket_ref: string
  type: string
  subject: string
  status: string
  created_at: string
}

const ISSUE_TYPES = [
  { value: 'technical', label: 'Technical problem',  emoji: '🔧', desc: 'Something is broken or not loading correctly' },
  { value: 'content',   label: 'Content issue',      emoji: '📚', desc: 'Error in lesson content, quiz or writing prompt' },
  { value: 'billing',   label: 'Billing query',      emoji: '💳', desc: 'Question about payment or subscription' },
  { value: 'other',     label: 'Other',               emoji: '💬', desc: 'Anything else you need help with' },
]

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  open:        { bg: '#FEF3C7', color: '#92400E', label: 'Open' },
  in_progress: { bg: '#EDE9FE', color: '#5B21B6', label: 'In progress' },
  resolved:    { bg: '#D8F3DC', color: '#1B4332', label: 'Resolved' },
}

export default function HelpPage() {
  const [parentName, setParentName]   = useState('Parent')
  const [parentId,   setParentId]     = useState<string | null>(null)
  const [children,   setChildren]     = useState<Child[]>([])
  const [tickets,    setTickets]      = useState<Ticket[]>([])
  const [type,       setType]         = useState('')
  const [childId,    setChildId]      = useState('')
  const [subject,    setSubject]      = useState('')
  const [description, setDescription] = useState('')
  const [pageContext, setPageContext]  = useState('')
  const [loading,    setLoading]      = useState(false)
  const [error,      setError]        = useState('')
  const [submitted,  setSubmitted]    = useState<string | null>(null) // ticket ref

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setParentId(user.id)

      const { data: p } = await supabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle()
      if (p?.full_name) setParentName(p.full_name)

      const { data: links } = await supabase.from('parent_student_links').select('student_id').eq('parent_id', user.id)
      if (links?.length) {
        const { data: profiles } = await supabase.from('profiles').select('id, full_name').in('id', links.map(l => l.student_id))
        if (profiles) setChildren(profiles as Child[])
      }

      // Load existing tickets
      const { data: existing } = await supabase
        .from('support_tickets')
        .select('id, ticket_ref, type, subject, status, created_at')
        .eq('parent_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10)
      if (existing) setTickets(existing as Ticket[])
    }
    load()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!type) { setError('Please select an issue type.'); return }
    if (!subject.trim()) { setError('Please enter a subject.'); return }
    if (!description.trim()) { setError('Please describe the issue.'); return }
    if (!parentId) { setError('Not logged in. Please refresh.'); return }

    setLoading(true)
    try {
      const supabase = createClient()
      const { data, error: insertError } = await supabase
        .from('support_tickets')
        .insert({
          parent_id:    parentId,
          child_id:     childId || null,
          type,
          subject:      subject.trim(),
          description:  description.trim(),
          page_context: pageContext.trim() || null,
        })
        .select('ticket_ref')
        .single()

      if (insertError) throw insertError

      setSubmitted(data.ticket_ref)
      // Refresh ticket list
      const { data: updated } = await supabase
        .from('support_tickets')
        .select('id, ticket_ref, type, subject, status, created_at')
        .eq('parent_id', parentId)
        .order('created_at', { ascending: false })
        .limit(10)
      if (updated) setTickets(updated as Ticket[])

      // Reset form
      setType(''); setChildId(''); setSubject(''); setDescription(''); setPageContext('')
    } catch (err: any) {
      setError(err.message || 'Failed to submit ticket. Please try again.')
    }
    setLoading(false)
  }

  const typeStyle: React.CSSProperties = { width: '100%', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '14px', color: '#1F2937', background: 'white', border: '1.5px solid #E5E7EB', borderRadius: '8px', outline: 'none', transition: 'border-color 0.15s' }

  return (
    <ParentSidebarLayout parentName={parentName}>
      <style>{`@media(max-width:960px){.help-grid{grid-template-columns:1fr !important}}`}</style>
      <div style={{ padding: '28px 28px 60px' }}>

        <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '22px', color: '#1B4332', marginBottom: '4px' }}>Help &amp; Support</h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
          Facing an issue? Raise a ticket and our team will get back to you within 24 hours.
        </p>

        {/* Success banner */}
        {submitted && (
          <div style={{ background: '#D8F3DC', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '16px 20px', marginBottom: '24px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '20px', flexShrink: 0 }}>✅</span>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#1B4332', marginBottom: '3px' }}>
                Ticket raised successfully — <span style={{ color: '#2D6A4F' }}>{submitted}</span>
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#40916C', lineHeight: 1.5 }}>
                We have received your request. Our team will respond to hello@gyaanpravaha.in within 24 hours. You can track the status below.
              </p>
            </div>
          </div>
        )}

        <div className="help-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

          {/* ── LEFT — Raise a ticket form ── */}
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '12px' }}>
              Raise a ticket
            </p>

            {/* Issue type selector */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {ISSUE_TYPES.map(({ value, label, emoji, desc }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setType(value)}
                  style={{
                    padding: '12px', borderRadius: '10px', textAlign: 'left', cursor: 'pointer',
                    border: `1.5px solid ${type === value ? '#2D6A4F' : '#E5E7EB'}`,
                    background: type === value ? '#F0FDF4' : 'white',
                    transition: 'all 0.15s',
                  }}
                >
                  <p style={{ fontSize: '18px', marginBottom: '4px' }}>{emoji}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: type === value ? '#1B4332' : '#374151', marginBottom: '2px' }}>{label}</p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF', lineHeight: 1.4 }}>{desc}</p>
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

              {/* Child selector — optional */}
              {children.length > 0 && (
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Related to which child? <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
                  </label>
                  <select value={childId} onChange={e => setChildId(e.target.value)} style={{ ...typeStyle }}>
                    <option value="">Not specific to a child</option>
                    {children.map(c => (
                      <option key={c.id} value={c.id}>{c.full_name || 'Student'}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Subject */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  required
                  placeholder="Brief description of the issue"
                  style={typeStyle}
                  onFocus={e => e.target.style.borderColor = '#2D6A4F'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Describe the issue
                </label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  placeholder="Tell us exactly what happened, what you expected, and what you saw instead..."
                  style={{ ...typeStyle, minHeight: '100px', resize: 'vertical', lineHeight: 1.6 }}
                  onFocus={e => e.target.style.borderColor = '#2D6A4F'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              {/* Page context */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: '#6B7280', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Which page or chapter? <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span>
                </label>
                <input
                  type="text"
                  value={pageContext}
                  onChange={e => setPageContext(e.target.value)}
                  placeholder="e.g. Chapter 3 quiz, Parent dashboard, Login page"
                  style={typeStyle}
                  onFocus={e => e.target.style.borderColor = '#2D6A4F'}
                  onBlur={e => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>

              {error && (
                <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '9px', padding: '11px 14px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#991B1B' }}>⚠️ {error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ background: '#2D6A4F', color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', padding: '12px 22px', borderRadius: '8px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1, alignSelf: 'flex-start', transition: 'opacity 0.15s' }}
              >
                {loading ? 'Submitting...' : '🎫 Raise ticket'}
              </button>
            </form>
          </div>

          {/* ── RIGHT — Past tickets + contact info ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Contact */}
            <div style={{ background: 'linear-gradient(135deg,#1B4332,#2D6A4F)', borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'white', marginBottom: '8px' }}>📬 Contact us directly</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: '12px' }}>
                For urgent issues, write to us directly at:
              </p>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: '#74C69D' }}>hello@gyaanpravaha.in</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '6px' }}>
                We respond within 24 hours on working days.
              </p>
            </div>

            {/* Response SLA */}
            <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '18px' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332', marginBottom: '12px' }}>⏱️ Response times</p>
              {[
                { type: '🔧 Technical problem', time: 'Within 4 hours', color: '#10B981' },
                { type: '📚 Content issue',     time: 'Within 24 hours', color: '#F59E0B' },
                { type: '💳 Billing query',     time: 'Within 24 hours', color: '#F59E0B' },
                { type: '💬 Other',             time: 'Within 48 hours', color: '#9CA3AF' },
              ].map(({ type, time, color }) => (
                <div key={type} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: '#374151' }}>{type}</p>
                  <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color }}>{time}</span>
                </div>
              ))}
            </div>

            {/* Past tickets */}
            {tickets.length > 0 && (
              <div>
                <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px' }}>
                  Your tickets
                </p>
                <div style={{ background: 'white', borderRadius: '14px', border: '1px solid #E5E7EB', overflow: 'hidden' }}>
                  {tickets.map((t, i) => {
                    const ss = STATUS_STYLES[t.status] || STATUS_STYLES.open
                    const typeObj = ISSUE_TYPES.find(x => x.value === t.type)
                    return (
                      <div key={t.id} style={{ padding: '12px 16px', borderBottom: i < tickets.length - 1 ? '1px solid #F9FAFB' : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px', gap: '8px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px' }}>{typeObj?.emoji}</span>
                            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: '#1B4332' }}>{t.subject}</p>
                          </div>
                          <span style={{ background: ss.bg, color: ss.color, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '20px', flexShrink: 0 }}>
                            {ss.label}
                          </span>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>{t.ticket_ref}</p>
                          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#9CA3AF' }}>
                            {new Date(t.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {tickets.length === 0 && (
              <div style={{ background: '#F8FAF9', borderRadius: '14px', border: '1px solid #E5E7EB', padding: '20px', textAlign: 'center' }}>
                <p style={{ fontSize: '24px', marginBottom: '8px' }}>🎫</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9CA3AF' }}>No tickets raised yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </ParentSidebarLayout>
  )
}
