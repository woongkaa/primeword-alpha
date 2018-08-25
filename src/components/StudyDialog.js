import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
							<div>
								{messages}
							</div>
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