import React from 'react'
import { Button } from './button'
import { Search } from 'lucide-react'

const HeroSection = () => {
  return (
    <div>

       <div>
        <h1 className='text-center text-[#FF8C00] font-extrabold text-3xl mt-10'>Find Your <span className='text-[#155DFC]'>Dream Job</span>  in Seconds – Only on Jobsy!</h1>
        <p className='text-center font-bold text-xl mt-5'>Thousands of jobs. One smart platform.</p>
        <p className='text-center text-[#155DFC] font-bold text-xl mt-5'>Trusted by 500+ employers | 10,000+ <span className='text-[#FF8C00]'>candidates placed</span> </p>
        <div className='flex justify-center mt-10 w-1/3 mx-auto'>
          <input type="text"
          placeholder='Search Jobs Here'
          className='border-2 border-[#1F8211] font-bold outline-none rounded-l-full px-4 w-full h-[40px] '
          />
          <Button className="rounded-r-full h-10 w-10 bg-[#1F8211]  ">
            <Search className='h-5 w-5' />

        
          </Button>
        </div>



       </div>
      
    </div>
  )
}

export default HeroSection
