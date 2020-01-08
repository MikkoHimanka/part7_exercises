import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { postComment } from '../reducers/blogsReducer'
import { createNotification } from '../reducers/notificationReducer'
import { Form, Button } from 'semantic-ui-react'

const SubmitComment = (props) => {
	const comment = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		if (comment.value.trim() === '') {
			props.createNotification({error: true, message: 'Please write a comment before submitting'}, props.notification.id)

		} else {
			try {
				await props.postComment(props.blog, {comment: comment.value, id: Math.floor(Math.random() * 10000)})
				comment.reset()
			} catch (exception) {
				props.createNotification({error: true, message: 'Error posting a comment'}, props.notification.id)
				console.log('errrrrrrorrr')
			}
		}
	}

	return (
		<Form onSubmit={handleSubmit} inverted>
			<label>comment:</label> <input {...comment.attributes()} />
			<Button type="submit" inverted>Submit</Button>
		</Form>
	)
}

const mapDispatchToProps = { 
	postComment, createNotification
}
const mapStateToProps = (state) => {return {notification: state.notification}}
const ConnectedSubmitComment = connect(mapStateToProps, mapDispatchToProps)(SubmitComment)
export default ConnectedSubmitComment