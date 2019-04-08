import friendEventHandler from "./../friendScripts/friendEventHandler"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML";
import articleSection from "../articleScripts/article"
import apiCall from "../articleScripts/articleApi"



const loadPage = {
    load() {
        
        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
        let userID = Number(sessionStorage.getItem("userID"));
        return eventsData.getEvents(userID).then(response => {
            return eventHTML.listEventsToDom(response)
        }).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        })).then(() => apiCall.getArticles(userID)).then(r =>{
            return articleSection.listArticles(r)
        }).then(() => apiCall.getFriendArticles(userID)).then(r =>{
            return apiCall.getArticles(r)
        }).then(r => {
            articleSection.listArticles(r)
        })
    }
}

export default loadPage