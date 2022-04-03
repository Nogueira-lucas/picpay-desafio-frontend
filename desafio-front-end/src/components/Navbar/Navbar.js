import React from 'react'
import {
  Wrapper
} from './Navbar.style'
import Button from '@mui/material/Button'
import { ReactComponent as Logo } from '../../assets/nav-logo.svg'
import { ReactComponent as Profile } from '../../assets/profile.svg'

const Navbar = () => {

  const logout = () => {
    localStorage.removeItem('hasPermition')
    window.location.assign('/')
  }

  return (
    <Wrapper>
      <Logo />
      <Profile />
      <Button onClick={() => logout()} sx={{color: 'white'}}>Sair</Button>
    </Wrapper>
  )
}

export default Navbar