import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import Signup from './pages/Signup'
import LoginPage from './pages/login'
import ProfilePages from './pages/Profilepages'
import { useAuthStore } from './store/useAuthStore'
import HomePage from './components/HomePage'

const App = () => {
  const {authUser, checkAuth, isLoading} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

 if(isLoading && !authUser) return (
      <div className="flex items-center justify-center h-screen">
       <span className="loading loading-spinner loading-xl"></span>
      </div>
 )

  return (
    <div >
   <Navbar/>

   <Routes>
    <Route path="/" element={authUser ? <HomePage/> : <Navigate to ="/login"/>}/>
    <Route path="/signup" element={!authUser ? <Signup/> :<Navigate to="/"/>}/>
    <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
    <Route path="/settings" element={<SettingsPage/>}/>
    <Route path="/profile" element={authUser ? <ProfilePages/>: <Navigate to="/login"/>}/>
    </Routes>
</div>
  )
}

export default App
