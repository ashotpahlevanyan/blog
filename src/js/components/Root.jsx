import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import '../../scss/index.scss';

import App from '../pages/App';
import PostsIndex from '../pages/PostsIndex';
import PostsNew from '../pages/PostsNew';
import PostsShow from '../pages/PostsShow';

const history = createBrowserHistory();

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Route path="/" component={App} />
				<Route exact path="/" component={PostsIndex} />
				<Route exact path="/posts/new" component={PostsNew} />
				<Route exact path="/posts/view/:id" component={PostsShow} />
			</div>
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;