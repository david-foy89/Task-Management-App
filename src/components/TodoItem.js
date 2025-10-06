import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toggleTodo, deleteTodo, editTodo } from '../store/todosSlice'

export default function TodoItem({ todo }) {
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(todo.text)

  function save() {
    const t = value.trim()
    if (!t) return
    dispatch(editTodo({ id: todo.id, text: t }))
    setEditing(false)
  }

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo({ id: todo.id }))} />

      {editing ? (
        <div className="edit-row">
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={save}>Save</button>
          <button onClick={() => { setEditing(false); setValue(todo.text); }}>Cancel</button>
        </div>
      ) : (
        <>
          <span className="text" onDoubleClick={() => setEditing(true)}>{todo.text}</span>
          <div className="actions">
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => dispatch(deleteTodo({ id: todo.id }))}>Delete</button>
          </div>
        </>
      )}
    </li>
  )
}
