import { combineReducers } from 'redux';

const UPDATE_APPBAR_TITLE = 'ui/UPDATE_APPBAR_TITLE';

export const updateAppBarTitle = (title) => (dispatch, getState) => {
	dispatch({
		type: UPDATE_APPBAR_TITLE,
		title
	})
}

const initialState = {
	appBar: {
		title: 'Prime Word',
		drawerOpen: false,
	},
}

const appBar = (state = initialState.appBar, action) => {
	switch (action.type) {
		case UPDATE_APPBAR_TITLE:
			return {
				...state,
				title: action.title,
			}
		default:
			return state;
	}
}

export const getAppBarTitle = (state) => {
	return state.appBar.title;
}

export default combineReducers({appBar});