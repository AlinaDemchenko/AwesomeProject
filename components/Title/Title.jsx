import React from 'react'
import { StyledTitle } from './Title.styled'

function Title({children}) {
  return (
   <StyledTitle style={{ fontFamily: "Roboto-Medium", fontSize: 30 }}>{children}</StyledTitle>
  )
}

export default Title