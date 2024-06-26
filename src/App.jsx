import Home from "./pages/home/Home";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Users from "./pages/users/Users";
import Toner_requests from "./pages/Toner requests/Toner_requests";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import "./styles/global.scss";
import User from "./pages/user/SingleObject";
import Toners from "./pages/toners/Toners";
import Printers from "./pages/printers/Printers";
import Locations from "./pages/locations/Locations";
import Departments from "./pages/departments/Departments";

import NotFound from "./components/not found/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Areyousure from "./components/are you sure/Areyousure";
import Add from "./components/add/Add";
import Single from "./components/single/Single";

const queryClient = new QueryClient();

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <QueryClientProvider client={queryClient}>
              <Outlet />
            </QueryClientProvider>
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "/toners",
          element: <Toners />,
        },

        {
          path: "/printers",
          element: <Printers />,
        },
        {
          path: "/toner_requests",
          element: <Toner_requests />,
        },
        {
          path: "/departments",
          element: <Departments />,
        },
        {
          path: "/locations",
          element: <Locations />,
        },
        {
          path: "/confirm",
          element: <Areyousure />,
        },
        {
          path: "/users/:id",
          element: <Single />,
        },
        {
          path: "/toner/:id",
          element: <Single />,
        },
        {
          path: "/department/:id",
          element: <Single />,
        },
        {
          path: "/toner_request/:id",
          element: <Single />,
        },
        {
          path: "/printer/:id",
          element: <Single />,
        },
        {
          path: "/location/:id",
          element: <Single />,
        },
        {
          path: "add",
          element: <Add />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
