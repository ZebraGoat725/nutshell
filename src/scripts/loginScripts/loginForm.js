import HTMLFactory from "../HTMLFactory"
import loginHandler from "./loginHandler"

const loginForm = {
    createLoginForm() {
        //first document fragment
        let loginFragment = document.createDocumentFragment();

        //create elements for login form
        let outerLoginDiv = HTMLFactory.createElementWithText("div", "", "outerLoginDiv")

        let welcomeHeader = HTMLFactory.createElementWithText("h1", "Welcome yo!!!!")

        let formElement = HTMLFactory.createElementWithText("form", "")

        let loginDiv = HTMLFactory.createElementWithText("div", "")

        let userNameLabel = HTMLFactory.createElementWithText("label", "Username: ")

        let userNameInput = HTMLFactory.createElementWithText("input", "", "userNameInput")

        userNameInput.placeholder = "Username"

        let emailDiv = HTMLFactory.createElementWithText("div", "")

        let emailLabel = HTMLFactory.createElementWithText("label", "Email: ")

        let emailInput = HTMLFactory.createElementWithText("input", "", "emailInput")

        emailInput.placeholder = "example@example.com"

        //create login and register button
        let loginButton = HTMLFactory.createElementWithText("button", "Login", "loginButton")

        loginButton.type = "button"

        let registerButton = HTMLFactory.createElementWithText("button", "Register", "registerButton")

        registerButton.type = "button"

        loginButton.addEventListener("click", loginHandler.login)

        registerButton.addEventListener("click", loginHandler.register)

        //append elements
        loginDiv.appendChild(userNameLabel)
        loginDiv.appendChild(userNameInput)
        emailDiv.appendChild(emailLabel)
        emailDiv.appendChild(emailInput)
        formElement.appendChild(loginDiv)
        formElement.appendChild(emailDiv)
        formElement.appendChild(loginButton)
        formElement.appendChild(registerButton)
        outerLoginDiv.appendChild(welcomeHeader)
        outerLoginDiv.appendChild(formElement)
        loginFragment.appendChild(outerLoginDiv)


        return loginFragment

    }
}


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