import React from "react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    
  return (
    <div>
      <div className="flex justify-between items-center border-b-2  px-8 mx-4 ">
        <div className="flex items-center">
          <img
            className="h-12"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
            alt="logo"
          />
          <p className="text-[#00A5EC] font-bold px-2">JOBSY</p>
        </div>
        <div> 
          <input
            className=" border-2 border-[#1F8211] outline-none rounded-md px-2"
            type="text"
            placeholder="Search Jobs Here"
          />
          <button className="bg-blue-400 text-white font-bold rounded-md px-1 cursor-pointer m-1 hover:bg-blue-600">
            Search
          </button>
        </div>
        <div className="flex items-center gap-3">
          <p onClick={()=>navigate('/')} className="text-[#FF8C00] font-bold cursor-pointer">Home</p>
          <p onClick={()=>navigate('/jobs')} className="text-[#FF8C00] font-bold cursor-pointer">Jobs</p>
          <p onClick={()=>navigate('/browse')} className="text-[#FF8C00] font-bold cursor-pointer">Browse</p>
          <p onClick={()=>navigate('/login')} className="text-[#ffffff] font-bold cursor-pointer bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211]">
            Login
          </p>
          <p onClick={()=>navigate('/signup')}  className="text-[#ffffff] font-bold cursor-pointer  bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211] ">
            SignUp
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
