import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import RecipeDetailsPage from "@/pages/RecipeDetailsPage";
import CreateRecipePage from "@/pages/CreateRecipePage";

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/recipe/:id" element={<RecipeDetailsPage />} />
                <Route path="/create" element={<CreateRecipePage />} />
                <Route path="/edit/:id" element={<CreateRecipePage />} />
            </Routes>
        </BrowserRouter>
    );
}
