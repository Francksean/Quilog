import React, { useContext } from 'react'
import './header.css'

import { Link } from 'react-router-dom'

import { useUser } from '../context/userDatasContext';

import header_icon from '../../assets/header_icon.png'
import user_icon from '../../assets/mdi_user.png'

function Header() {
  const { user } = useUser()

  return (
    <>
      { user ? <HeaderForUserIn/> : <HeaderForUserOut/> }
    </>
    
  )
}

export default Header


function HeaderForUserIn() {
  const { user, setUser } = useUser()

  return (
    <div className='header'>
      <div className="header_left">
        <img src={header_icon} alt="icon_header"/>
        <Link to={'/'}>
          <p>Quilog</p>
        </Link>
      </div>
      <div className="header_infos">
        <p>{` Welcome, ${user.username}`}</p>
        <img src={user_icon} alt="user_icon" />
        <Link to={"/auth/login"}
          onClick={()=>{
            setUser(undefined)
        }}>Logout</Link>
      </div>
    </div>
  )
}


function HeaderForUserOut() {
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
