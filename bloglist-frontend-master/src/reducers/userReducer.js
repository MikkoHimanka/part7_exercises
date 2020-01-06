import blogsService from '../services/blogs'
import loginService from '../services/login'

export const initializeUser = () => {
	const loggedUserJSON = window.localStorage.getItem('loggedUser')
	if (loggedUserJSON) {
		const user = JSON.parse(loggedUserJSON)
		blogsService.setToken(user.token)
		return async dispatch => {
			dispatch({
				type: 'INIT_USER',
				data: user
			})
		}
	} else return async dispatch => {
		dispatch({
			type: 'LOGOUT'
		})
	}

}

export const loginUser = (user) => {
	return async dispatch => {
		try {
			const verifiedUser = await loginService.login(user)
			
			window.localStorage.setItem('loggedUser', JSON.stringify(verifiedUser))
			blogsService.setToken(verifiedUser.token)

			dispatch({
				type: 'LOGIN',
				data: verifiedUser
			})
		} catch (exception) {
			console.log('Wrong!')
			return dispatch => {
				dispatch({
					type: 'LOGOUT'
				})
			}
		}
	}
}

export const logout = () => {
	return async dispatch => {
		dispatch({
			type: 'LOGOUT'
		})
	}
}

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.data
		case 'INIT_USER':
			return action.data
		case 'LOGOUT':
			return null

		default: return state
	}
}

export default userReducer