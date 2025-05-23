import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { SkipBackIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import useGetCompanyById from "./useGetCompanyById";

const CompanyEdit = () => {
    const { id } = useParams();
    useGetCompanyById(id);
  const naviagte = useNavigate();
  const [loading, setLoading] = useState(false);

 


//   useGetCompanyById(id);

  const { singleCompany } = useSelector((store) => store.company);

  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    website: "",
    logo: null,
    location: "",
    description: "",
  });

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        website: singleCompany.website || "",
        logo: singleCompany.logo || null,
        location: singleCompany.location || "",
        description: singleCompany.description || "",
      });
    }
  }, [singleCompany]);
  
  
  const inputHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const fileHandle = (e) => {
    const logo = e.target.files?.[0];
    setInput({ ...input, logo });
  };

  const updateHandle = async () => {
    try {
      const formdata = new FormData();
      formdata.append("name", input.name);
      formdata.append("description", input.description);
      formdata.append("location", input.location);
      formdata.append("website", input.website);

      if (input.logo) {
        formdata.append("file", input.logo);
      }

      //   console.log(formdata);
      setLoading(true);
      const url = import.meta.env.VITE_company_endpoint;
      const token = localStorage.getItem("token")
      const res = await axios.put(`${url}/update/${id}`, formdata, {
        headers:{
          Authorization:`Bearer ${token}`
         }
      });

      // console.log(res);
      if (res.data.success) {
        toast.success("company updated");
        dispatch(setSingleCompany(res.data.company));
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error..");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <form action="">
        <div
          onClick={() => naviagte("/admin/companies")}
          className="flex gap-2 max-w-4xl mx-auto mt-10  font-bold cursor-pointer"
        >
          <p>
            <SkipBackIcon />
          </p>
          <p>Back</p>
        </div>
        <div className="max-w-4xl mx-auto border rounded-xl grid grid-cols-2 p-10">
          <div className="m-3">
            <p className="font-bold ">Company Name</p>
            <input
              name="name"
              value={input?.name}
              onChange={inputHandle}
              className="border-2 border-blue-400 rounded-md outline-blue-600 p-1"
              type="text"
              placeholder="company name"
            />
          </div>
          <div className="m-3">
            <p className="font-bold ">Description </p>
            <input
              name="description"
              value={input?.description}
              onChange={inputHandle}
              className="border-2 border-blue-400 rounded-md outline-blue-600 p-1"
              type="text"
              placeholder="Description"
            />
          </div>
          <div className="m-3">
            <p className="font-bold ">Website</p>
            <input
              name="website"
              value={input?.website}
              onChange={inputHandle}
              className="border-2 border-blue-400 rounded-md outline-blue-600 p-1"
              type="text"
              placeholder="url"
            />
          </div>
          <div className="m-3">
            <p className="font-bold ">Company Location</p>
            <input
              name="location"
              value={input?.location}
              onChange={inputHandle}
              className="border-2 border-blue-400 rounded-md outline-blue-600 p-1"
              type="text"
              placeholder="location"
            />
          </div>
          <div className="m-3">
            <p className="font-bold ">Company Logo</p>
            <input
              name="logo"
              onChange={fileHandle}
         
              className="border-2 border-blue-400 rounded-md p-1"
              type="file"
              accept="image/*"
            />
          </div>
        </div>
      </form>
      <button
        onClick={updateHandle}
        className="w-1/3 h-9 mt-2 rounded-md cursor-pointer hover:bg-[#1b1b1b] block text-white  font-bold mx-auto bg-black"
      >
        Update
      </button>
      {loading && <div className="loader mx-auto mt-2 "></div>}
    </div>
  );
};

export default CompanyEdit;
