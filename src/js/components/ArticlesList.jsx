import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import articleActionCreators from '../actions/articleActions';
import { Button } from 'reactstrap';

class ArticlesList extends React.Component {
	constructor(props) {
		super(props);

		const { dispatch } = props;
		this.boundActionCreators = bindActionCreators(articleActionCreators, dispatch);
		console.log(this.boundActionCreators);
	}

	componentDidMount() {
		let { dispatch } = this.props;

		let action = articleActionCreators.fetchAllArticles();
		dispatch(action);
	}

	render() {
		let {articles, loading, error} = this.props;

		return (
			<div>
				<h1>State and Errors</h1>
				<div>Loading: {loading.toString()}</div>
				<div>Error: {error ? error.toString() : "null"}</div>

				<h1>Articles</h1>
				{articles && <ul className="artilces">
					{articles.length ? articles.map(article =>
						<li key={article.id}>
							<h2>{article.title}</h2>
							<Button color="danger">Secondary</Button>

							<div className="content">{article.content}</div>
							<div className="categories">{article.categories}</div>
						</li>)
						:
						<li>No Articles Found</li>}
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