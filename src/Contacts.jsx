import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'



function Contacts({contacts,currentuser,chatchange}) {

  const [currentusername,setcurrrentusernmae]=useState(undefined)
  const[currentuserimage,setcurrrentuserimage]=useState(undefined)
  const[selected,setselected] = useState(undefined);
  useEffect(()=>{
    if(currentuser){
      setcurrrentusernmae(currentuser.username);
      setcurrrentuserimage(currentuser.avathar);
    }
  },[currentuser])

  const handlechat=(index,contact)=>{
    setselected(index)
    chatchange(contact)
    
  }

  return (
    <>
      {
        currentusername && currentuserimage &&(
          <div className=' grid grid-rows-[10%,75%,15%] overflow-hidden bg-white rounded-xl'>
            <div className='brand flex justify-center gap-2 mt-3 border-b-[1px] border-b-gray-500 '>
              <img className='h-7' src="../Pages/assets/8c65qGeEi.png" alt="logo" />
              <h2 className='font-bold  text-lg'>Listen</h2>
            </div>
            <div className="contacts mt-5 flex flex-col items-center overflow-auto gap-[0.8rem]">
              {
                contacts.map((contact,index)=>{
                  return(
                    <div className={selected===index?"rounded-xl shadow-xl hover:shadow-2xl min-h-[5rem] w-[98%] border-2 border-blue-600 cursor-pointer p-[0.4rem] gap-4 items-center flex":"contact rounded-xl shadow-xl hover:shadow-2xl min-h-[5rem] w-[98%] cursor-pointer p-[0.4rem] gap-4 items-center flex "} key={index} 
                     onClick={()=>handlechat(index,contact)}>

                      <div className="avatar ">
                        <img className='h-10' src={`data:image/svg+xml;base64,${contact.avathar}`} alt="" />
                      </div>
                      <div className="username capitalize text-base font-bold">
                        <p>{contact.username}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <div className="current flex justify-center cursor-pointer items-center gap-4 capitalize border-t-[2px] shadow-xl hover:shadow-2xl ">
            <div className="avatar current ">
                        <img className='h-10' src={`data:image/svg+xml;base64,${currentuserimage}`} alt="" />
                      </div>
                      <div className="username text-xl  font-bold text-blue-600">
                        <h2>{currentusername}</h2>
                      </div>
            </div>
          </div>
        )
      }

    </>
  )
}

export default Contacts