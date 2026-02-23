import { createSlice } from "@reduxjs/toolkit"
import { loadFromStorage, saveToStorage } from '../utils/localStorage'
const messageSlice=createSlice({
    name: "message",
    initialState:{
        selectedUser: [],
        messages:[],
        // prevChatUsers:[],
        prevChatUsers: loadFromStorage('prevChatUsers') || []
       
    },
    reducers:{
        setSelectedUser:(state, action)=>{
            state.selectedUser=action.payload
        },
        setMessages:(state, action)=>{
            state.messages=action.payload
        },
        setPrevChatUsers:(state, action)=>{
            state.prevChatUsers=action.payload
            saveToStorage('prevChatUsers', action.payload)
        },
        
    }
})

export const {setSelectedUser, setMessages, setPrevChatUsers}=messageSlice.actions
export default messageSlice.reducer