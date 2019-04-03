import HTMLFactory from "./../HTMLFactory"
import registerForm from "./registerForm"
import loginForm from "./loginForm"

const loginHandler = {
    // Function to handle user clicking login button. Function clears page and loads dashboard
    login() {
        sessionStorage.setItem("userID", id)
        HTMLFactory.clearContainer("#login-section");
    },
    // Function to handle user clicking register button. Function clears page, calls registerForm and appends to registerSection and then appends to body
    register() {
        // HTMLFactory.clearContainer("#login-section");
        const body = document.querySelector("body");
        const registerSection = HTMLFactory.createElementWithText("section", undefined, "register-section");
        registerSection.appendChild(registerForm.buildRegisterForm());
        body.appendChild(registerSection);
    }
};

export default loginHandler