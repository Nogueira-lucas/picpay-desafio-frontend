import React, { useCallback } from 'react';
import { FaAngleDown, FaPowerOff, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { OutSideClick } from '../../hooks/outSideClick';

import { Container, DropdownMenu, DropdownMenuContent } from './styles';

const Header: React.FC = () => {
  const { account, signOut } = useAuth();
  const { visible, setVisible, ref } = OutSideClick(false);

  const handleClickButton = useCallback(() => {
    setVisible(prevState => !prevState);
  }, [setVisible]);

  return (
    <Container>
      <div className="logo">
        <span className="detail">Pay</span>
        <span>Friends</span>
      </div>

      <DropdownMenu ref={ref}>
        <button
          className="dropAccountInfo"
          type="button"
          onClick={handleClickButton}
        >
          <img
            src="https://avatars.githubusercontent.com/u/29052049?v=4"
            alt="User Logo"
          />
          <span>{account.name}</span>
          <FaAngleDown className="open-drop" />

          <DropdownMenuContent isVisible={visible}>
            <Link to="/account">
              <FaUser className="drop" />
              <span>Conta</span>
            </Link>
            <Link to="/" onClick={signOut}>
              <FaPowerOff className="drop" />
              <span>Sair</span>
            </Link>
          </DropdownMenuContent>
        </button>
      </DropdownMenu>
    </Container>
  );
};

export default Header;
