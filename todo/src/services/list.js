async function getTodos() {
    const data = await fetch("http://localhost:5800/todos")
    return await data.json()
}

async function setTodos(todoName, complete) {
    // console.log("Todos in list.js is: ", todoName, complete)
    const data = await fetch("http://localhost:5800/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todoName: todoName, complete: complete })
    })
    return await data.json()
}

async function updateTodo(id, updatedTodo) {
    const data = await fetch(`http://localhost:5800/todos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTodo)
    })
    return await data.json()
}

async function deleteTodo(id) {
    const data = await fetch(`http://localhost:5800/todos/${id}`, {
        method: "DELETE"
    })
    return await data.json()
}

export {getTodos, setTodos, updateTodo, deleteTodo}