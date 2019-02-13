import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';

class PostsList extends Component {
  componentWillMount() {
    this.props.fetchPosts();
  }

  renderCategories(categories) {
     return categories &&
	      categories.split('\,')
		    .map((category, index) => {
		    	category = category.trim();
		    	return <Link
				    to={"/filter/" + category}
				    key={index}
				    className="badge badge-primary category">
				    {category}
				    </Link>
		    });
  }

  renderPosts(posts) {
    return posts.map((post) => {
      return (
	      <li key={post.id}>
		      <Link className="post" to={"/posts/view/" + post.id}>
			      <div className="clearfix">
				      <h3 className="title float-left">{post.title ? post.title : '\"No Title Was provided\"'}</h3>
				      <div className="categories float-right">{this.renderCategories(post.categories)}</div>
			      </div>
		      </Link>
	      </li>
      );
    });
  }

  render() {
    const { posts, loading, error } = this.props.postsList;

    if(loading) {
      return <LoadingSpinner color='info' size='lg'/>
    } else if(error) {
      return <MessageAlert color='danger' className='pinned' message={`Error: ${error.message}`} delay={1500} />
    }

    return (
      <div className="posts container">
        <h1>Posts</h1>

	      {(posts && posts.length) ?
		      <ul className='list'>
		        {this.renderPosts(posts)}
	        </ul>
		      : <h2>No Articles Found</h2>}
      </div>
    );
  }
}


export default PostsList;