import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const useGetAllJobs = () => {
  const url = import.meta.env.VITE_job_endpoint;
  const dispatch = useDispatch();
  const { query } = useSelector((store) => store.job);

  // console.log(query);

  useEffect(() => {
    const getAllJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token)
        const response = await axios.get(`${url}/alljobs?keyword=${query}`, {
         headers:{
          Authorization:`Bearer ${token}`
         }
        });
        // console.log(response.data.success);
        if (response.data.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message);

        if (!error.response.data.success) {
          dispatch(setAllJobs([]));
        }
      }

      // setJobs(response.data.jobs)
    };
    getAllJobs();
  }, [dispatch, query]);
};

export default useGetAllJobs;
