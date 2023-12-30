import React, {useState} from 'react'
import main_img_login from '../../assets/login page image.jpg'
import Header from '../../components/header'
import Footer from '../../components/footer'
import "./connexion.css"
import { NavLink } from 'react-router-dom'

function Connexion() {
  return (
    <div className='connexion'>
      <Header/>
      <ConnexionBody/>
      <Footer/>
      <div className="bg_soft_1"></div>
      <div className="bg_soft_2"></div>
      <div className="bg_soft_3"></div>
    </div>
  )
}

export default Connexion

function ConnexionBody() {
  console.log("login component mounted")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const submitLogin = (e)=>{
    e.preventDefault();
    console.log("infos submitted")
  }

  return (
    <div className='connexion_wrapper'>
      <img src={main_img_login} alt="img_login" />
      <div className="connexion_form_wrapper">
        <h3>Login</h3>
        <form action="" method="">
          <div className="form_input_item">
            <label htmlFor="usernameInput">Username</label>
            <input type="text" id='usernameInput' placeholder="nom d'utilisateur" value={username} onChange={(e)=>setUsername(e.target.value)}/>
          </div>
          <div className="form_input_item">
            <label htmlFor="passwordInput">Password</label>
            <input type="password" id='passwordInput' placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button onClick={submitLogin}>Login</button>
        </form>
        <p>Vous n'avez pas encore de compte ? <span><NavLink to={"/auth/signup"}>inscrivez vous</NavLink></span></p>
      </div>
    </div>
  )
}
