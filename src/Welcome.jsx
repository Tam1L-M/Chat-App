import React from 'react'

function Welcome({currentuser}) {
  return (
    <div className='flex flex-col justify-center items-center text-white '>
        <h1 className='font-medium'>Welcome <span className='capitalize font-bold'>{currentuser.username}</span>!</h1>
        <h3 className='font-medium'>Please select a chat to start messaging</h3>
    </div>
  )
}
export default Welcome