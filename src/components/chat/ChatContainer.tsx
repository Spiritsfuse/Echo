'use client';

import { useChat } from '@ai-sdk/react';
import { PersonaId, PERSONAS } from '@/lib/personas/config';
import { useState, useEffect, useRef } from 'react';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { SuggestionChips } from './SuggestionChips';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatContainerProps {
  personaId: PersonaId;
}

export function ChatContainer({ personaId }: ChatContainerProps) {
  const persona = PERSONAS[personaId];
  const scrollRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    setInput,
    append
  } = useChat({
    api: '/api/chat',
    body: {
      personaId: personaId,
    },
    onError: (err) => {
      console.error('Chat Error:', err);
      toast.error(err.message || 'Failed to send message. Check your API key.');
    },
  });

  // Reset conversation when persona changes
  useEffect(() => {
    setMessages([]);
    setInput('');
  }, [personaId, setMessages, setInput]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const onSuggestionClick = (prompt: string) => {
    append({ role: 'user', content: prompt });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-4xl glass-card rounded-2xl overflow-hidden relative">
      {/* Persona Header */}
      <div className="p-4 border-b border-border/50 bg-muted/30 flex items-center gap-4">
        <div className="relative">
          <img 
            src={persona.avatar} 
            alt={persona.name} 
            className="h-10 w-10 rounded-full border border-primary/20"
          />
          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 border-2 border-background rounded-full" />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold text-sm leading-tight">{persona.name}</h3>
          <p className="text-[10px] text-muted-foreground">{persona.role}</p>
        </div>
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {messages.length === 0 ? (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4"
            >
              <div className="h-16 w-16 rounded-full bg-primary/5 flex items-center justify-center mb-2">
                <img src={persona.avatar} alt={persona.name} className="h-12 w-12 opacity-50 grayscale" />
              </div>
              <h4 className="text-lg font-semibold tracking-tight">Chat with {persona.name}</h4>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {persona.bio}
              </p>
              
              <div className="w-full pt-4">
                <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Try asking about</p>
                <SuggestionChips 
                  suggestions={persona.suggestions} 
                  onSuggestionClick={onSuggestionClick} 
                />
              </div>
            </motion.div>
          ) : (
            <MessageList messages={messages} persona={persona} />
          )}
        </AnimatePresence>
        
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse ml-2">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.3s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:-0.15s]" />
              <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" />
            </div>
            <span>{persona.name.split(' ')[0]} is thinking...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 bg-background/50">
        <MessageInput 
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder={`Message ${persona.name}...`}
        />
        <p className="text-[10px] text-center text-muted-foreground mt-2 opacity-60">
          AI may generate inaccurate information. Use with discretion.
        </p>
      </div>
    </div>
  );
}
