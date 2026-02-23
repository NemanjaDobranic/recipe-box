import {useState, useEffect} from "react";

interface HeartProps {
    favorite: boolean;
    onClick?: () => void;
    className?: string;
    size?: number;
}

export default function Heart({favorite, onClick, size = 32}: HeartProps) {
    const [animating, setAnimating] = useState(false);

    const pxToRem = (px: number) => `${px / 16}rem`;

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
            className="
                        cursor-pointer
                        flex items-center justify-center
                        rounded-full
                        bg-surface/80 backdrop-blur-md
                        shadow-md hover:shadow-lg
                        transition-all duration-300
                      "
            style={{
                width: pxToRem(size + 8),
                height: pxToRem(size + 8),
            }}
        >
      <span
          className={`
          select-none
          transition-transform duration-300
          ${animating ? "scale-125" : "scale-100"}
          ${favorite
              ? "text-secondary drop-shadow-md"
              : "text-gray-400 hover:text-secondary"}
          hover:scale-110
        `}
          style={{fontSize: pxToRem(size)}}
      >
        ♥
      </span>
    </span>
    );
}