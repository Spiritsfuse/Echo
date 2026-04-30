'use client';

import { useState } from 'react';
import { PersonaId } from '@/lib/personas/config';
import { PersonaSwitcher } from '@/components/personas/PersonaSwitcher';
import { ChatContainer } from '@/components/chat/ChatContainer';
import { Toaster } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
import { BrainCircuit, MessageSquareCode } from 'lucide-react';

export default function Home() {
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('anshuman');

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Toaster position="top-center" expand={true} richColors />
      
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-accent/10 blur-[150px] animate-pulse [animation-delay:2s]" />
      </div>

      <div className="container mx-auto px-4 py-6 md:py-10 max-w-7xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <BrainCircuit className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Echo - Persona AI
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.2em]">
                Scaler Edition
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-border/40">
            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">System Operational</span>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="flex flex-col gap-6 order-2 md:order-1">
            <PersonaSwitcher 
              activePersonaId={activePersonaId} 
              onPersonaChange={setActivePersonaId} 
            />
            
            <div className="glass-card p-4 rounded-2xl flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary">
                <MessageSquareCode className="h-4 w-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">Project Vision</h4>
              </div>
              <p className="text-[11px] leading-relaxed text-muted-foreground italic">
                "An elite engineer isn't defined by what they know, but by the systems they architect and the outcomes they ship."
              </p>
              <div className="pt-2 border-t border-border/20">
                <p className="text-[9px] text-muted-foreground opacity-50">
                  Built for Scaler Academy.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Chat Area */}
          <div className="order-1 md:order-2">
            <motion.div
              key={activePersonaId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full"
            >
              <ChatContainer personaId={activePersonaId} />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Footer / Branding */}
      <footer className="w-full py-8 px-4 text-center">
        <p className="text-xs text-muted-foreground opacity-40">
          © 2026 Echo • Designed for high-performance engineering conversations.
        </p>
      </footer>
    </main>
  );
}
