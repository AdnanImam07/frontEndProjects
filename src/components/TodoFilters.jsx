import React from 'react'
import { categories } from '../constants'

function TodoFilters({ filter, onFilterChange, categoryFilter, onCategoryFilterChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex-1">
        <select
          value={filter}
          onChange={(e) => onFilterChange(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Tasks</option>
          <option value="active">Active Tasks</option>
          <option value="completed">Completed Tasks</option>
          <option value="due-soon">Due Soon (24h)</option>
        </select>
      </div>
      <div className="flex-1">
        <select
          value={categoryFilter}
          onChange={(e) => onCategoryFilterChange(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-900/50 border border-gray-700 text-gray-200
                   focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default TodoFilters