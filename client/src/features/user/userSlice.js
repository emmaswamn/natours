import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isLogin } from '../auth/authSlice'

const initialState = {
    photo:'',
    role:'',
    username:'',
    email:'',
    userId:''
};

export const getLocalUser = createAsyncThunk('user/getLocalUser', async(_,thunkAPI) => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user )  {
        thunkAPI.dispatch(isLogin());


        return user;
    }

    return thunkAPI.rejectWithValue('something went wrong');
});

export const saveLocalUser = createAsyncThunk('user/saveLocalUser', async(userInfo,thunkAPI) => {
    
    localStorage.setItem('user', JSON.stringify(userInfo));

});

export const deleteLocalUser = createAsyncThunk('user/deleteLocalUser', async(_,thunkAPI) => {
    
    localStorage.removeItem('user');


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
        [getLocalUser.fulfilled] : (state, {payload}) => {
            
            state.photo = payload.user.photo;
            state.role = payload.user.role;
            state.username = payload.user.name;
            state.email = payload.user.email;
            state.userId = payload.user._id;
        },
    }
});

export const {addUser, clearUser} = userSlice.actions;

export default userSlice.reducer;