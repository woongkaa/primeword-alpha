import axios from 'axios';
import { combineReducers } from 'redux';

const FETCH_WORDS_START = 'words/FETCH_WORDS_START';
const FETCH_WORDS_SUCCESS = 'words/FETCH_WORDS_SUCCESS';
const FETCH_WORDS_FAILURE = 'words/FETCH_WORDS_FAILURE';

const FETCH_WORDS_BY_NOTE_START = 'words/FETCH_WORDS_BY_NOTE_START';
const FETCH_WORDS_BY_NOTE_SUCCESS = 'words/FETCH_WORDS_BY_NOTE_SUCCESS';
const FETCH_WORDS_BY_NOTE_FAILURE = 'words/FETCH_WORDS_BY_NOTE_FAILURE';

const CHECK_WORD_KNOWN = 'words/CHECK_WORD_KNOWN';

export {
	FETCH_WORDS_START,
	FETCH_WORDS_SUCCESS,
	FETCH_WORDS_FAILURE
}

const ROOT_URL = 'https://primeword-backend.doctorf.xyz';

export const fetchWordsByNoteId = (noteId) => (dispatch, getState) => {
	dispatch({type: FETCH_WORDS_BY_NOTE_START});
	const url = `${ROOT_URL}/notes/${noteId}/words/?limit=50&offset=0`;
	return axios({
		method: 'get',
		url,
	})
	.then(({ data }) => {
		console.log('successfully fetched words', data);
		dispatch({
			type: FETCH_WORDS_BY_NOTE_SUCCESS,
			payload: data.results,
			noteId
		});
	})
	.catch(response => {
		console.log('failed to fetch words', response);
		dispatch({
			type: FETCH_WORDS_BY_NOTE_FAILURE,
		});
	});
}

const initialState = {
	allIds: [],
	idsByNoteId: {},
	byId: {},
};


//reducers
const post = (state = {}, action) => {
	switch (action.type) {
		case CHECK_WORD_KNOWN:
			return {
				...state,
				isChecked: true,
			}
		default:
			return state;
	}
}

const allIds = (state = initialState.allIds, action) => {
	switch (action.type) {
		case FETCH_WORDS_SUCCESS:
			return action.payload.reduce((nextState, word) => {
				if (nextState.indexOf(word.id) === -1) {
					nextState.push(word.id);
				}
				return nextState;
			}, [...state]);
		default:
			return state;
	}
}

const idsByNoteId = (state=initialState.idsByNoteId, action) => {
	switch (action.type) {
		case FETCH_WORDS_BY_NOTE_SUCCESS:
			return {
				...state,
				[action.noteId]: action.payload.map(word => word.id)
			}
		default:
			return state;
	}
}

const word = (state = {}, action) => {
	return {
		...state, 
		isChecked: false
	}
}

const byId = (state = initialState.byId, action) => {
	switch (action.type) {
		case FETCH_WORDS_SUCCESS:
		case FETCH_WORDS_BY_NOTE_SUCCESS:
			return action.payload.reduce((nextState, word) => {
				nextState[word.id] = word;
				return nextState;
			}, {...state});
		default:
			return state;
	}
}


// selectors
export const getAllWords = (state) => {
	const { allIds, byId } = state;
	const words = allIds.map(id => byId[id]);
	return words;
}

export const getWordsByNoteId = (state, noteId) => {
	const ids = state.idsByNoteId[noteId];
	if (!ids) {
		return [];
	}
	const words = ids.map(id => state.byId[id]);
	return words;
}

export const getWordsByIds = (state, ids) => {
	const words = ids.map(id => state.byId[id]);
	if(!words) {
		return [];
	}
	return words;
}

export default combineReducers({
	allIds,
	idsByNoteId,
	byId,
});