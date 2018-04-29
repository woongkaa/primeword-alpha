// import { createAction, handleActions } from 'redux-actions';
// import { Record, List } from 'immutable';
import axios from 'axios';
import { combineReducers } from 'redux';

const FETCH_NOTES_START = 'notes/FETCH_NOTES_START';
const FETCH_NOTES_SUCCESS = 'notes/FETCH_NOTES_SUCCESS';
const FETCH_NOTES_FAILURE = 'notes/FETCH_NOTES_FAILURE';
const FETCH_NOTE_SINGLE = 'notes/FETCH_NOTE_SINGLE';

const ROOT_URL = 'http://primeword-backend.doctorf.xyz';
const API_AUTH = '';


// actions

// API actions
export const fetchNotes = () => (dispatch, getState) => {
	dispatch({type: FETCH_NOTES_START});
	const url = `${ROOT_URL}/notes/`;
	return axios({
		method: 'get',
		url,
		// headers:{} to send authentication token
	})
	.then(({ data }) => {
		console.log('successfully fetched notes', data);
		dispatch({
			type: FETCH_NOTES_SUCCESS,
			payload: data.results
		});
	})
	.catch(response => {
		console.log('failed to fetch notes', response);
		dispatch({
			type: FETCH_NOTES_FAILURE,
		});
	});
};


const initialState = {
	idsByAcademyId: {},
	byId: {},
};

// reducer
const idsByAcademyId = (state = initialState.idsByAcademyId, action) => {
	return state;
}

const byId = (state = initialState.byId, action) => {
	switch (action.type) {
		case FETCH_NOTES_SUCCESS:
			return action.payload.reduce((nextState, note) => {
				nextState[note.id] = note;
				return nextState;
			}, {...state});
		default:
			return state;
	}
}

// selectors
export const getAllNotes = (state) => {
	const { byId } = state;
	const notes = Object.values(byId);
	return notes;
}

export const getNotesByAcademyId = (state, academyId) => {
	const notes = [];
	return notes;
}

export const getNoteById = (state, id) => {
	//id에 해당하는 노트를 리턴
}

export default combineReducers({
	idsByAcademyId,
	byId,
});