import { createSlice } from "@reduxjs/toolkit"
import { loadFromStorage, saveToStorage } from '../utils/localStorage'
const storySlice=createSlice({
    name: "user",
    initialState:{
        // storyData: [],
        // storyList:[],
         storyList: loadFromStorage('storyList') || [],
  currentUserStory: loadFromStorage('currentUserStory') || null,
        currentUserStory:[],
        
    },
    reducers:{
        setStoryData:(state, action)=>{
            state.storyData=action.payload
        },
    
        setStoryList:(state, action)=>{
            state.storyList=action.payload
            saveToStorage('storyList', action.payload)
        },
        setCurrentUserStory:(state, action)=>{
            state.currentUserStory=action.payload
            saveToStorage('currentUserStory', action.payload)
        },
       
    }
})

export const {setStoryData, setStoryList, setCurrentUserStory}=storySlice.actions
export default storySlice.reducer