"use client"
import { useState, useEffect } from "react"
import { TodoContext } from "@/context/TodoContext"
import { TodoType, ChangeType } from "@/types/todo";

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TodoType[]>([])
  
    const toggleTodo = (id: number) => {
      setTasks(tasks =>
        tasks.map(todo =>
          todo.id === id
            ? { ...todo, finish: !todo.finish }
            : todo
        )
      )
    }
  
    const addTodo = (task: ChangeType) => {
      setTasks((oldTask) => {
        if (oldTask.length == 0) {
          return [{
            id: 1,
            title: task.title,
            description: task.description,
            time: new Date(),
            finish: false
          }]
        }
        return [...oldTask, 
          {
            id: oldTask[oldTask.length - 1].id + 1,
            title: task.title,
            description: task.description,
            time: new Date(),
            finish: false
          }
        ]
      });
    }
  
    const editTodo = (id: number, task: ChangeType) => {
      setTasks(tasks =>
        tasks.map(todo =>
          todo.id === id
            ? {
                ...todo, 
                title: task.title,
                description: task.description
              }
            : todo
        )
      )
    }
  
    const deleteTodo = (id: number) => {
      setTasks(tasks =>
        tasks.filter(todo => todo.id !== id)
      )
    }
  
    useEffect(() => {
      fetch("/api/todo")
        .then(response => response.json())
        .then((result: TodoType[]) => {
          setTasks(result);
        });
    }, []);
  
    return (
      <TodoContext.Provider value={{ tasks, addTodo, editTodo, deleteTodo, toggleTodo }}>
        { children }
      </TodoContext.Provider>
    )
}