import React from 'react'
import { useState,useEffect } from 'react'

const Greetings = () => {
    const [greet,setGreet]=useState('');
    useEffect(() => 
    {
       const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
      setGreet("Good Morning 🌅");
    } else if (hour >= 12 && hour < 17) {
      setGreet("Good Afternoon ☀️");
    } else if (hour >= 17 && hour < 21) {
      setGreet("Good Evening 🌇");
    } else {
      setGreet("Good Night 🌙");
    }
   
    }, [])
    
  return (
  <div className='flex justify-center my-2'>
      <h1 className="text-4xl font-bold ml-2 text-white custom-font">Hi,{greet}</h1>
    </div>
  )
}

export default Greetings
