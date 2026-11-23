import React, { useState } from 'react';
import {
  Menu,
  Sun,
  Moon,
  Bell,
  Plus,
  Calendar,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';

// Formatted date string computed once per application session
const TODAY_FORMATTED = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

/**
 * Header component for the FocusBoard application.
 */
export default function Header({
  title = 'Dashboard',
  subtitle = 'Welcome back! Here is your focus overview for today.',
  onToggleSidebar,
  theme = 'light',
  onToggleTheme,
  onAddTask,
  overdueCount = 0,
  completedCount = 0,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="header">
      <div className="header__left">
        {/* Mobile Hamburger Menu Toggle */}
        <button
          type="button"
          className="header__menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header__headings">
          <div className="header__title-row">
            <h1 className="header__title">{title}</h1>
            <div className="header__date-chip">
              <Calendar size={13} />
              <span>{TODAY_FORMATTED}</span>
            </div>
          </div>
          <p className="header__subtitle">{subtitle}</p>
        </div>
      </div>

      <div className="header__right">
        {/* Quick Add Task Button */}
        <button
          type="button"
          className="btn btn--primary header__add-btn"
          onClick={() => onAddTask()}
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>

        {/* Theme Toggle Button */}
        <button
          type="button"
          className="icon-btn header__theme-btn"
          onClick={onToggleTheme}
          aria-label={`Toggle theme (currently ${theme})`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications Popover Toggle */}
        <div className="notifications-wrapper">
          <button
            type="button"
            className="icon-btn header__notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={18} />
            {overdueCount > 0 && (
              <span className="notification-badge" aria-label={`${overdueCount} overdue tasks`}>
                {overdueCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div
              className="notification-dropdown"
              role="region"
              aria-label="Notifications panel"
            >
              <div className="notification-dropdown__header">
                <span className="notification-dropdown__title">Notifications</span>
                <span className="notification-dropdown__meta">
                  {overdueCount > 0 ? `${overdueCount} urgent alerts` : 'All caught up'}
                </span>
              </div>
              <div className="notification-dropdown__body">
                {overdueCount > 0 ? (
                  <div className="notification-item notification-item--alert">
                    <AlertTriangle size={16} className="text-warning" />
                    <div>
                      <p className="notification-item__title">Overdue Deadlines</p>
                      <p className="notification-item__desc">
                        You have {overdueCount} task{overdueCount > 1 ? 's' : ''} past due date.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="notification-item">
                    <CheckCircle size={16} className="text-success" />
                    <div>
                      <p className="notification-item__title">No overdue tasks!</p>
                      <p className="notification-item__desc">
                        You have completed {completedCount} task{completedCount === 1 ? '' : 's'}. Great work!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile / Avatar Placeholder */}
        <div className="header__profile" title="Alex Morgan - Senior Frontend Engineer">
          <div className="avatar-chip">
            <span className="avatar-initials">AM</span>
          </div>
          <div className="profile-info hide-on-tablet">
            <span className="profile-name">Alex Morgan</span>
            <span className="profile-role">Frontend Lead</span>
          </div>
        </div>
      </div>
    </header>
  );
}
