import React, { useCallback } from 'react';
import Modal from '../Modal';

import { Container } from './styles';

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

interface ConfirmModalProps {
  statement?: IStatementsProps;
  title?: string;
  confirmYes?: string;
  confirmNo?: string;
  isOpen: boolean;
  setIsOpen: () => void;
  handleConfirmYes: () => void;
  handleConfirmNo: () => void;
}

export const ModalConfirm: React.FC<ConfirmModalProps> = ({
  statement,
  isOpen,
  setIsOpen,
  title,
  confirmYes,
  confirmNo,
  handleConfirmYes,
  handleConfirmNo,
}) => {
  const handleYes = useCallback(() => {
    handleConfirmYes();
    setIsOpen();
  }, [handleConfirmYes, setIsOpen]);

  const handleNo = useCallback(() => {
    handleConfirmNo();
    setIsOpen();
  }, [handleConfirmNo, setIsOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      width="405px"
      height="325px"
      shouldCloseOnOverlayClick={false}
    >
      <Container>
        <header>
          <h3>{title || 'Action'}</h3>
        </header>
        <main>
          <p>{`Usuário: ${statement?.name}`}</p>
          <p>{`Data: ${statement?.dateFormattedNormal}`}</p>
          <p>{`Valor: ${statement?.valueFormatted}`}</p>
        </main>
        <footer>
          <button className="confirmNo" type="button" onClick={handleNo}>
            {confirmNo || 'No'}
          </button>
          <button className="confirmYes" type="button" onClick={handleYes}>
            {confirmYes || 'Yes'}
          </button>
        </footer>
      </Container>
    </Modal>
  );
};
