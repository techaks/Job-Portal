import { Bookmark } from "lucide-react";
import { Badge } from './badge'
import React from "react";
import { Button } from "./button";

const Job = () => {
  return (
    <div className="w-[30%] shadow-xl p-4 rounded-md">
      <div>
        <div className="flex content-center justify-between">
          <p className="font-bold">5 days ago</p>

          <p className="cursor-pointer hover:bg-gray-200 rounded-full ">
            <Bookmark />
          </p>
        </div>

        <div className="flex gap-2 mt-2">
          <img
            className="w-8 h-8 rounded-full"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKQWcA-aoPsU-drPn8HcbWlGrZZhua5v-08w&s"
            alt=""
          />
          <div>
            <p className="text-[#FF9A00] font-bold">Company Name</p>
            <p>india</p>
          </div>
        </div>

        <p className="text-xl font-semibold">Title</p>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum labore, voluptatum.</p>

    <div className='flex gap-2 items-center'>
                <Badge className='text-blue-700 font-bold' variant="ghost">12 position</Badge>
                <Badge className='text-green-500 font-bold' variant="ghost">Full Time</Badge>
                <Badge className='text-[#FF8C00] font-bold' variant="ghost">8 Lpa</Badge>
            </div>

            <div className="flex gap-2 mt-4">

                <Button variant={"ghost"} className= "cursor-pointer bg-gray-400 font-bold mt-2 rounded-md px-4 py-2">
                    Detail
                </Button>
                      
                <Button variant={"ghost"} className="cursor-pointer bg-[#ff9a00] font-bold mt-2 rounded-md px-4 py-2">
                    Save Job
                </Button>
            </div>


      </div>
    </div>
  );
};

export default Job;
