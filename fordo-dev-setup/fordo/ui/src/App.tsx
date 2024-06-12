
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailsPage from "./components/pages/RecipeDetailsPage";
import RecipeListPage from "./components/pages/RecipeListPage";
import RecipeFormPage from "./components/pages/RecipeFormPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RecipeListPage />,
  },
  {
    path: "/recipe/new",
    element: <RecipeFormPage />,
  },
  {
    path: "/recipe/:id",
    element: <RecipeDetailsPage />,
  },
  {
    path: "/recipe/:id/edit",
    element: <RecipeFormPage />,
  },
]);

function App() {
  // console.log(process.env.API_BASE_URL, process.env.API_PORT)
  console.log(import.meta.env.VITE_API_BASEURL, import.meta.env.VITE_API_PORT);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
