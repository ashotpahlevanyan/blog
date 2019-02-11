import React, { Component } from 'react';
import {
	Form,
	FormGroup,
	Button,
	Input,
	Label
} from 'reactstrap';

class Article extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: "",
			content: "",
			categories: ""
		}
	}

	render() {
		return <Form className="articleForm form">
			<FormGroup>
				<Label for="title">Title</Label>
				<Input type="text" name="title" id="title" placeholder="Title" />
			</FormGroup>
			<FormGroup>
				<Label for="content">Content</Label>
				<Input type="textarea" name="content" id="content" placeholder="Content" />
			</FormGroup>
			<FormGroup>
				<Label for="categories">Categories</Label>
				<Input type="textarea" name="categories" id="categories" placeholder="Categories" />
			</FormGroup>
			<Button type="submit" color="success">Add Article</Button>
		</Form>
	}
}

export default Article;