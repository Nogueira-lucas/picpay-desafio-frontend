import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { Container, Content, Background } from './styles';

import Button from '../../components/Button';
import Input from '../../components/Input';

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log('');
  }, []);

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="logo">
            <span className='detailLogo'>Pay</span>
            <span >Friends</span>
          </div>

          <h1>Bem vindo de volta</h1>

          <Input name="email" placeholder="E-mail" />
          
          <Input
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit" loading={isLoading} text_loading="Aguarde...">
            Entrar
          </Button>
        </Form>

      </Content>
      <Background />
    </Container>
  );
}

export default SignIn;