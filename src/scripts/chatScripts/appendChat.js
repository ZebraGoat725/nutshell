// this component will be called from the loginHandler component which will then import the
// buildChatBootStrapContainer so that the passed in array will be parsed and passed in to that function
// the information that is passed into the function will be the main message chunk
// that has all the previous messages
import buildChat from "./chatForm"
import chatHandle from "./handleMessages"
import api from "./chatApiManager"
import friends from "./friends"

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
                if(msgObj.user.id !== userId){
                    console.log("not my friend")
                    // this will check to see if the current user(userId) is the same as the msg's user
                    // and then if they are not matches meaning then they aren't the current user, add friend button
                    // also this will check verification to see if they are already friends with them
                    let friendsArray = friends.returnFriendsArray()
                    let foundFriend = friendsArray.find(theFriend => {
                        return theFriend === msgObj.user.id
                    })
                    console.log("The friends array:",friendsArray)
                    foundFriend.forEach(friend => {
                        //go thru the loop of found friends of current user and if
                        //they are not friends add a hyperlink
                        if(msgObj.user.id !== friend){
                            let returnValue = confirm("Are you sure you want to add as a friend?")
                            if(returnValue){
                                // if true add the user as a friend
                                console.log("confirm works")
                            }
                        }
                    })
                }
            });
            const hr = buildChat.buildChatElements("hr")
            // const addFriendButton = buildChat.buildChatElements("button", "btn btn-primary", `add-friend--${msgObj.user.id}`, "Add Friend");
            // addFriendButton.addEventListener("click", chatHandle.handlerChatAddFriend)
            
            chatBlock.appendChild(message);
            chatBlock.appendChild(user);
            // chatBlock.appendChild(hr)


            let userId = Number(sessionStorage.getItem("userID"));

            // if(msgObj.user.id !== userId){
            //     // this will check to see if the current user(userId) is the same as the msg's user
            //     // and then if they are not matches meaning then they aren't the current user, add friend button
            //     // also this will check verification to see if they are already friends with them
            //     let friendsArray = friends.returnFriendsArray()
            //     let foundFriend = friendsArray.find(theFriend => {
            //         return theFriend === msgObj.user.id
            //     })
            //     foundFriend.forEach(friend => {
            //         //go thru the loop of found friends of current user and if
            //         //they are not friends add a hyperlink
            //         if(msgObj.user.id !== friend){
                        
            //         }
            //     })
            // }
            chat.appendChild(chatBlock);
            // chat.appendChild(hr)
            // buildChat.buildChatBootStrapContainer(chatBlock);
        })
        buildChat.buildChatBootStrapContainer(chat);
    }
}

export default messenger