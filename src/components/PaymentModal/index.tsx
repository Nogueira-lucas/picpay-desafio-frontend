import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { Form } from './styles';

import Modal from '../Modal';
import Input from '../Input';

import { getValidationErrors } from '../../utils/getValidationErrors';

import { currencyFormatAsNumber } from '../../utils/numberFormat';


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

interface IPaymentModalModalProps {
  statement?: IStatementsProps;
  isOpen: boolean;
  setIsOpen: () => void;
  handleStatementRegister: (statement: IStatementsProps) => Promise<void>;
  handleClearStatement: () => void;
}


export const PaymentModal: React.FC<IPaymentModalModalProps> = ({
  statement,
  isOpen,
  setIsOpen,
  handleStatementRegister,
  handleClearStatement,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IStatementsProps) => {
      handleStatementRegister(data);
    },
    [],
  );

  const handleCancel = useCallback(() => {
    handleClearStatement();
    setIsOpen();
  }, [setIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="772px"
      background='#FFF'
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <h3>{statement ? 'Editar Pagamento' : 'Adicionar Pagamento'}</h3>
        </div>

        <div className="row">
          <Input
            name="name"
            placeholder="Usuário*"
            defaultValue={statement?.name || ''}
          />
          <Input
            name="value"
            placeholder="Valor*"
            mask="currency"
            defaultValue={statement?.valueFormatted}
          />
        </div>

        <div className="row">
          <Input
            name="date"
            placeholder="Data*"
            mask='date'
            defaultValue={statement?.dateFormatted}
          />
          <Input
            name="title"
            placeholder="Título"
            defaultValue={statement?.title}
          />
        </div>

        <div className="footer">
          <button className='cancel' type="button" onClick={handleCancel} data-testid="cancel-payment-button">
            <p className="text">Cancelar</p>
          </button>

          <button className='confirm' type="submit" data-testid="register-payment-button">
            <p className="text">Salvar</p>
          </button>
        </div>
      </Form>
    </Modal>
  );
};
