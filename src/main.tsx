import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './app/App.tsx'
import {ToastProvider} from "@/components/ui/ToastProvider.tsx";
import {Header} from "@/components/ui/Header.tsx";
import {BrowserRouter} from "react-router-dom";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ToastProvider>
            <BrowserRouter>
                <Header/>
                <App/>
            </BrowserRouter>
        </ToastProvider>
    </StrictMode>,
)
