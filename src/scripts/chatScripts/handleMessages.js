// this component will create the handlders that will be used for the messages
import chatApi from "./chatApiManager";
import HTMLfactory from "../HTMLFactory"
import chatMsg from "./appendChat"
import chatBuild from "./chatForm"
import friends from "./friends"

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
        console.log(event.target.parentNode.id.split("--")[1])
        const msgBlockId = event.target.parentNode.id.split("--")[1];
        chatApi.deleteMessage(msgBlockId).then(()=>{
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer)
            chatApi.getMessages().then(msgArray => {
                console.log("delete done")
                chatMsg.buildMainMsg(msgArray);
            })
        })

    },
    handleSaveButton: () => {
        // handle saving the updated chat message
        // console.log(event.target.parentNode.id)// gives the msgId, I have the user already
        const msgBlockId = event.target.parentNode.id.split("--")[1];
        let userId = Number(sessionStorage.getItem("userID"));
        const theMessage = document.querySelector(`#msg-update--${msgBlockId}`)
        // console.log(theMessage.value)
        let updatedMessageObj = createNewMsg(userId, theMessage.value)
        // console.log(updatedMessageObj)
        chatApi.putMessage(updatedMessageObj, msgBlockId).then(()=>{
            const msgContainer = document.querySelector("#messages-section");
            HTMLfactory.clearContainer(msgContainer)
            chatApi.getMessages().then(msgArray => {
                console.log("update done")
                chatMsg.buildMainMsg(msgArray);
            })
        })
    },
    handleAddFriend: () => {
        // handle adding a friend when the user clicks on a person's name in the chat
        console.log(event.target.id.split("--")[1])
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
                console.log(notYourFriend)
                if(notYourFriend === undefined){
                    console.log("the values is undefined")
                    let returnValue = confirm("Are you sure you want to add as a friend?")
                    if(returnValue){
                        // if true add the user as a friend
                        console.log("confirm works")
                        let newFriend = createNewFriend(userId, potentialFriend)
                        chatApi.postCreateFriendship(newFriend);
                    }
                }else{
                    alert("You guys are already pals!")
                }
            })
        }
    }
}
export default chatHandlers
/*
                if(msgObj.user.id !== userId){
                    console.log("not me, another user")
                    // and if they ids don't match, it means it's a different user
                    // also this will check verification to see if they are already friends with them
                    let friendsArray = friends.returnFriendsArray()
                    console.log("The friends array:",friendsArray)
                
                    friendsArray.forEach(friend => {
                        //go thru the loop of found friends of current user and if
                        // if no match,alert user to add friend
                        console.log(friend)
                        // this will check to see if the current user(userId) is the same as the msg's user
                        if(msgObj.user.id === friend){
                            alert("this is your friend")
                            console.log("a friend of yours")
                        }else if(msgObj.user.id !== friend){
                            let returnValue = confirm("Are you sure you want to add as a friend?")
                            if(returnValue){
                                // if true add the user as a friend
                                console.log("confirm works")
                                let newFriend = createNewFriend(userId, msgObj.user.id)
                                api.postCreateFriendship(newFriend);
                            }
                        }
                    })
                }
*/