import React, { Component } from 'react';
import { CircularProgress } from 'material-ui/Progress';

class Spinner extends Component {
	render() {
		return (
			<div>
				<CircularProgress />
			</div>
		);
	}
}

export default Spinner;