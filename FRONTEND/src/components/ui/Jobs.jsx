import React from "react";
import FilterCard from "./FilterCard";
import Navbar from "./Navbar";
import Job from "./Job";
import { useSelector } from "react-redux";

const jobs = [1, 2, 3, 4, 5, 6, 7, 8, 9,1, 2, 3, 4, 5, 6, 7, 8, 9];
const Jobs = () => {

  const {allJobs} = useSelector(store=>store.job)

  return (
    <div>
      <Navbar />

      <div className="m-10 flex gap-5 ">
        <div className="w-[15%] flex flex-col fixed ">
        <FilterCard />

        </div>
        
        <div className="w-full flex gap-4 flex-wrap ml-[15%] " >
          { allJobs && allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
