import { createBrowserRouter } from "react-router-dom";
import Main_Layout from "../Layout/Main_Layout";
import Home from "../Components/Page/Home";
import Signup from "../UserAuthentication/Signup";
import Signin from "../UserAuthentication/Signin";
import Dashboard from "../Components/Page/Dashboard";
// import ShopDetails from "../Components/Page/ShopDetails";



export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/signin",
        element: <Signin />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
     
    ]
  },
  // {
  //   // Route to catch root path on subdomain
  //   path: "/",
  //   element: <ShopDetails />, // no layout wrapper, direct render ShopDetails
  // },
]);
