import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import TodoList from '../Todos/List'

describe('Todo', () => {
  let todo

  beforeEach(() => {
    todo = {
      text: 'A todo',
      done: false,
    }
  })

  it('renders todo', () => {
    const { container } = render(
      <TodoList
        todos={[todo]}
        deleteTodo={() => null}
        completeTodo={() => null}
      />
    )

    const todoCheck = screen.getByText(todo.text, { exact: false })
    const doneCheck = screen.getByText(
      todo.done ? 'This todo is done' : 'This todo is not done',
      { exact: false }
    )

    expect(todoCheck).toBeDefined()
    expect(doneCheck).toBeDefined()
  })
})