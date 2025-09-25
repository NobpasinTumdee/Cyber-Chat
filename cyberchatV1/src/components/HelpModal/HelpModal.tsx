import React from 'react';
import type { Theme } from '../../types';
// import { COMMANDS } from '../../constants/commands';
import './HelpModal.css';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose, theme }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="help-modal-overlay"
      style={{
        '--modal-bg': theme.terminal,
        '--modal-text': theme.text,
        '--modal-primary': theme.primary,
        '--modal-secondary': theme.secondary,
        '--modal-accent': theme.accent,
        '--modal-background': theme.background,
      } as React.CSSProperties}
      onClick={onClose}
    >
      <div className="help-modal" onClick={(e) => e.stopPropagation()}>
        <div className="help-modal-header">
          <h2>TERMINAL CHAT - COMMAND REFERENCE</h2>
          <button className="help-modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="help-modal-content">
          <div className="help-section">
            <h3>🔐 AUTHENTICATION</h3>
            <div className="command-list">
              <div className="command-item">
                <code>register &lt;username&gt; &lt;email&gt; &lt;password&gt;</code>
                <p>Create a new account on the system</p>
              </div>
              <div className="command-item">
                <code>login &lt;username&gt; &lt;password&gt;</code>
                <p>Login to your existing account</p>
              </div>
              <div className="command-item">
                <code>logout</code>
                <p>Logout from the current session</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>👥 SOCIAL FEATURES</h3>
            <div className="command-list">
              <div className="command-item">
                <code>friends [list|add|remove] [username]</code>
                <p>Manage your friends list</p>
              </div>
              <div className="command-item">
                <code>dm &lt;username&gt; &lt;message&gt;</code>
                <p>Send a direct message to a user</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>💬 CHAT ROOMS</h3>
            <div className="command-list">
              <div className="command-item">
                <code>rooms [list|create|join|leave] [room_name]</code>
                <p>Manage chat rooms</p>
              </div>
              <div className="command-item">
                <code>msg &lt;message&gt;</code>
                <p>Send a message to current room</p>
              </div>
              <div className="command-item">
                <code>image &lt;url&gt;</code>
                <p>Share an image in the current room</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>⚙️ SYSTEM</h3>
            <div className="command-list">
              <div className="command-item">
                <code>theme &lt;theme_name&gt;</code>
                <p>Change terminal theme (matrix, cyberpunk, hacker, ghost, purple)</p>
              </div>
              <div className="command-item">
                <code>clear</code>
                <p>Clear the terminal screen</p>
              </div>
              <div className="command-item">
                <code>whoami</code>
                <p>Display current user information</p>
              </div>
              <div className="command-item">
                <code>status</code>
                <p>Show system status</p>
              </div>
            </div>
          </div>

          <div className="help-section">
            <h3>📱 TIPS & TRICKS</h3>
            <ul className="tips-list">
              <li>All commands are case-insensitive</li>
              <li>Use quotes for messages with special characters</li>
              <li>Press Enter to execute commands</li>
              <li>Click anywhere on terminal to focus input</li>
              <li>Themes change in real-time</li>
              <li>Messages show timestamps and sender info</li>
            </ul>
          </div>
        </div>

        <div className="help-modal-footer">
          <p>Press ESC or click outside to close this help window</p>
        </div>
      </div>
    </div>
  );
};