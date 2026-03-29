import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import '../styles/AskAndi.css';

const TYPING_MS_UNSAFE = 800;

const GREETING_TEXT =
  "Hey! I'm Andi 🌊 Ask me about projects, the stack, internships, or why this site is SpongeBob-themed.";

const API_ERROR_FALLBACK = 'Something glitched in the lab — try again 🧪';

const isSafe = (msg) => {
  const blocked = [
    'salary',
    'address',
    'phone',
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

const UNSAFE_REPLY =
  "That's not something I share publicly — ask me about my projects or skills instead 🌊";
const RATE_LIMIT_REPLY =
  "You've asked a lot of questions! Check out my full portfolio or hit the contact page to keep the convo going 👀";

const MAX_INPUT = 150;
const MAX_USER_SENDS = 10;

async function fetchChatReply(userMessage, signal) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    signal,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage }),
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

  const send = useCallback(async () => {
    if (inputDisabled || isTyping) return;
    const trimmed = input.trim();
    if (!trimmed || trimmed.length > MAX_INPUT) return;
    if (userSendCount >= MAX_USER_SENDS) return;

    const nextCount = userSendCount + 1;
    setInput('');
    setUserSendCount(nextCount);

    if (!isSafe(trimmed)) {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      setIsTyping(true);
      typingTimerRef.current = setTimeout(() => {
        typingTimerRef.current = null;
        setIsTyping(false);
        setMessages((prev) => {
          let next = [...prev, { role: 'andi', text: UNSAFE_REPLY }];
          if (nextCount >= MAX_USER_SENDS) {
            next = [...next, { role: 'andi', text: RATE_LIMIT_REPLY }];
          }
          return next;
        });
        if (nextCount >= MAX_USER_SENDS) setInputDisabled(true);
      }, TYPING_MS_UNSAFE);
      return;
    }

    setMessages((prev) => [...prev, { role: 'user', text: trimmed }]);

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
  }, [inputDisabled, isTyping, userSendCount, input]);

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
                {msg.text}
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
