import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { FaSort } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { TiDeleteOutline } from 'react-icons/ti';
import { Checkbox } from '@mui/material';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import Pagination, { PaginationHandles } from '../../components/Pagination';
import { api } from '../../services/api';

import {
  currencyFormatAsNumber,
  numberFormatAsCurrency,
} from '../../utils/numberFormat';
import { IPaymentFormData, PaymentModal } from '../../components/PaymentModal';
import { ModalConfirm } from '../../components/ModalConfirm';
import { Loading } from '../../components/Loading';

import {
  Container,
  Main,
  MainHeader,
  TableContainer,
  TableContainerHeader,
  PaymentsTable,
} from './styles';
import { LoadingModal } from '../../components/LoadingModal';

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
  dateFormattedString: string;
  dateFormattedNormal: string;
  hourFormatted: string;
}

export const Home: React.FC = () => {
  const paginationRef = useRef<PaginationHandles>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingModal, setLoadingModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [tableRefresh, setTableRefresh] = useState(false);

  const [statements, setStatements] = useState<IStatementsProps[]>([]);
  const [totalStatements, setTotalStatements] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showModalDeleteConfirm, setShowModalDeleteConfirm] = useState(false);

  const [selectedStatement, setSelectedStatement] = useState<
    IStatementsProps | undefined
  >();

  useEffect(() => {
    api
      .get<IStatementsProps[]>('/tasks', {
        params: {
          _start: offset,
          _limit: limit,
          _sort: 'id',
          _order: 'desc',
        },
      })
      .then(response => {
        setTotalStatements(Number(response.headers['x-total-count']));

        setStatements(response.data);
        setIsLoading(false);
      });
  }, [offset, limit, tableRefresh]);

  const handleOffsetAndLimit = useCallback(
    (_limit: number, _offset: number) => {
      setIsLoading(true);
      setLimit(_limit);
      setOffset(_offset);
    },
    [],
  );

  const handleCheckPayment = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const statementId = event.target.ariaLabel;
      const edited = statements.find(
        statement => statement.id === Number(statementId),
      );

      if (edited) {
        setStatements(
          statements.map(statement =>
            statement.id === Number(statementId)
              ? {
                  ...edited,
                  isPayed: event.target.checked,
                }
              : statement,
          ),
        );

        await api.put(`/tasks/${statementId}`, {
          ...edited,
          isPayed: event.target.checked,
        });
      }
    },
    [statements],
  );

  const formattedStatements = useMemo(
    () =>
      statements.map(statement => ({
        ...statement,
        valueFormatted: numberFormatAsCurrency(statement.value),
        dateFormattedString: format(parseISO(statement.date), 'dd MMM yyyy', {
          locale: ptBR,
        }),
        dateFormattedNormal: format(parseISO(statement.date), 'dd/MM/yyyy', {
          locale: ptBR,
        }),
        hourFormatted: format(parseISO(statement.date), 'HH:mm aa'),
      })),
    [statements],
  );

  const togglePaymentModal = useCallback(() => {
    setShowPaymentModal(!showPaymentModal);
  }, [showPaymentModal]);

  const toggleModalDeleteConfirm = useCallback(() => {
    setShowModalDeleteConfirm(!showModalDeleteConfirm);
  }, [showModalDeleteConfirm]);

  const handleRefreshPage = useCallback(() => {
    setTableRefresh(!tableRefresh);
    setLoadingModal(false);
  }, [tableRefresh]);

  const handleStatementRegister = useCallback(
    async (statement: IPaymentFormData): Promise<void> => {
      const parts = statement.date.split('/');
      const year = Number(parts[2]);
      const month = Number(parts[1]) - 1;
      const day = Number(parts[0]);
      const newDate = new Date(year, month, day).toISOString();
      setLoadingModal(true);

      if (selectedStatement) {
        const edited = {
          name: statement.username,
          username: statement.username.split(' ')[0].toLowerCase(),
          title: statement.title,
          value: currencyFormatAsNumber(statement.value.toString()),
          date: newDate,
          image: selectedStatement.image,
          isPayed: selectedStatement.isPayed,
        };

        await api.put(`/tasks/${selectedStatement.id}`, edited);
      } else {
        const newStatement = {
          name: statement.username,
          username: statement.username.split(' ')[0].toLowerCase(),
          title: statement.title,
          value: currencyFormatAsNumber(statement.value.toString()),
          date: newDate,
        };

        await api.post('/tasks', newStatement);
      }

      handleRefreshPage();
    },
    [selectedStatement, handleRefreshPage],
  );

  const handleClearStatement = useCallback(() => {
    setSelectedStatement(undefined);
  }, []);

  const handleModalDeleteConfirmYes = useCallback(async () => {
    setLoadingModal(true);
    await api.delete(`/tasks/${selectedStatement?.id}`);
    setSelectedStatement(undefined);
    handleRefreshPage();
  }, [selectedStatement, handleRefreshPage]);

  const handleSearchBar = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (
      !searchInputRef.current?.value ||
      searchInputRef.current?.value.length < 3
    ) {
      return;
    }
    setIsLoading(true);

    const param = searchInputRef.current?.value.toLowerCase().trim();

    api
      .get(`tasks`, {
        params: {
          username: param,
        },
      })
      .then(response => {
        setTotalStatements(0);

        setStatements(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err.message);
        setIsLoading(false);
      });
  }, []);

  const handleInputSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.length === 0) {
        handleRefreshPage();
      }
    },
    [handleRefreshPage],
  );

  return (
    <Container>
      <LoadingModal isOpen={showLoadingModal} />
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
        handleConfirmNo={handleClearStatement}
      />
      <Header />
      <Main>
        <MainHeader>
          <h1>Meus pagamentos</h1>
        </MainHeader>

        <div className="barControl">
          <Button
            style={{ width: '230px' }}
            onClick={togglePaymentModal}
            title="novo"
          >
            ADICIONAR PAGAMENTO
          </Button>
        </div>

        <TableContainer>
          <TableContainerHeader>
            <div className="search">
              <form onSubmit={handleSearchBar}>
                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-bar"
                  placeholder="Pesquisar por usuário"
                  onChange={handleInputSearch}
                />
                <button className="searchButton" type="submit">
                  Filtrar
                </button>
              </form>
            </div>

            {totalStatements > 0 && (
              <div className="pagination">
                <Pagination
                  ref={paginationRef}
                  count={totalStatements}
                  limit={limit}
                  onChange={handleOffsetAndLimit}
                />
              </div>
            )}
          </TableContainerHeader>

          {isLoading ? (
            <Loading />
          ) : (
            <PaymentsTable>
              <thead>
                <tr>
                  <th>
                    Usuário <FaSort size={15} />
                  </th>
                  <th>
                    Título <FaSort size={15} />
                  </th>
                  <th>
                    Data <FaSort size={15} />
                  </th>
                  <th>
                    Valor <FaSort size={15} />
                  </th>
                  <th>
                    Pago <FaSort size={15} />
                  </th>
                  <th className="actions" />
                </tr>
              </thead>
              <tbody>
                {formattedStatements.map(statement => (
                  <tr
                    key={statement.id}
                    onClick={() => setSelectedStatement(statement)}
                  >
                    <td>
                      <div className="userInfo">
                        <span>{statement.name}</span>
                        <span className="bottomInfo">{`@${statement.username}`}</span>
                      </div>
                    </td>
                    <td>{statement.title}</td>
                    <td>
                      <div className="dateInfo">
                        <span>{statement.dateFormattedString}</span>
                        <span className="bottomInfo">
                          {statement.hourFormatted}
                        </span>
                      </div>
                    </td>
                    <td>{statement.valueFormatted}</td>
                    <td>
                      <Checkbox
                        inputProps={{ 'aria-label': String(statement.id) }}
                        checked={statement?.isPayed || false}
                        onChange={handleCheckPayment}
                      />
                    </td>
                    <td className="actions">
                      <div>
                        <button
                          type="button"
                          onClick={togglePaymentModal}
                          title="Editar"
                        >
                          <MdOutlineEdit size={24} />
                        </button>
                        <button
                          type="button"
                          title="Excluir"
                          onClick={toggleModalDeleteConfirm}
                        >
                          <TiDeleteOutline size={24} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </PaymentsTable>
          )}
        </TableContainer>
      </Main>
    </Container>
  );
};
