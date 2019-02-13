import PostDetails from '../components/PostDetails';
import { fetchPost, fetchPostSuccess, fetchPostFailure, resetActivePost, resetDeletedPost } from '../actions/posts';
import { connect } from 'react-redux';
import ServerStatus from '../actions/constants';

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
          if (result.response && result.response.status !== ServerStatus.GET_SUCCESS) {
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
