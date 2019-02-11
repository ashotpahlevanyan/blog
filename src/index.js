import React from 'react';
import { render } from 'react-dom';
import store from './js/store/index';
import Root from './js/components/Root';

console.log(store.getState());

render(
	<Root store = {store}/>,
	document.getElementById('root')
);

if(module.hot) {
	module.hot.accept();
}