import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import PostsList from '../containers/PostsListContainer.js';

class PostsIndex extends Component {
  render() {
    return (
      <div>
        <HeaderContainer type="postsIndex"/>
        <PostsList />
      </div>
    );
  }
}


export default PostsIndex;
