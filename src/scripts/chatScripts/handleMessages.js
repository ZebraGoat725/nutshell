// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";
import HTMLfactory from "../HTMLFactory"
// import builderChat from "./appendChat"
import chatMsg from "./appendChat"

// this is a factory functions that will create the objs that will create the messages and
// and the friendships respectively to be posted in the db
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
        const userMessage = document.querySelector("#user-message").value;

        let newMsg = createNewMsg(userId, userMessage) //calling the factory function
        chatApi.postCreateMessage(newMsg).then(()=>{
            // clear the container and see the new messages
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer);
            //go and get new msgs to append on dom
            chatApi.getMessages().then(msgArray => {
                chatMsg.buildMainMsg(msgArray)
            })
        })
        // as soon as this is called, go to the build edit and delete function
        // that will create the buttons on the last msg
        chatMsg.buildEditAndDelete()
    }
}
export default chatHandlers