import { useState, useEffect } from "react";

export const DarkModeToggle = (props: React.HTMLAttributes<HTMLButtonElement>) => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("theme") === "dark";
        }
        return false;
    });

    useEffect(() => {
        const html = document.documentElement;
        if (darkMode) {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="dark-mode-toggle p-2 rounded-md"
            style={{
                backgroundColor: "var(--color-toggle-bg)",
                color: "var(--color-toggle-text)",
                boxShadow: "0 2px 6px var(--color-toggle-shadow)",
                transition: "all 0.4s ease",
                minWidth: "40px",
                minHeight: "40px",
            }}
            {...props}
        >
            {darkMode ? "🌙" : "☀️"}
        </button>
    );
};