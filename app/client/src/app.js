import React, { useState, useEffect } from 'react'

/*
An helper method to call the "todo" apis
*/
const todoApi = async (api, method='GET', params=null) => {
  const opts = {
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    method
  }
  if (method === 'POST') {
    opts.body = JSON.stringify(params)
  }
  const response = await fetch('api/todo/' + api, opts)
  return await response.json()
}

const App = () => {
  const [todos, setTodos] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const todos = await todoApi('list')
        !cancelled && setTodos(todos)
      }
      catch (e) {
        !cancelled && setErrorMessage(e.message)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const submit = async (evt) => {
    evt.preventDefault()
    try {
      const newItem = await todoApi('add', 'POST', {
        name: evt.target.name.value,
        description: evt.target.description.value
      })
      setTodos([...todos, newItem])
    }
    catch (e) {
      setErrorMessage(e.message)
    }
  }

  const remove = async (id) => {
    try {
      await todoApi(id, 'DELETE')
      setTodos(todos.filter(({_id}) => _id !== id))
    }
    catch (e) {
      setErrorMessage(e.message)
    }
  }

  return (
    <div className="App">
      { errorMessage && (
        <div style={{ color: 'red' }}>{ errorMessage }</div>
      )}
      <h2>My todos</h2>
      { todos ? (
        <ul>
        { todos.length > 0 ? todos.map(({ _id, name, description }, idx) => (
          <li key={`todo-${idx}`}><b>{name}</b>: { description || <em>No description</em> } <button onClick={() => remove(_id)}>X</button></li>
        )) : (
          <em>Hoorah! No todo here!</em>
        )}
        </ul>
      ) : (
        <div>loading...</div>
      )}
      <hr/>
      <h4>Add todo</h4>
       <form onSubmit={submit}>
        <label>
          <div>Name</div>
          <input name="name" />
        </label>
        <label>
          <div>Description</div>
          <input name="description" />
        </label>
        <div>
          <button type="submit">ok</button>
        </div>
       </form>
    </div>
  )
}

export default App
