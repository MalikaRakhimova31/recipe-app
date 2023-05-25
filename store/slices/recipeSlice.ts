import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RecipeProps } from "@/types/types";

interface RecipeState {
  recipes: RecipeProps[];
}

const recipeSlice = createSlice({
  name: "my-recipe",
  initialState: {
    recipes: [],
  } as RecipeState,
  reducers: {
    addRecipe: (state, action: PayloadAction<RecipeProps>) => {
      const recipe = {
        ...action.payload,
        id: state.recipes.length + 1,
        image: action.payload.image,
      };
      state.recipes.push(recipe);
    },
    updateRecipe: (state, action: PayloadAction<RecipeProps>) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex(
        (recipe) => recipe.id === updatedRecipe.id
      );
      if (index !== -1) {
        state.recipes[index] = updatedRecipe;
      }
    },
    deleteRecipe: (state, action: PayloadAction<number>) => {
      const recipeId = action.payload;
      state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeId);
    },
  },
});

export const { addRecipe, updateRecipe, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
