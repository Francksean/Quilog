import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Landing from "./pages/landing/landing"
import Auth from "./components/auth/auth"


function App() {

  return (
    <div  className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Landing/>}/>
        <Route path="/auth/login" element={<Auth isLoginComponent={true}/>}/>
        <Route path="/auth/signup" element={<Auth isLoginComponent={false}/>}/>
      </Routes>
    </div>
  )
}

export default App
