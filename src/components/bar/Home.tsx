import { Box, Typography } from "@mui/material";
import RecipesList from "../recipes/RecipesList";

const Home = () => {
  return (
    <Box sx={{ paddingTop: "70px", backgroundColor: "#F2E0A9", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ textAlign: "center", color: "#77A672", marginBottom: "30px" }}>
        Welcome to Tasty
      </Typography>
  
    </Box>
  );
};

export default Home;
