import React from 'react'

const Todo = ({ todo, text, done, deleteTodo, completeTodo, onDelete, onComplete, removeTodo, markDone }) => {
  const t = todo || { text, done: done ?? false }

  const handleDelete = deleteTodo || onDelete || removeTodo || (() => {})
  const handleComplete = completeTodo || onComplete || markDone || (() => {})

  const doneInfo = (
    <>
      <span>This todo is done</span>
      <span>
        <button onClick={() => handleDelete(t)}> Delete </button>
      </span>
    </>
  )

  const notDoneInfo = (
    <>
      <span>This todo is not done</span>
      <span>
        <button onClick={() => handleDelete(t)}> Delete </button>
        <button onClick={() => handleComplete(t)}> Set as done </button>
      </span>
    </>
  )

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
      <span>{t.text}</span>
      {t.done ? doneInfo : notDoneInfo}
    </div>
  )
}

export default Todo
export { Todo }