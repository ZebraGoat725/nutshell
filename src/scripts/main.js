import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"
import eventHTML from "./eventScripts/eventHTML"
import API from "./apiManager"

const container = document.querySelector("#login-section")

container.appendChild(loginForm.createLoginForm())

// const eventContainer = document.querySelector("#events-section");
// let userID = sessionStorage.getItem("userID");
// API.getEvents(userID).then(response => eventHTML.listEventsToDom(response));
