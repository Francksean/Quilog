import React from 'react';
import "./acceuil.css"
import { Link } from 'react-router-dom';

import Header from "../../components/header"
import Footer from '../../components/footer';


function Acceuil() {
  return (
    <div className='acceuil'>
      <Header arrItem={["Acceuil", "Articles"]}/>
      <AcceuilBody/>
      <Footer/>
    </div>
  )
}

export default Acceuil

function AcceuilBody() {
  return(
    <div className='acceuil_wrapper'>
      <h1>Share your ideas, your tips and more with your community...</h1>
      <Link to={"/auth/login"}>Connexion</Link>
    </div>
  )
}