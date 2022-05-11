import React from 'react'
import { Link } from 'react-router-dom';


function LandingPage() {
  return (
    <Link to={`/home`}>
        <button className='home-buttom'>HOME</button>
    </Link>
  )
}

export default LandingPage