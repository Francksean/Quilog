import "./App.css"
import { Routes, Route } from 'react-router-dom'
import Landing from "./pages/landing/landing"
import Auth from "./components/auth/auth"


function App() {

  return (
    <div  className="App">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/auth/login" element={<Auth login={true} username={true} email={true} password={true}/>}/>
      </Routes>
    </div>
  )
}

export default App
