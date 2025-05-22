import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";

import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setAdminJobs } from "@/redux/jobSlice";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";


const AdminJobs = () => {
  const navigate = useNavigate();
  const [searchTerm,setsearchTerm] = useState('');
  const { adminJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const filteredJobs = adminJobs?.filter(job => {
    if (!searchTerm) return true; // return all if searchTerm is empty
  
    const term = searchTerm.toLowerCase();
  
    const titleMatch = job?.title?.toLowerCase().includes(term);
    const companyMatch = job?.company?.name?.toLowerCase().includes(term);
  
    return titleMatch || companyMatch;
  });

  console.log(filteredJobs);
  console.log('filteredjobs');

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = import.meta.env.VITE_job_endpoint;
        const res = await axios.get(`${url}/adminjob`, {
          withCredentials: true,
        });
        dispatch(setAdminJobs(res?.data.jobs))

        console.log(res);
        if (res.data.success) {
          
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };
    fetch();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-8 flex justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setsearchTerm(e.target.value)}
          placeholder="Filter Jobs"
          className="outline-blue-500 p-2 border-2 border-blue-300 rounded-md "
        />

        <button
          onClick={() => navigate("/admin/job/create")}
          className="bg-green-400 font-bold p-3 rounded-md hover:bg-green-500 cursor-pointer"
        >
          Create Job
        </button>
      </div>

      <div className="max-w-6xl mx-auto border-2 mt-5 p-5 grid grid-cols-4 bg-[#e7f0f0c9] rounded-lg ">
        <p className=" font-medium text-lg text-[#8a770b]">Company Name</p>
        <p className=" font-medium text-lg text-[#8a770b]">Role</p>
        <p className="font-medium text-lg text-[#8a770b]">Date</p>
        <p className=" text-lg font-medium text-[#900000]">Action</p>
        {filteredJobs?.map((job) => (
          <>
           
            <p className=" font-medium text-lg">{job.company.name}</p>
            <p className=" font-medium text-lg">{job.title}</p>
            <p className="font-medium text-lg ">
              {job?.createdAt?.split("T")[0]}
            </p>
            <Popover>
                <PopoverTrigger>
                 <MoreHorizontal className="hover:text-blue-500 cursor-pointer"/>
                </PopoverTrigger>
                <PopoverContent className="  ">
                    
                    <div onClick={()=>navigate(`/admin/job/${job._id}/applicants`)} className="flex font-bold gap-2 cursor-pointer hover:text-blue-500">
                        <Eye className="w-4"/>
                        <span >Aplicants</span>
                    </div>
                </PopoverContent>

            </Popover>

           

          </>
        ))}
        {/* {
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
              className=" w-7 h-7 rounded-full"
            ></img>
            <p className=" font-medium text-lg">google</p>
            <p className="font-medium text-lg ">19-10-2025</p>
            <p className="text-right text-lg font-medium ">
              <MoreHorizontal />g
            </p>
          </>
        } */}
      </div>
    </div>
  );
};

export default AdminJobs;
