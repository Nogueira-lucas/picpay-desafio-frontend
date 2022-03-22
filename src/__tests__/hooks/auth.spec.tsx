import { renderHook, act } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';
import { AuthProvider, useAuth } from '../../hooks/auth';
import { api } from '../../services/api';

const apiMock = new MockAdapter(api);

describe('Auth hook', () => {
  it('Should be able to sign in', async () => {
    const apiResponse = [
      {
        id: 1,
        name: 'John',
        email: 'johndoe@example.com',
      },
    ];

    apiMock.onGet('account').reply(200, apiResponse);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'johndoe@example.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(setItemSpy).toHaveBeenCalledWith(
      '@payfriends:account',
      JSON.stringify(apiResponse[0]),
    );
    expect(result.current.account.email).toEqual('johndoe@example.com');
  });

  it('Should restore saved data from storage when auth inits', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      return key === '@payfriends:account'
        ? JSON.stringify({
            id: 1,
            name: 'John',
            email: 'johndoe@example.com',
          })
        : null;
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(result.current.account.email).toEqual('johndoe@example.com');
  });

  it('Should be able to sign out', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      return key === '@payfriends:account'
        ? JSON.stringify({
            id: 1,
            name: 'John',
            email: 'johndoe@example.com',
          })
        : null;
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalled();
    expect(result.current.account).toBeUndefined();
  });

  it('Should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    const account = {
      id: 1,
      name: 'John',
      email: 'johndoe@example.com',
      avatar_url: 'http://avatar.image.com',
    };

    act(() => {
      result.current.updateAccount(account);
    });

    expect(setItemSpy).toHaveBeenCalledWith(
      '@payfriends:account',
      JSON.stringify(account),
    );

    expect(result.current.account).toEqual(account);
  });
});
