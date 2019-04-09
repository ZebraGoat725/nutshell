// Author: Billy Mathison
// Page contains an object with functions to clear each section and a function to clear all sections

import HTMLFactory from "./HTMLFactory"

const loginContainer = document.querySelector("#login-section");
const friendsContainer = document.querySelector("#friends-section");
const articlesContainer = document.querySelector("#articles-section");
const eventsContainer = document.querySelector("#events-section");
const tasksContainer = document.querySelector("#tasks-section");
const messagesContainer = document.querySelector("#messages-section");
const navbar = document.querySelector("#main-nav");

const clearSection = {
    // Function to clear out Nav section
    clearNav() {
        HTMLFactory.clearContainer(navbar);
    },
    // Function to clear out Friends section
    clearFriends() {
        HTMLFactory.clearContainer(friendsContainer);
    },
    // Function to clear out Events section
    clearEvents() {
        HTMLFactory.clearContainer(eventsContainer);
    },
    // Function to clear out Tasks section
    clearTasks() {
        HTMLFactory.clearContainer(tasksContainer);
    },
    // Function to clear out Articles section
    clearArticles() {
        HTMLFactory.clearContainer(articlesContainer);
    },
    // Function to clear out Mesages section
    clearMessages() {
        HTMLFactory.clearContainer(messagesContainer);
    },
    // Function to clear out Login section
    clearLogin() {
        HTMLFactory.clearContainer(loginContainer);
    },
    // Function to clear all sections
    clearAllSections() {
        HTMLFactory.clearContainer(navbar);
        HTMLFactory.clearContainer(friendsContainer);
        HTMLFactory.clearContainer(eventsContainer);
        HTMLFactory.clearContainer(tasksContainer);
        HTMLFactory.clearContainer(articlesContainer);
        HTMLFactory.clearContainer(messagesContainer);
        HTMLFactory.clearContainer(loginContainer);
    }
};

export default clearSection