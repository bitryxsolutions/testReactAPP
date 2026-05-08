import React, { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [isVisible, setIsVisible] = useState(false)
  const [appState, setAppState] = useState('initial') // 'initial', 'opening', 'opened'
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const audioRef = useRef(null)

  const handleOpenInvitation = () => {
    setAppState('opening')
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(err => console.log("Audio play failed:", err))
    }

    // Elegant Firework animation
    const duration = 6500;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000, colors: ['#ff0000', '#ff4d4d', '#cc0000', '#ffffff'] };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // After 6.5 seconds, transition to opened
    setTimeout(() => {
      setAppState('opened')
    }, 6500)
  }

  // Using June 11, 2026 as the wedding date
  const weddingDate = new Date('June 14, 2026 06:30').getTime()

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => console.log("Audio play failed:", err))
      }
      setIsPlaying(!isPlaying)
    }
  }

  useEffect(() => {
    setIsVisible(true)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate - now

      if (distance < 0) {
        clearInterval(timer)
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Background Music */}
      <audio ref={audioRef} src="/music.mp3" loop />

      {appState !== 'opened' && (
        <div className={`invitation-overlay ${appState === 'opening' ? 'fade-out-late' : ''}`}>
          {appState === 'initial' ? (
            <div className="envelope-wrapper" onClick={handleOpenInvitation}>
              <div className="envelope">
                <div className="envelope-pocket"></div>
                <div className="envelope-flap"></div>
                <div className="envelope-heart">
                  <svg viewBox="0 0 24 24" width="30" height="30">
                    <path fill="#ff0000" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <div className="envelope-text">Open Invitation</div>
            </div>
          ) : (
            <div className="heart-animation-container">
              <svg viewBox="0 0 200 200" className="animated-heart-svg">
                <path
                  className="animated-heart-path"
                  pathLength="100"
                  d="M 100 50 C 60 10, 10 50, 40 110 C 60 150, 80 170, 100 190 C 120 170, 140 150, 160 110 C 190 50, 140 10, 100 50"
                />
              </svg>
              <div className="transition-names">
                Tharuka
                <span className="ampersand">&amp;</span>
                Rashmi
              </div>
            </div>
          )}
        </div>
      )}

      {appState !== 'initial' && (
        <div className={`wedding-app ${appState === 'opening' ? 'hidden-app' : 'fade-in-app'}`}>
          {/* Hero Section */}
          <section className="hero-section">
            <div className={`hero-content ${isVisible ? 'animate-fade-in' : ''}`}>
              <div className="hero-subtitle">We are getting married</div>
              <h1 className="hero-title"> Tharuka<br />&amp;<br />  Rashmi </h1>
              <div className="hero-date">JUNE 14, 2026 • Hotel Kabalana Beach</div>
            </div>

            <div className="scroll-down-btn" onClick={() => document.getElementById('countdown')?.scrollIntoView({ behavior: 'smooth' })}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 9 12 17 20 9" />
              </svg>
            </div>
          </section>

          {/* Countdown Section */}
          <section className="countdown-section" id="countdown">
            <div className="container">
              <div className="hero-subtitle" style={{ margin: 0 }}>The Countdown Begins</div>
              <div className="countdown-container">
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.days}</span>
                  <span className="countdown-label">Days</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.hours}</span>
                  <span className="countdown-label">Hours</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.minutes}</span>
                  <span className="countdown-label">Mins</span>
                </div>
                <div className="countdown-item">
                  <span className="countdown-value">{timeLeft.seconds}</span>
                  <span className="countdown-label">Secs</span>
                </div>
              </div>
            </div>
          </section>

          {/* The Happy Couple Section */}
          <section className="couple-section" id="couple">
            <div className="container">
              <div className="timeline-header" style={{ marginBottom: '3rem' }}>
                <div className="timeline-subtitle">THE HAPPY COUPLE</div>
                <h2 className="timeline-title" style={{ fontSize: '2.8rem', fontStyle: 'normal' }}>Together is a wonderful place to be</h2>
              </div>

              <div className="couple-grid">
                <div className="couple-profile">
                  <div className="couple-image-wrap">
                    <img src="/images/IMG_3423.jpg.jpeg" alt="The Bride" className="couple-image" />
                  </div>
                  <h3 className="couple-name">Rashmi</h3>
                  <div className="couple-role">The Bride</div>
                </div>

                <div className="couple-profile">
                  <div className="couple-image-wrap">
                    <img src="/images/IMG_5634.JPG.jpeg" alt="The Groom" className="couple-image" />
                  </div>
                  <h3 className="couple-name">Tharuka Dilshan</h3>
                  <div className="couple-role">The Groom</div>
                </div>
              </div>
            </div>
          </section>

          {/* Events Details Section */}
          <section className="events-timeline-section" id="events">
            <div className="container">
              <div className="timeline-header">
                <div className="timeline-subtitle">CEREMONY & CELEBRATION</div>
                <h2 className="timeline-title">Event Details</h2>
                <div className="timeline-date">14th June 2026</div>
              </div>

              <div className="timeline-wrapper">
                {/* Vertical Line */}
                <div className="timeline-line"></div>

                {/* Item 1 */}
                <div className="timeline-item">
                  <div className="timeline-icon">♡</div>
                  <div className="timeline-content">
                    <span className="timeline-time">6:30 PM</span>
                    <h3 className="timeline-event-title">Welcome The Happy Couple</h3>
                    <p className="timeline-desc">Welcome the bride and groom</p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="timeline-item">
                  <div className="timeline-icon">🥂</div>
                  <div className="timeline-content">
                    <span className="timeline-time">7:30 PM</span>
                    <h3 className="timeline-event-title">Cocktail Time</h3>
                    <p className="timeline-desc">Drinks & celebration begin</p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="timeline-item">
                  <div className="timeline-icon">🍽️</div>
                  <div className="timeline-content">
                    <span className="timeline-time">8:00 PM</span>
                    <h3 className="timeline-event-title">Dinner</h3>
                    <p className="timeline-desc">Delightful wedding feast</p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="timeline-item">
                  <div className="timeline-icon">🎵</div>
                  <div className="timeline-content">
                    <span className="timeline-time">9:00 PM</span>
                    <h3 className="timeline-event-title">Party Time</h3>
                    <p className="timeline-desc">Music, laughter & dancing</p>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="timeline-item">
                  <div className="timeline-icon">✨</div>
                  <div className="timeline-content">
                    <span className="timeline-time">11:00 PM</span>
                    <h3 className="timeline-event-title">Fireworks</h3>
                    <p className="timeline-desc">A dazzling display of lights</p>
                  </div>
                </div>

                {/* Item 6 */}
                <div className="timeline-item">
                  <div className="timeline-icon">🌙</div>
                  <div className="timeline-content">
                    <span className="timeline-time">12:00 PM</span>
                    <h3 className="timeline-event-title">Going Away</h3>
                    <p className="timeline-desc">Blessed send-off</p>
                  </div>
                </div>
              </div>

              <div className="timeline-actions">
                <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Tharuka+%26+Rashmi+Wedding&dates=20260614T1830/20260614T110000&details=We+can't+wait+to+celebrate+with+you!&location=Grand+Monarch,+Thalawathugoda,+Sri+Lanka" target="_blank" rel="noopener noreferrer" className="btn-calendar" style={{ textDecoration: 'none', display: 'inline-block' }}>📅 Add to Calendar</a>
                <a href="https://www.google.com/maps?cid=15727608641926233904&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en-US" target="_blank" rel="noopener noreferrer" className="btn-maps" style={{ textDecoration: 'none', display: 'inline-block' }}>📍 View on Maps</a>
              </div>

              <div className="timeline-location">
                Hotel Kabalana Beach — Ahangama, Sri Lanka
              </div>
            </div>
          </section>

          {/* Photo Gallery Section */}
          <section className="gallery-section" id="gallery">
            <div className="container">
              <div className="timeline-header" style={{ marginBottom: '3rem' }}>
                <div className="timeline-subtitle">OUR MOMENTS</div>
                <h2 className="timeline-title" style={{ fontSize: '3rem' }}>Gallery</h2>
              </div>

              <div className="gallery-grid-new">
                {[
                  "couple.JPEG",
                  "IMG_2382.JPG.jpeg",
                  "IMG_4718.jpg.jpeg",
                  "IMG_4068.JPG.jpg"
                ].map((img, index) => (
                  <div className="gallery-item-new" key={index}>
                    <img src={`/images/${img}`} alt={`Wedding memory ${index + 1}`} className="gallery-img-new" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Venue and Map Section */}
          <section className="map-section" id="venue">
            <div className="container">
              <h2 className="section-title">Getting There</h2>
              <p className="text-center story-text">We have arranged valet service for all guests attending the reception.</p>

              <div className="map-container">
                {/* Google Maps Iframe for Hotel Kabalana Beach */}
                <iframe
                  src="https://maps.google.com/maps?q=Hotel%20Kabalana%20Beach,%20Ahangama,%20Sri%20Lanka&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="map-iframe"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </section>

          {/* RSVP Section */}
          <section className="rsvp-section" id="rsvp">
            <div className="container">
              <h2 className="section-title" style={{ color: 'var(--color-light)' }}>Kindly RSVP</h2>
              <p className="rsvp-text">Please let us know if you can make it by June 1st, 2026.</p>
              <form action="https://formsubmit.co/trdilshan99@gmail.com" method="POST" className="rsvp-form">
                <input type="hidden" name="_subject" value="New Wedding RSVP!" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="form-group">
                  <label className="form-label">Full Name(s)</label>
                  <input type="text" name="name" className="form-input" placeholder="e.g. John & Jane Doe" required />
                </div>

                <div className="form-group">
                  <label className="form-label">Will you be attending?</label>
                  <select name="attending" className="form-select" required>
                    <option value="">Please select...</option>
                    <option value="Yes, Joyfully Accept">Joyfully Accept</option>
                    <option value="No, Regretfully Decline">Regretfully Decline</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Number of Guests</label>
                  <select name="guests" className="form-select">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Dietary Restrictions / Song Requests</label>
                  <input type="text" name="notes" className="form-input" placeholder="Any requests to make your night perfect?" />
                </div>

                <button type="submit" className="btn-primary">Send RSVP</button>
              </form>
            </div>
          </section>

          {/* Contact Details Section */}
          <section className="contact-section" id="contact">
            <div className="container">
              <h2 className="section-title" style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '4rem', fontWeight: 'normal', marginBottom: '1rem', color: '#4a4a4a' }}>Get in Touch</h2>
              <div style={{ width: '80px', height: '2px', backgroundColor: 'var(--color-accent)', margin: '0 auto 4rem' }}></div>
              <div className="contact-grid">
                <div className="contact-item">
                  <div className="contact-icon" style={{ fontSize: '3rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>✉️</div>
                  <h4 className="contact-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 'normal', color: '#4a4a4a', marginBottom: '1.5rem' }}>Email Us</h4>
                  <div className="contact-info" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#777' }}>trdilshan99@gmail.com</div>
                </div>
                <div className="contact-item">
                  <div className="contact-icon" style={{ fontSize: '3rem', marginBottom: '1.5rem', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>📞</div>
                  <h4 className="contact-title" style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', fontWeight: 'normal', color: '#4a4a4a', marginBottom: '1.5rem' }}>Call Us</h4>
                  <div className="contact-info" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#777', marginBottom: '0.8rem' }}>Tharuka: 0767765960</div>
                  <div className="contact-info" style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#777' }}>Rashmi: 0714432945</div>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-names">R & T</div>
            <p>Made with love for the beginning of our forever.</p>
          </footer>
        </div>
      )}

      {/* Floating Music Toggle Button */}
      {appState !== 'initial' && (
        <button className="music-toggle-btn" onClick={toggleAudio} aria-label="Toggle Music">
          {isPlaying ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      )}
    </>
  )
}

export default App
