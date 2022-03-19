import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { FaSort } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti'
import Button from '../../components/Button';
import Header from '../../components/Header';
import Pagination, { PaginationHandles } from '../../components/Pagination';
import { api } from '../../services/api';

import { Container, Main, MainHeader, TableContainer, TableContainerHeader, PaymentsTable } from './styles';
import { numberFormatAsCurrency } from '../../utils/numberFormat';
import { Checkbox } from '@mui/material';
import { PaymentModal } from '../../components/PaymentModal';
import ModalConfirm from '../../components/ModalConfirm';

interface IStatementsProps {
  id: number;
  name: string;
  username: string;
  title: string;
  value: number;
  date: string;
  image: string;
  isPayed: boolean;
  valueFormatted: string;
  dateFormatted: string;
  hourFormatted: string;
}

const Home: React.FC = () => {
  const paginationRef = useRef<PaginationHandles>(null);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const [statements, setStatements] = useState<IStatementsProps[]>([]);
  const [totalStatements, setTotalStatements] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] = useState(false);

  const [selectedStatement, setSelectedStatement] = useState<IStatementsProps | undefined>();


  useEffect(() => {
    api.get<IStatementsProps[]>('/tasks', {
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
      setLimit(_limit);
      setOffset(_offset);
    },
    [],
  );

  const handleCheckPayment = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const statementId = event.target.ariaLabel;
    const edited = statements.find(statement => statement.id === Number(statementId));

    if (edited) {
      setStatements(statements.map(
        statement =>
          statement.id === Number(statementId) ? {
            ...edited,
            isPayed: event.target.checked,
          } : statement)
      );

      await api.put(`/tasks/${statementId}`, {
        ...edited,
        isPayed: event.target.checked,
      });
    }

  }, [statements]);

  const formattedStatements = useMemo(() => {
    return statements.map(statement => {
      return {
        ...statement,
        valueFormatted: numberFormatAsCurrency(statement.value),
        dateFormatted: format(parseISO(statement.date), "dd MMM yyyy", {
          locale: ptBR,
        }),
        hourFormatted: format(parseISO(statement.date), 'HH:mm aa'),
      };
    });
  }, [statements]);

  const togglePaymentModal = useCallback(() => {
    setShowPaymentModal(!showPaymentModal);
  }, [showPaymentModal]);

  const toggleModalDeleteConfirm = useCallback(() => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  }, [showModalDeleteConfirm]);

  const handleStatementRegister = useCallback(async (statement: IStatementsProps) => {
    console.log(statement);
  }, []);

  const handleClearStatement = useCallback(() => {
    setSelectedStatement(undefined);
  }, []);

  const handleModalDeleteConfirmYes = useCallback(() => {
    console.log(selectedStatement);
  }, [selectedStatement]);

  return (
    <Container>
      <PaymentModal
        statement={selectedStatement}
        isOpen={showPaymentModal}
        setIsOpen={togglePaymentModal}
        handleStatementRegister={handleStatementRegister}
        handleClearStatement={handleClearStatement}
      />
      <ModalConfirm
        statement={selectedStatement}
        title="Excluir pagamento?"
        confirmYes="Excluir"
        confirmNo="Cancelar"
        isOpen={showModalDeleteConfirm}
        setIsOpen={toggleModalDeleteConfirm}
        handleConfirmYes={handleModalDeleteConfirmYes}
      />
      <Header />
      <Main>
        <MainHeader>
          <h1>Meus pagamentos</h1>
        </MainHeader>

        <div className="barControl">
          <Button style={{ width: '230px' }} onClick={togglePaymentModal} title='novo'>
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
              {formattedStatements.map(statement => (
                <tr key={statement.id} onClick={() => setSelectedStatement(statement)}>
                  <td>
                    <div className="userInfo">
                      <span>{statement.name}</span>
                      <span className='bottomInfo'>{`@${statement.username}`}</span>
                    </div>
                  </td>
                  <td>{statement.title}</td>
                  <td>
                    <div className="dateInfo">
                      <span>{statement.dateFormatted}</span>
                      <span className='bottomInfo'>{statement.hourFormatted}</span>
                    </div>
                  </td>
                  <td>{statement.valueFormatted}</td>
                  <td>
                    <Checkbox
                      inputProps={{ 'aria-label': String(statement.id) }}
                      checked={statement.isPayed}
                      onChange={handleCheckPayment} />
                  </td>
                  <td className="actions">
                    <div>
                      <button type='button' onClick={togglePaymentModal} title='Editar'>
                        <MdOutlineEdit size={24} />
                      </button>
                      <button type='button' title='Excluir' onClick={toggleModalDeleteConfirm}>
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