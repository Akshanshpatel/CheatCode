import React, { useState } from 'react'
import Navbar from '@/components/Navbar';
import {ArrowLeft,ArrowRight} from "lucide-react"
import Footer from '@/components/Footer';

const Practice = () => {

  return (
    <div>  
    <Navbar/>
    <main className='bg-[#202225] min-h-screen'>
      <section className='w-fullh-50'>

        <div className="flex items-center gap-2">

            <h2 className="flex text-white text-xl font-bold pl-30 pt-15 ">
              Progress 
              <div className='pl-5'>
              <ArrowRight/>
              </div>
            </h2>
          
          

          
        </div>
      </section>


     
      <section className=''></section>  
    </main>
    <Footer/>
    </div>
  )
}

export default Practice;