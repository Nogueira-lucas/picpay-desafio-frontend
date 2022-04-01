import React, { useState } from 'react'
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

const { MY_PAYMENTS } = TITLE_PAGES

const Home = () => {

  const [openAddPayment, setOpenAddPayment] = useState(false)
  const renderAddPaymentModal = () => setOpenAddPayment(true)
  
  return (
    <Wrapper>
      <Navbar />
      <ContainerInformations>
        <Header>
          <Title title={MY_PAYMENTS} />
          <Button variant='contained' onClick={() => renderAddPaymentModal()} >ADICIONAR PAGAMENTO</Button>
        </Header>
      </ContainerInformations>
      <AddPaymentModal openAddPayment={openAddPayment} setOpenAddPayment={setOpenAddPayment} />
    </Wrapper>
  )
}

export default Home