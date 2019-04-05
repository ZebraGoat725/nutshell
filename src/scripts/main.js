<<<<<<< HEAD
import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"
import api from "./apiManager"

const container = document.querySelector("#login-section")

=======
import loginForm from "./loginScripts/loginForm";

const container = document.querySelector("#login-section")
>>>>>>> master
container.appendChild(loginForm.createLoginForm())
