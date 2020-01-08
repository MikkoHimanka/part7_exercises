import React from 'react'
import { connect } from 'react-redux'
import { clickBlog } from '../reducers/blogsReducer'
//import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'

const Blog = (props) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5
	}

	const blog = props.blog
	const handleLikeThis = (event) => { 
		event.stopPropagation()
		props.handleLike(props.blog)
	}
	const handleRemove = props.handleRemove

	if (!blog.clicked) {
		if (props.user.username === blog.user.username) {
			return (
				<div style={blogStyle}>
					<div style={{position: 'relative', zIndex:1}} onClick={() => props.clickBlog(blog)}>
          &quot;{blog.title}&quot; by {blog.author}<br />
						<a href={blog.url}>{blog.url}</a><br />
						{blog.likes} likes<button style={{position: 'relative', zIndex:2}} onClick={handleLikeThis}>Like</button><br />
          Added by {blog.user.name}<br />
						<button onClick={() => handleRemove(blog)}>Delete</button>
					</div>
				</div>
			)
		}
		return (
			<div style={blogStyle}>
				<div style={{position: 'relative', zIndex:1}} onClick={() => props.clickBlog(blog)}>
        &quot;{blog.title}&quot; by {blog.author}<br />
					<a href={blog.url}>{blog.url}</a><br />
					{blog.likes} likes<button style={{position: 'relative', zIndex:2}} onClick={handleLikeThis}>Like</button><br />
          Added by {blog.user.name}<br />
				</div>
			</div>
		)
	}

	return (
		<div style={blogStyle}>
			<div onClick={() => props.clickBlog(blog)} className="showButton">
      &quot;{blog.title}&quot; by {blog.author}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
		blogs: state.blogs
	}
}

const mapDispatchToProps = {
	clickBlog
}

const ConnectedBlog = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default ConnectedBlog