"use client"

import React from "react";
import { useState } from "react";
import {loginSchema,loginSchemaType} from "@/lib/validations/auth"
import {signupSchema,signupSchemaType} from "@/lib/validations/auth"
import {toast} from "react-hot-toast"
import { useRouter } from "next/navigation";
import api from "@/lib/api/api"
import  Cookie  from "js-cookie";
import { useAuthStore } from "@/store/auth";

const LoginPage = () => {
  const [loginForm,setloginForm] = useState<boolean>(true)
  const [username, setUsername] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [email,setEmail]= useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigator = useRouter();
  const {setUser} = useAuthStore();
  const handleLogin = async(e:React.FormEvent)=>{
    e.preventDefault()
    const data = {
      email,
      password
    }
    // console.log(email,password)
    const validation  = loginSchema.safeParse(data);
    
    if(!validation.success){
      setErrorMessage(validation.error.issues[0].message);
      return;
    }
    try{
      const res = await api.post('/user/login',validation.data)
      if(res.data.success){
        toast.success(res.data.message);
      }
      Cookie.set("token",res.data.token);
      setUser(res.data.user,res.data.token);
      navigator.push('/dashboard')
    }catch(err:any){
      console.log(err)
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  } 

  const handleSignUp = async(e:React.FormEvent)=>{
    e.preventDefault();
    const data = {
      name:username,
      email,
      password
    }
    const validation = signupSchema.safeParse(data);

    if(!validation.success){
      setErrorMessage(
        validation.error.issues[0].message
      )
      return;
    }
    try{
      const res = await api.post('/user/register',validation.data);
      if(res.data.success){
        toast.success(res.data.message)
      }
      setUser(res.data.user,res.data.token);
      Cookie.set("token",res.data.token);
      navigator.push('/dashboard')
    }
    catch(err:any){
      console.log(err)
      toast.error(err.response?.data?.message || "signup failed. Please try again.");
    }
  }
  return (
    <div className="flex items-center justify-center max-h-min bg-black">
      <div className="bg-gray-800/10 border mt-40 border-gray-700 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm">
        <div className=" mb-8">
        {loginForm ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-200 mb-2">Login</h2>
              <p className="text-gray-400 text-sm">
                Enter your email below to login to your account
              </p>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-200 mb-2">Sign Up</h2>
              <p className="text-gray-400 text-sm">
                Enter your details below to signup
              </p>
            </div>
          )}
        </div>
        
        <form
         className="space-y-6"
          onSubmit={loginForm ? handleLogin : handleSignUp}
         >
          {
            !loginForm &&
            <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              onChange={(e)=>{setUsername(e.target.value)}}
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/80 focus:border-transparent transition-all duration-200"
              placeholder="Enter your username"
            />
          </div>
          }
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              onChange={(e)=>{setEmail(e.target.value)}}
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-800/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/80 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              // defaultValue="abhay@gmail.com"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-300">
                Password
              </label>
              {loginForm &&
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Forgot your password?
              </a>}
            </div>
            <input
              type="password"
              onChange={(e)=>{setPassword(e.target.value)}}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/10 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400/80 focus:border-transparent transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>
          {
            errorMessage && 
            <p className="text-sm text-red-900">{errorMessage}</p>
          }
          
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-400/80 text-gray-900/80  py-3 rounded-lg font-semibold transition-colors duration-200 "
          >
            {loginForm ? "Login" : "Sign Up"}
          </button>
        </form>
        
       {
       loginForm && 
        <div className="mt-6">
          <button className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-3 border border-gray-600">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Login with Google
          </button>
        </div>}
        
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">{
            loginForm ? "Don't have an account?  "
            :
            "Already have an account? "
            }
            <button 
            onClick={()=>{setloginForm(!loginForm)}}
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              {loginForm ? " singup" : " login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;