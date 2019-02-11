import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import UpToTop from './UpToTop';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className="app">
			<Header />
			<Main />
			<UpToTop />
		</div>
	);
};

export default App;