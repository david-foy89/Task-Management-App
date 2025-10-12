import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { clearCompleted, setTodos } from '../store/todosSlice'

export default function TodosPage() {
  const todos = useSelector((s) => s.todos.items)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState('all')

  const counts = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length,
  }
  const fileRef = useRef(null)

  function handleExport() {
    const dataStr = JSON.stringify(todos, null, 2)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'todos.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  function handleImportClick() {
    fileRef.current && fileRef.current.click()
  }

  function handleFile(e) {
    const file = e.target.files && e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result)
        if (!Array.isArray(parsed)) throw new Error('Invalid file: expected an array')
        // Basic validation of items
        const ok = parsed.every(item => item && typeof item.id === 'string' && typeof item.text === 'string' && typeof item.completed === 'boolean')
        if (!ok) throw new Error('Invalid todo format')
        if (confirm(`Import ${parsed.length} todos and replace current list? This cannot be undone.`)) {
          dispatch(setTodos(parsed))
        }
      } catch (err) {
        alert('Import failed: ' + (err.message || err))
      }
    }
    reader.readAsText(file)
    // clear input
    e.target.value = ''
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
            <button onClick={handleExport}>Export</button>
            <button onClick={handleImportClick}>Import</button>
            <input ref={fileRef} type="file" accept="application/json" onChange={handleFile} style={{ display: 'none' }} />
          </div>
        </aside>
      </div>
    </section>
  )
}
