import {
	FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, RESET_POSTS,
	FETCH_POST, FETCH_POST_SUCCESS,  FETCH_POST_FAILURE, RESET_ACTIVE_POST,
	CREATE_POST, CREATE_POST_SUCCESS, CREATE_POST_FAILURE, RESET_NEW_POST,
	DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, RESET_DELETED_POST,
	RESET_POST_FIELDS
} from '../actions/posts';

/*import { postActionTypes as types } from '../actions/posts';*/

const INITIAL_STATE = {
	postsList: {posts: [], error:null, loading: false},
	newPost:{post:null, error: null, loading: false},
	activePost:{post:null, error:null, loading: false},
	deletedPost: {post: null, error:null, loading: false},
};

export default function(state = INITIAL_STATE, action) {
	let error;
	switch(action.type) {

		case FETCH_POSTS:
			return { ...state, postsList: {posts:[], error: null, loading: true} };
		case FETCH_POSTS_SUCCESS:
			return { ...state, postsList: {posts: action.payload, error:null, loading: false} };
		case FETCH_POSTS_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, postsList: {posts: [], error: error, loading: false} };
		case RESET_POSTS:
			return { ...state, postsList: {posts: [], error:null, loading: false} };

		case FETCH_POST:
			return { ...state, activePost:{...state.activePost, loading: true}};
		case FETCH_POST_SUCCESS:
			return { ...state, activePost: {post: action.payload, error:null, loading: false}};
		case FETCH_POST_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, activePost: {post: null, error:error, loading:false}};
		case RESET_ACTIVE_POST:
			return { ...state, activePost: {post: null, error:null, loading: false}};

		case CREATE_POST:
			return {...state, newPost: {...state.newPost, loading: true}};
		case CREATE_POST_SUCCESS:
			return {...state, newPost: {post:action.payload, error:null, loading: false}};
		case CREATE_POST_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, newPost: {post:null, error:error, loading: false}};
		case RESET_NEW_POST:
			return {...state,  newPost:{post:null, error:null, loading: false}};

		case DELETE_POST:
			return {...state, deletedPost: {...state.deletedPost, loading: true}};
		case DELETE_POST_SUCCESS:
			return {...state, deletedPost: {post:action.payload, error:null, loading: false}};
		case DELETE_POST_FAILURE:
			error = action.payload || {message: action.payload.message};
			return {...state, deletedPost: {post:null, error:error, loading: false}};
		case RESET_DELETED_POST:
			return {...state,  deletedPost:{post:null, error:null, loading: false}};

		case RESET_POST_FIELDS:
			return {...state, newPost:{...state.newPost, error: null, loading: null}};
		default:
			return state;
	}
}
