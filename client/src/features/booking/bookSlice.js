import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../axios/custom';

const initialState = {
    isOpen: false,
};

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {}
});

export default bookSlice.reducer;