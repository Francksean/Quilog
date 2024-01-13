import React, { useState, useRef } from 'react'
import Header from '../header/header'
import { Link } from 'react-router-dom'
import './auth.css'


import main_img from '../../assets/main_landing_image.png'



function Auth({ login, username, email, password }) {
  
  const [ usernameValue, setUsernameValue] = useState("")
  const [ passwordValue, setPasswordValue] = useState("")
  const [ emailValue, setEmailValue] = useState("")

  const usernameField = useRef(null)
  // const passwordField = useRef(null)
  // const emailField = useRef(null)

  function handleChange(e,func){
    console.log(e.target.value)
    func(e.target.value)
  }

  return (
    <div className='auth'>
      <Header/>
      <div className="auth_body">
        <div className="auth_body_left">
            <div className="form_wrapper_header">
              { login ?
                  <>
                    <h2>Welcome</h2>
                    <p>Login to your account</p>
                  </>: 
                  <>
                    <h2>Create an account</h2>
                    <p>Let's blog with Quilog</p>
                  </>
                }
            </div>
            
            <div className="form_wrapper_bottom">
              <form action="" method="post">
                  <input type="text" name='username' placeholder='Enter your username' value={usernameValue} onChange={(e)=>handleChange(e,setUsernameValue)} />
                  {
                    email ? <input type="email" name="email" id="em1" placeholder='Enter your email' value={emailValue} onChange={(e)=>handleChange(e,setEmailValue)}/>:null
                  }
                  <input type="password" name="password" id="p1" placeholder='Enter your Password' value={passwordValue} onChange={(e)=>handleChange(e,setPasswordValue)}/>
              </form>
              <div className="sub_signit">
                {
                  login ?
                  <>
                    <button>Login</button>
                    <p>Don't have an account ?<span><Link to={"/auth/signup"}> Sign up</Link></span></p>
                  </>:
                  <>
                    <button>Create your account</button>
                    <p>Already have account ? <span><Link to={"/auth/login"}>Login</Link></span></p>
                  </>
                }
                
              </div>
            </div>
        </div>
        <div className="auth_body_right">
          <h1>Let's Blog it</h1>
          <img src={main_img} alt="main_img" />
        </div>
      </div>
    </div>
  )
}

export default Auth