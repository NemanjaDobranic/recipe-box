import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import RecipeForm from "@/components/recipe/RecipeForm";

export default function CreateRecipePage() {
    const navigate = useNavigate();
    const addRecipe = useRecipeStore((s) => s.addRecipe);

    return (
        <RecipeForm
            onSubmit={(data) => {
                addRecipe(data);
                navigate("/");
            }}
            submitLabel="Create Recipe"
        />
    );
}