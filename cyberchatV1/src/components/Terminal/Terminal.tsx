import React, { useEffect, useRef } from 'react';
import type { Theme } from '../../types';
import './Terminal.css';

interface TerminalLine {
  id: string;
  content: string;
  type: 'command' | 'output' | 'error' | 'info' | 'message';
  timestamp: Date;
  author?: string;
}

interface TerminalProps {
  lines: TerminalLine[];
  currentInput: string;
  setCurrentInput: (input: string) => void;
  onExecuteCommand: (command: string) => void;
  theme: Theme;
  prompt: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  currentInput,
  setCurrentInput,
  onExecuteCommand,
  theme,
  prompt
}) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [currentInput]);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (currentInput.trim()) {
        onExecuteCommand(currentInput.trim());
        setCurrentInput('');
      }
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const renderLine = (line: TerminalLine) => {
    const className = `terminal-line terminal-line--${line.type}`;
    
    if (line.type === 'message' && line.author) {
      return (
        <div key={line.id} className={className}>
          <span className="message-author">[{line.author}]</span>
          <span className="message-content">{line.content.substring(line.author.length + 2)}</span>
          <span className="message-timestamp">
            {line.timestamp.toLocaleTimeString()}
          </span>
        </div>
      );
    }

    return (
      <div key={line.id} className={className}>
        {line.content}
      </div>
    );
  };

  return (
    <div 
      className="terminal"
      style={{
        '--terminal-bg': theme.terminal,
        '--terminal-text': theme.text,
        '--terminal-primary': theme.primary,
        '--terminal-secondary': theme.secondary,
        '--terminal-accent': theme.accent,
        '--terminal-background': theme.background,
      } as React.CSSProperties}
      onClick={handleTerminalClick}
      ref={terminalRef}
    >
      <div className="terminal-header">
        <div className="terminal-title">TERMINAL CHAT v2.0 - SECURE COMMUNICATION</div>
        <div className="terminal-controls">
          <div className="terminal-control terminal-control--minimize"></div>
          <div className="terminal-control terminal-control--maximize"></div>
          <div className="terminal-control terminal-control--close"></div>
        </div>
      </div>
      
      <div className="terminal-body">
        <div className="terminal-content" ref={contentRef}>
          {lines.map(renderLine)}
          
          <div className="terminal-input-line">
            <span className="terminal-prompt">{prompt}</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              spellCheck={false}
              autoComplete="off"
            />
            <span className="terminal-cursor">█</span>
          </div>
        </div>
        
        <div className="terminal-scanlines"></div>
      </div>
    </div>
  );
};