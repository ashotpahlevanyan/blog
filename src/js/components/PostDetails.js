import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchPost } from '../actions/posts';
import LoadingSpinner from './LoadingSpinner';
import renderCategories from './renderCategories';

class PostDetails extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
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
      <div className="container details">
	      <label>Title :</label>
        <h1 className="title">{post.title}</h1>
	      <label>Categories :</label>
        <div className="categories">{renderCategories(post.categories)}</div>
	      <label>Content :</label>
        <p className="content">{post.content}</p>
      </div>
    );
  }
}

export default PostDetails;