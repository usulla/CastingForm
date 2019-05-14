import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
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
	select: {
		textAlign: 'left',
		fontSize: '14px',
		[`@media (min-width: ${s})`]: {
			fontSize: `calc(14px + (20 - 14) * ((100vw - ${s}) / ${l.replace(/[^\d]/mig, '') - s.replace(/[^\d]/mig, '')}))`
		},
		[`@media (min-width: ${l})`]: {
			fontSize: '20px'
		}
	}
}

const CustomizedSelect = props => {
	const {
		classes = {},
		id = '',
		label = '',
		onChange = f => f,
		value = '',
		name = '',
		margin = '',
		helperText = '',
		error = false,
		fullWidth = false,
		...other } = props

	return (
		<FormControl
			error={error}
			fullWidth={fullWidth}
			className={classes.root}
			margin={margin}>
			<InputLabel
				className={classes.label}
				htmlFor={id}>
				{label}
			</InputLabel>
			<Select
				{...other}
				className={classes.select}
				value={value}
				onChange={onChange}
				inputProps={{
					id,
					name
				}}
			/>
			{
				helperText && error && <FormHelperText>{ helperText }</FormHelperText>
			}
		</FormControl>
	)
}

CustomizedSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	children: PropTypes.node,
	label: PropTypes.string,
	onChange: PropTypes.func,
	value: PropTypes.string,
	name: PropTypes.string,
	helperText: PropTypes.string,
	error: PropTypes.bool,
	fullWidth: PropTypes.bool,
	margin: PropTypes.string
}

export default withStyles(styles)(CustomizedSelect)
