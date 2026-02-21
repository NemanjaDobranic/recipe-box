import {useEffect} from 'react';

type Props = {
    isOpen: boolean;
    title: string;
    description?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    variant?: 'delete' | 'remove' | 'warning' | 'default';
};

export default function ConfirmModal({
                                         isOpen,
                                         title,
                                         description,
                                         onConfirm,
                                         onCancel,
                                         confirmText = 'Elimina',
                                         cancelText = 'Annulla',
                                         variant = 'delete',
                                     }: Props) {
    useEffect(() => {
        if (!isOpen) return;
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onCancel();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const isDestructive = variant === 'delete' || variant === 'remove';
    const headerBg = isDestructive
        ? 'bg-gradient-to-r from-tomato to-[#a93226]'
        : 'bg-gradient-to-r from-olive to-[#2f6147]';

    const confirmBg = isDestructive
        ? 'bg-tomato hover:bg-[#a93226]'
        : 'bg-olive hover:bg-[#2f6147]';

    return (
        <>
            <div
                className="
          fixed inset-0 bg-black/45 backdrop-blur-[3px] z-40
          animate-[backdrop-fade_0.45s_ease-out_forwards]
        "
                onClick={onCancel}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                <div
                    className="
            bg-cream/95 backdrop-blur-sm
            rounded-2xl sm:rounded-3xl
            shadow-xl shadow-tomato/15 border border-tomato/10
            w-full max-w-md sm:max-w-lg
            overflow-hidden
            transform-gpu
            animate-[modal-bouncy-pop_0.62s_cubic-bezier(0.34,1.45,0.6,1.2)_forwards]
          "
                >
                    <div className={`px-6 py-5 ${headerBg} text-cream`}>
                        <h2 className="text-2xl sm:text-3xl font-heading font-bold tracking-tight">
                            {title}
                        </h2>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5 font-body text-gray-800 leading-relaxed">
                        {description && (
                            <p className="text-gray-700 text-lg">
                                {description}
                            </p>
                        )}

                        <div className="flex justify-end gap-4 pt-4">
                            <button
                                onClick={onCancel}
                                className="
                  px-6 py-3 rounded-xl border-2 border-olive/60 text-olive
                  font-medium font-body text-base
                  hover:bg-olive/10 hover:border-olive
                  active:scale-95 transition-all duration-200
                "
                            >
                                {cancelText}
                            </button>

                            <button
                                onClick={onConfirm}
                                className={`
                  px-6 py-3 rounded-xl font-medium font-body text-base text-white
                  shadow-md hover:shadow-lg active:scale-95 transition-all duration-200
                  ${confirmBg}
                `}
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