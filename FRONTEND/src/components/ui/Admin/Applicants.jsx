import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { MoreHorizontal } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const status = ["rejected", "accepted"];

const Applicants = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const url = import.meta.env.VITE_appli_endpoint;
  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const response = await axios.get(`${url}/getapplicants/${id}`, {
          withCredentials: true,
        });

        if (response.data.success) {
          // console.log(response.data.applicants.applications);
          setApplicants(response.data.applicants.applications);
          // console.log(applicants);
        }
      } catch (error) {
        console.log(error);
        toast.error("No applicants");
      }
    };
    fetchApplicants();
  }, [id]);

  const updateStatus = async(status,id)=>{
    try {
       
        const response = await axios.post(`${url}/updateStatus/${id}`,{status},{
            withCredentials:true
        });
       
        // console.log(response)
        // console.log(url)
         if(response?.data?.success){

            toast.success("Status Updated");
           
         }
        
    } catch (error) {
        console.log(error);
        toast.error("error")
        
    }

  }





  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto border-2 mt-4 p-5">
        <div className="grid grid-cols-6 gap-5 ">
          <p className="font-medium ">FullName</p>
          <p className="font-medium ">Email</p>
          <p className="font-medium ">Contact</p>
          <p className="font-medium ">Date</p>
          <p className="font-medium ">Resume</p>
          <p className="font-medium ">Action</p>

          {/* {
                    <p>{applicants[0]?.applicant?.email}</p>
                } */}

          {applicants?.map((item, index) => ( <>
            <p className="font-medium text-blue-600 ">{item.applicant.fullName}</p>
          <p className="font-medium text-blue-600 ">{item.applicant.email}</p>
          <p className="font-medium text-blue-600 ">{item.applicant.phoneNumber}</p>
          <p className="font-medium text-blue-600 ">{item.applicant.createdAt.split("T")[0]          }</p>
             {
                item.applicant?.profile?.resume ?  <a href={item.applicant.profile.resume} target="_blank" className="font-medium hover:underline text-blue-600">Resume</a> : <p className="font-medium  text-red-600">NA</p>
             }
         

          <div>
            <Popover>
              <PopoverTrigger>
                <MoreHorizontal />
              </PopoverTrigger>
              <PopoverContent className="flex flex-col font-medium">
                {status?.map((status) => (
                  <span 
                  onClick={()=>updateStatus(status,item._id)}
                    key={status}
                    className="cursor-pointer hover:text-blue-500"
                  >
                    {status}
                  </span>
                ))}
              </PopoverContent>
            </Popover>
          </div>

             </>
          ))}

          
        </div>
      </div>
    </div>
  );
};

export default Applicants;
