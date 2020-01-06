import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
	blogs: blogsReducer,
	user: userReducer,
	notification : notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store