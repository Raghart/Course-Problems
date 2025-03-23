import { useEffect, useState } from 'react';
import axios from '../util/apiClient';
import List from './List';
import Form from './Form';

const TodoView = () => {
  const [todos, setTodos] = useState([])
  const baseTodoURL = import.meta.env.VITE_BACKEND_URL;
  console.log(`URL: ${baseTodoURL}`)

  const refreshTodos = async () => {
    const { data } = await axios.get(baseTodoURL);
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post(baseTodoURL, todo)
    setTodos([...todos, data])
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`${baseTodoURL}/${todo._id}`);
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`${baseTodoURL}/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
    </>
  )
}

export default TodoView
