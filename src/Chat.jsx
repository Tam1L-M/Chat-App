import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link ,json,useNavigate} from 'react-router-dom';
import {io} from 'socket.io-client'
import { alluserRoute,host } from './Api';
import Contacts from './Contacts';
import Welcome from './Welcome'
import Chatcontainer from './Chatcontainer';
import { useRef } from 'react';

function  Chat() {
  const navigate=useNavigate();
  const uuser=localStorage.getItem('Listen-user');

  const [currentuser ,setcurrentuser] =useState(undefined)
  const [contacts ,setcontacts] = useState([])
  const[currentchat,setcurrentchat] = useState(undefined)
  const [loading, setLoading] = useState(false)
  const socket=useRef()
  useEffect(()=>{
    (
        async()=>{
            if(!localStorage.getItem('Listen-user')){
                navigate('/login')
            }
            else{
              setcurrentuser(await JSON.parse(localStorage.getItem('Listen-user')))
              setLoading(true)
            }
        }
    )()
  },[])

  useEffect(() => {
    if (currentuser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentuser._id);
    }
  }, [currentuser]);
  const userr=currentuser
  useEffect( ()=>{
    (
        async()=>{
            if(userr){
              if(userr.isavatharset){
              const {data} =await axios.get(`${alluserRoute}/${userr._id}`);
              setcontacts(data);
              
              }
            }
        }
    )()
  },[currentuser])

  const handlechat=(chat)=>{
    setcurrentchat(chat)
  }
 
//console.log(currentuser);
  return (
    <div className='h-screen w-screen flex flex-col items-center justify-center bg-gray-300  '>
      <div className="rounded-xl contacts grid grid-cols-[30%,70%] w-[90vw] h-[90vh] bg-[#1877f2]">
      <Contacts currentuser={currentuser} contacts={contacts} chatchange={handlechat} />
      {loading===true &&currentuser&&currentchat===undefined ?<Welcome currentuser={currentuser}/>:<Chatcontainer currentchat={currentchat} currentuser={currentuser} socket={socket}/>}
      
      </div>
    </div>
  )

}

export default Chat