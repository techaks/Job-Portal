import { Button } from "@/components/ui/button"
import { createBrowserRouter } from "react-router-dom"
import Home from "./components/ui/Home"
import { RouterProvider } from "react-router";
import SignUp from "./components/ui/SignUp";
import Login from "./components/ui/Login";
import { ToastContainer, toast } from 'react-toastify';
import Jobs from "./components/ui/Jobs";
import Browse from "./components/ui/Browse";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  
  {
    path:"/Signup",
    element: <SignUp/>,
  },
  {
    path:"/login",
    element: <Login/>,
  },
  {
    path:"/jobs",
    element: <Jobs/>
  },
  {
    path:"/browse",
    element: <Browse/>
  }

]);



const App = () => {
  return (<>
   <RouterProvider router={appRouter}/>
   <ToastContainer />
   </>
  )

}

export default App







