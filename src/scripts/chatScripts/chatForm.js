// This component will essentially build the chat form fields
import chatHandle from "./handleMessages"


/* BOOTSTRAP LOOK
<div class="card text-center">
  <div class="card-header">
    Featured
  </div>
  <div class="card-block">
    <h4 class="card-title">Special title treatment</h4>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
  <div class="card-footer text-muted">
    2 days ago
  </div>
</div>
*/

const buildChatMessage = {
    buildChatElements: (element, elementClass, id, elementTextContent) => {
        //this function will build each element for the chat message
        // it's simply a generic html builder specifically for the container
        const elm = document.createElement(element);
        if (elementTextContent) {
            elm.textContent = elementTextContent;
        }
        if (id) {
            elm.id = id;
        }
        if(elementClass){
            elm.classList = elementClass;
        }
        return elm;
    },
    mainChatTextForm: function() {
        // this component will build the CURRENT user's actual message
        // it later will have the save button
        const chatForm = buildChatMessage.buildChatElements("div", "input-group chat-form", "input--msg", undefined);
        const chatInput = buildChatMessage.buildChatElements("input", undefined, "user-message", undefined);
        chatInput.type = "text";
        chatInput.cols = 200;
        chatInput.placeholder = "Enter your message";

        const chatSendButton = buildChatMessage.buildChatElements("button", "btn btn-outline-primary", "chat--send", "Send");
        chatSendButton.addEventListener("click", chatHandle.handlerChatSendButton); // handle the save message
        chatForm.appendChild(chatInput);
        chatForm.appendChild(chatSendButton);

        return chatForm;
    },
    buildChatBootStrapContainer: function(chat) {
        // this component will create the main bootstrap structure which has a parameter being passed into it
        // this parameter is from the appendChat.js that parses the fetch call
        console.log(chat)
        const chatBootDomFragment = document.createDocumentFragment();
        const cardCenter = buildChatMessage.buildChatElements("div","card text-center");
        const cardHeader = buildChatMessage.buildChatElements("div", "card-header","chat--room", "Chat Room");
        const cardBlock = buildChatMessage.buildChatElements("div", "card-block", undefined, undefined);
        const cardFooter = buildChatMessage.buildChatElements("div","card-footer text-muted", undefined,undefined);

        chatBootDomFragment.appendChild(cardCenter);
        chatBootDomFragment.appendChild(cardHeader);
        cardBlock.appendChild(chat); //may need parenthesis
        chatBootDomFragment.appendChild(cardBlock);
        cardFooter.appendChild(buildChatMessage.mainChatTextForm()); // may need parenthesis
        chatBootDomFragment.appendChild(cardFooter);

        // return chatBootDomFragment;
        const chatContainer = document.querySelector("#messages-section");
        chatContainer.appendChild(chatBootDomFragment)
    }
}
export default buildChatMessage;