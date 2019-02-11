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

const articleActionCreators = {
	fetchAllArticlesBegin,
	fetchAllArticlesSuccess,
	fetchAllArticlesFailure,
	fetchAllArticles
};

export default articleActionCreators;

