import React from 'react'
import logo from '../assets/logo.png'


const Header = () => {
  return (
    <div >
        <header className="header">
            <div className="logo">

              <img src={logo} alt="logo" className='logoo' />
            </div>
            <div className='spacer'></div>
            <div className="sign"></div>
            <a href="#" className="signin">Sign In</a>
        </header>
    </div>
  )
}

export default Header