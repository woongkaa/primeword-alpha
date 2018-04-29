import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import createHistory from 'history/createBrowserHistory';

import notesReducer from './modules/word';

export const history = createHistory();

const env = process.env.NODE_ENV;
// check if env === DEV or PROD

const middlewares = [thunk, routerMiddleware(history)];

const reducer = combineReducers({
	routing: routerReducer,
	notes: notesReducer,
});

let store;

if (env === "development") {
	store = initialState => createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else {
	store = initialState => createStore(reducer, applyMiddleware(...middlewares));
}

export default store;