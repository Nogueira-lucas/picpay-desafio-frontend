import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useCallback,
  HTMLInputTypeAttribute,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { FiAlertCircle } from 'react-icons/fi';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useField } from '@unform/core';

import { Container, Error } from './styles';
import {
  cep,
  currency,
  cpf,
  cnpj,
  phone,
  number,
  dateMask,
  toUpper,
} from './masks';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  containerStyle?: object;
  showPasswordViewButton?: boolean;
  type?: HTMLInputTypeAttribute | undefined;
  mask?:
    | 'cep'
    | 'currency'
    | 'number'
    | 'cpf'
    | 'cnpj'
    | 'phone'
    | 'date'
    | 'toUpper';
  prefix?: string;
  icon?: React.ComponentType<IconBaseProps>;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  showPasswordViewButton,
  type,
  mask,
  icon: Icon,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { fieldName, defaultValue, error, registerField, clearError } =
    useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  const handleKeyUp = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (mask === 'cep') {
        cep(e);
      }

      if (mask === 'currency') {
        currency(e);
      }

      if (mask === 'number') {
        number(e);
      }

      if (mask === 'cpf') {
        cpf(e);
      }

      if (mask === 'cnpj') {
        cnpj(e);
      }

      if (mask === 'phone') {
        phone(e);
      }

      if (mask === 'date') {
        dateMask(e);
      }

      if (mask === 'toUpper') {
        toUpper(e);
      }
    },
    [mask],
  );

  const togglePassword = useCallback(() => {
    setPasswordShown(!passwordShown);
  }, [passwordShown]);

  const handleInput = useCallback(() => {
    clearError();
  }, []);

  return (
    <Container
      style={containerStyle}
      isErrored={!!error}
      isFilled={isFilled}
      isFocused={isFocused}
      data-testid="input-container"
    >
      {Icon && <Icon size={20} />}
      <input
        type={passwordShown ? 'text' : type}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        onKeyUp={handleKeyUp}
        onChange={handleInput}
        {...rest}
      />
      {error && (
        <Error className="logoErrorInput" title={error}>
          <FiAlertCircle color="#c53030" size={20} />
        </Error>
      )}
      {showPasswordViewButton && !error && (
        <button className="showPassword" type="button" onClick={togglePassword}>
          {passwordShown ? (
            <AiFillEyeInvisible size={20} />
          ) : (
            <AiFillEye size={20} />
          )}
        </button>
      )}
    </Container>
  );
};

export default Input;
