import React from 'react'
import Footer from '../../footer/Footer'
import Navbar from '../../navbar/Navbar'
import Sec1 from './sections/firstSec/Sec1'
import Fourth from './sections/fourthSec/Fourth'
import Sec2 from './sections/secondSec/Sec2'
import Sec3 from './sections/thirdSec/Sec3'

const Home = () => {
  return (
    <>
        <Navbar/>
        {/* <Sidebar/> */}
        <Sec1/>
        <Sec2/>
        <Fourth/>
        <Sec3/>
        <Footer/>
    </>
  )
}

export default Home