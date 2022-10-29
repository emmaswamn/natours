import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../axios/custom';

const initialState = {
    allTours:[],
    tour:{}
};

export const getAllTours = createAsyncThunk('tour/getAllTours', async(thunkAPI) => {
    try {
        // console.log(name);
        // console.log(thunkAPI.getState());
        const resp = await request('/api/v1/tours');
        // console.log(resp);
        return resp.data;
    } catch (err) {
        return thunkAPI.rejectWithValue('something went wrong')
    }
});

const tourSlice = createSlice({
    name: 'tour',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllTours.fulfilled] : (state, action) => {
            // console.log(action);
            state.allTours = action.payload.data.tour;
        },
        [getAllTours.rejected] : (state,action) => {
            console.log(state);
        }

    }
});

export default tourSlice.reducer;