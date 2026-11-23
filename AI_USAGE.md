# AI Usage Disclosure & Engineering Log

In alignment with recruitment assignment requirements and transparent engineering practices, this document outlines how AI tools were utilized during the design, development, and testing of **FocusBoard**.

---

## 1. AI Tools Utilized

- **Primary AI Assistant:** Google Antigravity Agentic Assistant
- **Foundation Model:** Gemini 3.8 Flash (High)
- **Role:** Senior Frontend Developer & UI/UX Engineering Co-pilot

---

## 2. AI-Assisted Areas

### A. Architectural Scaffolding & Component Hierarchy
- Assisted in laying out the component breakdown adhering to the single responsibility principle.
- Formulated the reusable modal abstractions (`TaskForm.jsx`, `ConfirmDialog.jsx`) and derived state calculation pipeline.

### B. Custom CSS Design System
- Generated semantic CSS custom property definitions (color tokens, shadows, border radii, and transition curves).
- Designed modern SaaS typography and component layouts modeled after premium productivity applications (such as Linear and Notion).
- Structured media query breakpoints (`1024px`, `768px`, and `480px`) to guarantee pixel-accurate responsive layouts on 390px, 768px, and 1440px viewports without third-party frameworks.

### C. State Management & Persistence
- Authored the custom `useLocalStorage` hook with error boundary handling for invalid JSON, preventing edge-case application crashes.
- Implemented memoized filtering and multi-attribute sorting routines using `useMemo`.

### D. Accessibility & Interaction Design
- Implemented keyboard navigation support for the Focus Notes carousel (`ArrowLeft`, `ArrowRight`, `Tab`, `Enter`).
- Ensured ARIA compliance for modals (`role="dialog"`, `aria-modal="true"`, focus trapping) and alert dialogs.

---

## 3. Representative Prompts

Below are illustrative prompts representative of the engineering process:

1. **State Synchronization & Persistence:**
   > *"Implement a robust `useLocalStorage` hook in React that initializes safely, handles JSON parse errors gracefully, updates on dependency changes, and avoids wiping existing keys."*

2. **Responsive CSS Design System:**
   > *"Create a pure CSS stylesheet with CSS variables supporting light and dark modes, high-contrast badges for task priorities and statuses, smooth modal animations, and responsive media queries for 390px mobile, 768px tablet, and 1440px desktop."*

3. **Carousel with Circular Looping:**
   > *"Build an accessible 3-slide productivity carousel with keyboard arrow keys, looping next/prev buttons, active indicator dots, and auto-rotation with hover pause."*

4. **Multi-criteria Filtering & Sorting:**
   > *"Write a memoized filtering pipeline that simultaneously handles partial keyword search on title/category, status filter tabs, priority select dropdown, and 6 sorting configurations."*

---

## 4. Code Suggestions Reviewed, Refined, and Corrected

Human review and automated linter verification ensured high code standards throughout the build:

1. **React 19 Impure Render Warning Resolution:**
   - *Initial AI generation:* Calculated `new Date().toLocaleDateString()` inside `Header.jsx` during render/`useMemo`.
   - *Review & Correction:* Flagged by `oxlint` purity rules (`react(purity)`). Resolved by computing date at the module scope as an immutable session value.

2. **Synchronous `setState` in `useEffect` Mitigation:**
   - *Initial AI generation:* In `TaskForm.jsx`, form state was populated inside a `useEffect` when `initialTask` changed.
   - *Review & Correction:* Flagged by React Compiler (`react(set-state-in-effect)`). Resolved by keying the component dynamically (`key={editingTask ? editingTask.id : 'new'}`) and initializing `useState` directly via lazy initializer.

3. **Dead Code & Unused Imports Cleanup:**
   - Cleaned up unused icons (`Clock`, `CheckCircle2`, `Tag`, `Calendar`) across multiple components to minimize bundle footprint.
   - Removed unused template files (`src/App.css`).

4. **Overdue Task Calculation Logic:**
   - Audited the overdue check to ensure completed tasks due in the past are **never** flagged as overdue, honoring the exact business requirement:
     ```javascript
     export function isTaskOverdue(dueDate, status) {
       if (!dueDate || status === 'Completed') return false;
       return dueDate < getTodayString();
     }
     ```

---

## 5. Summary Conclusion

The AI system served as an accelerator for drafting boilerplate, refining accessible UI patterns, and establishing a cohesive design system. All code was verified through strict linting (`oxlint`) and production compilation (`vite build`), resulting in zero runtime errors, zero linter warnings, and a fully functional application.
