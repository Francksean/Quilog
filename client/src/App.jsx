import Acceuil from "./pages/acceuil"
import "./App.css"
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <>
      <Routes>
        <Route path='/' element= {<Acceuil/>}/>
        {/* <Route path='/auth/login' element= {<Login/>}/> */}
        {/* <Route path='/auth/signup' element= {<Signup/>}/> */}
        {/* <Route path='/user/:id' element= {<Home/>}/> */}
        {/* <Route path='/profile' element= {<Profile/>}/> */}
      </Routes>
    </>
  )
}

export default App
