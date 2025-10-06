import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { clearCompleted } from '../store/todosSlice'

export default function TodosPage() {
  const todos = useSelector((s) => s.todos.items)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')

  const counts = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  }

  return (
    <section className="todos-page">
      <div className="side-by-side">
        <div className="left">
          <h2>Todos</h2>
          <TodoForm />
          <div className="filters">
            <button className={filter==='all' ? 'selected':''} onClick={() => setFilter('all')}>All</button>
            <button className={filter==='active' ? 'selected':''} onClick={() => setFilter('active')}>Active</button>
            <button className={filter==='completed' ? 'selected':''} onClick={() => setFilter('completed')}>Completed</button>
          </div>

          <TodoList todos={todos} filter={filter} />

          <div className="list-controls">
            <button onClick={() => dispatch(clearCompleted())}>Clear completed</button>
          </div>
        </div>

        <aside className="right">
          <h3>Stats</h3>
          <p>Total: {counts.total}</p>
          <p>Active: {counts.active}</p>
          <p>Completed: {counts.completed}</p>
          <div className="quick-actions">
            <button onClick={() => alert('Export not implemented (example)')}>Export</button>
            <button onClick={() => alert('Import not implemented (example)')}>Import</button>
          </div>
        </aside>
      </div>
    </section>
  )
}
