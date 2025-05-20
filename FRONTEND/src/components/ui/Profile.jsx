import React, { useState } from "react";
import Navbar from "./Navbar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./badge";
import AppliedJobs from "../AppliedJobs";
import { useSelector } from "react-redux";
import UpdateProfile from "./UpdateProfile";


const isresume = 30;
const Profile = () => {
    const {user}  = useSelector(store=>store.user);
    const [open, setOpen] = useState(false);
  return (
    <div>
      <Navbar />
      <div>
        <div className="mx-auto max-w-4xl border p-5 my-5 rounded-md">
          <div className="flex items-center gap-3">
            <img
              className="w-40 h-40"
              src={user?.profile?.profilePhoto ? user.profile.profilePhoto : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"} alt="img"
            />
            <div className="">
              <p className="font-medium text-xl ">{user?.fullName}</p>
              <p>
                {user?.profile.bio ?user?.profile.bio : "Update bio"}
              </p>
            </div>
            <div onClick={()=>setOpen(true)} className="cursor-pointer text-blue-600 hover:text-green-400 ml-auto p-3"><Pen/></div>
          </div>

          <div className=" my-5">

            <div className="flex gap-3" >
                <Mail/>
                <p>{user?.email}</p>
            </div>
            <div className="flex gap-3" >
                <Contact/>
                <p>{user?.phoneNumber}</p>
            </div>
 
            <div className="my-3 ">
                <p className="font-medium ">Skills</p>
                {
                    user?.profile.skills.length ? user.profile.skills.map((item,index)=> <Badge key={index} className=' font-bold mx-1 ' variant="">{item}</Badge>) :  <p className="font-medium text-red-500">No Skill</p>
                }
            </div>

            <div className="flex gap-3 items-center my-3">

                {
                   user?.profile?.resume ? <a href={user?.profile?.resume} target="_blank" className= "text-xl text-green-500 font-medium cursor-pointer hover:underline"> Resume </a> : <p className="text-red-500 font-medium"> No Resume</p>
                }
                 {
                  user?.profile?.resume && <img className="w-7 h-7 rounded-lg" src={user?.profile?.resume} alt="img" />
                 }
                

            </div>

          </div>

          
        </div>
        <div className="max-w-4xl mx-auto border rounded-md p-5">
            <p className="text-xl font-bold text-[#155dfc] mt-4">Applied Jobs</p>
            <AppliedJobs/>

          </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen}/>
    </div>
  );
};

export default Profile;
