import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'pp_admin_questions'

const DEFAULT_QUESTIONS = [
  { id: 'wage',      issue: 'Economy',        text: 'The minimum wage should be raised, even at the risk of higher prices.', active: true },
  { id: 'college',   issue: 'Education',      text: 'Free college and free meals in public schools for everyone.', active: true },
  { id: 'mining',    issue: 'Environment',    text: 'Pause all new large-scale mining to protect the environment.', active: true },
  { id: 'transport', issue: 'Transportation', text: 'Prioritize public transport — trains and buses — over new highways.', active: true },
  { id: 'health',    issue: 'Health',         text: 'More funding for public hospitals, even if other projects are reduced.', active: true },
  { id: 'divorce',   issue: 'Rights',         text: 'Support the legalization of divorce in the Philippines.', active: false },
]

const DeleteIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

function loadQuestions() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch (e) { /* ignore */ }
  return DEFAULT_QUESTIONS
}

function QuestionsTab() {
  const [questions, setQuestions] = useState(loadQuestions)

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(questions)) } catch (e) { /* ignore */ }
  }, [questions])

  const update = (id, patch) =>
    setQuestions((qs) => qs.map((q) => (q.id === id ? { ...q, ...patch } : q)))
  const remove = (id) => setQuestions((qs) => qs.filter((q) => q.id !== id))
  const add = () =>
    setQuestions((qs) => [...qs, { id: `q${Date.now()}`, issue: 'New issue', text: '', active: true }])

  const activeCount = questions.filter((q) => q.active).length

  return (
    <div>
      <div className="admin-toolbar">
        <p className="admin-toolbar__note">
          {questions.length} questions · {activeCount} active. Changes are saved automatically.
        </p>
        <button className="btn btn--primary btn--sm" onClick={add}>+ Add question</button>
      </div>

      <div className="q-list">
        {questions.map((q, i) => (
          <div className="q-card" key={q.id}>
            <div className="q-head">
              <span className="q-num">{i + 1}</span>
              <input
                className="q-issue"
                value={q.issue}
                placeholder="Issue"
                onChange={(e) => update(q.id, { issue: e.target.value })}
              />
              <div className="q-head__spacer" />
              <button
                className={`q-toggle ${q.active ? 'q-toggle--on' : 'q-toggle--off'}`}
                onClick={() => update(q.id, { active: !q.active })}
              >
                {q.active ? '● Active' : '○ Off'}
              </button>
              <button className="q-delete" onClick={() => remove(q.id)} aria-label="Delete question">
                <DeleteIcon />
              </button>
            </div>
            <input
              className="q-text"
              value={q.text}
              placeholder="Write the question here…"
              onChange={(e) => update(q.id, { text: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionsTab
