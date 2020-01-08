import React from 'react'
import { useField } from '../hooks'
import { connect } from 'react-redux'
import { postComment } from '../reducers/blogsReducer'

const SubmitComment = (props) => {
	const comment = useField('text')

	const handleSubmit = async (event) => {
		event.preventDefault()
		try {
			await props.postComment(props.blog, {comment: comment.value, id: Math.floor(Math.random() * 10000)})
			comment.reset()
		} catch (exception) {
			console.log('errrrrrrorrr')
		}

	}

	return (
		<form onSubmit={handleSubmit}>
			comment: <input {...comment.attributes()} style={{ width: '20em'}} />
		</form>
	)
}

const mapDispatchToProps = { 
	postComment
}

const ConnectedSubmitComment = connect(null, mapDispatchToProps)(SubmitComment)
export default ConnectedSubmitComment