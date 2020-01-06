const showNotification = (notification, id) => {
	return {data: {...notification, id: id + 1}, type: 'CREATE_NOTIFICATION'}
}

const hideNotification = (id) => {
	return {type: 'CLEAR_NOTIFICATION', data: (id + 1)}
}

export const createNotification = (notification, id) => {
	return (dispatch) => {
		dispatch(showNotification(notification, id))
		setTimeout(() => {
			dispatch(hideNotification(id))
		}, 5000)
	}
}

const notificationReducer = (state = {error: false, message: null, id: 0}, action) => {
	switch (action.type) {
		case 'CREATE_NOTIFICATION':
			return action.data
		case 'CLEAR_NOTIFICATION':
			if (action.data === state.id) {
				return {error: false, message: null, id: state.id}
			} else return state

		default: return state
	}
}

export default notificationReducer