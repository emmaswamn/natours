import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLogin, userLogout } from '../auth/authSlice'
import request from '../../axios/custom';
import { controlAlert} from '../alert/alertSlice'

const initialState = {
    photo:'',
    role:'',
    username:'',
    email:'',
    userId:''
};

export const getLocalUser = createAsyncThunk('user/getLocalUser', async(_,thunkAPI) => {
    const data = JSON.parse(localStorage.getItem('user'));


    if (data )  {
        thunkAPI.dispatch(isLogin());
        
        thunkAPI.dispatch(addUser(data.user));

        return data;
    }

    return thunkAPI.rejectWithValue('something went wrong');
});

export const saveLocalUser = createAsyncThunk('user/saveLocalUser', async(userInfo,thunkAPI) => {
    
    localStorage.setItem('user', JSON.stringify(userInfo));

});

export const deleteLocalUser = createAsyncThunk('user/deleteLocalUser', async(_,thunkAPI) => {
    
    localStorage.removeItem('user');


});

export const updateSettings = createAsyncThunk('user/updateSettings', async(userInfo, thunkAPI) => {
    try {
        const url = 
            userInfo.type === 'password'
            ? '/api/v1/users/updateMyPassword'
            : '/api/v1/users/updateMe';



        const res = await request({
            method: 'PATCH',
            url,
            data:userInfo
        });

        if (userInfo.type !== 'password') {
            console.log(res);
            // thunkAPI.dispatch(addUser(res.user));
        }

        thunkAPI.dispatch(controlAlert({type: 'success', message: `${userInfo.type.toUpperCase()} setting successfully!`}));

    } catch (err) {
        thunkAPI.dispatch(controlAlert({type: 'error', message: err.response.data.message}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

export const updatePassword = createAsyncThunk('user/updatePassword', async(data, thunkAPI) => {
    try {
        const url = '/api/v1/users/updateMyPassword';

        console.log(data);

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