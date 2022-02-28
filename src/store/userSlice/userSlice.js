import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReactAPI } from '../../services/conectionAPI';

//* THUNKS
export const signUp = createAsyncThunk(
    'user/signUp',
    (data) => ReactAPI.signUp(data)
);

export const verifyEmail = createAsyncThunk(
    'user/verifyEmail',
    (tokenVerify) => ReactAPI.verifyEmail(tokenVerify)
);

export const signIn = createAsyncThunk(
    'user/signIn',
    (data) => ReactAPI.signIn(data)
);

export const getServices = createAsyncThunk(
    'user/getServices',
    (userId) => ReactAPI.getServicesByUserId(userId)
)

export const getUserCardData = createAsyncThunk(
    'user/getUserCardData',
    (userId) => ReactAPI.getUserCardData(userId)
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: JSON.parse(window.localStorage.getItem('user')) || null,
        signUpState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        verifyEmailState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        signInState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        getServicesState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        getUserCardData: {
            loading: false,
            error: false,
            message: '',
            status: ''
        }
    },
    reducers: {
        logout(state) {
            state.user = null;
            window.localStorage.clear();
        },
        resetUserMethodsMessage(state, action) {
            state[action.payload].message = '';
            state[action.payload].status = '';
        }
    },
    extraReducers:
    (builder) => {
        builder
            //* Sign Up Method Thunk */
            .addCase(signUp.pending, (state) => {
                state.signUpState.loading = true;
                state.signUpState.error = false;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.signUpState.loading = false;
                state.signUpState.error = false;
                console.log(action.payload);

                if (action.payload.status === 'Failed') {
                    state.signUpState.message = 'Este email ya ha sido registrado.';
                    state.signUpState.status = 'Failed';
                    return;
                }

                if (action.payload.status === 'OK') {
                    state.signUpState.message = 'Usuario registrado con éxito. Porfavor revise su email para confirmarlo.';
                    state.signUpState.status = 'OK';
                    return;
                }
            })
            .addCase(signUp.rejected, (state) => {
                state.signUpState.loading = false;
                state.signUpState.error = true;
            })
             //* Sing In User Method Thunk */
             .addCase(signIn.pending, (state) => {
                state.signInState.loading = true;
                state.signInState.error = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.signInState.loading = false;
                state.signInState.error = false;
                console.log(action.payload);

                if (action.payload.status === 'Failed') {
                    state.user = null;
                    state.signInState.message = 'Su cuenta no ha sido verificada o email/contraseña incorrectos.';
                    state.signInState.status = 'Failed'
                    return;
                }

                if (action.payload.status === 'OK') {
                    state.signInState.message = 'Inicio de sesión exitoso.';
                    state.signInState.status = 'OK';
                    window.localStorage.setItem('user', JSON.stringify(action.payload.data));
                    window.localStorage.setItem('token', action.payload.data.token);
                    state.user = action.payload.data;
                    return;
                }
            })
            .addCase(signIn.rejected, (state) => {
                state.signInState.loading = false;
                state.signInState.error = true;
            })
            //* VerifyEmail Method Thunk */
            .addCase(verifyEmail.pending, (state) => {
                state.verifyEmailState.loading = true;
                state.verifyEmailState.error = false;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.verifyEmailState.loading = false;
                state.verifyEmailState.error = false;

                if (action.payload.status === 'Failed') {
                    state.verifyEmailState.status = 'Failed';
                    state.verifyEmailState.message = 'Ocurrió un error al verificar tu cuenta.';
                }

                if (action.payload.status === 'OK') {
                    state.verifyEmailState.status = 'OK';
                    state.verifyEmailState.message = 'Tu cuenta ha sido verificada.';
                }
                console.log(action.payload)
            })
            .addCase(verifyEmail.rejected, (state) => {
                state.verifyEmailState.loading = false;
                state.verifyEmailState.error = true;
            })
            .addCase(getServices.pending, (state) => {
                state.getServicesState.loading = true;
                state.getServicesState.error = false;
            })
            .addCase(getServices.fulfilled, (state, action) => {
                state.getServicesState.loading = false;
                state.getServicesState.error = false;
                console.log(action.payload)

                if (action.payload.status === 'Failed') {
                    state.getServicesState.message = 'Los services no puedieron ser listados. Porfavor intente otra vez 😔.';
                    state.getServicesState.status = 'Failed'
                }

                if (action.payload.message === 'Unauthorized') {
                    window.localStorage.setItem('tokenInvalid', true);
                }

                if (action.payload.status === 'OK') {
                    state.user.services = action.payload.data;
                    return;
                }
            })
            .addCase(getServices.rejected, (state, action) => {
                state.getServicesState.loading = false;
                state.getServicesState.error = true;
            })
            //* GetUserCardData Method Thunk */
            .addCase(getUserCardData.pending, (state) => {
                state.getUserCardData.loading = true;
                state.getUserCardData.error = false;
            })
            .addCase(getUserCardData.fulfilled, (state, action) => {
                state.getUserCardData.loading = false;
                state.getUserCardData.error = false;

                if (action.payload.status === 'Failed') {
                    state.getUserCardData.status = 'Failed';
                    state.getUserCardData.message = 'Ocurrió un error al tratar de obtener la data 😔.';
                }

                if (action.payload.message === 'Unauthorized') {
                    window.localStorage.setItem('tokenInvalid', true);
                    return;
                }

                if (action.payload.status === 'OK') {
                    state.getUserCardData.status = 'OK';
                    state.getUserCardData.message = 'La información fue corractemente procesada 😊.';

                    state.user = {
                        ...state.user,
                        ...action.payload.data
                    }
                }
                console.log(action.payload)
            })
            .addCase(getUserCardData.rejected, (state) => {
                state.getUserCardData.loading = false;
                state.getUserCardData.error = true;
            })

    }        
})

export const { logout, resetUserMethodsMessage } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectSignUpState = (state) => state.user.signUpState;
export const selectEmailVerifyState = (state) => state.user.verifyEmailState;
export const selectSignInState = (state) => state.user.signInState;
export const selectGetServicesState = (state) => state.user.getServicesState;
export const selectGetUserCardData = (state) => state.user.getUserCardData;

export default userSlice.reducer;