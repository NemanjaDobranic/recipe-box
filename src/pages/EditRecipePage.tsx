import { useParams, useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import RecipeForm from "@/components/recipe/RecipeForm";

export default function EditRecipePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const recipes = useRecipeStore((s) => s.recipes);
    const updateRecipe = useRecipeStore((s) => s.updateRecipe);

    const recipe = recipes.find((r) => r.id === id);

    if (!recipe) {
        return <p className="p-6 text-center text-gray-500">Recipe not found</p>;
    }

    return (
        <RecipeForm
            existingRecipe={recipe}
            onSubmit={(data) => {
                updateRecipe({ ...recipe, ...data });
                navigate(`/recipe/${recipe.id}`);
            }}
            submitLabel="Save Changes"
        />
    );
}