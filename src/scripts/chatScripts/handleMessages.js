// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";
import HTMLfactory from "../HTMLFactory"
import chatMsg from "./appendChat"
import chatBuild from "./chatForm"

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
                console.log("helllllo")
                chatMsg.buildMainMsg(msgArray)
                chatMsg.buildEditAndDelete(msgArray)
            })
        })
    },
    handlerEditChatButton: () => {
        // make a put request
        console.log(event.target.parentNode.id.split("--")[1])
        const parentId = event.target.parentNode.id.split("--")[1];
        const updateDiv = document.querySelector(`#msg-block--${parentId}`)
        console.log(document.querySelector(`#msg-number--${parentId}`).textContent)
        const valueToBeUpdated = document.querySelector(`#msg-number--${parentId}`).textContent;
        HTMLfactory.clearContainer(updateDiv);
    
        const updateInput = chatBuild.buildChatElements("input", undefined,`msg-update--${parentId}`, undefined);
        updateInput.type = "text"
        updateInput.value = valueToBeUpdated;
    
        const saveButton = chatBuild.buildChatElements("button", "btn btn-primary", `save-msg--${parentId}`, "Update")
        saveButton.addEventListener("click",chatHandlers.handleSaveButton);
        updateDiv.appendChild(updateInput);
        updateDiv.appendChild(saveButton);
    },
    handlerDeleteChatButton: () => {
        // make a delete request
        console.log(event.target.parentNode.id.split("--")[1])
    },
    handleSaveButton: () => {
        console.log(event.target.parentNode.id)
    }
}
export default chatHandlers