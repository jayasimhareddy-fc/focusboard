import React from 'react';
import {
  Calendar,
  AlertTriangle,
  Edit3,
  Trash2,
  Tag,
} from 'lucide-react';
import { formatReadableDate, isTaskOverdue } from '../utils/dateUtils';

/**
 * TaskCard - Reusable component for rendering individual task information,
 * status controls, badges, and quick actions.
 */
export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) {
  const overdue = isTaskOverdue(task.dueDate, task.status);

  const getPriorityBadgeClass = (priority) => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return 'badge-priority--high';
      case 'medium':
        return 'badge-priority--medium';
      case 'low':
      default:
        return 'badge-priority--low';
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Completed':
        return 'badge-status--completed';
      case 'In progress':
        return 'badge-status--inprogress';
      case 'To do':
      default:
        return 'badge-status--todo';
    }
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <article
      className={`task-card ${overdue ? 'task-card--overdue' : ''} ${
        task.status === 'Completed' ? 'task-card--completed' : ''
      }`}
      draggable
      onDragStart={handleDragStart}
      aria-labelledby={`task-title-${task.id}`}
    >
      <div className="task-card__top">
        <div className="task-card__badges">
          {/* Category Tag */}
          {task.category && (
            <span className="task-badge task-badge--category">
              <Tag size={12} />
              <span>{task.category}</span>
            </span>
          )}

          {/* Priority Badge */}
          <span className={`task-badge ${getPriorityBadgeClass(task.priority)}`}>
            {task.priority} Priority
          </span>

          {/* Overdue Badge */}
          {overdue && (
            <span
              className="task-badge badge-status--overdue"
              title="This task is past its due date and not yet completed."
            >
              <AlertTriangle size={12} />
              <span>Overdue</span>
            </span>
          )}
        </div>

        {/* Action Buttons: Edit & Delete */}
        <div className="task-card__actions">
          <button
            type="button"
            className="action-btn action-btn--edit"
            onClick={() => onEdit(task)}
            aria-label={`Edit task: ${task.title}`}
            title="Edit task"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="action-btn action-btn--delete"
            onClick={() => onDelete(task)}
            aria-label={`Delete task: ${task.title}`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      {/* Task Title & Description */}
      <h4 id={`task-title-${task.id}`} className="task-card__title">
        {task.title}
      </h4>

      {task.description && (
        <p className="task-card__description">{task.description}</p>
      )}

      {/* Footer: Due Date and Inline Status Selector */}
      <div className="task-card__footer">
        <div
          className={`task-card__due-date ${overdue ? 'text-overdue' : ''}`}
          title={`Due: ${task.dueDate}`}
        >
          <Calendar size={14} />
          <span>{formatReadableDate(task.dueDate)}</span>
        </div>

        <div className="task-card__status-control">
          <label htmlFor={`status-select-${task.id}`} className="sr-only">
            Change status for {task.title}
          </label>
          <select
            id={`status-select-${task.id}`}
            className={`status-select ${getStatusBadgeClass(task.status)}`}
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </article>
  );
}
