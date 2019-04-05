// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";

// this is a factory function that will create the obj that will create the message to be posted in the db
const createNewMsg = (userId, msg) => {
   return {
    userId: userId,
    message: msg
   }
}

const chatHandlers = {
    handlerChatSendButton: () => {
        // this is a function that will handle the save button, it will call the factory function above
        // called createNewMsg and return a newMsg then the handler will pass that to the chatApi post fetch call
        let userId = Number(sessionStorage.getItem("userID"));
        console.log(userId)
        console.log("button pressed")
        console.log(document.querySelector("#user-message").value);
        const userMessage = document.querySelector("#user-message").value;

        let newMsg = createNewMsg(userId, userMessage)
        chatApi.postCreateMessage(newMsg)
    },
    handlerChatAddFriend: () => {
        let userId = Number(sessionStorage.getItem("userID"));
        const friendId = event.target.parentNode.id.split("--")[1]
        console.log("add friend button")
        console.log("friend's id is", friendId)
        console.log("the current user ",userId)
    }
}

export default chatHandlers