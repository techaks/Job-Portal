import React from 'react'
import LatestJobCard from './LatestJobCard';

const jobs = [1,2,3,4,5,6,7,8,9];

const LatestJobs = () => {
  return (
    <div className='w-full ml-10 '>
      <div className='mx-10 mt-10 '>
        <p className='text-2xl font-bold text-[#155DFC]'>Latest & Top Jobs For You...</p>
        </div>
        <div className=' flex m-5 flex-wrap gap-5  items-center content-center '>
            {
                jobs.map(()=><LatestJobCard/>)
            }
       
      </div>
    </div>
  )
}

export default LatestJobs
