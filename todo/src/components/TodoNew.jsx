import React from 'react'

export default function TodoNew({ todo, toggleTodo, handleDelete }) {
  function handleTodoClick() {
    toggleTodo(todo.id)
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleTodoClick} />
        {todo.todoName}
      </label>
      <button className="clearall" onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  )
}
