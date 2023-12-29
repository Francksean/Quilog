import React from 'react';
import Header from '../components/header';

function Acceuil() {
  return (
    <div className='acceuil'>
      <Header arrItem={["Acceuil", "Articles", "Connexion"]}/>
      <AcceuilBody></AcceuilBody>
    </div>
  )
}

export default Acceuil

function AcceuilBody() {
  return(
    <div className='accueil_wrapper'>
      
    </div>
  )
}