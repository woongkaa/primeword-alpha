// import { createAction, handleActions } from 'redux-actions';
// import { Record, List } from 'immutable';
import axios from 'axios';
import { combineReducers } from 'redux';

export const FETCH_NOTES_START = 'notes/FETCH_NOTES_START';
export const FETCH_NOTES_SUCCESS = 'notes/FETCH_NOTES_SUCCESS';
export const FETCH_NOTES_FAILURE = 'notes/FETCH_NOTES_FAILURE';
export const FETCH_SINGLE_NOTE_START = 'notes/FETCH_SINGLE_NOTE_START';
export const FETCH_SINGLE_NOTE_SUCCESS = 'notes/FETCH_SINGLE_NOTE_SUCCESS';
export const FETCH_SINGLE_NOTE_FAILURE = 'notes/FETCH_SINGLE_NOTE_FAILURE';

const ROOT_URL = 'https://primeword-backend.doctorf.xyz';
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

export const fetchSingleNote = (noteId) => (dispatch, getState) => {
	dispatch({type: FETCH_SINGLE_NOTE_START});
	const url = `${ROOT_URL}/notes/${noteId}/`;
	return axios({
		method: 'get',
		url,
	})
	.then(({ data }) => {
		console.log('successfully fetched single note', data);
		dispatch({
			type: FETCH_SINGLE_NOTE_SUCCESS,
			payload: data,
			noteId,
		});
	})
	.catch(response => {
		console.log('failed to fetch single note', response);
		dispatch({
			type: FETCH_SINGLE_NOTE_FAILURE,
		});
	});
}


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

export const getNoteById = (state, noteId) => {
	return state.byId[noteId] || null;
}

export default combineReducers({
	idsByAcademyId,
	byId,
});