import HTMLFactory from "./../HTMLFactory";

const registerForm = {
    buildRegisterForm: () => {
        const registerFormFrag = document.createDocumentFragment();
        const registerCard = registerFormFrag.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerCard"));
        const registerTitle = registerCard.appendChild(HTMLFactory.createElementWithText("h1", "Register Your New Profile"));
        const registerForm = registerCard.appendChild(HTMLFactory.createElementWithText("form", undefined, "registerForm"));
        const userNameDiv = registerForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerName-container"));
        const registerUserNameLabel = userNameDiv.appendChild(HTMLFactory.createElementWithText("label", "Enter a Username: "));
        const registerUserNameInput = userNameDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "registerName-input"));
        const registerEmailDiv = registerForm.appendChild(HTMLFactory.createElementWithText("div", undefined, "registerEmail-container"));
        const registerEmailLabel = registerEmailDiv.appendChild(HTMLFactory.createElementWithText("label", "Enter your Email: "));
        const registerEmailInput = registerEmailDiv.appendChild(HTMLFactory.createElementWithText("input", undefined, "registerEmail-input"));
        const registerButton = registerForm.appendChild(HTMLFactory.createElementWithText("button", "Submit", "register-button"));
        registerFormFrag.appendChild(registerCard);

        return registerFormFrag;
    
    }
}

export default registerForm;