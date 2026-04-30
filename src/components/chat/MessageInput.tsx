'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  placeholder?: string;
}

export function MessageInput({ 
  input, 
  handleInputChange, 
  handleSubmit, 
  isLoading,
  placeholder 
}: MessageInputProps) {
  return (
    <form onSubmit={handleSubmit} className="relative flex items-center gap-2 group">
      <Input
        value={input}
        onChange={handleInputChange}
        placeholder={placeholder || "Type a message..."}
        className="flex-1 bg-muted/40 border-border/50 focus-visible:ring-primary/20 pr-12 h-11 rounded-xl transition-all"
        disabled={isLoading}
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={isLoading || !input.trim()}
        className={cn(
          "absolute right-1.5 h-8 w-8 rounded-lg transition-all",
          isLoading ? "bg-muted" : "bg-primary hover:scale-105 active:scale-95"
        )}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <SendHorizontal className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
