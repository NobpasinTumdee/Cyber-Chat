import React from 'react';
import type { Theme } from '../../types';
import { THEMES } from '../../constants/themes';
import './ThemeSelector.css';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentTheme, onThemeChange }) => {
  return (
    <div 
      className="theme-selector"
      style={{
        '--selector-primary': currentTheme.primary,
        '--selector-bg': currentTheme.terminal,
        '--selector-text': currentTheme.text,
      } as React.CSSProperties}
    >
      <div className="theme-selector-header">THEMES</div>
      <div className="theme-list">
        {THEMES.map((theme) => (
          <div
            key={theme.id}
            className={`theme-item ${currentTheme.id === theme.id ? 'theme-item--active' : ''}`}
            onClick={() => onThemeChange(theme)}
            style={{
              '--theme-color': theme.primary,
              '--theme-bg': theme.terminal,
            } as React.CSSProperties}
          >
            <div className="theme-preview" style={{ backgroundColor: theme.primary }}></div>
            <span className="theme-name">{theme.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};