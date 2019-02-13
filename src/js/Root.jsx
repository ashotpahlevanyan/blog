import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import PostsIndex from './pages/PostsIndex';
import PostsNew from './pages/PostsNew';
import PostsShow from './pages/PostsShow';
import Topbar from './components/Topbar';
import UpToTop from './components/UpToTop';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../scss/index.scss';

const history = createBrowserHistory();

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={history}>
			<div>
				<Topbar />
				<Route exact path="/" component={PostsIndex} />
				<Route exact path="/posts/new" component={PostsNew} />
				<Route exact path="/posts/view/:id" component={PostsShow} />
				<UpToTop />
			</div>
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired
};

export default Root;