import React from 'react'
import { Navigate, Route,Routes } from 'react-router'
import NotificationPage from './Pages/NotificationPage.jsx'
import HomePage from './Pages/HomePage.jsx'
import LoginPage from './Pages/LoginPage.jsx'
import ChatPage from './Pages/ChatPage.jsx'
import CallPage from './Pages/CallPage.jsx'
import SignUpPage from './Pages/SignUpPage.jsx'
import OnboardingPage from './Pages/OnboardingPage.jsx'
import toast,{ Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import axiosInstance from './lib/axios.js'; // ✅ Correct

const App = () => {
  const { isLoading, data:authData, error } = useQuery({
    queryKey: ['authUsers'],
    queryFn: async () =>{
        const res= await axiosInstance.get('/auth/me');
        return res.data;
      },
      retry:false,
  })
  const authUsers=authData?.user
  return (
      <div className='h-screen' data-theme="night">
        {/* <button className='btn btn-neutral' onClick={()=>toast.success("Hello world!!")}>click me</button> */}
        <Routes>
          <Route path="/" element={authUsers ? <HomePage />:<Navigate to='/login'/>} />
          <Route path="/login" element={!authUsers ? <LoginPage />:<Navigate to='/'/>} />
          <Route path="/Chat" element={authUsers ? <ChatPage />:<Navigate to='/login'/>} /> 
          <Route path="/Call" element={authUsers ? <CallPage />:<Navigate to='/login'/>} />
          <Route path="/Notification" element={authUsers ? <NotificationPage />:<Navigate to='/login'/>} />
          <Route path="/SignUp" element={!authUsers ? <SignUpPage />:<Navigate to='/'/>} /> 
          <Route path="/Onboarding" element={authUsers ? <OnboardingPage />:<Navigate to='/login'/>} />
        </Routes>
        {/* <button className="btn">Button</button>
        <button className="btn btn-neutral">Neutral</button>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <button className="btn btn-accent">Accent</button>
        <button className="btn btn-ghost">Ghost</button>
        <button className="btn btn-link">Link</button>     */}
        <Toaster />
      </div>
  )
}

export default App
