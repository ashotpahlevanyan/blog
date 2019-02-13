import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import renderCategories from './renderCategories';

class PostDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
     this.props.resetMe();
  }

  componentDidMount() {
    this.props.fetchPost(this.props.postId);
  }

  render() {
    const { post, loading, error } = this.props.activePost;
    if (loading) {
      return <LoadingSpinner color='info' size='lg'/>;
    } else if(error) {
      return  <div className="alert alert-danger">{error.message}</div>;
    } else if(!post) {
      return <h3>"Post Is Empty"</h3>;
    }

    return (
    	<div className="container">
		    <h1>Post Details</h1>
		    <div className="details">
	        <h1 className="title">{post.title}</h1>
		      <div className="group">
			      <label>Categories :</label>
			      <div className="categories">{renderCategories(post.categories)}</div>
		      </div>
		      <p className="content">{post.content}</p>
	      </div>
	    </div>
    );
  }
}

export default PostDetails;