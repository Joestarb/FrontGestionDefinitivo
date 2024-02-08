import React from 'react'
import Rectangle from "../assets/esquina/Rectangle.png" 
import Vector from "../assets/esquina/Vector.png"
const Esquina = () => {
  return (
    <div className=' absolute top-0'>
        <img src={Vector} alt=""  className=' absolute w-16 ml-6 mt-5 z-10'/>
        <img src={Rectangle} alt=""  className='w-32 z-0'/>
        
    </div>
  )
}

export default Esquina