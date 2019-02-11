import React, { Component } from 'react';
import FormContainer from "./FormContainer.jsx";
import ArticlesList from './ArticlesList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import library from './FontAwesomeLibrary';
import Article from './Article';

class Main extends Component {
	render() {
		return (
			<section className="container">
				{/*<FormContainer text="Olala Bebe" />*/}
				<Article />
				<ArticlesList />
			</section>
		);
	}
}

export  default Main;