import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ArticlePage from './ArticlePage';
import ArticlesList from './ArticlesList';
import ArticleDetails from './ArticleDetails';
import Home from './Home';

class Main extends Component {
	render() {
		return (
			<section className="container">
				<main>
					<Route exact path="/" component={Home} />
					<Route exact path="/articles" component={ArticlesList} />
					<Route exact path="/articles/new" component={ArticlePage} />
					<Route exact path="/articles/:id" component={ArticleDetails} />
				</main>
			</section>
		);
	}
}

export  default Main;