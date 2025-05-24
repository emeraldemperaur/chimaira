import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from '../reducers/notifications.reducer';
import { getAuthorizationCookie } from '../../components/artisan/vinci';


export const fetchArtifacts = createAsyncThunk(
    'artifact/fetchArtifacts',
    async ({order='ASC', sortby='id'}, {dispatch}) => {
        try{
            const httpRequest = await axios.get(`/api/rag/rag?order=${order}&sortby=${sortby}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            return { artifacts:[...httpRequest.data] }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const deleteArtifactById = createAsyncThunk(
    'artifact/deleteArtifactById',
    async ({artifact}, {dispatch}) => {
        try{
            const httpRequest = await axios.delete(`/api/rag/rag/${artifact.id}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/rag/rag?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {artifacts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const updateArtifactById = createAsyncThunk(
    'artifact/updateArtifactById',
    async ({artifact}, {dispatch}) => {
        try{
            const httpRequest = await axios.patch(`/api/rag/rag/${artifact.id}`, 
                {...artifact}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/rag/rag?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {artifacts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const createArtifact = createAsyncThunk(
    'artifact/createArtifact',
    async ({artifact}, {dispatch}) => {
        try{
            const httpRequest = await axios.post(`/api/rag/rag`, 
                {...artifact}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/rag/rag?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {artifacts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)
