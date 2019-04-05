// this component will be called from the loginHandler component which will then import the
// buildChatBootStrapContainer so that the passed in array will be parsed and passed in to that function
// the information that is passed into the function will be the main message chunk
// that has all the previous messages
import buildChat from "./chatForm"

const messenger = {
    buildMainMsg: messagesArray => {
    // this will populate the messages
        let chat = document.createDocumentFragment();
        messagesArray.forEach(msgObj => {
            console.log(msgObj)
            // I want to go throught the array of objs and parse the info
            const chatBlock = buildChat.buildChatElements("div", undefined, `msg-block--${msgObj.id}`, undefined);
            const message = buildChat.buildChatElements("p", "card-text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
            const user = buildChat.buildChatElements("span" ,undefined, `user-msgId--${msgObj.id}`,`${msgObj.user.userName}`)
            chatBlock.appendChild(message);
            chatBlock.appendChild(user);
            chat.appendChild(chatBlock);
            // buildChat.buildChatBootStrapContainer(chatBlock);
        })
        buildChat.buildChatBootStrapContainer(chat);
    }
}

export default messenger