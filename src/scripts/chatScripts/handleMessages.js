// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";
import HTMLfactory from "../HTMLFactory"
import chatMsg from "./appendChat"
import chatBuild from "./chatForm"
import friends from "./friends"
import friendships from "./../friendScripts/friendEventHandler"
import load from "./../loginScripts/loadPage"

// this is a factory functions that will create the objs that will create the messages and
// and the friendships respectively to be posted in the db
const createNewMsg = (userId, msg) => {
   return {
    userId: userId,
    message: msg
   }
}

const createNewFriend = (userId, friendId) => {
    return {
     currentUserId: userId,
     userId: friendId
    }
 }


const chatHandlers = {
    handlerChatSendButton: () => {
        // this is a function that will handle the save button, it will call the factory function above
        // called createNewMsg and return a newMsg then the handler will pass that to the chatApi post fetch call
        let userId = Number(sessionStorage.getItem("userID"));
        // console.log(userId)
        const userMessage = document.querySelector("#user-message").value;

        let newMsg = createNewMsg(userId, userMessage) //calling the factory function
        chatApi.postCreateMessage(newMsg).then(()=>{
            // clear the container and see the new messages
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer);
            //go and get new msgs to append on dom
            chatApi.getMessages().then(msgArray => {
                // console.log("helllllo")
                chatMsg.buildMainMsg(msgArray)
                chatMsg.buildEditAndDelete(msgArray)
            })
        })
    },
    handlerEditChatButton: () => {
        // make a put request
        // console.log(event.target.parentNode.id.split("--")[1])
        const parentId = event.target.parentNode.id.split("--")[1];
        const updateDiv = document.querySelector(`#msg-block--${parentId}`)
        // console.log(document.querySelector(`#msg-number--${parentId}`).textContent)
        const valueToBeUpdated = document.querySelector(`#msg-number--${parentId}`).textContent;
        HTMLfactory.clearContainer(updateDiv);
    
        const updateLabel = chatBuild.buildChatElements("label", undefined, undefined, "Message: ")
        updateLabel.for=`msg-update--${parentId}`
        const updateInput = chatBuild.buildChatElements("input", undefined,`msg-update--${parentId}`, undefined);
        updateInput.type = "text"
        updateInput.value = valueToBeUpdated;
    
        const saveButton = chatBuild.buildChatElements("button", "btn btn-primary", `save-msg--${parentId}`, "Update")
        saveButton.addEventListener("click",chatHandlers.handleSaveButton);
        updateDiv.appendChild(updateLabel);
        updateDiv.appendChild(updateInput);
        updateDiv.appendChild(saveButton);
    },
    handlerDeleteChatButton: () => {
        // make a delete request
        // console.log(event.target.parentNode.id.split("--")[1])
        const msgBlockId = event.target.parentNode.id.split("--")[1];
        chatApi.deleteMessage(msgBlockId).then(()=>{
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer)
            chatApi.getMessages().then(msgArray => {
                // console.log("delete done")
                chatMsg.buildMainMsg(msgArray);
            })
        })

    },
    handleSaveButton: () => {
        // handle saving the updated chat message
        const msgBlockId = event.target.parentNode.id.split("--")[1];
        let userId = Number(sessionStorage.getItem("userID"));
        const theMessage = document.querySelector(`#msg-update--${msgBlockId}`)
        let updatedMessageObj = createNewMsg(userId, theMessage.value)

        chatApi.putMessage(updatedMessageObj, msgBlockId).then(()=>{
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer)
            chatApi.getMessages().then(msgArray => {
                chatMsg.buildMainMsg(msgArray);
            })
        })
    },
    handleAddFriend: () => {
        // handle adding a friend when the user clicks on a person's name in the chat
        const potentialFriend = Number(event.target.id.split("--")[1]);
        let userId = Number(sessionStorage.getItem("userID"));

        if(userId !== potentialFriend){ // makes sure the current user isn't the user that was clicked on
            let friendsArray;
            // make the call to grab all the friends so that we can loop through it
            chatApi.getFriends()
            .then(parsedFriends => friends.getFriendId(parsedFriends))
            .then(() => {
                friendsArray = friends.returnFriendsArray();// grab the list of friends of the current user
                //loop through the array of your friends to check against the user that was clicked on
                const notYourFriend = friendsArray.find(yourFriend => {
                    return yourFriend === potentialFriend
                })
                // if this not your friend you will get an undefined
                if(notYourFriend === undefined){
                    // console.log("the values is undefined")
                    let returnValue = confirm("Are you sure you want to add as a friend?")
                    if(returnValue){
                        // if true add the user as a friend
                        // console.log("confirm works")
                        let newFriend = createNewFriend(userId, potentialFriend)
                        chatApi.postCreateFriendship(newFriend)
                        .then(() => {
                            // once we post a friendship, refresh the friend's container
                            // friendships.handleAppendFriend()
                            load.load()
                        });
                    }
                }else{
                    alert("You guys are already pals!")
                }
            })
        }
    },
    handleKeepChatButton: () => {
        const msgContainer = document.querySelector("#messages-section");
        HTMLfactory.clearContainer(msgContainer)
        chatApi.getMessages().then(msgArray => {
            chatMsg.buildMainMsg(msgArray);
        })
    }
}
export default chatHandlers