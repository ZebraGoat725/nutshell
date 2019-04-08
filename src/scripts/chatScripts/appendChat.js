// this component will be called from the loginHandler component which will then import the
// buildChatBootStrapContainer so that the passed in array will be parsed and passed in to that function
// the information that is passed into the function will be the main message chunk
// that has all the previous messages
import buildChat from "./chatForm"
import chatHandle from "./handleMessages"

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
            const message = buildChat.buildChatElements("p", "card-text msg--text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
            const user = buildChat.buildChatElements("p" ,"user--name", `user-msgId--${msgObj.user.id}`,`${msgObj.user.userName}`)
            user.addEventListener("click", chatHandle.handleAddFriend);
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
        // go thru each element in array and find the most reacent
        let lastestMsg = currentUserMsgs[currentUserMsgs.length-1]

        //using the msgId, I can target that specific msg
        let lastMsgDiv = document.querySelector(`#msg-block--${lastestMsg.id}`)
        const buttonGroup = document.createElement("div"); //bootstrap

        buttonGroup.classList = "btn-group"
        buttonGroup.setAttribute("role", "group")
        buttonGroup.setAttribute("aria-label", "Edit/Delete")
        buttonGroup.id = `msg--${lastestMsg.id}`
        
        const editButton = buildChat.buildChatElements("button","btn btn-info",`edit-userMsg--${lastestMsg.id}`,"Edit");
        editButton.addEventListener("click",chatHandle.handlerEditChatButton);
        const deleteButton = buildChat.buildChatElements("button","btn btn-danger",`delete-userMsg--${lastestMsg.id}`,"Delete")
        deleteButton.addEventListener("click", chatHandle.handlerDeleteChatButton);

        buttonGroup.appendChild(editButton);
        buttonGroup.appendChild(deleteButton);
        lastMsgDiv.appendChild(buttonGroup);
    }
}

export default messenger