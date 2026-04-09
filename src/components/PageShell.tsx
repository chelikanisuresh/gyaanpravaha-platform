import React from 'react'

interface PageShellProps {
  title: string
  subtitle?: string
  action?: React.ReactNode
  children: React.ReactNode
  maxWidth?: string
}

export default function PageShell({ title, subtitle, action, children, maxWidth = '860px' }: PageShellProps) {
  return (
    <div style={{ maxWidth, margin: '0 auto', padding: '40px 32px 80px' }}>

      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', gap: '16px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '28px', color: 'var(--gray-900)', letterSpacing: '-0.5px', lineHeight: 1.2, marginBottom: subtitle ? '6px' : 0 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--gray-500)', lineHeight: 1.5 }}>
              {subtitle}
            </p>
          )}
        </div>
        {action && <div style={{ flexShrink: 0 }}>{action}</div>}
      </div>

      {children}
    </div>
  )
}
