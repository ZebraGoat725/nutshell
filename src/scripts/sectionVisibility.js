const friendsContainer = document.querySelector("#friends-section");
const articlesContainer = document.querySelector("#articles-section");
const eventsContainer = document.querySelector("#events-section");
const tasksContainer = document.querySelector("#tasks-section");
const messagesContainer = document.querySelector("#messages-section");

const sectionVisibility = {
    // Function to hide all sections
    hideAllSections() {
        friendsContainer.style.display = "none";
        articlesContainer.style.display = "none";
        eventsContainer.style.display = "none";
        tasksContainer.style.display = "none";
        messagesContainer.style.display = "none";
        friendsContainer.style.display = "none";
    },
    // Function to show all sections
    showAllSections() {
        friendsContainer.style.display = "block";
        articlesContainer.style.display = "block";
        eventsContainer.style.display = "block";
        tasksContainer.style.display = "block";
        messagesContainer.style.display = "block";
        friendsContainer.style.display = "block";
    }
}

export default sectionVisibility