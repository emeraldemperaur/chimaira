import { createSlice } from '@reduxjs/toolkit'

let INIT_ARTIFACT = {
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

export const ragArtifactSlice = createSlice({
    name: 'artifact',
    initialState: INIT_ARTIFACT,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
    }
})

export default ragArtifactSlice.reducer;