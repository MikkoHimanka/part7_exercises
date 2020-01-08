import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, List } from 'semantic-ui-react'

const User = (props) => {
	const user = props.users.find(u => u.id === props.userID)
	
	const blogsList = () => {
		return user.blogs.map(blog => <List.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></List.Item >)
	}
	
	if (user !== undefined) return (
		<div>
			<Header inverted as='h2' style={{marginTop: '1em'}}>{user.name}</Header>
			<Header inverted as='h3'>added blogs</Header>
			<List bulleted inverted>{blogsList()}</List>
		</div>
	)
	return null
}


const mapStateToProps = (state) => {
	return {
		users: state.users
	}
}

const ConnectedUser = connect(mapStateToProps, null)(User)
export default ConnectedUser