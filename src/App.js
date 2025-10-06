import React from 'react'
import { Routes, Route, NavLink, Navigate } from 'react-router-dom'
import TodosPage from './pages/TodosPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div className="app-root">
      <header className="top-nav">
        <div className="brand">Task Manager</div>
        <nav className="nav-links">
          <NavLink to="/todos" className={({isActive}) => isActive ? 'active' : ''}>Todos</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<div style={{padding:20}}>Page not found</div>} />
        </Routes>
      </main>

      <footer className="footer">Built with React + Redux Toolkit</footer>
    </div>
  )
}
