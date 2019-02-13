import actionTypes from '../actions/actionTypes';

const initialState = {
	articles: [],
	loading: false,
	error: null
};


function articles(state = initialState, action) {
	switch(action.type) {
		case actionTypes.FETCH_ALL_ARTICLES_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.FETCH_ALL_ARTICLES_SUCCESS:
			return {
				...state,
				loading: false,
				articles: action.payload.articles,
				error: null
			};

		case actionTypes.FETCH_ALL_ARTICLES_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.CREATE_ARTICLE_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.CREATE_ARTICLE_SUCCESS:
			return {
				...state,
				loading: false,
				articles: insertArticle(state.articles, action.payload.article),
				error: null
			};

		case actionTypes.CREATE_ARTICLE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.DELETE_ARTICLE_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.DELETE_ARTICLE_SUCCESS:
			return {
				...state,
				loading: false,
				articles: removeArticle(state.articles, action.payload.article),
				error: null
			};

		case actionTypes.DELETE_ARTICLE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};

		case actionTypes.FETCH_ARTICLE_BEGIN:
			return {
				...state,
				loading: true,
				error: null
			};

		case actionTypes.FETCH_ARTICLE_SUCCESS:
			return {
				...state,
				loading: false,
				articles: removeArticle(state.articles, action.payload.article),
				error: null
			};

		case actionTypes.FETCH_ARTICLE_FAILURE:
			return {
				...state,
				loading: false,
				error: action.payload.error
			};



		default:
			return state;
	}
}

export default articles;
