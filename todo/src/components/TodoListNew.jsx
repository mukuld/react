import React, { useState } from 'react'
import TodoNew from './TodoNew'

export default function TodoList({ todoItems, toggleTodo, handleDelete }) {
    return (
      <div>
        {todoItems.map(todo => (
          <TodoNew 
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          handleDelete={handleDelete}
          />
        ))
        }
      </div>
  )
}
