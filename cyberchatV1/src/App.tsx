import { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal/Terminal';
import { HelpModal } from './components/HelpModal/HelpModal';
import { ThemeSelector } from './components/ThemeSelector/ThemeSelector';
import { StatusBar } from './components/StatusBar/StatusBar';
import { useTerminal } from './hooks/useTerminal';
import type { User, Room, Theme } from './types';
import { THEMES } from './constants/themes';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);
  const [theme, setTheme] = useState<Theme>(THEMES[0]); // Matrix theme by default
  const [showHelp, setShowHelp] = useState(false);

  const {
    lines,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearTerminal,
    addMessage
  } = useTerminal(
    currentUser,
    setCurrentUser,
    currentRoom,
    setCurrentRoom,
    theme,
    setTheme,
    setShowHelp
  );

  // Generate dynamic prompt
  const getPrompt = () => {
    if (!currentUser) {
      return 'guest@terminal:~$ ';
    }
    
    const roomIndicator = currentRoom ? `[${currentRoom.name}]` : '';
    return `${currentUser.username}@terminal${roomIndicator}:~$ `;
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowHelp(false);
      }
      if (e.key === 'F1' || (e.ctrlKey && e.key === 'h')) {
        e.preventDefault();
        setShowHelp(true);
      }
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        clearTerminal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [clearTerminal]);

  return (
    <div className="app">
      <Terminal
        lines={lines}
        currentInput={currentInput}
        setCurrentInput={setCurrentInput}
        onExecuteCommand={executeCommand}
        theme={theme}
        prompt={getPrompt()}
      />
      
      <ThemeSelector
        currentTheme={theme}
        onThemeChange={setTheme}
      />
      
      <StatusBar
        currentUser={currentUser}
        currentRoom={currentRoom}
        theme={theme}
        onHelpClick={() => setShowHelp(true)}
      />
      
      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
        theme={theme}
      />
    </div>
  );
}

export default App;