"use client"

import Card from "@/components/card";
import SearchBar  from "@/components/searchBar";
import Button from "@/components/button";
import { useState, useEffect } from "react";
import { todo } from "@/types/todo";

export default function Home() {
  
  const [tasks, setTasks] = useState<todo[]>([])

  const toggleTodo = (id: number) => {
    console.log(tasks)
    setTasks(tasks =>
      tasks.map(todo =>
        todo.id === id
          ? { ...todo, finish: !todo.finish }
          : todo
      )
    )
  }

  useEffect(() => {
    fetch("/api/todo")
      .then(response => response.json())
      .then((result: todo[]) => {
        setTasks(result);
      });
  }, []);

  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">รายการที่คุณต้องทำ</h1>
      <section className="md:flex md:justify-between space-y-4 md:space-y-0">
        <div className="flex">
          <SearchBar />
        </div>
        <Button />
      </section>
      <section className="flex flex-col space-y-4">
        {
          tasks.map((task) => (
            <Card 
              key={task.id} 
              id={task.id} 
              description={task.description} 
              title={task.title} 
              time={task.time} 
              finish={task.finish} 
              onToggle={() => toggleTodo(task.id)} 
            />
          ))
        }
      </section>
    </main>
  );
}
