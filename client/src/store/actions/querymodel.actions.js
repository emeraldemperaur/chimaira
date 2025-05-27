import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from '../reducers/notifications.reducer';
import { getAuthorizationCookie } from '../../components/artisan/vinci';


export const fetchQueries = createAsyncThunk(
    'query/fetchQueries',
    async ({order='ASC', sortby='id'}, {dispatch}) => {
        try{
            let cookie = localStorage.getItem("cookie");
            const httpRequest = await axios.get(`/api/query/query?order=${order}&sortby=${sortby}`, { headers: { 'Authorization': `Bearer ${cookie}` } });
            return { queries:[...httpRequest.data] }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const deleteQueryById = createAsyncThunk(
    'query/deleteQueryById',
    async ({query}, {dispatch}) => {
        try{
            const httpRequest = await axios.delete(`/api/query/query/${query.id}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/query/query?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {queries:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const updateQueryById = createAsyncThunk(
    'query/updateQueryById',
    async ({query}, {dispatch}) => {
        try{
            const httpRequest = await axios.patch(`/api/query/query/${query.id}`, 
                {...query}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/query/query?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {queries:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const createQuery = createAsyncThunk(
    'query/createQuery',
    async ({query}, {dispatch}) => {
        try{
            const httpRequest = await axios.post(`/api/query/query`, 
                {...query}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/query/query?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {queries:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)