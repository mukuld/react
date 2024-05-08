async function getTodos() {
    const data = await fetch("http://localhost:5800/list")
    return await data.json()
}

async function setTodos() {
    const data = await fetch("http://localhost:5800/list", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ todo })
    })
    return await data.json()
}

export {getTodos, setTodos}