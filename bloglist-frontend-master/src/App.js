import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import Login from './components/Login'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const App = (props) => {
	useEffect(() => {
		props.initializeBlogs()
		props.initializeUser()
		props.initializeUsers()
	}, [props])

	return (
		<Container>
			<style>
				{`
				html, body {
					background-color: #252839 !important;
				}
				`}
			</style>
			<div>
				<Router>
					<Login />
					<Notification />
					<Route exact path="/" render={() => <BlogList />} />
					<Route exact path="/users" render={() => <Users />} />
					<Route exact path="/users/:id" render={({match}) => <User userID={match.params.id} />} />
					<Route exact path="/blogs/:id" render={({match}) => <Blog blogID={match.params.id} />} />
				</Router>
			</div>
		</Container>
	)
}

export default connect(null, { initializeBlogs, initializeUser, initializeUsers })(App)
