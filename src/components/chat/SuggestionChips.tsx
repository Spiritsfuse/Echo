'use client';

import { SuggestionChip } from '@/lib/personas/config';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SuggestionChipsProps {
  suggestions: SuggestionChip[];
  onSuggestionClick: (prompt: string) => void;
}

export function SuggestionChips({ suggestions, onSuggestionClick }: SuggestionChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {suggestions.map((suggestion, i) => (
        <motion.button
          key={suggestion.label}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSuggestionClick(suggestion.prompt)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/5 hover:bg-primary/10 border border-primary/10 hover:border-primary/30 text-xs font-medium text-primary transition-all duration-300 hover:shadow-sm"
        >
          <Sparkles className="h-3 w-3" />
          {suggestion.label}
        </motion.button>
      ))}
    </div>
  );
}
