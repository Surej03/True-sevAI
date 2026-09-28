import React from 'react'
import { assets } from '../assets/assets'
import '../loader.css'

const Loader = () => {
  return (
    <div className='loader-container'>
        <img className='logo' src={assets.logo || '/fallback-logo.png'} alt='logo'/>
        <div className='spinner' aria-label='Loading...'></div>
    </div>
  )
}

export default Loader