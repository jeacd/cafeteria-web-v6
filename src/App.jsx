import './App.css'

import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';
import ClienteForm from './views/ClienteForm';

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
        element: <CardapioYupFormik />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "clientes",
        element: <ClienteForm />,
      },
    ]
  }
]);

export default Router;