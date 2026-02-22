import {useState, useMemo, useEffect} from "react";
import {useRecipeStore, useShoppingStore} from "@/features/recipes/store";
import RecipeCard from "@/components/recipe/RecipeCard";
import RecipeFilters from "@/components/recipe/RecipeFilters";
import type {SortOptions} from "@/components/recipe/RecipeFilters";
import debounce from "lodash.debounce";

export default function HomePage() {
    const recipes = useRecipeStore((s) => s.recipes);
    const selectedRecipes = useShoppingStore((s) => s.selectedRecipes);
    const toggleRecipeSelection = useShoppingStore((s) => s.toggleRecipeSelection);

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
            case "difficulty": {
                const difficultyOrder = {Easy: 0, Medium: 1, Hard: 2};
                result.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
                break;
            }
            case "favorites":
                result.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite));
                break;
        }

        return result;
    }, [recipes, debouncedSearch, cuisine, difficulty, favoritesOnly, maxTime, tags, sortBy]);

    return (
        <div className="mx-0 px-8 md:px-40 py-8">
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
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        selected={selectedRecipes.includes(recipe.id)}
                        onSelect={() => toggleRecipeSelection(recipe.id)}
                    />
                ))}
            </div>

            {filteredRecipes.length === 0 && (
                <div className="mt-6 text-center">
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        🍳 No recipes found. Try another search or adjust filters.
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 mt-2 text-sm">
                        You can create a new recipe using the <span
                        className="font-semibold">+ Create Recipe</span> button above.
                    </p>
                </div>
            )}
        </div>
    );
}