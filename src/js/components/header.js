import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';



class Header extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUnmount() {
    //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
    //always reset that global state back to null when you REMOUNT
     this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.deletedPost.error && nextProps.deletedPost.error.message) {//delete failure
      alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
    } else if(nextProps.deletedPost.post && !nextProps.deletedPost.error) {//delete success
      this.context.router.history.push('/');
    } else {

    }
  }

	renderLinks() {
		const { type } = this.props;
		if(type === 'posts_index') {
       return (
        <div className="container">
          <ul className="nav  nav-pills navbar-right">
      			<li style={{paddingRight: '10px'}} role="presentation">      
      				<Link style={{color:'#337ab7',  fontSize: '17px'}} to="/posts/new">
      				New Post
    					</Link>
            </li>
    			</ul>
        </div>
  		 );
  	} else if(type === 'posts_new') {
       return (
        <div className="container">
          <ul className="nav  nav-pills navbar-left">
      			<li style={{paddingRight: '10px'}} role="presentation">      
      				<Link className="text-xs-right"  style={{color:'#337ab7',  fontSize: '17px'}}  to="/">Back To Index</Link>
      			</li>
    			</ul>
        </div>
  		 );  		
  	} else if(type === 'posts_show') {
  			return (
  			 <div className="container">
    			<ul className="nav  nav-pills navbar-left">
      			<li style={{paddingRight: '10px',color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
    			</ul>
         
    			<div className="navbar-form navbar-right" style={{paddingRight: '50px'}}>
      			<button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>Delete Post</button>
      		</div>
    	   </div>
  		);
  	}
	};

	render() {
			return (
			 <div>
				 {this.renderLinks()}
			 </div>
			);
	}
}

export default Header