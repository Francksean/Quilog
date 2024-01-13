import React from 'react'
import Header from '../../components/header/header'
import './landing.css'

import { Link } from 'react-router-dom'

//images
import plus_btn from '../../assets/write_article_icon.png'
import view_btn from '../../assets/read_blog_icon.png'
import main_img from '../../assets/main_landing_image.png'


function Landing() {
  return (
    <div className='landing_page'>
      <Header/>
      <div className="landing_body">
        <p className='landing_main_text'>"The secret to getting ahead is gettting started."</p>
        <div className="landing_bottom_main">
          <div className="landing_buttons">
            <Link to={"/"}  className='landing_button_item'>
              <img src={plus_btn} alt="" />
              <p>Create Article</p>
            </Link>
            <Link to={"/"} className='landing_button_item' >
              <img src={view_btn} alt="" />
              <p>Read Article</p>
            </Link>
          </div>
          <img src={main_img} alt="" />
        </div>
      </div>
    </div>
  )
}

export default Landing