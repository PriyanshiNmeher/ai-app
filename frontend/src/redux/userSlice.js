import { createSlice } from "@reduxjs/toolkit"
import { loadFromStorage, saveToStorage } from '../utils/localStorage'
const userSlice=createSlice({
    name: "user",
    initialState:{
        // userData: null,
        userData: loadFromStorage('userData') || null,
        suggestedUsers:null,
        profileData:null,
        // following:[],
        following: loadFromStorage('following') || [],
        searchData:null,
        notificationData:[],
    },
    reducers:{
        // setUserData:(state, action)=>{
        //     state.userData=action.payload
        // },
        setUserData: (state, action) => {
  state.userData = action.payload
  if (action.payload) {
    saveToStorage('userData', action.payload)
  } else {
    removeFromStorage('userData') 
  }
},
        setSuggestedUsers:(state, action)=>{
            state.suggestedUsers=action.payload
        },
        setProfileData:(state, action)=>{
            state.profileData=action.payload
        },
        setSearchData:(state, action)=>{
            state.searchData=action.payload
        },
        setNotificationData:(state, action)=>{
            state.notificationData=action.payload
        },
        // setFollowing:(state, action)=>{
        //     state.following=action.payload
        // },
        setFollowing: (state, action) => {
  state.following = action.payload
  saveToStorage('following', action.payload)
},
        toggleFollow:(state, action)=>{
            const targetUserId=action.payload
            if (state.following.includes(targetUserId)) {
                state.following=state.following.filter(id=>id!=targetUserId)
            } else {
                state.following.push(targetUserId)
            }
             saveToStorage('following', state.following)
        }
        // toggleFollow:(state, action)=>{
        //     const targetUserId=action.payload
        //     if (state.following.includes(targetUserId)) {
        //         state.following=state.following.filter(id=>id!=targetUserId)
        //     } else {
        //         state.following.push(targetUserId)
        //     }
        // }
    }
})

export const {setUserData,setNotificationData,setSearchData, setSuggestedUsers, setProfileData, toggleFollow, setFollowing}=userSlice.actions
export default userSlice.reducer