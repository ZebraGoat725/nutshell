// Authors: Billy Mathison
// Page contains an object with one function to clear all sections and then build all sections

import friendEventHandler from "./../friendScripts/friendEventHandler"
import task from "../taskScripts/task"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML"
import articleSection from "../articleScripts/article"
import apiCall from "../articleScripts/articleApi"
import buildNavbar from "./../buildNavbar"
import friendChatApi from "./../chatScripts/chatApiManager"
import parseFriends from "./../chatScripts/friends"
import chatMsg from "./../chatScripts/appendChat"
import clearSections from "./../clearSections"

const loadPage = {
    load() {
        let userID = sessionStorage.getItem("userID");
        clearSections.clearAllSections()

        // call to load the chat messages section to the DOM
        friendChatApi.getFriends(userID).then(response => parseFriends.getFriendId(response)).then(friendChatApi.getMessages().then(msgArray => chatMsg.buildMainMsg(msgArray)))

        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()

        // Calling function to build navbar
        buildNavbar.buildList();

        let taskContainer = document.querySelector("#tasks-section")
        taskContainer.appendChild(task.createTask())
        
        return eventsData.getEvents(userID).then(response => {
            return eventHTML.listEventsToDom(response)
        }).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        })).then(() => apiCall.getArticles(userID)).then(r =>{
            return articleSection.listArticles(r)
        }).then(() => apiCall.getFriendArticles(userID)).then(r =>{
            r.forEach(article => {
                apiCall.getArticles(article).then(r => {
            articleSection.listArticles(r)
        })
            });
        })
    }
}

export default loadPage