import React, { useEffect, useState } from "react";
import FilterCard from "./FilterCard";
import Navbar from "./Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "@/redux/jobSlice";


const Jobs = () => {

  const {allJobs,query} = useSelector(store=>store.job);
  const [filterJobs,setFilterJobs] = useState(allJobs)
  const dispatch = useDispatch()
  
  useEffect(()=>{
    if(query){
      const filter = allJobs.filter((job)=>{
           return job.title.toLowerCase().includes(query.toLowerCase())  ||
           job.description.toLowerCase().includes(query.toLowerCase()) ||
           job.location.toLowerCase().includes(query.toLowerCase()) ||
           job?.salary?.toString().includes(query) 

      })
      setFilterJobs(filter)

    }else{
      setFilterJobs(allJobs)
    }


  },[allJobs,query])

 useEffect(() => {
    return () => dispatch(setQuery(""));
  }, []);

  return (
    <div>
      <Navbar />

{/* //fixed  15*/}

      <div className=" m-2 md:m-10 flex flex-row gap-5 ">
        <div className="w-[15%] flex flex-col md:fixed "> 
        <FilterCard />

        </div>
        
        
        <div className="w-full flex gap-4 flex-wrap md:ml-[15%] " >
        {
          filterJobs.length == 0 && <p className="text-red-500 font-bold text-xl item-center w-full">NO JOBS FOUND</p>
        }
          { filterJobs && filterJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
