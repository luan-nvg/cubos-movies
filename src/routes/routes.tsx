import { createBrowserRouter } from "react-router-dom"
import LoginPage from "@/pages/Login"
import { Register } from "@/pages/Register"
import DefaultLayout from "@/layout/DefaultLayout"
import { OnBoarding } from "@/pages/Onboarding"

import { PageNotFound } from "@/pages/PageNotFound"

import { Settings } from "@/pages/Settings"

import { RecoverPwd } from "@/pages/RecoverPwd"

import Boards from "@/pages/Boards/Boards"
import Movies from "@/pages/Movies"
import MoviesDetail from "@/pages/MoviesDetail"

import Aquacontrol from "@/pages/Aquacontrol"
import Boardcontrol from "@/pages/Boardcontrol"
import BoardsDetail from "@/pages/Boards/BoardsDetail"
import BoardDrive from "@/pages/Boards/BoardDrive"
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
    path: "recoverpwd",
    element: <RecoverPwd />
  },
  {
    element: <DefaultLayout />,
    children: [
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/",
            element: <Boards />
          },
          {
            path: "/aquacontrol",
            element: <Aquacontrol />
          },
          {
            path: "/boardcontrol",
            element: <Boardcontrol />
          },

          {
            path: "onboarding",
            element: <OnBoarding />
          },
          {
            path: "settings",
            element: <Settings />
          },
          // ERROR
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
          },
          {
            path: "boards",
            element: <Boards />
          },
          {
            path: "boards/detail/:id",
            element: <BoardsDetail />
          },
          {
            path: "drives",
            element: <BoardDrive />
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
