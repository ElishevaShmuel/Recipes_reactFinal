import { configureStore } from "@reduxjs/toolkit";
import { recipesSlice } from "../components/recipes/FetchRecipes";

const Store = configureStore({
    reducer: {
        recipes: recipesSlice.reducer,
   

    }
});
export default Store
export type AppDispatch = typeof Store.dispatch;