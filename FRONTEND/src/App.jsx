import { Button } from "@/components/ui/button"
import { createBrowserRouter } from "react-router-dom"
import Home from "./components/ui/Home"
import { RouterProvider } from "react-router";
import SignUp from "./components/ui/SignUp";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:"/Signup",
    element: <SignUp/>,
  }

]);



const App = () => {
  return (
   <RouterProvider router={appRouter}/>)
}

export default App







