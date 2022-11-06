import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../axios/custom';
import {addUser, clearUser, saveLocalUser, getLocalUser, deleteLocalUser} from '../user/userSlice';
import { controlAlert} from '../alert/alertSlice'


const initialState = {
    isLoggedIn:false,
    firstLoad: true
};



export const getLogStatu = createAsyncThunk('auth/getLogStatu', async(_,thunkAPI) => {
    try {
        // console.log('getLog');
        thunkAPI.dispatch(getLocalUser());

        // console.log('authlog', thunkAPI.getState().auth.isLoggedIn);
        if(thunkAPI.getState().auth.isLoggedIn) {
            // console.log('work');
            return;
        }

        const resp = await request('/api/v1');
        // console.log('getLogStatu',resp.data.data);
        // console.log(thunkAPI);
        thunkAPI.dispatch(addUser(resp.data.data));
        thunkAPI.dispatch(saveLocalUser(resp.data.data));
        
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
        // console.log(resp.data.data.user);
        thunkAPI.dispatch(addUser(resp.data.data.user));
        thunkAPI.dispatch(saveLocalUser(resp.data.data));


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

export const userSignup = createAsyncThunk('auth/userSignup', async(userinfo, thunkAPI) => {
    try {
        // console.log(thunkAPI);
        // console.log(userinfo.email,userinfo.password);
        const resp = await request.post('/api/v1/users/signup', {
            name: userinfo.name,
            email: userinfo.email,
            password: userinfo.password,
            passwordConfirm: userinfo.passwordConfirm
        });
        // console.log(resp.data.data.user);
        thunkAPI.dispatch(addUser(resp.data.data.user));
        thunkAPI.dispatch(saveLocalUser(resp.data.data));


        thunkAPI.dispatch(controlAlert({type: 'success', message: 'Sign up successfully!'}));
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
        thunkAPI.dispatch(deleteLocalUser());
        thunkAPI.dispatch(logout());

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
        },
        trunOfffirst: (state) => {
            state.firstLoad = false;
        },
        logout: (state) => {
            state.isLoggedIn = false;
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
    }
});


export const {isLogin, setTimer, trunOfffirst, logout} = authSlice.actions;

export default authSlice.reducer;