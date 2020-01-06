import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { initializeBlogs, removeBlog, likeBlog } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'

const BlogList = (props) => {
	const content = () => props.blogs
		.map(blog => 
			<div key={blog.id}>
				<Blog blog={blog} handleRemove={handleRemove} handleLike={handleLike} />
			</div>)
	
	const handleLike = (blog) => {
		try{
			props.likeBlog(blog)
			props.createNotification({error: false, message: `Liked ${blog.title} by ${blog.author}`}, props.notification.id)
			
		} catch (exception) {
			props.createNotification({error: true, message: 'Error liking a blog post'}, props.noti.id)
			console.log('Error liking a blog post')
		}
	}

	const handleRemove = (blog) => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`))
			try{
				props.removeBlog(blog.id)
			} catch (exception) {
				console.log('Error removing a blog post')
			}
	}

	if (props.user !== null) {
		return (
			<div>{content()}</div>
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