import type {FC} from "react";
import {useMemo} from "react";
import {useNavigate} from "react-router-dom";
import {ThemedSelect} from "@/components/ui/ThemedSelect";

type SortOptions = "recent" | "time" | "difficulty" | "favorites";

interface Option {
    value: string;
    label: string;
}

interface RecipeFiltersProps {
    recipes: { id: string; name: string }[];
    search: string;
    setSearch: (v: string) => void;
    cuisine: string;
    setCuisine: (v: string) => void;
    difficulty: string;
    setDifficulty: (v: string) => void;
    favoritesOnly: boolean;
    setFavoritesOnly: (v: boolean) => void;
    maxTime: number | null;
    setMaxTime: (v: number | null) => void;
    tags: string[];
    setTags: (v: string[]) => void;
    sortBy: SortOptions;
    setSortBy: (v: SortOptions) => void;
    availableCuisines: string[];
    availableTags: string[];
}

const RecipeFilters: FC<RecipeFiltersProps> = ({
                                                   recipes,
                                                   search,
                                                   setSearch,
                                                   cuisine,
                                                   setCuisine,
                                                   difficulty,
                                                   setDifficulty,
                                                   favoritesOnly,
                                                   setFavoritesOnly,
                                                   maxTime,
                                                   setMaxTime,
                                                   tags,
                                                   setTags,
                                                   sortBy,
                                                   setSortBy,
                                                   availableCuisines,
                                                   availableTags,
                                               }) => {
    const navigate = useNavigate();

    const recipeOptions = useMemo<Option[]>(
        () =>
            recipes.map((r) => ({
                value: r.id,
                label: r.name,
            })),
        [recipes]
    );

    const cuisineOptions: Option[] = availableCuisines.map((c) => ({
        value: c,
        label: c === "all" ? "All Cuisines" : c,
    }));

    const difficultyOptions: Option[] = [
        {value: "all", label: "All Difficulties"},
        {value: "Easy", label: "Easy"},
        {value: "Medium", label: "Medium"},
        {value: "Hard", label: "Hard"},
    ];

    const sortOptions: Option[] = [
        {value: "recent", label: "Recently Added"},
        {value: "time", label: "Cooking Time"},
        {value: "difficulty", label: "Difficulty"},
        {value: "favorites", label: "Favorites"},
    ];

    const tagOptions: Option[] = availableTags.map((t) => ({
        value: t,
        label: t,
    }));

    const activeFiltersCount =
        (cuisine !== "all" ? 1 : 0) +
        (difficulty !== "all" ? 1 : 0) +
        (favoritesOnly ? 1 : 0) +
        (maxTime ? 1 : 0) +
        (tags.length ? 1 : 0) +
        (sortBy !== "recent" ? 1 : 0); // include sort in active filters

    const clearFilters = () => {
        setCuisine("all");
        setDifficulty("all");
        setFavoritesOnly(false);
        setMaxTime(null);
        setTags([]);
        setSortBy("recent");
    };

    const filterComponents = (
        <>
            <ThemedSelect<Option>
                options={cuisineOptions}
                value={cuisineOptions.find((opt) => opt.value === cuisine) || null}
                onChange={(selected) => setCuisine(selected?.value || "all")}
            />

            <ThemedSelect<Option>
                options={difficultyOptions}
                value={
                    difficultyOptions.find((opt) => opt.value === difficulty) || null
                }
                onChange={(selected) => setDifficulty(selected?.value || "all")}
            />

            <button
                onClick={() => setFavoritesOnly(!favoritesOnly)}
                className={`themed-button ${favoritesOnly ? "active" : ""}`}
            >
                ❤️ Favorites
            </button>

            <input
                type="number"
                min={1}
                placeholder="Max cooking time (min)"
                value={maxTime ?? ""}
                onChange={(e) =>
                    setMaxTime(e.target.value ? Number(e.target.value) : null)
                }
                className="themed-input"
            />

            <ThemedSelect<Option, true>
                isMulti
                options={tagOptions}
                value={tagOptions.filter((opt) => tags.includes(opt.value))}
                onChange={(selected) => setTags(selected.map((s) => s.value))}
                placeholder="Filter by tags..."
            />

            <ThemedSelect<Option>
                options={sortOptions}
                value={sortOptions.find((opt) => opt.value === sortBy) || null}
                onChange={(selected) => setSortBy(selected?.value as SortOptions)}
            />
        </>
    );

    return (
        <div className="surface mb-8 animate-fade-in-up">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    {activeFiltersCount > 0 && (
                        <span className="badge bg-accent text-background animate-pulse">
              {activeFiltersCount} active
            </span>
                    )}
                </div>

                <button
                    onClick={clearFilters}
                    className="text-sm text-accent"
                >
                    Clear filters
                </button>
            </div>

            {/* Search */}
            <div className="mb-6">
                <ThemedSelect<Option>
                    options={recipeOptions}
                    value={null}
                    inputValue={search}
                    onInputChange={(input) => setSearch(input)}
                    onChange={(selected) => {
                        if (selected) navigate(`/recipe/${selected.value}`);
                    }}
                    isClearable
                    placeholder="Search recipes by name..."
                />
            </div>

            <div className="mt-2">
                <details className="sm:hidden">
                    <summary className="font-medium cursor-pointer mb-2 text-accent">Filters</summary>
                    <div className="grid grid-cols-1 gap-4">{filterComponents}</div>
                </details>

                <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filterComponents}
                </div>
            </div>
        </div>
    );
};

export default RecipeFilters;
export type {SortOptions};