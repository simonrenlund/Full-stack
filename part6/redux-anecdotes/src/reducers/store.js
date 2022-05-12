//import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
//import { composeWithDevTools } from 'redux-devtools-extension' 
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

const store = configureStore({
    reducer: {
        filter: filterReducer,
        anecdotes: anecdoteReducer,
        notification: notificationReducer
    }
})

export default store