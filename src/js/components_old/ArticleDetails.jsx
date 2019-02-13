import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import articleActionCreators from '../actions/articleActions';

class ArticleDetails extends Component {

	componentDidMount() {
		this.props.dispatch(articleActionCreators.fetchArticle(this.props.id));
	}
	render() {
		const { title, content, categories, onClick } = this.props;
		return(
			<div className="details">
				<div className="actions clearfix">
					<Link to="/articles" className="float-left">Back To Articles</Link>
					<Button color="info" className="float-right">Delete</Button>
				</div>
				<h1 className="title">{title}</h1>
				<p className="content">{content}</p>
				<div className="categories">{categories}</div>
			</div>
		);
	}

}

export default connect()(ArticleDetails);