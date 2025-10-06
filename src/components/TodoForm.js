import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from '../store/todosSlice'
import { v4 as uuidv4 } from 'uuid'

export default function TodoForm() {
  const [text, setText] = useState('')
  const dispatch = useDispatch()

  function handleSubmit(e) {
    e.preventDefault()
    const t = text.trim()
    if (!t) return
    dispatch(addTodo({ id: uuidv4(), text: t }))
    setText('')
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="What needs to be done?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        aria-label="New todo"
      />
      <button type="submit">Add</button>
    </form>
  )
}
