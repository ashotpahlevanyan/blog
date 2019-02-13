import axios from 'axios';

/**
 * Post list
 */
export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const RESET_POSTS = 'RESET_POSTS';

/**
 * Create new post
 * */
export const CREATE_POST = 'CREATE_POST';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const RESET_NEW_POST = 'RESET_NEW_POST';

/**
 * Reset
 * */
export const RESET_POST_FIELDS = 'RESET_POST_FIELDS';

/**
 * Fetch post
 * */
export const FETCH_POST = 'FETCH_POST';
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS';
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE';
export const RESET_ACTIVE_POST = 'RESET_ACTIVE_POST';

/**
 * Delete post
 * */
export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';
export const RESET_DELETED_POST = 'RESET_DELETED_POST';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = 111;
export function fetchPosts() {
	const request = axios({
		method: 'get',
		url: `${ROOT_URL}/posts`,
		headers: [],
		params: {
			key: API_KEY
		}
	});

	return {
		type: FETCH_POSTS,
		payload: request
	};
}

export function fetchPostsSuccess(posts) {
	return {
		type: FETCH_POSTS_SUCCESS,
		payload: posts
	};
}

export function fetchPostsFailure(error) {
	return {
		type: FETCH_POSTS_FAILURE,
		payload: error
	};
}

export function resetPostFields() {
	return {
		type: RESET_POST_FIELDS
	};
}


export function createPost(props) {
	const request = axios({
		method: 'post',
		data: props,
		url: `${ROOT_URL}/posts`,
		headers: [],
		params: {
			key: API_KEY
		}
	});

	return {
		type: CREATE_POST,
		payload: request
	};
}

export function createPostSuccess(newPost) {
	return {
		type: CREATE_POST_SUCCESS,
		payload: newPost
	};
}

export function createPostFailure(error) {
	return {
		type: CREATE_POST_FAILURE,
		payload: error
	};
}

export function resetNewPost() {
	return {
		type: RESET_NEW_POST
	};
}

export function resetDeletedPost() {
	return {
		type: RESET_DELETED_POST
	};
}

export function fetchPost(id) {
	const request = axios({
		method: 'get',
		url: `${ROOT_URL}/posts/${id}`,
		headers: [],
		params: {
			key: API_KEY
		}
	});

	return {
		type: FETCH_POST,
		payload: request
	};
}


export function fetchPostSuccess(activePost) {
	return {
		type: FETCH_POST_SUCCESS,
		payload: activePost
	};
}

export function fetchPostFailure(error) {
	return {
		type: FETCH_POST_FAILURE,
		payload: error
	};
}

export function resetActivePost() {
	return {
		type: RESET_ACTIVE_POST
	}
}


export function deletePost(id) {
	const request = axios({
		method: 'delete',
		url: `${ROOT_URL}/posts/${id}`,
		headers: [],
		params: {
			key: API_KEY
		}
	});
	return {
		type: DELETE_POST,
		payload: request
	};
}

export function deletePostSuccess(deletedPost) {
	return {
		type: DELETE_POST_SUCCESS,
		payload: deletedPost
	};
}

export function deletePostFailure(response) {
	return {
		type: DELETE_POST_FAILURE,
		payload: response
	};
}

export const postActionTypes = {
	FETCH_POSTS,
	FETCH_POSTS_SUCCESS,
	FETCH_POSTS_FAILURE,
	RESET_POSTS,
	FETCH_POST,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAILURE,
	RESET_ACTIVE_POST,
	CREATE_POST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAILURE,
	RESET_NEW_POST,
	RESET_POST_FIELDS,
	DELETE_POST,
	DELETE_POST_SUCCESS,
	DELETE_POST_FAILURE,
	RESET_DELETED_POST
};