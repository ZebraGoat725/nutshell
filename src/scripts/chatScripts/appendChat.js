// this component will be called from the loginHandler component which will then import the
// buildChatBootStrapContainer so that the passed in array will be parsed and passed in to that function
// the information that is passed into the function will be the main message chunk
// that has all the previous messages
import buildChat from "./chatForm"
import chatHandle from "./handleMessages"
import api from "./chatApiManager"
import friends from "./friends"


//factory function to create a new friendship and new/updated msg
const createNewFriend = (userId, friendId) => {
    return {
     currentUserId: userId,
     userId: friendId
    }
 }
const createNewMsg = (userId, msg) => {
    return {
     userId: userId,
     message: msg
    }
 }

const messenger = {
    buildMainMsg: messagesArray => {
    // this will populate the messages
        let chat = document.createDocumentFragment();
        messagesArray.forEach(msgObj => {
            // console.log(msgObj)
            // I want to go throught the array of objs and parse the info
            const chatBlock = buildChat.buildChatElements("div", "msg-block", `msg-block--${msgObj.id}`, undefined);
            const message = buildChat.buildChatElements("p", "card-text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
            const user = buildChat.buildChatElements("p" ,undefined, `user-msgId--${msgObj.user.id}`,`${msgObj.user.userName}`)
            user.addEventListener("click", () => {
                // this will check to see if the current user(userId) is the same as the msg's user
                let userId = Number(sessionStorage.getItem("userID"));
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
                        if(msgObj.user.id !== friend){
                            let returnValue = confirm("Are you sure you want to add as a friend?")
                            if(returnValue){
                                // if true add the user as a friend
                                console.log("confirm works")
                                let newFriend = createNewFriend(userId, msgObj.user.id)
                                api.postCreateFriendship(newFriend);
                            }
                        }else{
                            alert("this is your friend")
                        }

                    })
                }
            });
            // const addFriendButton = buildChat.buildChatElements("button", "btn btn-primary", `add-friend--${msgObj.user.id}`, "Add Friend");
            // addFriendButton.addEventListener("click", chatHandle.handlerChatAddFriend)
            chatBlock.appendChild(message);
            chatBlock.appendChild(user);
            chat.appendChild(chatBlock);

        })
        buildChat.buildChatBootStrapContainer(chat);
    },
    buildEditAndDelete: messagesArray =>{
        // this function will parse all the messages and grab all the message values
        // and retrieve the current user's lastest message and append an edit/delete
        // button on it.
        let userId = Number(sessionStorage.getItem("userID"));
        let currentUserMsgs = []; // store all the current user's msgs
        messagesArray.forEach(msg => {
            let currUser = msg.user.id
            if(currUser === userId){
                // push all the current user's msg into array
                currentUserMsgs.push(msg)
            }
        });
        console.log(currentUserMsgs.length)
        // go thru each element in array and find the most reacent
        let lastestMsg = currentUserMsgs[currentUserMsgs.length-1]
        console.log(lastestMsg,lastestMsg.id)
        //using the msgId, I can target that specific msg
        let lastMsgDiv = document.querySelector(`#msg-block--${lastestMsg.id}`)
        // console.log(lastMsgDiv)
        const buttonGroup = document.createElement("div"); //bootstrap
        buttonGroup.classList = "btn-group"
        buttonGroup.setAttribute("role", "group")
        buttonGroup.setAttribute("aria-label", "Edit/Delete")
        buttonGroup.id = `msg--${lastestMsg.id}`
        
        const editButton = buildChat.buildChatElements("button","btn btn-primary",`edit-userMsg--${lastestMsg.id}`,"Edit");
        editButton.addEventListener("click",chatHandle.handlerEditChatButton);
        const deleteButton = buildChat.buildChatElements("button","btn btn-danger",`delete-userMsg--${lastestMsg.id}`,"Delete")
        deleteButton.addEventListener("click", chatHandle.handlerDeleteChatButton);

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        lastMsgDiv.appendChild(buttonGroup);

    }
}

export default messenger