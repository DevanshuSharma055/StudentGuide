import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  userAuth: false,
  userData: {}
}

const UserSlice = createSlice({
    name: 'user',
    initialState: initialValue, // Changed from 'initialValue' to 'initialState'
    reducers: {
       setUserAuth: (state, action) => {
      state.userAuth = action.payload;  
    },
    setUserData: (state,action) =>{
      state.userData= action.payload
    }
    }
})

export const { setUserAuth, setUserData } = UserSlice.actions;
export default UserSlice.reducer;