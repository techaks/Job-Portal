import React, { useState } from "react";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CreateCompany = () => {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(false);
  const[name,setName] = useState()
  
  const dispatch = useDispatch();

  const createCompany = async () => {
   
    
    try {
        setLoading(true)
        const token = localStorage.getItem("token")
        const apiUrl = import.meta.env.VITE_company_endpoint;
        const response = await axios.post(`${apiUrl}/register`,{name},{
          headers:{
            Authorization:`Bearer ${token}`
           }
        })
        //  console.log(response);
        if(response.data.success){
            toast.success(response.data.message);
            dispatch(setSingleCompany(response.data.company));

            const id = response?.data?.company?._id
            navigate(`/admin/companies/edit/${id}`);


        }



        
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        
    }finally{
        setLoading(false)
    }

  };

  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto border mt-5 p-5 rounded-md">
        
          <p className="text-2xl font-bold ">Create Your Company</p>
          <p className="text-gray-700 font-light ">
            All trademarks are the property of their respective owners
          </p>

          <p className="mt-5 font-medium text-blue-600">Company Name</p>
          <input
          onChange={(e)=>setName(e.target.value)}
            className="w-[50%] h-12 px-3 text-xl border-2 rounded-md border-black"
            type="text"
            placeholder="enter your company name"
          />
        
        <div className="mt-3 p-5">
          <button
            onClick={() => navigate("/admin/companies")}
            className="px-3 py-2 text-xl font-bold text-white bg-red-500 rounded-2xl hover:bg-red-600 cursor-pointer mr-4"
          >
            CANCEL
          </button>

          <button
            onClick={createCompany}
            className="px-3 py-2 text-xl font-bold text-white bg-green-500 rounded-2xl hover:bg-green-600 cursor-pointer"
          >
            CREATE
          </button>
{
    loading && <div className="loader ml-10 mt-3" ></div>
}
          
          
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
