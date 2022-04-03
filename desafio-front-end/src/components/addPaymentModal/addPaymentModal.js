import React, { useState } from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField
} from '@mui/material'
import DateTimePicker from '@mui/lab/DateTimePicker'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import {
  WrapperInputs,
  WrapperButtons
} from './addPaymentModal.style'
import { makeStyles } from '@mui/styles'

const AddPaymentModal = ({ openAddPayment, setOpenAddPayment, payload }) => {
  const [user, setUser] = useState('')
  const [value, setValue] = useState('')
  const [date, setDate] = useState(new Date())
  const [title, setTitle] = useState('')

  const handleCleanInputs = () => {
    setUser()
    setValue()
    setDate()
    setTitle()
  }

  const handleSalve = data => {
    axios.post('http://localhost:3001/tasks', data)
    handleCleanInputs()
  }
  
  const handleClose = () => {
    setOpenAddPayment(false)
  }

  const handleEdit = data => {

  }

  const handleChangeUser = event => {
    setUser(event.target.value)
  }

  const handleChangeValue = event => {
    setValue(event.target.value)
  }

  const handleChangeDate = newValue => {
    setDate(newValue)
  }

  const handleChangeTitle = event => {
    setTitle(event.target.value)
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '692px',
    height: '315px',
    bgcolor: 'white',
    boxShadow: 24,
    padding: '40px',
    fontFamily: 'Montserrat'
  }

  const useStyles = makeStyles({
    root: {
      '& .MuiFormControl-root ': {
        marginTop : '40px',
        width: '326px'
      }
    }
  })

  const classesInput = useStyles()

  return (
    <Modal
      open={openAddPayment}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography sx={{marginBottom: '10px', fontFamily: 'Montserrat'}} variant="h6" component="h2">
          Adicionar pagamento
        </Typography>
        <WrapperInputs className={classesInput.root}>
          <TextField
            onChange={handleChangeUser}
            defaultValue={payload ? payload.name : user}
            required 
            label="Usuário" 
            variant="outlined" />

          <TextField
            onChange={handleChangeValue}
            required
            label="Valor"
            variant="outlined"
            type='Number'
            defaultValue={payload ? payload.value : value} />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              required
              label="Data"
              inputFormat="dd/MM/yyyy HH:MM"
              defaultValue={payload ? payload.date : date}
              onChange={handleChangeDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            onChange={handleChangeTitle}
            required 
            label="Título" 
            variant="outlined"
            defaultValue={payload ? payload.title : title}
            />

        </WrapperInputs>
        <WrapperButtons>
          <Button 
            variant='contained'
            disabled={!(user !== '' && value !== '' && date !== '' && title !== '')}
            onClick={() => handleSalve({
              name: user,
              value: value,
              date: date,
              title: title
            })}
          >Salvar</Button>
          <Button 
            variant='contained'
            color='inherit' 
            sx={{
              backgroundColor: '#F5F5F5',
              boxShadow: 'none'
            }}
            onClick={handleClose}
            >Cancelar</Button>
        </WrapperButtons>
      </Box>
    </Modal>
  )
}

export default AddPaymentModal