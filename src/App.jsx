import { useState, useEffect } from 'react'
import TodoForm from './components/TodoForm'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import TodoFilters from './components/TodoFilters'
import TodoSearch from './components/TodoSearch'

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : []
  })
  const [filter, setFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date') // 'date', 'priority', 'dueDate'

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const addTodo = (text, category, priority, dueDate) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text, 
      completed: false,
      category,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
      completedAt: null,
      notes: ''
    }])
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { 
        ...todo, 
        completed: !todo.completed,
        completedAt: !todo.completed ? new Date().toISOString() : null
      } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, ...updates } : todo
    ))
  }

  const filteredAndSortedTodos = () => {
    let filtered = todos.filter(todo => {
      const matchesFilter = filter === 'all' || 
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'due-soon' && todo.dueDate && new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000))
      
      const matchesCategory = categoryFilter === 'all' || todo.category === categoryFilter
      
      const matchesSearch = todo.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        todo.notes.toLowerCase().includes(searchQuery.toLowerCase())

      return matchesFilter && matchesCategory && matchesSearch
    })

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 0, medium: 1, low: 2 }
          return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'dueDate':
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        default: // 'date'
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden p-4 sm:p-8 border border-gray-700">
          <h1 className="text-3xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-gradient">
            Enhanced Todo List
          </h1>
          <TodoStats todos={todos} />
          <div className="mb-6 space-y-4">
            <TodoSearch 
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
            />
          </div>
          <TodoForm onAdd={addTodo} />
          <TodoList 
            todos={filteredAndSortedTodos()}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </div>
      </div>
    </div>
  )
}

export default App