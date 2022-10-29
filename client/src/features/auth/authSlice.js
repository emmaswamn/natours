import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../axios/custom';
import {addUser, clearUser} from '../user/userSlice';
import { controlAlert} from '../alert/alertSlice'

const initialState = {
    isLoggedIn:false,
};




export const getLogStatu = createAsyncThunk('auth/getLogStatu', async(_,thunkAPI) => {
    try {
        // console.log(name);
        
        const resp = await request('/api/v1');
        // console.log('getLogStatu',resp.data.data);
        // console.log(thunkAPI);
        thunkAPI.dispatch(addUser(resp.data.data));
        return resp.data;
    } catch (err) {
        
        return thunkAPI.rejectWithValue('something went wrong')
    }
});

export const userLogin = createAsyncThunk('auth/userLogin', async(userinfo, thunkAPI) => {
    try {
        // console.log(thunkAPI);
        // console.log(userinfo.email,userinfo.password);
        const resp = await request.post('/api/v1/users/login', {
            email: userinfo.email,
            password: userinfo.password
        });
        console.log(resp.data.data.user);
        thunkAPI.dispatch(addUser(resp.data.data.user));
        thunkAPI.dispatch(controlAlert({type: 'success', message: 'Logged in successfully!'}));
        // useAlert('success', 'Logged in successfully!');

        return resp.data;
    } catch (err) {
        // console.log(err.response.data.message);
        thunkAPI.dispatch(controlAlert({type: 'error', message: err.response.data.message}));
        // useAlert('error', err.response.data.message);
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

export const userLogout = createAsyncThunk('auth/userLogout', async(_, thunkAPI) => {
    try {
        await request('/api/v1/users/logout');
        thunkAPI.dispatch(clearUser());

    } catch (err) {
        thunkAPI.dispatch(controlAlert({type: 'error', message: 'Error logging out! Try again.'}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        isLogin: (state) => {
            state.isLoggedIn = true;
        }
    },
    extraReducers: {
        [getLogStatu.fulfilled] : (state, action) => {
            // console.log(state);
            state.isLoggedIn = true;
        },
        [getLogStatu.rejected] : (state,action) => {
            // console.log(state);
            state.isLoggedIn = false;
        },
        [userLogin.fulfilled] : (state, action) => {
            // console.log(state);
            state.isLoggedIn = true;
        },
        [userLogout.fulfilled] : (state, action) => {
            // console.log(state);
            state.isLoggedIn = false;
        }
    }
});


export const {isLogin} = authSlice.actions;

export default authSlice.reducer;