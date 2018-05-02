import React, { Component } from 'react';
import Stepper, { Step, StepLabel } from 'material-ui/Stepper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
	root: {
		// padding: '24px 0',
	},
	stepper: {
		padding: '24px 0',
	},
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
