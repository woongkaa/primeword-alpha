export const loadState = () => {
	try {
		const serializedState = localStorage.getItem('primeword');
		if(serializedState === null) {
			return undefined;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		console.log('Error occured whild loading state from Local Storage');
		return undefined;
	}
}

export const saveState = (state) => {
	try {
		const serializedState = JSON.stringify(state);
		localStorage.setItem('primeword', serializedState);
	} catch (err) {
		console.log('Error occured while persisting state to Local Storage');
	}
}