import type { Command } from '../types';

export const COMMANDS: Command[] = [
  {
    command: 'help',
    description: 'Show available commands',
    usage: 'help [command]',
    example: 'help login'
  },
  {
    command: 'login',
    description: 'Login to the system',
    usage: 'login <username> <password>',
    example: 'login hacker123 mypassword'
  },
  {
    command: 'register',
    description: 'Register a new account',
    usage: 'register <username> <email> <password>',
    example: 'register newuser user@email.com password123'
  },
  {
    command: 'logout',
    description: 'Logout from the system',
    usage: 'logout',
    example: 'logout'
  },
  {
    command: 'friends',
    description: 'Manage friends',
    usage: 'friends [list|add|remove] [username]',
    example: 'friends add alice'
  },
  {
    command: 'rooms',
    description: 'Manage chat rooms',
    usage: 'rooms [list|create|join|leave] [room_name]',
    example: 'rooms create my-group'
  },
  {
    command: 'msg',
    description: 'Send a message',
    usage: 'msg <message>',
    example: 'msg Hello everyone!'
  },
  {
    command: 'dm',
    description: 'Send direct message',
    usage: 'dm <username> <message>',
    example: 'dm alice Hey, how are you?'
  },
  {
    command: 'image',
    description: 'Send an image',
    usage: 'image <url>',
    example: 'image https://example.com/image.jpg'
  },
  {
    command: 'theme',
    description: 'Change terminal theme',
    usage: 'theme <theme_name>',
    example: 'theme matrix'
  },
  {
    command: 'clear',
    description: 'Clear terminal screen',
    usage: 'clear',
    example: 'clear'
  },
  {
    command: 'whoami',
    description: 'Show current user info',
    usage: 'whoami',
    example: 'whoami'
  },
  {
    command: 'status',
    description: 'Show system status',
    usage: 'status',
    example: 'status'
  }
];