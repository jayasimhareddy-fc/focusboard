import React from 'react';
import { AlertCircle } from 'lucide-react';

/**
 * ProgressOverview visualizes overall completion percentage,
 * progress bar, and breakdown of task distribution.
 */
export default function ProgressOverview({
  total = 0,
  completed = 0,
  inProgress = 0,
  toDo = 0,
  overdue = 0,
}) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const inProgressPct = total > 0 ? Math.round((inProgress / total) * 100) : 0;
  const toDoPct = total > 0 ? Math.round((toDo / total) * 100) : 0;

  return (
    <div className="progress-overview">
      <div className="progress-overview__header">
        <div>
          <h3 className="progress-overview__title">Sprint Progress Overview</h3>
          <p className="progress-overview__subtitle">
            {completed} of {total} tasks completed ({percentage}%)
          </p>
        </div>
        <div className="progress-overview__badge">
          <span className="progress-overview__percent">{percentage}%</span>
        </div>
      </div>

      {/* Segmented Visual Progress Bar */}
      <div
        className="progress-bar-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Sprint completion percentage"
      >
        <div
          className="progress-bar-fill progress-bar-fill--completed"
          style={{ width: `${percentage}%` }}
          title={`Completed: ${percentage}%`}
        />
        <div
          className="progress-bar-fill progress-bar-fill--inprogress"
          style={{ width: `${inProgressPct}%` }}
          title={`In Progress: ${inProgressPct}%`}
        />
        <div
          className="progress-bar-fill progress-bar-fill--todo"
          style={{ width: `${toDoPct}%` }}
          title={`To Do: ${toDoPct}%`}
        />
      </div>

      {/* Legend & Summary Details */}
      <div className="progress-overview__legend">
        <div className="legend-item">
          <span className="legend-dot legend-dot--completed" />
          <span className="legend-label">Completed: <strong>{completed}</strong></span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot--inprogress" />
          <span className="legend-label">In Progress: <strong>{inProgress}</strong></span>
        </div>
        <div className="legend-item">
          <span className="legend-dot legend-dot--todo" />
          <span className="legend-label">To Do: <strong>{toDo}</strong></span>
        </div>
        {overdue > 0 && (
          <div className="legend-item legend-item--overdue">
            <AlertCircle size={14} className="legend-overdue-icon" />
            <span className="legend-label text-overdue">Overdue: <strong>{overdue}</strong></span>
          </div>
        )}
      </div>
    </div>
  );
}
