import HTMLFactory from "../HTMLFactory"
import loginHandler from "./loginHandler"

const loginForm = {
    createLoginForm() {
        //first document fragment
        let loginFragment = document.createDocumentFragment();

        //create elements for login form
        let outerLoginDiv = HTMLFactory.createElementWithText("div", "", "outerLoginDiv")
        outerLoginDiv.classList.add("card");
        let welcomeHeader = outerLoginDiv.appendChild(HTMLFactory.createElementWithText("h1", "Welcome to Nutshell!"))
        welcomeHeader.classList.add("card-header");
        let loginBody = outerLoginDiv.appendChild(HTMLFactory.createElementWithText("div"));
        loginBody.classList.add("card-body");
        loginBody.classList.add("bg-light")
        let formElement = loginBody.appendChild(HTMLFactory.createElementWithText("form"))
        let loginDiv = formElement.appendChild(HTMLFactory.createElementWithText("div"));
        loginDiv.classList.add("form-group")
        let userNameLabel = HTMLFactory.createElementWithText("label", "Username: ")

        let userNameInput = HTMLFactory.createElementWithText("input", "", "userNameInput")
        userNameInput.classList.add("form-control")
        userNameInput.placeholder = "Username"

        let emailDiv = formElement.appendChild(HTMLFactory.createElementWithText("div", ""))
        emailDiv.classList.add("form-group");
        let emailLabel = HTMLFactory.createElementWithText("label", "Email: ")

        let emailInput = HTMLFactory.createElementWithText("input", "", "emailInput")
        emailInput.classList.add("form-control");
        emailInput.placeholder = "example@example.com"

        //create login and register button
        let loginButtonGroup = formElement.appendChild(HTMLFactory.createElementWithText("div"))
        loginButtonGroup.classList.add("btn-group")
        let loginButton = loginButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Login", "loginButton"))
        loginButton.classList.add("btn");
        loginButton.classList.add("btn-primary")
        loginButton.type = "button"

        let registerButton = loginButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Register", "registerButton"))
        registerButton.classList.add("btn");
        registerButton.classList.add("btn-secondary")
        registerButton.type = "button"

        loginButton.addEventListener("click", loginHandler.login)

        registerButton.addEventListener("click", loginHandler.register)

        //append elements
        loginDiv.appendChild(userNameLabel)
        loginDiv.appendChild(userNameInput)
        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(emailInput)
        loginFragment.appendChild(outerLoginDiv)


        return loginFragment

    }
}

// let data = sessionStorage.getItem("JonS")
// console.log(data)

export default loginForm
/* <div>
    <form>
        <div>
            <label></label>
            <input></input>
        </div>
        <div>
            <label></label>
            <input></input>
        </div>
    </form>
</div> */