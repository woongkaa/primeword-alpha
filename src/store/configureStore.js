import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createBrowserHistory';
import throttle from 'lodash/throttle';

import rootReducer from './rootReducer';
import { loadState, saveState } from './localStorage';

export const history = createHistory();

const configureStore = (initialState = {}) => {
	let middleware = applyMiddleware(thunk, routerMiddleware(history));

	if(process.env.NODE_ENV !== 'production'){
		middleware = composeWithDevTools(middleware);
	}

	const persistedState = loadState();

	const store = createStore(rootReducer, { ...persistedState, ...initialState }, middleware);

	store.subscribe(throttle(()=> {
		const state = store.getState();
		const stateToPersist = {};
		saveState(stateToPersist);
	}, 1000));
	
	return store;
}

export default configureStore;