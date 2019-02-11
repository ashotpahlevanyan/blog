import { combineReducers } from 'redux';
import articles from './articleReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

/*function articles(state = [], action) {
	switch (action.type) {
		case actionTypes.CREATE_ARTICLE:
			return [
				...state,
				{
					title: action.title,
					content: action.content,
					categories: action.categories
				}
			];
		case actionTypes.DELETE_ARTICLE:
			return ([
					...(state.articles.filter(article => article.id !== action.payload))
				]);
		case actionTypes.GET_ARTICLE:
			return (
				state.articles.filter(article => article.id === action.payload)
			);
		default:
			return state
	}
}*/

const rootReducer = combineReducers({
	articles: articles,
	routing: routerReducer,
	form: reduxFormReducer
});

export default rootReducer;