import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FiMail, FiLock } from 'react-icons/fi';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Background } from './styles';
import { useAuth } from '../../hooks/auth';
import { getValidationErrors } from '../../utils/getValidationErrors';

interface SingInFormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        setIsLoading(true);

        await signIn({
          email: data.email,
          password: data.password,
        });

        setIsLoading(false);
        history.push('/tasks');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        setIsLoading(false);
      }
    },
    [signIn, history],
  );

  return (
    <Container>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div className="logo">
            <span className="detailLogo">Pay</span>
            <span>Friends</span>
          </div>

          <h1>Bem vindo de volta</h1>

          <Input
            name="email"
            placeholder="E-mail"
            icon={FiMail}
            containerStyle={{ marginBottom: '8px' }}
          />

          <Input
            name="password"
            type="password"
            placeholder="Senha"
            icon={FiLock}
          />

          <Button type="submit" loading={isLoading} text_loading="Aguarde...">
            Entrar
          </Button>
        </Form>
      </Content>
      <Background />
    </Container>
  );
};
