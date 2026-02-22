import { useState, useEffect } from "react";

interface HeartProps {
    favorite: boolean;
    onClick?: () => void;
    className?: string;
    size?: number;
}

export default function Heart({ favorite, onClick, className = "", size = 32 }: HeartProps) {
    const [animating, setAnimating] = useState(false);

    useEffect(() => {
        if (!favorite) return;

        const raf = requestAnimationFrame(() => setAnimating(true));

        const timeout = setTimeout(() => setAnimating(false), 500);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timeout);
        };
    }, [favorite]);

    return (
        <span
            onClick={onClick}
            className={`cursor-pointer select-none inline-block transition-transform duration-300 ${
                animating ? "scale-125" : "scale-100"
            } ${favorite ? "text-secondary" : "text-gray-400 hover:text-secondary"} ${className}`}
            style={{ fontSize: size }}
        >
            ♥
        </span>
    );
}