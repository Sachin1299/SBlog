import React from 'react'
import logo from './Header/Logo/Logo1.png'

function Logo({width = '100px'}) {
  return (
    <div className='w-36 h-12'>
      <img className=' rounded-xl' src={logo} alt='logo'/>
    </div>
  )
}

export default Logo