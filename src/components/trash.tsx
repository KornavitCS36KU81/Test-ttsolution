import { useState } from "react";
import { useTodo } from "@/context/TodoContext"

import { Trash2 } from "lucide-react"
import Dialog from "@/components/dialog";

export default function Trash({id}: {id: number}) {
    const { deleteTodo } = useTodo();

    const [open, setOpen] = useState(false);

    const closeDialog = () => {
        setOpen(false)
    }

    const onDelete = () => {
      deleteTodo(id)
      closeDialog()
    }
    
    return (
        <>
            <Trash2 className="self-start cursor-pointer" onClick={() => setOpen(true)} />
            <Dialog isOpen={open}>
                <p className="font-semibold text-2xl text-center">ต้องการลบงาน Task นี้ไหม</p>
                <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>
                <div className="flex flex-col-reverse md:flex-row justify-end gap-2 mt-8">
                    <button
                        onClick={closeDialog}
                        className="cursor-pointer w-full px-4 py-2 bg-black text-white rounded-lg"
                    >
                        ไม่ลบ
                    </button>

                    <button
                        onClick={() => onDelete()}
                        className="cursor-pointer w-full px-4 py-2 border rounded-lg"
                    >
                        ลบทิ้ง
                    </button>
                </div>
            </Dialog>
        </>
    )
}