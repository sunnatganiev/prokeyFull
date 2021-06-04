import "@babel/polyfill";
import { login, logout } from "./login";

const loginForm = document.getElementById("login");
const logOutBtn = document.getElementById("logout");

loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email-input").value;
  const password = document.getElementById("password-input").value;
  login(email, password);
});

logOutBtn?.addEventListener("click", logout);
