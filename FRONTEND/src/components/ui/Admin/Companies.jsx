import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { MoreHorizontal, MoreHorizontalIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCompanies } from "@/redux/companySlice";

const Companies = () => {
  const navigate = useNavigate();
  const [searchTerm,setsearchTerm] = useState('');
  const { companies } = useSelector((store) => store.company);
  const dispatch = useDispatch();
  
  const filteredCompanies = companies?.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredCompanies);
  console.log('filteredCompanies');

  useEffect(() => {
    const fetch = async () => {
      try {
        const url = import.meta.env.VITE_company_endpoint;
        const res = await axios.get(`${url}/get`, {
          withCredentials: true,
        });

        console.log(res);
        if (res.data.success) {
          dispatch(setCompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto mt-8 flex justify-between">
        <input
          type="text"
          value={searchTerm}
          onChange={(e)=>setsearchTerm(e.target.value)}
          placeholder="Filter Company"
          className="outline-blue-500 p-2 border-2 border-blue-300 rounded-md "
        />

        <button
          onClick={() => navigate("/admin/company/create")}
          className="bg-green-400 font-bold p-3 rounded-md hover:bg-green-500 cursor-pointer"
        >
          Create Company
        </button>
      </div>

      <div className="max-w-6xl mx-auto border-2 mt-5 p-5 grid grid-cols-4 bg-[#e7f0f0c9] rounded-lg">
        <p className=" font-medium text-lg text-[#8a770b]">Logo</p>
        <p className=" font-medium text-lg text-[#8a770b]">Company</p>
        <p className="font-medium text-lg text-[#8a770b]">Date</p>
        <p className="text-right text-lg font-medium text-[#900000]">Action</p>
        {filteredCompanies?.map((company) => (
          <>
            <img
              src={company.logo}
              className=" w-7 h-7 rounded-full m-2"
              alt="logo"
            ></img>
            <p className=" font-medium text-lg">{company.name}</p>
            <p className="font-medium text-lg ">
              {company?.createdAt?.split("T")[0]}
            </p>
            <p onClick={()=>navigate(`/admin/companies/edit/${company._id}`)} className="text-right text-lg font-medium cursor-pointer hover:text-blue-500 ">
              Edit
            </p>
          </>
        ))}
        {/* {
          <>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
              className=" w-7 h-7 rounded-full"
            ></img>
            <p className=" font-medium text-lg">google</p>
            <p className="font-medium text-lg ">19-10-2025</p>
            <p className="text-right text-lg font-medium ">
              <MoreHorizontal />g
            </p>
          </>
        } */}
      </div>
    </div>
  );
};

export default Companies;
