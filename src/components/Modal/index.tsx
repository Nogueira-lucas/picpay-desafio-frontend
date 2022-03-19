import React, { useState, useEffect } from 'react';

import ReactModal from 'react-modal';

interface IModalProps {
  width?: string;
  height?: string;
  background?: string;
  children: any;
  isOpen: boolean;
  shouldCloseOnOverlayClick?: boolean;
  setIsOpen: () => void;
}

const Modal: React.FC<IModalProps> = ({
  width,
  height,
  background,
  children,
  isOpen,
  shouldCloseOnOverlayClick,
  setIsOpen,
}) => {
  const [modalStatus, setModalStatus] = useState(isOpen);

  useEffect(() => {
    setModalStatus(isOpen);
  }, [isOpen]);

  return (
    <ReactModal
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={setIsOpen}
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
          background: background || '#F0F0F5',
          color: '#000000',
          borderRadius: '5px',
          width: width || '736px',
          height: height || '395px',
          border: 'none',
          overflow: 'unset',
        },
        overlay: {
          backgroundColor: '#12121499',
          zIndex: '2',
        },
      }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
