/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts.js';
export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully!');
      window.setTimeout(() => {
        // eslint-disable-next-line no-restricted-globals
        location.assign('/index.html');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};
