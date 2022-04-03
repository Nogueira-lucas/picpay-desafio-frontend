import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    ContainerLogin,
    Title,
    WrapperInputs
} from './Login.style'
import { ReactComponent as Logo } from '../../../assets/Logo.svg'
import { ReactComponent as ManPayment } from '../../../assets/man-payment.svg'
import {
  Button,
  TextField,
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'

const Login = () => {

  const useStyles = makeStyles({
    root: {
      '& .MuiOutlinedInput-root ': {
        marginBottom : '30px'
      }
    }
  })

  const classesInput = useStyles()

  const [passwordValues, setPasswordValues] = useState({
    password: '',
    showPassword: false,
  })

  const [email, setEmail] = useState()

  const handleChangeEmail = event => {
    setEmail(event.target.value)
  }

  const handleChangePassword = prop => event => {
    setPasswordValues({ ...passwordValues, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setPasswordValues({
      ...passwordValues,
      showPassword: !passwordValues.showPassword,
    })
  }

  const history = useHistory()

  const [response, setResponse] = useState()

  useEffect(() => {
    axios.get('http://localhost:3001/account').then(res => setResponse(res.data))
  },[])

  const validateLogin = (email, password) => {
    response.map(item => {
      if (item.email === email && item.password === password) {
        localStorage.setItem('hasPermition', true)
        history.push("meus-pagamentos")
      } else {
        alert('email ou senha incorretos')
      }
    })
  }

  return (
    <>
      <ContainerLogin>
          <Logo />
          <Title>Bem vindo de volta</Title>
          <WrapperInputs>
            <TextField 
              className={classesInput.root}  
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              onChange={handleChangeEmail}
              />
            <FormControl variant="outlined"  className={classesInput.root}>
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput 
                id="outlined-adornment-weight" 
                value={passwordValues.password}
                onChange={handleChangePassword('password')}
                label="Senha" 
                type={passwordValues.showPassword ? 'text' : 'password'}
                variant="outlined" 
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {passwordValues.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                />
            </FormControl>
          </WrapperInputs>
            <Button variant="contained" onClick={() => validateLogin(email, passwordValues.password)}>
              ENTRAR
            </Button>
      </ContainerLogin>
      <ManPayment />
    </>
  )
}

export default Login