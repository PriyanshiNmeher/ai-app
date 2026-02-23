// import { createSlice } from "@reduxjs/toolkit"
// const postSlice=createSlice({
//     name: "post",
//     initialState:{
//         postData: [],
       
//     },
//     reducers:{
//         setPostData:(state, action)=>{
//             state.postData=action.payload
//         },
        
//     }
// })

// export const {setPostData}=postSlice.actions
// export default postSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage, saveToStorage } from '../utils/localStorage'

const postSlice = createSlice({
  name: 'post',
  initialState: {
    postData: loadFromStorage('postData') || []
  },
  reducers: {
    setPostData: (state, action) => {
      state.postData = action.payload
      saveToStorage('postData', action.payload)
    }
  }
})

export const { setPostData } = postSlice.actions
export default postSlice.reducer