import React from 'react'
import blogsService from '../services/blogs'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { createNotification } from '../reducers/notificationReducer'
import { updateBlogList } from '../reducers/blogsReducer'

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
			title.reset()
			author.reset()
			url.reset()
		} catch (exception) {
			props.createNotification({message: 'Error creating blog', error: true}, props.notification.id)
			console.log('Error creating blog entry')
		}
	}
	return (
		<form onSubmit={handleSubmit}>
            title: <input {...title.attributes()} /><br />
            author: <input {...author.attributes()} /><br />
            url: <input {...url.attributes()} /><br />
			<button type="submit">Create</button>
		</form>
	)
}

const mapDispatchToProps = {
	createNotification, updateBlogList
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