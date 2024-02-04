import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

import LoginScreen from '../screens/LoginScreen';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: jest.fn(),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    useNavigation.mockReturnValue({ replace: jest.fn() });
  });

  test('handleSignUp should create a new user', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('  Email');
    const passwordInput = getByPlaceholderText('  Password');
    const registerButton = getByText('Register');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(registerButton);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });

  test('handleSignIn should sign in the user', () => {
    const email = 'test@example.com';
    const password = 'password123';

    const { getByPlaceholderText, getByText } = render(<LoginScreen />);

    const emailInput = getByPlaceholderText('  Email');
    const passwordInput = getByPlaceholderText('  Password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, email);
    fireEvent.changeText(passwordInput, password);
    fireEvent.press(loginButton);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });
});