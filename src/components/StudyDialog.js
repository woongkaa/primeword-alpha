import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

class StudyDialog extends Component {
	render() {
		const { title, messages, open, action } = this.props;
		return (
			<div>
				<Dialog
					open={open}
					disableBackdropClick={true}
					aria-labelledby="alert-dialog-title"
        	aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{title}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							{messages}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button 
							onClick={this.props.onConfirm} 
							color="primary">
							{action}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

StudyDialog.defaultProps = {
	action: "시작하기"
}

export default StudyDialog;