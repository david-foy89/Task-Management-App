import React, { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', comments: '' })
  const [submitted, setSubmitted] = useState(null)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(form)
    // In a real app we'd post to an API
  }

  return (
    <section className="contact-page">
      <h2>Contact</h2>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="row">
          <label>First name
            <input name="firstName" value={form.firstName} onChange={handleChange} />
          </label>
          <label>Last name
            <input name="lastName" value={form.lastName} onChange={handleChange} />
          </label>
        </div>

        <label>Email
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </label>

        <label>Comments
          <textarea name="comments" value={form.comments} onChange={handleChange} />
        </label>

        <button type="submit">Send</button>
      </form>

      {submitted && (
        <div className="submitted">
          <h3>Submitted</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}
