import React, { useRef, useCallback } from 'react';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { isDate, parse } from 'date-fns';
import { Form } from './styles';

import Modal from '../Modal';
import { Input } from '../Input';

import { getValidationErrors } from '../../utils/getValidationErrors';
import { numberFormat } from '../../utils/numberFormat';
import { useToast } from '../../hooks/toast';

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

export interface IPaymentFormData {
  id?: number;
  name: string;
  username: string;
  title: string;
  value: string;
  date: string;
}

interface IPaymentModalModalProps {
  statement?: IStatementsProps;
  isOpen: boolean;
  setIsOpen: () => void;
  handleStatementRegister: (statement: IPaymentFormData) => void;
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
  const { addToast } = useToast();

  function parseDateString(value: any, originalValue: any) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, 'dd/MM/yyyy', new Date());

    return parsedDate;
  }

  const handleSubmit = useCallback(
    async (data: IPaymentFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          username: Yup.string()
            .required('Usuário é obrigatório')
            .matches(
              /^[aA-zZ\s]+$/,
              'Apenas letras são permitidos para este campo',
            ),
          value: Yup.string().required('Valor é obrigatório'),
          date: Yup.string().required('Data é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        handleStatementRegister(data);
        setIsOpen();

        addToast({
          type: 'success',
          title: 'Pagamento registrado com sucesso!',
        });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          const errors = getValidationErrors(error);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Não Permitido',
          description: 'Erro na solicitação',
        });
      }
    },
    [setIsOpen, handleStatementRegister, addToast],
  );

  const handleCancel = useCallback(() => {
    handleClearStatement();
    setIsOpen();
  }, [handleClearStatement, setIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="772px"
      background="#FFF"
      shouldCloseOnOverlayClick={false}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <div className="row">
          <h3>{statement ? 'Editar Pagamento' : 'Adicionar Pagamento'}</h3>
        </div>

        <div className="row">
          <Input
            name="username"
            placeholder="Usuário*"
            defaultValue={statement?.name}
          />
          <Input
            name="value"
            placeholder="Valor*"
            mask="currency"
            defaultValue={statement?.value && numberFormat(statement?.value)}
          />
        </div>

        <div className="row">
          <Input
            name="date"
            placeholder="Data*"
            mask="date"
            defaultValue={statement?.dateFormattedNormal}
          />
          <Input
            name="title"
            placeholder="Título"
            defaultValue={statement?.title}
          />
        </div>

        <div className="footer">
          <button
            className="cancel"
            type="button"
            onClick={handleCancel}
            data-testid="cancel-payment-button"
          >
            <p className="text">Cancelar</p>
          </button>

          <button
            className="confirm"
            type="submit"
            data-testid="register-payment-button"
          >
            <p className="text">Salvar</p>
          </button>
        </div>
      </Form>
    </Modal>
  );
};
