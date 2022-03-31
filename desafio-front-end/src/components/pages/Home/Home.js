import React from 'react'
import Navbar from '../../Navbar/Navbar'
import {
  Wrapper,
  ContainerInformations,
  Header
} from './Home.style'
import Title from '../../Title/Title'
import { TITLE_PAGES } from '../../../config/constants'
import { Button } from '@mui/material'

const { MY_PAYMENTS } = TITLE_PAGES

const Home = () => {
  return (
    <Wrapper>
      <Navbar />
      <ContainerInformations>
        <Header>
          <Title title={MY_PAYMENTS} />
          <Button variant='contained' >ADICIONAR PAGAMENTO</Button>
        </Header>
      </ContainerInformations>
    </Wrapper>
  )
}

export default Home