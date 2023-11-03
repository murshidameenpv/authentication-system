import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: false,
    formData:{},
};

const userSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;//response data
            state.loading = false;
            state.error = false;
        },
        signInFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload

        },
        updateFormData: (state, action) => {
            state.formData = action.payload;
        },
        updateUserStart: (state) => {
            state.loading =true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        updateUserError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        deleteUserStart: (state) => {
            state.loading =true;
        },
        deleteUserSuccess: (state) => {
            state.currentUser =null;
            state.loading = false;
            state.error = false;
        },
        deleteUserError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});
export const { signInFailure, signInStart, signInSuccess, updateFormData,
    updateUserError, updateUserSuccess, updateUserStart,
    deleteUserError, deleteUserSuccess, deleteUserStart} = userSlicer.actions;
export default userSlicer.reducer;
