import {useEffect} from "react";
import {FiTrash2, FiAlertTriangle, FiInfo} from "react-icons/fi";

type Props = {
    isOpen: boolean;
    title: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: "delete" | "remove" | "warning" | "default";
};

export default function ConfirmModal({
                                         isOpen,
                                         title,
                                         description,
                                         onConfirm,
                                         onCancel,
                                         confirmText = "Confirm",
                                         cancelText = "Cancel",
                                         variant = "delete",
                                     }: Props) {
    useEffect(() => {
        if (!isOpen) return;

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onCancel();
        };

        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const isDestructive = variant === "delete" || variant === "remove";

    const icon =
        variant === "delete" ? (
            <FiTrash2/>
        ) : variant === "warning" ? (
            <FiAlertTriangle/>
        ) : (
            <FiInfo/>
        );

    return (
        <>
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={onCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                    className="
                        bg-surface
                        backdrop-blur-md
                        rounded-2xl
                        shadow-xl
                        w-full max-w-md
                        animate-bouncy-pop
                        overflow-hidden
                    "
                >
                    <div
                        className={`h-1 w-full ${
                            isDestructive ? "bg-accent" : "bg-secondary"
                        }`}
                    />

                    <div className="px-6 py-5 flex items-center gap-3">
                        <div
                            className={`text-xl ${
                                isDestructive ? "text-accent" : "text-secondary"
                            }`}
                        >
                            {icon}
                        </div>

                        <h2 className="font-heading text-2xl">
                            {title}
                        </h2>
                    </div>

                    <div className="px-6 pb-6 space-y-6 text-sm md:text-base">
                        {description && (
                            <p className="opacity-80 leading-relaxed">
                                {description}
                            </p>
                        )}

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={onCancel}
                                className="themed-button px-5 py-2"
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={onConfirm}
                                className={`px-5 py-2 rounded-lg font-medium text-white transition-all hover:opacity-90 ${
                                    isDestructive
                                        ? "bg-accent"
                                        : "bg-secondary"
                                }`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}