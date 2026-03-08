import {Navigate, createBrowserRouter} from "react-router-dom";
import HomePage from "@/pages/HomePage";
import RecipeDetailsPage from "@/pages/RecipeDetailsPage";
import CreateRecipePage from "@/pages/CreateRecipePage";
import EditRecipePage from "@/pages/EditRecipePage.tsx";
import ShoppingListPage from "@/pages/ShopingListPage.tsx";
import Layout from "@/app/Layout.tsx";

const isGhPages = import.meta.env.GH_PAGES === "true";

export const router = createBrowserRouter([
        {
            element: <Layout/>,
            children: [
                {
                    path: "/",
                    element: <HomePage/>,
                },
                {
                    path: "/recipe/:id",
                    element: <RecipeDetailsPage/>,
                },
                {
                    path: "/create",
                    element: <CreateRecipePage/>,
                },
                {
                    path: "/edit/:id",
                    element: <EditRecipePage/>,
                },
                {
                    path: "shopping-list",
                    element: <ShoppingListPage/>,
                },
                {
                    path: "*",
                    element: <Navigate to="/" replace/>,
                },
            ]
        }
    ],
    {
        basename: isGhPages ? "/recipe-box/" : "/",
    }
);
