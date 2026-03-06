"use client"
import { todo } from "@/types/todo";
import { useState, useEffect } from "react";
import { BadgeCheck, CircleX } from 'lucide-react';

type todos = todo & {
  onToggle: (value:boolean) => void
}

export default function Card({title, description, time, finish, onToggle}:todos) {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);

  // block scroll in Model and add the animation
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setShow(true), 10);
    } else {
      document.body.style.overflow = "auto";
      setTimeout(() => setShow(false), 10);
    }
  }, [open]);

  return (
    <>
    {/* button on click */}
    <div className="relative shadow-sm rounded-lg">

      <div className={`absolute inset-y-0 left-0 w-8 rounded-l-lg ${finish ? "bg-green-300" : "bg-red-300"}`}/> 

      <div className="pl-12 pr-4 py-2 space-y-0.5">
        {/* head card */}
        <section onClick={() => setOpen(true)}>
          <div className="flex">
            <p className="font-bold text-lg w-full self-center">{title}</p>

            <div className={`${finish ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} flex space-x-1 py-1.5 px-1.5 rounded-lg min-w-fit`}>
              { finish ? <BadgeCheck /> : <CircleX />}
              <span className="text-sm font-medium self-center">{finish ? "Done" : "Not Done"}</span>
            </div>
          </div>
          <p className="line-clamp-3 md:line-clamp-1 text-xs">{description}</p>
        </section>

        <hr className="text-center h-px my-8 mx-2 bg-neutral-300 border-0"/>

        <div className="flex">
          <p className="w-full">{time.toLocaleString()}</p>

          <div className="flex items-center">
            <label className="relative inline-block w-11 h-6 cursor-pointer">
              <input 
                type="checkbox"
                checked={finish}
                className="peer sr-only"
                onChange={(e) => onToggle(e.target.checked)} 
              />
              <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-black peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
              <span className="absolute top-1/2 inset-s-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-sm transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
            </label>
          </div>

        </div>

      </div>

    </div>

    {/* Dialog */}
    {open && (
      <div className="z-10 fixed inset-0 flex items-center justify-center">
        
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
            show ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Modal content */}
        <div
          className={`relative bg-white rounded-xl shadow-lg w-100 p-6 transform transition-all duration-300
          ${show ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        >
          <h2 className="text-xl text-center font-bold">{title}</h2>

          <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>

          <p className="text-gray-600 mb-6">
            {description}
          </p>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 bg-black text-white rounded-lg"
            >
              Confirm
            </button>
          </div>
        </div>

      </div>
    )}
    </>
  )
}