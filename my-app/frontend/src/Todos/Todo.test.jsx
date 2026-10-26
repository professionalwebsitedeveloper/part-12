import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import Todo from './Todo'

describe('Todo', () => {
  it('renders a not done todo', () => {
    const todo = { text: 'A todo', done: false }
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)

    const todoCheck = screen.getByText(todo.text, { exact: false })
    const doneCheck = screen.getByText(
      todo.done ? 'This todo is done' : 'This todo is not done',
      { exact: false }
    )

    expect(todoCheck).toBeDefined()
    expect(doneCheck).toBeDefined()
  })

  it('renders a done todo', () => {
    const todo = { text: 'A done todo', done: true }
    render(<Todo todo={todo} deleteTodo={() => {}} completeTodo={() => {}} />)

    const todoCheck = screen.getByText(todo.text, { exact: false })
    const doneCheck = screen.getByText('This todo is done', { exact: false })

    expect(todoCheck).toBeDefined()
    expect(doneCheck).toBeDefined()
  })
})