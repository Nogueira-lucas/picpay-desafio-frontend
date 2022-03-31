import React from 'react'
import {
  Wrapper
} from './Navbar.style'
import { ReactComponent as Logo } from '../../assets/nav-logo.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'

const Navbar = () => {
  return (
    <Wrapper>
      <Logo />
      <Profile />
    </Wrapper>
  )
}

export default Navbar