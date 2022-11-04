import { createSlice,  createAsyncThunk } from '@reduxjs/toolkit';
import request from '../../axios/custom';
import { controlAlert} from '../alert/alertSlice'
import {loadStripe} from '@stripe/stripe-js';

const initialState = {
    price: null
};

export const bookTour = createAsyncThunk('book/getTotalPrice', async(tourId,thunkAPI) => {
    const stripe = loadStripe('pk_test_51Lg4wfIGwHIlOnnnUTzazEz6gRwdCEQwkogKTQSfQBHO6EB72NBzV5QChjmCS1CTANLcx7Pd1AApPFFWljgVxyKQ00K1ss2Wn9');
    try {
        const session = await request(`/api/v1/bookings/checkout-session/${tourId}`);
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });
    } catch (err) {
        thunkAPI.dispatch(controlAlert({type: 'error', message: err.response.data.message}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

export const getTotalPrice = createAsyncThunk('book/getTotalPrice', async(_,thunkAPI) => {
    const tour = thunkAPI.getState().tour.tour;
    // 如果tour存在，那么直接使用tour.price, 如果没有，就是刷新过页面了，那么从本地储存获取
    if(tour.hasOwnProperty('price')) {
        thunkAPI.dispatch(setPrice(tour.price));
        thunkAPI.dispatch(saveLocalPrice(tour.price));
        
        return;
    }
    const price = localStorage.getItem('price');
    
    if(price) {
        thunkAPI.dispatch(setPrice(price));
        return;
    } else {
        thunkAPI.dispatch(controlAlert({type: 'error', message: 'something went wrong'}));
        return thunkAPI.rejectWithValue('something went wrong');
    }
});

export const saveLocalPrice = createAsyncThunk('book/saveLocalPrice', async(_,thunkAPI) => {
    const price = thunkAPI.getState().tour.tour.price;
    localStorage.setItem('price', price);
    // 如果tour存在，那么直接使用tour.price, 如果没有，就是刷新过页面了，那么从本地储存获取
});

const bookSlice = createSlice({
    name: 'book',
    initialState,
    reducers: {
        setPrice: (state, {payload}) => {
            state.price = payload;
        }
    }
});

export const {setPrice} = bookSlice.actions;

export default bookSlice.reducer;