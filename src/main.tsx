import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {ToastProvider} from "@/components/ui/ToastProvider.tsx";
import {Header} from "@/components/ui/Header.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <Header />
            <App/>
        </ToastProvider>
    </StrictMode>,
)
