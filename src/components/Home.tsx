import React from 'react'
import Footer from './Footer'
import WorldRegions from './WorldRegions'
import UserOpinion from './UserOpinion'
import HeadlineNews from './HeadlineNews'
import Insurances from './Insurances'
import ChoiceCarrierOrSender from './ChoiceCarrierOrSender'
import VideoPresentation from './VideoPresentation'
import Navigation from './Navigation'

const Home = () => {
  return (
    <>
      <Navigation />
      <section className="home">  
        <VideoPresentation /> 
        <ChoiceCarrierOrSender />
        <Insurances />
        <HeadlineNews />
        <UserOpinion />
        <WorldRegions />
        <Footer />
      </section>
    </>
  )
}

export default Home