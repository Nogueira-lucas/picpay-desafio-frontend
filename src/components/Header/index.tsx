import React from 'react';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <Container>
      <div className="logo">
        <span className='detail'>Pay</span>
        <span>Friends</span>
      </div>
      
      <div className="profile">
        <img src="https://avatars.githubusercontent.com/u/29052049?v=4" alt="User Logo" />
      </div>
    </Container>
  );
}

export default Header;