import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice/userSlice'
import serviceReducer from './serviceSlice/serviceSlice'
import paymentReducer from './epaycoSlice/epaycoSlice'

export const store = configureStore({
    reducer: {
        user: userReducer, 
        service: serviceReducer,
        payment: paymentReducer
    }
})