import { useState } from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Chat from './Chat'
import Login from './Login'
import Register from './Register'
import '../components/index.css';
import Avatars from './Avatars'
function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/avatar" element={<Avatars/>} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
