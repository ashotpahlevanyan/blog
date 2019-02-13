import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import ServerStatus from '../actions/constants';

import {
	createPost,
	createPostSuccess,
	createPostFailure,
	resetNewPost
} from '../actions/posts';
import { Button } from 'reactstrap';

/**
 * Client Side Validation
 **/

function validate(values) {
	const errors = {};

	if (!values.title || values.title.trim() === '') {
		errors.title = 'Enter a Title';
	}
	if (!values.categories || values.categories.trim() === '') {
		errors.categories = 'Enter categories';
	}
	if (!values.content || values.content.trim() === '') {
		errors.content = 'Enter some content';
	}

	return errors;
}

const validateAndCreatePost = (values, dispatch) => {
	return dispatch(createPost(values)).payload
		.then(result => {
			if (result.response && result.response.status !== ServerStatus.CREATE_SUCCESS) {
				dispatch(createPostFailure(result.response.data));
				throw new SubmissionError(result.response.data);
			}
			dispatch(createPostSuccess(result.data));
		});
};

class PostsForm extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.resetMe();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.newPost.post && !nextProps.newPost.error) {
			this.context.router.history.push('/');
		}
	}

	renderError(newPost) {
		if (newPost && newPost.error && newPost.error.message) {
			return (
				<div className="alert alert-danger">
					{ newPost ? newPost.error.message : '' }
				</div>
				);
		} else {
			return <span/>
		}
	}
	render() {
		const {handleSubmit, submitting, newPost} = this.props;
		return (
			<div className='container postForm'>
				<h1>Add New Post</h1>
				{ this.renderError(newPost) }
				<form onSubmit={ handleSubmit(validateAndCreatePost) }>
					<Field
							 name="title"
							 type="text"
							 component={ renderField }
							 label="Title*" />
					<Field
							 name="categories"
							 type="text"
							 component={ renderField }
							 label="Categories*" />
					<Field
							 name="content"
							 component={ renderTextArea }
							 label="Content*" />
					<div>
						<Button
								type="submit"
								color="primary"
								size="lg"
								disabled={ submitting }>
							Submit
						</Button>
						<Link
								to="/"
								className="btn btn-danger btn-lg">Cancel
						</Link>
					</div>
				</form>
			</div>
		)
	}
}


export default reduxForm({
	form: 'PostsForm',
	validate
})(PostsForm)
