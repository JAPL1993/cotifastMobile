import { createSlice } from '@reduxjs/toolkit'

export const loadingSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { setLoading } = loadingSlice.actions;

export default loadingSlice.reducer;