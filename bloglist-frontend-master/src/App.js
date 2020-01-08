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
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const Menu = () => {

}

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
		<Login />
		<Notification />
		{submitBlogForm()}
		<BlogList />
	</div>
)}

const UsersView = () => {

	return (
		<div>
			<Login />
			<Users />
		</div>	
	)
}

const App = (props) => {
	useEffect(() => {
		props.initializeBlogs()
		props.initializeUser()
		props.initializeUsers()
	}, [props])


	return (
		<div>
			<Router>
				<Route exact path="/" render={() => <DefaultView />} />
				<Route exact path="/users" render={() => <UsersView />} />
			</Router>

		</div>
	)
}

export default connect(null, { initializeBlogs, initializeUser, initializeUsers })(App)
