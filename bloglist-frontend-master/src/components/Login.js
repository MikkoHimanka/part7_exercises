import React from 'react'
import { connect } from 'react-redux'
import { logout, loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'
import { Link } from 'react-router-dom'

const Login = (props) => {
	const Menu = () => {
		return (
			<div style={{backgroundColor: '#ABABAB'}}>
				<Link style={{paddingRight: '1em'}} to={'/'}>Blogs</Link>
				<Link style={{paddingRight: '1em'}} to={'/users'}>Users</Link>
				{props.user.name} logged in <button onClick={() => logout()}>Logout</button>
			</div>
		)
	}

	const username = useField('text')
	const password = useField('password')

	const handleLogin = (event) => {
		event.preventDefault()
		const user = {
			username: username.value, password: password.value
		}
		console.log(user)
		props.loginUser(user)

		username.reset()
		password.reset()
	}

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
        Username
				<input {...username.attributes()} />
			</div>
			<div>
        Password
				<input {...password.attributes()} />
			</div>
			<button type="submit">Login</button>
		</form>
	)

	const logout = () => {
		window.localStorage.clear()
		props.logout()
	}

	if (props.user === null) {
		return (
			<div>
				<h1>Log in to application</h1>
				{loginForm()}
			</div>
		)
	} else return (
		<div>
			<Menu />
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user
	}
}

const mapDispatchToProps = {
	logout, loginUser
}

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login)
export default ConnectedLogin