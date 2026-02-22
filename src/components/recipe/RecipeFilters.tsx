import type {FC} from "react";
import {useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ThemedSelect} from "@/components/ui/ThemedSelect";
import {FiChevronDown} from "react-icons/fi";

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
    const [filtersOpen, setFiltersOpen] = useState(false);

    const recipeOptions = useMemo<Option[]>(
        () => recipes.map((r) => ({value: r.id, label: r.name})),
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
        (tags.length ? 1 : 0);

    const clearFilters = () => {
        setCuisine("all");
        setDifficulty("all");
        setFavoritesOnly(false);
        setMaxTime(null);
        setTags([]);
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
        </>
    );

    return (
        <div className="surface mb-8 animate-fade-in-up">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
                <div className="flex-1">
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

                <div className="mt-2 sm:mt-0 sm:w-64">
                    <ThemedSelect<Option>
                        options={sortOptions}
                        value={sortOptions.find((opt) => opt.value === sortBy) || null}
                        onChange={(selected) => setSortBy(selected?.value as SortOptions)}
                        placeholder="Sort by..."
                    />
                </div>
            </div>

            <div className="flex flex-row sm:items-center justify-between mb-2 gap-2">
                <div className="flex flex-row items-center gap-2">
                    <button
                        className="bg-secondary flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium hover:opacity-90 hover:shadow-md transition"
                        onClick={() => setFiltersOpen(!filtersOpen)}
                    >
                        <span>Filters</span>
                        <FiChevronDown
                            className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}
                        />
                    </button>

                    {activeFiltersCount > 0 && (
                        <span className="flex items-center justify-center w-6 h-6 text-xs rounded-full bg-accent text-background">
                            {activeFiltersCount}
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

            {/* Filters section */}
            {filtersOpen && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {filterComponents}
                </div>
            )}
        </div>
    );
};

export default RecipeFilters;
export type {SortOptions};