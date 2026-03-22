import { BadgeCheck, CircleX } from 'lucide-react';

export default function Badge({status}: {status: boolean}) {
    return (
        <div className={`${status ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500"} flex space-x-1 py-1 px-1.5 rounded-full max-w-fit max-h-fit`}>
            { status ? <BadgeCheck className='min-w-fit'/> : <CircleX className='min-w-fit'/> }
            <span className="text-sm font-medium self-center text-nowrap">{status ? "เสร็จแล้ว" : "ยังไม่เสร็จ"}</span>
        </div>
    )
}