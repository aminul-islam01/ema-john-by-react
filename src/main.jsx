import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Shop from './Components/Shop/Shop';
import Orders from './Components/Orders/Orders';
import Inventory from './Components/Inventory/Inventory';
import Login from './Components/Login/Login';
import cartProductsLoader from './CartProductsLoader/cartProductsLoader';
import Checkout from './Components/Checkout/Checkout';
import App from './App';
import AuthProviders from './Providers/AuthProviders';
import SignUp from './Components/SignUp/SignUp';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/totalProducts')
      },
      {
        path: "/orders",
        element: <Orders></Orders>,
        loader: cartProductsLoader
      },
      {
        path: "inventory",
        element: <Inventory></Inventory>
      },
      {
        path: "checkout",
        element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
      },
      {
        path: "sign-up",
        element: <SignUp></SignUp>
      },
      {
        path: "login",
        element: <Login></Login>
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProviders>
      <RouterProvider router={router} />
    </AuthProviders>
  </React.StrictMode>,
)
