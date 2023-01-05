
import React, { useEffect } from 'react'
import '../components/index.css';
import { Link ,json,useNavigate} from 'react-router-dom';
import {ToastContainer,toast} from 'react-toastify'
import { useState } from 'react';
import "react-toastify/dist/ReactToastify.css"
import axios from 'axios';
import { avatarRoute} from './Api';
import{Buffer} from 'buffer'


function Avatars() {
    const navigate=useNavigate();
    const local:any=localStorage.getItem("Listen-user");
    
    let [avatar,setavatar]=useState([""]);
    const [loading,isloading]=useState(true);
    const [selectedavatar,setselected]=useState(-1 )
    const api='http://api.multiavatar.com/45678954';

    let toastdetails:Object={
        position:"bottom-right",
        autoClose:4000,
        closeOnClick:true,
        pauseOnHover: true,
        draggable: true,
        theme:"dark" 
      };

      useEffect(()=>{
        (
            async()=>{
                if(!localStorage.getItem('Listen-user')){
                    navigate('/login')
                }

            }
        )()
      },[])

      const setpicture= async()=>{
        if(selectedavatar===-1){
            toast.error("Please select a avatar!",toastdetails)
            return false;
        }
        else{
            const user=await JSON.parse(local);
            console.log(user)
            const {data}= await axios.post(avatarRoute,{
                image:avatar[selectedavatar],
                id:user._id,
            })
         if(data.isset){
                user.isavatharset=true,
                user.avathar=data.image
                localStorage.setItem("Listen-user", JSON.stringify(user));
                navigate('/')
            }
         else{
                toast.error("Error setting avatar",toastdetails)
            }
            
        }
      }

    useEffect( ()=>{
        (async()=>{
        const data=[];
        for(let i=0;i<4;i++){
            const image=await axios.get(`${api}/${Math.round(Math.random()*1000)}`)
            const buffer=new Buffer(image.data)
            data.push(buffer.toString('base64'))

         }
                   setavatar(data);
                   isloading(false)
                })()},[])

  return (
    <div   className={loading?"bg-[#4e0eff] h-screen w-screen flex flex-col justify-center items-center":'bg-[#4e0eff] h-screen w-screen flex flex-col justify-center items-center'}>

        {loading ? <img src='../Components/loader.gif'/> :
        <><div className="select">
                  <h1 className='text-white font-mono text-4xl mb-16 font-bold'>Pick Avatar as your profile picture</h1>
              </div><div className="avatarcontainer flex gap-5">
                      {avatar.map((Avatar, index) => {
                          return (
                              <div key={index} className={`${selectedavatar === index ? "border-[4px] border-white rounded-full " : ""}`}>
                                  <img className='h-28 border border-black rounded-full hover:border-[4px] hover:border-white ' src={`data:image/svg+xml;base64,${Avatar}`} alt="avatar" onClick={() => setselected(index)} />
                              </div>);
                      })}
                  </div><button className='border mt-16 hover:bg-slate-100 font-mono text-lg rounded-lg p-2 pr-4 text-[#1877f2] bg-white pl-5 border-violet-300 font-semibold' type='submit' onClick={setpicture}>Set as Profile Picture </button><ToastContainer /></>
     }
    </div>
  )
}

export default Avatars