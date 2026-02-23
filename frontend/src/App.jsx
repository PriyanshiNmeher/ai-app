

import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import useGetSuggestedUsers from './hooks/useGetSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import useGetAllPost from './hooks/useGetAllPost'
import Loops from './pages/Loops'
import useGetAllLoops from './hooks/useGetAllLoops'
import Story from './pages/Story'
import useGetAllStories from './hooks/useGetAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { io } from 'socket.io-client'
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import useGetFollowingList from './hooks/useGetFollowingList'
import useGetPrevChatUsers from './hooks/useGetPrevChatUsers'
import Search from './pages/Search'
import useGetAllNotifications from './hooks/useGetAllNotifications'
import Notifications from './pages/Notifications'
import { setNotificationData } from './redux/userSlice'
import axios from 'axios'

// ✅ localhost hata ke deployed URL add kiya
// export const serverUrl = "https://ai-app-back/end-38i5.onrender.com"
export const serverUrl= "http://localhost:8000"

// ✅ ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { userData } = useSelector(state => state.user)
  if (!userData) return <Navigate to="/signin" />
  return children
}

// ✅ PublicRoute — logged in hone pe "/" pe bhejo
const PublicRoute = ({ children }) => {
  const { userData } = useSelector(state => state.user)
  if (userData) return <Navigate to="/" />
  return children
}

function App() {

  useGetCurrentUser()
  useGetSuggestedUsers()
  useGetAllPost()
  useGetAllLoops()
  useGetAllStories()
  useGetFollowingList()
  useGetPrevChatUsers()
  useGetAllNotifications()

  const { userData, notificationData } = useSelector(state => state.user)
  const { socket } = useSelector(state => state.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userData) {
      const socketIo = io(`${serverUrl}`, {
        query: {
          userId: userData._id
        }
      })
      dispatch(setSocket(socketIo))

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users))
      })

      return () => socketIo.close()
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [userData])

  socket?.on("newNotification", (noti) => {
    dispatch(setNotificationData([...notificationData, noti]))
  })

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/signup' element={<PublicRoute><SignUp /></PublicRoute>} />
      <Route path='/signin' element={<PublicRoute><SignIn /></PublicRoute>} />
      <Route path='/forgot-password' element={<PublicRoute><ForgotPassword /></PublicRoute>} />

      {/* Protected Routes */}
      <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      <Route path='/profile/:userName' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path='/story/:userName' element={<ProtectedRoute><Story /></ProtectedRoute>} />
      <Route path='/upload' element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>} />
      <Route path='/editprofile' element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
      <Route path='/messages' element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      <Route path='/messageArea' element={<ProtectedRoute><MessageArea /></ProtectedRoute>} />
      <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path='/loops' element={<ProtectedRoute><Loops /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
