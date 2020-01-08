import React from 'react'
import { connect } from 'react-redux'
import { logout, loginUser } from '../reducers/userReducer'
import { useField } from '../hooks'
import { Link } from 'react-router-dom'
import { Form, Button, Menu } from 'semantic-ui-react'

const Login = (props) => {
	const Menue = () => {
		return (
			<Menu inverted>
				<Menu.Item link><Link to={'/'}>Blogs</Link></Menu.Item>
				<Menu.Item link><Link to={'/users'}>Users</Link></Menu.Item>
				<Menu.Menu position='right'>
					<Menu.Item>{props.user.name} logged in</Menu.Item>
					<Menu.Item content='Logout' onClick={() => logout()} />
				</Menu.Menu>
			</Menu>
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
		<Form onSubmit={handleLogin}>
			<Form.Field>
        		<label>Username</label>
				<input {...username.attributes()} />
			</Form.Field>
			<Form.Field>
        		<label>Password</label>
				<input {...password.attributes()} />
			</Form.Field>
			<Button type='submit'>Login</Button>
		</Form>
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
			<Menue />
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