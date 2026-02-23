import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import RecipeForm from "@/components/recipe/RecipeForm";
import {useToast} from "@/context/useToast.ts";

export default function CreateRecipePage() {
    const navigate = useNavigate();
    const addRecipe = useRecipeStore((s) => s.addRecipe);
    const {showToast} = useToast();

    return (
        <RecipeForm
            onSubmit={(data) => {
                addRecipe(data);
                showToast(`"${data.name}" has been created successfully!`);
                navigate("/");
            }}
            submitLabel="Create Recipe"
        />
    );
}