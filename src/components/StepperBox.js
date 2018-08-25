import React, { Component } from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		// padding: '24px 0',
	},
	stepper: {
		padding: '16px 24px',
		backgroundColor: 'rgba(0,0,0,0)', 
	},
	stepIcon: {
		background: '#1890FF',
	}
});

const steps = [30, 40, 50];

class StepperBox extends Component {
	render() {
		const { currentStep, classes } = this.props;
		return (
			<div className={classes.root}>
				<Stepper activeStep={currentStep} className={classes.stepper}>
					{steps.map((label, index) => {
						return (
							<Step key={label}>
								<StepLabel>{label}개</StepLabel>
							</Step>
						)
					})}
				</Stepper>
			</div>
		);
	}
}

export default withStyles(styles)(StepperBox);
