import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminCreateJob = () => {
  const { companies } = useSelector((store) => store.company);
  const navigate = useNavigate();
  const url = import.meta.env.VITE_job_endpoint;
  const [loading,setLoading] = useState(false)
  const [input, setInput] = useState({
    title: "",
    description: "",
    requiremenets: "",
    salary: 0,
    position: 0,
    location: "",
    companyId: "",
    jobType: "",
  });

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectHandler = (value) => {
    const selectCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );

    setInput({ ...input, companyId: selectCompany._id });
  };



  const createJob = async () => {
    console.log(input);
    try {
        setLoading(true)
      const response = await axios.post(`${url}/post`, input, {
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }finally{
        setLoading(false)
    }
  };



  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-2 w-[60%] mx-auto place-items-center mt-4">
        <div>
          <p className="font-bold mx-2 text-xl ">Title</p>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={changeHandler}
            placeholder="job title"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Description</p>
          <input
            type="text"
            name="description"
            value={input.description}
            onChange={changeHandler}
            placeholder="job title"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Requirements</p>
          <input
            type="text"
            name="requiremenets"
            value={input.requiremenets}
            onChange={changeHandler}
            placeholder="job title"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
          
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Salary (CTC)</p>
          <input
            type="number"
            name="salary"
            value={input.salary}
            onChange={changeHandler}
            placeholder="job ctc"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">No of Position</p>
          <input
            type="number"
            name="position"
            value={input.position}
            onChange={changeHandler}
            placeholder="total position"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Location</p>
          <input
            type="text"
            name="location"
            value={input.location}
            onChange={changeHandler}
            placeholder="job location"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Job Type</p>
          <input
            onChange={changeHandler}
            value={input.jobType}
            type="text"
            name="jobType"
            placeholder="job title"
            className="border-2 border-blue-700 rounded-md outline-blue-950 h-10 text-xl px-2 mb-6"
          />
        </div>
        <div>
          <p className="font-bold mx-2 text-xl ">Select company</p>
          <Select onValueChange={selectHandler}>
            <SelectTrigger className="w-[250px] border-2 font-bold mx-2 h-10  border-blue-700 rounded-md outline-blue-950 ">
              <SelectValue placeholder="choose" />
            </SelectTrigger>
            <SelectContent>
              {companies?.map((company) => {
                return (
                  <SelectItem value={company?.name.toLowerCase()}>
                    {company?.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className=" w-full flex justify-center ">
        {companies.length > 0 && (
          <button
            onClick={createJob}
            className="text-xl font-bold text-white bg-black px-6 cursor-pointer hover:text-blue-200 py-1 rounded-md"
          >
            CREATE NEW JOB
          </button>
        )}
      </div>
      {
        loading &&
        <div className="loader mx-auto"></div>
      }

      {companies.length <= 0 && (
        <p className="text-center text-red-500 font-bold">
          You have to register company before Job creation
        </p>
      )}
    </div>
  );
};

export default AdminCreateJob;
