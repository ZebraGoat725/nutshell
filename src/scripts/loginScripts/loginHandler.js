import HTMLFactory from "./../HTMLFactory"
import registerForm from "./registerForm"
import API from "./../apiManager.js"

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
       const userName = document.getElementById("userNameInput").value;
       const userEmail = document.getElementById("emailInput").value;
       API.getUsers();

       sessionStorage.setItem("userID", id)

       const section = document.querySelector("#login-section");
       HTMLFactory.clearContainer(section);
   },
   // Function to handle user clicking register button. Function clears page, calls registerForm and appends to registerSection and then appends to body
   register() {
       const section = document.querySelector("#login-section");
       HTMLFactory.clearContainer(section);
       section.appendChild(registerForm.buildRegisterForm());
   },
   // Submit function creates an object with the user input and posts the new object into the database.
   submit() {
    let newNameInput = document.querySelector("#registerName-input");
    let newEmailInput = document.querySelector("#registerEmail-input");
    API.postCreateUser(createNewUserObj(newNameInput.value, newEmailInput.value));
   }
};

export default loginHandler