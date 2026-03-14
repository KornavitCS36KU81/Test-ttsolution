"use client"

import { Search } from 'lucide-react';
import { useState, useContext, useMemo } from "react";
import { TodoContext } from "@/context/TodoContext"
import { TodoType } from '@/types/todo';

type Action = {
    onFilter: (value: TodoType[]) => void
}

export default function SearchBar({onFilter}: Action) {
    const context = useContext(TodoContext);
    const [keyword, setKeyword] = useState('')

    const searchTodo = useMemo(() => {
        const search = keyword.toLowerCase()

        return context?.tasks.filter((todo) =>
            todo.title.toLowerCase().includes(search) ||
            todo.description.toLowerCase().includes(search)
        )
    }, [context?.tasks, keyword])

    return (
        <div className="relative flex items-center w-full">
            <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"/>
            <input 
                className="[&::-webkit-search-cancel-button]:hidden [&::-ms-clear]:hidden w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-md focus:outline-none" 
                placeholder="ค้นหางานของคุณ..."
                value={keyword} 
                onChange={(event) => {
                    setKeyword(event.target.value)
                    if (searchTodo !== undefined) {
                        onFilter(searchTodo)
                    }
                }}  
            />
        </div>
    )
}