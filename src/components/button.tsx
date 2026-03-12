import { useContext } from "react";
import { TodoContext } from "@/context/TodoContext"

import Dialog from "@/components/dialog";
import { useForm } from "react-hook-form";
import { ChangeType } from "@/types/todo";

export default function Button() {
    const context = useContext(TodoContext);
    const props = context;

    const { register, handleSubmit, reset } = useForm<ChangeType>();

    const onSubmit = (data: ChangeType) => {
        props?.addTodo(data)
        reset();
    };

    return (
        <Dialog
            className="flex w-full md:w-fit px-2 py-2 md:py-auto items-center justify-center text-sm font-medium rounded-lg bg-black text-white"
            content={
                <>
                    <label className="block mb-2.5 text-xl font-bold">ชื่อหัวข้อ</label>
                    <input 
                        {...register("title", { required: true })}
                        className="border text-base rounded-base block w-full px-4 py-3.5"
                    />
                    <label className="block mb-2.5 text-xl font-bold">รายละเอียดของงาน</label>
                    <textarea
                        {...register("description", { required: true })}
                        className="bg-gray-200 border border-gray-200 text-base rounded-base block w-full px-2 py-1.5"
                    />
                </>
            }
            submit={{
                name: "บันทึก",
                action: handleSubmit(onSubmit)
            }}
            cannel="ยกเลิก"
        >
            เพิ่มงาน
        </Dialog>
    )
}