import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'

const Home = () => {
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
