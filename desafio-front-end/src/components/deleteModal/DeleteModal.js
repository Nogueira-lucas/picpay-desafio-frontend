import React from 'react'
import axios from 'axios'
import {
  Box,
  Button,
  Typography,
  Modal,
} from '@mui/material'
import formatDate from '../../utils/formatDate'
import { WrapperDetails, WrapperButtons } from './DeleteModal.style'
import formatPrice from '../../utils/formatPrice'

const DeleteModal = ({ openDeleteModal, setOpenDeleteModal, payload}) => {
  
  const handleClose = () => {
    setOpenDeleteModal(false)
  }

  const handleDelete = data => {
    axios.delete(`http://localhost:3001/tasks/${data.id}`)
    setOpenDeleteModal(false)
  }


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '325px',
    height: '245px',
    bgcolor: 'white',
    boxShadow: 24,
    padding: '40px',
    fontFamily: 'Montserrat'
  }

  return (
    <Modal
    open={openDeleteModal}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography sx={{fontFamily: 'Montserrat', fontWeight: 700}} variant="h6" component="h2">
        Excluir pagamento
      </Typography>
      <WrapperDetails>
        <p>Usuário: {payload?.name}</p>
        <p>Data: {formatDate(payload?.date)}</p>
        <p>Valor: {formatPrice(payload?.value, 'R$')}</p>
      </WrapperDetails>
      <WrapperButtons>
        <Button
          variant='contained'
          onClick={() => handleDelete(payload)}
        >Salvar</Button>
        <Button
          onClick={handleClose}
          variant='contained'
          color='inherit' 
          sx={{
            backgroundColor: '#F5F5F5',
            boxShadow: 'none'
          }}
        >Cancelar</Button>
      </WrapperButtons>
    </Box>
  </Modal>
  )
}

export default DeleteModal