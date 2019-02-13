import actionTypes from './actionTypes';
import axios from 'axios';

/**
 * API BASE URL
 * */
const baseUrl = 'https://reduxblog.herokuapp.com/api';

/**
 * API Key:
 * */
const apiKey = 123;

/**
 * Allowed Request Types: GET, POST
 * */
const articles = '/posts';

/**
 * Allowed Request Types: GET, DELETE
 * */
const oneArticle = '/post/:id';


/**
 * Fetch All Articles
 * */

const fetchAllArticlesBegin = () => ({
	type: actionTypes.FETCH_ALL_ARTICLES_BEGIN
});

const fetchAllArticlesSuccess = (articles) => ({
	type: actionTypes.FETCH_ALL_ARTICLES_SUCCESS,
	payload: {articles}
});

const fetchAllArticlesFailure = (error) => ({
	type: actionTypes.FETCH_ALL_ARTICLES_FAILURE,
	payload: {error}
});

const fetchAllArticles = () => {
	return dispatch => {
		dispatch(fetchAllArticlesBegin());
		axios.get(`${baseUrl}/${articles}`, {
			params: {
				key: apiKey
			}
		})
			.then((response) => {
				if(response.status !== 200) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				//console.log(response);
				dispatch(fetchAllArticlesSuccess(response.data));
			})
			.catch((error) => {
				//console.log(error);
				dispatch(fetchAllArticlesFailure(error));
			});
	};
};

/**
 * Create a Single Article
 * */

const createArticleBegin = () => ({
	type: actionTypes.CREATE_ARTICLE_BEGIN
});

const createArticleSuccess = (article) => ({
	type: actionTypes.CREATE_ARTICLE_SUCCESS,
	payload: {article}
});

const createArticleFailure = (error) => ({
	type: actionTypes.CREATE_ARTICLE_FAILURE,
	payload: {error}
});

const createArticle = (article) => {
	return dispatch => {
		dispatch(createArticleBegin());
		axios.post(`${baseUrl}/${articles}`, {
			params: {
				key: apiKey
			},
			data: {...article}
		})
			.then((response) => {
				if(response.status !== 201) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				//console.log(response);
				dispatch(createArticleSuccess(response.data));
			})
			.catch((error) => {
				//console.log(error);
				dispatch(createArticleFailure(error));
			});
	};
};

/**
 * Fetch Single Article
 * */

const fetchArticleBegin = () => ({
	type: actionTypes.FETCH_ARTICLE_BEGIN
});

const fetchArticleSuccess = (article) => ({
	type: actionTypes.FETCH_ARTICLE_SUCCESS,
	payload: {article}
});

const fetchArticleFailure = (error) => ({
	type: actionTypes.FETCH_ARTICLE_FAILURE,
	payload: {error}
});

const fetchArticle = (id) => {
	return dispatch => {
		dispatch(fetchArticleBegin());
		axios.delete(`${baseUrl}/${articles}/${id}`, {
			params: {
				key: apiKey
			}
		})
			.then((response) => {
				if(response.status !== 200) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				//console.log(response);
				dispatch(fetchArticleSuccess(response.data));
			})
			.catch((error) => {
				//console.log(error);
				dispatch(fetchArticleFailure(error));
			});
	};
};

/**
 * Delete a Single Article
 * */

const deleteArticleBegin = () => ({
	type: actionTypes.DELETE_ARTICLE_BEGIN
});

const deleteArticleSuccess = (article) => ({
	type: actionTypes.DELETE_ARTICLE_SUCCESS,
	payload: {article}
});

const deleteArticleFailure = (error) => ({
	type: actionTypes.DELETE_ARTICLE_FAILURE,
	payload: {error}
});

const deleteArticle = (id) => {
	return dispatch => {
		dispatch(deleteArticleBegin());
		axios.delete(`${baseUrl}/${articles}/${id}`, {
			params: {
				key: apiKey
			}
		})
			.then((response) => {
				if(response.status !== 200) {
					throw Error(response.statusText);
				}
				return response;
			})
			.then(response => {
				//console.log(response);
				dispatch(deleteArticleSuccess(response.data));
			})
			.catch((error) => {
				//console.log(error);
				dispatch(deleteArticleFailure(error));
			});
	};
};


const articleActions = {
	createArticleBegin,
	createArticleSuccess,
	createArticleFailure,
	createArticle,
	fetchAllArticlesBegin,
	fetchAllArticlesSuccess,
	fetchAllArticlesFailure,
	fetchAllArticles,
	deleteArticleBegin,
	deleteArticleSuccess,
	deleteArticleFailure,
	deleteArticle,
	fetchArticleBegin,
	fetchArticleSuccess,
	fetchArticleFailure,
	fetchArticle
};

export default articleActions;

