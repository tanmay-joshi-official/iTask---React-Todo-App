import { useState, useEffect, useRef } from "react"
import Navbar from "./components/Navbar"
import { v4 as uuidv4 } from 'uuid'
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {

  // Todo added through input tag
  const [todo, settodo] = useState("")

  // Stores all the todos in an array
  const [todos, settodos] = useState([])

  // If input is blank and Save is clicked
  const [error, seterror] = useState("")

  const isFirstRender = useRef(true)

  // Getting data from local storage on first render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
    if (storedTodos) {
      settodos(JSON.parse(storedTodos))
    }
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  const handleAdd = () => {
    if (todo.trim() === "") {
      return seterror("* Please enter a todo first")
    }
    else {
      settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      settodo("")
      seterror("")
    }
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(item => {
      return item.id === id
    })
    settodo(t[0].todo)

    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
  }

  const handleDelete = (e, id) => {
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    settodos(newtodos)
  }

  const handleChange = (e) => {
    settodo(e.target.value)
    if(error){
      seterror("")
    }
  }

  const handleCheckbox = (e) => {
    let id = e.target.name
    let index = todos.findIndex(item => {
      return item.id === id
    })
    let newtodos = [...todos]
    newtodos[index].isCompleted = !newtodos[index].isCompleted
    settodos(newtodos)
  }

  return (
    <>
      <Navbar />
      <div className="flex rounded-lg bg-[#f2e6ff] my-10 mt-28 mx-10 flex-col p-5 items-center md:min-w-max md:w-1/2 w-[90%] justify-self-center">
        <div className="addTodo">
          <h1 className="mx-5 my-3 mb-7 text-2xl font-bold text-center">Add Todo</h1>
          <div className="flex md:flex-row flex-col justify-center gap-3 items-center md:items-start">
            <div>
              <input onChange={handleChange} type="text" value={todo} className="mx-auto p-2 md:w-[30vw] w-[70vw] rounded-lg bg-[#0000000f] border-2 border-[#0000000f]" />
              {error && <div className="mt-5 mx-5 text-red-600 font-medium">{error}</div>}
            </div>
            <div>
              <button onClick={handleAdd} className="bg-purple-700 p-2 rounded-lg text-white text-sm font-medium hover:bg-purple-800 active:bg-purple-900 transition-all w-16  md:mt-1 mt-4">Save</button>
            </div>
          </div>
        </div>
        <h1 className="mx-5 mt-10 mb-7 text-2xl font-bold">Your Todos</h1>
        {todos.length === 0 && <div className="ml-5 my-3">No Todos to display</div>}
        {todos.map(item => {
          return (<div key={item.id} className="yourTodo flex mx-5 my-3 gap-5 items-center self-stretch">
            <div className="flex gap-5 flex-1 justify-start">
              <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} className="cursor-pointer w-4" />
              <div className={`${item.isCompleted ? "line-through font-normal" : ""} break-words flex-1 w-1`}>{item.todo}</div>
            </div>
            <div className="buttons gap-4 flex">
              <span><button onClick={(e) => handleEdit(e, item.id)} className="bg-purple-700 p-2 rounded-lg text-white text-sm font-medium hover:bg-purple-800 active:bg-purple-900 transition-all"><MdEditSquare className="text-base"/></button></span>
              <span><button onClick={(e) => handleDelete(e, item.id)} className="bg-purple-700 p-2 rounded-lg text-white text-sm font-medium hover:bg-purple-800 active:bg-purple-900 transition-all"><MdDelete className="text-base"/></button></span>
            </div>
          </div>
          )
        })}
      </div>
    </>
  )
}

export default App
