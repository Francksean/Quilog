import React, { useEffect } from 'react'
import './profile.css'

import Header from '../../components/header/header'
import { useUser } from '../../components/context/userDatasContext'
import { Link } from 'react-router-dom'



function Profile() {
  const { user, isUserDatasUpdated, setIsUserDatasUpdated } = useUser()
  return (
    <div className='profile'>
      <Header/>
      <div className="profile_large_container">
        <div className="profile_container">
          <Link to={`/user/${user._id}/editer`}>Edit</Link>
          <div className="profile_container_user_infos_main">
            { user.profilePic == "" ? <div className="profile_pic profile_pic_uploader">Upload an image</div> : <div className='profile_pic'><img src={user.profilePic} alt="user profile pic" /></div> }
            <div className="profile_container_user_infos_main_right">
              <h1>{user.username}</h1>
              { user.userDescription =="" ? <p className="no_user_description">You have no description yet</p> : <p className="user_description">{ user.userDescription }</p> }
              <div className="stats_box">
                <p className='stat stat1'>{`articles posted : ${user.articles.length}`}</p>
                <p className='stat stat2'>{`followers : ${user.followers.length}`}</p>
                <p className='stat stat3'>{`followed : ${user.followed.length}`}</p>
                <p className='stat stat4'>{`liked articles : ${user.likedArticles.length}`}</p>
              </div>
            </div>
          </div>
          <div className="profile_container_user_infos_socials">
            {/* mettre en place la publication des réseau sociaux */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile