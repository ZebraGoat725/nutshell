import HTMLFactory from "./../HTMLFactory"
import registerForm from "./registerForm"
import API from "./../apiManager.js"
import chatSection from "./../chatScripts/chatForm";
// import buildMainMsg from "../chatScripts/appendChat";
import chatMsg from "./../chatScripts/appendChat"

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

                    const section = document.querySelector("#login-section");
                    HTMLFactory.clearContainer(section);
                    API.getMessages().then(msgArray => chatMsg.buildMainMsg(msgArray))
                }
            })
        })
        // .then(() =>{
        //     // const section = document.querySelector("#login-section");
        //     // HTMLFactory.clearContainer(section);
        //     // API.getMessages().then(msgArray => chatMsg.buildMainMsg(msgArray))
        // })
        let userID = sessionStorage.getItem("userID");
        // HTMLFactory.clearContainer(section);
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