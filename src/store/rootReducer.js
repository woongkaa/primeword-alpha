import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import notesReducer, * as fromNotes from './modules/notes';
import wordsReducer, * as fromWords from './modules/words';
import userReducer, * as fromUser from './modules/user';

const rootReducer = combineReducers({
	routing: routerReducer,
	currentUser: userReducer,
	notes: notesReducer,
	words: wordsReducer,
	pageTitle: '',
});

export default rootReducer;

//Match selectors to each module.
export const getAllNotes = (state) => {
	return fromNotes.getAllNotes(state.notes);
}

export const getAllWords = (state) => {
	return fromWords.getAllWords(state.words);
}

export const getWordsByNoteId = (state, noteId) => {
	return fromWords.getWordsByNoteId(state.words, noteId);
}

export const getWordsUnknownByNoteId = (state, noteId) => {
	const unknownWordsIds = fromUser.getUnknownWordsIdsByNoteId(state.currentUser, noteId);
	const words = fromWords.getWordsByIds(state.words, unknownWordsIds);
	return words;
}

export const getCurrentStep = (state, noteId) => {
	return fromUser.getCurrentStep(state.currentUser, noteId);
}