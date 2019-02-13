import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer';
import PostsList from '../containers/PostsListContainer';

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
