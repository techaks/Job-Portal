import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';



const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className='w-full ml-10 '>
      <div className='mx-10 mt-10 '>
        <p className='text-2xl font-bold text-[#155DFC]'>Latest & Top Jobs For You...</p>
        </div>
        <div className=' flex m-5 flex-wrap gap-5  items-center content-center '>
            {
               allJobs.length &&  allJobs.map((jobs)=><LatestJobCard key={jobs._id} jobs={jobs}  />)
            }
       
      </div>
    </div>
  )
}

export default LatestJobs
