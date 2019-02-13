import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Header extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillUnmount() {
		 this.props.resetMe();
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
			alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
		} else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
			this.context.router.history.push('/');
		}
	}

	renderLinks() {
		const { type } = this.props;
		if(type === 'postsIndex') {
			 return (
				 <div className="wrapper">
					 <Link className="float-right btn btn-info btn-lg" to="/posts/new">Add New Post</Link>
				 </div>
			 );
		} else if(type === 'postsNew') {
			 return (
				 <div className="wrapper">
					 <Link className="float-left btn btn-success btn-lg" to="/">Back To Index</Link>
				 </div>
			 );
		} else if(type === 'postsShow') {
				return (
					<div className="wrapper">
						<Link className="float-left btn btn-success btn-lg" to="/">Back To Index</Link>
						<Button color="danger" size="lg" className="float-right" onClick={()=> {this.props.onDeleteClick()}}>Delete Post</Button>
					</div>
			);
		}
	};

	render() {
		return (
		 <div className="container clearfix headerWrapper">
			 {this.renderLinks()}
		 </div>
		);
	}
}

export default Header;