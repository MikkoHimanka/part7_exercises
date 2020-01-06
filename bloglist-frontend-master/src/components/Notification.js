import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
	const notification = props.notification
	const message = notification.message
	const error = notification.error

	if (message === undefined || message === null) {
		return null
	}

	const errorStyle = {
		color: '#993300',
		backgroundColor: 'grey',
		padding: 10,
		margin: '1em'
	}

	const normalStyle = {
		padding: 10,
		color: 'green',
		margin: '1em'
	}

	if (error) {
		return <div style={errorStyle}>{message}</div>
	}

	if (!error) {
		return <div style={normalStyle}>{message}</div>
	}
}

const mapStateToProps = (state) => {
	return {
		notification: state.notification
	}
}

const ConnectedNotification = connect(mapStateToProps, null)(Notification)
export default ConnectedNotification