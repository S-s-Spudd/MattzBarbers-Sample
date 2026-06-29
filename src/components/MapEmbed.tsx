/**
 * MapEmbed.tsx — Lazy-loaded Google Maps
 * Shows a styled placeholder until the user clicks "Load Map"
 * Prevents the Google Maps iframe from blocking page load
 */
import { useState } from 'react';

const PIN_SVG = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

export default function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  const copyAddress = () => {
    navigator.clipboard?.writeText('30A Walmley Road, Sutton Coldfield, B76 1QN')
      .catch(() => {/* silent fail */});
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '380px' }}>
      {loaded ? (
        <iframe
          title="Mattz Barbers on Google Maps"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1145.1872912523181!2d-1.8006928126224162!3d52.54126149999211!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x646938b07cd82070!2sMattz%20Barbers!5e0!3m2!1sen!2suk!4v1660932794959!5m2!1sen!2suk"
          style={{ width: '100%', height: '100%', minHeight: '380px', border: 0, display: 'block' }}
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map-placeholder" style={{ minHeight: '380px' }}>
          {/* Pin icon */}
          <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}>{PIN_SVG}</div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text)',
            marginBottom: '0.5rem', lineHeight: 1.2
          }}>
            Map paused for speed.
          </h3>

          <div style={{ borderLeft: '1px solid var(--accent)', paddingLeft: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.68rem', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
              Exact shop pin
            </p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              30A Walmley Road, Sutton Coldfield, B76 1QN
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', marginTop: '0.35rem', lineHeight: 1.5 }}>
              Load the live map only when you need directions.
            </p>
          </div>

          <button onClick={() => setLoaded(true)} className="map-load-btn">
            Load Map
          </button>

          {/* Quick action row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=52.5412615,-1.8006928"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: '0.72rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)'; }}
            >
              Directions
            </a>
            <button
              onClick={copyAddress}
              style={{
                padding: '0.5rem 1rem', border: '1px solid var(--border)',
                color: 'var(--text-muted)', fontSize: '0.72rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--accent)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--accent)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; }}
            >
              Copy Address
            </button>
            <a
              href="https://www.fresha.com/a/mattz-barbers-birmingham-the-royal-town-of-sutton-coldfield-30a-walmley-road-q138b6q6/booking?allOffer=true&pId=1394571"
              target="_blank" rel="noopener noreferrer"
              style={{
                padding: '0.5rem 1rem', border: '1px solid var(--accent)',
                color: 'var(--accent)', fontSize: '0.72rem',
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--accent)'; (e.currentTarget as HTMLAnchorElement).style.color = '#F5F4EF'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.color = 'var(--accent)'; }}
            >
              Book
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
