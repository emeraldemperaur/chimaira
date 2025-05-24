import { createSlice } from '@reduxjs/toolkit'
import { createConfiguration, deleteConfigurationById, fetchConfigurations, updateConfigurationById } from '../actions/settings.actions'

let INIT_SETTINGS = {
    loading: true,
    data: {
        configurations: []
        }
}

export const configurationSlice = createSlice({
    name: 'configuration',
    initialState: INIT_SETTINGS,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        //FETCH CONFIGURATIONS
            .addCase(fetchConfigurations.pending, (state)=>{ state.loading = true })
            .addCase(fetchConfigurations.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(fetchConfigurations.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //UPDATE CONFIGURATIONS
            .addCase(updateConfigurationById.pending, (state)=>{ state.loading = true })
            .addCase(updateConfigurationById.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(updateConfigurationById.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //DELETE CONFIGURATIONS
            .addCase(deleteConfigurationById.pending, (state)=>{ state.loading = true })
            .addCase(deleteConfigurationById.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(deleteConfigurationById.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
        //CREATE CONFIGURATIONS
            .addCase(createConfiguration.pending, (state)=>{ state.loading = true })
            .addCase(createConfiguration.rejected, (state)=>{ state.loading = false; state.rejected = true })
            .addCase(createConfiguration.fulfilled, (state, action)=>{ 
                                    state.loading = false
                                    state.data = action.payload;
                                 })
    }
})

export default configurationSlice.reducer;