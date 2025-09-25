import { useState, useCallback, useRef, useEffect } from 'react';
import { COMMANDS } from '../constants/commands';
import { THEMES } from '../constants/themes';
import type { User, Room, Message, Theme } from '../types';

interface TerminalLine {
  id: string;
  content: string;
  type: 'command' | 'output' | 'error' | 'info' | 'message';
  timestamp: Date;
  author?: string;
}

interface UseTerminalReturn {
  lines: TerminalLine[];
  currentInput: string;
  setCurrentInput: (input: string) => void;
  executeCommand: (command: string) => void;
  clearTerminal: () => void;
  addMessage: (message: Message) => void;
}

export const useTerminal = (
  currentUser: User | null,
  setCurrentUser: (user: User | null) => void,
  currentRoom: Room | null,
  setCurrentRoom: (room: Room | null) => void,
  theme: Theme,
  setTheme: (theme: Theme) => void,
  setShowHelp: (show: boolean) => void
): UseTerminalReturn => {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      content: '████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     ',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '2',
      content: '╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     ',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '3',
      content: '   ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     ',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '4',
      content: '   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     ',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '5',
      content: '   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '6',
      content: '   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '7',
      content: '',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '8',
      content: 'Welcome to TERMINAL CHAT v2.0 - Secure Communication Platform',
      type: 'info',
      timestamp: new Date()
    },
    {
      id: '9',
      content: 'Type "help" to see available commands or "register <username> <email> <password>" to get started.',
      type: 'info',
      timestamp: new Date()
    }
  ]);

  const [currentInput, setCurrentInput] = useState('');

  const addLine = useCallback((content: string, type: TerminalLine['type'] = 'output', author?: string) => {
    const newLine: TerminalLine = {
      id: Date.now().toString() + Math.random(),
      content,
      type,
      timestamp: new Date(),
      author
    };
    setLines(prev => [...prev, newLine]);
  }, []);

  const executeCommand = useCallback((command: string) => {
    addLine(`> ${command}`, 'command');
    
    const [cmd, ...args] = command.trim().split(' ');
    const lowerCmd = cmd.toLowerCase();

    switch (lowerCmd) {
      case 'help':
        if (args.length === 0) {
          addLine('Available commands:', 'info');
          COMMANDS.forEach(cmd => {
            addLine(`  ${cmd.command.padEnd(12)} - ${cmd.description}`, 'info');
          });
          addLine('Type "help <command>" for detailed usage.', 'info');
        } else {
          const helpCmd = COMMANDS.find(c => c.command === args[0]);
          if (helpCmd) {
            addLine(`Command: ${helpCmd.command}`, 'info');
            addLine(`Description: ${helpCmd.description}`, 'info');
            addLine(`Usage: ${helpCmd.usage}`, 'info');
            addLine(`Example: ${helpCmd.example}`, 'info');
          } else {
            addLine(`Unknown command: ${args[0]}`, 'error');
          }
        }
        break;

      case 'register':
        if (args.length < 3) {
          addLine('Usage: register <username> <email> <password>', 'error');
        } else {
          const [username, email, password] = args;
          // Mock registration
          const newUser: User = {
            id: Math.random().toString(36),
            username,
            email,
            isOnline: true,
            lastSeen: new Date()
          };
          setCurrentUser(newUser);
          addLine(`Registration successful! Welcome, ${username}!`, 'info');
          addLine('You can now use commands like "friends add <username>" or "rooms create <name>"', 'info');
        }
        break;

      case 'login':
        if (args.length < 2) {
          addLine('Usage: login <username> <password>', 'error');
        } else {
          const [username] = args;
          // Mock login
          const user: User = {
            id: Math.random().toString(36),
            username,
            email: `${username}@terminal.chat`,
            isOnline: true,
            lastSeen: new Date()
          };
          setCurrentUser(user);
          addLine(`Login successful! Welcome back, ${username}!`, 'info');
        }
        break;

      case 'logout':
        if (currentUser) {
          addLine(`Goodbye, ${currentUser.username}!`, 'info');
          setCurrentUser(null);
          setCurrentRoom(null);
        } else {
          addLine('You are not logged in.', 'error');
        }
        break;

      case 'whoami':
        if (currentUser) {
          addLine(`Username: ${currentUser.username}`, 'info');
          addLine(`Email: ${currentUser.email}`, 'info');
          addLine(`Status: Online`, 'info');
        } else {
          addLine('Not logged in. Use "login" or "register" commands.', 'error');
        }
        break;

      case 'theme':
        if (args.length === 0) {
          addLine('Available themes:', 'info');
          THEMES.forEach(t => {
            addLine(`  ${t.id.padEnd(12)} - ${t.name}`, 'info');
          });
        } else {
          const newTheme = THEMES.find(t => t.id === args[0]);
          if (newTheme) {
            setTheme(newTheme);
            addLine(`Theme changed to: ${newTheme.name}`, 'info');
          } else {
            addLine(`Unknown theme: ${args[0]}`, 'error');
          }
        }
        break;

      case 'friends':
        if (!currentUser) {
          addLine('Please login first.', 'error');
          break;
        }
        
        if (args.length === 0 || args[0] === 'list') {
          addLine('Friends list:', 'info');
          addLine('  alice (online)', 'info');
          addLine('  bob (offline)', 'info');
          addLine('  charlie (online)', 'info');
        } else if (args[0] === 'add') {
          if (args.length < 2) {
            addLine('Usage: friends add <username>', 'error');
          } else {
            addLine(`Friend request sent to ${args[1]}`, 'info');
          }
        }
        break;

      case 'rooms':
        if (!currentUser) {
          addLine('Please login first.', 'error');
          break;
        }

        if (args.length === 0 || args[0] === 'list') {
          addLine('Available rooms:', 'info');
          addLine('  #general (5 users)', 'info');
          addLine('  #random (12 users)', 'info');
          addLine('  #hackers (8 users)', 'info');
        } else if (args[0] === 'join') {
          if (args.length < 2) {
            addLine('Usage: rooms join <room_name>', 'error');
          } else {
            const roomName = args[1];
            // Mock room join
            const room: Room = {
              id: Math.random().toString(36),
              name: roomName,
              type: 'group',
              participants: [currentUser],
              messages: [],
              isActive: true
            };
            setCurrentRoom(room);
            addLine(`Joined room: ${roomName}`, 'info');
            addLine('You can now send messages with "msg <message>"', 'info');
          }
        } else if (args[0] === 'create') {
          if (args.length < 2) {
            addLine('Usage: rooms create <room_name>', 'error');
          } else {
            addLine(`Room "${args[1]}" created successfully!`, 'info');
          }
        }
        break;

      case 'msg':
        if (!currentUser) {
          addLine('Please login first.', 'error');
          break;
        }
        if (!currentRoom) {
          addLine('Please join a room first with "rooms join <room_name>"', 'error');
          break;
        }
        if (args.length === 0) {
          addLine('Usage: msg <message>', 'error');
        } else {
          const message = args.join(' ');
          addLine(`${currentUser.username}: ${message}`, 'message', currentUser.username);
        }
        break;

      case 'dm':
        if (!currentUser) {
          addLine('Please login first.', 'error');
          break;
        }
        if (args.length < 2) {
          addLine('Usage: dm <username> <message>', 'error');
        } else {
          const [targetUser, ...messageArgs] = args;
          const message = messageArgs.join(' ');
          addLine(`DM to ${targetUser}: ${message}`, 'message', currentUser.username);
        }
        break;

      case 'image':
        if (!currentUser) {
          addLine('Please login first.', 'error');
          break;
        }
        if (args.length === 0) {
          addLine('Usage: image <url>', 'error');
        } else {
          addLine(`${currentUser.username} shared an image: ${args[0]}`, 'message', currentUser.username);
        }
        break;

      case 'clear':
        setLines([]);
        break;

      case 'status':
        addLine('=== SYSTEM STATUS ===', 'info');
        addLine(`User: ${currentUser ? currentUser.username : 'Not logged in'}`, 'info');
        addLine(`Room: ${currentRoom ? currentRoom.name : 'None'}`, 'info');
        addLine(`Theme: ${theme.name}`, 'info');
        addLine(`Time: ${new Date().toLocaleString()}`, 'info');
        break;

      default:
        addLine(`Unknown command: ${lowerCmd}. Type "help" for available commands.`, 'error');
    }
  }, [currentUser, currentRoom, theme, setCurrentUser, setCurrentRoom, setTheme, addLine]);

  const clearTerminal = useCallback(() => {
    setLines([]);
  }, []);

  const addMessage = useCallback((message: Message) => {
    addLine(`${message.author.username}: ${message.content}`, 'message', message.author.username);
  }, [addLine]);

  return {
    lines,
    currentInput,
    setCurrentInput,
    executeCommand,
    clearTerminal,
    addMessage
  };
};