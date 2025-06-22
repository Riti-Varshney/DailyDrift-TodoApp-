import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import docxImg from "./docx.png"
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { FcTodoList } from "react-icons/fc";


const TaskComponent = () => {
     const [todo, setTodo] = useState(''); //inputText
    const [todos, setTodos] = useState([]); //Array that Holds all todos
    const [showFinished, setShowFinished] = useState(true)
     //for loaadding the todos
    useEffect(() => {
        let todoString=localStorage.getItem("todos")
        if(todoString){
        let todos=JSON.parse(localStorage.getItem("todos"))
        setTodos(todos)
    }
    }, [])
    // localStorage
    const saveTasks=()=>
    {
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    const toggleFinished=(e) => {
      setShowFinished(!showFinished)
    }
    
    const handleEdit = (e, id) => {
        let task = todos.filter(item => {
            return item.id === id
        })
        setTodo(task[0].todo)
        let newTodos=todos.filter(item=>
            {
                return item.id!==id
            })
            setTodos(newTodos)
            saveTasks()
    }
    const handleDelete = (e, id) => {
        const confirmed = window.confirm("Are You Sure You Want To Delete This Task ?");
        if (confirmed) {
            let newTodos = todos.filter(item => {
                return item.id !== id;
            })
            setTodos(newTodos)
            saveTasks()
        }
    }
    const handleAdd = () => {
        setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
        setTodo(" ")
        console.log(todos)
        saveTasks()
    }

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => {
            return item.id === id;
        })
        let newTodo = [...todos];
        newTodo[index].isCompleted = !newTodo[index].isCompleted;
        setTodos(newTodo)
        saveTasks()
    }
    const handleChange = (e) => { setTodo(e.target.value) }
    
    return (
        <div className="container mx-auto my-3 rounded-xl p-3 bg-amber-200 min-h-[80vh]" style={{ boxShadow: '0px -4px 7px -2px rgba(0,0,0,0.75)' }}>
            <div className="addTodo my-5">
                <div className='w-auto flex flex-col items-center p-1 rounded-lg custom-shadow'>
                    <div className='text-2xl flex font-bold text-amber-800 mb-1 gap-1'>  <div className="logo relative top-1.5"><FcTodoList /></div>Todo App</div>
                    <h3 className='text-amber-800'>You Personal Notepad For Tasks</h3>
                </div>
                <input onChange={handleChange} value={todo}
                    type="text" className="flex-grow w-9/10 border border-amber-800 px-1 p-1 mt-2 focus:outline-none focus:ring-1 focus:ring-white-500 bg-amber-50 rounded-lg" />
                <button onClick={handleAdd} disabled={todo.length===0}
                    className='bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-1 m-1 rounded-md shadow disabled:bg-amber-900'>Add</button>
            </div>
            <input onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show Finished Tasks
             <div className='h-[1px] bg-black opacity-15 w-full mb-3'></div>


            <div className='text-xl font-bold custom-bg p-3 rounded-lg text-amber-900 mb-2' >📝 Your Todos</div>

            <div className='todos bg-amber-200 text-amber-50 p-1 m-1 custom-shadow-two'>
                {todos.length === 0 && <div className='flex flex-col items-center justify-center m-10'>
                    <div className="imageOne"><img src={docxImg} alt="description" className='w-20' /></div>
                    <div className="textOne text-lg font-semibold text-gray-800 mb-1">No Tasks Yet</div>
                    <div className="textTwo text-sm text-gray-600">Add your first task above</div>
                </div>}
                {todos.map(item => {
                    return (showFinished || !item.isCompleted)&&<div className="todo flex justify-between px-2 m-3 border-1" key={item.id}>
                        <div className="leftPart flex text-amber-950 gap-2">
                            <input onChange={handleCheckbox} type="checkbox" className='mr-1 ' name={item.id} checked={item.isCompleted} />
                            <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div></div>

                        <div className="buttons flex h-full">
                            <button onClick={(e) => { handleEdit(e, item.id)}}
                                className='bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2 m-1 rounded-md shadow'><FaEdit /></button>
                            <button onClick={(e) => { handleDelete(e, item.id) }}
                                className='bg-amber-600 hover:bg-amber-700 text-white font-semibold px-3 py-2 m-1 rounded-md shadow'><FaDeleteLeft /></button>
                        </div>
                    </div>
                })}
            </div>

        </div>
    )
}

export default TaskComponent
