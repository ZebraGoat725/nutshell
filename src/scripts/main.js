import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"

console.log(HTMLFactory.createElementWithText("h1", "test", "test"));
loginHandler.register()

