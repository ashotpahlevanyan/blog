import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../../scss/index.scss';

import App from './App';
import ArticlesList from './ArticlesList';
import Article from './Article';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/" component={App} />
				<Route path="/articles" component={ArticlesList} />
				<Route path="/articles/new" component={Article} />
			</Switch>
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;