import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext"

import { TodoType, ChangeType } from "@/types/todo";
import Dialog from "@/components/dialog";
import { useForm } from "react-hook-form";

import { BadgeCheck, CircleX, Trash2 } from 'lucide-react';

export default function Card({ id, title, description, time, finish }:TodoType) {
  const context = useContext(TodoContext);

  const { register, handleSubmit, reset } = useForm<ChangeType>();

  const props = context;

  const onSubmit = (data: ChangeType) => {
    props?.editTodo(id, data)
    reset();
  };
  
  const onDelete = () => {
    props?.deleteTodo(id)
  }

  return (
    <div className="relative shadow-sm rounded-lg">

      <div className={`absolute inset-y-0 left-0 w-8 rounded-l-lg ${finish ? "bg-green-300" : "bg-red-300"}`}/> 

      <div className="pl-12 pr-4 py-2">
        <div className="flex items-stretch">
          <Dialog
            className="flex-1"
            content = {
              <>
                <input 
                  {...register("title", { required: true })}
                  defaultValue={title}
                  className="border font-bold text-xl rounded-base block w-full px-4 py-3.5"
                />
                <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>
                <textarea
                    {...register("description", { required: true })}
                    defaultValue={description}
                    className="bg-gray-200 border border-gray-200 text-base rounded-base block w-full px-2 py-1.5"
                />
              </>
            }
            submit={{
              name: "อัพเดท",
              action: handleSubmit(onSubmit)
            }}
            cannel="ยกเลิก"
          >
            <p className="font-bold text-lg w-full self-center">{title}</p>
            <p className="line-clamp-3 md:line-clamp-1 text-xs">{description}</p>
          </Dialog>

          <Trash2 className="self-start cursor-pointer" onClick={() => onDelete()} />
        </div>

        <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>

        <div className="flex">
          <p className="flex-1 self-center">{time.toLocaleString()}</p>
          <div className={`${finish ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} flex space-x-1 py-1.5 px-1.5 rounded-lg min-w-fit`}>
            { finish ? <BadgeCheck /> : <CircleX /> }
            <span className="text-sm font-medium self-center">{finish ? "Done" : "Not Done"}</span>
          </div>

          <div className="flex items-center pl-4">
            <label className="relative inline-block w-11 h-6 cursor-pointer">
              <input 
                type="checkbox"
                checked={finish}
                className="peer sr-only"
                onChange={() => props?.toggleTodo(id)}
              />
              <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-black peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
              <span className="absolute top-1/2 inset-s-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
            </label>
          </div>
          
        </div>

      </div>
    </div>

  )
}