import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setFollowing, setUserData } from '../redux/userSlice.js'
import { setCurrentUserStory } from '../redux/storySlice.js'

function useGetFollowingList() {
    const dispatch= useDispatch()
    
  useEffect(()=>{
   const fetchUser= async () => {
    try {
        const result = await axios.get(`${serverUrl}/api/user/followingList`,{withCredentials:true})
       
        dispatch(setFollowing(result.data))
       
    } catch (error) {
        console.log(error)
    }
   }
   fetchUser()
  },[dispatch])
}

export default useGetFollowingList
