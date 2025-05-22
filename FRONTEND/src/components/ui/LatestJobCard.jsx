
import React from 'react'
import { Badge } from './badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCard = ({jobs}) => {
  const navigate = useNavigate();
  return (
    <div onClick={()=>navigate(`/job/detail/${jobs?._id}`)} className='shadow-xl w-full md:w-[29%] p-4 rounded-md bg-[#dddfdf] cursor-pointer hover:bg-[#eaeeee]'>
      <div>
            <p className='font-bold text-xl'>{jobs?.company.name}</p>
            <p className='text-gray-600'>{jobs?.location}</p>
            <p className='font-bold text-[#FF8C00]'>{jobs?.title}</p>
            <p>{jobs?.description}</p>
            <div className='flex gap-2 items-center'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{jobs?.position} Position</Badge>
                <Badge className='text-green-500 font-bold' variant="ghost">{jobs?.jobType}</Badge>
                <Badge className='text-[#FF8C00] font-bold' variant="ghost">{jobs?.salary} Lpa</Badge>
            </div>
      </div>
      
    </div>
  )
}

export default LatestJobCard
