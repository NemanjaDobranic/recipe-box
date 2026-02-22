import {Routes, Route} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import RecipeDetailsPage from "@/pages/RecipeDetailsPage";
import CreateRecipePage from "@/pages/CreateRecipePage";
import EditRecipePage from "@/pages/EditRecipePage.tsx";
import ShoppingListPage from "@/pages/ShopingListPage.tsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/recipe/:id" element={<RecipeDetailsPage/>}/>
            <Route path="/create" element={<CreateRecipePage/>}/>
            <Route path="/edit/:id" element={<EditRecipePage/>}/>
            <Route path="shopping-list" element={<ShoppingListPage/>}/>
        </Routes>
    );
}
