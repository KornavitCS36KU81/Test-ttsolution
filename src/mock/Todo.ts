import { TodoType } from "@/types/todo";

export const todos : TodoType[] = [
  {
    id: 1,
    title: "Learn Next.js",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    time: new Date(),
    finish: false,
  },
  {
    id: 2,
    title: "Build mock API",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    time: new Date(),
    finish: true,
  },
];