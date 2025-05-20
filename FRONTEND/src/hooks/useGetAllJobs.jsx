import { setAllJobs } from '@/redux/jobSlice';
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

const useGetAllJobs = () => {
    const url  = import.meta.env.VITE_job_endpoint;
    const dispatch = useDispatch();

    useEffect(()=>{
        const getAllJobs = async () => {
           try {
            const response = await axios.get(`${url}/alljobs`,{
                withCredentials:true,
            })
            console.log(response.data.jobs);
            if(response.data.success){
                dispatch(setAllJobs(response.data.jobs))
            }
            
           } catch (error) {
            console.log(error);
            
           }
                // setJobs(response.data.jobs)
            
          
        }
getAllJobs();

    },[dispatch])
 

}

export default useGetAllJobs
