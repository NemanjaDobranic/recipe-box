import { ToastContext } from "@/context/ToastContext";
import { useState, type ReactNode } from "react";
import { FiCheckCircle } from "react-icons/fi";

export type Toast = {
    id: string;
    message: string;
};

export type ToastContextType = {
    showToast: (message: string) => void;
};

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string) => {
        const id = crypto.randomUUID();
        setToasts((prev) => [...prev, { id, message }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast container */}
            <div className="fixed bottom-5 right-5 flex flex-col space-y-3 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="
                            bg-surface
                            backdrop-blur-sm
                            rounded-xl
                            shadow-md
                            px-4 py-3
                            flex items-center gap-3
                            font-body text-primary
                            animate-slide-in
                            min-w-[200px] max-w-xs
                        "
                    >
                        {/* Optional icon */}
                        <FiCheckCircle className="text-accent text-lg" />
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}