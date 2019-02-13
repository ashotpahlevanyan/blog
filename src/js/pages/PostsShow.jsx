import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import PropTypes from 'prop-types';
import Header from '../containers/HeaderContainer';
import PostDetailsContainer from '../containers/PostDetailsContainer';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onDeleteClick() {
    this.props.dispatch(deletePost(this.props.match.params.id))
      .then(() => { this.context.router.push('/'); });
  }

  render() {
    return (
      <div>
        <Header type="postsShow" postId={this.props.match.params.id}/>
        <PostDetailsContainer id={this.props.match.params.id}/>
      </div>
    );
  }
}

export default PostsShow;
