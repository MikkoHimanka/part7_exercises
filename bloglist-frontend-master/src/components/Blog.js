import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, postComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import Togglable from './Togglable'
import SubmitComment from './SubmitComment'

const Blog = (props) => {
	const blog = props.blogs.find(u => u.id === props.blogID)

	const handleRemove = () => {
		if (window.confirm(`Remove ${blog.title} by ${blog.author}`))
			try{
				props.removeBlog(blog.id)
				props.createNotification({error: false, message: 'Blog post deleted'}, props.notification.id)
			} catch (exception) {
				console.log('Error removing a blog post')
			}
		props.history.push('/')
	}	

	const handleLike = () => {
		try{
			props.likeBlog(blog)
			props.createNotification({error: false, message: `Liked ${blog.title} by ${blog.author}`}, props.notification.id)
			
		} catch (exception) {
			props.createNotification({error: true, message: 'Error liking a blog post'}, props.notification.id)
			console.log('Error liking a blog post')
		}
	}

	const loadComments = () => {
		return blog.comments.map(comm => <li key={comm.id}>{comm.comment}</li>)
	}

	const commentFormRef = React.createRef()

	if (blog !== undefined) return (
		<div>
			<h2>{blog.title}</h2>
			<a href={blog.url}>{blog.url}</a> <br />
			{blog.likes} likes <button onClick={handleLike}>Like</button> <br />
			Added by {blog.user.name} <br />
			<button onClick={handleRemove}>Delete</button>
			<div>
				<h3>Comments</h3>
				<Togglable buttonLabel={'Add Comment'} ref={commentFormRef}>
					<SubmitComment blog={blog} />
				</Togglable>
				<ul>{loadComments()}</ul>
			</div>
		</div>
	)
	return null
}


const mapDispatchToProps = { likeBlog, removeBlog, postComment, createNotification }

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		notification: state.notification
	}
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)
export default withRouter(ConnectedBlog)