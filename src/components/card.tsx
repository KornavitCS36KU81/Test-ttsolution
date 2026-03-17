import { useState, useContext } from "react";
import { TodoContext } from "@/context/TodoContext"

import { TodoType, ChangeType } from "@/types/todo";
import Dialog from "@/components/dialog";
import Trash from "@/components/trash";
import { useForm } from "react-hook-form";

import { BadgeCheck, CircleX } from 'lucide-react';

export default function Card({ id, title, description, time, finish }:TodoType) {
  const context = useContext(TodoContext);

  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ChangeType>({ mode: "onChange" });

  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    reset();
    setOpen(false)
  }

  const onEdit = (data: ChangeType) => {
    if (isValid) {
      context?.editTodo(id, data)
      closeDialog()
    }
  };

  return (
    <div className="relative shadow-sm rounded-lg">

      <div className={`absolute inset-y-0 left-0 w-8 rounded-l-lg ${finish ? "bg-green-300" : "bg-red-300"}`}/> 

      <div className="pl-12 pr-4 py-2">
        <div className="flex items-stretch">
          <div className="cursor-pointer flex-1" onClick={() => setOpen(true)}>
            <p className="font-bold text-lg w-full self-center">{title}</p>
            <p className="line-clamp-3 md:line-clamp-1 text-xs">{description}</p>
          </div>
          <Dialog isOpen={open}>
            <form onSubmit={handleSubmit(onEdit)}>
              <input 
                {...register("title", { required: "ใส่ส่วนของหัวข้อด้วย" })}
                defaultValue={title}
                className={`border font-bold text-xl ${errors.title?.message && ("border-red-500")} rounded-base block w-full px-4 py-3.5`}
              />
              { errors.title && (
                <p className="text-red-500 text-xs">
                  { errors.title.message }
                </p> )
              }
              <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>
              <textarea
                {...register("description", { required: "ใส่ส่วนของเนื้อหาด้วย" })}
                defaultValue={description}
                className={`bg-gray-200 border border-gray-200 ${errors.description?.message && ("border-red-500")} text-base rounded-base block w-full px-2 py-1.5`}
              />
              { errors.description && (
                <p className="text-red-500 text-sm">
                  { errors.description.message }
                </p> )
              }
              <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-8">
                <button
                  onClick={closeDialog}
                  className="cursor-pointer w-full px-4 py-2 bg-black text-white rounded-lg"
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="cursor-pointer w-full px-4 py-2 border rounded-lg"
                >
                  อัพเดท
                </button>
              </div>
            </form>
          </Dialog>
          <Trash id={id}/>
          {/* <Trash2 className="self-start cursor-pointer" onClick={() => onDelete()} /> */}
        </div>

        <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>

        <div className="flex items-center">
          <p className="flex-1 self-center">{time}</p>
          <div className={`${finish ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} flex space-x-1 py-1 px-1.5 rounded-full min-w-fit max-h-fit`}>
            { finish ? <BadgeCheck /> : <CircleX /> }
            <span className="text-sm font-medium self-center">{finish ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}</span>
          </div>

          <div className="flex items-center pl-4">
            <label className="relative inline-block w-11 h-6 cursor-pointer">
              <input 
                type="checkbox"
                checked={finish}
                className="peer sr-only"
                onChange={() => context?.toggleTodo(id)}
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