import React, { useEffect } from 'react'
import Job from './Job'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { setQuery } from '@/redux/jobSlice'




const Browse = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => dispatch(setQuery(""));
  }, []);

  const {allJobs} = useSelector(store=>store.job)
  return (
    <div>
        <Navbar/>
        
      
      <div className='m-5 font-bold text-xl flex flex-col gap-4'>
        <p className='text-blue-500'>search Results ({
          allJobs.length
        } )</p>
        <div className='flex flex-col md:flex-row flex-wrap md:ml-10 gap-4'>
          {
            allJobs.length == 0 && <p className="text-red-500 font-bold text-xl item-center w-full">NO JOBS FOUND</p>
          }
            {
                allJobs.map((job,index)=><Job key={job._id} job={job} />)
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
