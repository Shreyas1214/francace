'use client';
import { useChat } from '@ai-sdk/react';
import { useEffect, useRef } from 'react';
import { TopBar } from '../../components/TopBar';
import { useApp } from '../../context/AppContext';

export default function ConversationPage() {
  const { state, updateProgress } = useApp();
  const examType = state?.settings?.examType || 'TEF';
  const clbLevel = state?.user?.clb || 1;

  const { messages, input, handleInputChange, handleSubmit, setMessages, isLoading } = useChat({
    api: '/api/chat',
    body: {
      examType,
      clbLevel
    },
    onFinish: (message) => {
      // Logic for adding conversation tracking metrics or marking module completion
      const currentCompleted = state.progress.conversation.completed || 0;
      updateProgress('conversation', { completed: currentCompleted + 1 });
    }
  });

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting if no messages
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'initial',
          role: 'assistant',
          content: `Bonjour ! Je suis votre examinateur pour l'épreuve d'expression orale du ${examType} Canada. Êtes-vous prêt(e) à commencer notre simulation ?`
        }
      ]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examType]); // Restart conversation if they switch exam tabs

  return (
    <>
      <TopBar title="AI Conversation Partner" subtitle={`Simulate ${examType} Canada speaking exercises`} />
      
      <div className="module-content fade-in" style={{ paddingBottom: '0' }}>
        <div className="chat-container glass-panel">
          
          <div className="chat-messages" id="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`chat-bubble-container ${message.role === 'user' ? 'user' : 'assistant'}`}>
                {message.role === 'assistant' && (
                  <div className="chat-avatar">👔</div>
                )}
                
                <div className="chat-bubble">
                  {message.content}
                </div>

                {message.role === 'user' && (
                  <div className="chat-avatar" style={{ background: state?.user?.avatar || 'var(--accent-primary)' }}>
                    {state?.user?.name ? state.user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble-container assistant">
                 <div className="chat-avatar">👔</div>
                 <div className="chat-bubble" style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                    <span style={{ animation: 'authOrbFloat 1s infinite alternate', opacity: 0.5 }}>.</span>
                    <span style={{ animation: 'authOrbFloat 1s infinite alternate 0.2s', opacity: 0.5 }}>.</span>
                    <span style={{ animation: 'authOrbFloat 1s infinite alternate 0.4s', opacity: 0.5 }}>.</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <form onSubmit={handleSubmit} className="chat-form">
              <input
                className="chat-input"
                value={input}
                placeholder="Écrivez votre réponse en français..."
                onChange={handleInputChange}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="btn-send"
                disabled={isLoading || !input.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
}
