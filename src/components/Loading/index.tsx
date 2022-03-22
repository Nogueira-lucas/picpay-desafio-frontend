import React from 'react';

import { Puff } from 'react-loader-spinner';

import { Container } from './styles';

export const Loading: React.FC = () => {
  return (
    <Container>
      <Puff color="#007dfe" height={100} width={40} />
    </Container>
  );
};
