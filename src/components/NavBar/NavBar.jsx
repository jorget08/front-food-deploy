import React from 'react'
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div>
        <nav className='navBar nav'>
            <Link to="/home">
                <h2>HOME</h2>
            </Link>
            <Link to="/create/recipe">
                <h2>CREATE</h2>
            </Link>
        </nav>
    </div>
  )
}

export default NavBar