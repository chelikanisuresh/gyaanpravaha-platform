import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '24px', textAlign: 'center',
    }}>

      {/* Animated checkmark */}
      <div style={{
        width: '88px', height: '88px',
        background: 'rgba(116,198,157,0.2)',
        borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '28px',
        border: '2px solid #74C69D',
      }}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M8 20l8 8 16-16" stroke="#74C69D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <h1 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 900,
        fontSize: 'clamp(28px, 5vw, 44px)',
        color: 'white', marginBottom: '12px',
      }}>
        Welcome to Gyaanpravaha!
      </h1>

      <p style={{
        fontFamily: 'var(--font-body)', fontSize: '17px',
        color: 'rgba(255,255,255,0.75)',
        maxWidth: '480px', marginBottom: '40px', lineHeight: 1.7,
      }}>
        Payment successful. Your child's account is ready. Check your email for login details — then let the learning flow begin.
      </p>

      {/* Steps card */}
      <div style={{
        background: 'white', borderRadius: 'var(--radius-xl)',
        padding: '32px 36px', maxWidth: '460px', width: '100%',
        marginBottom: '28px', textAlign: 'left',
      }}>
        <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '14px', color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '20px' }}>
          Next steps
        </p>
        {[
          { step: '1', title: 'Check your email', desc: 'Your child\'s login ID and password have been sent to your registered email.' },
          { step: '2', title: 'Share with your child', desc: 'Give your child their school Gmail ID and the password you set during registration.' },
          { step: '3', title: 'Start learning', desc: 'Your child logs in at gyaanpravaha.in and begins their first chapter immediately.' },
        ].map(({ step, title, desc }) => (
          <div key={step} style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--green-dark)', color: 'white', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '14px',
            }}>
              {step}
            </div>
            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', color: 'var(--green-deepest)', marginBottom: '3px' }}>{title}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.6 }}>{desc}</p>
            </div>
          </div>
        ))}

        <Link href="/login" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '15px', display: 'flex', marginTop: '8px' }}>
          Go to login page
        </Link>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
        Questions? Contact us at hello@gyaanpravaha.in
      </p>

    </div>
  )
}
