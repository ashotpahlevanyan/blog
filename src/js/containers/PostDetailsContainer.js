import PostDetails from '../components/PostDetails.js';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost, resetDeletedPost } from '../actions/posts';
import { connect } from 'react-redux';


function mapStateToProps(globalState, ownProps) {
  return {
    activePost: globalState.posts.activePost,
    postId: ownProps.id
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPost: (id) => {
      dispatch(fetchPost(id)).payload
        .then((result) => {
          if (result.response && result.response.status !== 200) {
            dispatch(fetchPostFailure(result.response.data));
          } else {
            dispatch(fetchPostSuccess(result.data))
          }
        })
    },
    resetMe: () => {
      dispatch(resetActivePost());
      dispatch(resetDeletedPost());
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
