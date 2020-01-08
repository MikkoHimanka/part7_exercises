import blogsService from '../services/blogs'

export const likeBlog = (blog) => {
	return async dispatch => {
		await blogsService.like(blog)
		dispatch({
			type: 'LIKE_BLOG',
			data: blog
		})
	}
}

export const removeBlog = (id) => {
	return async dispatch => {
		await blogsService.remove(id)
		dispatch({
			type: 'REMOVE',
			data: { id }
		})
	}
}

export const initializeBlogs = () => {
	return async dispatch => {
		const blogs = await blogsService.getAll()
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs.sort((a, b) => b.likes - a.likes)
		})
	}
}

export const updateBlogList = () => {
	return async dispatch => {
		const newArray = await blogsService.getAll()
		dispatch({
			type: 'UPDATE',
			data: newArray
		})
	}
}

export const postComment = (blog, comment) => {
	return async dispatch => {
		const newBlog = {
			id: blog.id,
			comment
		}
		await blogsService.postComment(newBlog)
		dispatch({
			type: 'POST_COMMENT',
			data: newBlog
		})
	}
}

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_BLOGS':
			return action.data.map(x => x.comments === undefined ? {...x, comments: []} : x)
		case 'REMOVE':
			const id = action.data.id
			return state.filter(object => object.id !== id)
		case 'LIKE_BLOG':
			const objectToChange = state.find(x => x.id === action.data.id)
			const changedObject = {
				...objectToChange,
				likes: objectToChange.likes + 1,
			}
			return state.map(obj => obj.id !== action.data.id ? obj : changedObject).sort((a, b) => b.likes - a.likes)
		case 'UPDATE':
			const newArray = action.data.map(obj => !state.map(x => x.id).includes(obj.id) ? obj : null)
			const newObject = newArray.find(x => x !== null)
			return [...state, {...newObject}]
		case 'POST_COMMENT':
			const uncommented = state.find(x => x.id === action.data.id)
			const commented = {
				...uncommented,
				comments: uncommented.comments.concat(action.data.comment)
			}
			return state.map(obj => obj.id !== action.data.id ? obj : commented).sort((a, b) => b.likes - a.likes)

		default: return state
	}
}

export default blogsReducer