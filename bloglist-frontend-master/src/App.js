import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import SubmitBlog from './components/SubmitBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const DefaultView = () => {
	const blogFormRef = React.createRef()
	const submitBlogForm = () => (
		<Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
			<h2>Create new</h2>
			<SubmitBlog />
		</Togglable>
	)

	return (
	<div>
		<BlogList />
		<div style={{padding: 0}}>{submitBlogForm()}</div>
	</div>
)}

const App = (props) => {
	useEffect(() => {
		props.initializeBlogs()
		props.initializeUser()
		props.initializeUsers()
	}, [props])

	return (
		<div>
			<Router>
				<Login />
				<Notification />
				<Route exact path="/" render={() => <DefaultView />} />
				<Route exact path="/users" render={() => <Users />} />
				<Route exact path="/users/:id" render={({match}) => <User userID={match.params.id} />} />
				<Route exact path="/blogs/:id" render={({match}) => <Blog blogID={match.params.id} />} />
			</Router>
		</div>
	)
}


export default connect(null, { initializeBlogs, initializeUser, initializeUsers })(App)
