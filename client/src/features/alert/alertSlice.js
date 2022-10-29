import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    type:'',
    message:'logging',
    isShow: false
};

export const controlAlert = createAsyncThunk('alert/controlAlert', async(alertInfo,thunkAPI) => {
    try {
        // console.log(name);
        let time = 5;
        if(alertInfo.time) time = alertInfo.time;
        // console.log(alertInfo);
        // console.log(showAlert);
        thunkAPI.dispatch(showAlert(alertInfo));
        setTimeout(() => {
            thunkAPI.dispatch(hideAlert())
        }, time * 1000 );

        return;
    } catch (err) {
        
        return thunkAPI.rejectWithValue('something went wrong')
    }
});

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        hideAlert: (state) => {
            state.isShow = false;
        },
        showAlert: (state, {payload}) => {
            // console.log(state);
            // console.log(payload);
            state.type = payload.type;
            state.message = payload.message;
            state.isShow = true;
        }
    }
});



export const {showAlert, hideAlert} = alertSlice.actions;

export default alertSlice.reducer;