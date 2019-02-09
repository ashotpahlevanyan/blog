import React from 'react';
import ReactDOM from 'react-dom';
import FormContainer from "./js/components/FormContainer.jsx";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import './scss/index.scss';

//library.add(faCoffee);
//<FontAwesomeIcon icon={faCoffee} />

//const wrapper = document.getElementById('root');
ReactDOM.render(
	<FormContainer text="Abrikos" />,
	document.getElementById('root')
);
if(module.hot) {
	module.hot.accept();
}