// Contact.jsx
import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { personal, contactSubjects } from '../data/content';
import './Contact.css';

const EMAILJS_CONFIG = {
  serviceId:  'service_0q783n4',
  templateId: 'template_d4q8bry',
  publicKey:  '-1uV3GuX4QYiiM1SF',
};

const CONTACT_INFO = [
  { icon: '✉',  label: 'Email',    value: personal.email,                        href: `mailto:${personal.email}` },
  { icon: '☎',  label: 'Phone',    value: personal.phone,                        href: `tel:${personal.phone.replace(/\s/g,'')}` },
  { icon: 'in', label: 'LinkedIn', value: 'linkedin.com/in/adityaprabhat-gupta', href: personal.linkedin, external: true },
  { icon: '⌥',  label: 'GitHub',   value: 'github.com/AdityaPrabhatGupta',       href: personal.github,   external: true },
];

const EMPTY = { name: '', email: '', subject: '', message: '' };

// SubjectDropdown — sleek dark dropdown with glow
function SubjectDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected = contactSubjects.find(s => s.id === value) || null;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const pick = (id) => { onChange(id); setOpen(false); };

  return (
    <>
      <style>{`
        @keyframes dd-slidein {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.95); }
          to   { opacity: 1; transform: translateY(0)   scaleY(1);    }
        }
        @keyframes dd-faderow {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: translateX(0);    }
        }

        .dd-wrap { position: relative; width: 100%; }

        /* ── Trigger button ── */
        .dd-trigger {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.85);
          cursor: pointer;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
          font-size: 13.5px;
          letter-spacing: 0.02em;
          user-select: none;
          outline: none;
          text-align: left;
        }
        .dd-trigger:hover {
          border-color: rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.06);
        }
        .dd-trigger.dd-open {
          border-color: #bcd631;
          box-shadow: 0 0 0 3px rgba(188,214,49,0.15), 0 0 20px rgba(188,214,49,0.08);
          background: rgba(188,214,49,0.04);
        }
        .dd-trigger.dd-has-value {
          border-color: var(--dd-sel-color, rgba(255,255,255,0.1));
          box-shadow: 0 0 0 2px color-mix(in srgb, var(--dd-sel-color, transparent) 20%, transparent);
        }
        .dd-trigger.dd-open.dd-has-value {
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--dd-sel-color, #bcd631) 25%, transparent),
                      0 0 20px color-mix(in srgb, var(--dd-sel-color, #bcd631) 12%, transparent);
        }

        .dd-trigger-icon {
          font-size: 17px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
          transition: background 0.2s, border-color 0.2s;
        }
        .dd-trigger.dd-open .dd-trigger-icon,
        .dd-trigger.dd-has-value .dd-trigger-icon {
          background: color-mix(in srgb, var(--dd-sel-color, #bcd631) 14%, transparent);
          border-color: color-mix(in srgb, var(--dd-sel-color, #bcd631) 35%, transparent);
        }

        .dd-trigger-text {
          flex: 1;
          color: inherit;
        }
        .dd-trigger-text.dd-placeholder {
          color: rgba(255,255,255,0.3);
        }

        .dd-chevron {
          flex-shrink: 0;
          width: 16px; height: 16px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.3);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), color 0.2s;
        }
        .dd-trigger.dd-open .dd-chevron {
          transform: rotate(180deg);
          color: #bcd631;
        }
        .dd-trigger.dd-has-value .dd-chevron {
          color: var(--dd-sel-color, rgba(255,255,255,0.3));
        }

        /* ── Dropdown panel ── */
        .dd-panel {
          position: absolute;
          top: calc(100% + 6px);
          left: 0; right: 0;
          z-index: 999;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.09);
          background: #111418;
          box-shadow: 0 16px 48px rgba(0,0,0,0.55), 0 0 0 1px rgba(188,214,49,0.06);
          overflow: hidden;
          animation: dd-slidein 0.22s cubic-bezier(0.16,1,0.3,1) both;
          transform-origin: top center;
          padding: 6px;
        }

        /* ── Each option row ── */
        .dd-option {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 13px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.15s;
          animation: dd-faderow 0.2s ease both;
          outline: none;
          border: 1px solid transparent;
        }
        .dd-option:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.06);
        }
        .dd-option.dd-active {
          background: color-mix(in srgb, var(--dd-opt-color) 10%, transparent);
          border-color: color-mix(in srgb, var(--dd-opt-color) 25%, transparent);
        }
        .dd-option:focus-visible {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.12);
        }

        .dd-opt-icon {
          font-size: 16px;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
          transition: background 0.15s, border-color 0.15s;
        }
        .dd-option:hover .dd-opt-icon,
        .dd-option.dd-active .dd-opt-icon {
          background: color-mix(in srgb, var(--dd-opt-color) 16%, transparent);
          border-color: color-mix(in srgb, var(--dd-opt-color) 40%, transparent);
        }

        .dd-opt-label {
          font-size: 13px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          transition: color 0.15s;
          flex: 1;
        }
        .dd-option:hover .dd-opt-label  { color: rgba(255,255,255,0.95); }
        .dd-option.dd-active .dd-opt-label {
          color: var(--dd-opt-color);
          font-weight: 600;
        }

        .dd-opt-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--dd-opt-color);
          opacity: 0;
          transition: opacity 0.15s;
          flex-shrink: 0;
          box-shadow: 0 0 6px var(--dd-opt-color);
        }
        .dd-option.dd-active .dd-opt-dot { opacity: 1; }

        /* Divider between options */
        .dd-divider {
          height: 1px;
          background: rgba(255,255,255,0.04);
          margin: 3px 0;
        }
      `}</style>

      <div className="dd-wrap" ref={ref}>
        {/* Hidden input for EmailJS */}
        <input type="hidden" name="subject" value={selected ? selected.label : ''} readOnly />

        {/* Trigger */}
        <div
          className={`dd-trigger${open ? ' dd-open' : ''}${selected ? ' dd-has-value' : ''}`}
          style={{ '--dd-sel-color': selected?.color || 'rgba(255,255,255,0.1)' }}
          onClick={() => setOpen(o => !o)}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          tabIndex={0}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(o => !o)}
        >
          <div className="dd-trigger-icon">
            {selected ? selected.icon : '✦'}
          </div>
          <span className={`dd-trigger-text${!selected ? ' dd-placeholder' : ''}`}>
            {selected ? selected.label : 'Select a topic…'}
          </span>
          <span className="dd-chevron">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>

        {/* Panel */}
        {open && (
          <div className="dd-panel" role="listbox">
            {contactSubjects.map((s, i) => (
              <>
                {i > 0 && <div key={`div-${s.id}`} className="dd-divider" />}
                <div
                  key={s.id}
                  className={`dd-option${value === s.id ? ' dd-active' : ''}`}
                  style={{ '--dd-opt-color': s.color, animationDelay: `${i * 0.04}s` }}
                  onClick={() => pick(s.id)}
                  role="option"
                  aria-selected={value === s.id}
                  tabIndex={0}
                  onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && pick(s.id)}
                >
                  <div className="dd-opt-icon">{s.icon}</div>
                  <span className="dd-opt-label">{s.label}</span>
                  <span className="dd-opt-dot" />
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════
// Contact section
// ══════════════════════════════════════════════════════
export default function Contact() {
  const formRef = useRef(null);
  const [form,   setForm]   = useState(EMPTY);
  const [status, setStatus] = useState('idle');

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));
  const setSubject = (id) => setForm(f => ({ ...f, subject: id }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.subject) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        formRef.current,
        EMAILJS_CONFIG.publicKey
      );
      setStatus('sent');
      setForm(EMPTY);
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const btnLabel = {
    idle:    'Send Message ↗',
    sending: 'Sending…',
    sent:    '✓ Message Sent!',
    error:   '✕ Failed — Try Again',
  }[status];

  return (
    <section className="contact" id="contact">
      <div className="contact-grid">

        {/* ── Left: info ── */}
        <div>
          <div className="s-label">Get In Touch</div>
          <h2 className="s-title">LET'S<br /><em>BUILD</em><br />TOGETHER</h2>
          <p className="s-desc">
            Looking for internships, freelance projects, or full-time opportunities. Let's connect!
          </p>

          <div className="contact-info">
            {CONTACT_INFO.map(({ icon, label, value, href, external }) => (
              <div key={label} className="cinfo-item">
                <div className="cinfo-icon">{icon}</div>
                <div>
                  <div className="cinfo-lbl">{label}</div>
                  <div className="cinfo-val">
                    <a href={href} target={external ? '_blank' : undefined} rel="noreferrer">
                      {value}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: form ── */}
        <div>
          <h3 className="form-heading">SEND A MESSAGE</h3>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="f-row">
              <div className="f-group">
                <label className="f-label">Your Name</label>
                <input className="f-input" type="text" name="from_name"
                  placeholder="John Doe" value={form.name}
                  onChange={set('name')} required />
              </div>
              <div className="f-group">
                <label className="f-label">Your Email</label>
                <input className="f-input" type="email" name="from_email"
                  placeholder="your@email.com" value={form.email}
                  onChange={set('email')} required />
              </div>
            </div>

            <div className="f-group">
              <label className="f-label">Subject</label>
              <SubjectDropdown value={form.subject} onChange={setSubject} />
            </div>

            <div className="f-group">
              <label className="f-label">Message</label>
              <textarea className="f-textarea" name="message"
                placeholder="Tell me about the opportunity or project…"
                value={form.message} onChange={set('message')} required />
            </div>

            <button
              className={`btn-submit btn-submit--${status}`}
              type="submit"
              disabled={status === 'sending' || !form.subject}
            >
              {btnLabel}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}