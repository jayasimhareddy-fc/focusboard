import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Sparkles,
  Sun,
  Moon,
  X,
  ShieldCheck,
} from 'lucide-react';

/**
 * Sidebar navigation component with responsive drawer support
 */
export default function Sidebar({
  activeNav = 'dashboard',
  onNavChange,
  isOpen = false,
  onClose,
  counts = { total: 0, pending: 0, completed: 0 },
  theme = 'light',
  onToggleTheme,
}) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: counts.total,
    },
    {
      id: 'my-tasks',
      label: 'My Tasks',
      icon: ListTodo,
      badge: counts.pending,
    },
    {
      id: 'completed',
      label: 'Completed Tasks',
      icon: CheckSquare,
      badge: counts.completed,
    },
  ];

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
        aria-label="Main Navigation"
      >
        <div className="sidebar__header">
          <div className="sidebar__brand">
            <div className="brand-icon">
              <Sparkles size={20} className="brand-icon-svg" />
            </div>
            <div className="brand-text">
              <span className="brand-name">FocusBoard</span>
              <span className="brand-tag">PRO</span>
            </div>
          </div>

          {/* Close button on mobile drawer */}
          <button
            type="button"
            className="sidebar__close-btn"
            onClick={onClose}
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="sidebar__nav">
          <span className="sidebar__section-title">Workspace</span>
          <ul className="sidebar__menu">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sidebar__link ${isActive ? 'sidebar__link--active' : ''}`}
                    onClick={() => {
                      onNavChange(item.id);
                      if (onClose) onClose();
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon size={18} className="sidebar__link-icon" />
                    <span className="sidebar__link-label">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="sidebar__link-badge">{item.badge}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer with Recruitment Badge & Quick Theme Toggle */}
        <div className="sidebar__footer">
          <div className="system-pill">
            <ShieldCheck size={14} className="text-accent" />
            <span>Frontend Candidate Build</span>
          </div>

          <div className="sidebar__theme-toggle">
            <button
              type="button"
              className="theme-switch-btn"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <>
                  <Moon size={16} />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun size={16} />
                  <span>Light Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
