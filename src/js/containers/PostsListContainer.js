import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/posts';
import PostsList from '../components/PostsList';


const mapStateToProps = (state) => {
  return { 
    postsList: state.posts.postsList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts()).payload.then((response) => {
      	response.status === 200 ? dispatch(fetchPostsSuccess(response.data)) : dispatch(fetchPostsFailure(response.data));
          });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);