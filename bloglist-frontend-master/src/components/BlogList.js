import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs, removeBlog, likeBlog } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogList = (props) => {
	const blogListStyle = {
		listStyleType: 'none',
		padding: '1em'
	}

	const content = () => props.blogs
		.map(blog => 
			<li key={blog.id}>
				<Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
			</li>
		)
	
	if (props.user !== null) {
		return (
			<div>
				<h1>Blogs</h1>
				<ul style={blogListStyle}>{content()}</ul>
			</div>
		)
	} else return (
		<div></div>
	)
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		user: state.user,
		notification: state.notification
	}
}

const mapDispatchToProps = {
	initializeBlogs, removeBlog, likeBlog, createNotification
}

const ConnectedBlogList = connect(mapStateToProps, mapDispatchToProps)(BlogList)
export default ConnectedBlogList