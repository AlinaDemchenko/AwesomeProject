import React from 'react'
import { StyledInput } from './Input.styled'

function Input({placeholder}) {
    const [text, onChangeText] = React.useState('');

  return (
    <StyledInput
    onChangeText={onChangeText}
    value={text}
    placeholder={placeholder}
    placeholderTextColor="#BDBDBD"
    />
  )
}

export default Input