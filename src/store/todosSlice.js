import { createSlice } from '@reduxjs/toolkit'

const LS_KEY = 'todos_cra_v1'
const initial = { items: JSON.parse(localStorage.getItem(LS_KEY) || '[]') }

const slice = createSlice({
  name: 'todos',
  initialState: initial,
  reducers: {
    addTodo: (state, action) => {
      state.items.unshift({ id: action.payload.id, text: action.payload.text, completed: false })
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    },
    toggleTodo: (state, action) => {
      const t = state.items.find(i => i.id === action.payload.id)
      if (t) t.completed = !t.completed
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    },
    editTodo: (state, action) => {
      const t = state.items.find(i => i.id === action.payload.id)
      if (t) t.text = action.payload.text
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload.id)
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    },
    clearCompleted: (state) => {
      state.items = state.items.filter(i => !i.completed)
      localStorage.setItem(LS_KEY, JSON.stringify(state.items))
    }
  }
})

export const { addTodo, toggleTodo, editTodo, deleteTodo, clearCompleted } = slice.actions
export default slice.reducer
