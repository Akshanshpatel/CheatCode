import React from 'react'

const Footer = () => {
  return (
    <div className="bg-[#202225] w-full py-10 ">
  <hr className="w-2/3 mx-auto mb-6 border-white" />

  <div className="flex flex-col items-center">
    <h4 className="font-bold text-white text-lg mb-4">
      Links
    </h4>

    <ul className="flex space-x-10 text-blue-400">
        <a href="https://yap-site.vercel.app/" className="hover:text-blue-300 transition cursor-pointer">Yapsite</a>
      
        <a href="https://www.instagram.com/__aks_patel/" className="hover:text-blue-300 transition cursor-pointer">Instagram</a>

        <a href="https://www.linkedin.com/in/aks-patel/" className="hover:text-blue-300 transition cursor-pointer">Linkedin</a>

        <a href="https://leetcode.com/u/_aks_patel/" className="hover:text-blue-300 transition cursor-pointer">Leetcode</a>

        <a href="https://github.com/Akshanshpatel" className="hover:text-blue-300 transition cursor-pointer">Github</a>
    </ul>
  </div>
</div>

  )
}

export default Footer