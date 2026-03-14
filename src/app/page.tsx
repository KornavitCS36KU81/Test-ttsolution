"use client"

import Card from "@/components/card";
import Button from "@/components/button";
import { Search, SearchAlert } from 'lucide-react';
import { useContext, useState, useMemo } from "react";
import { TodoContext } from "@/context/TodoContext"

import { ListTodo } from 'lucide-react';
import { TodoType } from "@/types/todo";

export default function Home() {
  const context = useContext(TodoContext);
  const tasks = context?.tasks ? context.tasks: [];
  const [keyword, setKeyword] = useState('')

  const searchTodo = useMemo(() => {
    const search = keyword.toLowerCase()

    return context?.tasks.filter((todo) =>
      todo.title.toLowerCase().includes(search) ||
      todo.description.toLowerCase().includes(search)
    )
  }, [context?.tasks, keyword])

  function showEachCard(value: TodoType[], finish: boolean) {
    const filter = value.filter(task => task.finish == finish)
    return (
      <>
        <p className="font-bold tracking-wide">

          { filter.length ? finish ? "ทำเสร็จแล้ว": "ทำยังไม่เสร็จ" : <></> }
        </p>
        {
          filter.map((task) => (
            <Card 
              key={task.id}
              id={task.id}
              description={task.description}
              title={task.title}
              time={task.time}
              finish={task.finish}
            />
          ))
        }
      </>
    )
  }

  function showItems() {
    if (keyword.length) {
      // หาเจอ
      if (searchTodo?.length) {
        return (
          <>
            { showEachCard(searchTodo, false) }
            { showEachCard(searchTodo, true) }
          </>
        )
      } 
      // หาไม่เจอ
      else {
        return (
          <div className="flex flex-col space-y-4 border-2 rounded-xl border-dashed border-gray-300 items-center justify-center h-[70vh]">
            <SearchAlert className="size-16" />
            <p>ไม่มีรายการที่คุณตามหาอยู่</p>
          </div>
        )
      }
    }

    // ไม่มีการ search
    return (<>
      { showEachCard(tasks, false) }
      { showEachCard(tasks, true) }
    </>)
  }
  
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">{ tasks.length ? "รายการที่คุณต้องทำ" : "เพิ่มรายการที่คุณต้องทำผ่าน ปุ่มด้านล่างเลย"}</h1>
      {
        tasks.length ? (
          <>
            <section className="md:flex md:justify-between space-y-4 md:space-y-0">
              <div className="flex">
                <div className="relative flex items-center w-full">
                    <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"/>
                    <input 
                      className="[&::-webkit-search-cancel-button]:hidden [&::-ms-clear]:hidden w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-md focus:outline-none" 
                      placeholder="ค้นหางานของคุณ..."
                      value={keyword} 
                      onChange={(event) => setKeyword(event.target.value)}  
                    />
                </div>
              </div>
              <Button />
            </section>
            <section className="flex flex-col space-y-4">
              { showItems() }
            </section>
          </>
        ) : (
          <div className="flex flex-col space-y-4 items-center justify-center h-[80vh]">
            <ListTodo />
            <p>ไม่มีรายการที่คุณต้องทำหรอ</p>
            <Button />
          </div>
        )
      }
    </main>
  );
}
