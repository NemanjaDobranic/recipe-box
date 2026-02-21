import { createContext } from "react";
import type {ToastContextType} from "@/components/ui/ToastProvider.tsx";

export const ToastContext = createContext<ToastContextType | null>(null);