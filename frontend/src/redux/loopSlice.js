// import { createSlice } from "@reduxjs/toolkit"
// const loopSlice=createSlice({
//     name: "loop",
//     initialState:{
//         loopData: [],
        
//     },
//     reducers:{
//         setLoopData:(state, action)=>{
//             state.loopData=action.payload
//         },
       
//     }
// })

// export const {setLoopData}=loopSlice.actions
// export default loopSlice.reducer

import { createSlice } from '@reduxjs/toolkit'
import { loadFromStorage, saveToStorage } from '../utils/localStorage'

const loopSlice = createSlice({
  name: 'loop',
  initialState: {
    loopData: loadFromStorage('loopData') || []
  },
  reducers: {
    setLoopData: (state, action) => {
      state.loopData = action.payload
      saveToStorage('loopData', action.payload)
    }
  }
})

export const { setLoopData } = loopSlice.actions
export default loopSlice.reducer