import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import '../styles/KarenChat.css';

const responses = {
  projects:
    "Plankton has analyzed Andi's work. Projects include SnapMarket, DUI Risk Radar, Fight Coach, ASL Interpreter, and three classified ones still in development.",
  skills:
    'Skills on file: React, Python, MediaPipe, computer vision, LSTM models, machine learning. Not bad for a surface dweller.',
  contact:
    "Use the Contact page on this site to reach Andi. Email and phone are not posted here—don't make me repeat myself.",
  internship:
    'Andi is targeting internships in defense, embedded systems, and AI companies in Texas. Highly qualified. Plankton approves.',
  resume:
    "Resume is available on the About page. It's quite impressive for someone who doesn't have a PhD like Plankton.",
  default:
    "I'm Karen, Plankton's computer wife. Ask me about Andi's projects, skills, or how to contact her.",
};

/**
 * Maps topics to substrings we match with String.prototype.includes() on the lowercased message.
 * Order of keys in matchReply() matters: first match wins.
 */
const topicTriggers = {
  projects: ['project', 'portfolio', 'snapmarket', 'snap market', 'dui', 'fight coach', 'asl', 'classified'],
  skills: ['skill', 'react', 'python', 'mediapipe', 'lstm', 'machine learning', 'computer vision', 'tech stack', 'stack'],
  contact: ['contact', 'vercel', 'email', 'reach andi', 'how to reach'],
  internship: [
    'internship',
    'internships',
    'summer intern',
    'defense',
    'embedded',
    'embedded systems',
    'texas',
    'hiring',
    'hire',
  ],
  resume: ['resume', 'cv', 'curriculum'],
};

function matchReply(message) {
  const m = message.toLowerCase().trim();
  if (!m) return responses.default;

  const order = ['projects', 'skills', 'contact', 'internship', 'resume'];
  for (const key of order) {
    const needles = topicTriggers[key];
    if (needles.some((needle) => m.includes(needle))) {
      return responses[key];
    }
  }
  return responses.default;
}

const KarenChat = () => {
  const panelId = useId();
  const inputId = useId();
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(() => [
    { role: 'karen', text: responses.default },
  ]);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, scrollToBottom]);

  const send = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'karen', text: matchReply(trimmed) },
    ]);
    setInput('');
  }, [input]);

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  return (
    <div className="karen-chat-root">
      <button
        type="button"
        className="karen-chat-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? 'Close' : 'Ask Karen'}
      </button>

      {open && (
        <section
          id={panelId}
          className="karen-chat-panel"
          aria-label="Karen chat"
        >
          <header className="karen-chat-header">
            <span className="karen-chat-title">KAREN</span>
            <span className="karen-chat-sub">Plankton Industries</span>
          </header>

          <div
            ref={listRef}
            className="karen-chat-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`karen-chat-bubble karen-chat-bubble--${msg.role}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="karen-chat-form" onSubmit={onSubmit}>
            <label htmlFor={inputId} className="visually-hidden">
              Message to Karen
            </label>
            <input
              id={inputId}
              type="text"
              className="karen-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about projects, skills, contact…"
              autoComplete="off"
              maxLength={500}
            />
            <button type="submit" className="karen-chat-send">
              Send
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default KarenChat;
