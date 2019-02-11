import React, { Component } from 'react';
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

class ArticleItem extends Component {
	constructor(props) {
		super(props);

	}

	render() {
		const { title, content, categories, onClick, onDelete } = this.props;
		return(
			<li onClick={onClick}>
				<div className="article">
					<div className="clearfix">
						<h3 className="title float-left">{title ? title : '\"No Title Was provided\"'}</h3>
						<div className="categories float-right">{categories}</div>
					</div>

					<p className="content">{content}</p>
					<Button className="delete" color="danger" onClick={onDelete}><FontAwesomeIcon icon="times" /></Button>
				</div>
			</li>
		)
	}
}

export default ArticleItem;