import { Search } from 'lucide-react';

export default function SearchBar() {
    return (
        <div className="relative flex items-center w-full">
            <Search className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600"/>
            <input type="search" className="[&::-webkit-search-cancel-button]:hidden [&::-ms-clear]:hidden w-full rounded-lg border border-gray-300 pl-10 pr-3 py-2 text-md focus:outline-none" placeholder="Search..." />
        </div>
    )
}