import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import { Recipe } from "../../modouls/recipes";
import RecipesDetails from "./RecipesDetails";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetRecipes } from "./FetchRecipes";
import { AppDispatch } from "../../store/store";

export default function RecipesList() {
  const recipes = useSelector((state: any) => state.recipes.recipes);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(GetRecipes());
  }, [dispatch]);

  const [isShow, setIsShow] = useState(false);
  const [currentRecipes, setCurrentRecipes] = useState({} as Recipe);

  const handelClick = (r: Recipe) => {
    setIsShow(true);
    setCurrentRecipes(r);
  };

  if (!recipes || recipes.length === 0) {
    return (
      <Box sx={{ padding: "20px", textAlign: "center" }}>
        <Typography variant="h6" color="textSecondary">
          No recipes available.
        </Typography>
      </Box>
    );
  }

  const buttons = Array.isArray(recipes) ?
    recipes.map((recipe: Recipe) => (
      <Button
        key={recipe.Id}
        onClick={() => handelClick(recipe)}
        sx={{
          color: "white",
          backgroundColor: "#77A672",
          ":hover": { backgroundColor: "#5E8B5C" },
          marginBottom: "10px",
          textTransform: "none",
          borderRadius: "10px",
          padding: "10px 20px",
        }}
      >
        {recipe.title}
      </Button>
    )) : null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px", backgroundColor: "#F2E0A9", borderRadius: "8px" }}>
      <Typography variant="h5" sx={{ marginBottom: "20px", color: "#77A672" }}>
        Recipes List
      </Typography>
      <ButtonGroup orientation="vertical" aria-label="Vertical button group" variant="text">
        {buttons}
      </ButtonGroup>
      {isShow && <RecipesDetails {...currentRecipes} />}
    </Box>
  );
}
