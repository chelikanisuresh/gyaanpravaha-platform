// src/lib/certificate-generator.ts
// Generates a printable HTML certificate for subject completion

interface CertificateData {
  studentName: string
  subjectLabel: string
  subjectEmoji: string
  completionDate: string
  chaptersCount: number
  avgScore: number | null
}

export function generateCertificateHTML(data: CertificateData): string {
  const { studentName, subjectLabel, subjectEmoji, completionDate, chaptersCount, avgScore } = data

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Certificate of Completion — ${subjectLabel}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@400;500;600&display=swap');
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body {
    background: #F8F5F0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .certificate {
    width: 842px;
    min-height: 595px;
    background: white;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  }

  /* Decorative border */
  .border-outer {
    position: absolute;
    inset: 14px;
    border: 2.5px solid #1B4332;
    border-radius: 4px;
    pointer-events: none;
  }
  .border-inner {
    position: absolute;
    inset: 20px;
    border: 1px solid #74C69D;
    border-radius: 2px;
    pointer-events: none;
  }

  /* Corner ornaments */
  .corner {
    position: absolute;
    width: 40px;
    height: 40px;
  }
  .corner svg { width: 100%; height: 100%; }
  .corner-tl { top: 8px; left: 8px; }
  .corner-tr { top: 8px; right: 8px; transform: scaleX(-1); }
  .corner-bl { bottom: 8px; left: 8px; transform: scaleY(-1); }
  .corner-br { bottom: 8px; right: 8px; transform: scale(-1); }

  /* Background watermark */
  .watermark {
    position: absolute;
    font-size: 180px;
    opacity: 0.04;
    color: #1B4332;
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    letter-spacing: -10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(-15deg);
    white-space: nowrap;
    pointer-events: none;
  }

  /* Content */
  .header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 8px;
  }
  .logo-text {
    font-family: 'Playfair Display', serif;
    font-size: 18px;
    font-weight: 700;
    color: #1B4332;
    letter-spacing: 0.5px;
  }
  .logo-sub {
    font-size: 10px;
    color: #52B788;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-top: 2px;
    text-align: center;
  }

  .divider {
    width: 80px;
    height: 1.5px;
    background: linear-gradient(90deg, transparent, #74C69D, transparent);
    margin: 18px auto;
  }

  .title {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    font-weight: 600;
    color: #52B788;
    letter-spacing: 4px;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 20px;
  }

  .certifies {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #6B7280;
    text-align: center;
    margin-bottom: 12px;
  }

  .student-name {
    font-family: 'Playfair Display', serif;
    font-size: 48px;
    font-weight: 700;
    color: #1B4332;
    text-align: center;
    line-height: 1.1;
    margin-bottom: 20px;
    letter-spacing: -0.5px;
  }

  .completion-text {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #6B7280;
    text-align: center;
    line-height: 1.8;
    max-width: 480px;
    margin-bottom: 28px;
  }

  .subject-badge {
    display: flex;
    align-items: center;
    gap: 12px;
    background: linear-gradient(135deg, #F0FDF4, #DCFCE7);
    border: 1.5px solid #86EFAC;
    border-radius: 50px;
    padding: 12px 28px;
    margin-bottom: 32px;
  }
  .subject-emoji { font-size: 24px; }
  .subject-name {
    font-family: 'Playfair Display', serif;
    font-size: 22px;
    font-weight: 700;
    color: #1B4332;
  }

  .stats {
    display: flex;
    gap: 40px;
    margin-bottom: 36px;
    align-items: center;
  }
  .stat {
    text-align: center;
  }
  .stat-value {
    font-family: 'Playfair Display', serif;
    font-size: 28px;
    font-weight: 700;
    color: #1B4332;
    line-height: 1;
    margin-bottom: 4px;
  }
  .stat-label {
    font-size: 11px;
    color: #9CA3AF;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .stat-divider {
    width: 1px;
    height: 40px;
    background: #E5E7EB;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    width: 100%;
    padding-top: 24px;
    border-top: 1px solid #F1F5F9;
  }
  .footer-left {
    text-align: left;
  }
  .footer-right {
    text-align: right;
  }
  .footer-label {
    font-size: 10px;
    color: #9CA3AF;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .footer-value {
    font-family: 'Playfair Display', serif;
    font-size: 14px;
    font-weight: 700;
    color: #374151;
  }
  .signature-line {
    width: 140px;
    height: 1px;
    background: #D1D5DB;
    margin-top: 28px;
    margin-bottom: 6px;
  }
  .footer-center {
    text-align: center;
  }
  .seal {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1B4332, #2D6A4F);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    border: 3px solid #52B788;
    box-shadow: 0 4px 12px rgba(27,67,50,0.3);
  }

  @media print {
    body { background: white; }
    .certificate { box-shadow: none; }
  }

  @page {
    size: A4 landscape;
    margin: 0;
  }
</style>
</head>
<body>
<div class="certificate">
  <!-- Decorative borders -->
  <div class="border-outer"></div>
  <div class="border-inner"></div>

  <!-- Corner ornaments -->
  <div class="corner corner-tl">
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M2 38 L2 2 L38 2" stroke="#1B4332" stroke-width="1.5" fill="none"/>
      <path d="M2 20 Q11 11 20 2" stroke="#74C69D" stroke-width="1" fill="none"/>
      <circle cx="2" cy="2" r="3" fill="#1B4332"/>
    </svg>
  </div>
  <div class="corner corner-tr">
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M2 38 L2 2 L38 2" stroke="#1B4332" stroke-width="1.5" fill="none"/>
      <path d="M2 20 Q11 11 20 2" stroke="#74C69D" stroke-width="1" fill="none"/>
      <circle cx="2" cy="2" r="3" fill="#1B4332"/>
    </svg>
  </div>
  <div class="corner corner-bl">
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M2 38 L2 2 L38 2" stroke="#1B4332" stroke-width="1.5" fill="none"/>
      <path d="M2 20 Q11 11 20 2" stroke="#74C69D" stroke-width="1" fill="none"/>
      <circle cx="2" cy="2" r="3" fill="#1B4332"/>
    </svg>
  </div>
  <div class="corner corner-br">
    <svg viewBox="0 0 40 40" fill="none">
      <path d="M2 38 L2 2 L38 2" stroke="#1B4332" stroke-width="1.5" fill="none"/>
      <path d="M2 20 Q11 11 20 2" stroke="#74C69D" stroke-width="1" fill="none"/>
      <circle cx="2" cy="2" r="3" fill="#1B4332"/>
    </svg>
  </div>

  <!-- Watermark -->
  <div class="watermark">GP</div>

  <!-- Header -->
  <div class="header">
    <div>
      <div class="logo-text">Gyaanpravaha</div>
      <div class="logo-sub">gyaanpravaha.in</div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- Title -->
  <div class="title">Certificate of Completion</div>

  <!-- Body -->
  <div class="certifies">This is to certify that</div>

  <div class="student-name">${studentName}</div>

  <div class="completion-text">
    has successfully completed all chapters and assessments in
  </div>

  <!-- Subject badge -->
  <div class="subject-badge">
    <span class="subject-emoji">${subjectEmoji}</span>
    <span class="subject-name">${subjectLabel}</span>
  </div>

  <!-- Stats -->
  <div class="stats">
    <div class="stat">
      <div class="stat-value">${chaptersCount}</div>
      <div class="stat-label">Chapters</div>
    </div>
    <div class="stat-divider"></div>
    <div class="stat">
      <div class="stat-value">7</div>
      <div class="stat-label">Sections each</div>
    </div>
    ${avgScore !== null ? `
    <div class="stat-divider"></div>
    <div class="stat">
      <div class="stat-value">${avgScore}%</div>
      <div class="stat-label">Avg Quiz Score</div>
    </div>` : ''}
  </div>

  <!-- Footer -->
  <div class="footer">
    <div class="footer-left">
      <div class="footer-label">Date of Completion</div>
      <div class="footer-value">${completionDate}</div>
      <div class="signature-line"></div>
      <div class="footer-label">Date</div>
    </div>

    <div class="footer-center">
      <div class="seal">🌿</div>
    </div>

    <div class="footer-right">
      <div class="footer-label">Issued by</div>
      <div class="footer-value">Gyaanpravaha</div>
      <div class="signature-line" style="margin-left:auto"></div>
      <div class="footer-label">Authorised Signature</div>
    </div>
  </div>
</div>
</body>
</html>`
}

export function downloadCertificate(data: CertificateData) {
  const html  = generateCertificateHTML(data)
  const blob  = new Blob([html], { type: 'text/html' })
  const url   = URL.createObjectURL(blob)
  const a     = document.createElement('a')
  a.href      = url
  a.download  = `Gyaanpravaha-Certificate-${data.subjectLabel.replace(/\s+/g, '-')}.html`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
