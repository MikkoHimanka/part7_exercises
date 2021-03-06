import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({
	blogs: blogsReducer,
	user: userReducer,
	notification : notificationReducer,
	users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store