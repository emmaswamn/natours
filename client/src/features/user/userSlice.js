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
    reducers: {
        addUser : (state,{payload}) => {
            console.log('payload', payload);
            state.photo = payload.photo;
            state.role = payload.role;
            state.username = payload.name;
            state.email = payload.email;
        },
        clearUser : (state) => {
            state.photo = '';
            state.role = '';
            state.username = '';
            state.email = '';
        }
    }
});

export const {addUser, clearUser} = userSlice.actions;

export default userSlice.reducer;