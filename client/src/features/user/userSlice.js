import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLogin, userLogout } from '../auth/authSlice'
import request from '../../axios/custom';
import { controlAlert} from '../alert/alertSlice'
import { getLogStatu } from '../auth/authSlice'

const initialState = {
    photo:'',
    role:'',
    username:'',
    email:'',
    userId:''
};

export const getLocalUser = createAsyncThunk('user/getLocalUser', async(_,thunkAPI) => {
    const data = JSON.parse(localStorage.getItem('user'));
    // console.log(data);

    if (data)  {
        thunkAPI.dispatch(isLogin());

        if(data.hasOwnProperty('user')) {
            thunkAPI.dispatch(addUser(data.user));
            return;
        }
       
        thunkAPI.dispatch(addUser(data));

        return data;
    }

    return thunkAPI.rejectWithValue('something went wrong');
});

export const saveLocalUser = createAsyncThunk('user/saveLocalUser', async(userInfo,thunkAPI) => {
    // console.log(userInfo);
    localStorage.setItem('user', JSON.stringify(userInfo));

});

export const deleteLocalUser = createAsyncThunk('user/deleteLocalUser', async(_,thunkAPI) => {
    
    localStorage.removeItem('user');


});

export const updateSettings = createAsyncThunk('user/updateSettings', async(userInfo, thunkAPI) => {
    try {
        const url = '/api/v1/users/updateMe';
        // console.log(userInfo);

        let data = {};
        data.name = userInfo.userName;
        data.email = userInfo.userEmail;
        if(userInfo.userPhoto) {
            data.photo = userInfo.userPhoto;
        } 

        const resp = await request({
            method: 'PATCH',
            url,
            data
        });

        // console.log(resp.data.data);

        thunkAPI.dispatch(addUser(resp.data.data));

        thunkAPI.dispatch(saveLocalUser(resp.data.data));

        thunkAPI.dispatch(controlAlert({type: 'success', message: `Update setting successfully!`}));

    } catch (err) {
        thunkAPI.dispatch(controlAlert({type: 'error', message: err.response.data.message}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

export const updatePassword = createAsyncThunk('user/updatePassword', async(data, thunkAPI) => {
    try {
        const url = '/api/v1/users/updateMyPassword';

        // console.log(data);

        await request({
            method: 'PATCH',
            url,
            data
        });
        // console.log(res);

        thunkAPI.dispatch(controlAlert({type: 'success', message: `Update password successfully! Please log in!`}));
        thunkAPI.dispatch(userLogout());

    } catch (err) {
        thunkAPI.dispatch(controlAlert({type: 'error', message: err.response.data.message}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser : (state,{payload}) => {
            // console.log('payload', payload);
            state.photo = payload.photo;
            state.role = payload.role;
            state.username = payload.name;
            state.email = payload.email;
            state.userId = payload._id;
        },
        clearUser : (state) => {
            state.photo = '';
            state.role = '';
            state.username = '';
            state.email = '';
            state.userId = '';
        }
    },
    extraReducers: {
    }
});

export const {addUser, clearUser} = userSlice.actions;

export default userSlice.reducer;