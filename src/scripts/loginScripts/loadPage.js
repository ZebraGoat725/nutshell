import friendEventHandler from "./../friendScripts/friendEventHandler"
import eventsData from "../eventScripts/eventsDataManager"
import eventHTML from "../eventScripts/eventHTML";
import friendChatApi from "./../chatScripts/chatApiManager"
import parseFriends from "./../chatScripts/friends"
import chatMsg from "./../chatScripts/appendChat"

const loadPage = {
    load() {
        // call to load the chat messages section to the DOM
        let userID = sessionStorage.getItem("userID");
        friendChatApi.getFriends(userID).then(response => parseFriends.getFriendId(response)).then(friendChatApi.getMessages().then(msgArray => chatMsg.buildMainMsg(msgArray)))

        // Calling function to build friend section of DOM
        friendEventHandler.handleAppendFriend()
        // let userID = sessionStorage.getItem("userID");
        return eventsData.getEvents(userID).then(response => {
            return eventHTML.listEventsToDom(response)
        }).then(() => {
            return eventsData.getFriendEvents(userID)
        }).then(response => response.forEach(user => {
            return eventsData.getEvents(user).then(response => eventHTML.listEventsToDom(response))
        }))
    }
}

export default loadPage