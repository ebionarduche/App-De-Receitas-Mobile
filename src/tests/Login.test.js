import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouter } from './renderWith';
import App from '../App';

describe('Testando a renderização na tela', () => {
  it('testando email, passaword e button', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('testando rota após clicar no button', () => {
    const { history } = renderWithRouter(<App />);
    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'trybee@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(button).toBeEnabled();

    userEvent.click(button);
    expect(history.location.pathname).toBe('/meals');
  });
});
