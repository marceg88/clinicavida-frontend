import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReactAPI } from '../../services/conectionAPI';

export const registerCard = createAsyncThunk(
    'payment/registerCard',
    (data) => ReactAPI.registerCard(data)
)

export const registerPayment = createAsyncThunk(
    'payment/registerPayment',
    (data) => ReactAPI.registerPayment(data)
)

const paymentSlice = createSlice({
    name: 'payment',
    initialState:{
        formType: 'registerCard',
        currentCard: null,
        registerCardForm: {
            number: '',
            expYear: '',
            month: '',
            cvc: ''
        },
        registerCardState: {
            loading: false,
            error: false,
            status: '',
            message: ''
        },
        registerPaymentState: {
            loading: false,
            error: false,
            status: '',
            message: ''
        }
    },
    reducers: {
        setPaymentFormType(state, action) {
            state.formType = action.payload;
        },
        setRegisterCardFormValues(state, action) {
            state.registerCardForm = {
                ...state.registerCardForm,
                ...action.payload
            }
        },
        setRegisterPaymentFormValues(state, action) {
            state.registerPaymentForm = {
                ...state.registerPaymentForm,
                ...action.payload
            }
        },
        resetPaymentMethods(state, action) {
            state[action.payload].status = '';
            state[action.payload].message = '';
        },
        setCurrentCard(state, action) {
            state.currentCard = action.payload;
        }
    }
})

export const {
    setPaymentFormType,
    setRegisterCardFormValues,
    setRegisterPaymentFormValues,
    resetPaymentMethods,
    setCurrentCard
} = paymentSlice.actions;

export const selectPayment = (state) => state.payment;
export const selectRegisterCardForm = (state) => state.payment.registerCardForm;
export const selectRegisterCardState = (state) => state.payment.registerCardState;
export const selectRegisterPaymentForm = (state) => state.payment.registerPaymentForm;
export const selectRegisterPaymentState = (state) => state.payment.registerPaymentState;

export default paymentSlice.reducer;