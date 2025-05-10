import React from 'react'
import Job from './Job'
import Navbar from './Navbar'


const randomjobs = [1,2,3,4,5,6]

const Browse = () => {
  return (
    <div>
        <Navbar/>
      
      <div className='m-5 font-bold text-xl flex flex-col gap-4'>
        <p className='text-blue-500'>search Results ({randomjobs.length} )</p>
        <div className='flex flex-wrap ml-10 gap-4'>
            {
                randomjobs.map((item,index)=><Job/>)
            }
        </div>
      </div>
    </div>
  )
}

export default Browse
