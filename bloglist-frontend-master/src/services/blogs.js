import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

let token = null

const setToken = newToken => {
	token = `bearer ${newToken}`
}

const create = async blog => {
	const config = { headers: { Authorization: token } }
	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const like = async (blog) => {
	const url = baseUrl + '/' + blog.id
	const updatedBlog = {
		title: blog.title,
		author: blog.author,
		url: blog.url,
		likes: blog.likes + 1,
	}

	const response = await axios.put(url, updatedBlog)
	return response.data
}

const remove = async (id) => {
	const config = { headers: { Authorization: token } }
	const url = baseUrl + '/' + id
	const response = await axios.delete(url, config)
	return response.data
}

const postComment = async (blog) => {
	const url = baseUrl + '/' + blog.id + '/comments'
	const response = await axios.post(url, blog)
	return response.data
}

export default { getAll, setToken, create, like, remove, postComment }