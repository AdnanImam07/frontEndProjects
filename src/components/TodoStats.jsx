import React from 'react'

function TodoStats({ todos }) {
  const total = todos.length
  const completed = todos.filter(t => t.completed).length
  const pending = total - completed
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <div className="text-gray-400 text-sm">Total Tasks</div>
        <div className="text-2xl font-bold text-gray-200">{total}</div>
      </div>
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <div className="text-gray-400 text-sm">Completed</div>
        <div className="text-2xl font-bold text-green-400">{completed}</div>
      </div>
      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
        <div className="text-gray-400 text-sm">Progress</div>
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-purple-400">{progress}%</div>
          <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodoStats