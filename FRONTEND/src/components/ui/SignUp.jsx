import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "./Loader";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [input, setInput] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "student",
    file: "",
  });

  //    const changeHandler =(e)=>{
  //     setInput({ ...input, [e.target.name]: e.target.value });
  //    }
  const fileHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.files?.[0] });
  };

  const api = import.meta.env.VITE_user_endpoint;

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("fullName", input.fullName);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      console.log(formData);
      console.log(input);
         setLoading(true)
      const response = await axios.post(`${api}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(response);
      if (response.data.success) {
        setLoading(false)
        toast.success("User Created Successfully");
        navigate("/login");
        
      } else {
        setLoading(false)
        toast.error("error");
      }
    } catch (error) {
        setLoading(false)
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <p className="text-center font-extrabold text-green-700 mt-2 ">
        SignUp Form
      </p>
      <form onSubmit={submitHandler} action="">
        <div className="flex flex-col gap-3 w-[400px] mx-auto mt-2 mb-2 border-2 p-10">
          <label className="font-bold" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            id="fullName"
            value={input.fullName}
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            placeholder="Enter your full name"
            className="border-2 border-blue-500 outline-none rounded-md px-2"
          />
          <label className="font-bold" htmlFor="mobile">
            Mobile Number
          </label>
          <input
            type="number"
            name="phoneNumber"
            id="phoneNumber"
            value={input.phoneNumber}
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            placeholder="Enter your full name"
            className="no-spinner border-2 border-blue-500 outline-none rounded-md px-2"
          />
          <label className="font-bold" htmlFor="name">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            placeholder="Enter your Email"
            className="border-2 border-blue-500 outline-none rounded-md px-2"
          />
          <label className="font-bold" htmlFor="name">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={input.password}
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });
            }}
            placeholder="Enter secure password"
            className="border-2 border-blue-500 outline-none rounded-md px-2"
          />
          <RadioGroup defaultValue={input.role}>
            <div className="flex items-center space-x-2">
              <label htmlFor="student">Student</label>
              <input
                type="radio"
                name="role"
                id="student"
                value="student"
                onChange={(e) => {
                  setInput({ ...input, [e.target.name]: e.target.value });
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="recruiter">Recruiter</label>
              <input
                type="radio"
                name="role"
                id="recruiter"
                value="recruiter"
                onChange={(e) => {
                  setInput({ ...input, [e.target.name]: e.target.value });
                }}
              />
            </div>
          </RadioGroup>
          <label
            className="bg-amber-200 w-fit rounded-md font-bold cursor-pointer hover:bg-amber-100"
            htmlFor="file"
          >
            Upload profile photo
          </label>
          <input
            onChange={fileHandler}
            className="hidden"
            type="file"
            name="file"
            id="file"
          />
          {
          loading ? <>  <div className="loader flex item-center text-center mx-auto"></div></> :<>

          <button
            type="submit"
            className="bg-green-700 font-bold text-white text-xl "
          >
            SUBMIT
          </button>
          </>
}
          <p>
            Already have an account ?{" "}
            <span
              className="text-blue-700 font-bold cursor-pointer"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
