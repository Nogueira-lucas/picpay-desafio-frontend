import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { FiMail, FiLock } from 'react-icons/fi';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { getValidationErrors } from '../../utils/getValidationErrors';

import { Container, Content, Background, AnimationContainer } from './styles';

interface SingInFormData {
  email: string;
  password: string;
}

export const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { addToast } = useToast();
  const { signIn } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SingInFormData) => {
      try {
        formRef.current?.setErrors({});
        setIsLoading(true);

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha é obrigatória'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/tasks');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro na autenticação verifique as credenciais',
        });
      }
    },
    [signIn, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
              showPasswordViewButton
            />

            <Button type="submit" loading={isLoading} text_loading="Aguarde...">
              Entrar
            </Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};
