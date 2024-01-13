import React from 'react'
import './header.css'

import { Link } from 'react-router-dom'

import header_icon from '../../assets/header_icon.png'
import user_icon from '../../assets/mdi_user.png'

function Header() {
  return (
    <div className='header'>
      <div className="header_left">
        <img src={header_icon} alt="icon_header"/>
        <Link to={'/'}>
          <p>Quilog</p>
        </Link>
      </div>
      <div className="header_infos">
        <Link to={"/auth/login"} >Login</Link>
        <img src={user_icon} alt="user_icon" />
      </div>
    </div>
  )
}

export default Header