import React, { useEffect } from "react";
import {useGoogleLogin} from "@react-oauth/google"
import { googleAuth } from "@/api";

export default function Login() {
  
  const responseGoogle=async(authResult)=>{
    try {
			if (authResult["code"]) {
				const result = await googleAuth(authResult.code);
				const {email, name, image} = result.data.user;
        console.log("result user details-->",result.data.user)
				// const token = result.data.token;
				// const obj = {email,name, token, image};
				// localStorage.setItem('user-info',JSON.stringify(obj));
				// navigate('/dashboard');
			 }// else {
			// 	console.log(authResult);
			// 	throw new Error(authResult);
			// }
		} catch (e) {
			console.log('Error while Google Login...', e);
		}
  }

  const handleLogin=useGoogleLogin({
    onSuccess:responseGoogle,
    onError:responseGoogle,
    flow:'auth-code'
  })

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
  <div className="text-center">
    <h1 className="text-white text-4xl font-semibold mb-8">
      Sign in to Google
    </h1>

    <button
      onClick={handleLogin}
      className="
        px-10 py-4
        text-xl font-medium
        text-white
        border border-white
        rounded-full
        cursor-pointer
        hover:bg-white hover:text-black
        transition-colors duration-300
      "
    >
      Log in
    </button>
  </div>
</div>

  );
}
