/* eslint-disable no-undef */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal } from '../reducers/notifications.reducer';
import { getAuthorizationCookie } from '../../components/artisan/vinci';


export const fetchContexts = createAsyncThunk(
    'context/fetchContexts',
    async ({order='ASC', sortby='id'}, {dispatch}) => {
        try{

            //let cookie = browser.cookies.get({ name: "x-access-token", url: "https://chimaira-client.sliplane.app"});
            const httpRequest = await axios.get(`/api/context/context?order=${order}&sortby=${sortby}`);
            return {contexts:[...httpRequest.data] }

        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const deleteContextById = createAsyncThunk(
    'context/deleteContextById',
    async ({context}, {dispatch}) => {
        try{
            const httpRequest = await axios.delete(`/api/context/context/${context.id}`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/context/context?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {contexts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const updateContextById = createAsyncThunk(
    'context/updateContextById',
    async ({context}, {dispatch}) => {
        try{
            const httpRequest = await axios.patch(`/api/context/context/${context.id}`, 
                {...context}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/context/context?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {contexts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)

export const createContext = createAsyncThunk(
    'context/createContext',
    async ({context}, {dispatch}) => {
        try{
            const httpRequest = await axios.post(`/api/context/context`, 
                {...context}, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
            if(httpRequest){
                const refreshHttp = await axios.get(`/api/context/context?order=ASC&sortby=id`, { headers: { 'Authorization': `Bearer ${getAuthorizationCookie()}` } });
                return {contexts:[...refreshHttp.data] }
            }
        }catch(error){
            dispatch(errorGlobal(error.response.data.message));
            throw error;
        }
    }
)


