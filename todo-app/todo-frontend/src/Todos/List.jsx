import React from 'react'

import Todo from './Todo'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  return (
    <>
      {todos.map((todo, index) => (
        <Todo
          key={todo._id || todo.id || index}
          todo={todo}
          deleteTodo={deleteTodo}
          completeTodo={completeTodo}
        />
      )).reduce((acc, cur, i) => (i === 0 ? [cur] : [...acc, <hr key={`hr-${i}`} />, cur]), [])}
    </>
  )
}

export default TodoList
