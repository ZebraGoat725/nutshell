import HTMLFactory from "./HTMLFactory";
import loginForm from "./loginScripts/loginForm"

let container = document.querySelector("#users-section")

container.appendChild(loginForm.createLoginForm())


let data = sessionStorage.getItem("string")
console.log(data)

