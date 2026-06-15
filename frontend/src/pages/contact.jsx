import "../styles/contact.css";
import { useState } from "react";
import Navbar from "../components/navbar";
import GreenFooter from "../components/GreenFooter";

function Contact() {
  const [form, setForm] = useState({
    fullName: "",
    number: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const { fullName, number, subject, message } = form;
    const text = encodeURIComponent(
      `Hello AZZOUHOUR-SOUSIA!\n\nName: ${fullName}\nPhone: ${number}\nSubject: ${subject}\n\n${message}`,
    );
    window.open(`https://wa.me/212762903524?text=${text}`, "_blank");
  };

  return (
    <>
      <Navbar />
      <div className="contact-section">
        <div className="contact-parent">
          {/* Header */}
          <div className="contact-div1">
            <span className="contact-brand">AZZOUHOUR-SOUSIA</span>
            <h1 className="contact-title">Contact us</h1>
            <p className="contact-subtitle">
              Fill in the form and we'll reply on WhatsApp as soon as possible.
            </p>
          </div>

          {/* Full name */}
          <div className="contact-div2 input-card">
            <label className="input-label" htmlFor="fullName">
              Full name
            </label>
            <input
              className="input-field"
              id="fullName"
              name="fullName"
              type="text"
              value={form.fullName}
              onChange={handleChange}
              placeholder="e.g. Youssef Bouhnach"
            />
          </div>

          {/* Phone */}
          <div className="contact-div3 input-card">
            <label className="input-label" htmlFor="number">
              Phone number (WhatsApp)
            </label>
            <input
              className="input-field"
              id="number"
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              placeholder="+212 6XX XXX XXX"
            />
          </div>

          {/* Subject */}
          <div className="contact-div4 input-card">
            <label className="input-label" htmlFor="subject">
              Subject
            </label>
            <select
              className="input-field"
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
            >
              <option value="">Select a topic...</option>
              <option value="Question about a product">
                Question about a product
              </option>
              <option value="Order inquiry">Order inquiry</option>
              <option value="Return or exchange">Return or exchange</option>
              <option value="Partnership or wholesale">
                Partnership or wholesale
              </option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Message */}
          <div className="contact-div5 input-card">
            <label className="input-label" htmlFor="message">
              Message
            </label>
            <textarea
              className="input-field input-textarea"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
            />
          </div>

          {/* Send button */}
          <div className="contact-div6">
            <button className="whatsapp-btn" onClick={handleClick}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Send via WhatsApp
            </button>
            <p className="reply-hint">We usually reply within a few hours.</p>
          </div>

          {/* Direct contact */}
          <div className="contact-div7">
            <p className="direct-label">Prefer to reach out directly?</p>
            <div className="direct-links">
              <a href="tel:+212762903524" className="direct-chip">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 5.49 5.49l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                +212 762 903 524
              </a>
              <a
                href="mailto:bouhnachyoussef4@gmail.com"
                className="direct-chip"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                azzohoursoussia@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <GreenFooter />
    </>
  );
}

export default Contact;
