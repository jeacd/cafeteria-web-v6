import './App.css'

import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Cardapio from './views/Cardapio';
import Login from './views/Login';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "cardapio",
        element: <Cardapio />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ]
  }
]);

export default Router;