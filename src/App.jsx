import './App.css'

import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';

// <<<<<<< HEAD
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
    ]
  }
]);
// =======
// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="cardapio" element={<CardapioYupFormik />} />
//           <Route path="login" element={<Login />} />
//           <Route path="*" element={<NoPage />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// }
// >>>>>>> 3e5c9e048ef583b12c0d690aadc65765d8a1697a

export default Router;