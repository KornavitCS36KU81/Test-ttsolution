"use client"

import Card from "@/components/card";
import SearchBar  from "@/components/searchBar";
import Button from "@/components/button";
import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext"

import { ListTodo } from 'lucide-react';

export default function Home() {
  const context = useContext(TodoContext);
  const props = context;

  const tasks = props?.tasks ? props.tasks: null;
  
  return (
    <main className="space-y-8">
      <h1 className="text-3xl font-bold">{ tasks?.length ? "รายการที่คุณต้องทำ" : "เพิ่มรายการที่คุณต้องทำผ่าน ปุ่มด้านล่างเลย"}</h1>
      {
        tasks?.length ? (
          <>
            <section className="md:flex md:justify-between space-y-4 md:space-y-0">
              <div className="flex">
                <SearchBar />
              </div>
              <Button />
            </section>
            <section className="flex flex-col space-y-4">
              { tasks?.filter(task => task.finish === false).length ? <p>ทำยังไม่เสร็จ</p> : <></> }
              {
                tasks?.filter(task => task.finish === false).map((task) => (
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
              { tasks?.filter(task => task.finish === true).length ? <p>ทำเสร็จแล้ว</p> : <></> }
              {
                tasks?.filter(task => task.finish === true).map((task) => (
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
