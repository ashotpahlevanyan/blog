import React, { Component } from 'react';
import FormContainer from "./FormContainer.jsx";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { faMugHot } from '@fortawesome/free-solid-svg-icons'
import ArticlesList from './ArticlesList';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import '../../scss/index.scss';

library.add(faCoffee);
library.add(faMugHot);

const App = () => {
	return <div className="container">
		<FontAwesomeIcon icon={faMugHot} />
		<FormContainer text="Olala Bebe" />
		<ArticlesList />
	</div>;
};

export default App;
