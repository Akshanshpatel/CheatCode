import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import React from 'react'

const About = () => {
  return (
    <div>  
    <Navbar/>
    <main className='bg-[#202225] min-h-screen flex flex-col justify-center items-center '>

     <h1 className='font-extrabold text-4xl text-white  '> Under Construction</h1>
     <img src="/Page.png" className='h-70 w-90 mt-10 mb-60'/>


    </main> 
    <Footer/>
    </div>
  )
}

export default About;