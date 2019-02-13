import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import library from './FontAwesomeLibrary';
import {
	Card,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Button
} from 'reactstrap';

class ArticleListItem extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const {id,  title, categories } = this.props;
		return(
			<li>
				<Link className="article" to={"/articles/" + id}>
					<div className="clearfix">
						<h3 className="title float-left">{title ? title : '\"No Title Was provided\"'}</h3>
						<div className="categories float-right">{categories}</div>
					</div>
				</Link>
			</li>
		)
	}
}

export default ArticleListItem;