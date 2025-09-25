import React from 'react';
import type { User, Room, Theme } from '../../types';
import './StatusBar.css';

interface StatusBarProps {
  currentUser: User | null;
  currentRoom: Room | null;
  theme: Theme;
  onHelpClick: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  currentUser,
  currentRoom,
  theme,
  onHelpClick
}) => {
  return (
    <div 
      className="status-bar"
      style={{
        '--status-bg': theme.terminal,
        '--status-primary': theme.primary,
        '--status-text': theme.text,
        '--status-secondary': theme.secondary,
      } as React.CSSProperties}
    >
      <div className="status-section">
        <span className="status-label">USER:</span>
        <span className="status-value">
          {currentUser ? currentUser.username : 'Not logged in'}
        </span>
      </div>
      
      <div className="status-section">
        <span className="status-label">ROOM:</span>
        <span className="status-value">
          {currentRoom ? `#${currentRoom.name}` : 'None'}
        </span>
      </div>
      
      <div className="status-section">
        <span className="status-label">THEME:</span>
        <span className="status-value">{theme.name}</span>
      </div>
      
      <div className="status-section">
        <button className="help-button" onClick={onHelpClick}>
          HELP
        </button>
      </div>
    </div>
  );
};