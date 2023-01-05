import React, { useEffect } from 'react'
import '../components/index.css';
import { Link ,useNavigate} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { loginRoute} from './Api';


function Login() {
  const navigate=useNavigate();
  const [values,setvalues]=useState({
    username: '',
    password: ''
  });
  let toastdetails:Object={
    position:"bottom-right",
    autoClose:4000,
    closeOnClick:true,
    pauseOnHover: true,
    draggable: true,
    theme:"dark" 
  };

  const ava=localStorage.getItem("Listen-user");
  

  useEffect(()=>{
   
   if(localStorage.getItem("Listen-user") ){

    navigate('/')
   }

  },)
const handlevalidation = () => {
 
  const {username,password}=values;
  if(username===''){
    toast.error("Username is required",toastdetails);
        return false;
    
  }
  else if(password ===''){
    toast.error("Password is required",toastdetails);
    return false;
  }
  
  
  else{
    return true;  
  }
}

  const handlesubmit= async (event:any)=>{
    event.preventDefault();
   if(handlevalidation()){
    const {username,password,}=values;
    const {data}=await axios.post(loginRoute,{
      username,
      password
    })

    if(data.status===false){
      console.log(data.msg)
      toast.error(data.msg,toastdetails)
    }
    if(data.status===true && data.userlogin.isavatharset ){
      localStorage.setItem('Listen-user',JSON.stringify(data.userlogin))
      navigate('/')
    }
    else{
      localStorage.setItem('Listen-user',JSON.stringify(data.userlogin))
      navigate('/avatar')
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


          <input className='text-base font-medium  focus:border-blue-500 pr-14 pl-4 text-black bg-transparent border-gray-400 border-2  outline-none rounded-lg pt-2 pb-2' type="password" name='password' placeholder='Password' onChange={ (event)=>{handlechange(event)}} />


          <button className='border rounded-lg p-2 pr-14 bg-[#1877f2] text-white pl-14 border-violet-300 font-medium' type='submit'>Login </button>
          <span className='text-black'>Don't have an account? <Link to={"/register"} className="text-[#1877f2] hover:underline">Register</Link></span>
        
        
      </form>
      <ToastContainer/>
    </div>
    
   )
}

export default Login