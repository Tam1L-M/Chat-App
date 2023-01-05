import React from 'react'
import '../components/index.css';
import { Link ,useNavigate} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import { useState,useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { registerRoute } from './Api';


function Register() {
  const navigate=useNavigate();
  const [values,setvalues]=useState({
    username: '',
    email:'',
    password: '',
    confirmpassword: ''
  });
  let toastdetails:Object={
    position:"bottom-right",
    autoClose:4000,
    closeOnClick:true,
    pauseOnHover: true,
    draggable: true,
    theme:"dark" 
  };

  

const handlevalidation = () => {
 
  const {username,email,password,confirmpassword}=values;
  if(password !==confirmpassword){
    toast.error("Passwords do not match",toastdetails);
    return false;
  }
  else if(username.length<4){
    toast.error("Username is too short",toastdetails);
        return false;
    
  }
  else if(password.length<6){
    toast.error("Password is too short",toastdetails);
            return false;
        
    
  }
  else if(email.length==0){
    toast.error("Email is required",toastdetails);
        return false;
    

  }
  else{
    return true;  
  }
}

  const handlesubmit= async (event:any)=>{
    event.preventDefault();
   if(handlevalidation()){
    const {username,email,password}=values;
    const {data}=await axios.post(registerRoute,{
      username,
      email,
      password
    })

    console.log(data);

    if(data.status===false){
      toast.error(data.msg,toastdetails)
    }
    if(data.status===true){
      navigate('/login')
    }
   }
  }

  const handlechange=(event:any)=>{
    setvalues({...values,[event.target.name]:event.target.value});
  }
  return (
    <div className=' w-full h-screen flex justify-center items-center gap-4 bg-gray-200'>
      <form className='flex flex-col border-2  border-gray-200 shadow-xl  items-center rounded-xl gap-7 p-10 pr-12 pl-9 bg-white outline-none ' action="" onSubmit={(event)=>{handlesubmit(event)}}>

      <div className="logo flex items-center  ">
      <img className='h-14 pr-2' src="../Pages/assets/8c65qGeEi.png"alt="" /> 
      <h1 className='font-bold text-3xl text-[#1877f2]'>Listen</h1>
      </div>

          <input className=' text-base  font-medium focus:border-blue-500 pr-14 pl-4 text-black bg-transparent border-gray-400 border-2  outline-none rounded-lg pt-2 pb-2' type="text" name='username' placeholder='User Name' onChange={ (event)=>{handlechange(event)}} />

          <input className=' text-base font-medium focus:border-blue-500 pr-14 pl-4 text-black bg-transparent border-gray-400 border-2  outline-none rounded-lg pt-2 pb-2' type="email" name='email' placeholder='E-Mail' onChange={ (event)=>{handlechange(event)}} />

          <input className='text-base font-medium  focus:border-blue-500 pr-14 pl-4 text-black bg-transparent border-gray-400 border-2  outline-none rounded-lg pt-2 pb-2' type="password" name='password' placeholder='Password' onChange={ (event)=>{handlechange(event)}} />

          <input className='text-base  font-medium focus:border-blue-500 pr-14 pl-4 text-blacck bg-transparent border-gray-400 border-2  outline-none rounded-lg pt-2 pb-2' type="password" name='confirmpassword' placeholder='Confirm Password' onChange={ (event)=>{handlechange(event)}} />


          <button className='border rounded-lg p-2 pr-7 bg-[#1877f2] text-white pl-7 border-violet-300 font-medium' type='submit'>Create Account </button>
          <span className='text-black'>Already have an account? <Link to={"/login"} className="text-[#1877f2] hover:underline">Login</Link></span>
        
        
      </form>
      <ToastContainer/>
    </div>
    
   )
}

export default Register