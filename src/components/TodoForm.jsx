import React, { useState } from 'react'
import { categories, priorities } from '../constants'

function TodoForm({ onAdd }) {
  const [input, setInput] = useState('')
  const [category, setCategory] = useState('personal')
  const [priority, setPriority] = useState('medium')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    onAdd(input, category, priority, dueDate || null)
    setInput('')
    setDueDate('')
  }

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = new Date().toISOString().split('T')[0]

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 p-3 border border-gray-700 rounded-xl bg-gray-900/50 backdrop-blur-sm 
                   focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                   placeholder:text-gray-500 text-gray-200"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl
                   hover:from-purple-600 hover:to-pink-600 transform transition-all duration-200
                   active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                   focus:ring-offset-gray-800 shadow-md hover:shadow-lg whitespace-nowrap"
        >
          Add Task
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-400 text-sm mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {priorities.map(pri => (
              <option key={pri.value} value={pri.value}>{pri.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-400 text-sm mb-2">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            min={minDate}
            className="w-full p-2 rounded-lg bg-gray-900/50 border border-gray-700 text-gray-200
                     focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </form>
  )
}

export default TodoForm