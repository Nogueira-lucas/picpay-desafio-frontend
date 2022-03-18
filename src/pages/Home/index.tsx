import React, { useCallback, useRef, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti'
import Button from '../../components/Button';
import Header from '../../components/Header';
import Pagination, { PaginationHandles } from '../../components/Pagination';

import { Container, Main, MainHeader, TableContainer, TableContainerHeader, PaymentsTable } from './styles';

const Home: React.FC = () => {
  const paginationRef = useRef<PaginationHandles>(null);

  return (
    <Container>
      <Header />
      <Main>


        <MainHeader>
          <h1>Meus pagamentos</h1>
        </MainHeader>

        <div className="barControl">
          <Button style={{ width: '230px' }}>
            ADICIONAR PAGAMENTO
          </Button>
        </div>

        <TableContainer>
          <TableContainerHeader>
            <div className="search">
              <input
                type="text"
                className="search-bar"
                placeholder="Pesquisar por usuário"
              />
              <button className='searchButton' type='button'>Filtrar</button>
            </div>

            <div className="pagination">
              <Pagination
                ref={paginationRef}
                count={100}
                limit={10}
                pageRangeDisplayed={5}
                onChange={() => { }}
              />
            </div>
          </TableContainerHeader>

          <PaymentsTable>
            <thead>
              <tr>
                <th>Usuário <FaSort size={15} /></th>
                <th>Título <FaSort size={15} /></th>
                <th>Data <FaSort size={15} /></th>
                <th>Valor <FaSort size={15} /></th>
                <th>Pago <FaSort size={15} /></th>
                <th className='actions' ></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="userInfo">
                    <span>Cláudia</span>
                    <span className='bottomInfo'>@claudia</span>
                  </div>
                </td>
                <td>Professor 1</td>
                <td>
                  <div className="dateInfo">
                    <span>18 Mar 2022</span>
                    <span className='bottomInfo'>11:00 AM</span>
                  </div>
                </td>
                <td>R$ 100,00</td>
                <td>Pago</td>
                <td className="actions">
                  <div>
                    <MdOutlineEdit size={24} />
                    <TiDeleteOutline size={24}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="userInfo">
                    <span>Cláudia</span>
                    <span className='bottomInfo'>@claudia</span>
                  </div>
                </td>
                <td>Professor 1</td>
                <td>
                  <div className="dateInfo">
                    <span>18 Mar 2022</span>
                    <span className='bottomInfo'>11:00 AM</span>
                  </div>
                </td>
                <td>R$ 100,00</td>
                <td>Pago</td>
                <td className="actions">
                  <div>
                    <MdOutlineEdit size={24} />
                    <TiDeleteOutline size={24}/>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="userInfo">
                    <span>Cláudia</span>
                    <span className='bottomInfo'>@claudia</span>
                  </div>
                </td>
                <td>Professor 1</td>
                <td>
                  <div className="dateInfo">
                    <span>18 Mar 2022</span>
                    <span className='bottomInfo'>11:00 AM</span>
                  </div>
                </td>
                <td>R$ 100,00</td>
                <td>Pago</td>
                <td className="actions">
                  <div>
                    <MdOutlineEdit size={24} />
                    <TiDeleteOutline size={24}/>
                  </div>
                </td>
              </tr>
            </tbody>
          </PaymentsTable>
        </TableContainer>
      </Main>
    </Container>
  );
}

export default Home;