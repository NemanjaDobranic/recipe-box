import type {FC} from "react";

interface RecipeFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    cuisine: string;
    setCuisine: (value: string) => void;
    difficulty: string;
    setDifficulty: (value: string) => void;
    favoritesOnly: boolean;
    setFavoritesOnly: (value: boolean) => void;
    availableCuisines: string[];
}

const RecipeFilters: FC<RecipeFiltersProps> = ({
                                                   search,
                                                   setSearch,
                                                   cuisine,
                                                   setCuisine,
                                                   difficulty,
                                                   setDifficulty,
                                                   favoritesOnly,
                                                   setFavoritesOnly,
                                                   availableCuisines,
                                               }) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, cuisine, or tags..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 mb-4"
            />

            <div className="flex flex-wrap gap-4">
                <select
                    value={cuisine}
                    onChange={(e) => setCuisine(e.target.value)}
                    className="p-2 rounded-md border"
                >
                    {availableCuisines.map((c) => (
                        <option key={c} value={c}>
                            {c === "all" ? "All Cuisines" : c}
                        </option>
                    ))}
                </select>

                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="p-2 rounded-md border"
                >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={favoritesOnly}
                        onChange={() => setFavoritesOnly(!favoritesOnly)}
                        className="accent-red-500"
                    />
                    Favorites Only
                </label>
            </div>
        </div>
    );
};

export default RecipeFilters;
