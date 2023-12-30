import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Acceuil from "./pages/acceuil/acceuil"
import Articles from "./pages/Articles/articles"
import Connexion from "./pages/connexion/connexion"



function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<Acceuil/>}/>
        <Route path='/Acceuil' element= {<Acceuil/>}/>
        <Route path='/Articles' element= {<Articles/>}/>
        <Route path='/auth/login' element= {<Connexion/>}/>
        {/* <Route path='/user/:id' element= {<Home/>}/> */}
        {/* <Route path='/profile' element= {<Profile/>}/> */}
      </Routes>
    </>
  )
}

export default App
