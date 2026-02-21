import type {FC} from "react";
import Select from "react-select";

type SortOptions = "recent" | "time" | "difficulty" | "favorites";

interface RecipeFiltersProps {
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
    return (
        <div className="mb-6 space-y-4">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, cuisine, or tags..."
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
            />

            <div className="flex flex-wrap gap-4 items-center">
                <select value={cuisine} onChange={(e) => setCuisine(e.target.value)} className="p-2 rounded-md border">
                    {availableCuisines.map((c) => (
                        <option key={c} value={c}>
                            {c === "all" ? "All Cuisines" : c}
                        </option>
                    ))}
                </select>

                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="p-2 rounded-md border">
                    <option value="all">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
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

                <input
                    type="number"
                    min={1}
                    placeholder="Max cooking time (min)"
                    value={maxTime ?? ""}
                    onChange={(e) => setMaxTime(e.target.value ? Number(e.target.value) : null)}
                    className="w-48 p-2 rounded-md border"
                />

                <div className="w-64">
                    <Select
                        isMulti
                        options={availableTags.map((t) => ({ value: t, label: t }))}
                        value={tags.map((t) => ({ value: t, label: t }))}
                        onChange={(selected) => setTags(selected.map((s) => s.value))}
                        placeholder="Filter by tags..."
                        className="text-sm"
                    />
                </div>

                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortOptions)} className="p-2 rounded-md border">
                    <option value="recent">Recently Added</option>
                    <option value="time">Cooking Time</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="favorites">Favorites</option>
                </select>
            </div>
        </div>
    );
};

export default RecipeFilters;
export type { SortOptions };