import { createContext } from "react";
import type { TodoType, ChangeType } from "@/types/todo";

type TodoContextType = {
  tasks: TodoType[];
  addTodo: (value: ChangeType) => void;
  editTodo: (id: number, value: ChangeType) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);