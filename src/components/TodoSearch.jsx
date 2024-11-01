import React from 'react'

function TodoSearch({ searchQuery, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="w-full p-3 border border-gray-700 rounded-xl bg-gray-900/50
                   focus:outline-none focus:ring-2 focus:ring-purple-500
                   placeholder:text-gray-500 text-gray-200"
        />
      </div>
      <div className="sm:w-48">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
        </select>
      </div>
    </div>
  )
}

export default TodoSearch