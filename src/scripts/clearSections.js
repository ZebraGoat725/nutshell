const loginContainer = document.querySelector("#login-section");
const friendsContainer = document.querySelector("#friends-section");
const articlesContainer = document.querySelector("#articles-section");
const eventsContainer = document.querySelector("#events-section");
const tasksContainer = document.querySelector("#tasks-section");
const messagesContainer = document.querySelector("#messages-section");
const navbar = document.querySelector("#main-nav");

const clearSection = {
    clearNav() {
        HTMLFactory.clearContainer(navbar);
    },
    clearFriends() {
        HTMLFactory.clearContainer(friendsContainer);
    },
    clearEvents() {
        HTMLFactory.clearContainer(eventsContainer);
    },
    clearTasks() {
        HTMLFactory.clearContainer(tasksContainer);
    },
    clearArticles() {
        HTMLFactory.clearContainer(articlesContainer);
    },
    clearMessages() {
        HTMLFactory.clearContainer(messagesContainer);
    },
    clearLogin() {
        HTMLFactory.clearContainer(loginContainer);
    }
};

export default clearSection