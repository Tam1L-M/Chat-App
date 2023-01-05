import React, { useRef, useState } from 'react'
import Logout from './Logout'
import Messages from './Messages'
import Chatinput from './Chatinput'
import axios from 'axios'
import { messageRoute,getmessageRoute } from './Api'
import { useEffect } from 'react'
import {v4 as uuidv4} from 'uuid'

function Chatcontainer({currentchat,currentuser,socket}) {

  const[messages,setmsg]=useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef=useRef()
useEffect(()=>{
  (
      async()=>{
        if(currentuser){
        let current=currentuser._id;
        let currentcha=currentchat._id;
        let data = JSON.stringify({
          from:current,
          to:currentcha,
        });
       
    
    const response= await axios.post(getmessageRoute,data,{headers:{"Content-Type" : "application/json"}})
    setmsg(response.data)
      }
      }
  )()
},[currentchat])


  const handlesendmsg= async(msg)=>{
    let current=currentuser._id;
    let currentcha=currentchat._id;
    let data = JSON.stringify({
      from:current,
      to:currentcha,
      msg:msg

    });
     axios.post(messageRoute,data,{headers:{"Content-Type" : "application/json"}})
    socket.current.emit("send-msg", {
      to: currentchat._id,
      from: currentuser._id,
      message:msg,
    }); 
    const msgs = [...messages];
    msgs.push({ fromself: true, message: msg });
    setmsg(msgs);
  }
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromself: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setmsg((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  return (
   <>{currentchat&&(
    <div className='grid grid-rows-[12%,76%,12%] overflow-hidden '>
    <div className="chatheader flex justify-between items-center">
      <div className="userdetails flex justify-center items-center p-2 ">
        <div className="image m ">
        <img className='h-9  ' src={`data:image/svg+xml;base64,${currentchat.avathar}`} alt="" />
        </div>
        <div className="username text-white  font-semibold text-lg m-3">
          <h2>{currentchat.username}</h2>
        </div>
      </div>
      <div>
      <Logout/>
      </div>
    </div>
    <div className='messages pt-4 pb-4 pl-8 pr-8 flex  flex-col gap-4 overflow-auto scrollbar-thin  ' >
      {
        messages.map((msg)=>{
          return(
            <div  key={uuidv4()}ref={scrollRef}  className=''>
              <div className={msg.fromself?" flex items-center justify-end overflow-auto ":"flex items-center overflow-auto"}>
                <div className={msg.fromself?"content max-w-[40%] break-words text-lg text-white bg-blue-700  pl-3 pr-3 rounded-xl":"content max-w-[40%] break-words text-lg text-blue-600 bg-white  pl-3 pr-3 rounded-xl"}>
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
    <Chatinput handlesendmsg={handlesendmsg}/>
  </div>
   )}
   </>
  )
}

export default Chatcontainer