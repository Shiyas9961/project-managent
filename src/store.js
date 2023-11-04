import {configureStore} from '@reduxjs/toolkit'
import taskReducer from './slices/TaskSlice'

export const store = configureStore({
    reducer : {
        tasks : taskReducer
    }
})