'use client';

import { Persona, PersonaId, PERSONAS } from '@/lib/personas/config';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface PersonaSwitcherProps {
  activePersonaId: PersonaId;
  onPersonaChange: (id: PersonaId) => void;
}

export function PersonaSwitcher({ activePersonaId, onPersonaChange }: PersonaSwitcherProps) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-xs p-4 glass-card rounded-2xl">
      <div className="flex flex-col gap-1 mb-2">
        <h2 className="text-xl font-bold tracking-tight">Personas</h2>
        <p className="text-xs text-muted-foreground">Select a persona to chat with</p>
      </div>
      
      <div className="flex flex-col gap-2">
        {(Object.values(PERSONAS) as Persona[]).map((persona) => {
          const isActive = activePersonaId === persona.id;
          
          return (
            <button
              key={persona.id}
              onClick={() => onPersonaChange(persona.id)}
              className={cn(
                "relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group cursor-pointer",
                isActive 
                  ? "bg-primary/10 text-primary shadow-sm" 
                  : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="persona-highlight"
                  className="absolute inset-0 border-2 border-primary/50 rounded-xl pointer-events-none"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="h-10 w-10 rounded-full border border-border/50 overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                <img 
                  src={persona.avatar} 
                  alt={persona.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex flex-col items-start text-left overflow-hidden">
                <span className="font-semibold text-sm truncate w-full">{persona.name}</span>
                <span className="text-[10px] truncate w-full opacity-80">{persona.role}</span>
              </div>

              {isActive && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-auto"
                >
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                </motion.div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
