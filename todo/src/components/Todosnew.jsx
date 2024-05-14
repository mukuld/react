import React, { useEffect, useState, useRef } from 'react'
import "../assets/base.css"
import { getTodos, setTodos, updateTodo, deleteTodo } from '../services/list'
import TodoListNew from './TodoListNew'

export default function Todosnew() {
    const [alert, setAlert] = useState(false)
    const [todoItems, setTodoItems] = useState([])
    const [todoInput, setTodoInput] = useState("")
    const mounted = useRef(true)
    
    useEffect(() => {
        mounted.current = true
        if(todoItems.length && !alert) {
            return
        }
        const fetchData = async () => {
            try {
                const todos = await getTodos();
                if(mounted) {
                    setTodoItems(todos);
                }
            } catch (error) {
                console.error("Error fetching todos:", error)
            }
        }
        fetchData()

        return () => {
            mounted.current = false
        }
    },[alert, todoItems])

    useEffect(() => {
        if(alert) {
            setTimeout(() => {
                if(mounted.current) {
                    setAlert(false)
                }
            }, 1000)
        }
    }, [alert])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newTodo = {
            todoName: todoInput,
            complete: false
        }

        try {
            await setTodos(newTodo.todoName, newTodo.complete)
            if(mounted.current) {
                setTodoInput("")
                setAlert(true)
            }
        } catch(error) {
            console.error("Error adding new Todo:", error)
        }
    }

    const toggleTodo = async (id) => {
        const todoToUpdate = todoItems.find(todo => todo.id == id)
        const updatedTodo = {...todoToUpdate, complete: !todoToUpdate.complete}

        try {
            await updateTodo(id, updatedTodo)
            if(mounted.current) {
                const updatedItems = todoItems.map(todo => {
                    if(todo.id === id) {
                        return updatedTodo
                    }
                    return todo
                })
                setTodoItems(updatedItems)
            }
        } catch(error) {
            console.error("Error Toggling Todo", error)
        }
    }

    // function toggleTodo(id){
    //     const newTodos = [...todoItems]
    //     const todo = newTodos.find(todo => todo.id === id)
    //     todo.complete = !todo.complete
    //     setTodos(newTodos)
    //   }

    const handleDelete = async (id) => {
        try {
            await deleteTodo(id)
            if(mounted.current) {
                setTodoItems(todoItems.filter(todo => todo.id !== id))
            }
        } catch(error) {
            console.error("Error deleting todo", error)
        }
    }

    // function handleClearTodos() {
    //     const newTodos = todoItems.filter(todo => !todo.complete)
    //     setTodoItems(newTodos)
    //   }

  return (
    <div className="main-container">
        <div className="container">
        <h2>My new things to do</h2>
        <TodoListNew 
            todoItems = {todoItems}
            toggleTodo = {toggleTodo}
            handleDelete = {handleDelete} />
        {alert && <h2>New thing to do added...</h2>}
        {/* <form onSubmit={handleSubmit}> */}
        <form>
            <label>
                <p>Add new thing to do</p>
                <input type="text" onChange={event => setTodoInput(event.target.value)} value={todoInput} />
            </label>
            <div>
            <button className="submit-button" onClick={handleSubmit}>Add Todo</button>
            {/* <button className="clearall" onClick={handleClearTodos}>Clear completed Todos</button> */}
            {/* <button className="clearall">Clear completed Todos</button> */}
            </div>
        </form>
        </div>
    </div>
  )
}
