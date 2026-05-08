import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const weddingDate = new Date("2026-08-20T10:00:00").getTime();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app">
      <section className="hero">
        <div className="overlay">
          <h1>Tharuka & Partner</h1>
          <p>We are getting married</p>
          <h2>20 August 2026</h2>
        </div>
      </section>

      <section className="countdown">
        <h2>Countdown to Our Big Day</h2>
        <div className="time-boxes">
          <div><span>{timeLeft.days}</span><p>Days</p></div>
          <div><span>{timeLeft.hours}</span><p>Hours</p></div>
          <div><span>{timeLeft.minutes}</span><p>Minutes</p></div>
          <div><span>{timeLeft.seconds}</span><p>Seconds</p></div>
        </div>
      </section>

      <section className="story">
        <h2>Our Story</h2>
        <p>
          With joyful hearts, we invite you to celebrate our wedding day with us.
          Your love, blessings, and presence will make our day even more special.
        </p>
      </section>

      <section className="details">
        <h2>Wedding Details</h2>
        <div className="card">
          <h3>Wedding Ceremony</h3>
          <p>Date: 20 August 2026</p>
          <p>Time: 10:00 AM</p>
          <p>Venue: Grand Wedding Hall, Colombo</p>
        </div>
        <div className="card">
          <h3>Reception</h3>
          <p>Time: 6:00 PM</p>
          <p>Venue: Same Location</p>
        </div>
      </section>

      <section className="gallery">
        <h2>Gallery</h2>
        <div className="gallery-grid">
          <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop" alt="Wedding 1" />
          <img src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop" alt="Wedding 2" />
          <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop" alt="Wedding 3" />
        </div>
      </section>

      <section className="rsvp">
        <h2>RSVP</h2>
        <form name="rsvp" method="POST" data-netlify="true">
          <input type="hidden" name="form-name" value="rsvp" />
          <input type="text" name="name" placeholder="Your name" required />
          <input type="number" name="guests" placeholder="Number of guests" required />
          <textarea name="message" placeholder="Your message" rows="4"></textarea>
          <button type="submit">Send RSVP</button>
        </form>
      </section>

      <footer className="footer">
        <p>With love, Tharuka & Partner</p>
      </footer>
    </div>
  );
}

export default App;