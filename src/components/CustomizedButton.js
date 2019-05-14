import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import {
	fontFamily,
	fontRoot,
	dodgerBlue,
	malibu,
	white } from '../assets/styles/conf/_configs.scss'

const styles = {
	root: {
		backgroundColor: dodgerBlue,
		fontFamily,
		fontStyle: 'normal',
		fontWeight: 900,
		fontSize: fontRoot,
		lineHeight: 'normal',
		textAlign: 'center',
		textTransform: 'uppercase',
		'&:disabled': {
			backgroundColor: malibu,
			color: white,
			cursor: 'not-allowed'
		}
	}
}

const CustomizedButton = props => {
	const { classes, ...other } = props

	return (
		<Button
			{...other}
			className={classes.root}
		/>
	)
}

CustomizedButton.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CustomizedButton)

