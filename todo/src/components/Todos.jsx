import React, { useState, useRef, useEffect } from 'react'
import TodoList from './TodoList'
import { v4 as uuidv4 } from "uuid"
import "../assets/base.css"

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()
  const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
  
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    // console.log(todos)
  }, [todos])

  useEffect(() => {
    if (storedTodos) setTodos(storedTodos)
  }, [])

  function toggleTodo(id){
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === "") return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = ""
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <div className="main-container">
      <div className="container">

        <TodoList todos={todos} toggleTodo={toggleTodo}/>
        <input ref={todoNameRef} type="text" />
        <div>
          <button className="submit-button" onClick={handleAddTodo}>Add Todo</button>
          <button className="clearall" onClick={handleClearTodos}>Clear completed Todos</button>
        </div>
        <div>{todos.filter(todo => !todo.complete).length} thing(s) left to do today</div>
      </div>
    </div>
  )
}

export default App