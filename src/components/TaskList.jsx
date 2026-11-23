import React from 'react';
import { Inbox, SearchX, Plus, RotateCcw } from 'lucide-react';
import TaskCard from './TaskCard';

/**
 * TaskList renders a grid/list of TaskCard components or empty state messaging.
 */
export default function TaskList({
  tasks = [],
  onEdit,
  onDelete,
  onStatusChange,
  onClearFilters,
  onAddTask,
  hasFilters = false,
}) {
  if (tasks.length === 0) {
    if (hasFilters) {
      return (
        <div className="empty-state">
          <div className="empty-state__icon-wrapper">
            <SearchX size={36} className="text-muted" />
          </div>
          <h3 className="empty-state__title">No tasks match your criteria</h3>
          <p className="empty-state__message">
            Try adjusting your search terms, status filters, or priority filters to find what you are looking for.
          </p>
          <button
            type="button"
            className="btn btn--secondary empty-state__action"
            onClick={onClearFilters}
          >
            <RotateCcw size={16} />
            <span>Reset all filters</span>
          </button>
        </div>
      );
    }

    return (
      <div className="empty-state">
        <div className="empty-state__icon-wrapper">
          <Inbox size={36} className="text-muted" />
        </div>
        <h3 className="empty-state__title">No tasks created yet</h3>
        <p className="empty-state__message">
          Get started by adding your first task to plan, prioritize, and track your focus workflow.
        </p>
        <button
          type="button"
          className="btn btn--primary empty-state__action"
          onClick={onAddTask}
        >
          <Plus size={16} />
          <span>Add your first task</span>
        </button>
      </div>
    );
  }

  return (
    <div className="task-grid" role="list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
}
