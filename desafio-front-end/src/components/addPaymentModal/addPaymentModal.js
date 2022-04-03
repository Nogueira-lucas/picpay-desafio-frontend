import React from 'react'
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField
} from '@mui/material'
import {
  WrapperInputs,
  WrapperButtons
} from './addPaymentModal.style'
import { makeStyles } from '@mui/styles'

const AddPaymentModal = ({ openAddPayment, setOpenAddPayment, payload }) => {

  const handleClose = () => setOpenAddPayment(false)

  console.log(payload)

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
            defaultValue={payload && payload.name}
            required 
            label="Usuário" 
            variant="outlined" />

          <TextField 
            required
           label="Valor"
           variant="outlined"
           defaultValue={payload && payload.value} />

          <TextField 
            required 
            label="Data" 
            variant="outlined" 
            defaultValue={payload && payload.date} />

          <TextField 
            required 
            label="Título" 
            variant="outlined"
            defaultValue={payload && payload.title}
            />

        </WrapperInputs>
        <WrapperButtons>
          <Button variant='contained' >Salvar</Button>
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