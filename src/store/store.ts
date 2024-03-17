import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from '../Redux/counterReducer'


export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})

