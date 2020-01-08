import React from 'react'
import { connect } from 'react-redux'

const Users = (props) => {
	const usersList = () => {
		return ( 
			props.users.map(user => <tr><td style={{paddingRight: 10}}>{user.username}</td><td>{user.blogs.length}</td></tr>)
		)
	}

	return (
		<div>
			<h2>Users</h2>
			<table>
				<tr><th /><th><b>blogs created</b></th></tr>
				{usersList()}
			</table>
		</div>
	)
}


const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const ConnectedUsers = connect(mapStateToProps)(Users)
export default ConnectedUsers