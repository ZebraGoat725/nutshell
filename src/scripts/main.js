import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"
import eventHTML from "./eventScripts/eventHTML"
import eventsData from "./eventScripts/eventsDataManager"

const container = document.querySelector("#login-section")

container.appendChild(loginForm.createLoginForm())

// const eventContainer = document.querySelector("#events-section");
// let userID = sessionStorage.getItem("userID");
// API.getEvents(userID).then(response => eventHTML.listEventsToDom(response));

let userID = sessionStorage.getItem("userID");
console.log(eventsData.getFriendEvents(userID));
