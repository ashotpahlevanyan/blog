import React from 'react';
import { render } from 'react-dom';
import store from './js/store/index';
import Root from './js/Root';
import registerServiceWorker from './registerServiceWorker';

console.log(store.getState());

render(
	<Root store = {store}/>,
	document.getElementById('root')
);

registerServiceWorker();

if(module.hot) {
	module.hot.accept();
}