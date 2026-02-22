import {DarkModeToggle} from "@/components/ui/DarkModeToggle.tsx";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const navigate = useNavigate();
    return (
        <header
            className="flex flex-col md:flex-row justify-between items-center px-8 md:px-40 py-4 shadow-md rounded-b-lg gap-2 md:gap-0"
            style={{
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
            }}
        >

            <img
                src="/assets/images/logo.ico"
                alt="Recipe Box Logo"
                className="w-14 h-14 rounded-full logo-theme-aware"
                onClick={() => navigate('/')}
                style={{
                    border: "2px solid var(--color-surface)",
                }}
            />

            {/* Titles */}
            <div className="flex flex-col leading-tight text-center md:text-left">
                <h1
                    className="text-2xl md:text-3xl font-heading"
                    style={{color: "var(--color-text)"}}
                >
                    Recipe Box
                </h1>
                <span
                    className="text-sm md:text-base"
                    style={{color: "var(--color-secondary)"}}
                >
            Cook With Confidence
          </span>
            </div>

            <div className="flex items-center justify-center md:justify-end w-full md:w-auto mt-2 md:mt-0">
                <DarkModeToggle/>
            </div>
        </header>
    );
};