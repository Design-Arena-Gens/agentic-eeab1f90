'use client';

import { useState, useRef, useEffect } from 'react';

export default function WhatsAppAgent() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Namaste! Main aapka WhatsApp agent hoon. Aap mujhse kuch bhi pooch sakte hain!', sender: 'agent', time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAgentResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('hello') || msg.includes('hi') || msg.includes('namaste') || msg.includes('नमस्ते')) {
      return 'Namaste! Kaise help kar sakta hoon?';
    } else if (msg.includes('kaise ho') || msg.includes('how are you')) {
      return 'Main bilkul theek hoon! Aap kaise hain? Kya main aapki kuch help kar sakta hoon?';
    } else if (msg.includes('naam') || msg.includes('name')) {
      return 'Mera naam WhatsApp Agent hai. Main aapki help karne ke liye yahaan hoon!';
    } else if (msg.includes('time') || msg.includes('samay')) {
      return `Abhi time hai: ${new Date().toLocaleTimeString('hi-IN')}`;
    } else if (msg.includes('date') || msg.includes('tarikh')) {
      return `Aaj ki date hai: ${new Date().toLocaleDateString('hi-IN')}`;
    } else if (msg.includes('help') || msg.includes('madad')) {
      return 'Main aapki help kar sakta hoon:\n• Sawaal poochiye\n• Information chahiye\n• Simple calculations\n• Time aur date\n\nBas type kariye aur main jawab dunga!';
    } else if (msg.includes('bye') || msg.includes('alvida')) {
      return 'Alvida! Aapse baat karke achha laga. Phir milenge! 👋';
    } else if (msg.match(/\d+\s*[\+\-\*\/]\s*\d+/)) {
      try {
        const result = eval(msg.replace(/[^0-9\+\-\*\/\.\(\)]/g, ''));
        return `Jawab hai: ${result}`;
      } catch {
        return 'Sorry, calculation mein kuch problem hai.';
      }
    } else if (msg.includes('joke') || msg.includes('mazak')) {
      const jokes = [
        'Teacher: Beta tumhara homework kahan hai?\nStudent: Sir, maine usse WhatsApp agent ko bhej diya! 😄',
        'WhatsApp message: "K"\nDosto: Gussa kyun ho?\nMain: Nahi yaar, sirf OK ka half payment kiya! 😂',
        'Mummy: Beta, mobile chod do\nBeta: Ek minute Maa\n*3 ghante baad*\nBeta: Bus ho gaya! 😅'
      ];
      return jokes[Math.floor(Math.random() * jokes.length)];
    } else if (msg.includes('weather') || msg.includes('mausam')) {
      return 'Aaj mausam achha lag raha hai! ☀️ (Note: Real weather data ke liye API integration ki zarurat hogi)';
    } else {
      const responses = [
        'Interesting! Bataaiye, iske baare mein aur kya jaanna chahte hain?',
        'Samjha! Kya main aur kuch help kar sakta hoon?',
        'Achha! Kya aapka koi aur sawaal hai?',
        'Main samajh gaya. Aur kya pata karna hai?',
        'Theek hai! Kuch aur poochna chahte hain?'
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        text: getAgentResponse(input),
        sender: 'agent',
        time: new Date().toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, agentResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      backgroundColor: '#0a1014',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#1f2c34',
        padding: '15px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.3)'
      }}>
        <div style={{
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: '#25d366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px'
        }}>🤖</div>
        <div>
          <div style={{ color: '#e9edef', fontSize: '17px', fontWeight: '500' }}>WhatsApp Agent</div>
          <div style={{ color: '#8696a0', fontSize: '13px' }}>online</div>
        </div>
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url("data:image/svg+xml,%3Csvg width="260" height="260" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M52 0h156v156H52z" fill="%23111b21" fill-opacity="0.2"/%3E%3C/svg%3E")',
        backgroundSize: '260px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{
            display: 'flex',
            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            animation: 'slideIn 0.3s ease-out'
          }}>
            <div style={{
              maxWidth: '65%',
              backgroundColor: msg.sender === 'user' ? '#005c4b' : '#1f2c34',
              color: '#e9edef',
              padding: '8px 12px',
              borderRadius: '8px',
              boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
              position: 'relative'
            }}>
              <div style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '14.5px',
                lineHeight: '1.5'
              }}>{msg.text}</div>
              <div style={{
                fontSize: '11px',
                color: '#8696a0',
                textAlign: 'right',
                marginTop: '4px'
              }}>{msg.time}</div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div style={{
            display: 'flex',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              backgroundColor: '#1f2c34',
              padding: '12px 18px',
              borderRadius: '8px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#8696a0',
                animation: 'typing 1.4s infinite',
                animationDelay: '0s'
              }}></span>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#8696a0',
                animation: 'typing 1.4s infinite',
                animationDelay: '0.2s'
              }}></span>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#8696a0',
                animation: 'typing 1.4s infinite',
                animationDelay: '0.4s'
              }}></span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        backgroundColor: '#1f2c34',
        padding: '10px 20px',
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          style={{
            flex: 1,
            backgroundColor: '#2a3942',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 16px',
            color: '#e9edef',
            fontSize: '15px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          style={{
            backgroundColor: input.trim() ? '#25d366' : '#3d4f58',
            border: 'none',
            borderRadius: '50%',
            width: '45px',
            height: '45px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: input.trim() ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s'
          }}
        >
          <span style={{ fontSize: '20px', color: '#fff' }}>➤</span>
        </button>
      </div>

      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          overflow: hidden;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes typing {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.7;
          }
          30% {
            transform: translateY(-10px);
            opacity: 1;
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0a1014;
        }

        ::-webkit-scrollbar-thumb {
          background: #3d4f58;
          border-radius: 3px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #4a5c66;
        }
      `}</style>
    </div>
  );
}
