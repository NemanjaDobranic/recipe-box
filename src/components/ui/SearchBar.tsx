import {type FC, useState, useEffect} from "react";

interface SearchBarProps {
    placeholder?: string;
    onSearch: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({placeholder, onSearch}) => {
    const [value, setValue] = useState("");

    // ✅ Debounce input (300ms)
    useEffect(() => {
        const timeout = setTimeout(() => {
            onSearch(value);
        }, 300);

        return () => clearTimeout(timeout);
    }, [value, onSearch]);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder || "Search..."}
            className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 mb-6"
        />
    );
};

export default SearchBar;
