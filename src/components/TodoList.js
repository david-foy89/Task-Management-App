import React from 'react'
import TodoItem from './TodoItem'

export default function TodoList({ todos, filter }) {
  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  if (!filtered.length) return <p className="empty">No tasks to show</p>

  return (
    <ul className="todo-list">
      {filtered.map(t => <TodoItem key={t.id} todo={t} />)}
    </ul>
  )
}
