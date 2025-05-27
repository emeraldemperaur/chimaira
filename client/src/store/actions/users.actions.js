/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { errorGlobal, successGlobal } from '../reducers/notifications.reducer';
import { getAuthorizationCookie, removeAuthorizationCookie } from '../../components/artisan/vinci';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async({uuid, emailSignUp, passwordSignUp, confirmPasswordSignUp, firstName, lastName, role}, {dispatch}) => {
        try{
            const httpRequest = await axios.post('/api/auth/register', {
                email: emailSignUp.trim(),
                password: passwordSignUp.trim(),
                firstName: 'Meka',
                lastName: 'Godzilla',
                role: 'root',
                uuid: 'Tester' + Math.floor(Math.random() * 100).toString()
            });
        // show success notification
        dispatch(successGlobal(`User account (${emailSignUp}) created successfully`));
        return { data: httpRequest.data.user, auth: true }
        }catch(error){
        // show success notification
        dispatch(errorGlobal(error.response.data.message));
        throw error;
        }
    }
)

export const signInUser = createAsyncThunk(
    'users/signInUser',
    async({emailSignIn, passwordSignIn}, {dispatch}) => {
        try{
            console.log(`Signed In Checker ${emailSignIn}`)

            const httpRequest = await axios.post('/api/auth/signin', {
                email: emailSignIn.trim(),
                password: passwordSignIn.trim()
            });
        // show success notification
        dispatch(successGlobal(`Authentication successful`));
        console.log(`Signed In ${emailSignIn}`)
        sessionStorage.setItem('cookie', httpRequest.data.user.token);
        console.log(`\nSign In User ${JSON.stringify(httpRequest.data.user)}\n`);
        console.log(`\nSign In Token ${httpRequest.data.user.token}\n`);
        return { data: httpRequest.data.user, auth: true }
        }catch(error){
        // show success notification
        dispatch(errorGlobal(error.response.data.message));
        console.log(`Sign In for ${emailSignIn} failed\nError: ${error.response.data.message}`)
        throw error;
        }
    }
)

export const isAuthenticated = createAsyncThunk(
    'users/isAuthenticated',
    async()=>{
        try{
            const httpRequest = await axios.get('/api/auth/isauth', { headers: { 'Authorization': `Bearer ${sessionStorage.getItem('cookie')}` } });
            const demoUser = await axios.get('/api/user/profile/2');
            console.log(`User (${demoUser.data.uuid}) authenticated`);
            return { data: httpRequest.data, auth: true }
        }catch(error){
            console.log(`User profile (${httpRequest.data.uuid}) not authorized`);
            return { data: {}, auth: false }
        }
    }
)

export const signOutUser = createAsyncThunk(
    'users/signOutUser',
    async()=>{
        console.log(`Deleted user session cookie`);
        removeAuthorizationCookie();
    }
)