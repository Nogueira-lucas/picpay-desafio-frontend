import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import { TailSpin } from 'react-loader-spinner';

import { Container } from './styles';

interface IModalProps {
  width?: string;
  isOpen: boolean;
  message?: string;
  // setIsOpen?: () => void;
}

export const LoadingModal: React.FC<IModalProps> = ({
  width,
  isOpen,
  message,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={false}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          padding: '0',
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: 'transparent',
          color: '#000000',
          borderRadius: '8px',
          width: width || 'auto',
          border: 'none',
          overflow: 'unset',
        },
        overlay: {
          backgroundColor: '#12121499',
          zIndex: 2,
        },
      }}
    >
      <Container>
        <p>{message || ''}</p>
        <TailSpin color="#00BFFF" height={80} width={80} />
      </Container>
    </ReactModal>
  );
};
