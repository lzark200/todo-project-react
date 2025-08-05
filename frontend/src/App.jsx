import { useState } from 'react'
import './App.css'
import {CreateTodo} from './components/CreateTodo'
import {Todos} from './components/Todos'


function App() {
  const [todos , setTodos] = useState([])

  fetch("http://localhost:8001/get-todo")
  .then(async (response)=>{
    const json = await response.json() ; 
    setTodos(json.todos)
  })

  return (
    <>
     <CreateTodo></CreateTodo>
     <Todos todos = {todos}></Todos>
    </>
  )
}

export default App
