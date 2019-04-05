import HTMLFactory from "./../HTMLFactory"
import registerForm from "./registerForm"
import API from "./../apiManager.js"
import eventHTML from "../eventScripts/eventHTML"
import eventsData from "../eventScripts/eventsDataManager"

//createNewUserObj is meant to be a factory function that is used by the post new user method.
const createNewUserObj = (userName, userEmail) => {
    return {
        userName: userName,
        userEmail: userEmail
    }
}

const loginHandler = {
    // Function to handle user clicking login button. Function clears page and loads dashboard
    login() {
        const userName = document.getElementById("userNameInput").value.toLowerCase();
        const userEmail = document.getElementById("emailInput").value.toLowerCase();
        API.getUsers().then(users => {
            users.forEach(user => {
                if (userName === user.userName.toLowerCase() && userEmail === user.email.toLowerCase()) {
                    sessionStorage.setItem("userID", user.id)
                }
            })
        }).then(() => {
            let userID = sessionStorage.getItem("userID");
        const section = document.querySelector("#login-section");
        HTMLFactory.clearContainer(section);
        eventsData.getEvents(userID).then(response => eventHTML.listEventsToDom(response)).then(() => eventsData.getFriendEvents(userID)).then(response => eventHTML.listEventsToDom(response));
        });
    },
    // Function to handle user clicking register button. Function clears page, calls registerForm and appends to registerSection and then appends to body
    register() {
        const section = document.querySelector("#login-section");
        HTMLFactory.clearContainer(section);
        section.appendChild(registerForm.buildRegisterForm());
    },
    // Submit function creates an object with the user input and posts the new object into the database.
    submit() {
        const section = document.querySelector("#login-section");
        const newNameInput = document.querySelector("#registerName-input").value;
        const newEmailInput = document.querySelector("#registerEmail-input").value;
        API.postCreateUser(createNewUserObj(newNameInput, newEmailInput));
        HTMLFactory.clearContainer(section);
    }
};

export default loginHandler