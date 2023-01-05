import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs'
import { useState } from 'react'

function Chatinput( {handlesendmsg}) {
    const[picker,setpicker]=useState(false)
    const [message,setmessage]=useState('')

    const handlepicker=()=>{
        setpicker(!picker)

    }
    const handleemoji=(event,emojidata)=>{
        console.log(event);
        let msg=message;
        msg+=event.emoji;
        setmessage(msg)
    }

    const handlesubmit=(event)=>{
        event.preventDefault()
      
        if(message.length>0){
            handlesendmsg(message)
            setmessage('')
        }
    }
  return (
    <div className='grid grid-cols-[8%,95%] items-center ml-3 bg-white h-10  w-[95%] rounded-lg'>
        <div className="buttonemoji flex ">
         <div className="emojij ml-1 flex items-center justify-center">
            <BsEmojiSmileFill className='text-yellow-500 text-lg cursor-pointer ' onClick={handlepicker}/>
            {
                (picker?<div className='absolute top-[200px] ml-52 shadow-xl'><EmojiPicker theme='dark ' searchDisabled="true" height={"300px"} width={"300px"}  emojiStyle='apple' onEmojiClick={handleemoji}/></div>:'')
            }            

            </div>
        </div>
        <form className="input-container w-[100%] ml-1 flex items-center justify-start  " onSubmit={(e)=>handlesubmit(e)}>
            <input className='w-[82%] outline-none  text-lg' type="text " placeholder='Type your message here' value={message} onChange={(e)=>{setmessage(e.target.value)}} />
             <button className=" cursor-pointer h-10 w-10 flex justify-center items-center rounded-full text-blue-600">
                <IoMdSend className=' text-2xl  ' />
            </button>
        </form>
    </div>
  )
}

export default Chatinput