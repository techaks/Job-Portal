import React, { useEffect, useState } from "react";
import { Badge } from "./badge";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetail = () => {
  const { user } = useSelector((store) => store.user);
  const [loading, setloading] = useState(false);
  const params = useParams();
  const jobId = params.id;
  //   console.log(jobId)
 

  const dispatch = useDispatch();

  const { singleJob } = useSelector((store) => store.job);
  const url = import.meta.env.VITE_job_endpoint;
  const applyUrl = import.meta.env.VITE_appli_endpoint;

  console.log(singleJob);

  const isApplied =
    user?._id &&
    Array.isArray(singleJob?.applications) &&
    singleJob.applications.some(
      (application) => application?.applicant === user._id
    );
  console.log(isApplied);

  console.log(user?._id);

  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const response = await axios.get(`${url}/jobbyid/${jobId}`, {
          withCredentials: true,
        });
        console.log(response.data.job);
        if (response.data.success) {
          dispatch(setSingleJob(response.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    getJobDetail();
    // setJobs(response.data.jobs)
  }, [dispatch, jobId, user?._id]);

  const applyJob = async () => {
    console.log("log")
    try {
        console.log("try");
      setloading(true);
      const response = await axios.post(`${applyUrl}/applyjob/${jobId}`,{}, 
        {
          withCredentials: true, 
        }
      );
      
     

      if (response) {
       
        toast.success(response.data.message);
        const jobRes = await axios.get(`${url}/jobbyid/${jobId}`, {
            withCredentials: true,
          });
          dispatch(setSingleJob(jobRes.data.job));
      }
    } catch (error) {
      console.log(error);
      
      toast.error(error.response.data.message);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="  border-2 border-gray-300 p-4 rounded-md shadow-lg mx-auto max-w-4xl my-5">
      <div className="flex justify-between ">
        <div>
          <p className="text-xl font-medium p-4">{singleJob?.title}</p>
          <Badge className="text-blue-700 font-bold m-1" variant="ghost">
            {singleJob?.position} position
          </Badge>
          <Badge className="text-green-500 font-bold m-1" variant="ghost">
            {singleJob?.jobType}
          </Badge>
          <Badge className="text-[#FF8C00] font-bold m-1" variant="ghost">
            {singleJob?.salary} Lpa
          </Badge>
        </div>
        <div>
          {isApplied ? (
            <button className="bg-[#c99548] cursor-not-allowed  text-white font-bold rounded-md px-4 py-2 mt-3">
              Applied{" "}
            </button>
          ) : (
            <button
              onClick={applyJob}
              className="bg-[#762c94] cursor-pointer hover:bg-[#5e366e]  text-white font-bold rounded-md px-4 py-2 mt-3"
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
      {loading && <div className="loader ml-auto"> </div>}

      <p className="text-gray-500 my-5 border-b-2">Job Description</p>

      <div>
        <p className="font-bold ">
          {" "}
          Role :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.title}
          </span>{" "}
        </p>
        <p className="font-bold ">
          {" "}
          Location :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.location}
          </span>{" "}
        </p>
        <p className="font-bold ">
          {" "}
          Description :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.description}
          </span>{" "}
        </p>

        <p className="font-bold ">
          {" "}
          Salary :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.title} LPA
          </span>{" "}
        </p>
        <p className="font-bold ">
          {" "}
          Applicant :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.applications?.length}
          </span>{" "}
        </p>
        <p className="font-bold ">
          {" "}
          Posted Date :{" "}
          <span className="font-medium text-gray-700 ml-3">
            {singleJob?.updatedAt.split("T")[0]}
          </span>{" "}
        </p>
      </div>
    </div>
  );
};

export default JobDetail;
