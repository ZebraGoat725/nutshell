import buildChat from "./chatForm"
// import api from "./../apiManager"

// const chatContainer = document.querySelector("#messages-section");
// chatContainer.appendChild(chatSection.buildChatBootStrapContainer())




const messenger = {
    buildMainMsg: messagesArray => {
    // this will populate the messages
        messagesArray.forEach(msgObj => {
                // I want to go throught the array of objs and parse the info
            const chatBlock = buildChat.buildChatElements("div", undefined, `msg-block--${msgObj.id}`, undefined);
            const message = buildChat.buildChatElements("p", "card-text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
            const user = buildChat.buildChatElements("span" ,undefined, `user-msgId--${msgObj.id}`,`${msgObj.userName}`)
            chatBlock.appendChild(message);
            chatBlock.appendChild(user);
            
            buildChat.buildChatBootStrapContainer(chatBlock);
        })
    }
}

export default messenger