# FocusBoard – Responsive Task Management Dashboard

FocusBoard is a modern, high-performance, responsive productivity dashboard built with **React**, **Vite**, and **vanilla CSS3**. Designed as a senior frontend recruitment assessment application, FocusBoard features intuitive task management, real-time metrics, dynamic filtering, carousel focus notes, custom modals, full dark/light mode theming, and resilient `localStorage` synchronization.

![FocusBoard Demo Banner](public/favicon.svg)

---

## Live Links & Repository

- **Live Application Demo:** [https://focusboard-demo.vercel.app](https://focusboard-demo.vercel.app) *(Deploy preview placeholder)*
- **GitHub Repository:** [https://github.com/your-username/focusboard](https://github.com/your-username/focusboard) *(Repository placeholder)*

---

## 1. Technology Stack

- **Core Library:** React 19 (Functional components, Hooks: `useState`, `useEffect`, `useMemo`, `useCallback`, `useRef`)
- **Build Tool:** Vite (Ultra-fast HMR and optimized production bundle)
- **Language:** JavaScript ES6+ (clean modern standards)
- **Styling:** Custom Vanilla CSS3 using CSS Custom Properties (CSS variables) with zero heavy UI frameworks (Tailwind/Bootstrap/MUI omitted for pure CSS control and maximum performance)
- **Icons:** [Lucide React](https://lucide.dev)
- **Persistence:** Browser `localStorage` via custom hook `useLocalStorage`
- **Code Quality & Linter:** Oxlint (0 errors, 0 warnings, strict React 19 purity compliance)

---

## 2. Features

### Core Task Operations (CRUD)
- **Create Task:** Intuitive modal form validating title (no empty or whitespace-only titles allowed), due date, category, status, and priority. Automatically generates unique IDs and timestamps.
- **Edit Task:** Reuses the accessible task form, pre-populates existing data, preserves original task ID and creation date, and updates state instantly.
- **Delete Task with Confirmation:** Prevents accidental data loss by prompting users with an accessible confirmation dialog before deleting.
- **Direct Status Management:** Rapid inline status changer directly on cards, allowing one-click transitions between `To do`, `In progress`, and `Completed`.

### Dynamic Metrics & Overview
- **4 Real-Time Stat Cards:**
  1. **Total Tasks:** Total backlog items count.
  2. **In Progress:** Active tasks undergoing work.
  3. **Completed:** Verified deliverables and overall completion percentage.
  4. **Overdue Tasks:** Automated detection comparing local due dates against today's date for uncompleted tasks with urgent warning styling.
- **Sprint Progress Overview:** Segmented progress bar depicting completion percentages, active work distribution, and overdue alerts.
- **100% Calculated State:** Zero hardcoded statistics; metrics derive reactively from the state array.

### Focus Notes Carousel
- 3-slide productivity carousel with curated deep work principles.
- Circular looping navigation (Previous and Next).
- 3 interactive indicator dots with active status pill styling.
- Accessible keyboard navigation (`ArrowLeft`, `ArrowRight`, `Tab`, `Enter`).
- Auto-advancement every 7 seconds, automatically pausing on mouse hover or focus.

### Search, Filtering & Sorting Pipeline
- **Case-Insensitive Search:** Instant live filtering by task title, category, or description keywords with a one-click clear button.
- **Status Filter Tabs:** Tabs for `All`, `To do`, `In progress`, and `Completed` displaying dynamic count badges for each category.
- **Priority Filter:** Quick filter by `All Priorities`, `High`, `Medium`, and `Low`.
- **Flexible Sorting:** Sort by Due Date (earliest/latest), Priority (High to Low / Low to High), and Created Date (newest/oldest).
- **Clear Filters:** A dedicated reset button appears whenever filters or search terms are applied.
- **Combined Logic:** Search, status filters, priority filters, and sorting work seamlessly together through optimized `useMemo` hooks.

### Kanban Board View (Bonus Feature)
- Switch seamlessly between **List View** and **Board View** (Kanban).
- 3 status columns: `To Do`, `In Progress`, and `Completed` with item counters.
- **HTML5 Drag-and-Drop:** Drag task cards between columns to change status immediately.
- Column-specific quick "Add Task" buttons.

### Accessible Notification System (Toast)
- Fixed toast notification container delivering non-blocking feedback for task creation, updates, deletions, status transitions, and filter resets.
- Auto-dismisses after 3.6 seconds with dismiss buttons and `role="status"` accessibility.

### Dark and Light Mode
- Integrated theme switcher located in both the header and sidebar.
- Implemented via semantic CSS Custom Properties (`data-theme="light"` / `data-theme="dark"`).
- Theme preferences persist in `localStorage` across page reloads.

---

## 3. Project Directory Structure

```text
focusboard/
├── public/
│   └── favicon.svg           # Application SVG branding icon
├── src/
│   ├── assets/               # Static assets
│   ├── components/
│   │   ├── ConfirmDialog.jsx # Accessible delete confirmation modal
│   │   ├── FilterTabs.jsx    # Status tabs, priority dropdown, sort selector, and view toggle
│   │   ├── FocusNotes.jsx    # 3-slide productivity carousel
│   │   ├── Header.jsx        # Navigation header, search, date chip, theme toggle, and profile avatar
│   │   ├── KanbanBoard.jsx   # Interactive 3-column drag-and-drop board view
│   │   ├── ProgressOverview.jsx # Segmented sprint progress bar & summary
│   │   ├── SearchBar.jsx     # Instant search bar with clear button
│   │   ├── Sidebar.jsx       # Responsive drawer navigation & workspace branding
│   │   ├── StatCard.jsx      # Reusable dashboard metric card
│   │   ├── TaskCard.jsx      # Individual task card with status control & badges
│   │   ├── TaskForm.jsx      # Create/Edit modal dialog with validation
│   │   ├── TaskList.jsx      # Responsive grid list & empty states
│   │   └── Toast.jsx         # Non-blocking notification alerts
│   ├── data/
│   │   ├── focusNotesData.js # Focus carousel slides content
│   │   └── sampleTasks.js    # Seed sample tasks satisfying recruitment requirements
│   ├── hooks/
│   │   └── useLocalStorage.js# Custom localStorage persistence hook
│   ├── utils/
│   │   └── dateUtils.js      # Date formatting, comparison, and overdue calculation
│   ├── App.jsx               # Application root orchestrator
│   ├── index.css             # Vanilla CSS design system (tokens, themes, animations, media queries)
│   └── main.jsx              # React 19 entrypoint
├── index.html                # HTML5 root template
├── package.json              # Project dependencies & scripts
├── AI_USAGE.md               # Transparent documentation of AI tools utilized
└── README.md                 # Project documentation
```

---

## 4. State Management Architecture

FocusBoard utilizes idiomatic React Hooks without redundant external state managers (e.g. Redux):

1. **Persistent State (`useLocalStorage`):**
   - `tasks`: Array of task items. Stored under key `focusboard_tasks`.
   - `theme`: `'light'` | `'dark'`. Stored under key `focusboard_theme`.
2. **UI Navigation State:**
   - `activeNav`: Determines whether viewing `dashboard`, `my-tasks`, or `completed`.
   - `viewMode`: Toggles between `list` (grid) and `board` (Kanban).
   - `sidebarOpen`: Controls mobile navigation drawer visibility.
3. **Derived Computations (`useMemo`):**
   - `stats`: Calculates `total`, `completed`, `inProgress`, `toDo`, and `overdue` counts on the fly.
   - `filteredAndSortedTasks`: A unified computation pipeline applying search keywords, status filter, priority filter, and sort order.
   - `statusCounts`: Computes badge counts for each status tab based on the active navigation scope.
4. **Modal & Feedback State:**
   - `taskModalOpen` & `editingTask`: Manages task form modal state.
   - `deleteConfirmOpen` & `taskToDelete`: Controls confirmation dialog state.
   - `toasts`: Manages active notifications queue.

---

## 5. LocalStorage Implementation

The custom `useLocalStorage` hook (`src/hooks/useLocalStorage.js`):
- Initializes state safely from `localStorage.getItem(key)`.
- Falls back to `initialTasks` only if no valid saved data exists in storage.
- Safely catches parsing errors in JSON to prevent application crashes.
- Automatically synchronizes updates to storage whenever state values mutate.
- Never overwrites existing user data upon browser refresh.

---

## 6. Responsive Design Specifications

The application layout has been tested and verified across key viewport tiers:

- **Desktop (1440px × 1000px):**
  - Permanent 260px sidebar and full main container.
  - 4-column horizontal statistics grid.
  - Multi-column task grid with hover interactions.
- **Tablet (768px):**
  - 2-column statistics grid.
  - Responsive reflow of filter controls and search bar.
  - Off-canvas collapsible sidebar with touch-friendly menu toggle.
- **Mobile (390px × 1128px):**
  - Single-column stacked cards and metrics.
  - Slide-in mobile navigation drawer with backdrop overlay.
  - Touch targets calibrated to a minimum 44px for accessibility.
  - Modal dialogs scaled smoothly to 100% viewport width without horizontal scrollbars.

---

## 7. Accessibility (a11y) Features

- **Semantic HTML5:** `<header>`, `<aside>`, `<main>`, `<section>`, `<article>`, `<nav>`.
- **Keyboard Navigation:** Full support for `Tab`, `Enter`, `Escape` (closes modals), and arrow keys (navigates carousel).
- **ARIA Attributes:** Accessible names, `role="dialog"`, `role="alertdialog"`, `aria-modal="true"`, `aria-live="polite"`, `aria-expanded`, and `.sr-only` labels for icon buttons.
- **Color Contrast:** All badges, text, and interactive elements adhere to WCAG 2.1 AA standards.
- **Focus Rings:** Distinct `:focus-visible` indicators for keyboard accessibility.

---

## 8. Verification & Testing Checklist

The following 20 scenarios have been systematically verified:

| # | Test Scenario | Status |
|---|---|---|
| 1 | Application starts with at least six realistic tasks | Passed (7 seed tasks) |
| 2 | Create a task successfully with form validation | Passed |
| 3 | Reject empty and whitespace-only task titles | Passed |
| 4 | Edit an existing task, pre-filling and preserving IDs | Passed |
| 5 | Delete task after confirmation dialog prompt | Passed |
| 6 | Cancel task deletion without data loss | Passed |
| 7 | Inline and modal status changes reflect immediately | Passed |
| 8 | Case-insensitive title and category search | Passed |
| 9 | Filter tasks by status tab with dynamic counters | Passed |
| 10 | Filter tasks by priority dropdown | Passed |
| 11 | Combined multi-criteria search and filtering | Passed |
| 12 | Sort tasks across all 6 sorting options | Passed |
| 13 | Automated overdue detection (`dueDate < today` && not completed) | Passed |
| 14 | Dynamic recalculation of stat cards and progress bar | Passed |
| 15 | Page refresh preserves task modifications in `localStorage` | Passed |
| 16 | Dark and Light mode toggle and persistence | Passed |
| 17 | Focus Notes carousel navigation, looping, and keyboard arrows | Passed |
| 18 | Empty state messages and one-click reset filter action | Passed |
| 19 | Responsive rendering on 390px, 768px, and 1440px viewports | Passed |
| 20 | Zero linter warnings/errors and successful production build | Passed (0 errors, 0 warnings) |

---

## 9. Local Development Instructions

### Prerequisites
- Node.js (v18+ recommended, tested on Node v24)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/focusboard.git

# Navigate into the project folder
cd focusboard

# Install dependencies
npm install
```

### Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Lint Code
```bash
npm run lint
```

### Production Build
```bash
npm run build
```
The optimized production bundle will be output to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 10. Deployment Guide

### Deploying to Vercel
1. Push your repository to GitHub.
2. Sign in to [Vercel](https://vercel.com).
3. Click **Add New** > **Project** and import your GitHub repository.
4. Framework Preset will be automatically detected as **Vite**.
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. Click **Deploy**.

---

## 11. License

MIT License. Designed and engineered for recruitment evaluation.
