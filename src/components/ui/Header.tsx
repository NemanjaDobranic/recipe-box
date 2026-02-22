import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useShoppingStore} from "@/features/recipes/store";
import {DarkModeToggle} from "@/components/ui/DarkModeToggle";
import {FaPlus, FaShoppingCart, FaBars} from "react-icons/fa";

export const Header = () => {
    const navigate = useNavigate();
    const selectedRecipes = useShoppingStore((s) => s.selectedRecipes);

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className="relative flex justify-between items-center px-8 md:px-40 py-4 shadow-md"
            style={{
                backgroundColor: "var(--color-background)",
                color: "var(--color-text)",
            }}
        >
            <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => navigate("/")}
            >
                <img
                    src="/assets/images/logo.ico"
                    alt="Recipe Box Logo"
                    className="w-12 h-12 rounded-full"
                    style={{
                        border: "2px solid var(--color-surface)",
                    }}
                />
                <div className="leading-tight">
                    <h1 className="text-xl md:text-2xl font-heading">
                        Recipe Box
                    </h1>
                    <span
                        className="text-xs md:text-sm"
                        style={{color: "var(--color-secondary)"}}
                    >
                        Cook With Confidence
                    </span>
                </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
                <button
                    onClick={() => navigate("/create")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-secondary hover:opacity-90 transition"
                >
                    <FaPlus/>
                    Create
                </button>

                <button
                    onClick={() => navigate("/shopping-list")}
                    disabled={selectedRecipes.length === 0}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                        selectedRecipes.length === 0
                            ? "cursor-not-allowed bg-surface opacity-70"
                            : "bg-secondary hover:opacity-90"
                    }`}
                >
                    <FaShoppingCart/>
                    ({selectedRecipes.length})
                </button>

                <DarkModeToggle/>
            </div>

            <div className="md:hidden flex items-center gap-3">
                <button
                    onClick={() => navigate("/shopping-list")}
                    disabled={selectedRecipes.length === 0}
                    className="relative p-2"
                >
                    <FaShoppingCart/>
                    {selectedRecipes.length > 0 && (
                        <span className="absolute -top-1 -right-1 text-xs bg-secondary text-white rounded-full px-1">
                            {selectedRecipes.length}
                        </span>
                    )}
                </button>

                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <FaBars/>
                </button>
            </div>

            {isMenuOpen && (
                <div
                    className="absolute top-full right-8 mt-4 p-5 rounded-lg shadow-lg flex flex-col gap-5 md:hidden z-50 bg-background dropdown-animate"
                >
                    <button
                        onClick={() => {
                            navigate("/create");
                            setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-secondary hover:opacity-90 transition"
                    >
                        <FaPlus/>
                        Create
                    </button>

                    <div className="mx-auto">
                        <DarkModeToggle/>
                    </div>
                </div>
            )}
        </header>
    );
};