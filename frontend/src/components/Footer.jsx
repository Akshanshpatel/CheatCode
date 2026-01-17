import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#202225] w-full pb-10">
      <hr className="w-2/3 mx-auto mb-6 border-white" />

      <div className="flex flex-col items-center px-4">
        <h4 className="font-bold text-white text-lg mb-4">
          Links
        </h4>

        <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 text-blue-400">
          
          {/* Mobile + Desktop */}
          <a
            href="https://wa.me/919528038319"
            className="hover:text-blue-300 transition"
            target="_blank"
          >
            Whatsapp
          </a>

          <a
            href="https://www.instagram.com/__aks_patel/"
            className="hover:text-blue-300 transition"
            target="_blank"
          >
            Instagram
          </a>

          <a
            href="https://leetcode.com/u/_aks_patel/"
            className="hover:text-blue-300 transition"
            target="_blank"
          >
            Leetcode
          </a>

          {/* Desktop only */}
          <a
            href="https://yap-site.vercel.app/"
            className="hidden sm:inline hover:text-blue-300 transition"
            target="_blank"
          >
            Yapsite
          </a>

          <a
            href="https://www.linkedin.com/in/aks-patel/"
            className="hidden sm:inline hover:text-blue-300 transition"
            target="_blank"
          >
            Linkedin
          </a>

          <a
            href="https://github.com/Akshanshpatel"
            className="hidden sm:inline hover:text-blue-300 transition"
            target="_blank"
          >
            Github
          </a>

        </ul>
      </div>
    </div>
  );
};

export default Footer;
