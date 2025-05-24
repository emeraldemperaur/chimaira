import { createSlice } from '@reduxjs/toolkit'
import { createContext, deleteContextById, fetchContexts, updateContextById } from '../actions/contextprofile.actions'

let INIT_CONTEXTS = {
    loading: true,
    data: {
        contexts: []
        }
}

export const contextProfileSlice = createSlice({
    name: 'contexts',
    initialState: INIT_CONTEXTS,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //FETCH CONTEXTS
                .addCase(fetchContexts.pending, (state)=>{ state.loading = true })
                .addCase(fetchContexts.rejected, (state)=>{ state.loading = false; state.rejected = true })
                .addCase(fetchContexts.fulfilled, (state, action)=>{ 
                    state.loading = false
                    state.data = action.payload;
                 })
        //UPDATE CONTEXT
                .addCase(updateContextById.pending, (state)=>{ state.loading = true })
                .addCase(updateContextById.rejected, (state)=>{ state.loading = false; state.rejected = true })
                .addCase(updateContextById.fulfilled, (state, action)=>{ 
                    state.loading = false
                    state.data = action.payload;
                 })
        //DELETE CONTEXT
                .addCase(deleteContextById.pending, (state)=>{ state.loading = true })
                .addCase(deleteContextById.rejected, (state)=>{ state.loading = false; state.rejected = true })
                .addCase(deleteContextById.fulfilled, (state, action)=>{ 
                    state.loading = false
                    state.data = action.payload;
                 })
        //CREATE CONTEXT
                .addCase(createContext.pending, (state)=>{ state.loading = true })
                .addCase(createContext.rejected, (state)=>{ state.loading = false; state.rejected = true })
                .addCase(createContext.fulfilled, (state, action)=>{ 
                    state.loading = false
                    state.data = action.payload;
                 })
    }
})

export default contextProfileSlice.reducer;