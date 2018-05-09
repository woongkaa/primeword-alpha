import { combineReducers } from 'redux';
import { FETCH_NOTES_SUCCESS, FETCH_NOTES_FAILURE, FETCH_SINGLE_NOTE_SUCCESS } from 'store/modules/notes';
import { FETCH_WORDS_SUCCESS } from 'store/modules/words';

const FETCH_NOTES_BY_USERID_SUCCESS = 'user/FETCH_NOTES_BY_USERID_SUCCESS';
const CHECK_WORD_KNOWN = 'user/CHECK_WORD_KNOWN';
const CHECK_WORD_UNKNOWN = 'user/CHECK_WORD_UNKNOWN';
const UPDATE_KNOWN = 'user/UPDATE_KNOWN';
const UPDATE_UNKNOWN = 'user/UPDATE_UNKNOWN';
const NEXT_STEP = 'user/NEXT_STEP';

// action creators
export const updateUnknown = (noteId, wordId) => (dispatch, getState) => {
	dispatch({
		type: UPDATE_UNKNOWN,
		noteId,
		wordId
	})
}

export const updateKnown = (noteId, wordId) => (dispatch, getState) => {
	dispatch({
		type: UPDATE_KNOWN,
		noteId,
		wordId
	})
}

export const nextStep = (noteId) => (dispatch, getState) => {
	dispatch({
		type: NEXT_STEP,
		noteId
	})
}

const initialState = {
	user: null,
	notes: {},
}

/*유저의 노트별 학습정보*/
const _note = (state = {}, action) => {
	switch (action.type) {
		case FETCH_NOTES_SUCCESS:
		case FETCH_NOTES_BY_USERID_SUCCESS:
			return {
				...state,
				step: 0,
				unknownWordsIds: []
			}
		default:
			return state;
	}
}

/** 
* @description 유저의 노트학습정보를 처리하는 리듀서
* @todo 이미 학습이 이루어진 노트에 대해서만 업데이트 제외
*/
const notes = (state = initialState.notes, action) => {
	switch (action.type) {
		case FETCH_NOTES_SUCCESS:
		case FETCH_NOTES_BY_USERID_SUCCESS:
			if(Object.keys(state).length == 0) { 
				return action.payload.reduce((nextState, note) => {
					nextState[note.id] = {
						...note,
						step: 0,
						unknownWordsIds: []
					};
					return nextState;
				}, {...state});
			} else {
				return state;
			}
		case FETCH_SINGLE_NOTE_SUCCESS:
			if(Object.keys(state).indexOf(action.noteId) === -1 ){
				return {
					...state,
					[action.noteId]: {
						...action.payload,
						step: 0, 
						unknownWordsIds: []
					}
				}
			} else {
				return state;
			}
		case UPDATE_KNOWN: 
			if(state[action.noteId].unknownWordsIds.indexOf(action.wordId) >= 0) {
				return {
					...state,
					[action.noteId]: {
						...state[action.noteId],
						unknownWordsIds: state[action.noteId].unknownWordsIds.filter(id => id !== action.wordId)
					}
				}
			} else {
				return state;
			}
		case UPDATE_UNKNOWN:
			if(state[action.noteId].unknownWordsIds.indexOf(action.wordId) === -1) {
				return {
					...state,
					[action.noteId]: {
						...state[action.noteId],
						unknownWordsIds: [...state[action.noteId].unknownWordsIds, action.wordId]
					}
				}
			} else {
				return state;
			}
		case NEXT_STEP:
			return {
				...state,
				[action.noteId]: {
					...state[action.noteId],
					step: state[action.noteId].step + 1
				}
			}

		default:
			return state;
	}
}

const account = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
}

export const getUnknownWordsIdsByNoteId = (state, noteId) => {
	return state.notes[noteId].unknownWordsIds;
}
/*
* @description
* @todo step을 api로부터 받아올 수 있어야 합니다
*/
export const getUserNoteById = (state, noteId) => {
	return state.notes[noteId] || null;
}
export const getCurrentStep = (state, noteId) => {
	if(state.notes[noteId] === undefined) {
		return 0;
	}
	return state.notes[noteId].step;
}

export default combineReducers({notes, account});