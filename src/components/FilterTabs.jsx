import React from 'react';
import { Filter, ArrowUpDown, LayoutGrid, List, RotateCcw } from 'lucide-react';

/**
 * FilterTabs component providing:
 * - Status filter tabs with count badges
 * - Priority filter dropdown
 * - Sorting dropdown
 * - View mode toggle (List vs Kanban Board)
 * - Reset / Clear Filters button
 */
export default function FilterTabs({
  statusFilter = 'All',
  onStatusFilterChange,
  priorityFilter = 'All',
  onPriorityFilterChange,
  sortBy = 'due-asc',
  onSortChange,
  viewMode = 'list',
  onViewModeChange,
  statusCounts = { All: 0, 'To do': 0, 'In progress': 0, Completed: 0 },
  hasActiveFilters = false,
  onClearFilters,
}) {
  const tabs = [
    { id: 'All', label: 'All Tasks', count: statusCounts.All },
    { id: 'To do', label: 'To Do', count: statusCounts['To do'] },
    { id: 'In progress', label: 'In Progress', count: statusCounts['In progress'] },
    { id: 'Completed', label: 'Completed', count: statusCounts.Completed },
  ];

  return (
    <div className="filter-section">
      {/* Status Filter Tabs */}
      <div className="filter-tabs" role="tablist" aria-label="Filter tasks by status">
        {tabs.map((tab) => {
          const isActive = statusFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`filter-tab ${isActive ? 'filter-tab--active' : ''}`}
              onClick={() => onStatusFilterChange(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="filter-tab__count">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Filter Controls Row: Priority, Sort, View Toggle, Clear */}
      <div className="filter-controls">
        {/* Priority Filter */}
        <div className="control-group">
          <label htmlFor="priority-filter-select" className="control-label">
            <Filter size={14} />
            <span className="hide-on-mobile">Priority:</span>
          </label>
          <select
            id="priority-filter-select"
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => onPriorityFilterChange(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div className="control-group">
          <label htmlFor="sort-by-select" className="control-label">
            <ArrowUpDown size={14} />
            <span className="hide-on-mobile">Sort by:</span>
          </label>
          <select
            id="sort-by-select"
            className="filter-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="due-asc">Due date: Earliest first</option>
            <option value="due-desc">Due date: Latest first</option>
            <option value="priority-desc">Priority: High to Low</option>
            <option value="priority-asc">Priority: Low to High</option>
            <option value="created-desc">Newest created</option>
            <option value="created-asc">Oldest created</option>
          </select>
        </div>

        {/* List / Board View Mode Toggle */}
        <div className="view-mode-toggle" role="group" aria-label="View layout style">
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'list' ? 'view-toggle-btn--active' : ''}`}
            onClick={() => onViewModeChange('list')}
            aria-label="List view"
            title="List view"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={`view-toggle-btn ${viewMode === 'board' ? 'view-toggle-btn--active' : ''}`}
            onClick={() => onViewModeChange('board')}
            aria-label="Kanban board view"
            title="Kanban board view"
          >
            <LayoutGrid size={16} />
          </button>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            type="button"
            className="btn-clear-filters"
            onClick={onClearFilters}
            title="Reset all active filters and search"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
