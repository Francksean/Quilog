import React, { useState } from 'react';
import Header from '../header/header';
import { Link, useNavigate  } from 'react-router-dom';
import './auth.css';
import axios from 'axios'
import { useUser } from '../context/userDatasContext';


import main_img from '../../assets/main_landing_image.png';




function Auth({ isLoginComponent }) {

  return (
    <div className="auth">
      <Header />
      {
        isLoginComponent ? <Login/>:<Signup/>
      }
      
    </div>
  );
}

export default Auth;


function Login() {
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const { isUserLoggedIn, setIsUserLoggedIn } = useUser();
  const navigate = useNavigate();


  function handleChange(e, func) {
    func(e.target.value);
  }

  const getDatas = async (usrnameParam, passwordParam) => {
    try {
      const res = await axios.post("https://quilog-server.vercel.app/users/login", {
        username: usrnameParam,
        password: passwordParam,
      });

      if (res.data) {
        alert(res.data.message);
        if(res.data.message == "You logged in successfully!"){
          localStorage.setItem("userId", res.data.userId)
          localStorage.setItem("token", res.data.token)
          // console.log("Before setIsUserLoggedIn(true):", isUserLoggedIn);
          setIsUserLoggedIn(true);
          // console.log("After setIsUserLoggedIn(true):", isUserLoggedIn);
          navigate("/");
          location.reload();
        }
      } else {
        alert("Erreur lors de la connexion au compte, veuillez réessayer");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
      alert("Une erreur s'est produite lors de la connexion, veuillez réessayer");
    }
  }


  return (
    <div className="auth_body">
      <div className="auth_body_left">
        <div className="form_wrapper_header">
          <h2>Welcome</h2>
          <p>Login to your account</p>
        </div>

        <div className="form_wrapper_bottom">
          <form action="" method="post">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={usernameValue}
              onChange={(e) => handleChange(e, setUsernameValue)}
            />
            <input
              type="password"
              name="password"
              id="p1"
              placeholder="Enter your Password"
              value={passwordValue}
              onChange={(e) => handleChange(e, setPasswordValue)}
            />
          </form>
          <div className="sub_signit">
            <button onClick={()=>{ 
              getDatas(usernameValue, passwordValue)}}>Login</button>
            <p>
              Don't have an account ?<span><Link to={"/auth/signup"}> Sign up</Link></span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth_body_right">
        <h1>Let's Blog it</h1>
        <img src={main_img} alt="main_img" />
      </div>
    </div>
  );
}

function Signup (){
  const [usernameValue, setUsernameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const navigate = useNavigate()
  
  function handleChange(e, func) {
    //console.log(e.target.value);
    func(e.target.value);
  }

  // function contentVar(valuesArray){
  //   let isAFieldNull = false;
  //   valuesArray.map((item)=>{
  //     if(item == null){
  //       isAFieldNull = true;
  //     }
  //   })
  //   if(isAFieldNull == true){
  //     alert("Tous les champs doivent être remplis")
  //   }
  // }

  async function sendDatas(usrnameParam, emailParam, passwordParam) {
    try {
      const res = await axios.post("https://quilog-server.vercel.app/users/register", {
        username: usrnameParam,
        password: passwordParam,
        email: emailParam
      });
  
      if (res.data) {
        alert(res.data.message + " now login !");
        //console.log(res.data)
        navigate("/auth/login")

      } else {
        alert("Erreur lors de la création du compte, veuillez réessayer");
      }
    } catch (error) {
      console.error("Une erreur s'est produite :", error.message);
      alert("Une erreur s'est produite lors de la création du compte, veuillez réessayer");
    }
  }


  return(
    <div className="auth_body">
      <div className="auth_body_left">
        <div className="form_wrapper_header">
          <h2>Welcome</h2>
          <p>Let's create your account</p>
        </div>

        <div className="form_wrapper_bottom">
          <form action="" method="post">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={usernameValue}
              onChange={(e) => handleChange(e, setUsernameValue)}
            />
            <input
              type="email"
              name="email_address"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e) => handleChange(e, setEmailValue)}
            />
            <input
              type="password"
              name="password"
              id="p1"
              placeholder="Enter your Password"
              value={passwordValue}
              onChange={(e) => handleChange(e, setPasswordValue)}
            />
          </form>
          <div className="sub_signit">
            <button onClick={()=>{ sendDatas(usernameValue, emailValue, passwordValue) }}>Create account</button>
            <p>
              Already have account ?<span><Link to={"/auth/login"}> login</Link></span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth_body_right">
        <h1>Let's Blog it</h1>
        <img src={main_img} alt="main_img" />
      </div>
    </div>
  )
}
