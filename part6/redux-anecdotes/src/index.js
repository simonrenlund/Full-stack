import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore, combineReducers } from 'redux'
//import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import App from './App'
import store from './reducers/store'
/* import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  filter: filterReducer,
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})
const store = createStore(reducer,composeWithDevTools()) */

ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>,
  document.getElementById('root')
)
