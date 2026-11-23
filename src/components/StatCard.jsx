import React from 'react';

/**
 * Reusable StatCard component for dashboard metrics.
 */
export default function StatCard({
  title,
  value,
  icon: Icon,
  variant = 'default',
  subtitle,
  badge,
}) {
  return (
    <div className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__header">
        <span className="stat-card__title">{title}</span>
        {Icon && (
          <div className={`stat-card__icon-wrapper stat-card__icon-wrapper--${variant}`}>
            <Icon size={20} aria-hidden="true" />
          </div>
        )}
      </div>

      <div className="stat-card__body">
        <div className="stat-card__value">{value}</div>
        {badge && (
          <span className={`stat-card__badge stat-card__badge--${variant}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </div>
  );
}
