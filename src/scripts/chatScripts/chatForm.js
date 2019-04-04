// This component will essentially build the chat form fields
import api from "./../apiManager"



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
        const chatForm = buildChatMessage.buildChatElements("div", undefined, "user-message", undefined);
        const chatInput = buildChatMessage.buildChatElements("input", undefined, undefined, undefined);
        chatInput.type = "text";
        chatInput.cols = 50;
        chatInput.placeholder = "Enter your message";

        const chatSendButton = buildChatMessage.buildChatElements("button", "btn btn-primary", "chat--send", "Send");
        chatForm.appendChild(chatInput);
        chatForm.appendChild(chatSendButton);

        return chatForm;
    },
    buildChatBootStrapContainer: function() {
        // this component will create the main bootstrap structure and also append the mainChatBlock
        // that will contain the all the user messages and the mainChatTextForm that will allow the user to enter
        // there new message
        // console.log(mainChatBlock)
        const chatBootDomFragment = document.createDocumentFragment();
        const cardCenter = buildChatMessage.buildChatElements("div","card text-center");
        const cardHeader = buildChatMessage.buildChatElements("div", "card-header",undefined, "Chat Room");
        const cardBlock = buildChatMessage.buildChatElements("div", "card-block", undefined, undefined);
        const cardFooter = buildChatMessage.buildChatElements("div","card-footer text-muted", undefined,undefined);

        chatBootDomFragment.appendChild(cardCenter);
        chatBootDomFragment.appendChild(cardHeader);
        // cardBlock.appendChild(); //may need parenthesis
        chatBootDomFragment.appendChild(cardBlock);
        cardFooter.appendChild(buildChatMessage.mainChatTextForm()); // may need parenthesis
        chatBootDomFragment.appendChild(cardFooter);

        return chatBootDomFragment;
    }
}
export default buildChatMessage;