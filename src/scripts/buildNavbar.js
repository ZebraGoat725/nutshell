import HTMLFactory from "./HTMLFactory"
import loginForm from "./loginScripts/loginForm"
import clearSection from "./clearSections"

const container = document.querySelector("#login-section");
const navbar = document.getElementById("main-nav");

const buildNavbar = {
    buildList() {
        const sectionList = HTMLFactory.createElementWithText("ul");
        sectionList.appendChild(HTMLFactory.createElementWithText("li", "Tasks"));
        sectionList.appendChild(HTMLFactory.createElementWithText("li", "Events"));
        sectionList.appendChild(HTMLFactory.createElementWithText("li", "Friends"));
        sectionList.appendChild(HTMLFactory.createElementWithText("li", "Messages"));
        sectionList.appendChild(HTMLFactory.createElementWithText("li", "Articles"));
        let welcomeName = (HTMLFactory.createElementWithText("li", "Hello, ", "welcome-name"));
        sectionList.appendChild(welcomeName);
        let logoutButton = (HTMLFactory.createElementWithText("button", "Log Out", "logout-button"));
        logoutButton.addEventListener("click", () => {
            sessionStorage.clear();
            clearSection.clearNav();
            clearSection.clearFriends();
            clearSection.clearMessages();
            clearSection.clearArticles();
            clearSection.clearEvents();
            clearSection.clearMessages();            
            container.appendChild(loginForm.createLoginForm());
        })
        sectionList.appendChild(logoutButton);
        navbar.appendChild(sectionList);
    }
};

export default buildNavbar