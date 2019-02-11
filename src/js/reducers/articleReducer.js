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

		default:
			return state;
	}
}

export default articles;
