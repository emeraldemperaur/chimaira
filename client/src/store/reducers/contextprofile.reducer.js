import { createSlice } from '@reduxjs/toolkit'

let INIT_CONTEXT = {
    loading: false,
    data: [
        {
        email: null,
        password: null,
        firstName: null,
        lastName: null,
        uuid: null,
        role: null,
        verified: null
        }
    ]
}

export const contextProfileSlice = createSlice({
    name: 'context',
    initialState: INIT_CONTEXT,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
    }
})

export default contextProfileSlice.reducer;