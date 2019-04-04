import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler";
import loginForm from "./loginScripts/loginForm";
import buildFriendsSection from "./friendScripts/buildFriendsSection";
import appendFriendsSection from "./friendScripts/appendFriendsSection";

const container = document.querySelector("#login-section")

container.appendChild(loginForm.createLoginForm())