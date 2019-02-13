import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import '../../scss/index.scss';

import App from './App';

const history = createBrowserHistory();

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={history}>
				<Route path="/" component={App} />
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;