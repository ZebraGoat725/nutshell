import HTMLFactory from "./../HTMLFactory";
import API from "../apiManager";
import loginHandler from "./loginHandler"
import loginForm from "./loginForm"

//The buildRegisterForm function creates a document fragment that contains the HTML buildup for the registration form. The structure is div > h1 > form > div > label > input > /div > /form > /div

const registerForm = {
    buildRegisterForm: () => {
        const registerFormFrag = document.createDocumentFragment();
        const registerCard = registerFormFrag.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerCard"));
        registerCard.classList.add("card");
        const registerTitle = registerCard.appendChild(HTMLFactory.createElementWithText("h1", "Register Your New Profile"));
        registerTitle.classList.add("card-header");
        const formContainer = registerCard.appendChild(HTMLFactory.createElementWithText("div"));
        formContainer.classList.add("card-body");
        formContainer.classList.add("bg-light");
        const registerForm = formContainer.appendChild(HTMLFactory.createElementWithText("form", undefined, "registerForm"));
        const userNameDiv = registerForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerName-container"));
        userNameDiv.classList.add("form-group")
        const registerUserNameLabel = userNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Enter a Username: "));
        const registerUserNameInput = userNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "registerName-input"));
        registerUserNameInput.placeholder = "Username";
        registerUserNameInput.classList.add("form-control");
        const registerEmailDiv = registerForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerEmail-container"));
        registerEmailDiv.classList.add("form-group");
        const registerEmailLabel = registerEmailDiv.appendChild(HTMLFactory.createElementWithText("label", "Enter your Email: "));
        const registerEmailInput = registerEmailDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "registerEmail-input"));
        registerEmailInput.placeholder = "example@example.com";
        registerEmailInput.classList.add("form-control");
        const registerButtonGroup = registerForm.appendChild(HTMLFactory.createElementWithText("div"));
        registerButtonGroup.classList.add("btn-group");
        const registerButton = registerButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Submit", "register-button"));
        registerButton.setAttribute("type", "button");
        registerButton.classList.add("btn");
        registerButton.classList.add("btn-primary");
        registerButton.addEventListener("click", loginHandler.submit)
        const backButton = registerButtonGroup.appendChild(HTMLFactory.createElementWithText("button", "Cancel", "registerForm-cancelButton"));
        backButton.setAttribute("type", "button");
        backButton.classList.add("btn");
        backButton.classList.add("btn-danger");
        backButton.addEventListener("click", function(){
            const container = document.querySelector("#login-section");
            HTMLFactory.clearContainer(container);
            container.appendChild(loginForm.createLoginForm());
        })
        registerFormFrag.appendChild(registerCard);

        return registerFormFrag;
    
    }
}

export default registerForm;