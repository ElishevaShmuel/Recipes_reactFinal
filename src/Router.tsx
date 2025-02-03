import {createBrowserRouter} from "react-router"
import Home from "./components/bar/Home"
import About from "./components/bar/About"
import AppLayout from "./components/bar/AppLayout"
import AddRecipe from "./components/recipes/AddRecipe"
import RecipesList from "./components/recipes/RecipesList"

export const myRouter = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <>main error</>,
        children: [
            { path: '/', element: <Home /> },
            { path: '/about', element: <About /> },
            { path: '/RecipesList', element: <RecipesList /> },
        
            { path: '/AddRecipe', element: <AddRecipe /> }
        ]
    }
])
