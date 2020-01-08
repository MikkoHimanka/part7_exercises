import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, removeBlog, postComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { withRouter } from 'react-router-dom'
import Togglable from './Togglable'
import SubmitComment from './SubmitComment'
import { Button, Header, Segment, Table } from 'semantic-ui-react'

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
		return blog.comments.map(comm => <Table.Row key={comm.id}><Table.Cell>{comm.comment}</Table.Cell></Table.Row>)
	}

	const commentFormRef = React.createRef()

	if (blog !== undefined) return (
		<div>
			<Header dividing inverted as='h2' style={{marginTop: '1em'}}>{blog.title}</Header>
			<Segment inverted>
				<a href={blog.url}>{blog.url}</a> <br />
				{blog.likes} likes <Button compact inverted onClick={handleLike} size='mini'>Like</Button> <br />
				Added by {blog.user.name} <br />
				<Button compact inverted onClick={handleRemove} size='mini'>Delete</Button>
			</Segment>
			<div>
				<Header style={{marginTop: '1em'}} as='h3' inverted>Comments</Header>
				<Togglable buttonLabel={'Add Comment'} ref={commentFormRef}>
					<SubmitComment blog={blog} />
				</Togglable>
				<Table celled inverted>
					<Table.Body>{loadComments()}</Table.Body>
				</Table>
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