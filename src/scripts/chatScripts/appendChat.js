import buildChat from "./chatForm"
import api from "./../apiManager"

const shit = () => {
    // mainChatBlock: function(){
        // this will populate the messages
        const testing = document.createElement("div")
        testing.textContent = "What's up, bitch ass"
        buildChatMessage.buildChatBootStrapContainer(testing)
        // return api.getMessages()
        // .then(messagesArray => { // this call will retrieve all the messages w/ the friends' id
        //     console.log(messagesArray); // this is a tester
        //     let chat = document.createElement("div");
        //     messagesArray.forEach(msgObj => {
        //          // I want to go throught the array of objs and parse the info
        //         const chatBlock = buildChatMessage.buildChatElements("div", undefined, `msg-block--${msgObj.id}`, undefined);
        //         const message = buildChatMessage.buildChatElements("p", "card-text",`msg-number--${msgObj.id}`, `${msgObj.message}`);
        //         const user = buildChatMessage.buildChatElements("span" ,undefined, `user-msgId--${msgObj.id}`,`${msgObj.userName}`)
        //         chatBlock.appendChild(message);
        //         chatBlock.appendChild(user);
        //         chat.appendChild(chatBlock);
        //         console.log(chat)
        //         buildChatMessage.buildChatBootStrapContainer(chat);
        //     })
        // })
    // }
}