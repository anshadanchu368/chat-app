import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import Signup from './pages/Signup'
import LoginPage from './pages/login'

const App = () => {
  return (
    <div >
   <Navbar/>

   <Routes>
    <Route path="/" element={<Navbar/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/setting" element={<SettingsPage/>}/>
    <Route path="/profile" element={<ProfilePages/>}/>
    </Routes>
</div>
  )
}

export default App
