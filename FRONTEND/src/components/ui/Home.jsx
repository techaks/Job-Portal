import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
const navigate = useNavigate();
const {user} = useSelector(store=>store.user)

useEffect(()=>{
  if(user?.role === "recruiter")
    navigate('/admin/companies');

},[])


  useGetAllJobs();




  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel/>
      <LatestJobs/>

    </div>
  )
}

export default Home
