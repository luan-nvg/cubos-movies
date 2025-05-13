import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/pages/Login"
import { Register } from "@/pages/Register"
import DefaultLayout from "@/layout/DefaultLayout"

import { PageNotFound } from "@/pages/PageNotFound"

import Movies from "@/pages/Movies"
import MoviesDetail from "@/pages/MoviesDetail"

import PrivateRoute from "@/components/PrivateRoute"

// import path from 'path'

const routes = [
  {
    path: "login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <Register />
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Movies />
          },

          {
            path: "*",
            element: <PageNotFound />
          },
          {
            path: "movies",
            element: <Movies />
          },
          {
            path: "movies-detail",
            element: <MoviesDetail />
          }
        ]
      },
      {
        path: "*",
        element: <PageNotFound />
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
