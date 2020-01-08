import React from 'react'
import { connect } from 'react-redux'
import { initializeBlogs, removeBlog, likeBlog } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Table, Header } from 'semantic-ui-react'
import Togglable from './Togglable'
import SubmitBlog from './SubmitBlog'

const BlogList = (props) => {
	const blogFormRef = React.createRef()
	const submitBlogForm = () => (
		<Togglable buttonLabel={'New Blog'} ref={blogFormRef}>
			<Header as='h2' inverted>Create new</Header >
			<SubmitBlog />
		</Togglable>
	)

	const content = () => props.blogs
		.map(blog => 
			<Table.Row key={blog.id}>
				<Table.Cell><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></Table.Cell>
			</Table.Row>
		)
	
	if (props.user !== null) {
		return (
			<div style={{marginTop: '1em'}}>
				<Header as='h2' inverted>Blogs</Header>
				<Table striped celled inverted>
					<Table.Body>{content()}</Table.Body>
				</Table>
				{submitBlogForm()}
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