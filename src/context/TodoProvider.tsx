"use client"
import { useState, useEffect } from "react"
import { TodoContext } from "@/context/TodoContext"
import { TodoType, ChangeType } from "@/types/todo";
import Skeleton from "@/components/skeleton";

import { 
  format, 
  parse, 
  differenceInYears, 
  differenceInMonths, 
  differenceInDays, 
  differenceInHours, 
  differenceInMinutes,
  differenceInSeconds
} from "date-fns"

import { th } from "date-fns/locale";

const delay = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [tasks, setTasks] = useState<TodoType[]>([])
    const [loading, setLoading] = useState(true)
    
    function setfinalTime(startTime: string, finish: boolean) {
      if (!finish) {
        const finishTime = new Date();
        const startObject = parse(
          startTime, 
          'd MMMM yyyy เวลา HH:mm', 
          new Date(), 
          { locale: th }
        );
        if (differenceInYears(finishTime, startObject)) {
          return differenceInYears(finishTime, startObject) + " ปี";
        } else if (differenceInMonths(finishTime, startObject)) {
          return differenceInMonths(finishTime, startObject) + " เดือน";
        } else if (differenceInDays(finishTime, startObject)) {
          return differenceInDays(finishTime, startObject) + " วัน";
        } else if (differenceInHours(finishTime, startObject)) {
          return differenceInHours(finishTime, startObject) + " ชั่วโมง";
        } else if (differenceInMinutes(finishTime, startObject)) {
          return differenceInMinutes(finishTime, startObject) + " นาที";
        }
        return differenceInSeconds(finishTime, startObject) + " วินาที"
      }
      return null
    }


    const toggleTodo = (id: number) => {
      setTasks(tasks =>
        tasks.map(todo =>
          todo.id === id
            ? { ...todo, finishTime: setfinalTime(todo.startTime, todo.finish) ,finish: !todo.finish }
            : todo
        )
      )
    }
  
    const addTodo = (task: ChangeType) => {
      setTasks((oldTask) => {
        return [...oldTask, 
          {
            id: oldTask.length ? oldTask.length + 1 : 1,
            title: task.title,
            description: task.description,
            startTime: format(new Date(), 'd MMMM yyyy เวลา HH:mm', { locale: th }),
            finishTime: null,
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
        .then(async (result: TodoType[]) => {
          await delay(1500)
          setTasks(result)
          setLoading(false)
        });
    }, []);

    if (loading) {
      return <Skeleton />
    }
  
    return (
      <TodoContext.Provider value={{ tasks, addTodo, editTodo, deleteTodo, toggleTodo }}>
        { children }
      </TodoContext.Provider>
    )
}