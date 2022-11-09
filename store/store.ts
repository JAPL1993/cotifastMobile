import { configureStore } from '@reduxjs/toolkit';
import loaderSlice from './states/loading/loading';

export default configureStore({
    reducer: {
        loader: loaderSlice
    }
})