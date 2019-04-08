import HTMLFactory from "./HTMLFactory";
import registerForm from "./loginScripts/registerForm";
import loginHandler from "./loginScripts/loginHandler"
import loginForm from "./loginScripts/loginForm"
import api from "./apiManager"
import articleSection from "./articleScripts/article"
import apiCall from "../scripts/articleScripts/articleApi"

const container = document.querySelector("#login-section")
<<<<<<< HEAD
const articleContainer = document.querySelector("#articles-section")

container.appendChild(loginForm.createLoginForm())
articleContainer.appendChild(articleSection.buildArticle())
articleSection.buildArticleWithObj()
=======
container.appendChild(loginForm.createLoginForm())
>>>>>>> master
