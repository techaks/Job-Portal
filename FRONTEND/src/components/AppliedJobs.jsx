import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppliedJobs = () => {
  const navigate = useNavigate();
  const [appliedJobs,setAppliedJobs] = useState([])
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_appli_endpoint}/appliedjobs`,
          { withCredentials: true }
        );
        console.log(response.data.application);
        if (response.data.success) {
          
          setAppliedJobs(response?.data?.application)
        }
      } catch (error) {
        console.log(error);
        toast.error("No Applied job")
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 font-semibold mt-4 bg-gray-100 p-2 rounded text-[#ff8c00]">
        <p>Date</p>
        <p>Role</p>
        <p>Company</p>
        <p className=" mx-auto">Status</p>
      </div>

      {appliedJobs?.map((job, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 p-2 mt-2 font-medium"
        >
          <p>{job.createdAt.split("T")[0]}</p>
          <p>{job?.job?.title}</p>
          <p>{job.job?.company?.name}</p>

          <p
            className={`px-2 py-1 rounded text-white text-center ${
              job.status === "pending"
                ? "bg-yellow-500"
                : job.status === "accepted"
                ? "bg-green-600"
                : "bg-red-500"
            } `}
          >
            {job.status}
          </p>
        </div>
      ))}

      { !appliedJobs.length &&
        <p onClick={()=>navigate('/jobs')} className="text-red-500 font-bold text-center my-5 cursor-pointer hover:underline ">You have not apply in any job , apply fast....</p>
      }
    </div>
  );
};

export default AppliedJobs;
