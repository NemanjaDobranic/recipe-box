import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "@/features/recipes/store";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeFilters from "@/components/recipe/RecipeFilters";
import type { SortOptions } from "@/components/recipe/RecipeFilters";
import debounce from "lodash.debounce";

export default function HomePage() {
    const navigate = useNavigate();
    const recipes = useRecipeStore((s) => s.recipes);

    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [cuisine, setCuisine] = useState("all");
    const [difficulty, setDifficulty] = useState("all");
    const [favoritesOnly, setFavoritesOnly] = useState(false);
    const [maxTime, setMaxTime] = useState<number | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<SortOptions>("recent");

    const availableCuisines = useMemo(
        () => ["all", ...Array.from(new Set(recipes.map((r) => r.cuisine)))],
        [recipes]
    );

    const availableTags = useMemo(
        () => Array.from(new Set(recipes.flatMap((r) => r.tags))),
        [recipes]
    );

    const debouncedSetSearch = useMemo(
        () => debounce((value: string) => setDebouncedSearch(value), 300),
        []
    );

    useEffect(() => {
        debouncedSetSearch(search);
    }, [search, debouncedSetSearch]);

    const filteredRecipes = useMemo(() => {
        let result = [...recipes];

        if (debouncedSearch.trim()) {
            const lower = debouncedSearch.toLowerCase();
            result = result.filter(
                (r) =>
                    r.name.toLowerCase().includes(lower) ||
                    r.cuisine.toLowerCase().includes(lower) ||
                    r.tags.some((t) => t.toLowerCase().includes(lower))
            );
        }

        if (cuisine !== "all") result = result.filter((r) => r.cuisine === cuisine);
        if (difficulty !== "all")
            result = result.filter(
                (r) => r.difficulty.toLowerCase() === difficulty.toLowerCase()
            );
        if (favoritesOnly) result = result.filter((r) => r.isFavorite);
        if (maxTime) result = result.filter((r) => r.prepTime + r.cookTime <= maxTime);
        if (tags.length > 0)
            result = result.filter((r) => tags.every((t) => r.tags.includes(t)));

        switch (sortBy) {
            case "recent":
                result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                break;
            case "time":
                result.sort((a, b) => a.prepTime + a.cookTime - (b.prepTime + b.cookTime));
                break;
            case "difficulty":
                { const difficultyOrder = { Easy: 0, Medium: 1, Hard: 2 };
                result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
                break; }
            case "favorites":
                result.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
                break;
        }

        return result;
    }, [recipes, debouncedSearch, cuisine, difficulty, favoritesOnly, maxTime, tags, sortBy]);

    return (
        <div className="p-4 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h1 className="text-3xl font-heading">Your Mediterranean Recipe Box</h1>

                <button
                    onClick={() => navigate("/create")}
                    className="bg-tomato text-white px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
                >
                    + Create Recipe
                </button>
            </div>

            <RecipeFilters
                recipes={recipes}
                search={search}
                setSearch={setSearch}
                cuisine={cuisine}
                setCuisine={setCuisine}
                difficulty={difficulty}
                setDifficulty={setDifficulty}
                favoritesOnly={favoritesOnly}
                setFavoritesOnly={setFavoritesOnly}
                maxTime={maxTime}
                setMaxTime={setMaxTime}
                tags={tags}
                setTags={setTags}
                sortBy={sortBy}
                setSortBy={setSortBy}
                availableCuisines={availableCuisines}
                availableTags={availableTags}
            />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
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