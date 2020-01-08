import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const User = (props) => {
	const user = props.users.find(u => u.id === props.userID)
	
	const blogsList = () => {
		return user.blogs.map(blog => <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>)
	}
	
	if (user !== undefined) return (
		<div>
			<h2>{user.name}</h2>
			<h3>added blogs</h3>
			<ul>{blogsList()}</ul>
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