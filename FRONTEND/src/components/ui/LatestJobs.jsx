import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';



const LatestJobs = () => {
  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className='w-full '>
      <div className=' mt-10 '>
        <p className='text-2xl ml-14 font-bold text-[#155DFC]'>Latest & Top Jobs For You...</p>
        </div>
        <div className=' flex flex-col md:flex-row  m-5 flex-wrap gap-5 justify-center  '>
            {
               allJobs.length &&  allJobs.map((jobs)=><LatestJobCard key={jobs._id} jobs={jobs}  />)
            }

      </div>
      <p className='text-blue-800 font-bold text-center mb-5'>Term and condition apply #</p>
    </div>
  )
}

export default LatestJobs
