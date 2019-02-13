import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import rules from './ValidationRules';

import {
	Form,
	FormGroup,
	Button } from 'reactstrap';

const validate = values => {
	const errors = {};
	if (!values.title) {
		errors.title = 'Required';
	} else if (values.title.length < 2) {
		errors.title = 'Invalid Title';
	}
	if(!values.content) {
		errors.content = 'Required';
	} else if (values.content.length < 6) {
		errors.content = 'Must be 6 characters or more';
	}

	return errors;
};

const warn = values => {
	const warnings = {};
	if(!values) {
		warnings.values = 'Please fill the form.'
	}
	return warnings;
};


class AddArticle extends Component {
	handleFormSubmit(formProps) {
		console.log(formProps);
	}

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props;
		return (
			<Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} className="addArticleForm">
				<a className="back" href="/articles">Back To </a>
				<h2 className="formHeadline">Create New Article</h2>
				<Field
					name="title"
					component={rules.renderField}
					type="text"
					label="Title"
					validate={rules.minLength2}
					placeholder="article title"
					className="form-control"
					warn={rules.required}
				/>
				<Field
					name="content"
					component={rules.renderField}
					type="textarea"
					label="Content"
					validate={rules.minLength(6)}
					placeholder="article content"
					className="form-control"
				/>
				<Field
					name="categories"
					component={rules.renderTextArea}
					type="text"
					label="Categories"
					placeholder="article categories"
					className="form-control"
				/>
				<FormGroup className="text-center">
					<Button type="submit" color="primary" disabled={pristine || submitting}>Create Article</Button>{' '}
					<Button type="button" color="danger" disabled={submitting} onClick={reset}>Cancel</Button>
				</FormGroup>
			</Form>
		);
	}
}

export default reduxForm({
	form: 'addArticleForm',
	validate,
	warn
})(AddArticle);