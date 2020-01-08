import React from 'react'
import blogsService from '../services/blogs'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { updateBlogList } from '../reducers/blogsReducer'
import { Form, Button } from 'semantic-ui-react'

const SubmitBlog = (props) => {
	const title = useField('text')
	const author = useField('text')
	const url = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		const blog = {
			title: title.value,
			author: author.value,
			url: url.value,
			user: props.user
		}

		try {
			await blogsService.create(blog)
			props.updateBlogList()
			props.createNotification({message: `A new blog ${title.value} by ${author.value} added`, error: false}, props.notification.id)
			props.initializeUsers()
			title.reset()
			author.reset()
			url.reset()
		} catch (exception) {
			props.createNotification({message: 'Error creating blog', error: true}, props.notification.id)
			console.log('Error creating blog entry')
		}
	}
	return (
		<Form onSubmit={handleSubmit} inverted>
					<Form.Field><label>title:</label><input {...title.attributes()} /></Form.Field>
					<Form.Field><label>author:</label><input {...author.attributes()} /></Form.Field>
					<Form.Field><label>url:</label><input {...url.attributes()} /></Form.Field>
			<Button type="submit" inverted>Create</Button>
		</Form>
	)
}

const mapDispatchToProps = {
	createNotification, updateBlogList, initializeUsers
}

const mapStateToProps = (state) => {
	return {
		blogs: state.blogs,
		notification: state.notification,
		user: state.user
	}

}

const ConnectedSubmitBlog = connect(mapStateToProps, mapDispatchToProps)(SubmitBlog)
export default ConnectedSubmitBlog