import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import UpToTop from './UpToTop';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
	return (
		<div className="app">
			<Header />
			<Main />
			<Footer />
			<UpToTop />
		</div>
	);
};

export default App;