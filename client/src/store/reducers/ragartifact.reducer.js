import { createSlice } from '@reduxjs/toolkit'
import { createArtifact, deleteArtifactById, fetchArtifacts, updateArtifactById } from '../actions/ragartifact.actions'

let INIT_ARTIFACTS = {
    loading: true,
    data: {
        artifacts: []
        }
}

export const ragArtifactSlice = createSlice({
    name: 'artifact',
    initialState: INIT_ARTIFACTS,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //FETCH ARTIFACTS
            .addCase(fetchArtifacts.pending, (state)=>{ state.loading = true })
            .addCase(fetchArtifacts.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(fetchArtifacts.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //UPDATE ARTIFACTS
            .addCase(updateArtifactById.pending, (state)=>{ state.loading = true })
            .addCase(updateArtifactById.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(updateArtifactById.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //DELETE ARTIFACTS
            .addCase(deleteArtifactById.pending, (state)=>{ state.loading = true })
            .addCase(deleteArtifactById.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(deleteArtifactById.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //CREATE ARTIFACTS
            .addCase(createArtifact.pending, (state)=>{ state.loading = true })
            .addCase(createArtifact.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(createArtifact.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
    }
})

export default ragArtifactSlice.reducer;