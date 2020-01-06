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

export const clickBlog = (blog) => {
	return async dispatch => {
		dispatch({
			type: 'CLICK',
			data: blog
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

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'CLICK':
			const objectToClick = state.find(x => x.id === action.data.id)
			const clickedObject = {
				...objectToClick,
				clicked: !(objectToClick.clicked)
			}
			return state.map(obj => obj.id !== action.data.id ? obj : clickedObject)
		case 'INIT_BLOGS':
			const clicked = (array) => {
				return array.map(obj => ({ ...obj, clicked: true }))
			}
			return clicked(action.data)
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
			return [...state, {...newObject, clicked: true}]

		default: return state
	}
}

export default blogsReducer