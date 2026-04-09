'use client'

export default function AnimatedBook({ size = 100 }: { size?: number }) {
  const w = size
  const h = size * 0.72
  const half = w * 0.46
  const spine = w * 0.08

  return (
    <div style={{ width: w, height: h + 12, flexShrink: 0, position: 'relative' }}>
      <style>{`
        @keyframes gp-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        @keyframes gp-flip1 { 0%,20%{transform:rotateY(0deg)} 50%,80%{transform:rotateY(-175deg)} 100%{transform:rotateY(-175deg)} }
        @keyframes gp-flip2 { 0%,30%{transform:rotateY(0deg)} 60%,90%{transform:rotateY(-175deg)} 100%{transform:rotateY(-175deg)} }
        @keyframes gp-flip3 { 0%,40%{transform:rotateY(0deg)} 70%,100%{transform:rotateY(-175deg)} }
        @keyframes gp-star  { 0%,100%{opacity:1;transform:translateY(0)} 50%{opacity:0.4;transform:translateY(-8px)} }
        .gp-book-wrap { animation: gp-float 3s ease-in-out infinite; }
        .gp-p1 { transform-origin:left center; animation: gp-flip1 2.6s ease-in-out infinite; backface-visibility:hidden; }
        .gp-p2 { transform-origin:left center; animation: gp-flip2 2.6s ease-in-out infinite; backface-visibility:hidden; }
        .gp-p3 { transform-origin:left center; animation: gp-flip3 2.6s ease-in-out infinite; backface-visibility:hidden; }
        .gp-s1 { animation: gp-star 1.8s ease-in-out infinite; display:inline-block; }
        .gp-s2 { animation: gp-star 1.8s ease-in-out infinite 0.45s; display:inline-block; }
        .gp-s3 { animation: gp-star 1.8s ease-in-out infinite 0.9s; display:inline-block; }
      `}</style>

      {/* Stars */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 10 }}>
        <span className="gp-s1" style={{ fontSize: `${w * 0.12}px`, color: '#F59E0B' }}>★</span>
        <span className="gp-s2" style={{ fontSize: `${w * 0.09}px`, color: '#74C69D' }}>✦</span>
        <span className="gp-s3" style={{ fontSize: `${w * 0.11}px`, color: '#F59E0B' }}>★</span>
      </div>

      {/* Book */}
      <div className="gp-book-wrap" style={{ position: 'absolute', bottom: 0, left: 0, width: w, height: h, perspective: `${w * 3}px` }}>

        {/* Left page */}
        <div style={{ position: 'absolute', left: 0, top: 0, width: half, height: h, background: '#F0FDF4', borderRadius: `${w * 0.04}px 0 0 ${w * 0.04}px`, border: '1px solid #D8F3DC', borderRight: 'none', overflow: 'hidden' }}>
          {[0.28,0.42,0.55,0.68,0.78].map((t, i) => (
            <div key={i} style={{ position: 'absolute', top: `${t * 100}%`, left: '12%', width: `${i % 2 === 0 ? 72 : 56}%`, height: '1px', background: '#D8F3DC' }}/>
          ))}
        </div>

        {/* Spine */}
        <div style={{ position: 'absolute', left: half, top: 0, width: spine, height: h, background: 'linear-gradient(to right, #1B4332, #2D6A4F)', zIndex: 5 }}/>

        {/* Right page — base (visible when pages have flipped) */}
        <div style={{ position: 'absolute', left: half + spine, top: 0, width: half, height: h, background: '#F0FDF4', borderRadius: `0 ${w * 0.04}px ${w * 0.04}px 0`, border: '1px solid #D8F3DC', borderLeft: 'none', overflow: 'hidden' }}>
          {[0.28,0.42,0.55,0.68,0.78].map((t, i) => (
            <div key={i} style={{ position: 'absolute', top: `${t * 100}%`, left: '12%', width: `${i % 2 === 0 ? 70 : 50}%`, height: '1px', background: '#D8F3DC' }}/>
          ))}
        </div>

        {/* Flipping pages — stacked on top of right side, flip to left */}
        <div style={{ position: 'absolute', left: half + spine, top: 0, width: half, height: h, transformStyle: 'preserve-3d', zIndex: 6 }}>
          <div className="gp-p3" style={{ position: 'absolute', inset: 0, background: '#B7E4C7', borderRadius: `0 ${w * 0.04}px ${w * 0.04}px 0`, border: '1px solid #40916C', borderLeft: 'none' }}/>
          <div className="gp-p2" style={{ position: 'absolute', inset: 0, background: '#D8F3DC', borderRadius: `0 ${w * 0.04}px ${w * 0.04}px 0`, border: '1px solid #52B788', borderLeft: 'none' }}/>
          <div className="gp-p1" style={{ position: 'absolute', inset: 0, background: '#E8F8EE', borderRadius: `0 ${w * 0.04}px ${w * 0.04}px 0`, border: '1px solid #74C69D', borderLeft: 'none' }}/>
        </div>

        {/* Shadow */}
        <div style={{ position: 'absolute', bottom: `-${h * 0.06}px`, left: '10%', width: '80%', height: `${h * 0.06}px`, background: 'radial-gradient(ellipse, rgba(27,67,50,0.18) 0%, transparent 70%)', borderRadius: '50%' }}/>
      </div>
    </div>
  )
}
