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
        }
    }
});
export const { signInFailure, signInStart, signInSuccess,updateFormData } = userSlicer.actions;
export default userSlicer.reducer;
