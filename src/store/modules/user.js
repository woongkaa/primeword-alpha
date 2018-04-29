const CHECK_WORD_KNOWN = 'user/CHECK_WORD_KNOWN';
const CHECK_WORD_UNKNWON = 'user/CHECK_WORD_UNKNWON';

// action creators
export const checkWordKnown = (wordId) => (dispatch, getState) => {
	dispatch({
		type: CHECK_WORD_KNOWN,
		wordId,
	});
}

export const checkWordUnknown = (wordId) => (dispatch, getState) => {
	dispatch({
		type: CHECK_WORD_UNKNWON,
		wordId,
	});
}

const initialState = {
	id: null,
	academyId: null,
	wordsIdsKnown: [],
	wordsIdsUnknown: [],
}

const user = (state = initialState, action) => {
	switch (action.type) {
		case CHECK_WORD_KNOWN:
			if(state.wordsIdsKnown.indexOf(action.wordId) === -1){
				return {
					...state,
					wordsIdsKnown: [...state.wordsIdsKnown, action.wordId]
				}
			} else {
				return state;
			}
		case CHECK_WORD_UNKNWON:
			if(state.wordsIdsKnown.indexOf(action.wordId) === -1){
				return {
					...state,
					wordsIdsUnknown: [...state.wordsIdsUnknown, action.wordId]
				}
			}
		default:
			return state;
	}
}

export const getKnownWordsIds = (state) => {
	return state.wordsIdsKnown;
}

export const getUnknownWordsIds = (state) => {
	return state.wordsIdsUnknown;
}

export default user;