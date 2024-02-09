import React from 'react'
import NoAUth from '../assets/NoAuth.png'
import { Link, useNavigate } from 'react-router-dom'

const Erro404 = () => {

  const navigate = useNavigate()

  return (
    <div className='bg-white h-screen flex justify-center items-center flex-col'>
      <h2 className='text-2xl m-4 font-bold'>No hay nada que hacer aqui</h2>
      <img className="" src={NoAUth}/>
      <h2 className='text-2xl m-4 font-bold'>Deberias regresar por donde viniste</h2>

     <Link to="/">
     <button className='bg-[#2E0364] px-4 py-2 rounded-md text-white'>
        Llevame
      </button>
     </Link>
    </div>
  )
}

export default Erro404