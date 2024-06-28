import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RecipeDetailsPage from "./components/pages/RecipeDetailsPage";
import LandingPage from "./components/pages/LandingPage";
import RecipeFormPage from "./components/pages/RecipeFormPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "recipe",
        errorElement: <div>404 Not Found</div>,
        children: [
          {
            path: "new",
            element: <RecipeFormPage />,
          },
          {
            path: ":id",
            element: <RecipeDetailsPage />,
          },
          {
            path: ":id/edit",
            element: <RecipeFormPage />,
          },
        ],
      },
      
      
    ],
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
