import { Button } from "@/components/ui/button"
import { createBrowserRouter } from "react-router-dom"
import Home from "./components/ui/Home"
import { RouterProvider } from "react-router";
import SignUp from "./components/ui/SignUp";
import Login from "./components/ui/Login";
import { ToastContainer, toast } from 'react-toastify';
import Jobs from "./components/ui/Jobs";
import Browse from "./components/ui/Browse";
import Profile from "./components/ui/Profile";
import JobDetail from "./components/ui/JobDetail";
import Companies from "./components/ui/Admin/Companies";
import CreateCompany from "./components/ui/Admin/CreateCompany";
import CompanyEdit from "./components/ui/Admin/CompanyEdit";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path:"/profile",
    element:<Profile/>
  }
  ,
  {
    path:"/Signup",
    element: <SignUp/>
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
    element: <Browse/>,
  },
  {
    path:"/job/detail/:id",
    element: <JobDetail/>
  },
  
  //admin

  {
    path:"/admin/companies",
    element:<Companies/>
  },
  {
    path:"/admin/company/create",
    element:<CreateCompany/>,
  },
  {
    path:"/admin/companies/edit/:id",
    element:<CompanyEdit/>
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







