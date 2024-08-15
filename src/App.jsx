import { createBrowserRouter, RouterProvider } from "react-router-dom";

//pages
import Home from "./pages/home.jsx";
import Cart from "./pages/Cart.jsx";

//layouts
import RootLayout from "./layout/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage";

// componet
import Protect from "./components/Protect";

function App() {
  const user = true;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protect user={user}>
          <RootLayout />
        </Protect>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
      ],
    },
    {
      path: "/login",
      element: user,
    },
    {
      path: "/register",
      element: user,
    },
  ]);

  return <>{<RouterProvider router={routes} />}</>;
}

export default App;
