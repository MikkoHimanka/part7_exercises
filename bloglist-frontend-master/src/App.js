import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import SubmitBlog from './components/SubmitBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Login from './components/Login'

const App = (props) => {
	const blogFormRef = React.createRef()

	useEffect(() => {
		props.initializeBlogs()
		props.initializeUser()
	}, [props])

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
	)
}

export default connect(null, { initializeBlogs, initializeUser })(App)
