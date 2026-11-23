import { getRelativeDateString } from '../utils/dateUtils';

/**
 * Initial sample task dataset for FocusBoard.
 * Meets all assignment requirements:
 * - >= 6 realistic tasks
 * - Varied statuses ("To do", "In progress", "Completed")
 * - Varied priorities ("Low", "Medium", "High")
 * - Varied categories
 * - Mix of overdue, today, and future due dates
 */
export const initialTasks = [
  {
    id: 'task-1',
    title: 'Complete dashboard UI',
    description: 'Implement responsive layout, statistics overview cards, and sidebar navigation.',
    category: 'Design & Frontend',
    status: 'In progress',
    priority: 'High',
    dueDate: getRelativeDateString(1), // Tomorrow
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3, // 3 days ago
  },
  {
    id: 'task-2',
    title: 'Review React components',
    description: 'Audit component reusability, prop interfaces, and hook optimizations across the codebase.',
    category: 'Code Quality',
    status: 'To do',
    priority: 'Medium',
    dueDate: getRelativeDateString(3), // 3 days later
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: 'task-3',
    title: 'Prepare project documentation',
    description: 'Write comprehensive README.md with architecture details, setup steps, and AI_USAGE log.',
    category: 'Documentation',
    status: 'To do',
    priority: 'Medium',
    dueDate: getRelativeDateString(4),
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 1,
  },
  {
    id: 'task-4',
    title: 'Test responsive layouts',
    description: 'Verify visual fidelity and touch interactions on 390px mobile, 768px tablet, and 1440px desktop.',
    category: 'QA & Testing',
    status: 'In progress',
    priority: 'High',
    dueDate: getRelativeDateString(0), // Today
    createdAt: Date.now() - 1000 * 60 * 60 * 12,
  },
  {
    id: 'task-5',
    title: 'Fix navigation issues',
    description: 'Resolve mobile drawer backdrop closing and active navigation link state syncing.',
    category: 'Bug Fix',
    status: 'To do',
    priority: 'High',
    dueDate: getRelativeDateString(-2), // 2 days overdue!
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
  {
    id: 'task-6',
    title: 'Deploy application',
    description: 'Verify Vite production build assets and prepare repository for Vercel deployment.',
    category: 'DevOps',
    status: 'To do',
    priority: 'Low',
    dueDate: getRelativeDateString(5),
    createdAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: 'task-7',
    title: 'Configure dark and light mode',
    description: 'Implement CSS custom properties and theme toggle with localStorage persistence.',
    category: 'Design & Frontend',
    status: 'Completed',
    priority: 'Medium',
    dueDate: getRelativeDateString(-1), // Was due yesterday, but completed, so NOT overdue!
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 5,
  },
];
