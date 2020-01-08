import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = (props) => {
	const usersList = () => {
		return ( 
			props.users.map(user => <tr key={user.id}><td style={{paddingRight: 10}}><Link to={`/users/${user.id}`}>{user.username}</Link></td><td>{user.blogs.length}</td></tr>)
		)
	}

	return (
		<div>
			<h1>Users</h1>
			<table>
				<tbody>
					<tr><th /><th><b>blogs created</b></th></tr>
					{usersList()}
				</tbody>
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