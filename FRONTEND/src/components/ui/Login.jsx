import React, { useState } from "react";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/authSlice.js";

const Login = () => {
  const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const api = import.meta.env.VITE_user_endpoint;
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "student",
    })
    const submitHandler = async (e) => {
        e.preventDefault();
       try {
        setLoading(true)
        const response = await axios.post(`${api}/login`,input,{
          withCredentials: true
        })
        // console.log(response);
        if(response.data.success){
            setLoading(false)
            toast.success("Login Successfully")
            console.log(response.data.user);
             dispatch(setUser(response.data.user))
            navigate('/')}
          

            else{
                setLoading(false)
                toast.error(response.data.message)
                console.log(response.data.message);
            }
            
            
            
        
       } catch (error) {
        console.log(error);
        setLoading(false)
        toast.error(error.response.data.message)
        
       }
    }
  return (
    <div>
      <p className="text-center font-extrabold text-green-700 mt-2 ">
        Login Form
      </p>
      <form onSubmit={submitHandler} action="">
        <div className="flex flex-col gap-3 w-[400px] mx-auto mt-2 mb-2 border-2 p-10">
        
          <label className="font-bold" htmlFor="name">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={input.email}
            onChange={(e) => {
              setInput({ ...input, [e.target.name]: e.target.value });}}
            

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
                      /></div>
                    </RadioGroup>
          

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

          <p>Don't have an account ?  <span className="text-blue-700 font-bold cursor-pointer" onClick={()=>{navigate('/signup')}}>Signup</span></p>
          
        </div>
      </form>
    </div>
  );
};

export default Login;
