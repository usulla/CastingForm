
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
// import classNames from 'classnames'
import Fab from '@material-ui/core/Fab'
import AttachFile from '@material-ui/icons/AttachFile'

const styles = {
	input: {},
	label:{},
	fab: {
		width: '32px',
		height: '32px',
		minHeight: '32px',
		backgroundColor: 'transparent',
		boxShadow: 'none',
		border: '1px solid rgba(0, 0, 0, 0.23)'
	}
}

const CustomizedInputFile = props => {
	const {
		classes = '',
		id = '',
		checked = false,
		...other } = props
	return (
		<Fragment>
			<input
				{ ...other }
				id={id}
				className={classes.input}
			/>
			<label
				htmlFor={id}
				className={classes.label}
				style={{display: checked ? 'none' : 'block',}}>
				<Fab
					size='small'
					component='span'
					// variant='outlined'
					className={classes.fab}
				>
					<AttachFile fontSize='small' />
				</Fab>
			</label>
		</Fragment>
	)
}

CustomizedInputFile.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	checked: PropTypes.bool
}

export default withStyles(styles)(CustomizedInputFile)
