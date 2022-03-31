import React, { useState } from 'react'
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

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  })

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const history = useHistory()

  return (
    <>
      <ContainerLogin>
          <Logo />
          <Title>Bem vindo de volta</Title>
          <WrapperInputs>
            <TextField className={classesInput.root} id="outlined-basic" label="Email" variant="outlined" />
            <FormControl variant="outlined"  className={classesInput.root}>
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput 
                id="outlined-adornment-weight" 
                value={values.password}
                onChange={handleChange('password')}
                label="Senha" 
                type={values.showPassword ? 'text' : 'password'}
                variant="outlined" 
                endAdornment={
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                }
                />
            </FormControl>
          </WrapperInputs>
            <Button variant="contained" onClick={() => history.push("meus-pagamentos")}>
              ENTRAR
            </Button>
      </ContainerLogin>
      <ManPayment />
    </>
  )
}

export default Login