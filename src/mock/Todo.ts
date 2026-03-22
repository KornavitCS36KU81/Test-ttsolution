import { TodoType } from "@/types/todo";
import { format, subMinutes } from "date-fns"
import { th } from "date-fns/locale";

export const todos : TodoType[] = [
  {
    id: 1,
    title: "Learn Next.js",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    startTime: format(new Date(), 'd MMMM yyyy เวลา HH:mm', { locale: th }),
    finishTime: null,
    finish: false,
  },
  {
    id: 2,
    title: "Build mock API",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    startTime: format(subMinutes(new Date(), 10), 'd MMMM yyyy เวลา HH:mm', { locale: th }),
    finishTime: "10 นาที",
    finish: true,
  },
];