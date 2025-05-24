import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from '../reducers/notifications.reducer';
import { getAuthorizationCookie } from '../../components/artisan/vinci';


export const fetchConfigurations = createAsyncThunk(
    'configuration/fetchConfigurations',
    async ({order='ASC', sortby='id'}, {dispatch}) => {
        try{
            const httpRequest = await axios.get(`/api/config/config?order=${order}&sortby=${sortby}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            return { configurations:[...httpRequest.data] }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const deleteConfigurationById = createAsyncThunk(
    'configuration/deleteConfigurationById',
    async ({configuration}, {dispatch}) => {
        try{
            const httpRequest = await axios.delete(`/api/config/config/${configuration.id}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/config/config?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {configurations:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const updateConfigurationById = createAsyncThunk(
    'configuration/updateConfigurationById',
    async ({configuration}, {dispatch}) => {
        try{
            const httpRequest = await axios.patch(`/api/config/config/${configuration.id}`, 
                {...configuration}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/config/config?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {configurations:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const createConfiguration = createAsyncThunk(
    'configuration/createConfiguration',
    async ({configuration}, {dispatch}) => {
        try{
            const httpRequest = await axios.post(`/api/config/config`, 
                {...configuration}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/config/config?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {configurations:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)