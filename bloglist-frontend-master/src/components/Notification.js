import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'


const Notification = (props) => {
	const notification = props.notification
	const message = notification.message
	const error = notification.error

	if (message === undefined || message === null) {
		return null
	}

	if (error) {
		return <Message error>{message}</Message>
	}

	if (!error) {
		return <Message success>{message}</Message>
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)
export default ConnectedNotification