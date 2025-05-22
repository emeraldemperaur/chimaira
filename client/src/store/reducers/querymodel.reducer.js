import { createSlice } from '@reduxjs/toolkit'

let INIT_QUERY = {
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

export const queryModelSlice = createSlice({
    name: 'query',
    initialState: INIT_QUERY,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
    }
})

export default queryModelSlice.reducer;