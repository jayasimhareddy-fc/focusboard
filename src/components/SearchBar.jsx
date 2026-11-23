import React from 'react';
import { Search, X } from 'lucide-react';

/**
 * Accessible SearchBar component with instant search and clear button
 */
export default function SearchBar({
  searchQuery,
  onSearchChange,
  onClear,
}) {
  return (
    <div className="search-bar">
      <div className="search-bar__inner">
        <Search size={18} className="search-bar__icon" aria-hidden="true" />
        <label htmlFor="task-search-input" className="sr-only">
          Search tasks by title or category
        </label>
        <input
          id="task-search-input"
          type="text"
          className="search-bar__input"
          placeholder="Search tasks by title or category..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button
            type="button"
            className="search-bar__clear-btn"
            onClick={onClear}
            aria-label="Clear search query"
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
