import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Paper, Checkbox, IconButton } from '@mui/material'
import formatPrice from '../../utils/formatPrice'
import formatDate from '../../utils/formatDate'
import { WrapperIcons } from './Table.style'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined'

const Table = ({ rows, setOpenAddPayment, setPaymentInformations, setOpenDeleteModal }) => {

  const renderEditPayment = ({ row }) => {
    setPaymentInformations(row)
    setOpenAddPayment(true)
  }

  const renderDeletePayment = ({ row }) => {
    setPaymentInformations(row)
    setOpenDeleteModal(true)
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Usuário',
      width: 350
    },
    {
      field: 'title',
      headerName: 'Título',
      width: 250,
    },
    {
      field: 'date',
      headerName: 'Data',
      width: 150,
      renderCell: ({ value }) => (
        <div>{formatDate(value)}</div>
      )
    },
    {
      field: 'value',
      headerName: 'Valor',
      width: 116,
      renderCell: ({ value }) => (
        <div>{formatPrice(value, 'R$')}</div>
      )
    },
    {
      field: 'isPayed',
      headerName: 'Pago',
      width: 300,
      renderCell: (data) => (
        <div style={{display: 'flex', alignItems: 'center', width: '340px', justifyContent: 'space-between'}}>
          <Checkbox checked={data.value && true}/>
          <WrapperIcons>
            <IconButton onClick={() => renderEditPayment(data)} >
              <CreateOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => renderDeletePayment(data)} >
              <CloseOutlinedIcon />
            </IconButton>
          </WrapperIcons>
        </div>

      )
    }
  ]

  return (
    <Paper style={{
      height: '524px',
      margin: '21px auto 24px'
    }}>

      <DataGrid 
       rowHeight={81}
       columns={columns}
       rows={rows}
       rowsPerPageOptions={[5, 10, 15, 50, 100]}
       disableSelectionOnClick
       components={{
         Toolbar: GridToolbar,
       }}
      />
    </Paper>
  )
}

export default Table