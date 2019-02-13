import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import articleActionCreators from '../actions/articleActions';
import ArticleListItem from './ArticleListItem';
import LoadingSpinner from './LoadingSpinner';
import MessageAlert from './MessageAlert';


class ArticlesList extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = props;
		this.boundActionCreators = bindActionCreators(articleActionCreators, dispatch);
		console.log(this.boundActionCreators);

		this.handleArticleClick = this.handleArticleClick.bind(this);
	}

	componentDidMount() {
		let { dispatch } = this.props;

		let action = articleActionCreators.fetchAllArticles();
		dispatch(action);
	}

	handleArticleClick(id) {
		console.log(`${id} : clicked`);
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
						<MessageAlert color='danger' className='pinned' message='Articles Loaded Done!' delay={1500} /> : ''
				}

				{
					articles && <ul className='list'>
					{ articles.length ?
						articles.map(article => <ArticleListItem
							key={article.id}
							id={article.id}
							title={article.title}
							content={article.content}
							categories={article.categories}
							onClick={() => this.handleArticleClick(article.id)}
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