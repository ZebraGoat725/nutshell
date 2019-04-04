import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"

const container = document.querySelector("#login-section")

container.appendChild(loginForm.createLoginForm())


let data = sessionStorage.getItem("string")
console.log(data)

