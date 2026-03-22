'use client'
import Link from "next/link"
import { useTodo } from "@/context/TodoContext"

import { Tab, TabsList, TabTrigger, TabContent } from '@/components/summarize/tabs'
import Badge from "@/components/badge"
import {  
  parse, 
  differenceInYears, 
  differenceInMonths, 
  differenceInDays, 
  differenceInHours, 
  differenceInMinutes,
  differenceInSeconds
} from "date-fns"

import { th } from "date-fns/locale";

import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { ArrowLeft, ListChecks, ListX } from 'lucide-react';

export default function Summarize() {
    const { tasks } = useTodo();

    const undoTaskTime = new Date()

    function diffTasktime(startTime: string) {
        const startObject = parse(
            startTime, 
            'd MMMM yyyy เวลา HH:mm', 
            new Date(), 
            { locale: th }
        );
        if (differenceInYears(undoTaskTime, startObject)) {
            return differenceInYears(undoTaskTime, startObject) + " ปี";
        } else if (differenceInMonths(undoTaskTime, startObject)) {
            return differenceInMonths(undoTaskTime, startObject) + " เดือน";
        } else if (differenceInDays(undoTaskTime, startObject)) {
            return differenceInDays(undoTaskTime, startObject) + " วัน";
        } else if (differenceInHours(undoTaskTime, startObject)) {
            return differenceInHours(undoTaskTime, startObject) + " ชั่วโมง";
        } else if (differenceInMinutes(undoTaskTime, startObject)) {
            return differenceInMinutes(undoTaskTime, startObject) + " นาที";
        }
        return differenceInSeconds(undoTaskTime, startObject) + " วินาที"
    }

    const done = tasks.filter((task) => task.finish === true);
    const unDone = tasks.filter((task) => task.finish === false);

    const data = [
        { name: "Completed", value: (done.length / tasks.length)*100, fill:"#b9f8cf" },
        { name: "Remaining", value: (unDone.length / tasks.length)*100, fill:"#ffa2a2" },
    ];

    return (
        <div className="space-y-4">
            <div className="flex space-x-4 items-center">
                <Link href="/" className="cursor-pointer">
                    <ArrowLeft />
                </Link>
                <p className="text-3xl font-bold">สรุปสิ่งที่คุณทำ</p>
            </div>
            <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0"/>

            <div className="flex flex-col justify-center">
                <div className="h-50 md:h-100 relative">
                    <ResponsiveContainer>
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                startAngle={180}
                                endAngle={0}
                                innerRadius="80%"
                                outerRadius="100%"
                                cornerRadius={20}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    {/* text ตรงกลาง -translate-y-1/8 */}
                    <div className="-translate-y-1/8 absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-3xl font-bold">{tasks.length}</p>
                        <p className="text-xs">จำนวน task ทั้งหมด</p>
                    </div>
                </div>
            </div>

            {/* className="-translate-y-40" */}
            <div className="-translate-y-20 md:-translate-y-45">
                <Tab defaultValue={true}>
                    <TabsList>
                        <TabTrigger value={true}>เสร็จแล้ว ({done.length})</TabTrigger>
                        <TabTrigger value={false}>ยังไม่เสร็จ ({unDone.length})</TabTrigger>
                    </TabsList>

                    <TabContent value={true}>
                        {
                            done.length ? 
                                done.map((task, key) => {
                                    return (
                                        <div key={key} className="px-4 py-2 flex flex-col md:flex-row border shadow-sm rounded-lg md:items-center md:rounded-full space-x-4">
                                            <div className="flex-1 flex items-center flex-row space-x-4">
                                                <Badge status={true}/>
                                                <p className="line-clamp-1">{task.title}</p>
                                            </div>
                                            <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0 md:block-0"/>
                                            <p>เริ่มเมื่อ {task.startTime}</p>
                                            <p>โดยใช้เวลาไปทำจนเสร็จ {task.finishTime}</p>
                                        </div>
                                    )
                                }):
                                <div className="flex flex-col space-y-4 items-center justify-center h-[50vh] md:h-[30vh]">
                                    <ListX className="size-30"/>
                                    <p>ยังไม่มีงานไหนที่คุณทำสำเร็จ</p>
                                </div> 
                        }
                    </TabContent>
                    <TabContent value={false}>
                        {
                            unDone.length ?
                                unDone.map((task, key) => {
                                    return (
                                        <div key={key} className="px-4 py-2 flex flex-col md:flex-row border shadow-sm rounded-lg md:items-center md:rounded-full space-x-4">
                                            <div className="flex-1 flex items-center flex-row space-x-4">
                                                <Badge status={false} />
                                                <p>{task.title}</p>
                                            </div>
                                            <hr className="text-center h-px my-4 mx-2 bg-neutral-300 border-0 md:block-0"/>
                                            <p>ค้างอยู่ {diffTasktime(task.startTime)} ที่แล้ว</p>
                                        </div>
                                    )
                                }) :
                                <div className="flex flex-col space-y-4 items-center justify-center h-[50vh] md:h-[30vh]">
                                    <ListChecks className="size-30" />
                                    <p>ไม่มีงานที่คุณค้างไว้อยู่</p>
                                </div>
                        }
                    </TabContent>
                </Tab>
            </div>

        </div>
    )
}