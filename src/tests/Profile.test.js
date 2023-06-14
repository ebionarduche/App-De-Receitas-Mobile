import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../pages/Profile';

describe('testando a página Profile', () => {
  it('renderiza o componente Profile corretamente', () => {
    render(
      <Router>
        <Profile />
      </Router>,
    );

    expect(screen.getByText('Profile')).toBeInTheDocument();

    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('navega para a página de receitas concluídas ao clicar no botão Done Recipes', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('profile-done-btn'));

    expect(historyMock.push).toHaveBeenCalledWith('/done-recipes');
  });

  it('exibe o email do usuário se estiver presente no localStorage', () => {
    const email = 'email@example.com';
    localStorage.setItem('user', JSON.stringify({ email }));

    render(
      <Router>
        <Profile />
      </Router>,
    );

    expect(screen.getByText(email)).toBeInTheDocument();
  });

  it('navega para a página de receitas favoritas ao clicar no botão Favorite Recipes', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('profile-favorite-btn'));

    expect(historyMock.push).toHaveBeenCalledWith('/done-favorites');
  });

  it('navega para a página de login ao clicar no botão Logout', () => {
    const historyMock = { push: jest.fn() };
    render(
      <Router>
        <Profile />
      </Router>,
    );

    fireEvent.click(screen.getByTestId('profile-logout-btn'));

    expect(historyMock.push).toHaveBeenCalledWith('/');
  });
});
