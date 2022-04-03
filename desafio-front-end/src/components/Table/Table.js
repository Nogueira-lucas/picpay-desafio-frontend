import React from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { Paper, Checkbox } from '@mui/material'
import formatPrice from '../../utils/formatPrice'
import formatDate from '../../utils/formatDate'

const Table = ({ rows }) => {

  console.log(rows)

  const columns = [
    {
      field: 'name',
      headerName: 'Usuário',
      width: 350,
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
      renderCell: ({ value }) => (
        <Checkbox checked={value && true}/>
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
       components={{
         Toolbar: GridToolbar,
       }}
      />
    </Paper>
  )
}

export default Table