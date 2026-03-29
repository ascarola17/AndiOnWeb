import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import '../styles/AskAndi.css';

const TYPING_MS_UNSAFE = 800;
const BURST_WINDOW_MS = 10000;
const BURST_MAX_BEFORE_SLOW = 3;

const GREETING_TEXT =
  "Hey! I'm Andi 🌊 Ask me about projects, the stack, internships, or why this site is SpongeBob-themed.";

const API_ERROR_FALLBACK = 'Something glitched in the lab — try again 🧪';

const knowledge = {
  projects:
    "I build a mix of AI, computer vision, and real-world software projects. A lot of my work sits at the intersection of research and engineering, like fiber orientation analysis for ceramic micrographs, AI secretary workflows, and tools that turn messy data into something useful.",
  skills:
    "My strongest skills are in Python, JavaScript, AI workflows, computer vision, and full-stack building. I'm comfortable going from idea to working prototype, whether that means training models, building FastAPI apps, wiring up databases, or deploying systems with Docker.",
  internship:
    "I've done research-heavy work through UTEP and the Keck Center, where I've contributed software and AI work tied to real engineering problems. I'm especially interested in internships and roles where I can apply AI, vision, automation, or product thinking to something that actually matters.",
  resume:
    "My resume reflects a blend of software engineering, applied AI, research, and startup-minded building. I like showing projects that prove I can code, think through ambiguity, and ship things that connect technical work to real outcomes.",
  contact:
    "You can reach out if you want to talk about internships, research, startups, or just something cool you saw on my portfolio. I'm always open to genuine conversations, especially around AI, software, and building interesting things.",
  school:
    "I'm at UTEP in El Paso studying computer science, and I recently switched my master's focus to AI. That shift felt natural because a lot of the work I care about most already lives in machine learning, automation, and intelligent systems.",
  spongebob:
    "Yes, the SpongeBob section is intentional. I like having some personality in my portfolio because I'm serious about my work, but I'm not trying to sound like a robot while doing it.",
  about:
    "I'm Andi, a builder who likes turning ambitious ideas into real systems. A lot of my work comes from curiosity, but I care just as much about execution, polish, and making sure what I build is actually useful.",
  hobbies:
    "Outside of coding, I'm into the gym, content ideas, startup conversations, and thinking through big-picture life stuff. I also like photography, creative projects, and anything that mixes ambition with personality.",
  experience:
    "My experience spans research, software development, AI experimentation, and technical problem-solving across different kinds of projects. I've worked on things like computer vision pipelines, embedded-style systems, backend tools, and startup concepts, so I'm used to learning fast and figuring things out.",
  default:
    "I'm probably the best source here if you want to know what I've built, what I'm into, or where I'm headed. Ask me about projects, AI, school, experience, or anything on the site and I'll keep it real.",
};

const isSafe = (msg) => {
  const blocked = [
    'salary',
    'address',
    'phone',
    'email',
    'ssn',
    'password',
    'where do you live',
    'how old',
    'relationship',
    'dating',
    'sex',
    'political',
    'religion',
    'race',
    'illegal',
  ];
  return !blocked.some((word) => msg.toLowerCase().includes(word));
};

const isPortfolioRelated = (msg) => {
  const m = msg.toLowerCase().trim();
  if (m.length < 15) return true;
  const allowed = [
    'project',
    'skill',
    'intern',
    'job',
    'hire',
    'school',
    'utep',
    'resume',
    'contact',
    'experience',
    'build',
    'code',
    'tech',
    'stack',
    'andi',
    'portfolio',
    'spongebob',
    'work',
    'study',
    'ai',
    'python',
    'react',
    'hobby',
    'hobbies',
    'photography',
    'about',
    'who',
    'what',
    'how',
    'github',
    'hello',
    'hi',
    'hey',
    'thanks',
    'cool',
    'nice',
    'tell me',
    'show',
  ];
  return allowed.some((word) => m.includes(word));
};

const offTopicResponses = [
  'Stick to the portfolio stuff — ask me about my projects or skills 🌊',
  "That's not really my lane — I'm here to talk about Andi's work 🧽",
  'Nice try! Ask me something about my projects or background instead 🔒',
  'I only know Andi things — try asking about skills or experience 🤙',
];

const pickOffTopicResponse = () =>
  offTopicResponses[Math.floor(Math.random() * offTopicResponses.length)];

const UNSAFE_REPLY =
  "That's not something I share publicly — ask me about my projects or skills instead 🌊";
const SLOW_DOWN_REPLY = "Slow down! I'm just a portfolio bot 🧽";
const RATE_LIMIT_REPLY =
  "You've asked a lot of questions! Check out my full portfolio or hit the contact page to keep the convo going 👀";

const MAX_INPUT = 150;
const MAX_USER_SENDS = 8;

async function fetchChatReply(userMessage, signal) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage, knowledge }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || 'proxy-error');
  }
  if (typeof data.reply !== 'string' || !data.reply.trim()) {
    throw new Error('no-reply');
  }
  return data.reply.trim();
}

const AskAndi = () => {
  const panelId = useId();
  const inputId = useId();
  const listRef = useRef(null);
  const typingTimerRef = useRef(null);
  const abortRef = useRef(null);
  const burstTimestampsRef = useRef([]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userSendCount, setUserSendCount] = useState(0);
  const [inputDisabled, setInputDisabled] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      abortRef.current?.abort();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setMessages((prev) =>
      prev.length === 0 ? [{ role: 'andi', text: GREETING_TEXT }] : prev
    );
  }, [open]);

  const scrollToBottom = useCallback(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, open, isTyping, scrollToBottom]);

  const scheduleTypingReply = useCallback((text, nextCount) => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setIsTyping(true);
    typingTimerRef.current = setTimeout(() => {
      typingTimerRef.current = null;
      setIsTyping(false);
      setMessages((prev) => {
        let next = [...prev, { role: 'andi', text }];
        if (nextCount >= MAX_USER_SENDS) {
          next = [...next, { role: 'andi', text: RATE_LIMIT_REPLY }];
        }
        return next;
      });
      if (nextCount >= MAX_USER_SENDS) setInputDisabled(true);
    }, TYPING_MS_UNSAFE);
  }, []);

  const send = useCallback(async () => {
    if (inputDisabled || isTyping) return;
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_INPUT) return;
    if (userSendCount >= MAX_USER_SENDS) return;

    const now = Date.now();
    burstTimestampsRef.current = burstTimestampsRef.current.filter(
      (t) => now - t <= BURST_WINDOW_MS
    );
    if (burstTimestampsRef.current.length >= BURST_MAX_BEFORE_SLOW) {
      const nextCount = userSendCount + 1;
      setInput('');
      setUserSendCount(nextCount);
      burstTimestampsRef.current.push(now);
      setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);
      scheduleTypingReply(SLOW_DOWN_REPLY, nextCount);
      return;
    }
    burstTimestampsRef.current.push(now);

    const nextCount = userSendCount + 1;
    setInput('');
    setUserSendCount(nextCount);

    setMessages((prev) => [...prev, { role: 'user', content: trimmed }]);

    if (!isSafe(trimmed)) {
      scheduleTypingReply(UNSAFE_REPLY, nextCount);
      return;
    }

    if (!isPortfolioRelated(trimmed)) {
      scheduleTypingReply(pickOffTopicResponse(), nextCount);
      return;
    }

    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setIsTyping(true);
    let andiText = API_ERROR_FALLBACK;
    try {
      andiText = await fetchChatReply(trimmed, ac.signal);
    } catch (e) {
      if (e.name === 'AbortError') {
        setIsTyping(false);
        return;
      }
      andiText = API_ERROR_FALLBACK;
    } finally {
      if (abortRef.current === ac) abortRef.current = null;
    }

    setIsTyping(false);

    setMessages((prev) => {
      let next = [...prev, { role: 'andi', text: andiText }];
      if (nextCount >= MAX_USER_SENDS) {
        next = [...next, { role: 'andi', text: RATE_LIMIT_REPLY }];
      }
      return next;
    });
    if (nextCount >= MAX_USER_SENDS) setInputDisabled(true);
  }, [inputDisabled, isTyping, userSendCount, input, scheduleTypingReply]);

  const onSubmit = (e) => {
    e.preventDefault();
    send();
  };

  const onInputChange = (e) => {
    setInput(e.target.value.slice(0, MAX_INPUT));
  };

  const len = input.length;
  const counterClass =
    len > 100 ? 'ask-andi-counter ask-andi-counter--warn' : 'ask-andi-counter';

  return (
    <>
      {open && (
        <section
          id={panelId}
          className="ask-andi-window"
          aria-label="Ask Andi chat"
        >
          <header className="ask-andi-header">
            <div className="ask-andi-header-main">
              <div className="ask-andi-avatar" aria-hidden="true">
                🤙
              </div>
              <div>
                <div className="ask-andi-header-text">Ask Andi 🌊</div>
                <div className="ask-andi-header-sub">Usually replies fast</div>
              </div>
            </div>
            <button
              type="button"
              className="ask-andi-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </header>

          <div
            ref={listRef}
            className="ask-andi-messages"
            role="log"
            aria-live="polite"
            aria-relevant="additions"
          >
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={msg.role === 'user' ? 'message-user' : 'message-andi'}
              >
                {msg.content ?? msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="typing-indicator" aria-live="polite" aria-busy="true">
                <span className="typing-indicator-label">Andi is typing</span>
                <span className="typing-dot" style={{ animationDelay: '0s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.2s' }} />
                <span className="typing-dot" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>

          <form className="ask-andi-form" onSubmit={onSubmit}>
            <div className="ask-andi-char-row">
              <span className={counterClass} aria-live="polite">
                {len}/{MAX_INPUT}
              </span>
            </div>
            <div className="ask-andi-input-row">
              <label htmlFor={inputId} className="visually-hidden">
                Message to Andi
              </label>
              <input
                id={inputId}
                type="text"
                className="ask-andi-input"
                value={input}
                onChange={onInputChange}
                placeholder="Message…"
                autoComplete="off"
                maxLength={MAX_INPUT}
                disabled={inputDisabled || isTyping}
              />
              <button
                type="submit"
                className="ask-andi-send"
                disabled={inputDisabled || isTyping || !input.trim()}
                aria-label="Send message"
              >
                ➤
              </button>
            </div>
          </form>
        </section>
      )}

      <button
        type="button"
        className="ask-andi-trigger"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close Ask Andi chat' : 'Open Ask Andi chat'}
      >
        🤙
      </button>
    </>
  );
};

export default AskAndi;
