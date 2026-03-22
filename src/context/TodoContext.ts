import { createContext, useContext } from "react";
import type { TodoType, ChangeType } from "@/types/todo";

type TodoContextType = {
  tasks: TodoType[];
  addTodo: (value: ChangeType) => void;
  editTodo: (id: number, value: ChangeType) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextType | null>(null);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("Todo tag must be used within TodoProvider");
  return context;
}