import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = React.createContext([]);
const AddTaskContextApi = React.createContext((task: any) => {});
const UpdateTaskContextApi = React.createContext((task: any) => {});
const DeleteTaskContextApi = React.createContext((task: any) => {});

export function useTask() {
  return useContext(TaskContext);
}

export function useAddTask() {
  return useContext(AddTaskContextApi);
}

export function useUpdateTask() {
  return useContext(UpdateTaskContextApi);
}

export function useDeleteTask() {
  return useContext(DeleteTaskContextApi);
}

export function TaskProvider({ children }: any) {
  const [tasks, setTasks] = useState<any>([]);

  // todos from the server.ts
  const fetchTasks = async () => {
    //  GET REQUEST api/todos
    const response = await axios.get("api/todos");
    return response.data.todos;
  };

  useEffect(() => {
    const getAllTasks = async () => {
      const allTasks = await fetchTasks();
      if (allTasks) setTasks(allTasks);
    };

    getAllTasks();
  }, []);

  //  Add task
  const addNewTask = async (task: any) => {
    //  POST api/todo/create
    const response = await axios.post("api/todo/create", { task });
    setTasks([
      ...tasks,
      { id: response.data.todo.id, ...response.data.todo.task },
    ]);
  };

  //  Update task
  const updateTask = (task: any) => {
    setTasks(
      tasks.map((t: any) => {
        return t.id === task.id ? { ...task } : t;
      })
    );
  };

  //  Delete task
  const deleteTask = async (id: any) => {
    //  DELETE api/todo/:id/delete
    await axios.delete(`api/todo/${id}/delete`);
    //  Delete task in MUI Table
    setTasks(
      tasks.filter((task: any) => {
        return task.id !== id;
      })
    );
  };

  return (
    <TaskContext.Provider value={tasks}>
      <AddTaskContextApi.Provider value={addNewTask}>
        <UpdateTaskContextApi.Provider value={updateTask}>
          <DeleteTaskContextApi.Provider value={deleteTask}>
            {children}
          </DeleteTaskContextApi.Provider>
        </UpdateTaskContextApi.Provider>
      </AddTaskContextApi.Provider>
    </TaskContext.Provider>
  );
}
