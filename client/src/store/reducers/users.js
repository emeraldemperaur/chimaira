import { createSlice } from '@reduxjs/toolkit'
import { isAuthenticated, registerUser, signInUser, signOutUser } from '../actions/users';

let INIT_USER = {
    loading: false,
    data: {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        uuid: null,
        role: null,
        verified: null
    },
    auth: null
}

export const usersSlice = createSlice({
    name: 'users',
    initialState: INIT_USER,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //REGISTER USER
        .addCase(registerUser.pending, (state)=>{ state.loading = true })
        .addCase(registerUser.rejected, (state)=>{ state.loading = false; state.rejected = true })
        .addCase(registerUser.fulfilled, (state, action)=>{ 
            state.loading = false
            state.data = action.payload.data;
            state.auth = action.payload.auth;
         })
        //SIGN IN USER
        .addCase(signInUser.pending, (state)=>{ state.loading = true })
        .addCase(signInUser.rejected, (state)=>{ state.loading = false; state.rejected = true })
        .addCase(signInUser.fulfilled, (state, action)=>{ 
            state.loading = false
            state.data = action.payload.data;
            state.auth = action.payload.auth;
         })
        //IS AUTHENTICATED
        .addCase(isAuthenticated.pending, (state)=>{ state.loading = true })
        .addCase(isAuthenticated.rejected, (state)=>{ state.loading = false; state.rejected = true })
        .addCase(isAuthenticated.fulfilled, (state, action)=>{ 
            state.loading = false
            state.data = action.payload.data;
            state.auth = action.payload.auth;
         })
         //SIGN OUT
         .addCase(signOutUser.fulfilled, (state)=>{ 
             state.loading = false
             state.data = INIT_USER.data;
             state.auth = false;
          })
    }
})

export default usersSlice.reducer;