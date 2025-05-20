import { Bookmark } from "lucide-react";
import { Badge } from './badge'
import React from "react";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";


const Job = ({job}) => {
  const navigate = useNavigate();
  
 

  const getDaysAgo = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
  
    // Difference in milliseconds
    const diffInMs = currentDate - createdDate;
  
    // Convert milliseconds to days
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
    return diffInDays;
  };
 
  const day = getDaysAgo(job?.createdAt) 
  
  

  return (
    <div className="w-[30%] shadow-xl p-4 rounded-md">
      <div>
        <div className="flex content-center justify-between">
          <p className="font-bold"> {`${day ? `${day} days ago` : "Today "} `}  </p>

          <p className="cursor-pointer hover:bg-gray-200 rounded-full ">
            <Bookmark />
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
            alt=""
          />
          <div>
            <p className="text-[#FF9A00] font-bold">{job?.company?.name}</p>
            <p>{job?.location}</p>
          </div>
        </div>

        <p className="text-xl font-semibold">{job?.title}</p>
    <p>{job?.description}</p>

    <div className='flex gap-2 items-center'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Position</Badge>
                <Badge className='text-green-500 font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#FF8C00] font-bold' variant="ghost">{job?.salary} Lpa</Badge>
            </div>

            <div className="flex gap-2 mt-4">

                <Button onClick={()=>navigate(`/job/detail/${job?._id}`)} variant={"ghost"} className= "cursor-pointer bg-gray-400 font-bold mt-2 rounded-md px-4 py-2">
                    Detail
                </Button>
                      
                <Button variant={"ghost"} className="cursor-pointer bg-[#ff9a00] font-bold mt-2 rounded-md px-4 py-2">
                    Save Job
                </Button>
            </div>


      </div>
    </div>
  );
};

export default Job;
