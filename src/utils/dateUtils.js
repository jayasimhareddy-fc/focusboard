/**
 * Date utility helpers for FocusBoard
 */

/**
 * Get today's local date as YYYY-MM-DD
 */
export function getTodayString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format date string (YYYY-MM-DD) to readable format (e.g., "Nov 25, 2026")
 */
export function formatReadableDate(dateString) {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Check if a task is overdue:
 * Due date is before today AND status is not "Completed"
 */
export function isTaskOverdue(dueDate, status) {
  if (!dueDate || status === 'Completed') return false;
  const today = getTodayString();
  return dueDate < today;
}

/**
 * Helper to compute relative offset from today for sample task seeds
 */
export function getRelativeDateString(daysOffset) {
  const d = new Date();
  d.setDate(d.getDate() + daysOffset);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
