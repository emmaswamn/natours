import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    photo:'',
    role:'',
    username:'',
    email:''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
});

export default userSlice.reducer;