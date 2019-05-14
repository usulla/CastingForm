import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
	silverChalice,
	s, l } from '../assets/styles/conf/_configs.scss'


const styles = {
	root: {
		fontSize: '14px',
		marginTop: 0,
		marginBottom: 32,
		[`@media (min-width: ${s})`]: {
			fontSize: `calc(14px + (16 - 14) * ((100vw - ${s}) / ${l.replace(/[^\d]/mig, '') - s.replace(/[^\d]/mig, '')}))`
		},
		[`@media (min-width: ${l})`]: {
			fontSize: '16px'
		}
	},
	label: {
		textTransform: 'uppercase',
		textAlign: 'left',
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		maxWidth: '100%',
		color: silverChalice,
		'&[data-shrink=true]': {
			maxWidth: ((280 / (280 * 0.75)) * 100 + '%')
		},
		fontSize: '1em'
	},
	input: {
		fontSize: '14px',
		[`@media (min-width: ${s})`]: {
			fontSize: `calc(14px + (20 - 14) * ((100vw - ${s}) / ${l.replace(/[^\d]/mig, '') - s.replace(/[^\d]/mig, '')}))`
		},
		[`@media (min-width: ${l})`]: {
			fontSize: '20px'
		}
	}
}

function CustomizedTextField(props) {
	const { classes, pattern, ...other } = props
	return (
		<TextField
			{...other}
			className={classes.root}
			InputLabelProps={{
				className: classes.label
			}}
			inputProps={{
				pattern
			}}
		/>
	)
}

CustomizedTextField.propTypes = {
	classes: PropTypes.object.isRequired,
	pattern: PropTypes.string,
	inputProps: PropTypes.object
}

export default withStyles(styles)(CustomizedTextField)
