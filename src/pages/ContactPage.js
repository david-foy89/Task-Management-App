import React, { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', comments: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus({ state: 'submitting', message: 'Sending...' })

    try {
      const res = await fetch('https://formspree.io/f/xldwnzjv', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          comments: form.comments
        })
      })

      if (res.ok) {
        setStatus({ state: 'success', message: 'Thanks — your message was sent.' })
        setForm({ firstName: '', lastName: '', email: '', comments: '' })
      } else {
        const data = await res.json().catch(() => null)
        const err = (data && data.error) ? data.error : `Request failed with status ${res.status}`
        setStatus({ state: 'error', message: err })
      }
    } catch (err) {
      setStatus({ state: 'error', message: err.message || 'Network error' })
    }
  }

  return (
    <section className="contact-page">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <label>First name
            <input name="firstName" value={form.firstName} onChange={handleChange} required />
          </label>
          <label>Last name
            <input name="lastName" value={form.lastName} onChange={handleChange} required />
          </label>
        </div>

        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} required />
        </label>

        <label>Comments
          <textarea name="comments" value={form.comments} onChange={handleChange} required />
        </label>

        <button type="submit" disabled={status.state === 'submitting'}>
          {status.state === 'submitting' ? 'Sending...' : 'Send'}
        </button>
      </form>

      {status.state === 'success' && (
        <div className="submitted success">
          <h3>Submitted</h3>
          <p>{status.message}</p>
        </div>
      )}

      {status.state === 'error' && (
        <div className="submitted error">
          <h3>Submission error</h3>
          <p>{status.message}</p>
        </div>
      )}
    </section>
  )
}
