import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "react-toastify";

const UpdateProfile = ({ open, setOpen }) => {
  const { user } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(0);
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullName: user?.fullName,
    
    bio: user?.profile?.bio,
    skills: user?.profile?.skills.map((skill) => skill),
    phoneNumber: user?.phoneNumber,
    resume: user?.profile?.resume,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(input);

    try {
      const formData = new FormData();
      formData.append("fullName", input.fullName);
      
      formData.append("bio", input.bio);
      formData.append("skills", input.skills);
      formData.append("phoneNumber", input.phoneNumber);
      formData.append("file", input.resume);
      
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `${import.meta.env.VITE_user_endpoint}/update-profile`,
        formData,
        {  headers:{
          Authorization:`Bearer ${token}`
         } }
      );

      // console.log(response);
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        setLoading(false);
        setOpen(false);
        toast.success("Profile Updated Successfully");
       
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating profile");
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          onInteractOutside={() => setOpen(false)}
          className="  bg-white rounded-lg shadow-lg  sm:max-w-[425px]"
        >
          <DialogHeader>
            <DialogTitle>Update Your Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-2 py-2">
              <div className="grid grid-cols-4 items-center gap-2  ">
                <p className="font-bold ">Name</p>
                <input
                  type="text"
                  id="name"
                  value={input?.fullName}
                  onChange={(e) =>
                    setInput({ ...input, fullName: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="border-2 border-gray-300 rounded-md w-fit h-[40px] outline-none px-2 mt-2"
                />
              </div>
             
              <div className="grid grid-cols-4 items-center gap-2  ">
                <p className="font-bold ">Bio</p>
                <input
                  type="text"
                  id="bio"
                  value={input?.bio}
                  onChange={(e) => setInput({ ...input, bio: e.target.value })}
                  placeholder="Enter your bio"
                  className="border-2 border-gray-300 rounded-md w-fit h-[40px] outline-none px-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2  ">
                <p className="font-bold ">Skills</p>
                <input
                  type="text"
                  id="name"
                  value={input?.skills}
                  onChange={(e) =>
                    setInput({ ...input, skills: e.target.value })
                  }
                  placeholder="Enter your skills"
                  className="border-2 border-gray-300 rounded-md w-fit h-[40px] outline-none px-2 mt-2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2  ">
                <p className="font-bold ">Mobile</p>
                <input
                  type="Number"
                  id="name"
                  value={input?.phoneNumber}
                  onChange={(e) =>
                    setInput({ ...input, phoneNumber: e.target.value })
                  }
                  placeholder="Enter your number"
                  className="border-2 border-gray-300 rounded-md w-fit h-[40px] outline-none px-2 mt-2   "
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-2  ">
                <label htmlFor="file" className="font-bold hover:underline hover:cursor-pointer">Update Resume</label>
                <input
                  type="file"
                  id="file"
                  // accept="application"
                  // value={input?.resume}
                  onChange={(e) =>
                    setInput({ ...input, resume: e.target.files[0] })
                  }
                  placeholder="Enter your skills"
                  className=" hidden border-2 border-gray-300 rounded-md w-fit h-[40px] outline-none px-2 mt-2"
                />
              </div>
            </div>
            <DialogFooter>
              <button
                type="submit"
                onClick={() => handleSubmit}
                className={`bg-green-700  font-bold text-white text-xl w-full h-[40px] rounded-md mt-4 cursor-pointer hover:bg-green-800 ${
                  loading
                    ? " hover:cursor-not-allowed pointer-events-none bg-green-500 "
                    : " not-first:"
                }`}
              >
                UPDATE
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
