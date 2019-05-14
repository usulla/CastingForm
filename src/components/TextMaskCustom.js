import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'

function TextMaskCustom(props) {
	const { inputRef, ...other } = props

	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null)
			}}
			mask={['+', '7', '\u2000', /[1-9]/, /\d/, /\d/, '\u2000', /\d/, /\d/, /\d/, '\u2000', /\d/, /\d/, '\u2000', /\d/, /\d/]}
			placeholderChar={'_'}
		/>
	)
}

TextMaskCustom.propTypes = {
	inputRef: PropTypes.func.isRequired
}

export default TextMaskCustom
