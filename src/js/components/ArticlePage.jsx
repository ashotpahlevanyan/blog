import React from 'react'
import AddArticle from './AddArticle';

class ArticlePage extends React.Component {
	submit(values) {
		// print the form values to the console
		//console.log(values)
	};
	render() {
		return <AddArticle onSubmit={this.submit} />
	}
}

export default ArticlePage;
