import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { setFollowing, setUserData } from '../redux/userSlice.js'
import { setStoryList } from '../redux/storySlice.js'

function useGetAllStories() {
    const dispatch= useDispatch()
    const {userData}=useSelector(state=>state.user)
    const {storyData}=useSelector(state=>state.story)
  useEffect(()=>{
   const fetchStories= async () => {
    try {
        const result = await axios.get(`${serverUrl}/api/story/getAll`,{withCredentials:true})
        dispatch(setStoryList(result.data))
        
    } catch (error) {
        console.log(error)
    }
   }
   fetchStories()
  },[dispatch, userData, storyData])
}

export default useGetAllStories
