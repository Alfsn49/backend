import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTaskRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within TaskProvider");
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  
  const getTasks= async ()=>{
    try {
      const res = await getTasksRequest();
      setTasks(res.data)
    } catch (error) {
      console.error("Error getting tasks:", error);
    }
  }

  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}
