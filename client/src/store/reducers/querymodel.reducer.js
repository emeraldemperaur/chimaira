import { createSlice } from '@reduxjs/toolkit'
import { createQuery, deleteQueryById, fetchQueries, updateQueryById } from '../actions/querymodel.actions'

let INIT_QUERIES = {
    loading: true,
    data: {
        queries: []
        }
}

export const queryModelSlice = createSlice({
    name: 'query',
    initialState: INIT_QUERIES,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //FETCH QUERIES
                        .addCase(fetchQueries.pending, (state)=>{ state.loading = true })
                        .addCase(fetchQueries.rejected, (state)=>{ state.loading = false; state.rejected = true })
                        .addCase(fetchQueries.fulfilled, (state, action)=>{ 
                            state.loading = false
                            state.data = action.payload;
                         })
        //UPDATE QUERIES
                        .addCase(updateQueryById.pending, (state)=>{ state.loading = true })
                        .addCase(updateQueryById.rejected, (state)=>{ state.loading = false; state.rejected = true })
                        .addCase(updateQueryById.fulfilled, (state, action)=>{ 
                            state.loading = false
                            state.data = action.payload;
                         })
        //DELETE QUERIES
                        .addCase(deleteQueryById.pending, (state)=>{ state.loading = true })
                        .addCase(deleteQueryById.rejected, (state)=>{ state.loading = false; state.rejected = true })
                        .addCase(deleteQueryById.fulfilled, (state, action)=>{ 
                            state.loading = false
                            state.data = action.payload;
                         })
        //CREATE QUERIES
                        .addCase(createQuery.pending, (state)=>{ state.loading = true })
                        .addCase(createQuery.rejected, (state)=>{ state.loading = false; state.rejected = true })
                        .addCase(createQuery.fulfilled, (state, action)=>{ 
                            state.loading = false
                            state.data = action.payload;
                         })
    }
})

export default queryModelSlice.reducer;