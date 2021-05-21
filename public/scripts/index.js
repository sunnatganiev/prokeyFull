/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';

const loginForm = document.getElementById('login');

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});
