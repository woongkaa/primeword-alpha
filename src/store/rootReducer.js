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

export const getWordsKnownByUser = (state) => {
	//유저가 아는 단어들
	//전체 단어 중에 user가 안다고 체크한 아이디 목록에 있으면, 찾아서 리턴. 
	const knownWordsIds = fromUser.getKnownWordsIds(state.currentUser);
	const words = fromWords.getWordsByIds(state.words, knownWordsIds);
	return words;
}

export const getWordsUnknownByUser = (state) => {
	//유저가 모르는 단어들
	const unknownWordsIds = fromUser.getUnknownWordsIds(state.currentUser);
	const words = fromWords.getWordsByIds(state.words, unknownWordsIds);
	return words;
}
