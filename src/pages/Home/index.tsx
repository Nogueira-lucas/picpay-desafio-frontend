import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaSort } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti'
import Button from '../../components/Button';
import Header from '../../components/Header';
import Pagination, { PaginationHandles } from '../../components/Pagination';
import { api } from '../../services/api';

import { Container, Main, MainHeader, TableContainer, TableContainerHeader, PaymentsTable } from './styles';

interface StatementsProps {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
}

const Home: React.FC = () => {
  const paginationRef = useRef<PaginationHandles>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const [statements, setStatements] = useState<StatementsProps[]>([]);
  const [totalStatements, setTotalStatements] = useState(0);

  useEffect(() => {
    api.get<StatementsProps[]>('/tasks', {
      params: {
        _start: offset,
        _limit: limit,
      }
    }).then(response => {
      setTotalStatements(Number(response.headers['x-total-count']));
      setStatements(response.data);
    });
  }, [offset, limit]);

  const handleOffsetAndLimit = useCallback(
    (_limit: number, _offset: number) => {
      // setIsLoading(true);

      setLimit(_limit);
      setOffset(_offset);
    },
    [],
  );

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
                count={totalStatements}
                limit={limit}
                onChange={handleOffsetAndLimit}
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
              {statements.map(statement => (
                <tr key={statement.id}>
                  <td>
                    <div className="userInfo">
                      <span>{statement.name}</span>
                      <span className='bottomInfo'>{`@${statement.username}`}</span>
                    </div>
                  </td>
                  <td>{statement.title}</td>
                  <td>
                    <div className="dateInfo">
                      <span>{statement.date}</span>
                      <span className='bottomInfo'>11:00 AM</span>
                    </div>
                  </td>
                  <td>{statement.value}</td>
                  <td>Pago</td>
                  <td className="actions">
                    <div>
                      <button type='button'>
                        <MdOutlineEdit size={24} />
                      </button>
                      <button type='button'>
                        <TiDeleteOutline size={24} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </PaymentsTable>
        </TableContainer>
      </Main>
    </Container>
  );
}

export default Home;