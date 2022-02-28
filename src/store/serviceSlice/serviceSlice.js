import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ReactAPI } from '../../services/conectionAPI';

export const getServiceById = createAsyncThunk(
    'service/getServiceById',
    (serviceId) => ReactAPI.getServiceById(serviceId)
);

export const registerService = createAsyncThunk(
    'service/registerService',
    (data) => ReactAPI.registerService(data)
);

export const updateServiceById = createAsyncThunk(
    'service/updateServiceById',
    (data) => ReactAPI.updateServiceById(data)
);

export const deleteServiceById = createAsyncThunk(
    'service/deleteServiceById',
    (serviceId) => ReactAPI.deleteServiceById(serviceId)
)

export const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        service: null,
        getServiceByIdState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        registerServiceState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        updateServiceState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        },
        deleteServiceState: {
            loading: false,
            error: false,
            message: '',
            status: ''
        }
    },
    reducers: {
        resetServiceMethodsMessage(state, action) {
            state[action.payload].message = '';
            state[action.payload].status = '';
        },
        setService(state, action) {
            state.service = action.payload;
        }
    },
    extraReducers:
        (builder) => {
            builder
                //* GetServiceById Method Thunk */
                .addCase(getServiceById.pending, (state) => {
                    state.getServiceByIdState.loading = true;
                    state.getServiceByIdState.error = false;
                })
                .addCase(getServiceById.fulfilled, (state, action) => {
                    state.getServiceByIdState.loading = false;
                    state.getServiceByIdState.error = false;
                    console.log(action.payload);

                    if (action.payload.status === 'Failed') {
                        state.service = null;
                        state.getServiceByIdState.message = 'No se pudo encontrar el servicio.';
                    }
                    if (action.payload.message === 'Unauthorized') {
                        window.localStorage.setItem('tokenInvalid', true);
                        return;
                    }

                    if (action.payload.status === 'OK') {
                        state.getServiceByIdState.message = 'El servicio fue encontrado.';
                        state.getServiceByIdState.status = 'OK';
                        state.service = action.payload.data;
                        return;
                    }

                })
                .addCase(getServiceById.rejected, (state) => {
                    state.getServiceByIdState.loading = false;
                    state.getServiceByIdState.error = true;
                })


                //* Registerservice Method Thunk */
                .addCase(registerService.pending, (state) => {
                    state.registerServiceState.loading = true;
                    state.registerServiceState.error = false;
                })
                .addCase(registerService.fulfilled, (state, action) => {
                    state.registerServiceState.loading = false;
                    state.registerServiceState.error = false;
                    console.log(action.payload);

                    if (action.payload.status === 'Failed') {
                        state.registerServiceState.message = 'No se pudo registrar.';
                        state.registerServiceState.status = 'Failed';
                    }
                    if (action.payload.message === 'Unauthorized') {
                        window.localStorage.setItem('tokenInvalid', true);
                        return;
                    }

                    if (action.payload.status === 'OK') {
                        state.registerServiceState.message = 'El service fue registrado con exito.';
                        state.registerServiceState.status = 'OK';
                        return;
                    }
                })
                .addCase(registerService.rejected, (state) => {
                    state.registerServiceState.loading = false;
                    state.registerServiceState.error = true;
                })


                //* Updateservice Method Thunk */
                .addCase(updateServiceById.pending, (state) => {
                    state.updateServiceState.loading = true;
                    state.updateServiceState.error = false;
                })
                .addCase(updateServiceById.fulfilled, (state, action) => {
                    state.updateServiceState.loading = false;
                    state.updateServiceState.error = false;
                    console.log(action.payload);

                    if (action.payload.status === 'Failed') {
                        state.updateServiceState.message = 'No se puso actualizar.';
                        state.updateServiceState.status = 'Failed';
                    }
                    if (action.payload.message === 'Unauthorized') {
                        window.localStorage.setItem('tokenInvalid', true);
                        return;
                    }

                    if (action.payload.status === 'OK') {
                        state.updateServiceState.message = 'El service fue actualizado con exito.';
                        state.updateServiceState.status = 'OK';
                        return;
                    }
                })
                .addCase(updateServiceById.rejected, (state) => {
                    state.updateServiceState.loading = false;
                    state.updateServiceState.error = true;
                })

                //* DeleteserviceById Method Thunk */
                .addCase(deleteServiceById.pending, (state) => {
                    state.deleteServiceState.loading = true;
                    state.deleteServiceState.error = false;
                })
                .addCase(deleteServiceById.fulfilled, (state, action) => {
                    state.deleteServiceState.loading = false;
                    state.deleteServiceState.error = false;
                    console.log(action.payload);

                    if (action.payload.status === 'Failed') {
                        state.deleteServiceState.status = 'Failed';
                        state.deleteServiceState.message = 'No se pudo eliminar.';
                    }
                    if (action.payload.message === 'Unauthorized') {
                        window.localStorage.setItem('tokenInvalid', true);
                        return;
                    }

                    if (action.payload.status === 'OK') {
                        state.deleteServiceState.status = 'OK';
                        state.deleteServiceState.message = 'El service se elimino con exito.';
                        state.service = null;
                        return;
                    }

                })
                .addCase(deleteServiceById.rejected, (state) => {
                    state.deleteServiceState.loading = false;
                    state.deleteServiceState.error = true;
                })
        }
})

export const { resetServiceMethodsMessage, setService } = serviceSlice.actions;

export const selectService = (state) => state.service.service;
export const selectGetServiceByIdState = (state) => state.service.getServiceByIdState;
export const selectRegisterServiceState = (state) => state.service.registerServiceState;
export const selectUpdateServiceState = (state) => state.service.updateServiceState;
export const selectDeleteServiceState = (state) => state.service.deleteServiceState;

export default serviceSlice.reducer;
