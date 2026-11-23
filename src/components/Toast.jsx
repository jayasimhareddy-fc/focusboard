import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

/**
 * Accessible Toast Notifications system
 */
export default function Toast({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast__icon toast__icon--success" />;
      case 'error':
        return <AlertCircle size={18} className="toast__icon toast__icon--error" />;
      case 'warning':
        return <AlertTriangle size={18} className="toast__icon toast__icon--warning" />;
      case 'info':
      default:
        return <Info size={18} className="toast__icon toast__icon--info" />;
    }
  };

  return (
    <div
      className="toast-container"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast--${toast.type || 'info'}`}
          role="status"
          aria-live="polite"
        >
          <div className="toast__content">
            {getIcon(toast.type)}
            <span className="toast__message">{toast.message}</span>
          </div>
          <button
            type="button"
            className="toast__close-btn"
            onClick={() => onDismiss(toast.id)}
            aria-label="Dismiss notification"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
