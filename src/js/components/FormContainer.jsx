import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
	text: PropTypes.string,
};

const defaultProps = {
	text: 'Hello',
};

class FormContainer extends PureComponent {
	render() {
		const { text } = this.props;
		return (
			<form className="article-form">
				<h1 className="">
					{ text }
				</h1>
			</form>
		);
	}
}

FormContainer.propTypes = propTypes;
FormContainer.defaultProps = defaultProps;

export default FormContainer;
