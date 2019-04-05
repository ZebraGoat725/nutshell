// this component will be called from the loginHandler component which will then import the
// buildChatBootStrapContainer so that the passed in array will be parsed and passed in to that function
// the information that is passed into the function will be the main message chunk
// that has all the previous messages
import buildChat from "./chatForm"
import chatHandle from "./handleMessages"
import api from "./chatApiManager"
import parseFriends from "./friends"

const messenger = {
    buildMainMsg: messagesArray => {
    // this will populate the messages
        let chat = document.createDocumentFragment();
        messagesArray.forEach(msgObj => {
            console.log(msgObj)
            // I want to go throught the array of objs and parse the info
            const chatBlock = buildChat.buildChatElements("div", "msg-block", `msg-block--${msgObj.id}`, undefined);
            const message = buildChat.buildChatElements("p", "card-text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
            const user = buildChat.buildChatElements("p" ,undefined, `user-msgId--${msgObj.user.id}`,`${msgObj.user.userName}`)

            const addFriendButton = buildChat.buildChatElements("button", "btn btn-primary", `add-friend--${msgObj.user.id}`, "Add Friend");
            addFriendButton.addEventListener("click", chatHandle.handlerChatAddFriend)
            
            chatBlock.appendChild(message);
            chatBlock.appendChild(user);

            let userId = Number(sessionStorage.getItem("userID"));

            if(msgObj.user.id !== userId){
                // this will check to see if the current user(userId) is the same as the msg's user
                // and then if they are not matches meaning then they aren't the user, add friend button
                // also this will check verification to see if they are already friends with them and then append
                // button
                if(msgObj.user.id !== friendId){
                    chatBlock.appendChild(addFriendButton)
                }
            }

            chat.appendChild(chatBlock);
            // buildChat.buildChatBootStrapContainer(chatBlock);
        })
        buildChat.buildChatBootStrapContainer(chat);
    }
}

export default messenger