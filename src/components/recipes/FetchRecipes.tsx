
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Recipe } from '../../modouls/recipes';

export const GetRecipes = createAsyncThunk('recipes/get', async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:3000/api/recipes")
        console.log("get");
        console.log(response.data);
        
        return response.data as Recipe[]

    } catch (e) {
        console.log("errorGet");

        return thunkAPI.rejectWithValue(e)
    }
})

export const PostRecipes = createAsyncThunk('recipes/post', async (newRecipe:Recipe, thunkAPI) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/recipes`,newRecipe)
        console.log("post");

        return response.data
    } catch (e) {
        console.log("errorPost");

        return thunkAPI.rejectWithValue(e);
    }
})

export const recipesSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [] as Recipe[],
        loading: false,
        error: ' '
    },
    reducers: {
       
    },
    extraReducers: (builder) => {
        builder
            .addCase(GetRecipes.pending, (state) => {
                state.loading = true;
                state.error = ''
                console.log("111");
                
            })
            .addCase(GetRecipes.fulfilled, (state, action: PayloadAction<Recipe[]>) => {
                state.recipes = action.payload
                console.log("222");
            })
            .addCase(GetRecipes.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
                console.log("333");

            })
            .addCase(PostRecipes.pending, (state) => {
                state.loading = true;
                state.error = ''
            })
            .addCase(PostRecipes.fulfilled, (state, action: PayloadAction<Recipe>) => {
                state.loading = false;
                state.error=''
                if (action.payload) { // בדוק אם payload הוא לא null
                    state.recipes.push(action.payload);
                }            })
            .addCase(PostRecipes.rejected, (state, action) => {
                state.error = action.error.message || 'Fail To Fetch Recipes'
            })
    }
})



