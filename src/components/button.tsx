import Dialog from "@/components/dialog";
import { useForm } from "react-hook-form";
import { AddType } from "@/types/todo";

type Action = {
    addTask: (value: AddType) => void
}

export default function Button({ addTask }: Action) {
    const { register, handleSubmit, reset } = useForm<AddType>();

    const onSubmit = (data: AddType) => {
        addTask(data)
        reset();
    };

    return (
        <Dialog
            className="w-full md:w-fit text-center px-2 py-2 md:py-auto items-center text-sm font-medium rounded-lg bg-black text-white"
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
            cannel={{
                name: "ยกเลิก"
            }}
        >
            เพิ่มงาน
        </Dialog>
    )
}