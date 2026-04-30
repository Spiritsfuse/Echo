'use client';

import { Message } from '@ai-sdk/react';
import { Persona } from '@/lib/personas/config';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  persona: Persona;
}

export function MessageList({ messages, persona }: MessageListProps) {
  return (
    <div className="flex flex-col gap-6">
      {messages.map((message, i) => {
        const isUser = message.role === 'user';
        
        return (
          <motion.div
            key={message.id || i}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className={cn(
              "flex items-start gap-3 max-w-[85%]",
              isUser ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center shrink-0 border overflow-hidden shadow-sm",
              isUser ? "bg-primary text-primary-foreground border-primary" : "bg-muted border-border"
            )}>
              {isUser ? (
                <User className="h-4 w-4" />
              ) : (
                <img src={persona.avatar} alt={persona.name} className="h-full w-full object-cover" />
              )}
            </div>

            <div className={cn(
              "flex flex-col gap-1",
              isUser ? "items-end" : "items-start"
            )}>
              <div className={cn(
                "px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                isUser 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-muted/80 backdrop-blur-sm border border-border/50 rounded-tl-none prose prose-invert max-w-none"
              )}>
                {isUser ? (
                  <p className="whitespace-pre-wrap">{message.content}</p>
                ) : (
                  <div className="markdown-content">
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-muted-foreground px-1 opacity-50">
                {isUser ? 'You' : persona.name} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
