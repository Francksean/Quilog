import React from 'react'
import "./header.css"
import { NavLink } from 'react-router-dom';
import profile_icon from "../assets/profile-user.png"

// on passe un tableau d'élements qui seront nos liens en fondtions des pages et la photo de profil
function Header({arrItem}) {
  return (
    <div className='header'>
      <div className="header_left_side">
        <h2 className='header_main_title'>Afro TechTalk</h2>

        <div className="header_navbar">
  {/* on parocurt le tableau en générant les liens */}
          { arrItem ? arrItem.map(item => {
              return <NavLink 
              to={`/${item}`} className={({isActive}) =>
              isActive ? "header_navlink_base header_navlink_active" : "header_navlink_base"
              }
              >{item}
              </NavLink>
            }) : null
          }
        </div>
      </div>

      <div className="header_photo_profil">
        <img src={profile_icon} alt="profile_user_icon"/>
      </div>
    </div>
  )
}

export default Header;