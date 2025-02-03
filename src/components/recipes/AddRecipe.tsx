import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { PostRecipes } from "./FetchRecipes";
import { Recipe } from "../../modouls/recipes"; 
import { AppDispatch } from "../../store/store";
import { useState } from "react";
import { Box, Button, TextField, Typography, Container, IconButton, Grid } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

// הגדרת הסכימה של Yup
const schema = yup.object().shape({
    Id: yup.number().required("Id is required"),
    title: yup.string().required("Title is required"),
    description: yup.string().optional(),
    authorId: yup.number().required("Author ID is required"),
    ingredients: yup.array().of(yup.string()).optional(),
    instructions: yup.string().required("Instructions are required"),
});

function AddRecipe() {
    const dispatch = useDispatch<AppDispatch>();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Recipe>({
        resolver: yupResolver(schema),
    });

    const [ingredients, setIngredients] = useState<string[]>([""]); 

    const handleIngredientChange = (index: number, value: string) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    const addIngredientField = () => {
        setIngredients([...ingredients, ""]); 
    };

    const onSubmit = (data: Recipe) => {
        data.ingredients = ingredients.filter(ingredient => ingredient.trim() !== ""); 
        console.log("Submitting recipe:", data);
        dispatch(PostRecipes(data));
        reset(); 
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 5, mb: 5 }}>
            <Box sx={{ padding: 3, borderRadius: 2, boxShadow: 3, backgroundColor: "#F9F9F9" }}>
                <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold', color: '#77A672' }}>
                    Add a New Recipe
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* ID */}
                    <TextField
                        fullWidth
                        label="Recipe ID"
                        variant="outlined"
                        type="number"
                        {...register("Id")}
                        error={!!errors.Id}
                        helperText={errors.Id?.message}
                        sx={{ mb: 2 }}
                    />

                    {/* Title */}
                    <TextField
                        fullWidth
                        label="Title"
                        variant="outlined"
                        {...register("title")}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                        sx={{ mb: 2 }}
                    />

                    {/* Description */}
                    <TextField
                        fullWidth
                        label="Description"
                        variant="outlined"
                        {...register("description")}
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        sx={{ mb: 2 }}
                    />

                    {/* Author ID */}
                    <TextField
                        fullWidth
                        label="Author ID"
                        variant="outlined"
                        type="number"
                        {...register("authorId")}
                        error={!!errors.authorId}
                        helperText={errors.authorId?.message}
                        sx={{ mb: 2 }}
                    />

                    {/* Ingredients */}
                    <Typography variant="h6" sx={{ mb: 1, color: '#77A672' }}>
                        Ingredients
                    </Typography>
                    {ingredients.map((ingredient, index) => (
                        <Grid container spacing={1} key={index}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    value={ingredient}
                                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                                    placeholder={`Ingredient ${index + 1}`}
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton color="primary" onClick={addIngredientField}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    ))}
                    {errors.ingredients && <Typography color="error">{errors.ingredients.message}</Typography>}

                    {/* Instructions */}
                    <TextField
                        fullWidth
                        label="Instructions"
                        variant="outlined"
                        multiline
                        rows={4}
                        {...register("instructions")}
                        error={!!errors.instructions}
                        helperText={errors.instructions?.message}
                        sx={{ mb: 2 }}
                    />

                    {/* Submit Button */}
                    <Button type="submit" variant="contained" color="success" fullWidth sx={{ py: 2, backgroundColor: "#77A672", ":hover": { backgroundColor: "#5E8B5C" } }}>
                        Add Recipe
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default AddRecipe;
