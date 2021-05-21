/* eslint-disable */
import '@babel/polyfill';
import { login, logout } from './login';

const loginForm = document.getElementById('login');
const logOutBtn = document.getElementById('logout');

loginForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  login(email, password);
});

if(logOutBtn) logOutBtn.addEventListener('click', logout)