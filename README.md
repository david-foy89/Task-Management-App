# Task Management App

Author: David Foy

Overview

This is a small task (to-do) management web app built as a Create React App project. It supports full CRUD for tasks, localStorage persistence, filters (All / Active / Completed), task editing, and a contact form rendered as a controlled component.

How to run (Windows PowerShell)

```powershell
cd "c:\Users\Thebe\OneDrive\Desktop\gitrepo\QuickStart\Task-Management-App"
npm install
npm start
```

Then open http://localhost:3000

Technologies used

- React (Create React App)
- Redux Toolkit for state management
- React Router for navigation
- CSS for styling
- localStorage for persistence

Features / What it does

- Add new todos
- Edit todos
- Mark todos complete/incomplete
- Delete todos
- Filter todos (All / Active / Completed)
- Contact form with first name, last name, email and comments (controlled component)
- Simple stats sidebar

User stories

1. As a busy person I want to add tasks quickly so I can remember what to do later.
2. As a user I want to mark tasks complete so I can track progress and hide finished work.
3. As a customer I want to contact the site owner with questions by filling a contact form.

Wireframes (text sketches)

1. Todos view ("/todos")

---

## | Top nav: [Task Manager] | Todos | Contact |

| Left column (main) | Right column |
| - Add form (input + Add button) | - Stats |
| - Filters: All / Active / Completed| - Quick actions |
| - Todo list (items) | |

---

2. Contact view ("/contact")

---

## | Top nav: [Task Manager] | Todos | Contact |

| Contact form: |
| [First name] [Last name] |
| [Email] |
| [Comments textarea] |
| [Send button] |

---

State tree

{
todos: {
items: [
{ id, text, completed }
]
}
// Contact form is local component state inside ContactPage
}

Components (container / presentational)

- App (container) - top-level routes and nav
- TodosPage (container) - connects to Redux for todos, holds filter state
- TodoForm (presentational with local state) - new-todo input and submit
- TodoList (presentational) - renders list based on filter
- TodoItem (presentational) - single item, edit/delete/toggle
- ContactPage (presentational but manages local form state) - controlled form

Ideas for future improvements

1. Add user authentication and per-user todo lists
2. Synchronize with a backend API so multiple devices stay in sync
3. Add due dates, reminders and categorization/tags
4. Improve accessibility and keyboard shortcuts

Notes

- This repo is intended as a small demo for a course assignment. The app persists todos to localStorage so they remain between reloads.
