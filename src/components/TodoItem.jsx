import React, { useState } from 'react'
import { priorities } from '../constants'

function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false)
  const [notes, setNotes] = useState(todo.notes)

  const priorityColor = {
    high: 'bg-red-500/20 border-red-500/50',
    medium: 'bg-yellow-500/20 border-yellow-500/50',
    low: 'bg-green-500/20 border-green-500/50'
  }

  const categoryIcon = {
    personal: '👤',
    work: '💼',
    shopping: '🛒',
    health: '❤️',
    education: '📚'
  }

  const handleNotesUpdate = () => {
    onUpdate(todo.id, { notes })
    setIsEditing(false)
  }

  const isDueSoon = todo.dueDate && new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000)
  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed

  return (
    <div className={`group space-y-2 p-4 rounded-xl shadow-sm
                    transform transition-all duration-200 hover:shadow-md border
                    ${todo.completed ? 'opacity-75 bg-gray-900/50' : priorityColor[todo.priority]}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded-md border-gray-600 text-purple-500 bg-gray-700
                   focus:ring-purple-500 cursor-pointer transition-all duration-200"
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{categoryIcon[todo.category]}</span>
            <span className={`text-gray-200 transition-all duration-200
                          ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            {isDueSoon && !todo.completed && (
              <span className="text-yellow-500 text-sm">Due Soon!</span>
            )}
            {isOverdue && (
              <span className="text-red-500 text-sm">Overdue!</span>
            )}
          </div>
          <div className="text-xs text-gray-500 space-x-2">
            <span>Created: {new Date(todo.createdAt).toLocaleDateString()}</span>
            {todo.completedAt && (
              <span>• Completed: {new Date(todo.completedAt).toLocaleDateString()}</span>
            )}
            {todo.dueDate && (
              <span>• Due: {new Date(todo.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
        <select
          value={todo.priority}
          onChange={(e) => onUpdate(todo.id, { priority: e.target.value })}
          className="px-2 py-1 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-300
                   text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {priorities.map(pri => (
            <option key={pri.value} value={pri.value}>{pri.label}</option>
          ))}
        </select>
        <button
          onClick={() => onDelete(todo.id)}
          className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400
                   px-2 py-1 rounded-lg transition-all duration-200 hover:bg-red-900/20"
          aria-label="Delete todo"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {isEditing ? (
        <div className="mt-2 flex gap-2">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes..."
            className="flex-1 p-2 text-sm rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="2"
          />
          <button
            onClick={handleNotesUpdate}
            className="px-3 py-1 bg-purple-500 text-white rounded-lg hover:bg-purple-600
                     transition-colors duration-200"
          >
            Save
          </button>
        </div>
      ) : (
        todo.notes && (
          <div className="mt-2 text-sm text-gray-400 bg-gray-900/30 p-2 rounded-lg">
            {todo.notes}
          </div>
        )
      )}
      
      <button
        onClick={() => setIsEditing(!isEditing)}
        className="text-sm text-gray-400 hover:text-purple-400 transition-colors duration-200"
      >
        {isEditing ? 'Cancel' : (todo.notes ? 'Edit Notes' : 'Add Notes')}
      </button>
    </div>
  )
}

export default TodoItem