
import React from 'react'
import { Badge } from './badge'

const LatestJobCard = () => {
  return (
    <div className='shadow-xl w-[29%] p-4 rounded-md bg-[#dddfdf]'>
      <div>
            <p className='font-bold text-xl'>Company Name</p>
            <p className='text-gray-600'>india</p>
            <p className='font-bold text-[#FF8C00]'>Job title</p>
            <p>desripton of company which post job </p>
            <div className='flex gap-2 items-center'>
                <Badge className='text-blue-700 font-bold' variant="ghost">12 position</Badge>
                <Badge className='text-green-500 font-bold' variant="ghost">Full Time</Badge>
                <Badge className='text-[#FF8C00] font-bold' variant="ghost">8 Lpa</Badge>
            </div>
      </div>
    </div>
  )
}

export default LatestJobCard
