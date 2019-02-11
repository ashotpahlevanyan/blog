import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import articleActionCreators from '../actions/articleActions';
import { Button } from 'reactstrap';
import ArticleItem from './ArticleItem';
import LoadingSpinner from './LoadingSpinner';
import MessageAlert from './MessageAlert';


class ArticlesList extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = props;
		this.boundActionCreators = bindActionCreators(articleActionCreators, dispatch);
		console.log(this.boundActionCreators);

		this.handleArticleClick = this.handleArticleClick.bind(this);
		this.handleArticleDelete = this.handleArticleDelete.bind(this);
	}

	componentDidMount() {
		let { dispatch } = this.props;

		let action = articleActionCreators.fetchAllArticles();
		dispatch(action);
	}

	handleArticleDelete(id) {
		console.log(`${id} : clicked`);
	}
	handleArticleClick(id) {
		console.log(`${id} : deleted`);
	}
	render() {
		let {articles, loading, error} = this.props;
		/*<h1>State and Errors</h1>
		 <div>Loading: {loading.toString()}</div>
		 <div>Error: {error ? error.toString() : 'null'}</div>*/
		{/*<MessageAlert color='info' className='stacked' message='Articles Loaded Done' delay={2000}/>*/}

		return (
			<div className='articles'>
				<h1>Articles</h1>

				{
					loading ?
					<LoadingSpinner color='info' size='lg'/> : ''
				}

				{
					error ?
						<MessageAlert color='danger' className='stacked' message='Articles Loaded Done!' delay={2000} /> : ''
				}

				{
					articles && <ul className='list'>
					{ articles.length ?
						articles.map(article => <ArticleItem key={article.id} {...article}
							onClick={this.handleArticleClick(article.id)}
							onDelete={this.handleArticleDelete(article.id)}
						/>)
						:
						<li><h2>No Articles Found</h2></li>}
					</ul>
				}
			</div>
		);
	}
}

const mapStateToProps = state => {
	console.log(state);
	return {
		articles: state.articles.articles,
		loading: state.articles.loading,
		error: state.articles.error
	};
};

export default withRouter(connect(mapStateToProps)(ArticlesList));