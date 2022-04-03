import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../../Navbar/Navbar'
import {
  Wrapper,
  ContainerInformations,
  Header
} from './Home.style'
import Title from '../../Title/Title'
import { TITLE_PAGES } from '../../../config/constants'
import { Button } from '@mui/material'
import AddPaymentModal from '../../addPaymentModal/addPaymentModal'
import Table from '../../Table/Table'
import {authValidate} from '../../../utils/authValidade'

const { MY_PAYMENTS } = TITLE_PAGES

authValidate()

const Home = () => {
  
  const [openAddPayment, setOpenAddPayment] = useState(false)
  const [rows, setRows] = useState({})
  
  useEffect(() => {
    axios.get('http://localhost:3001/tasks').then(res => setRows(res.data))
  },[])


  const renderAddPaymentModal = () => setOpenAddPayment(true)

  return (
    <Wrapper>
      <Navbar />
      <ContainerInformations>
        <Header>
          <Title title={MY_PAYMENTS} />
          <Button variant='contained' onClick={() => renderAddPaymentModal()} >ADICIONAR PAGAMENTO</Button>
        </Header>
        <Table rows={rows} />
      </ContainerInformations>
      <AddPaymentModal openAddPayment={openAddPayment} setOpenAddPayment={setOpenAddPayment} />
    </Wrapper>
  )
}

export default Home