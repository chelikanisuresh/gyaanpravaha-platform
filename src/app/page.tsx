import Link from 'next/link'

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--white)' }}>

      {/* ── NAV ── */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 5%',
        height: '68px',
        borderBottom: '1px solid var(--gray-200)',
        position: 'sticky',
        top: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(8px)',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'var(--green-dark)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.5 2 4 4.5 4 8c0 2 1 3.8 2.5 5v3l3.5-1.5 3.5 1.5v-3C15 11.8 16 10 16 8c0-3.5-2.5-6-6-6z" fill="white" opacity="0.2"/>
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="10" cy="8" r="1.2" fill="#74C69D"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '17px', color: 'var(--green-deepest)', lineHeight: 1 }}>Gyaanpravaha</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', color: 'var(--green-mid)', lineHeight: 1, marginTop: '2px' }}>ज्ञानप्रवाह</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/login" className="btn-outline" style={{ padding: '8px 20px', fontSize: '14px' }}>
            Log in
          </Link>
          <Link href="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}>
            Get started
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 60%, var(--green-mid) 100%)',
        padding: '90px 5% 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(116,198,157,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-40px', left: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(216,243,220,0.08)' }} />

        <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(38px, 6vw, 60px)',
            color: 'white',
            lineHeight: 1.15,
            marginBottom: '20px',
          }}>
            Learn it.<br />Know it.<br />
            <span style={{ color: '#74C69D' }}>Flow with it.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '17px',
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 40px',
          }}>
            Gyaanpravaha is a digital learning platform that brings your syllabus to life —
            explained simply, practised smartly, and tracked closely.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn-primary" style={{ background: '#74C69D', color: 'var(--green-deepest)', fontSize: '16px', padding: '14px 32px' }}>
              Start learning today
            </Link>
            <Link href="/login" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: 'white', fontSize: '16px', padding: '14px 32px' }}>
              I have an account
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '80px 5%', background: 'var(--green-pale)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>How it works</p>
          <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--green-deepest)', marginBottom: '48px' }}>
            Three steps to mastering every chapter
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              {
                step: '01',
                title: 'Learn it',
                desc: 'Every chapter is explained in simple, friendly language — just like a tuition teacher. Read through each section and confirm as you go.',
              },
              {
                step: '02',
                title: 'Know it',
                desc: 'Unlock the quiz after reading. Answer questions across different formats. Got something wrong? We re-explain that concept immediately.',
              },
              {
                step: '03',
                title: 'Flow with it',
                desc: 'Track your progress, earn streaks, and let your parents see how well you are doing. Knowledge that flows stays with you.',
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card" style={{ textAlign: 'center', padding: '36px 24px' }}>
                <div style={{
                  width: '52px', height: '52px',
                  background: 'var(--green-dark)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800, fontSize: '16px', color: 'white',
                }}>
                  {step}
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '20px', color: 'var(--green-deepest)', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-600)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', textAlign: 'center' }}>What you get</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--green-deepest)', marginBottom: '48px', textAlign: 'center' }}>
            Everything a student needs to excel
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              { icon: '📖', title: 'Chapter-by-chapter lessons', desc: 'Every chapter broken into 7 easy sections. Read at your own pace. Confirm each section before moving on.' },
              { icon: '✅', title: 'Smart assessments', desc: 'MCQs, fill in the blanks, sentence forming, and long answers — all in one quiz per chapter.' },
              { icon: '💡', title: 'Instant re-explanation', desc: 'Answer a question wrong and we immediately re-explain that exact concept before you try again.' },
              { icon: '✍️', title: 'Writing practice', desc: 'Writing prompts assigned by your teacher, evaluated by AI, reviewed before your score is released.' },
              { icon: '📊', title: 'Parent dashboard', desc: 'Parents can track progress, scores, time spent, and writing submissions — all in one place.' },
              { icon: '🔥', title: 'Streak tracking', desc: 'Study every day and build your streak. A small habit that builds big results over time.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="card" style={{ padding: '24px' }}>
                <p style={{ fontSize: '28px', marginBottom: '12px' }}>{icon}</p>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '16px', color: 'var(--green-deepest)', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-600)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOR PARENTS ── */}
      <section style={{ padding: '80px 5%', background: 'var(--green-pale)' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'center' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>For parents</p>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--green-deepest)', marginBottom: '16px' }}>
              Stay close to your child's learning
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--gray-600)', lineHeight: 1.7, marginBottom: '24px' }}>
              Your parent dashboard shows exactly what your child is studying, how they scored,
              which chapters need more attention, and how much time they spend learning every day.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Chapter-wise scores and progress',
                'Time spent studying per subject',
                'Weak chapters highlighted clearly',
                'Writing prompt submissions and scores',
                'Subscription status and renewal date',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '20px', height: '20px',
                    borderRadius: '50%',
                    background: 'var(--green-mint)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)' }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '28px', background: 'white' }}>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--gray-400)', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Progress overview</p>
            {[
              { subject: 'English', progress: 75, score: '88%', color: 'var(--green-dark)' },
              { subject: 'Mathematics', progress: 40, score: '72%', color: 'var(--green-mid)' },
              { subject: 'Science', progress: 20, score: '65%', color: 'var(--amber)' },
            ].map(({ subject, progress, score, color }) => (
              <div key={subject} style={{ marginBottom: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color: 'var(--green-deepest)' }}>{subject}</p>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px', color }}>{score}</p>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${progress}%`, background: color }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: '20px', padding: '12px', background: 'var(--green-pale)', borderRadius: 'var(--radius-md)' }}>
              <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-dark)' }}>🔥 7 day study streak!</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '80px 5%' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '12px', color: 'var(--green-mid)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Pricing</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(22px, 4vw, 32px)', color: 'var(--green-deepest)', marginBottom: '36px' }}>
            One annual subscription.<br />Full year of learning.
          </h2>
          <div className="card" style={{ padding: '40px 32px', textAlign: 'center', border: '2px solid var(--green-dark)' }}>
            <div className="badge badge-green" style={{ marginBottom: '16px' }}>Annual plan</div>
            <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 900, fontSize: '52px', color: 'var(--green-deepest)', lineHeight: 1 }}>
              ₹2,499
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--gray-400)', marginBottom: '28px' }}>
              per student · per academic year
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px', textAlign: 'left' }}>
              {[
                'All subjects — fully explained chapter by chapter',
                '7 sections with confirmation gates per chapter',
                'Smart quizzes with instant feedback',
                'Writing prompt assignments and evaluation',
                'Parent progress dashboard',
                'AI doubt solver — bounded to your syllabus',
                'Access for the full academic year',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{
                    width: '18px', height: '18px',
                    borderRadius: '50%',
                    background: 'var(--green-mint)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path d="M1.5 4.5l2 2L7.5 2" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--gray-700)', lineHeight: 1.5 }}>{item}</p>
                </div>
              ))}
            </div>
            <Link href="/signup" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              Get started today
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '72px 5%',
        background: 'linear-gradient(135deg, var(--green-deepest) 0%, var(--green-dark) 100%)',
        textAlign: 'center',
      }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: 'white', marginBottom: '16px' }}>
          Ready to start learning?
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'rgba(255,255,255,0.75)', marginBottom: '32px' }}>
          Join Gyaanpravaha and experience learning that truly flows.
        </p>
        <Link href="/signup" className="btn-primary" style={{ background: '#74C69D', color: 'var(--green-deepest)', fontSize: '16px', padding: '14px 36px' }}>
          Create your account
        </Link>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: 'var(--green-deepest)',
        padding: '40px 5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M6 8h8M10 4v8" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </div>
          <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '16px', color: 'white' }}>Gyaanpravaha</p>
        </div>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
          Learn it. Know it. Flow with it.
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
          © 2026 Gyaanpravaha Consultancy · gyaanpravaha.in
        </p>
      </footer>

    </div>
  )
}
