import { useState } from "react";
import { useTodo } from "@/context/TodoContext"

import Dialog from "@/components/dialog";
import { useForm } from "react-hook-form";
import { ChangeType } from "@/types/todo";

export default function Button() {
    const { addTodo } = useTodo();
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ChangeType>({ mode: "onChange" });
    
    const [open, setOpen] = useState(false);

    const closeDialog = () => {
        reset();
        setOpen(false)
    }

    const onAdd = (data: ChangeType) => {
        if (isValid) {
            addTodo(data)
            closeDialog()
        }
    };

    return (
        <div>
            <div className="cursor-pointer flex w-full md:w-fit px-2 py-2 md:py-auto items-center justify-center text-sm font-medium rounded-lg bg-black text-white" onClick={() => setOpen(true)}>เพิ่มงาน</div>
            <Dialog isOpen={open}>
                <form onSubmit={handleSubmit(onAdd)}>
                    <label className="block mb-2.5 text-xl font-bold">ชื่อหัวข้อ</label>
                    <input 
                        {...register("title", { required: "กรุณาใส่ชื่อหัวข้อ" })}
                        className={`border ${errors.title?.message && ("border-red-500 outline-red-500")} text-base rounded-xl block w-full px-4 py-3.5`}
                    />
                    { errors.title && (
                        <p className="text-red-500 text-xs">
                            { errors.title.message }
                        </p> )
                    }
                    <label className="block mb-2.5 text-xl font-bold">รายละเอียดของงาน</label>
                    <textarea
                        {...register("description", { required: "กรุณาใส่เนื้อหา" })}
                        className={`overflow-auto bg-gray-200 border border-gray-200 ${errors.description?.message && ("border-red-500 outline-red-500")} text-base rounded-xl block w-full p-4 min-h-[40vh] md:min-h-[50vh]`}
                    />
                    { errors.description && (
                        <p className="text-red-500 text-xs">
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
                            บันทึก
                        </button>
                    </div>
                </form>
            </Dialog>
        </div>
    )
}