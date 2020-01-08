import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'

const Users = (props) => {
	const usersList = () => {
		return ( 
			props.users.map(user => <Table.Row key={user.id}><Table.Cell><Link to={`/users/${user.id}`}>{user.username}</Link></Table.Cell><Table.Cell>{user.blogs.length}</Table.Cell></Table.Row>)
		)
	}

	return (
		<div>
			<Header as='h1' inverted style={{marginTop: '1em'}}>Users</Header>
			<Table celled inverted>
				<Table.Body>
					<Table.Row><Table.Cell /><Table.Cell><b>blogs created</b></Table.Cell></Table.Row>
					{usersList()}
				</Table.Body>
			</Table>
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