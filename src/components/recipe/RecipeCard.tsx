import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useRecipeStore} from "@/features/recipes/store";
import ConfirmModal from "@/components/ui/ConfirmModal";
import type {Recipe} from "@/features/recipes/types";
import {useToast} from "@/context/useToast.ts";
import {FiEdit, FiTrash2, FiShoppingCart, FiCheck} from "react-icons/fi";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Heart from "@/components/ui/HeartButton.tsx";

interface RecipeCardProps {
    recipe: Recipe;
    selected?: boolean;
    onSelect?: () => void;
}

export default function RecipeCard({recipe, selected = false, onSelect}: RecipeCardProps) {
    const navigate = useNavigate();
    const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
    const {showToast} = useToast();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        deleteRecipe(recipe.id);
        showToast("Recipe deleted successfully");
        setIsModalOpen(false);
    };

    const handleToggleSelection = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onSelect) {
            onSelect();
            showToast(
                selected
                    ? `"${recipe.name}" removed from shopping selection`
                    : `"${recipe.name}" added to shopping selection`
            );
        }
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        navigate(`/edit/${recipe.id}`);
    };

    return (
        <>
            <div
                onClick={() => navigate(`/recipe/${recipe.id}`)}
                className="bg-surface rounded-xl shadow-md hover:shadow-lg transition relative overflow-hidden cursor-pointer flex flex-col"
            >
                <LazyLoadImage
                    src={recipe.image}
                    alt={recipe.name}
                    effect="blur"
                    placeholderSrc="/assets/images/placeholder.png"
                    className="h-40 w-full object-cover rounded-lg mb-3"
                />
                {recipe.isFavorite && <div className="absolute top-4 right-4">
                    <div className="hidden md:block">
                        <Heart favorite size={32}/>
                    </div>
                    <div className="block md:hidden">
                        <Heart favorite size={24}/>
                    </div>
                </div>}

                <div className="p-4 flex flex-col gap-2">
                    <h3 className="text-lg font-heading text-primary">{recipe.name}</h3>
                    <p className="text-sm text-secondary">
                        {recipe.cuisine} • {recipe.difficulty}
                    </p>

                    <div className="mt-3 flex flex-row justify-between gap-2">
                        <button
                            onClick={handleEdit}
                            className="flex items-center justify-center gap-2 w-fit p-2 rounded-md text-secondary
                                       hover:bg-secondary/10 transition-all transform hover:scale-105 hover:shadow-md"
                            title="Edit"
                        >
                            <FiEdit/> Edit
                        </button>

                        <button
                            onClick={handleToggleSelection}
                            className={`flex items-center w-fit m-auto px-4 py-2 rounded-lg font-medium transition hover:opacity-80  ${
                                selected
                                    ? "cursor-not-allowed bg-surface"
                                    : "hover:shadow-md bg-secondary"
                            }`}
                            title={selected ? "Selected" : "Add to Shopping"}
                        >
                            {selected ? (
                                <FiCheck/>
                            ) : (
                                <FiShoppingCart/>
                            )}
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                            className="flex items-center justify-center gap-2 w-auto p-2 rounded-md text-accent
                                       hover:bg-accent/10 transition-all transform hover:scale-105 hover:shadow-md"
                            title="Delete"
                        >
                            <FiTrash2/> Delete
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Recipe"
                description={`Are you sure you want to delete "${recipe.name}"?`}
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
}