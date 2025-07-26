import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "../components/loading/loading.tsx";

const Admin = lazy(() => import("./admin/admin.tsx"))
const User = lazy(() => import("./user/user.tsx"))
const Home = lazy(() => import("./home/home.tsx"))
const Login = lazy(() => import("./login/login.tsx"))

const Routes = () => {
  return useRoutes([
    {
      path: "",
      element: <Suspense><Home/></Suspense>
    },
    {
      path: "admin",
      element: <Suspense><Admin/></Suspense>
    },
    {
      path: "user",
      element: <Suspense><User/></Suspense>
    },
    {
      path: "login",
      element: <Suspense><Login/></Suspense>
    }
  ])
}
export default Routes
