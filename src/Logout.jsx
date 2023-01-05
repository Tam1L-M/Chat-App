import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {BiPowerOff} from 'react-icons/bi'
function Logout() {
    const navigate=useNavigate()
const handleclick= async()=>{
    localStorage.clear();
    navigate('/login')
}
  return (
    <div className='mr-4 bg-red-500 rounded-lg p-1'>
        <BiPowerOff className='text-xl cursor-pointer text-white' onClick={handleclick}/> 
    </div>
  )
}

export default Logout