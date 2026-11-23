import React, { useState, useEffect, useRef } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { getTodayString } from '../utils/dateUtils';

const DEFAULT_CATEGORIES = [
  'Design & Frontend',
  'Frontend',
  'Code Quality',
  'Documentation',
  'QA & Testing',
  'Bug Fix',
  'DevOps',
  'General',
];

/**
 * Reusable TaskForm Modal for creating and editing tasks.
 */
export default function TaskForm({
  isOpen,
  onClose,
  onSubmit,
  initialTask = null,
  defaultStatus = 'To do',
}) {
  const isEditMode = Boolean(initialTask);
  const titleInputRef = useRef(null);

  const [formData, setFormData] = useState(() => ({
    title: initialTask?.title || '',
    description: initialTask?.description || '',
    category: initialTask?.category || 'Design & Frontend',
    status: initialTask?.status || defaultStatus,
    priority: initialTask?.priority || 'Medium',
    dueDate: initialTask?.dueDate || getTodayString(),
  }));

  const [errors, setErrors] = useState({});

  // Focus trap / initial focus on title
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        titleInputRef.current?.focus();
      }, 50);

      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    const trimmedTitle = formData.title.trim();

    if (!trimmedTitle) {
      newErrors.title = 'Task title is required and cannot be empty.';
    } else if (trimmedTitle.length < 3) {
      newErrors.title = 'Title should be at least 3 characters long.';
    }

    if (!formData.dueDate) {
      newErrors.dueDate = 'Due date is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const taskPayload = {
      ...formData,
      title: trimmedTitle,
      description: formData.description.trim(),
    };

    onSubmit(taskPayload);
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="modal-dialog modal-dialog--task-form"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-form-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-dialog__header">
          <h2 id="task-form-title" className="modal-title">
            {isEditMode ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close task form modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="task-form">
          {/* Title Field */}
          <div className="form-group">
            <label htmlFor="task-title" className="form-label required">
              Task Title
            </label>
            <input
              ref={titleInputRef}
              type="text"
              id="task-title"
              name="title"
              className={`form-input ${errors.title ? 'form-input--error' : ''}`}
              placeholder="e.g. Complete responsive layouts"
              value={formData.title}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={Boolean(errors.title)}
              aria-describedby={errors.title ? 'task-title-error' : undefined}
            />
            {errors.title && (
              <p id="task-title-error" className="form-error" role="alert">
                <AlertCircle size={14} />
                <span>{errors.title}</span>
              </p>
            )}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="task-description" className="form-label">
              Description <span className="form-label-hint">(optional)</span>
            </label>
            <textarea
              id="task-description"
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Add key notes, acceptance criteria, or context..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {/* Two-column Grid for Category & Due Date */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-category" className="form-label">
                Category
              </label>
              <div className="select-wrapper">
                <select
                  id="task-category"
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {DEFAULT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="task-due-date" className="form-label required">
                Due Date
              </label>
              <input
                type="date"
                id="task-due-date"
                name="dueDate"
                className={`form-input ${errors.dueDate ? 'form-input--error' : ''}`}
                value={formData.dueDate}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={Boolean(errors.dueDate)}
                aria-describedby={errors.dueDate ? 'task-due-error' : undefined}
              />
              {errors.dueDate && (
                <p id="task-due-error" className="form-error" role="alert">
                  <AlertCircle size={14} />
                  <span>{errors.dueDate}</span>
                </p>
              )}
            </div>
          </div>

          {/* Two-column Grid for Status & Priority */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="task-status" className="form-label required">
                Status
              </label>
              <div className="select-wrapper">
                <select
                  id="task-status"
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  aria-required="true"
                >
                  <option value="To do">To do</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="task-priority" className="form-label required">
                Priority
              </label>
              <div className="select-wrapper">
                <select
                  id="task-priority"
                  name="priority"
                  className="form-select"
                  value={formData.priority}
                  onChange={handleChange}
                  aria-required="true"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dialog Action Buttons */}
          <div className="modal-dialog__actions">
            <button
              type="button"
              className="btn btn--secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn--primary"
            >
              {isEditMode ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
