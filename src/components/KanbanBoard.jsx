import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, Circle } from 'lucide-react';
import TaskCard from './TaskCard';

const COLUMNS = [
  { id: 'To do', title: 'To Do', icon: Circle, colorClass: 'col-todo' },
  { id: 'In progress', title: 'In Progress', icon: Clock, colorClass: 'col-inprogress' },
  { id: 'Completed', title: 'Completed', icon: CheckCircle2, colorClass: 'col-completed' },
];

/**
 * KanbanBoard provides an interactive column-based board view with drag-and-drop.
 */
export default function KanbanBoard({
  tasks = [],
  onEdit,
  onDelete,
  onStatusChange,
  onAddTask,
}) {
  const [dragOverCol, setDragOverCol] = useState(null);

  const handleDragOver = (e, colId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (dragOverCol !== colId) {
      setDragOverCol(colId);
    }
  };

  const handleDragLeave = () => {
    setDragOverCol(null);
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onStatusChange(taskId, targetStatus);
    }
  };

  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => {
        const Icon = col.icon;
        const colTasks = tasks.filter((t) => t.status === col.id);
        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            className={`kanban-column ${col.colorClass} ${
              isOver ? 'kanban-column--drag-over' : ''
            }`}
            onDragOver={(e) => handleDragOver(e, col.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, col.id)}
          >
            <div className="kanban-column__header">
              <div className="kanban-column__title-wrapper">
                <Icon size={16} className="kanban-col-icon" />
                <h3 className="kanban-column__title">{col.title}</h3>
                <span className="kanban-column__count">{colTasks.length}</span>
              </div>
              <button
                type="button"
                className="kanban-column__add-btn"
                onClick={() => onAddTask(col.id)}
                aria-label={`Add new task to ${col.title}`}
                title={`Add task to ${col.title}`}
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="kanban-column__body">
              {colTasks.length === 0 ? (
                <div className="kanban-column__empty">
                  <span>No tasks</span>
                  <small>Drag tasks here or click +</small>
                </div>
              ) : (
                colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                  />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
