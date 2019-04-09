// Author: Billy Mathison
// Page contains an object with one function to build the navBar

import HTMLFactory from "./HTMLFactory"
import loginForm from "./loginScripts/loginForm"
import clearSection from "./clearSections"
import sectionVisibility from "./sectionVisibility"

const container = document.querySelector("#login-section");
const friendsContainer = document.querySelector("#friends-section");
const articlesContainer = document.querySelector("#articles-section");
const eventsContainer = document.querySelector("#events-section");
const tasksContainer = document.querySelector("#tasks-section");
const messagesContainer = document.querySelector("#messages-section");
const navbar = document.getElementById("main-nav");

const buildNavbar = {
    // Function to build NavBar including links to sections and log out button
    buildList() {
        let userName = sessionStorage.getItem("userName")
        const sectionList = HTMLFactory.createElementWithText("ul");
        const taskLi = HTMLFactory.createLiEl("TASKS");
        taskLi.addEventListener("click", () => {
            sectionVisibility.hideAllSections();
            tasksContainer.style.display = "block";
        })
        sectionList.appendChild(taskLi);
        const eventsLi = HTMLFactory.createLiEl("EVENTS");
        eventsLi.addEventListener("click", () => {
            sectionVisibility.hideAllSections();
            eventsContainer.style.display = "block";
        })
        sectionList.appendChild(eventsLi);
        const friendsLi = HTMLFactory.createLiEl("FRIENDS");
        friendsLi.addEventListener("click", () => {
            sectionVisibility.hideAllSections();
            friendsContainer.style.display = "block";
        })
        sectionList.appendChild(friendsLi);
        const messagesLi = HTMLFactory.createLiEl("MESSAGES");
        messagesLi.addEventListener("click", () => {
            sectionVisibility.hideAllSections();
            messagesContainer.style.display = "block";
        })
        sectionList.appendChild(messagesLi);
        const articlesLi = HTMLFactory.createLiEl("ARTICLES");
        articlesLi.addEventListener("click", () => {
            sectionVisibility.hideAllSections();
            articlesContainer.style.display = "block";
        })
        sectionList.appendChild(articlesLi);
        const showAll = HTMLFactory.createLiEl("SHOW ALL");
        showAll.addEventListener("click", () => {
            sectionVisibility.showAllSections();
        })
        sectionList.appendChild(showAll);
        let welcomeName = (HTMLFactory.createElementWithText("li", userName, "user-name"));
        sectionList.appendChild(welcomeName);
        let logoutButton = (HTMLFactory.createElementWithText("button", "Log Out", "logout-button"));
        logoutButton.addEventListener("click", () => {
            sessionStorage.clear();
            clearSection.clearAllSections();
            container.appendChild(loginForm.createLoginForm());
        })
        sectionList.appendChild(logoutButton);
        navbar.appendChild(sectionList);
    }
};

export default buildNavbar