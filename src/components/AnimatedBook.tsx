'use client'

export default function AnimatedBook({ size = 120 }: { size?: number }) {
  const s = size
  return (
    <div style={{ position: 'relative', width: s, height: s * 0.75, flexShrink: 0 }}>
      <style>{`
        @keyframes gpFlip1 { 0%,30%{transform:rotateY(0deg)} 60%,100%{transform:rotateY(-170deg)} }
        @keyframes gpFlip2 { 0%,45%{transform:rotateY(0deg)} 75%,100%{transform:rotateY(-170deg)} }
        @keyframes gpFlip3 { 0%,60%{transform:rotateY(0deg)} 90%,100%{transform:rotateY(-170deg)} }
        @keyframes gpFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes gpStar  { 0%,100%{opacity:1;transform:translateY(0) scale(1)} 50%{opacity:0.5;transform:translateY(-8px) scale(0.8)} }
        .gp-book { animation: gpFloat 3s ease-in-out infinite; }
        .gp-p1 { transform-origin:left center; animation: gpFlip1 2.4s ease-in-out infinite; transform-style:preserve-3d; }
        .gp-p2 { transform-origin:left center; animation: gpFlip2 2.4s ease-in-out infinite; transform-style:preserve-3d; }
        .gp-p3 { transform-origin:left center; animation: gpFlip3 2.4s ease-in-out infinite; transform-style:preserve-3d; }
        .gp-s1 { animation: gpStar 1.8s ease-in-out infinite; }
        .gp-s2 { animation: gpStar 1.8s ease-in-out infinite 0.4s; }
        .gp-s3 { animation: gpStar 1.8s ease-in-out infinite 0.8s; }
      `}</style>

      <div className="gp-book" style={{ perspective: '300px', width: '100%', height: '100%' }}>
        <svg viewBox="0 0 120 90" width={s} height={s * 0.75} style={{ overflow: 'visible' }}>

          {/* Stars floating above */}
          <text className="gp-s1" x="30" y="8"  fontSize="10" fill="#F59E0B">★</text>
          <text className="gp-s2" x="60" y="4"  fontSize="8"  fill="#74C69D">✦</text>
          <text className="gp-s3" x="88" y="8"  fontSize="10" fill="#F59E0B">★</text>

          {/* Book spine */}
          <rect x="57" y="14" width="6" height="68" rx="2" fill="#1B4332"/>

          {/* Left page base */}
          <rect x="8" y="16" width="49" height="64" rx="4" fill="#F0FDF4" stroke="#D8F3DC" stroke-width="1"/>
          <line x1="16" y1="30" x2="50" y2="30" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="16" y1="40" x2="50" y2="40" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="16" y1="50" x2="42" y2="50" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="16" y1="60" x2="50" y2="60" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="16" y1="70" x2="38" y2="70" stroke="#D8F3DC" stroke-width="0.8"/>

          {/* Right page base */}
          <rect x="63" y="16" width="49" height="64" rx="4" fill="#F0FDF4" stroke="#D8F3DC" stroke-width="1"/>
          <line x1="71" y1="30" x2="104" y2="30" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="71" y1="40" x2="104" y2="40" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="71" y1="50" x2="96"  y2="50" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="71" y1="60" x2="104" y2="60" stroke="#D8F3DC" stroke-width="0.8"/>
          <line x1="71" y1="70" x2="92"  y2="70" stroke="#D8F3DC" stroke-width="0.8"/>

          {/* Shadow under book */}
          <ellipse cx="60" cy="86" rx="40" ry="4" fill="#1B4332" opacity="0.1"/>
        </svg>

        {/* Flipping pages using CSS - positioned over right side */}
        <div style={{ position: 'absolute', top: `${s * 0.178}px`, left: `${s * 0.525}px`, width: `${s * 0.408}px`, height: `${s * 0.711}px`, transformStyle: 'preserve-3d' }}>
          <div className="gp-p1" style={{ position: 'absolute', inset: 0, background: '#E8F8EE', borderRadius: '4px', border: '1px solid #74C69D', backfaceVisibility: 'hidden' }}/>
          <div className="gp-p2" style={{ position: 'absolute', inset: 0, background: '#D8F3DC', borderRadius: '4px', border: '1px solid #52B788', backfaceVisibility: 'hidden' }}/>
          <div className="gp-p3" style={{ position: 'absolute', inset: 0, background: '#B7E4C7', borderRadius: '4px', border: '1px solid #40916C', backfaceVisibility: 'hidden' }}/>
        </div>
      </div>
    </div>
  )
}
