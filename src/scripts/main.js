import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";

console.log(HTMLFactory.createElementWithText("h1", "test", "test"));

const userSection = document.querySelector("#users-section");
userSection.appendChild(registerForm.buildRegisterForm());