import type { Theme } from '../types';

export const THEMES: Theme[] = [
  {
    id: 'matrix',
    name: 'Matrix',
    primary: '#00FF00',
    secondary: '#008000',
    background: '#000000',
    text: '#00FF00',
    accent: '#40FF40',
    terminal: '#001100'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    primary: '#00BFFF',
    secondary: '#0080FF',
    background: '#0a0a0a',
    text: '#00BFFF',
    accent: '#40CFFF',
    terminal: '#001122'
  },
  {
    id: 'hacker',
    name: 'Hacker Orange',
    primary: '#FF6600',
    secondary: '#CC4400',
    background: '#0f0f0f',
    text: '#FF6600',
    accent: '#FF8840',
    terminal: '#221100'
  },
  {
    id: 'ghost',
    name: 'Ghost',
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    background: '#1a1a1a',
    text: '#FFFFFF',
    accent: '#EEEEEE',
    terminal: '#222222'
  },
  {
    id: 'purple',
    name: 'Purple Haze',
    primary: '#9945FF',
    secondary: '#7B2FCC',
    background: '#0f0a1a',
    text: '#9945FF',
    accent: '#B565FF',
    terminal: '#1a0f22'
  }
];