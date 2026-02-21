import {useState, useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {useRecipeStore} from "@/features/recipes/store";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeFilters from "@/components/recipe/RecipeFilters";

export default function HomePage() {
    const navigate = useNavigate();
    const recipes = useRecipeStore((s) => s.recipes);

    const [search, setSearch] = useState("");
    const [cuisine, setCuisine] = useState("all");
    const [difficulty, setDifficulty] = useState("all");
    const [favoritesOnly, setFavoritesOnly] = useState(false);

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        if (search.trim()) {
            const lower = search.toLowerCase();
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(lower) ||
                    r.cuisine.toLowerCase().includes(lower) ||
                    r.tags.some((t) => t.toLowerCase().includes(lower))
            );
        }

        if (cuisine !== "all")
            result = result.filter((r) => r.cuisine === cuisine);

        if (difficulty !== "all")
            result = result.filter(
                (r) =>
                    r.difficulty.toLowerCase() === difficulty.toLowerCase()
            );

        if (favoritesOnly)
            result = result.filter((r) => r.isFavorite);

        return result;
    }, [recipes, search, cuisine, difficulty, favoritesOnly]);

    const cuisines = [
        "all",
        ...Array.from(new Set(recipes.map((r) => r.cuisine))),
    ];

    return (
        <div className="p-4 max-w-6xl mx-auto">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-heading">
                    Your Mediterranean Recipe Box
                </h1>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-tomato text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                    + Create Recipe
                </button>
            </div>

            <RecipeFilters
                search={search}
                setSearch={setSearch}
                cuisine={cuisine}
                setCuisine={setCuisine}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                favoritesOnly={favoritesOnly}
                setFavoritesOnly={setFavoritesOnly}
                availableCuisines={cuisines}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe}/>
                ))}
            </div>

            {filteredRecipes.length === 0 && (
                <p className="text-gray-500 mt-6 text-center">
                    No recipes found. Try another search or adjust filters.
                </p>
            )}
        </div>
    );
}