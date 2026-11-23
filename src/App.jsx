import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
} from 'lucide-react';

import { useLocalStorage } from './hooks/useLocalStorage';
import { initialTasks } from './data/sampleTasks';
import { isTaskOverdue } from './utils/dateUtils';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatCard from './components/StatCard';
import ProgressOverview from './components/ProgressOverview';
import FocusNotes from './components/FocusNotes';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import KanbanBoard from './components/KanbanBoard';
import TaskForm from './components/TaskForm';
import ConfirmDialog from './components/ConfirmDialog';
import Toast from './components/Toast';

export default function App() {
  // 1. Persistent State
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', initialTasks);
  const [theme, setTheme] = useLocalStorage('focusboard_theme', 'light');

  // 2. Navigation & UI State
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'board'

  // 3. Filter & Sort State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [sortBy, setSortBy] = useState('due-asc');

  // 4. Modal & Dialog State
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultNewStatus, setDefaultNewStatus] = useState('To do');
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // 5. Toast Notifications State
  const [toasts, setToasts] = useState([]);

  // Sync theme with document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Toast Dispatcher Helper
  const showToast = useCallback((message, type = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    showToast(
      `Switched to ${theme === 'light' ? 'dark' : 'light'} theme`,
      'info'
    );
  }, [theme, setTheme, showToast]);

  // Dynamic Statistics Calculation (never hardcoded)
  const stats = useMemo(() => {
    const total = tasks.length;
    let completed = 0;
    let inProgress = 0;
    let toDo = 0;
    let overdue = 0;

    tasks.forEach((task) => {
      if (task.status === 'Completed') {
        completed += 1;
      } else if (task.status === 'In progress') {
        inProgress += 1;
      } else {
        toDo += 1;
      }

      if (isTaskOverdue(task.dueDate, task.status)) {
        overdue += 1;
      }
    });

    return { total, completed, inProgress, toDo, overdue };
  }, [tasks]);

  // Sidebar count indicators
  const sidebarCounts = useMemo(() => ({
    total: stats.total,
    pending: stats.inProgress + stats.toDo,
    completed: stats.completed,
  }), [stats]);

  // Filtering and Sorting Pipeline
  const filteredAndSortedTasks = useMemo(() => {
    let result = [...tasks];

    // Nav-level filtering
    if (activeNav === 'my-tasks') {
      result = result.filter((t) => t.status !== 'Completed');
    } else if (activeNav === 'completed') {
      result = result.filter((t) => t.status === 'Completed');
    }

    // Status filter
    if (statusFilter !== 'All') {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'All') {
      result = result.filter((t) => t.priority === priorityFilter);
    }

    // Search query (case-insensitive match on title or category or description)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.category && t.category.toLowerCase().includes(q)) ||
          (t.description && t.description.toLowerCase().includes(q))
      );
    }

    // Sorting
    const priorityWeights = { High: 3, Medium: 2, Low: 1 };

    result.sort((a, b) => {
      switch (sortBy) {
        case 'due-asc':
          return (a.dueDate || '').localeCompare(b.dueDate || '');
        case 'due-desc':
          return (b.dueDate || '').localeCompare(a.dueDate || '');
        case 'priority-desc':
          return (priorityWeights[b.priority] || 0) - (priorityWeights[a.priority] || 0);
        case 'priority-asc':
          return (priorityWeights[a.priority] || 0) - (priorityWeights[b.priority] || 0);
        case 'created-desc':
          return (b.createdAt || 0) - (a.createdAt || 0);
        case 'created-asc':
          return (a.createdAt || 0) - (b.createdAt || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, activeNav, statusFilter, priorityFilter, searchQuery, sortBy]);

  // Dynamic status counts for filter tabs within current activeNav scope
  const statusCounts = useMemo(() => {
    let scopeTasks = tasks;
    if (activeNav === 'my-tasks') {
      scopeTasks = tasks.filter((t) => t.status !== 'Completed');
    } else if (activeNav === 'completed') {
      scopeTasks = tasks.filter((t) => t.status === 'Completed');
    }

    return {
      All: scopeTasks.length,
      'To do': scopeTasks.filter((t) => t.status === 'To do').length,
      'In progress': scopeTasks.filter((t) => t.status === 'In progress').length,
      Completed: scopeTasks.filter((t) => t.status === 'Completed').length,
    };
  }, [tasks, activeNav]);

  const hasActiveFilters = Boolean(
    searchQuery.trim() || statusFilter !== 'All' || priorityFilter !== 'All'
  );

  const handleClearFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('All');
    setPriorityFilter('All');
    showToast('Filters reset to default', 'info');
  }, [showToast]);

  // CRUD Handlers
  const handleOpenAddTask = useCallback((columnStatus = 'To do') => {
    setEditingTask(null);
    setDefaultNewStatus(columnStatus);
    setTaskModalOpen(true);
  }, []);

  const handleOpenEditTask = useCallback((task) => {
    setEditingTask(task);
    setTaskModalOpen(true);
  }, []);

  const handleTaskFormSubmit = useCallback(
    (formData) => {
      if (editingTask) {
        // Edit existing task
        setTasks((prev) =>
          prev.map((t) =>
            t.id === editingTask.id
              ? {
                  ...formData,
                  id: editingTask.id,
                  createdAt: editingTask.createdAt || Date.now(),
                }
              : t
          )
        );
        showToast(`Task "${formData.title}" updated successfully!`, 'success');
      } else {
        // Create new task
        const newTask = {
          ...formData,
          status: formData.status || defaultNewStatus,
          id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          createdAt: Date.now(),
        };
        setTasks((prev) => [newTask, ...prev]);
        showToast(`Task "${formData.title}" created successfully!`, 'success');
      }
      setTaskModalOpen(false);
      setEditingTask(null);
    },
    [editingTask, defaultNewStatus, setTasks, showToast]
  );

  const handleOpenDeleteConfirm = useCallback((task) => {
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    if (!taskToDelete) return;
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete.id));
    showToast(`Task "${taskToDelete.title}" deleted.`, 'info');
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  }, [taskToDelete, setTasks, showToast]);

  const handleCancelDelete = useCallback(() => {
    setDeleteConfirmOpen(false);
    setTaskToDelete(null);
  }, []);

  const handleStatusChange = useCallback(
    (taskId, newStatus) => {
      let taskName = '';
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId) {
            taskName = t.title;
            return { ...t, status: newStatus };
          }
          return t;
        })
      );
      showToast(`Updated "${taskName || 'Task'}" status to ${newStatus}`, 'info');
    },
    [setTasks, showToast]
  );

  // Section Header Details
  const getSectionDetails = () => {
    switch (activeNav) {
      case 'my-tasks':
        return {
          title: 'My Active Tasks',
          subtitle: 'Focus on in-progress and to-do objectives to keep delivery on schedule.',
        };
      case 'completed':
        return {
          title: 'Completed Archive',
          subtitle: 'Review accomplished work, sprint milestones, and verified deliverables.',
        };
      case 'dashboard':
      default:
        return {
          title: 'Dashboard Overview',
          subtitle: 'Welcome back! Here is your daily productivity and sprint status.',
        };
    }
  };

  const { title: pageTitle, subtitle: pageSubtitle } = getSectionDetails();

  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Sidebar
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        counts={sidebarCounts}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          title={pageTitle}
          subtitle={pageSubtitle}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          theme={theme}
          onToggleTheme={toggleTheme}
          onAddTask={() => handleOpenAddTask('To do')}
          overdueCount={stats.overdue}
          completedCount={stats.completed}
        />

        <main className="content-container">
          {/* Dashboard Top Section: Stat Cards & Progress Overview */}
          {activeNav === 'dashboard' && (
            <section className="overview-section" aria-label="Dashboard Statistics Overview">
              <div className="stats-grid">
                <StatCard
                  title="Total Tasks"
                  value={stats.total}
                  icon={ListTodo}
                  variant="primary"
                  subtitle={`${stats.inProgress + stats.toDo} tasks active in backlog`}
                />
                <StatCard
                  title="In Progress"
                  value={stats.inProgress}
                  icon={Clock}
                  variant="info"
                  badge="Active Sprint"
                  subtitle="Currently being worked on"
                />
                <StatCard
                  title="Completed"
                  value={stats.completed}
                  icon={CheckCircle2}
                  variant="success"
                  badge={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}% Done`}
                  subtitle="Verified deliverables"
                />
                <StatCard
                  title="Overdue Tasks"
                  value={stats.overdue}
                  icon={AlertTriangle}
                  variant={stats.overdue > 0 ? 'warning' : 'default'}
                  badge={stats.overdue > 0 ? 'Action Required' : 'All on time'}
                  subtitle={
                    stats.overdue > 0
                      ? 'Past scheduled deadline'
                      : 'No deadlines missed'
                  }
                />
              </div>

              {/* Progress Bar & Distribution */}
              <ProgressOverview
                total={stats.total}
                completed={stats.completed}
                inProgress={stats.inProgress}
                toDo={stats.toDo}
                overdue={stats.overdue}
              />

              {/* 3-Slide Focus Notes Carousel */}
              <FocusNotes />
            </section>
          )}

          {/* Task Management Section */}
          <section className="task-section" aria-label="Task Management">
            <div className="task-section__header">
              <div className="task-section__title-group">
                <h2 className="task-section__heading">
                  {activeNav === 'completed'
                    ? 'Completed Tasks'
                    : activeNav === 'my-tasks'
                    ? 'Active Sprint Tasks'
                    : 'Task Management'}
                </h2>
                <span className="task-count-pill">
                  {filteredAndSortedTasks.length} task
                  {filteredAndSortedTasks.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Quick Add Task button in Section Header */}
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => handleOpenAddTask('To do')}
              >
                <Plus size={16} />
                <span>Add Task</span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="task-section__search">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Filter Tabs & Controls */}
            <FilterTabs
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              priorityFilter={priorityFilter}
              onPriorityFilterChange={setPriorityFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              statusCounts={statusCounts}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={handleClearFilters}
            />

            {/* Tasks View: List vs Kanban Board */}
            {viewMode === 'list' ? (
              <TaskList
                tasks={filteredAndSortedTasks}
                onEdit={handleOpenEditTask}
                onDelete={handleOpenDeleteConfirm}
                onStatusChange={handleStatusChange}
                onClearFilters={handleClearFilters}
                onAddTask={() => handleOpenAddTask('To do')}
                hasFilters={hasActiveFilters}
              />
            ) : (
              <KanbanBoard
                tasks={filteredAndSortedTasks}
                onEdit={handleOpenEditTask}
                onDelete={handleOpenDeleteConfirm}
                onStatusChange={handleStatusChange}
                onAddTask={handleOpenAddTask}
              />
            )}
          </section>
        </main>
      </div>

      {/* Create / Edit Task Modal - keyed by task id or 'new' to ensure fresh state */}
      {taskModalOpen && (
        <TaskForm
          key={editingTask ? editingTask.id : `new-${defaultNewStatus}`}
          isOpen={taskModalOpen}
          onClose={() => {
            setTaskModalOpen(false);
            setEditingTask(null);
          }}
          onSubmit={handleTaskFormSubmit}
          initialTask={editingTask}
          defaultStatus={defaultNewStatus}
        />
      )}

      {/* Delete Confirmation Modal Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        title="Delete Task"
        message={
          taskToDelete
            ? `Are you sure you want to permanently delete "${taskToDelete.title}"? This action cannot be reversed.`
            : 'Are you sure you want to delete this task?'
        }
        confirmText="Delete Task"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
