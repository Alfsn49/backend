import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { useTasks } from "../context/TasksContext"
function TaskPage() {
    const {getTasks, tasks} = useTasks()

    useEffect(()=>{
        getTasks()
    },[])
    if (tasks.length === 0) {
        return <div>No hay tareas</div>
    }
  return (
    <div>
      {
          tasks.map((task,i)=>(
              <div key={task._id}>
                  <h1>{task.title}</h1>
                  <p>{task.description}</p>
              </div>
          ))
      }
    </div>
  )
}

export default TaskPage