import { useState, useEffect } from 'react'
import { FaArrowUp, FaArrowDown, FaTimes } from "react-icons/fa";

const ToDoList = () => {
  const [task, setTask] = useState([])
  const [newTask, setNewTask] = useState("")
  const [homeChecked, setHomeChecked] = useState(false)
  const [workChecked, setWorkChecked] = useState(false)


  useEffect(() => {
    const stored = localStorage.getItem('stored-items');
    console.log(stored)
    if (stored) {
      setTask(JSON.parse(stored));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('stored-items', JSON.stringify(task));
  }, [task]);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== "" && (homeChecked || workChecked)) {
      let category = "";
      if (homeChecked) {
        category = "Home";
      } else if (workChecked) {
        category = "Work";
      }
      setTask(t => [...t, [newTask, category]]);
      setNewTask("");

    } else if(newTask.trim() === "") {
      alert("Please enter a task");
    } else{
      alert("Pls select a category")
    } 
  }

  function deleteTask(index) {
    const updatedTask = task.filter((_, i) => i !== index)
    setTask(updatedTask)
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index - 1]] =
        [updatedTask[index - 1], updatedTask[index]]
      setTask(updatedTask)
    }
  }

  function moveTaskDown(index) {
    if (index < task.length - 1) {
      const updatedTask = [...task];
      [updatedTask[index], updatedTask[index + 1]] =
        [updatedTask[index + 1], updatedTask[index]]
      setTask(updatedTask)
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg">
      <h1 className="text-3xl font-bold py-4 text-gray-800">To Do List</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter a task"
          value={newTask}
          onChange={handleInputChange}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200"
        >
          Add Task
        </button>
      </div>


      <div className="flex gap-6 mb-3">
       <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={homeChecked}
          onChange={() => {
            if(homeChecked){
            setHomeChecked(false);
            } else{
            setHomeChecked(true);
            setWorkChecked(false); 
            }

          }}
          className="w-5 h-5 accent-green-600"
        />
        <span className="text-gray-700">Home</span>
      </label>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={workChecked}
          onChange={() => {
            if(workChecked){
              setWorkChecked(false);
            }
          else{
            setWorkChecked(true);
            setHomeChecked(false); 
          }

          }}
          className="w-5 h-5 accent-green-600"
        />
        <span className="text-gray-700">Work</span>
      </label>
     </div>


      <ol className="py-3 space-y-3">
        {task.filter(taskvalue => {
          if (homeChecked) return taskvalue[1] === "Home";
          if (workChecked) return taskvalue[1] === "Work";
          return true;
        })
        .map((taskvalue, index) =>
          <li
            key={index}
            className="flex items-center bg-gray-200 px-4 py-3 rounded-lg"
          >
              <span className="flex-1 text-gray-700">{taskvalue[0]}</span>
              <span className="w-20 text-center text-sm font-bold text-blue-600">{taskvalue[1]}</span>
            <div className="flex gap-2">
              <button
                onClick={() => deleteTask(task.indexOf(taskvalue))}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center justify-center"
              >
                <FaTimes size={16} />
              </button>
              <button
                onClick={() => moveTaskUp(task.indexOf(taskvalue))}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm flex items-center justify-center"
              >
                <FaArrowUp size={16} />
              </button>
              <button
                onClick={() => moveTaskDown(task.indexOf(taskvalue))}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center justify-center"
              >
                <FaArrowDown size={16} />
              </button>
            </div>
          </li>
        )}
      </ol>
    </div>
  )
}

export default ToDoList
