import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { api } from '../../services/api';

import { useToast } from '../../hooks/toast';

import { getValidationErrors } from '../../utils/getValidationErrors';

import defaultAvatar from '../../assets/user.svg';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Content, AvatarInput, PlanContainer } from './styles';
import { useAuth } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

export const Account: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();
  const { account, updateAccount } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        setIsLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome Perfil obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val: any) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val: any) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const { name, email, old_password, password } = data;

        const formData = {
          ...account,
          name,
          email,
          ...(old_password
            ? {
                password,
              }
            : {}),
        };

        const response = await api.put(`/account/${formData.id}`, formData);

        updateAccount(response.data);

        history.push('/tasks');

        addToast({
          type: 'success',
          title: 'Perfil atualizado!',
          description:
            'Suas informações do perfil foram atualizadas com sucesso!',
        });
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
          title: 'Erro no atualização',
          description: 'Ocorreu um erro ao fazer atualização',
        });
      }
    },
    [addToast, history, updateAccount, account],
  );

  const handleAvatarChange = useCallback(() => {
    console.log('Implement storage strategy to change avatar');
  }, []);

  return (
    <Container>
      <header>
        <div>
          <Link to="/tasks">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: account.name,
            email: account.email,
          }}
          onSubmit={handleSubmit}
        >
          <AvatarInput>
            <img src={account.avatar_url || defaultAvatar} alt={account.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Dados da conta</h1>

          <Input name="name" icon={FiUser} placeholder="Nome Perfil" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            icon={FiLock}
            type="password"
            placeholder="Senha atual"
          />

          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
          />

          <Input
            name="password_confirmation"
            icon={FiLock}
            type="password"
            placeholder="Confirmar Senha"
          />

          <Button type="submit" loading={isLoading}>
            Confirmar mudanças
          </Button>
        </Form>

        <PlanContainer>
          <h3>Seu Plano</h3>

          <section>
            <div className="planCard">
              <div className="planHeader">
                <span>Free</span>
              </div>
              <div className="cardBody">
                <p>Plano gratuito</p>
              </div>
            </div>
          </section>
        </PlanContainer>
      </Content>
    </Container>
  );
};
