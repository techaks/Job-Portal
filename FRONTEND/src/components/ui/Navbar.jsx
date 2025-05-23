import React from "react";
import { useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { setUser } from "@/redux/authSlice";
import { setAdminJobs, setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { setCompanies, setSingleCompany } from "@/redux/companySlice";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const logoutHandle = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_user_endpoint}/logout`
      );
      // console.log(res);
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
        dispatch(setUser(null));
        dispatch(setAllJobs([]));
        dispatch(setSingleJob(null))
        dispatch(setAdminJobs([]));
        dispatch(setCompanies([]))
        dispatch(setSingleCompany(null))
        localStorage.removeItem("token")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center border-b-2  md:px-8 mx-4 ">
        <div className="flex items-center">
          <img
            onClick={() => navigate("/")}
            className="w-12 h-12 cursor-pointer"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
            alt="logo"
          />
          <p className="text-[#00A5EC] font-bold md:px-2">JOBSY</p>
        </div>
        

        {user?.role === "student" ? (
          <div className="flex gap-1 items-center md:gap-3">
            <p
              onClick={() => navigate("/")}
              className="text-[#FF8C00] font-bold cursor-pointer"
            >
              Home
            </p>
            <p
              onClick={() => navigate("/jobs")}
              className="text-[#FF8C00] font-bold cursor-pointer"
            >
              Jobs
            </p>
            <p
              onClick={() => navigate("/browse")}
              className="text-[#FF8C00] font-bold cursor-pointer"
            >
              Browse
            </p>

            {user ? (
              <Popover>
                <PopoverTrigger aschild>
                  <img
                    className="cursor-pointer w-9 h-9 rounded-full "
                    src={`${user?.profile?.profilePhoto ? user.profile.profilePhoto :"https://cdn.apna.co/apna-learn/Support%20Icons/aicte-seeklogo.png"}`}
                    alt="logo"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 p-2">
                    <p className="font-bold ">{user?.fullName}</p>
                    {user?.role === "student" && (
                      <>
                        <p className="text-gray-600">
                          {user?.profile?.bio ? user?.profile?.bio : "NO BIO"}
                        </p>
                        <p
                          onClick={() => navigate("/profile")}
                          className="text-[#155dfc] font-bold cursor-pointer flex gap-3 items-center"
                        >
                          Profile{" "}
                          <span>
                            <User />
                          </span>
                        </p>
                      </>
                    )}

                    <p
                      onClick={logoutHandle}
                      className="text-[#da0d0d] flex gap-3 items-center font-bold cursor-pointer"
                    >
                      Logout{" "}
                      <span>
                        {" "}
                        <LogOut className="w-5 h-5" />
                      </span>
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <p
                  onClick={() => navigate("/login")}
                  className="text-[#ffffff] font-bold cursor-pointer bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211]"
                >
                  Login
                </p>
                <p
                  onClick={() => navigate("/signup")}
                  className="text-[#ffffff] font-bold cursor-pointer  bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211] "
                >
                  SignUp
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-1 items-center md:gap-3">
            <p
              onClick={() => navigate("/admin/jobs")}
              className="text-[#FF8C00] font-bold cursor-pointer"
            >
              Jobs
            </p>
            
            <p
              onClick={() => navigate("/admin/companies")}
              className="text-[#FF8C00] font-bold cursor-pointer"
            >
              Companies
            </p>
            

            {user ? (
              <Popover>
                <PopoverTrigger aschild>
                <img
                    className="cursor-pointer w-9 h-9 rounded-full "
                    src={`${user?.profile?.profilePhoto ? user.profile.profilePhoto :"https://cdn.apna.co/apna-learn/Support%20Icons/aicte-seeklogo.png"}`}
                    alt="logo"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2 p-2">
                    <p className="font-bold ">{user?.fullName}</p>
                    
                    <p
                      onClick={logoutHandle}
                      className="text-[#da0d0d] flex gap-3 items-center font-bold cursor-pointer"
                    >
                      Logout{" "}
                      <span>
                        {" "}
                        <LogOut className="w-5 h-5" />
                      </span>
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <p
                  onClick={() => navigate("/login")}
                  className="text-[#ffffff] font-bold cursor-pointer bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211]"
                >
                  Login
                </p>
                <p
                  onClick={() => navigate("/signup")}
                  className="text-[#ffffff] font-bold cursor-pointer  bg-[#1F8268] px-1 rounded-sm hover:bg-[#1F8211] "
                >
                  SignUp
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
