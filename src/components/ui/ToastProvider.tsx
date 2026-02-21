import { ToastContext } from "@/context/ToastContext";
import { useState, type ReactNode } from "react";

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

            <div className="fixed bottom-5 right-5 space-y-2 z-50">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className="bg-olive text-white px-4 py-3 rounded-lg shadow-lg animate-slide-in"
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}